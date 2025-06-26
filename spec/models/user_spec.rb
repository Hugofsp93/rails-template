require "rails_helper"

RSpec.describe User, type: :model do
  describe "validations" do
    subject { build(:user) }
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive }
    # it { should validate_presence_of(:phone) } # Removido pois a validação é condicional
    # it { should validate_uniqueness_of(:phone) } # Removido pois pode conflitar com email
    it { should validate_presence_of(:password).on(:create) }
    it { should validate_length_of(:password).is_at_least(6).on(:create) }
    it { should validate_presence_of(:password_confirmation).on(:create) }

    # Manual test for uniqueness if matcher fails
    it "validates uniqueness of email (case insensitive) manually" do
      create(:user, email: "test@example.com")
      user = build(:user, email: "TEST@example.com")
      expect(user).not_to be_valid
      expect(user.errors[:email]).to include("has already been taken")
    end

    # Testes manuais para presença condicional de phone
    it "is invalid without phone when admin_creation is true" do
      user = build(:user, phone: nil, admin_creation: true)
      expect(user).not_to be_valid
      expect(user.errors[:phone]).to include("can't be blank")
    end

    it "is invalid without phone when persisted" do
      user = create(:user)
      user.phone = nil
      expect(user).not_to be_valid
      expect(user.errors[:phone]).to include("can't be blank")
    end

    it "is valid without phone when not admin_creation and not persisted" do
      user = build(:user, phone: nil)
      expect(user).to be_valid
    end

    # Teste manual para unicidade de phone
    it "validates uniqueness of phone manually" do
      create(:user, phone: "+12345678901", email: "unique1@example.com")
      user = build(:user, phone: "+12345678901", email: "unique2@example.com", admin_creation: true)
      expect(user).not_to be_valid
      expect(user.errors[:phone]).to include("has already been taken")
    end
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

    it "downcases email before save" do
      user = build(:user, email: "USER@EXAMPLE.COM")
      user.save
      expect(user.email).to eq("user@example.com")
    end
  end

  describe "phone format" do
    it "is valid with a proper phone format" do
      user = build(:user)
      expect(user).to be_valid
    end

    it "is invalid with an improper phone format" do
      user = build(:user, :with_invalid_phone, admin_creation: true)
      expect(user).not_to be_valid
      expect(user.errors[:phone]).to include("must be a valid phone number")
    end

    it "validates phone only when admin_creation or persisted" do
      user = build(:user, phone: nil)
      expect(user).to be_valid # New user without admin_creation

      user.admin_creation = true
      expect(user).not_to be_valid # Admin creation requires phone
      expect(user.errors[:phone]).to include("can't be blank")

      user = create(:user) # Persisted user
      user.phone = nil
      expect(user).not_to be_valid # Persisted user requires phone
      expect(user.errors[:phone]).to include("can't be blank")
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

    it "requires password confirmation on create" do
      user = build(:user, password_confirmation: nil)
      expect(user).not_to be_valid
      expect(user.errors[:password_confirmation]).to include("can't be blank")
    end

    it "allows password update without confirmation if password is not changed" do
      user = create(:user)
      user.name = "New Name"
      expect(user).to be_valid
    end

    it "requires password confirmation when password is changed" do
      user = create(:user)
      user.password = "newpassword123"
      user.password_confirmation = ""
      expect(user).not_to be_valid
      expect(user.errors[:password_confirmation]).to include("can't be blank")
    end
  end

  describe "confirmation" do
    it "is valid when confirmed" do
      user = build(:user)
      expect(user).to be_valid
    end

    it "is valid when unconfirmed during creation" do
      user = build(:user, :unconfirmed)
      expect(user).to be_valid
    end

    it "is invalid when unconfirmed during update" do
      user = create(:user, :unconfirmed)
      user.name = "New Name"
      expect(user).not_to be_valid
      expect(user.errors[:base]).to include("User must be confirmed")
    end
  end

  describe "callbacks" do
    describe "assign_default_role" do
      it "assigns operator role by default for new registrations" do
        user = create(:user)
        expect(user.roles.first.name).to eq("operator")
      end

      it "does not assign default role if admin_creation is true" do
        user = create(:user, admin_creation: true)
        expect(user.roles).to be_empty
      end

      it "does not assign default role if user already has roles" do
        user = create(:user, :admin)
        expect(user.roles.first.name).to eq("admin")
      end
    end
  end

  describe "role methods" do
    let(:user) { create(:user) }

    describe "#super_admin?" do
      it "returns true for super admin" do
        user.add_role(:super_admin)
        expect(user.super_admin?).to be true
      end

      it "returns false for non-super admin" do
        expect(user.super_admin?).to be false
      end
    end

    describe "#admin?" do
      it "returns true for admin" do
        user.add_role(:admin)
        expect(user.admin?).to be true
      end

      it "returns false for non-admin" do
        expect(user.admin?).to be false
      end
    end

    describe "#operator?" do
      it "returns true for operator" do
        expect(user.operator?).to be true
      end

      it "returns false for non-operator" do
        user.remove_role(:operator)
        expect(user.operator?).to be false
      end
    end
    describe "#can_manage_users?" do
      it "returns true for super admin" do
        user.add_role(:super_admin)
        expect(user.can_manage_users?).to be true
      end

      it "returns true for admin" do
        user.add_role(:admin)
        expect(user.can_manage_users?).to be true
      end

      it "returns false for operator" do
        expect(user.can_manage_users?).to be false
      end
    end

    describe "#can_delete_user?" do
      let(:target_user) { create(:user) }

      it "returns true for super admin" do
        user.add_role(:super_admin)
        expect(user.can_delete_user?(target_user)).to be true
      end

      it "returns false for admin trying to delete super admin" do
        user.add_role(:admin)
        target_user.add_role(:super_admin)
        expect(user.can_delete_user?(target_user)).to be false
      end

      it "returns false for admin trying to delete admin" do
        user.add_role(:admin)
        target_user.add_role(:admin)
        expect(user.can_delete_user?(target_user)).to be false
      end

      it "returns true for admin deleting operator" do
        user.add_role(:admin)
        expect(user.can_delete_user?(target_user)).to be true
      end

      it "returns false for operator" do
        expect(user.can_delete_user?(target_user)).to be false
      end
    end

    describe "#can_edit_user?" do
      let(:target_user) { create(:user) }

      it "returns true for super admin" do
        user.add_role(:super_admin)
        expect(user.can_edit_user?(target_user)).to be true
      end

      it "returns true for admin editing operator" do
        user.add_role(:admin)
        expect(user.can_edit_user?(target_user)).to be true
      end

      it "returns false for admin editing super admin" do
        user.add_role(:admin)
        target_user.add_role(:super_admin)
        expect(user.can_edit_user?(target_user)).to be false
      end

      it "returns true for operator editing self" do
        expect(user.can_edit_user?(user)).to be true
      end

      it "returns false for operator editing other user" do
        expect(user.can_edit_user?(target_user)).to be false
      end
    end
  end
end
