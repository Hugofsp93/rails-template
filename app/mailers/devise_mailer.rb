class DeviseMailer < ActionMailer::Base
  layout "mailer"
  helper :application

  default from: "contato@admin.com"
  default template_path: "devise/mailer"

  def confirmation_instructions(record, token, opts = {})
    @token = token
    @email = record.email
    @resource = record

    mail(
      to: record.email,
      subject: "Confirmation instructions"
    )
  end

  def reset_password_instructions(record, token, opts = {})
    @token = token
    @email = record.email
    @resource = record

    mail(
      to: record.email,
      subject: "Reset password instructions"
    )
  end

  def email_changed(record, opts = {})
    @email = record.email
    @resource = record

    mail(
      to: record.email,
      subject: "Email Changed"
    )
  end

  def password_change(record, opts = {})
    @email = record.email
    @resource = record

    mail(
      to: record.email,
      subject: "Password Changed"
    )
  end

  # def unlock_instructions(record, token, opts = {})
  #   @token = token
  #   @email = record.email
  #   @resource = record

  #   mail(
  #     to: record.email,
  #     subject: "Unlock instructions"
  #   )
  # end
end
