FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.unique.email }
    phone { "+#{Faker::Number.number(digits: 12)}" }
    password { "lklklklk" }
    password_confirmation { "lklklklk" }
    confirmed_at { Time.current }

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
  end
end
