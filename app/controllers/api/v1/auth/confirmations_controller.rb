class Api::V1::Auth::ConfirmationsController < Api::BaseController
  skip_before_action :authenticate_api_user!, only: [ :create, :show ]

  # GET /api/v1/auth/confirmation
  def show
    user = User.confirm_by_token(params[:confirmation_token])

    if user.errors.empty?
      render_success({
        user: serialize_user(user)
      }, "Your email address has been successfully confirmed")
    else
      if user.persisted? && user.confirmed?
        render_error("Email was already confirmed, please try signing in", :unprocessable_entity)
      elsif user.persisted? && !user.confirmation_period_valid?
        render_error("Confirmation token has expired. Please request a new one", :unprocessable_entity)
      else
        render_error("Invalid confirmation token", :unprocessable_entity)
      end
    end
  end

  # POST /api/v1/auth/confirmation
  def create
    user = User.find_by(email: params[:email])

    if user.blank?
      render_error("User not found", :not_found)
    elsif user.confirmed?
      render_error("User already confirmed", :unprocessable_entity)
    else
      user.send_confirmation_instructions
      render_success({}, "Confirmation instructions have been sent to your email")
    end
  end

  private

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
