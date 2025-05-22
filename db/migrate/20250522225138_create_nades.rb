class CreateNades < ActiveRecord::Migration[8.0]
  def change
    create_table :nades do |t|
      t.string :title
      t.boolean :active
      t.text :description
      t.string :map_name
      t.string :team_function

      t.timestamps
    end
  end
end
