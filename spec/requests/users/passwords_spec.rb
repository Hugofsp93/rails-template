require 'rails_helper'

RSpec.describe 'Users::Passwords', type: :request do
  let(:user) { create(:user) }

  describe 'GET /users/password/new' do
    context 'when user is not authenticated' do
      it 'renders forgot password page' do
        get '/users/password/new'
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when user is already authenticated' do
      before do
        sign_in user, scope: :user
      end

      it 'redirects to user profile' do
        get '/users/password/new'
        expect(response).to redirect_to(root_path)
      end
    end
  end

  describe 'POST /users/password' do
    context 'with valid email' do
      let(:valid_params) do
        {
          user: {
            email: user.email
          }
        }
      end

      it 'sends reset password instructions' do
        post '/users/password', params: valid_params
        expect(response).to redirect_to('/sign_in')
        expect(flash[:notice]).to be_present
      end

      it 'generates reset password token' do
        expect {
          post '/users/password', params: valid_params
        }.to change { user.reload.reset_password_token }.from(nil)
      end

      it 'sets reset password sent at timestamp' do
        expect {
          post '/users/password', params: valid_params
        }.to change { user.reload.reset_password_sent_at }.from(nil)
      end
    end

    context 'with non-existent email' do
      let(:invalid_params) do
        {
          user: {
            email: 'nonexistent@example.com'
          }
        }
      end

      it 'redirects to forgot password page with error' do
        post '/users/password', params: invalid_params
        expect(response).to redirect_to('/forgot_password')
        expect(flash[:error]).to eq('Email not found')
      end
    end

    context 'with missing email' do
      let(:missing_params) do
        {
          user: {
            email: ''
          }
        }
      end

      it 'redirects to forgot password page with error' do
        post '/users/password', params: missing_params
        expect(response).to redirect_to('/forgot_password')
        expect(flash[:error]).to eq('Email not found')
      end
    end

    context 'with invalid email format' do
      let(:invalid_format_params) do
        {
          user: {
            email: 'invalid-email'
          }
        }
      end

      it 'redirects to forgot password page with error' do
        post '/users/password', params: invalid_format_params
        expect(response).to redirect_to('/forgot_password')
        expect(flash[:error]).to eq('Email not found')
      end
    end
  end

  describe 'GET /users/password/edit' do
    context 'with valid reset password token' do
      before do
        user.update!(
          reset_password_token: Devise.token_generator.generate(User, :reset_password_token),
          reset_password_sent_at: Time.current
        )
      end

      it 'renders reset password page' do
        get '/users/password/edit', params: { reset_password_token: user.reset_password_token }
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid reset password token' do
      it 'redirects to sign in page' do
        get '/users/password/edit', params: { reset_password_token: 'invalid_token' }
        expect(response).to redirect_to('/sign_in')
      end
    end

    context 'with missing reset password token' do
      it 'redirects to sign in page' do
        get '/users/password/edit'
        expect(response).to redirect_to('/users/sign_in')
      end
    end
  end

  describe 'PUT /users/password' do
    let(:reset_password_params) do
      {
        user: {
          reset_password_token: user.reset_password_token,
          password: 'newpassword123',
          password_confirmation: 'newpassword123'
        }
      }
    end

    before do
      user.update!(
        reset_password_token: Devise.token_generator.generate(User, :reset_password_token),
        reset_password_sent_at: Time.current
      )
    end

    context 'with valid parameters' do
      it 'resets password successfully' do
        put '/users/password', params: reset_password_params
        expect(response).to redirect_to('/sign_in')
        expect(flash[:success]).to eq('Password updated successfully!')
      end

      it 'allows user to sign in with new password' do
        # Reset password first
        put '/users/password', params: reset_password_params
        expect(response).to redirect_to('/sign_in')

        # Reload user to ensure password is updated
        user.reload

        # Test login with new password
        sign_in_params = {
          user: {
            email: user.email,
            password: 'newpassword123'
          }
        }
        post '/users/sign_in', params: sign_in_params
        expect(response).to redirect_to(user_path(user))
      end

      it 'prevents sign in with old password' do
        # Reset password first
        put '/users/password', params: reset_password_params

        # Reload user to ensure password is updated
        user.reload

        # Test login with old password should fail
        sign_in_params = {
          user: {
            email: user.email,
            password: 'lklklklk'
          }
        }
        post '/users/sign_in', params: sign_in_params
        expect(response).to redirect_to('/sign_in')
        expect(flash[:error]).to eq('Invalid email or password')
      end
    end

    context 'with invalid token' do
      let(:invalid_params) do
        {
          user: {
            reset_password_token: 'invalid_token',
            password: 'newpassword123',
            password_confirmation: 'newpassword123'
          }
        }
      end

      it 'redirects to sign in page with error' do
        put '/users/password', params: invalid_params
        expect(response).to redirect_to('/sign_in')
        expect(flash[:error]).to eq('Invalid token')
      end
    end

    context 'with mismatched password confirmation' do
      let(:mismatched_params) do
        {
          user: {
            reset_password_token: user.reset_password_token,
            password: 'newpassword123',
            password_confirmation: 'differentpassword'
          }
        }
      end

      it 'renders reset password page with errors' do
        put '/users/password', params: mismatched_params
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'with short password' do
      let(:short_password_params) do
        {
          user: {
            reset_password_token: user.reset_password_token,
            password: '12345',
            password_confirmation: '12345'
          }
        }
      end

      it 'renders reset password page with errors' do
        put '/users/password', params: short_password_params
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'with missing password' do
      let(:missing_password_params) do
        {
          user: {
            reset_password_token: user.reset_password_token,
            password: '',
            password_confirmation: ''
          }
        }
      end

      it 'renders reset password page with errors' do
        put '/users/password', params: missing_password_params
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  # Teste específico para verificar se o reset de senha está funcionando corretamente
  describe 'Password reset flow' do
    it 'completes the full password reset flow' do
      # Step 1: Request password reset
      post '/users/password', params: { user: { email: user.email } }
      expect(response).to redirect_to('/sign_in')
      
      # Step 2: Get the reset token
      user.reload
      token = user.reset_password_token
      expect(token).to be_present
      
      # Step 3: Access reset password page
      get '/users/password/edit', params: { reset_password_token: token }
      expect(response).to have_http_status(:ok)
      
      # Step 4: Reset password
      put '/users/password', params: {
        user: {
          reset_password_token: token,
          password: 'newpassword123',
          password_confirmation: 'newpassword123'
        }
      }
      expect(response).to redirect_to('/sign_in')
      expect(flash[:success]).to eq('Password updated successfully!')
      
      # Step 5: Verify password was changed
      user.reload
      expect(user.valid_password?('newpassword123')).to be true
      expect(user.valid_password?('lklklklk')).to be false
    end
  end
end
