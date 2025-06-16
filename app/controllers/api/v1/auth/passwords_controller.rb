class Api::V1::Auth::PasswordsController < Api::BaseController
  skip_before_action :authenticate_api_user!, only: [ :create, :update ]

  # POST /api/v1/auth/password
  def create
    user = User.find_by(email: params[:email])

    if user
      user.send_reset_password_instructions
      render_success({}, "Reset password instructions have been sent to your email")
    else
      # Don't reveal if email exists or not for security
      render_success({}, "If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes")
    end
  end

  # PUT /api/v1/auth/password
  def update
    user = User.find_by(email: reset_password_params[:email])

    if user.nil?
      render_error("User not found", :not_found)
      return
    end

    if user.reset_password_token != reset_password_params[:reset_password_token]
      render_error("Invalid or expired reset password token", :unprocessable_entity)
      return
    end

    if User.reset_password_by_token(reset_password_params)
      render_success({
        user: serialize_user(user)
      }, "Password has been changed successfully")
    else
      if user.errors[:reset_password_token].present?
        render_error("Invalid or expired reset password token", :unprocessable_entity)
      else
        render_error(user.errors.full_messages.join(", "), :unprocessable_entity)
      end
    end
  end

  private

  def reset_password_params
    params.require(:user).permit(:reset_password_token, :password, :password_confirmation, :email)
  end

  def serialize_user(user)
    {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      roles: user.roles.pluck(:name),
      role_name: user.role_name,
      confirmed_at: user.confirmed_at,
      created_at: user.created_at,
      updated_at: user.updated_at
    }
  end
end
