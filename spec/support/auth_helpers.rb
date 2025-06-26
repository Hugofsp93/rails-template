module AuthHelpers
  def sign_in_user(user = nil)
    user ||= create(:user)
    sign_in user, scope: :user
    user
  end

  def sign_out_user
    sign_out :user
  end

  def create_and_sign_in_user(attributes = {})
    user = create(:user, attributes)
    sign_in user, scope: :user
    user
  end
end

RSpec.configure do |config|
  config.include AuthHelpers, type: :request
end 