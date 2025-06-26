require 'rails_helper'

RSpec.describe DeviseMailer, type: :mailer do
  let(:user) { create(:user, email: 'test@example.com', name: 'Test User') }

  describe 'confirmation instructions' do
    let(:mail) { DeviseMailer.confirmation_instructions(user, 'confirmation_token_123') }

    it 'renders the headers' do
      expect(mail.subject).to eq('Confirmation instructions')
      expect(mail.to).to eq([ user.email ])
      expect(mail.from).to eq([ 'contato@admin.com' ])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match('Hello Test User')
      expect(mail.body.encoded).to match('You can confirm your account email through the link below:')
      expect(mail.body.encoded).to match('confirmation_token_123')
    end

    it 'includes confirmation link' do
      expect(mail.body.encoded).to include('Confirm my account')
    end

    it 'includes user name in greeting' do
      expect(mail.body.encoded).to include("Hello #{user.name}")
    end
  end

  describe 'reset password instructions' do
    let(:mail) { DeviseMailer.reset_password_instructions(user, 'reset_token_123') }

    it 'renders the headers' do
      expect(mail.subject).to eq('Reset password instructions')
      expect(mail.to).to eq([ user.email ])
      expect(mail.from).to eq([ 'contato@admin.com' ])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match('Hello Test User')
      expect(mail.body.encoded).to match('Someone has requested a link to change your password. You can do this through the link below.')
      expect(mail.body.encoded).to match('reset_token_123')
    end

    it 'includes reset password link' do
      expect(mail.body.encoded).to include('Change my password')
    end

    it 'includes security warning' do
      expect(mail.body.encoded).to include('If you didn\'t request this, please ignore this email.')
    end

    it 'includes user name in greeting' do
      expect(mail.body.encoded).to include("Hello #{user.name}")
    end
  end

  describe 'email changed' do
    let(:mail) { DeviseMailer.email_changed(user) }

    it 'renders the headers' do
      expect(mail.subject).to eq('Email Changed')
      expect(mail.to).to eq([ user.email ])
      expect(mail.from).to eq([ 'contato@admin.com' ])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match('Hello Test User')
      expect(mail.body.encoded).to match('We\'re contacting you to notify you that your email has been changed.')
    end

    it 'includes user name in greeting' do
      expect(mail.body.encoded).to include("Hello #{user.name}")
    end
  end

  describe 'password change' do
    let(:mail) { DeviseMailer.password_change(user) }

    it 'renders the headers' do
      expect(mail.subject).to eq('Password Changed')
      expect(mail.to).to eq([ user.email ])
      expect(mail.from).to eq([ 'contato@admin.com' ])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match('Hello Test User')
      expect(mail.body.encoded).to match('We\'re contacting you to notify you that your password has been changed.')
    end

    it 'includes user name in greeting' do
      expect(mail.body.encoded).to include("Hello #{user.name}")
    end
  end

  # describe 'unlock instructions' do
  #   let(:mail) { DeviseMailer.unlock_instructions(user, 'unlock_token_123') }

  #   it 'renders the headers' do
  #     expect(mail.subject).to eq('Unlock instructions')
  #     expect(mail.to).to eq([ user.email ])
  #     expect(mail.from).to eq([ 'contato@admin.com' ])
  #   end

  #   it 'renders the body' do
  #     expect(mail.body.encoded).to match('Hello Test User')
  #     expect(mail.body.encoded).to match('Your account has been locked due to an excessive number of unsuccessful sign in attempts.')
  #     expect(mail.body.encoded).to match('unlock_token_123')
  #   end

  #   it 'includes unlock link' do
  #     expect(mail.body.encoded).to include('Unlock my account')
  #   end

  #   it 'includes user name in greeting' do
  #     expect(mail.body.encoded).to include("Hello #{user.name}")
  #   end
  # end

  describe 'email formatting' do
    let(:mail) { DeviseMailer.confirmation_instructions(user, 'token') }

    it 'uses proper HTML formatting' do
      expect(mail.body.encoded).to include('<html>')
      expect(mail.body.encoded).to include('</html>')
    end

    it 'uses proper text formatting' do
      expect(mail.body.encoded).to be_present
      expect(mail.body.encoded).to include('Hello Test User')
    end
  end

  describe 'email delivery' do
    it 'delivers confirmation email' do
      expect {
        DeviseMailer.confirmation_instructions(user, 'token').deliver_now
      }.to change { ActionMailer::Base.deliveries.count }.by(1)
    end

    it 'delivers password reset email' do
      expect {
        DeviseMailer.reset_password_instructions(user, 'token').deliver_now
      }.to change { ActionMailer::Base.deliveries.count }.by(1)
    end

    it 'delivers email change notification' do
      expect {
        DeviseMailer.email_changed(user).deliver_now
      }.to change { ActionMailer::Base.deliveries.count }.by(1)
    end

    it 'delivers password change notification' do
      expect {
        DeviseMailer.password_change(user).deliver_now
      }.to change { ActionMailer::Base.deliveries.count }.by(1)
    end
  end

  describe 'email content validation' do
    let(:mail) { DeviseMailer.confirmation_instructions(user, 'token') }

    it 'includes proper email structure' do
      expect(mail.subject).to eq('Confirmation instructions')
      expect(mail.from).to eq(['contato@admin.com'])
      expect(mail.to).to eq([user.email])
    end

    it 'includes proper links' do
      expect(mail.body.encoded).to include('http://localhost:3000')
    end

    it 'includes proper branding' do
      expect(mail.body.encoded).to include('Rails Template')
    end
  end

  describe 'error handling' do
    it 'handles missing user gracefully' do
      expect {
        DeviseMailer.confirmation_instructions(nil, 'token')
      }.not_to raise_error
    end

    it 'handles missing token gracefully' do
      expect {
        DeviseMailer.confirmation_instructions(user, nil)
      }.not_to raise_error
    end
  end
end
