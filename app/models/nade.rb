class Nade < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :map_name, presence: true
  validates :team_function, presence: true
end
