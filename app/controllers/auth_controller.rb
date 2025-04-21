class AuthController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :redirect_if_authenticated

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
    token = params[:reset_password_token]
    email = params[:email]

    if token.blank? || email.blank?
      redirect_to "/sign_in", alert: "Invalid or expired password reset link."
      return
    end

    user = User.find_by(email: email)
    if user.blank? || !user.reset_password_period_valid?
      redirect_to "/sign_in", alert: "Invalid or expired password reset link."
      return
    end

    render inertia: "auth/ResetPassword", props: {
      reset_password_token: token,
      email: email
    }
  end

  def resend_confirmation
    render inertia: "auth/ResendConfirmation"
  end

  private

  def redirect_if_authenticated
    if user_signed_in?
      redirect_to root_path, notice: "You are already logged in."
    end
  end
end
