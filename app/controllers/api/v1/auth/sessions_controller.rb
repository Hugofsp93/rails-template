class Api::V1::Auth::SessionsController < Api::BaseController
  skip_before_action :authenticate_api_user!, only: [ :create, :destroy ]

  # POST /api/v1/auth/sign_in
  def create
    user = User.find_by(email: params[:email])

    if user&.valid_password?(params[:password])
      if user.confirmed?
        token = generate_jwt_token(user)
        render_success({
          user: serialize_user(user),
          token: token
        }, "Successfully signed in")
      else
        render_error("You need to confirm your email address before continuing.", :unprocessable_entity)
      end
    else
      render_error("Invalid email or password", :unauthorized)
    end
  end

  # DELETE /api/v1/auth/sign_out
  def destroy
    # In a stateless JWT setup, we don't actually "sign out" on the server
    # The client should remove the token. Always return success for better UX.
    render_success({}, "Successfully signed out")
  end

  # GET /api/v1/auth/me
  def me
    render_success({
      user: serialize_user(current_api_user)
    })
  end

  private

  def generate_jwt_token(user)
    payload = {
      user_id: user.id,
      email: user.email,
      exp: 24.hours.from_now.to_i
    }
    JWT.encode(payload, jwt_secret_key, "HS256")
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
