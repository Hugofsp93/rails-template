class Users::ConfirmationsController < Devise::ConfirmationsController
  respond_to :html, :json
  def create
    user = User.find_by(email: params[:user][:email])
    if user.blank?
      flash[:error] = "User not found"
      redirect_to "/resend_confirmation"
    elsif user.confirmed?
      flash[:notice] = "User already confirmed"
      redirect_to "/resend_confirmation"
    else
      flash[:success] = "Confirmation instructions sent"
      user.send_confirmation_instructions
      redirect_to "/sign_in"
    end
  end

  protected

  def after_confirmation_path_for(resource_name, resource)
    "/sign_in"
  end

  def after_resending_confirmation_instructions_path_for(resource_name)
    "/sign_in"
  end
end
