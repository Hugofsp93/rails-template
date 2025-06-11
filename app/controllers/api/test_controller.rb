class Api::TestController < ApplicationController
  skip_before_action :verify_authenticity_token

  def clear_database
    # Only allow in test environment
    return head :forbidden unless Rails.env.test?

    # Clear all data except users (to maintain authentication)
    Nade.destroy_all

    render json: { message: "Database cleared successfully" }
  end

  def seed_data
    # Only allow in test environment
    return head :forbidden unless Rails.env.test?

    # Create test users if they don't exist
    admin_user = User.find_or_create_by(email: "admin@example.com") do |user|
      user.name = "Admin User"
      user.phone = "+5511999999999"
      user.password = "password123"
      user.password_confirmation = "password123"
      user.confirmed_at = Time.current
    end

    regular_user = User.find_or_create_by(email: "user@example.com") do |user|
      user.name = "Regular User"
      user.phone = "+5511888888888"
      user.password = "password123"
      user.password_confirmation = "password123"
      user.confirmed_at = Time.current
    end

    # Create some test nades
    5.times do |i|
      Nade.create!(
        name: "Test Nade #{i + 1}",
        description: "Test Description #{i + 1}",
        age: rand(18..80),
        population: rand(100000..10000000),
        price: rand(10.0..1000.0).round(2),
        total: rand(100.0..5000.0).round(2),
        is_active: [ true, false ].sample,
        published_at: rand(1.year.ago..1.year.from_now),
        birth_date: rand(50.years.ago..20.years.ago).to_date,
        start_time: Time.current.change(hour: rand(0..23), min: rand(0..59)),
        user: admin_user
      )
    end

    render json: { message: "Test data seeded successfully" }
  end
end
