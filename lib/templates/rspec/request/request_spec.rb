require "rails_helper"

RSpec.describe "<%= class_name.pluralize %>", type: :request do
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

  describe "GET /index" do
    it "renders a successful response" do
      get <%= index_helper %>_url
      expect(response).to be_successful
    end

    <% if options[:searchable] %>
    it "filters by search term" do
      create(:<%= singular_table_name %>, name: "Test Item")
      get <%= index_helper %>_url, params: { search: "Test" }
      expect(response).to be_successful
    end
    <% end %>

    <% if options[:filterable] %>
    it "filters by status" do
      create(:<%= singular_table_name %>, status: "active")
      get <%= index_helper %>_url, params: { status: "active" }
      expect(response).to be_successful
    end
    <% end %>
  end

  describe "GET /show" do
    it "renders a successful response" do
      get <%= show_helper %>
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get <%= new_helper %>
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "renders a successful response" do
      get <%= edit_helper %>
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new <%= class_name %>" do
        expect {
          post <%= index_helper %>_url, params: { <%= singular_table_name %>: valid_attributes }
        }.to change(<%= class_name %>, :count).by(1)
      end

      it "redirects to the created <%= singular_table_name %>" do
        post <%= index_helper %>_url, params: { <%= singular_table_name %>: valid_attributes }
        expect(response).to redirect_to(<%= show_helper %>)
      end
    end

    context "with invalid parameters" do
      it "does not create a new <%= class_name %>" do
        expect {
          post <%= index_helper %>_url, params: { <%= singular_table_name %>: invalid_attributes }
        }.to change(<%= class_name %>, :count).by(0)
      end

      it "redirects to the new <%= singular_table_name %> page with errors" do
        post <%= index_helper %>_url, params: { <%= singular_table_name %>: invalid_attributes }
        expect(response).to redirect_to(new_<%= singular_table_name %>_url)
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        { name: "New Name" }
      }

      it "updates the requested <%= singular_table_name %>" do
        patch <%= show_helper %>, params: { <%= singular_table_name %>: new_attributes }
        <%= singular_table_name %>.reload
        expect(<%= singular_table_name %>.name).to eq("New Name")
      end

      it "redirects to the <%= singular_table_name %>" do
        patch <%= show_helper %>, params: { <%= singular_table_name %>: new_attributes }
        expect(response).to redirect_to(<%= show_helper %>)
      end
    end

    context "with invalid parameters" do
      it "redirects to the edit page with errors" do
        patch <%= show_helper %>, params: { <%= singular_table_name %>: invalid_attributes }
        expect(response).to redirect_to(edit_<%= singular_table_name %>_url(<%= singular_table_name %>))
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested <%= singular_table_name %>" do
      <%= singular_table_name %>_to_delete = create(:<%= singular_table_name %>)
      expect {
        delete <%= show_helper %>
      }.to change(<%= class_name %>, :count).by(-1)
    end

    it "redirects to the <%= table_name %> list" do
      <%= singular_table_name %>_to_delete = create(:<%= singular_table_name %>)
      delete <%= show_helper %>
      expect(response).to redirect_to(<%= index_helper %>_url)
    end
  end

  <% if options[:authorization] %>
  describe "Authorization" do
    context "when user is not authorized" do
      before do
        allow_any_instance_of(ApplicationController).to receive(:authorize!).and_raise(CanCan::AccessDenied)
      end

      it "redirects to root path" do
        get <%= index_helper %>_url
        expect(response).to redirect_to(root_path)
      end
    end
  end
  <% end %>
end 