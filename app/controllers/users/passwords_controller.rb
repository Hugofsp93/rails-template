class Users::PasswordsController < Devise::PasswordsController
  respond_to :html, :json

  def create
    user = User.find_by(email: params[:user][:email])
    if user.blank?
      flash[:error] = "Email not found"
      redirect_to "/forgot_password"
    else
      super
    end
  end

  def update
    self.resource = resource_class.reset_password_by_token(resource_params)

    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      flash[:success] = "Password updated successfully!"
      redirect_to after_resetting_password_path_for(resource)
    else
      if resource.errors[:reset_password_token].present?
        flash[:error] = "Invalid token"
        redirect_to after_resetting_password_path_for(resource)
      else
        respond_with resource
      end
    end
  end

  protected

  def after_sending_reset_password_instructions_path_for(resource_name)
    "/sign_in"
  end

  def after_resetting_password_path_for(resource)
    "/sign_in"
  end
end
