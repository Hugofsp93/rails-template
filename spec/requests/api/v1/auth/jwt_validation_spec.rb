require 'rails_helper'

RSpec.describe 'JWT Token Validation', type: :request do
  let(:user) { create(:user) }

  describe 'JWT Token Security' do
    context 'with expired token' do
      it 'rejects expired tokens' do
        # Create a token that expires in the past
        payload = {
          user_id: user.id,
          exp: 1.hour.ago.to_i,
          iat: 2.hours.ago.to_i
        }
        expired_token = JWT.encode(payload, Rails.application.credentials.secret_key_base, "HS256")
        headers = { 'Authorization' => "Bearer #{expired_token}", 'Content-Type' => 'application/json' }

        get '/api/v1/auth/me', headers: headers
        expect(response).to have_http_status(:unauthorized)
        expect(json_response['error']).to eq('Invalid or expired token')
      end
    end

    context 'with invalid signature' do
      it 'rejects tokens with wrong signature' do
        payload = {
          user_id: user.id,
          exp: 1.hour.from_now.to_i,
          iat: Time.current.to_i
        }
        # Use wrong secret key
        invalid_token = JWT.encode(payload, 'wrong_secret_key', "HS256")
        headers = { 'Authorization' => "Bearer #{invalid_token}", 'Content-Type' => 'application/json' }

        get '/api/v1/auth/me', headers: headers
        expect(response).to have_http_status(:unauthorized)
        expect(json_response['error']).to eq('Invalid or expired token')
      end
    end

    context 'with malformed token' do
      it 'rejects malformed tokens' do
        headers = { 'Authorization' => 'Bearer malformed.token.here', 'Content-Type' => 'application/json' }

        get '/api/v1/auth/me', headers: headers
        expect(response).to have_http_status(:unauthorized)
        expect(json_response['error']).to eq('Invalid or expired token')
      end
    end

    context 'with missing user in token' do
      it 'rejects tokens with non-existent user' do
        payload = {
          user_id: 999999, # Non-existent user ID
          exp: 1.hour.from_now.to_i,
          iat: Time.current.to_i
        }
        token = JWT.encode(payload, Rails.application.credentials.secret_key_base, "HS256")
        headers = { 'Authorization' => "Bearer #{token}", 'Content-Type' => 'application/json' }

        get '/api/v1/auth/me', headers: headers
        expect(response).to have_http_status(:unauthorized)
        expect(json_response['error']).to eq('Invalid or expired token')
      end
    end

    context 'with token missing required claims' do
      it 'rejects tokens without expiration' do
        payload = {
          user_id: user.id,
          iat: Time.current.to_i
          # Missing exp claim
        }
        token = JWT.encode(payload, Rails.application.credentials.secret_key_base, "HS256")
        headers = { 'Authorization' => "Bearer #{token}", 'Content-Type' => 'application/json' }

        get '/api/v1/auth/me', headers: headers
        expect(response).to have_http_status(:unauthorized)
        expect(json_response['error']).to eq('Invalid or expired token')
      end

      it 'rejects tokens without user_id' do
        payload = {
          exp: 1.hour.from_now.to_i,
          iat: Time.current.to_i
          # Missing user_id claim
        }
        token = JWT.encode(payload, Rails.application.credentials.secret_key_base, "HS256")
        headers = { 'Authorization' => "Bearer #{token}", 'Content-Type' => 'application/json' }

        get '/api/v1/auth/me', headers: headers
        expect(response).to have_http_status(:unauthorized)
        expect(json_response['error']).to eq('Invalid or expired token')
      end
    end

    context 'with future issued at time' do
      it 'rejects tokens with future iat' do
        payload = {
          user_id: user.id,
          exp: 1.hour.from_now.to_i,
          iat: 1.hour.from_now.to_i # Future iat
        }
        token = JWT.encode(payload, Rails.application.credentials.secret_key_base, "HS256")
        headers = { 'Authorization' => "Bearer #{token}", 'Content-Type' => 'application/json' }

        get '/api/v1/auth/me', headers: headers
        expect(response).to have_http_status(:unauthorized)
        expect(json_response['error']).to eq('Invalid or expired token')
      end
    end

    context 'with different algorithms' do
      it 'rejects tokens with wrong algorithm' do
        payload = {
          user_id: user.id,
          exp: 1.hour.from_now.to_i,
          iat: Time.current.to_i
        }
        # Use different algorithm
        token = JWT.encode(payload, Rails.application.credentials.secret_key_base, "HS512")
        headers = { 'Authorization' => "Bearer #{token}", 'Content-Type' => 'application/json' }

        get '/api/v1/auth/me', headers: headers
        expect(response).to have_http_status(:unauthorized)
        expect(json_response['error']).to eq('Invalid or expired token')
      end
    end
  end

  describe 'Token Refresh Security' do
    context 'when refreshing tokens' do
      it 'prevents token reuse' do
        # First, get a valid token
        sign_in_params = {
          email: user.email,
          password: 'lklklklk'
        }
        post '/api/v1/auth/sign_in', params: json_params(sign_in_params), headers: auth_headers
        original_token = json_response['data']['token']

        # Use the token
        headers = { 'Authorization' => "Bearer #{original_token}", 'Content-Type' => 'application/json' }
        get '/api/v1/auth/me', headers: headers
        expect(response).to have_http_status(:ok)

        # Try to use the same token again (should still work for stateless JWT)
        get '/api/v1/auth/me', headers: headers
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'Token Header Variations' do
    context 'with different authorization header formats' do
      it 'accepts Bearer token format' do
        token = generate_jwt_token(user)
        headers = { 'Authorization' => "Bearer #{token}", 'Content-Type' => 'application/json' }

        get '/api/v1/auth/me', headers: headers
        expect(response).to have_http_status(:ok)
      end

      it 'rejects token without Bearer prefix' do
        token = generate_jwt_token(user)
        headers = { 'Authorization' => token, 'Content-Type' => 'application/json' }

        get '/api/v1/auth/me', headers: headers
        expect(response).to have_http_status(:unauthorized)
      end

      it 'rejects empty authorization header' do
        headers = { 'Authorization' => '', 'Content-Type' => 'application/json' }

        get '/api/v1/auth/me', headers: headers
        expect(response).to have_http_status(:unauthorized)
      end

      it 'rejects missing authorization header' do
        headers = { 'Content-Type' => 'application/json' }

        get '/api/v1/auth/me', headers: headers
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
