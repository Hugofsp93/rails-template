require "rails_helper"

RSpec.describe Role, type: :model do
  describe "validations" do
    it { should validate_presence_of(:name) }
    
    
  end

  describe "associations" do
    
    
  end

  describe "callbacks" do
    
  end

  describe "scopes" do
    

    
  end

  describe "methods" do
    describe "#full_name" do
      it "returns the full name" do
        role = create(:role, first_name: "John", last_name: "Doe")
        expect(role.full_name).to eq("John Doe")
      end
    end

    
  end
end 