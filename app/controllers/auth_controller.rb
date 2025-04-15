class AuthController < ApplicationController
  skip_before_action :authenticate_user!

  def sign_in
    render inertia: "auth/SignIn"
  end

  def sign_up
    render inertia: "auth/SignUp"
  end

  def forgot_password
    render inertia: "auth/ForgotPassword"
  end

  def reset_password
    render inertia: "auth/ResetPassword"
  end

  def terms
    render inertia: "auth/Terms"
  end
end
