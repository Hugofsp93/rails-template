require "rails_helper"

RSpec.describe User, type: :model do
  describe "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive }
    it { should validate_presence_of(:phone) }
    it { should validate_uniqueness_of(:phone) }
    it { should validate_presence_of(:password).on(:create) }
    it { should validate_length_of(:password).is_at_least(6).on(:create) }
    it { should validate_presence_of(:password_confirmation).on(:create) }
  end

  describe "email format" do
    it "is valid with a proper email format" do
      user = build(:user)
      expect(user).to be_valid
    end

    it "is invalid with an improper email format" do
      user = build(:user, :with_invalid_email)
      expect(user).not_to be_valid
      expect(user.errors[:email]).to include("is invalid")
    end
  end

  describe "phone format" do
    it "is valid with a proper phone format" do
      user = build(:user)
      expect(user).to be_valid
    end

    it "is invalid with an improper phone format" do
      user = build(:user, :with_invalid_phone)
      expect(user).not_to be_valid
      expect(user.errors[:phone]).to include("must be a valid phone number")
    end
  end

  describe "password validation" do
    it "is valid with a proper password" do
      user = build(:user)
      expect(user).to be_valid
    end

    it "is invalid with a short password" do
      user = build(:user, :with_short_password)
      expect(user).not_to be_valid
      expect(user.errors[:password]).to include("must be at least 6 characters long")
    end

    it "is invalid with mismatched password confirmation" do
      user = build(:user, :with_mismatched_password)
      expect(user).not_to be_valid
      expect(user.errors[:password_confirmation]).to include("doesn't match password")
    end
  end

  describe "confirmation" do
    it "is valid when confirmed" do
      user = build(:user)
      expect(user).to be_valid
    end

    it "is invalid when unconfirmed" do
      user = build(:user, :unconfirmed)
      expect(user).not_to be_valid
    end
  end
end
