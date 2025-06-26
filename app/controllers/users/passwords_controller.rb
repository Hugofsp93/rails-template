class Users::PasswordsController < Devise::PasswordsController
  respond_to :html, :json
  skip_before_action :authenticate_user!, only: [:new, :create, :edit, :update]

  def new
    if user_signed_in?
      redirect_to user_path(current_user)
    else
      render inertia: "auth/ForgotPassword"
    end
  end

  def create
    user = User.find_by(email: params[:user][:email])
    if user.blank?
      flash[:error] = "Email not found"
      redirect_to "/forgot_password"
    else
      super
    end
  end

  def edit
    token = params[:reset_password_token]

    if token.blank?
      flash[:error] = "Invalid or expired password reset link."
      redirect_to "/sign_in"
      return
    end

    # Find user by reset password token
    user = User.find_by(reset_password_token: token)
    if user.blank?
      flash[:error] = "Invalid or expired password reset link."
      redirect_to "/sign_in"
    else
      render inertia: "auth/ResetPassword", props: {
        reset_password_token: token
      }
    end
  end

  def update
    token = resource_params[:reset_password_token]
    password = resource_params[:password]
    password_confirmation = resource_params[:password_confirmation]

    user = User.find_by(reset_password_token: token)

    if user.blank?
      flash[:error] = "Invalid token"
      redirect_to "/sign_in"
      return
    end

    # Validate password
    if password.blank?
      render inertia: "auth/ResetPassword", props: {
        reset_password_token: token,
        errors: [ "Password can't be blank" ]
      }, status: :unprocessable_entity
      return
    end

    if password.length < 6
      render inertia: "auth/ResetPassword", props: {
        reset_password_token: token,
        errors: [ "Password is too short (minimum is 6 characters)" ]
      }, status: :unprocessable_entity
      return
    end

    if password != password_confirmation
      render inertia: "auth/ResetPassword", props: {
        reset_password_token: token,
        errors: [ "Password confirmation doesn't match Password" ]
      }, status: :unprocessable_entity
      return
    end

    # Update password
    user.password = password
    user.password_confirmation = password_confirmation
    user.reset_password_token = nil
    user.reset_password_sent_at = nil

    if user.save
      flash[:success] = "Password updated successfully!"
      redirect_to "/sign_in"
    else
      render inertia: "auth/ResetPassword", props: {
        reset_password_token: token,
        errors: user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  protected

  def after_sending_reset_password_instructions_path_for(resource_name)
    "/sign_in"
  end

  def after_resetting_password_path_for(resource)
    "/sign_in"
  end

  # Override to ensure proper token generation
  def resource_params
    params.require(:user).permit(:email, :password, :password_confirmation, :reset_password_token)
  end
end
