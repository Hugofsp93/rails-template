require "rails_helper"

RSpec.describe <%= class_name %>, type: :model do
  describe "validations" do
    it { should validate_presence_of(:name) }
    <% if options[:email] %>
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive }
    it { should allow_value("user@example.com").for(:email) }
    it { should_not allow_value("invalid_email").for(:email) }
    <% end %>
    <% if options[:phone] %>
    it { should validate_presence_of(:phone) }
    it { should allow_value("+5511999999999").for(:phone) }
    it { should_not allow_value("invalid_phone").for(:phone) }
    <% end %>
  end

  describe "associations" do
    <% if options[:belongs_to] %>
    it { should belong_to(:<%= options[:belongs_to] %>) }
    <% end %>
    <% if options[:has_many] %>
    it { should have_many(:<%= options[:has_many] %>) }
    <% end %>
  end

  describe "callbacks" do
    <% if options[:before_save] %>
    it "runs before_save callbacks" do
      <%= singular_table_name %> = build(:<%= singular_table_name %>)
      expect(<%= singular_table_name %>).to receive(:before_save_callback)
      <%= singular_table_name %>.save
    end
    <% end %>
  end

  describe "scopes" do
    <% if options[:searchable] %>
    describe ".search" do
      it "returns matching records" do
        create(:<%= singular_table_name %>, name: "Test Item")
        create(:<%= singular_table_name %>, name: "Other Item")
        expect(<%= class_name %>.search("Test").count).to eq(1)
      end
    end
    <% end %>

    <% if options[:filterable] %>
    describe ".filter_by_status" do
      it "returns records with matching status" do
        create(:<%= singular_table_name %>, status: "active")
        create(:<%= singular_table_name %>, status: "inactive")
        expect(<%= class_name %>.filter_by_status("active").count).to eq(1)
      end
    end
    <% end %>
  end

  describe "methods" do
    describe "#full_name" do
      it "returns the full name" do
        <%= singular_table_name %> = create(:<%= singular_table_name %>, first_name: "John", last_name: "Doe")
        expect(<%= singular_table_name %>.full_name).to eq("John Doe")
      end
    end

    <% if options[:status] %>
    describe "#active?" do
      it "returns true when status is active" do
        <%= singular_table_name %> = create(:<%= singular_table_name %>, status: "active")
        expect(<%= singular_table_name %>.active?).to be true
      end

      it "returns false when status is not active" do
        <%= singular_table_name %> = create(:<%= singular_table_name %>, status: "inactive")
        expect(<%= singular_table_name %>.active?).to be false
      end
    end
    <% end %>
  end
end 