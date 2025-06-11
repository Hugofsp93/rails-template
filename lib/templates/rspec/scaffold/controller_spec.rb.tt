require "rails_helper"

RSpec.describe <%= controller_class_name %>Controller, type: :controller do
  let(:valid_attributes) {
    attributes_for(:<%= singular_table_name %>)
  }

  let(:invalid_attributes) {
    attributes_for(:<%= singular_table_name %>, :with_invalid_attributes)
  }

  let(:<%= singular_table_name %>) { create(:<%= singular_table_name %>) }

  <% if options[:authentication] %>
  before do
    sign_in create(:user)
  end
  <% end %>

  describe "GET #index" do
    it "returns a successful response" do
      get :index
      expect(response).to be_successful
    end

    <% if options[:searchable] %>
    it "filters by search term" do
      create(:<%= singular_table_name %>, name: "Test Item")
      get :index, params: { search: "Test" }
      expect(response).to be_successful
    end
    <% end %>

    <% if options[:filterable] %>
    it "filters by status" do
      create(:<%= singular_table_name %>, status: "active")
      get :index, params: { status: "active" }
      expect(response).to be_successful
    end
    <% end %>

    <% if options[:sortable] %>
    it "sorts by attribute" do
      get :index, params: { sort: "created_at", direction: "desc" }
      expect(response).to be_successful
    end
    <% end %>
  end

  describe "GET #show" do
    it "returns a successful response" do
      get :show, params: { id: <%= singular_table_name %>.to_param }
      expect(response).to be_successful
    end
  end

  describe "GET #new" do
    it "returns a successful response" do
      get :new
      expect(response).to be_successful
    end
  end

  describe "GET #edit" do
    it "returns a successful response" do
      get :edit, params: { id: <%= singular_table_name %>.to_param }
      expect(response).to be_successful
    end
  end

  describe "POST #create" do
    context "with valid parameters" do
      it "creates a new <%= class_name %>" do
        expect {
          post :create, params: { <%= singular_table_name %>: valid_attributes }
        }.to change(<%= class_name %>, :count).by(1)
      end

      it "redirects to the created <%= singular_table_name %>" do
        post :create, params: { <%= singular_table_name %>: valid_attributes }
        expect(response).to redirect_to(<%= class_name %>.last)
      end
    end

    context "with invalid parameters" do
      it "does not create a new <%= class_name %>" do
        expect {
          post :create, params: { <%= singular_table_name %>: invalid_attributes }
        }.to change(<%= class_name %>, :count).by(0)
      end

      it "redirects to the new <%= singular_table_name %> page with errors" do
        post :create, params: { <%= singular_table_name %>: invalid_attributes }
        expect(response).to redirect_to(new_<%= singular_table_name %>_url)
      end
    end
  end

  describe "PUT #update" do
    context "with valid parameters" do
      let(:new_attributes) {
        { name: "New Name" }
      }

      it "updates the requested <%= singular_table_name %>" do
        put :update, params: { id: <%= singular_table_name %>.to_param, <%= singular_table_name %>: new_attributes }
        <%= singular_table_name %>.reload
        expect(<%= singular_table_name %>.name).to eq("New Name")
      end

      it "redirects to the <%= singular_table_name %>" do
        put :update, params: { id: <%= singular_table_name %>.to_param, <%= singular_table_name %>: new_attributes }
        expect(response).to redirect_to(<%= singular_table_name %>)
      end
    end

    context "with invalid parameters" do
      it "redirects to the edit page with errors" do
        put :update, params: { id: <%= singular_table_name %>.to_param, <%= singular_table_name %>: invalid_attributes }
        expect(response).to redirect_to(edit_<%= singular_table_name %>_url(<%= singular_table_name %>))
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested <%= singular_table_name %>" do
      <%= singular_table_name %>_to_delete = create(:<%= singular_table_name %>)
      expect {
        delete :destroy, params: { id: <%= singular_table_name %>_to_delete.to_param }
      }.to change(<%= class_name %>, :count).by(-1)
    end

    it "redirects to the <%= table_name %> list" do
      <%= singular_table_name %>_to_delete = create(:<%= singular_table_name %>)
      delete :destroy, params: { id: <%= singular_table_name %>_to_delete.to_param }
      expect(response).to redirect_to(<%= index_helper %>_url)
    end
  end

  <% if options[:authorization] %>
  describe "Authorization" do
    context "when user is not authorized" do
      before do
        allow(controller).to receive(:authorize!).and_raise(CanCan::AccessDenied)
      end

      it "redirects to root path" do
        get :index
        expect(response).to redirect_to(root_path)
      end
    end
  end
  <% end %>
end 