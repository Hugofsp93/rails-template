class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # take care of what type of data is being shared, we can access this with usePage() from inertiajs
  # for now, we are using only current_user, but we can add more data to the inertia_share
  inertia_share currentUser: -> { current_user }
end
