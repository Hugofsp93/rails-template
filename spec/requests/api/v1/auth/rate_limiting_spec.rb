require 'rails_helper'

RSpec.describe 'Rate Limiting', type: :request do
  let(:user) { create(:user) }
  let(:valid_sign_in_params) do
    {
      email: user.email,
      password: 'lklklklk'
    }
  end

  let(:valid_sign_up_params) do
    {
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        password: 'password123',
        password_confirmation: 'password123',
        terms: true
      }
    }
  end

  let(:valid_password_reset_params) do
    {
      user: {
        email: user.email
      }
    }
  end

  describe 'API Authentication Rate Limiting' do
    context 'sign in rate limiting' do
      it 'allows requests within rate limit' do
        5.times do
          post '/api/v1/auth/sign_in', params: json_params(valid_sign_in_params), headers: auth_headers
          expect(response).to have_http_status(:ok)
        end
      end

      it 'blocks requests exceeding rate limit' do
        # Make 5 requests (within limit)
        5.times do
          post '/api/v1/auth/sign_in', params: json_params(valid_sign_in_params), headers: auth_headers
        end

        # 6th request should be rate limited
        post '/api/v1/auth/sign_in', params: json_params(valid_sign_in_params), headers: auth_headers
        expect(response).to have_http_status(:too_many_requests)
        expect(json_response['error']).to eq('Rate limit exceeded. Please try again later.')
        expect(response.headers['Retry-After']).to be_present
      end
    end

    context 'sign up rate limiting' do
      it 'allows requests within rate limit' do
        3.times do |i|
          params = valid_sign_up_params.deep_dup
          params[:user][:email] = "user#{i}@example.com"
          params[:user][:phone] = "+123456789#{i}"

          post '/api/v1/auth/sign_up', params: json_params(params), headers: auth_headers
          expect(response).to have_http_status(:ok)
        end
      end

      it 'blocks requests exceeding rate limit' do
        # Make 3 requests (within limit)
        3.times do |i|
          params = valid_sign_up_params.deep_dup
          params[:user][:email] = "user#{i}@example.com"
          params[:user][:phone] = "+123456789#{i}"

          post '/api/v1/auth/sign_up', params: json_params(params), headers: auth_headers
        end

        # 4th request should be rate limited
        params = valid_sign_up_params.deep_dup
        params[:user][:email] = "user4@example.com"
        params[:user][:phone] = "+1234567894"

        post '/api/v1/auth/sign_up', params: json_params(params), headers: auth_headers
        expect(response).to have_http_status(:too_many_requests)
        expect(json_response['error']).to eq('Rate limit exceeded. Please try again later.')
      end
    end

    context 'password reset rate limiting' do
      it 'allows requests within rate limit' do
        3.times do
          post '/api/v1/auth/password', params: json_params(valid_password_reset_params), headers: auth_headers
          expect(response).to have_http_status(:ok)
        end
      end

      it 'blocks requests exceeding rate limit' do
        # Make 3 requests (within limit)
        3.times do
          post '/api/v1/auth/password', params: json_params(valid_password_reset_params), headers: auth_headers
        end

        # 4th request should be rate limited
        post '/api/v1/auth/password', params: json_params(valid_password_reset_params), headers: auth_headers
        expect(response).to have_http_status(:too_many_requests)
        expect(json_response['error']).to eq('Rate limit exceeded. Please try again later.')
      end
    end

    context 'confirmation rate limiting' do
      let(:unconfirmed_user) { create(:user, :unconfirmed) }
      let(:valid_confirmation_params) do
        {
          user: {
            email: unconfirmed_user.email
          }
        }
      end

      it 'allows requests within rate limit' do
        5.times do
          post '/api/v1/auth/confirmation', params: json_params(valid_confirmation_params), headers: auth_headers
          expect(response).to have_http_status(:ok)
        end
      end

      it 'blocks requests exceeding rate limit' do
        # Make 5 requests (within limit)
        5.times do
          post '/api/v1/auth/confirmation', params: json_params(valid_confirmation_params), headers: auth_headers
        end

        # 6th request should be rate limited
        post '/api/v1/auth/confirmation', params: json_params(valid_confirmation_params), headers: auth_headers
        expect(response).to have_http_status(:too_many_requests)
        expect(json_response['error']).to eq('Rate limit exceeded. Please try again later.')
      end
    end
  end

  describe 'Web Authentication Rate Limiting' do
    context 'web sign in rate limiting' do
      it 'allows requests within rate limit' do
        5.times do
          post '/users/sign_in', params: valid_sign_in_params
          expect(response).to have_http_status(:found) # Redirect after sign in attempt
        end
      end

      it 'blocks requests exceeding rate limit' do
        # Make 5 requests (within limit)
        5.times do
          post '/users/sign_in', params: valid_sign_in_params
        end

        # 6th request should be rate limited
        post '/users/sign_in', params: valid_sign_in_params
        expect(response).to have_http_status(:too_many_requests)
        expect(json_response['error']).to eq('Rate limit exceeded. Please try again later.')
      end
    end

    context 'web sign up rate limiting' do
      it 'allows requests within rate limit' do
        3.times do |i|
          params = valid_sign_up_params.deep_dup
          params[:user][:email] = "user#{i}@example.com"
          params[:user][:phone] = "+123456789#{i}"

          post '/users', params: params
          expect(response).to have_http_status(:found) # Redirect after sign up attempt
        end
      end

      it 'blocks requests exceeding rate limit' do
        # Make 3 requests (within limit)
        3.times do |i|
          params = valid_sign_up_params.deep_dup
          params[:user][:email] = "user#{i}@example.com"
          params[:user][:phone] = "+123456789#{i}"

          post '/users', params: params
        end

        # 4th request should be rate limited
        params = valid_sign_up_params.deep_dup
        params[:user][:email] = "user4@example.com"
        params[:user][:phone] = "+1234567894"

        post '/users', params: params
        expect(response).to have_http_status(:too_many_requests)
        expect(json_response['error']).to eq('Rate limit exceeded. Please try again later.')
      end
    end
  end

  describe 'General API Rate Limiting' do
    it 'allows requests within general API rate limit' do
      100.times do
        get '/api/v1/auth/me', headers: auth_headers
        expect(response).to have_http_status(:unauthorized) # No token, but not rate limited
      end
    end

    it 'blocks requests exceeding general API rate limit' do
      # Make 100 requests (within limit)
      100.times do
        get '/api/v1/auth/me', headers: auth_headers
      end

      # 101st request should be rate limited
      get '/api/v1/auth/me', headers: auth_headers
      expect(response).to have_http_status(:too_many_requests)
      expect(json_response['error']).to eq('Rate limit exceeded. Please try again later.')
    end
  end

  describe 'Suspicious Request Blocking' do
    it 'blocks requests with suspicious user agents' do
      suspicious_agents = [
        'Googlebot/2.1',
        'Mozilla/5.0 (compatible; Bingbot/2.0)',
        'Mozilla/5.0 (compatible; YandexBot/3.0)',
        'Mozilla/5.0 (compatible; Baiduspider/2.0)'
      ]

      suspicious_agents.each do |user_agent|
        post '/api/v1/auth/sign_in',
             params: json_params(valid_sign_in_params),
             headers: auth_headers.merge('HTTP_USER_AGENT' => user_agent)

        expect(response).to have_http_status(:forbidden)
        expect(json_response['error']).to eq('Access denied')
      end
    end

    it 'allows requests with normal user agents' do
      normal_agents = [
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
      ]

      normal_agents.each do |user_agent|
        post '/api/v1/auth/sign_in',
             params: json_params(valid_sign_in_params),
             headers: auth_headers.merge('HTTP_USER_AGENT' => user_agent)

        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'Rate Limit Reset' do
    it 'resets rate limit after period expires' do
      # Make 5 requests to hit the limit
      5.times do
        post '/api/v1/auth/sign_in', params: json_params(valid_sign_in_params), headers: auth_headers
      end

      # 6th request should be rate limited
      post '/api/v1/auth/sign_in', params: json_params(valid_sign_in_params), headers: auth_headers
      expect(response).to have_http_status(:too_many_requests)

      # Clear the cache to simulate time passing
      Rack::Attack.cache.store.clear

      # Should work again after cache is cleared
      post '/api/v1/auth/sign_in', params: json_params(valid_sign_in_params), headers: auth_headers
      expect(response).to have_http_status(:ok)
    end
  end
end
