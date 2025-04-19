class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :set_flash
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # take care of what type of data is being shared, we can access this with usePage() from inertiajs
  inertia_share do
    {
      currentUser: current_user,
      flash: flash.to_h
    }
  end

  private

  def set_flash
    @flash = flash.to_h
  end
end
