class Api::V1::Auth::RegistrationsController < Api::BaseController
  skip_before_action :authenticate_api_user!, only: [ :create ]

  # POST /api/v1/auth/sign_up
  def create
    user = User.new(user_params)
    # Don't set admin_creation = true for API registrations
    # This allows the assign_default_role callback to run

    if user.save
      # Don't sign in automatically for API
      render_success({
        user: serialize_user(user)
      }, "Successfully signed up. Please check your email to confirm your account.")
    else
      render_error(user.errors.full_messages.join(", "), :unprocessable_entity)
    end
  end

  # PUT /api/v1/auth/update
  def update
    if current_api_user.update(user_update_params)
      render_success({
        user: serialize_user(current_api_user)
      }, "Successfully updated")
    else
      render_error(current_api_user.errors.full_messages.join(", "), :unprocessable_entity)
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :phone, :password, :password_confirmation)
  end

  def user_update_params
    params.require(:user).permit(:name, :email, :phone)
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
