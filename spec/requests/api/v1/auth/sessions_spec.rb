require 'rails_helper'

RSpec.describe 'Api::V1::Auth::Sessions', type: :request do
  let(:user) { create(:user) }
  let(:unconfirmed_user) do
    user = create(:user)
    user.update_column(:confirmed_at, nil)
    user
  end
  let(:valid_sign_in_params) do
    {
      email: user.email,
      password: 'lklklklk'
    }
  end

  describe 'POST /api/v1/auth/sign_in' do
    context 'with valid credentials and confirmed user' do
      it 'returns success with user data and token' do
        post '/api/v1/auth/sign_in', params: json_params(valid_sign_in_params), headers: auth_headers

        expect(response).to have_http_status(:ok)
        expect(json_response['success']).to be true
        expect(json_response['data']['user']['email']).to eq(user.email)
        expect(json_response['data']['token']).to be_present
        expect(json_response['message']).to eq('Successfully signed in')
      end

      it 'includes all required user fields' do
        post '/api/v1/auth/sign_in', params: json_params(valid_sign_in_params), headers: auth_headers

        user_data = json_response['data']['user']
        expect(user_data).to include(
          'id', 'email', 'name', 'phone', 'roles', 'role_name',
          'confirmed_at', 'created_at', 'updated_at'
        )
      end
    end

    context 'with unconfirmed user' do
      it 'returns error for unconfirmed user' do
        post '/api/v1/auth/sign_in', params: json_params({
          email: unconfirmed_user.email,
          password: 'lklklklk'
        }), headers: auth_headers

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to eq('You need to confirm your email address before continuing.')
      end
    end

    context 'with invalid credentials' do
      it 'returns error for wrong password' do
        post '/api/v1/auth/sign_in', params: json_params({
          email: user.email,
          password: 'wrongpassword'
        }), headers: auth_headers

        expect(response).to have_http_status(:unauthorized)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to eq('Invalid email or password')
      end

      it 'returns error for non-existent email' do
        post '/api/v1/auth/sign_in', params: json_params({
          email: 'nonexistent@example.com',
          password: 'lklklklk'
        }), headers: auth_headers

        expect(response).to have_http_status(:unauthorized)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to eq('Invalid email or password')
      end
    end

    context 'with missing parameters' do
      it 'returns error for missing email' do
        post '/api/v1/auth/sign_in', params: json_params({ password: 'lklklklk' }), headers: auth_headers

        expect(response).to have_http_status(:unauthorized)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to eq('Invalid email or password')
      end

      it 'returns error for missing password' do
        post '/api/v1/auth/sign_in', params: json_params({ email: user.email }), headers: auth_headers

        expect(response).to have_http_status(:unauthorized)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to eq('Invalid email or password')
      end
    end

    context 'with empty parameters' do
      it 'returns error for empty email' do
        post '/api/v1/auth/sign_in', params: json_params({ email: '', password: 'lklklklk' }), headers: auth_headers

        expect(response).to have_http_status(:unauthorized)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to eq('Invalid email or password')
      end

      it 'returns error for empty password' do
        post '/api/v1/auth/sign_in', params: json_params({ email: user.email, password: '' }), headers: auth_headers

        expect(response).to have_http_status(:unauthorized)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to eq('Invalid email or password')
      end
    end
  end

  describe 'DELETE /api/v1/auth/sign_out' do
    context 'with valid token' do
      it 'returns success message' do
        delete '/api/v1/auth/sign_out', headers: auth_headers(user)

        expect(response).to have_http_status(:ok)
        expect(json_response['success']).to be true
        expect(json_response['message']).to eq('Successfully signed out')
      end
    end

    context 'with invalid token' do
      it 'returns success message (stateless JWT)' do
        delete '/api/v1/auth/sign_out', headers: invalid_token_headers

        expect(response).to have_http_status(:ok)
        expect(json_response['success']).to be true
        expect(json_response['message']).to eq('Successfully signed out')
      end
    end

    context 'without token' do
      it 'returns success message (stateless JWT)' do
        delete '/api/v1/auth/sign_out', headers: auth_headers

        expect(response).to have_http_status(:ok)
        expect(json_response['success']).to be true
        expect(json_response['message']).to eq('Successfully signed out')
      end
    end
  end

  describe 'GET /api/v1/auth/me' do
    context 'with valid token' do
      it 'returns current user data' do
        get '/api/v1/auth/me', headers: auth_headers(user)

        expect(response).to have_http_status(:ok)
        expect(json_response['success']).to be true
        expect(json_response['data']['user']['email']).to eq(user.email)
        expect(json_response['data']['user']['id']).to eq(user.id)
      end

      it 'includes all required user fields' do
        get '/api/v1/auth/me', headers: auth_headers(user)

        user_data = json_response['data']['user']
        expect(user_data).to include(
          'id', 'email', 'name', 'phone', 'roles', 'role_name',
          'confirmed_at', 'created_at', 'updated_at'
        )
      end
    end

    context 'with invalid token' do
      it 'returns unauthorized error' do
        get '/api/v1/auth/me', headers: invalid_token_headers

        expect(response).to have_http_status(:unauthorized)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to be_present
      end
    end

    context 'with expired token' do
      it 'returns unauthorized error' do
        get '/api/v1/auth/me', headers: expired_token_headers(user)

        expect(response).to have_http_status(:unauthorized)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to be_present
      end
    end

    context 'without token' do
      it 'returns unauthorized error' do
        get '/api/v1/auth/me', headers: auth_headers

        expect(response).to have_http_status(:unauthorized)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to be_present
      end
    end

    context 'with non-existent user in token' do
      it 'returns unauthorized error' do
        # Create a token for a non-existent user
        payload = {
          user_id: 99999,
          email: 'nonexistent@example.com',
          exp: 24.hours.from_now.to_i
        }
        token = JWT.encode(payload, Rails.application.credentials.secret_key_base, "HS256")
        headers = { 'Authorization' => "Bearer #{token}", 'Content-Type' => 'application/json' }

        get '/api/v1/auth/me', headers: headers

        expect(response).to have_http_status(:unauthorized)
        expect(json_response['success']).to be_nil
        expect(json_response['error']).to be_present
      end
    end
  end
end
