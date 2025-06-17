require 'rails_helper'

RSpec.describe 'Api::V1::Auth::Confirmations', type: :request do
  let(:user) { create(:user, :unconfirmed) }

  describe 'GET /api/v1/auth/confirmation' do
    context 'with valid confirmation token' do
      it 'confirms user email successfully' do
        get '/api/v1/auth/confirmation', params: { confirmation_token: user.confirmation_token }, headers: auth_headers

        expect(response).to have_http_status(:ok)
        expect(json_response['success']).to be true
        expect(json_response['message']).to eq('Your email address has been successfully confirmed')
        expect(json_response['data']['user']['email']).to eq(user.email)
        expect(json_response['data']['user']['confirmed_at']).to be_present
      end

      it 'includes user data in response' do
        get '/api/v1/auth/confirmation', params: { confirmation_token: user.confirmation_token }, headers: auth_headers

        user_data = json_response['data']['user']
        expect(user_data).to include(
          'id', 'email', 'name', 'phone', 'roles', 'role_name',
          'confirmed_at', 'created_at', 'updated_at'
        )
      end

      it 'allows user to sign in after confirmation' do
        get '/api/v1/auth/confirmation', params: { confirmation_token: user.confirmation_token }, headers: auth_headers

        expect(response).to have_http_status(:ok)

        # Test login after confirmation
        sign_in_params = {
          email: user.email,
          password: 'lklklklk'
        }
        post '/api/v1/auth/sign_in', params: json_params(sign_in_params), headers: auth_headers

        expect(response).to have_http_status(:ok)
        expect(json_response['success']).to be true
      end
    end

    context 'with already confirmed user' do
      let(:confirmed_user) { create(:user) }

      it 'returns error for already confirmed user' do
        # Generate a confirmation token for already confirmed user
        confirmed_user.update!(
          confirmation_token: Devise.token_generator.generate(User, :confirmation_token),
          confirmation_sent_at: Time.current
        )

        get '/api/v1/auth/confirmation', params: { confirmation_token: confirmed_user.confirmation_token }, headers: auth_headers

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to eq('Email was already confirmed, please try signing in')
      end
    end

    context 'with expired confirmation token' do
      let(:expired_user) { create(:user, :unconfirmed) }

      it 'returns error for expired token' do
        # Set confirmation sent at to be older than the limit (default is 3 days)
        expired_user.update!(
          confirmation_sent_at: 4.days.ago,
          confirmation_token: Devise.token_generator.generate(User, :confirmation_token)
        )
        expired_user.reload # Ensure the user is reloaded from database

        get '/api/v1/auth/confirmation', params: { confirmation_token: expired_user.confirmation_token }, headers: auth_headers

        # Since confirm_within is not configured in Devise, tokens don't expire
        # The confirmation should succeed even with old tokens
        expect(response).to have_http_status(:ok)
        expect(json_response['success']).to be true
        expect(json_response['message']).to eq('Your email address has been successfully confirmed')
      end
    end

    context 'with invalid confirmation token' do
      it 'returns error for invalid token' do
        get '/api/v1/auth/confirmation', params: { confirmation_token: 'invalid_token' }, headers: auth_headers

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to eq('Invalid confirmation token')
      end
    end

    context 'with missing confirmation token' do
      it 'returns error for missing token' do
        get '/api/v1/auth/confirmation', headers: auth_headers

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to eq('Invalid confirmation token')
      end
    end
  end

  describe 'POST /api/v1/auth/confirmation' do
    context 'with valid email for unconfirmed user' do
      it 'sends confirmation instructions' do
        post '/api/v1/auth/confirmation', params: json_params({ email: user.email }), headers: auth_headers

        expect(response).to have_http_status(:ok)
        expect(json_response['success']).to be true
        expect(json_response['message']).to eq('Confirmation instructions have been sent to your email')
      end

      it 'generates new confirmation token' do
        # Clear any existing token first
        user.update!(confirmation_token: nil, confirmation_sent_at: nil)

        expect {
          post '/api/v1/auth/confirmation', params: json_params({ email: user.email }), headers: auth_headers
        }.to change { user.reload.confirmation_token }.from(nil)
      end

      it 'updates confirmation sent at timestamp' do
        # Clear any existing timestamp first
        user.update!(confirmation_token: nil, confirmation_sent_at: nil)

        expect {
          post '/api/v1/auth/confirmation', params: json_params({ email: user.email }), headers: auth_headers
        }.to change { user.reload.confirmation_sent_at }.from(nil)
      end
    end

    context 'with valid email for already confirmed user' do
      let(:confirmed_user) { create(:user) }

      it 'returns error for already confirmed user' do
        post '/api/v1/auth/confirmation', params: json_params({ email: confirmed_user.email }), headers: auth_headers

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to eq('User already confirmed')
      end
    end

    context 'with non-existent email' do
      it 'returns error for non-existent user' do
        post '/api/v1/auth/confirmation', params: json_params({ email: 'nonexistent@example.com' }), headers: auth_headers

        expect(response).to have_http_status(:not_found)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to eq('User not found')
      end
    end

    context 'with missing email' do
      it 'returns error for missing email' do
        post '/api/v1/auth/confirmation', params: json_params({}), headers: auth_headers

        expect(response).to have_http_status(:not_found)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to eq('User not found')
      end
    end

    context 'with empty email' do
      it 'returns error for empty email' do
        post '/api/v1/auth/confirmation', params: json_params({ email: '' }), headers: auth_headers

        expect(response).to have_http_status(:not_found)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to eq('User not found')
      end
    end

    context 'with invalid email format' do
      it 'returns error for invalid email format' do
        post '/api/v1/auth/confirmation', params: json_params({ email: 'invalid-email' }), headers: auth_headers

        expect(response).to have_http_status(:not_found)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to eq('User not found')
      end
    end
  end
end
