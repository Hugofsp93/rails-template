require 'rails_helper'

RSpec.describe 'Users::Registrations', type: :request do
  describe 'GET /sign_up' do
    context 'when user is not authenticated' do
      it 'renders sign up page' do
        get '/sign_up'
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when user is already authenticated' do
      let(:user) { create(:user) }

      before do
        sign_in user, scope: :user
      end

      it 'redirects to user profile' do
        get '/sign_up'
        expect(response).to redirect_to(root_path)
      end
    end
  end

  describe 'POST /users' do
    context 'with valid parameters' do
      let(:valid_params) do
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

      it 'creates user successfully' do
        expect {
          post '/users', params: valid_params
        }.to change(User, :count).by(1)
      end

      it 'redirects to sign in page with confirmation message' do
        post '/users', params: valid_params
        expect(response).to redirect_to('/sign_in')
        expect(flash[:notice]).to eq('A message with a confirmation link has been sent to your email address. Please follow the link to activate your account.')
      end

      it 'assigns default operator role' do
        post '/users', params: valid_params
        user = User.find_by(email: 'john@example.com')
        expect(user.operator?).to be true
      end

      it 'sends confirmation email' do
        expect {
          post '/users', params: valid_params
        }.to change { ActionMailer::Base.deliveries.count }.by(1)
      end
    end

    context 'with invalid email format' do
      let(:invalid_email_params) do
        {
          user: {
            name: 'John Doe',
            email: 'invalid-email',
            phone: '+1234567890',
            password: 'password123',
            password_confirmation: 'password123',
            terms: true
          }
        }
      end

      it 'does not create user' do
        expect {
          post '/users', params: invalid_email_params
        }.not_to change(User, :count)
      end

      it 'redirects to sign up page with error' do
        post '/users', params: invalid_email_params
        expect(response).to redirect_to('/sign_up')
        expect(flash[:error]).to include('Email')
      end
    end

    context 'with duplicate email' do
      let(:existing_user) { create(:user) }
      let(:duplicate_email_params) do
        {
          user: {
            name: 'John Doe',
            email: existing_user.email,
            phone: '+1234567890',
            password: 'password123',
            password_confirmation: 'password123',
            terms: true
          }
        }
      end

      it 'does not create user' do
        post '/users', params: duplicate_email_params
        expect(flash[:error]).to eq('Email has already been taken')
        expect(flash[:error]).to include('Email')
        expect { }.not_to change(User, :count)
      end

      it 'redirects to sign up page with error' do
        post '/users', params: duplicate_email_params
        expect(response).to redirect_to('/sign_up')
        expect(flash[:error]).to include('Email')
      end
    end

    context 'with invalid phone format' do
      let(:invalid_phone_params) do
        {
          user: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: 'invalid-phone',
            password: 'password123',
            password_confirmation: 'password123',
            terms: true
          }
        }
      end

      it 'does not create user' do
        post '/users', params: invalid_phone_params
        expect {
        }.not_to change(User, :count)
      end

      it 'redirects to sign in page with error' do
        post '/users', params: invalid_phone_params
        expect(response).to redirect_to('/sign_in')
      end
    end

    context 'with duplicate phone' do
      let(:existing_user) { create(:user) }
      let(:duplicate_phone_params) do
        {
          user: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: existing_user.phone,
            password: 'password123',
            password_confirmation: 'password123',
            terms: true
          }
        }
      end

      it 'does not create user' do
        post '/users', params: duplicate_phone_params
        expect {
        }.not_to change(User, :count)
      end

      it 'redirects to sign in page with error' do
        post '/users', params: duplicate_phone_params
        expect(response).to redirect_to('/sign_in')
      end
    end

    context 'with short password' do
      let(:short_password_params) do
        {
          user: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            password: '12345',
            password_confirmation: '12345',
            terms: true
          }
        }
      end

      it 'does not create user' do
        post '/users', params: short_password_params
        expect {
        }.not_to change(User, :count)
      end

      it 'redirects to sign up page with error' do
        post '/users', params: short_password_params
        expect(response).to redirect_to('/sign_up')
        expect(flash[:error]).to include('Password')
      end
    end

    context 'with mismatched password confirmation' do
      let(:mismatched_password_params) do
        {
          user: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            password: 'password123',
            password_confirmation: 'differentpassword',
            terms: true
          }
        }
      end

      it 'does not create user' do
        post '/users', params: mismatched_password_params
        expect {
        }.not_to change(User, :count)
      end

      it 'redirects to sign up page with error' do
        post '/users', params: mismatched_password_params
        expect(response).to redirect_to('/sign_up')
        expect(flash[:error]).to include('Password confirmation')
      end
    end

    context 'with missing name' do
      let(:missing_name_params) do
        {
          user: {
            name: '',
            email: 'john@example.com',
            phone: '+1234567890',
            password: 'password123',
            password_confirmation: 'password123',
            terms: true
          }
        }
      end

      it 'does not create user' do
        post '/users', params: missing_name_params
        expect {
        }.not_to change(User, :count)
      end

      it 'redirects to sign up page with error' do
        post '/users', params: missing_name_params
        expect(response).to redirect_to('/sign_up')
        expect(flash[:error]).to include('Name')
      end
    end

    context 'with missing terms acceptance' do
      let(:missing_terms_params) do
        {
          user: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            password: 'password123',
            password_confirmation: 'password123',
            terms: false
          }
        }
      end

      it 'does not create user' do
        post '/users', params: missing_terms_params
        expect {
        }.not_to change(User, :count)
      end

      it 'redirects to sign in page with error' do
        post '/users', params: missing_terms_params
        expect(response).to redirect_to('/sign_in')
      end
    end

    context 'with missing required fields' do
      let(:missing_fields_params) do
        {
          user: {
            name: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: '',
            terms: false
          }
        }
      end

      it 'does not create user' do
        post '/users', params: missing_fields_params
        expect {
        }.not_to change(User, :count)
      end

      it 'redirects to sign up page with error' do
        post '/users', params: missing_fields_params
        expect(response).to redirect_to('/sign_up')
        expect(flash[:error]).to be_present
      end
    end
  end

  describe 'GET /users/edit' do
    context 'when user is authenticated' do
      let(:user) { create(:user) }

      before do
        sign_in user, scope: :user
      end

      it 'renders edit profile page' do
        get '/users/edit'
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when user is not authenticated' do
      it 'redirects to sign in page' do
        get '/users/edit'
        expect(response).to redirect_to('/users/sign_in')
      end
    end
  end

  describe 'PUT /users' do
    let(:user) { create(:user) }

    before do
      sign_in user, scope: :user
    end

    context 'with valid parameters' do
      let(:valid_params) do
        {
          user: {
            name: 'Updated Name',
            email: 'updated@example.com',
            phone: '+9876543210'
          }
        }
      end

      it 'updates user successfully' do
        put '/users', params: valid_params
        expect(response).to redirect_to(user_path(user))
        expect(flash[:notice]).to eq('Your account has been updated successfully.')
      end

      it 'updates user attributes' do
        put '/users', params: valid_params
        user.reload
        expect(user.name).to eq('Updated Name')
        expect(user.email).to eq('updated@example.com')
        expect(user.phone).to eq('+9876543210')
      end
    end

    context 'with invalid email format' do
      let(:invalid_email_params) do
        {
          user: {
            name: 'Updated Name',
            email: 'invalid-email',
            phone: '+9876543210'
          }
        }
      end

      it 'renders edit page with errors' do
        put '/users', params: invalid_email_params
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'with duplicate email' do
      let(:other_user) { create(:user) }
      let(:duplicate_email_params) do
        {
          user: {
            name: 'Updated Name',
            email: other_user.email,
            phone: '+9876543210'
          }
        }
      end

      it 'renders edit page with errors' do
        put '/users', params: duplicate_email_params
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE /users' do
    let(:user) { create(:user) }

    before do
      sign_in user, scope: :user
    end

    it 'deletes user account' do
      expect {
        delete '/users'
      }.to change(User, :count).by(-1)
    end

    it 'redirects to root page' do
      delete '/users'
      expect(response).to redirect_to('/')
    end
  end
end
