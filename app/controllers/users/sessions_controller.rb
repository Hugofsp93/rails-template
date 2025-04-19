class Users::SessionsController < Devise::SessionsController
  respond_to :html, :json
  skip_before_action :authenticate_user!, only: [ :create ]

  def create
    user = User.find_by(email: params[:user][:email])
    if user && user.valid_password?(params[:user][:password])
      if user.confirmed?
        set_flash_message!(:success, :signed_in)
        super
      else
        set_flash_message!(:error, :unconfirmed)
        redirect_to "/resend_confirmation"
      end
    else
      set_flash_message!(:error, :invalid)
      redirect_to "/sign_in"
    end
  end

  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message!(:error, :signed_out) if signed_out
    yield if block_given?
    respond_to_on_destroy
  end

  protected

  def set_flash_message!(type, kind, options = {})
    if type == :success
      flash[:success] = "Successfully signed in"
    elsif kind == :unconfirmed
      flash[:error] = "You need to confirm your email address before continuing."
    elsif type == :error
      if kind == :signed_out
        flash[:error] = "Successfully signed out"
      else
        flash[:error] = "Invalid email or password"
      end
    end
  end
end
