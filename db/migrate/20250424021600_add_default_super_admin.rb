class AddDefaultSuperAdmin < ActiveRecord::Migration[8.0]
  def change
    # User.create(email: "rails@template.com", name: "Super Admin Rails Template", password: "lklklklk", password_confirmation: "lklklklk", confirmed_at: Time.now)
    User.create(
      name: "Super Admin",
      email: "rails@template.com",
      password: "lklklklk",
      password_confirmation: "lklklklk",
      confirmed_at: Time.now,
      # role: "super_admin"
    )
  end
end
