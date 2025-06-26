require 'rails_helper'

RSpec.describe 'Users::Confirmations', type: :request do
  let(:user) do
    User.create!(
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      password: 'lklklklk',
      password_confirmation: 'lklklklk',
      confirmed_at: nil,
      terms: true
    )
  end

  describe 'GET /users/confirmation' do
    context 'with valid confirmation token' do
      before do
        user.update!(
          confirmation_token: Devise.token_generator.generate(User, :confirmation_token),
          confirmation_sent_at: Time.current
        )
      end

      it 'confirms user email successfully' do
        get '/users/confirmation', params: { confirmation_token: user.confirmation_token }
        expect(response).to redirect_to('/sign_in')
        expect(flash[:success]).to eq('Your email address has been successfully confirmed.')
      end

      it 'allows user to sign in after confirmation' do
        get '/users/confirmation', params: { confirmation_token: user.confirmation_token }
        expect(response).to redirect_to('/sign_in')

        # Test login after confirmation
        sign_in_params = {
          user: {
            email: user.email,
            password: 'lklklklk'
          }
        }
        post '/users/sign_in', params: sign_in_params
        expect(response).to redirect_to(user_path(user))
      end
    end

    context 'with already confirmed user' do
      let(:confirmed_user) { create(:user) }

      before do
        confirmed_user.update!(
          confirmation_token: Devise.token_generator.generate(User, :confirmation_token),
          confirmation_sent_at: Time.current
        )
      end

      it 'redirects to sign in page with error' do
        get '/users/confirmation', params: { confirmation_token: confirmed_user.confirmation_token }
        expect(response).to redirect_to('/sign_in')
        expect(flash[:error]).to eq('Email was already confirmed, please try signing in.')
      end
    end

    context 'with expired confirmation token' do
      before do
        user.update!(
          confirmation_sent_at: 4.days.ago,
          confirmation_token: Devise.token_generator.generate(User, :confirmation_token)
        )
      end

      it 'confirms user email successfully even with old token' do
        get '/users/confirmation', params: { confirmation_token: user.confirmation_token }
        expect(response).to redirect_to('/sign_in')
        expect(flash[:success]).to eq('Your email address has been successfully confirmed.')
      end
    end

    context 'with invalid confirmation token' do
      it 'redirects to sign in page with error' do
        get '/users/confirmation', params: { confirmation_token: 'invalid_token' }
        expect(response).to redirect_to('/sign_in')
        expect(flash[:error]).to eq('Invalid confirmation token.')
      end
    end

    context 'with missing confirmation token' do
      it 'redirects to sign in page with error' do
        get '/users/confirmation'
        expect(response).to redirect_to('/sign_in')
        expect(flash[:error]).to eq('Invalid confirmation token.')
      end
    end
  end

  describe 'POST /users/confirmation' do
    context 'with valid email for unconfirmed user' do
      let(:valid_params) do
        {
          user: {
            email: user.email
          }
        }
      end

      it 'sends confirmation instructions' do
        post '/users/confirmation', params: valid_params
        expect(response).to redirect_to('/sign_in')
        expect(flash[:success]).to eq('Confirmation instructions sent')
      end

      it 'generates new confirmation token' do
        # Clear any existing token first
        user.update!(confirmation_token: nil, confirmation_sent_at: nil)

        expect {
          post '/users/confirmation', params: valid_params
        }.to change { user.reload.confirmation_token }.from(nil)
      end

      it 'updates confirmation sent at timestamp' do
        # Clear any existing timestamp first
        user.update!(confirmation_token: nil, confirmation_sent_at: nil)

        expect {
          post '/users/confirmation', params: valid_params
        }.to change { user.reload.confirmation_sent_at }.from(nil)
      end
    end

    context 'with valid email for already confirmed user' do
      let(:confirmed_user) { create(:user) }
      let(:confirmed_params) do
        {
          user: {
            email: confirmed_user.email
          }
        }
      end

      it 'redirects to sign_in page with error' do
        post '/users/confirmation', params: confirmed_params
        expect(response).to redirect_to('/sign_in')
        expect(flash[:error]).to eq('User already confirmed')
      end
    end

    context 'with non-existent email' do
      let(:nonexistent_params) do
        {
          user: {
            email: 'nonexistent@example.com'
          }
        }
      end

      it 'redirects to resend confirmation page with error' do
        post '/users/confirmation', params: nonexistent_params
        expect(response).to redirect_to('/resend_confirmation')
        expect(flash[:error]).to eq('User not found')
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

      it 'redirects to resend confirmation page with error' do
        post '/users/confirmation', params: missing_params
        expect(response).to redirect_to('/resend_confirmation')
        expect(flash[:error]).to eq('User not found')
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

      it 'redirects to resend confirmation page with error' do
        post '/users/confirmation', params: invalid_format_params
        expect(response).to redirect_to('/resend_confirmation')
        expect(flash[:error]).to eq('User not found')
      end
    end
  end

  describe 'GET /users/confirmation/new' do
    context 'when user is not authenticated' do
      it 'redirects to resend confirmation page' do
        get '/users/confirmation/new'
        expect(response).to redirect_to('/resend_confirmation')
      end
    end

    context 'when user is already authenticated' do
      let(:user) { create(:user) }

      before do
        sign_in user, scope: :user
      end

      it 'redirects to user profile' do
        get '/users/confirmation/new'
        expect(response).to redirect_to(user_path(user))
      end
    end
  end
end
