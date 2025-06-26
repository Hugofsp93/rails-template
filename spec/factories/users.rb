FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.unique.email }
    phone { "+#{Faker::Number.number(digits: 12)}" }
    password { "lklklklk" }
    password_confirmation { "lklklklk" }
    confirmed_at { Time.current }
    terms { true }

    trait :unconfirmed do
      confirmed_at { nil }
    end

    trait :with_invalid_phone do
      phone { "invalid-phone" }
    end

    trait :with_invalid_email do
      email { "invalid-email" }
    end

    trait :with_short_password do
      password { "12345" }
      password_confirmation { "12345" }
    end

    trait :with_mismatched_password do
      password { "lklklklk" }
      password_confirmation { "different123" }
    end

    trait :with_invalid_attributes do
      name { nil }
      email { "invalid-email" }
      phone { "invalid-phone" }
      password { nil }
      password_confirmation { nil }
    end

    trait :super_admin do
      before(:create) do |user|
        user.add_role(:super_admin)
      end
    end

    trait :admin do
      before(:create) do |user|
        user.add_role(:admin)
      end
    end

    trait :operator do
      before(:create) do |user|
        user.add_role(:operator)
      end
    end

    trait :admin_creation do
      admin_creation { true }
    end

    trait :without_phone do
      phone { nil }
    end

    trait :without_password_confirmation do
      password_confirmation { nil }
    end

    # Ensure password is encrypted after creation
    after(:create) do |user|
      user.reload
    end
  end
end
