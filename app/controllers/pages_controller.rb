class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :contact ]

  def home
    render inertia: "Home"
  end

  def contact
    render inertia: "Contact"
  end
end
