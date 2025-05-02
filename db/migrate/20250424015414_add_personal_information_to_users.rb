class AddPersonalInformationToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :name, :string
    add_column :users, :phone, :string
    add_column :users, :address, :string
    add_column :users, :city, :string
    add_column :users, :state, :string
    add_column :users, :zip_code, :string
    add_column :users, :country, :string
    add_column :users, :birth_date, :date
    add_column :users, :gender, :string
    add_column :users, :terms, :boolean, default: false
  end
end
