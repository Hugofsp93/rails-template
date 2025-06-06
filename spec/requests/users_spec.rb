require "rails_helper"

RSpec.describe "Users", type: :request do
  let(:valid_attributes) {
    attributes_for(:user)
  }

  let(:invalid_attributes) {
    attributes_for(:user, :with_invalid_attributes)
  }

  let(:user) { create(:user) }

  before do
    sign_in user
  end

  describe "GET /index" do
    it "renders a successful response" do
      get users_url
      expect(response).to be_successful
    end

    it "filters users by search term" do
      create(:user, name: "John Doe")
      create(:user, name: "Jane Smith")

      get users_url, params: { search: "John" }
      expect(response).to be_successful
    end

    it "filters users by confirmation status" do
      create(:user, :unconfirmed)
      create(:user)

      get users_url, params: { confirmed: "true" }
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      get user_url(user)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_user_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "renders a successful response" do
      get edit_user_url(user)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new User" do
        expect {
          post users_url, params: { user: valid_attributes }
        }.to change(User, :count).by(1)
      end

      it "redirects to the created user" do
        post users_url, params: { user: valid_attributes }
        expect(response).to redirect_to(user_url(User.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new User" do
        expect {
          post users_url, params: { user: invalid_attributes }
        }.to change(User, :count).by(0)
      end

      it "redirects to the new user page with errors" do
        post users_url, params: { user: invalid_attributes }
        expect(response).to redirect_to(new_user_url)
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        { name: "New Name" }
      }

      it "updates the requested user" do
        patch user_url(user), params: { user: new_attributes }
        user.reload
        expect(user.name).to eq("New Name")
      end

      it "redirects to the user" do
        patch user_url(user), params: { user: new_attributes }
        expect(response).to redirect_to(user_url(user))
      end
    end

    context "with invalid parameters" do
      it "redirects to the edit page with errors" do
        patch user_url(user), params: { user: invalid_attributes }
        expect(response).to redirect_to(edit_user_url(user))
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested user" do
      user_to_delete = create(:user)
      expect {
        delete user_url(user_to_delete)
      }.to change(User, :count).by(-1)
    end

    it "redirects to the users list" do
      user_to_delete = create(:user)
      delete user_url(user_to_delete)
      expect(response).to redirect_to(users_url)
    end
  end
end
