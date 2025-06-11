# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Create roles
puts "Creating roles..."
super_admin_role = Role.find_or_create_by(name: 'super_admin')
admin_role = Role.find_or_create_by(name: 'admin')
operator_role = Role.find_or_create_by(name: 'operator')

puts "Roles created: #{Role.pluck(:name).join(', ')}"

# Assign super_admin role to the existing user (ID 1)
if user = User.find_by(id: 1)
  user.add_role(:super_admin) unless user.super_admin?
  puts "Super admin role assigned to user: #{user.email}"
else
  puts "User with ID 1 not found. Please create a super admin user manually."
end

puts "Seeds completed!"
