class User < ApplicationRecord
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
end
