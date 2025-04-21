module ApplicationHelper
  def mailer_domain
    if Rails.env.production?
      "https://app.hugofsp.com"
    else
      "http://localhost:3000"
    end
  end
end
