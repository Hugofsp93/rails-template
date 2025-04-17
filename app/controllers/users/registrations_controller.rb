class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :html, :json

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
      end
    end
  end
end
