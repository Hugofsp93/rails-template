class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  # Include custom validators
  include ActiveModel::Validations
end
