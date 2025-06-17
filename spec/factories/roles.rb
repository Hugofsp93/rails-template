FactoryBot.define do
  factory :role do
    sequence(:name) { |n| "role_#{n}" }

    trait :super_admin do
      name { "super_admin" }
    end

    trait :admin do
      name { "admin" }
    end

    trait :operator do
      name { "operator" }
    end
  end
end
