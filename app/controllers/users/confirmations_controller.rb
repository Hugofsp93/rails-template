class Users::ConfirmationsController < Devise::ConfirmationsController
  respond_to :html, :json

  def show
    self.resource = resource_class.confirm_by_token(params[:confirmation_token])

    if resource.errors.empty?
      set_flash_message!(:success, :confirmed)
      redirect_to "/sign_in"
    else
      if resource.confirmed?
        set_flash_message!(:error, :already_confirmed)
      elsif !resource.confirmation_period_valid?
        set_flash_message!(:error, :expired)
      else
        set_flash_message!(:error, :invalid)
      end
      redirect_to "/sign_in"
    end
  end

  def create
    user = User.find_by(email: params[:user][:email])
    if user.blank?
      flash[:error] = "User not found"
      redirect_to "/resend_confirmation"
    elsif user.confirmed?
      flash[:error] = "User already confirmed"
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

  private

  def set_flash_message!(type, kind, options = {})
    if type == :success
      flash[:success] = "Your email address has been successfully confirmed."
    elsif type == :error
      case kind
      when :already_confirmed
        flash[:error] = "Email was already confirmed, please try signing in."
      when :expired
        flash[:error] = "Confirmation token has expired. Please request a new one."
      when :invalid
        flash[:error] = "Invalid confirmation token."
      end
    end
  end
end
