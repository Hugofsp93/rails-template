class ApplicationController < ActionController::Base
  include Pundit::Authorization

  before_action :authenticate_user!
  before_action :set_flash
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  include Pagy::Backend

  # Pundit error handling
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  # take care of what type of data is being shared, we can access this with usePage() from inertiajs
  inertia_share do
    {
      currentUser: current_user ? {
        id: current_user.id,
        email: current_user.email,
        name: current_user.name,
        roles: current_user.roles.pluck(:name),
        role_name: current_user.role_name,
        super_admin: current_user.super_admin?,
        admin: current_user.admin?,
        operator: current_user.operator?
      } : nil,
      flash: flash.to_h
    }
  end

  private

  def set_flash
    @flash = flash.to_h
  end

  def user_not_authorized
    flash[:error] = "You are not authorized to perform this action."
    redirect_to(request.referrer || root_path)
  end
end
