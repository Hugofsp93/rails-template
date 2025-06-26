module ApplicationHelper
  include Pagy::Frontend

  def mailer_domain
    if Rails.env.production?
      ENV["MAILER_DOMAIN"]
    else
      "http://localhost:3000"
    end
  end
end
