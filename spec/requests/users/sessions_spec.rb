require 'rails_helper'

RSpec.describe 'Users::Sessions', type: :request do
  let(:user) { create(:user) }

  describe 'GET /users/sign_in' do
    context 'when user is not authenticated' do
      it 'renders sign in page' do
        get '/sign_in'
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when user is already authenticated' do
      before do
        sign_in user, scope: :user
      end

      it 'redirects to user profile' do
        get '/sign_in'
        expect(response).to redirect_to(root_path)
      end
    end
  end

  describe 'POST /users/sign_in' do
    context 'with valid credentials' do
      let(:valid_params) do
        {
          user: {
            email: user.email,
            password: 'lklklklk'
          }
        }
      end

      it 'signs in user successfully' do
        post '/users/sign_in', params: valid_params
        expect(response).to redirect_to(user_path(user))
        expect(flash[:success]).to eq('Successfully signed in')
      end

      it 'sets user session' do
        post '/users/sign_in', params: valid_params
        expect(controller.current_user).to eq(user)
      end
    end

    context 'with invalid email' do
      let(:invalid_params) do
        {
          user: {
            email: 'invalid@example.com',
            password: 'lklklklk'
          }
        }
      end

      it 'redirects to sign in page' do
        post '/users/sign_in', params: invalid_params
        expect(response).to redirect_to('/sign_in')
        expect(flash[:error]).to eq('Invalid email or password')
      end
    end

    context 'with invalid password' do
      let(:invalid_params) do
        {
          user: {
            email: user.email,
            password: 'wrongpassword'
          }
        }
      end

      it 'redirects to sign in page' do
        post '/users/sign_in', params: invalid_params
        expect(response).to redirect_to('/sign_in')
        expect(flash[:error]).to eq('Invalid email or password')
      end
    end

    context 'with unconfirmed user' do
      let(:unconfirmed_user) { create(:user, :unconfirmed) }
      let(:unconfirmed_params) do
        {
          user: {
            email: unconfirmed_user.email,
            password: 'lklklklk'
          }
        }
      end

      it 'redirects to resend confirmation page' do
        post '/users/sign_in', params: unconfirmed_params
        expect(response).to redirect_to('/resend_confirmation')
        expect(flash[:error]).to eq('You need to confirm your email address before continuing.')
      end
    end

    context 'with missing email' do
      let(:missing_email_params) do
        {
          user: {
            email: '',
            password: 'lklklklk'
          }
        }
      end

      it 'redirects to sign in page' do
        post '/users/sign_in', params: missing_email_params
        expect(response).to redirect_to('/sign_in')
        expect(flash[:error]).to eq('Invalid email or password')
      end
    end

    context 'with missing password' do
      let(:missing_password_params) do
        {
          user: {
            email: user.email,
            password: ''
          }
        }
      end

      it 'redirects to sign in page' do
        post '/users/sign_in', params: missing_password_params
        expect(response).to redirect_to('/sign_in')
        expect(flash[:error]).to eq('Invalid email or password')
      end
    end
  end

  describe 'DELETE /users/sign_out' do
    context 'when user is authenticated' do
      before do
        sign_in user, scope: :user
      end

      it 'signs out user successfully' do
        delete '/users/sign_out'
        expect(response).to redirect_to(root_path)
        expect(flash[:error]).to eq('Successfully signed out')
      end

      it 'clears user session' do
        delete '/users/sign_out'
        expect(controller.current_user).to be_nil
      end
    end

    context 'when user is not authenticated' do
      it 'redirects to sign in page' do
        delete '/users/sign_out'
        expect(response).to redirect_to(root_path)
      end
    end
  end
end
