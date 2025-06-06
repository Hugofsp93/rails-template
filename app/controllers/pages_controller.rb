class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :contact ]

  def home
    if user_signed_in?
      redirect_to users_path
    else
      render inertia: "Home"
    end
  end

  def contact
    render inertia: "Contact"
  end
end
