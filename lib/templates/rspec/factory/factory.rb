FactoryBot.define do
  factory :<%= singular_table_name %> do
    sequence(:name) { |n| "User #{n}" }
    <% if options[:email] %>
    sequence(:email) { |n| "user#{n}@example.com" }
    <% end %>
    <% if options[:phone] %>
    sequence(:phone) { |n| "+551199999#{n.to_s.rjust(4, '0')}" }
    <% end %>
    <% if options[:status] %>
    status { "active" }
    <% end %>
    <% if options[:password] %>
    password { "password123" }
    password_confirmation { "password123" }
    <% end %>
    <% if options[:confirmed] %>
    confirmed_at { Time.current }
    <% end %>
    <% if options[:admin] %>
    admin { false }
    <% end %>

    trait :admin do
      <% if options[:admin] %>
      admin { true }
      <% end %>
    end

    trait :with_invalid_attributes do
      name { nil }
      <% if options[:email] %>
      email { "invalid_email" }
      <% end %>
      <% if options[:phone] %>
      phone { "invalid_phone" }
      <% end %>
    end

    trait :unconfirmed do
      <% if options[:confirmed] %>
      confirmed_at { nil }
      <% end %>
    end

    trait :inactive do
      <% if options[:status] %>
      status { "inactive" }
      <% end %>
    end
  end
end 