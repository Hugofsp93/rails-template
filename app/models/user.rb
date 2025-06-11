class User < ApplicationRecord
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable

  attr_accessor :admin_creation

  has_many :nades, dependent: :destroy

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :phone, presence: true, uniqueness: true, format: {
    with: /\A\+?[1-9]\d{1,14}\z/,
    message: "must be a valid phone number"
  }, if: :should_validate_phone?
  validates :name, presence: true
  validates :password, presence: true, length: { minimum: 6 }, on: :create
  validates :password_confirmation, presence: true, on: :create
  validate :password_required?, on: :update

  # Callback to assign default role after creation
  after_create :assign_default_role

  # Role helper methods
  def super_admin?
    has_role?(:super_admin)
  end

  def admin?
    has_role?(:admin)
  end

  def operator?
    has_role?(:operator)
  end

  def role_name
    roles.first&.name || "operator"
  end

  def can_manage_users?
    super_admin? || admin?
  end

  def can_delete_user?(target_user)
    return true if super_admin?
    return false if target_user.super_admin? || target_user.admin?
    admin?
  end

  def can_edit_user?(target_user)
    return true if super_admin?
    return true if admin? && !target_user.super_admin?
    return true if operator? && target_user == self
    false
  end

  def password_required?
    if password.present?
      if password.length < 6
        errors.add(:password, "must be at least 6 characters long")
      end

      if password_confirmation.blank?
        errors.add(:password_confirmation, "can't be blank")
      else
        password == password_confirmation ? true : errors.add(:password_confirmation, "doesn't match password")
      end
    else
      false
    end
  end

  private

  def should_validate_phone?
    admin_creation || persisted?
  end

  def assign_default_role
    # If user already has roles, don't assign default
    return if roles.any?

    # Assign operator role by default for new registrations
    add_role(:operator) unless admin_creation
  end
end
