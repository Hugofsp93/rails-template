class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :html, :json

  before_action :configure_sign_up_params, only: [ :create ]

  def create
    super do |user|
      if user.persisted?
        sign_out(user)
        if user.active_for_authentication?
          flash[:success] = "Successfully signed up"
        else
          flash[:notice] = "A message with a confirmation link has been sent to your email address. Please follow the link to activate your account."
        end
        redirect_to "/sign_in" and return
      else
        flash[:error] = user.errors.full_messages.join(", ")
        redirect_to "/sign_up" and return
      end
    end
  end

  def update
    # Prevent logout when editing other users
    if params[:id] && params[:id].to_i != current_user.id
      @user = User.find(params[:id])
      if @user.update(user_params)
        redirect_to user_url(@user), notice: "User was successfully updated."
      else
        redirect_to edit_user_url(@user), inertia: { errors: @user.errors }
      end
    else
      super
    end
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :name, :terms ])
  end

  def user_params
    params.require(:user).permit(
      :name,
      :email,
      :phone,
      :password,
      :password_confirmation
    )
  end
end
