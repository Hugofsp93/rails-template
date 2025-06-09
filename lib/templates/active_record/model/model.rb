class <%= class_name %> < <%= parent_class_name.classify %>
<% attributes.select(&:reference?).each do |attribute| -%>
  belongs_to :<%= attribute.name %><%= ', polymorphic: true' if attribute.polymorphic? %><%= ', required: true' if attribute.required? %>
<% end -%>
<% attributes.select(&:rich_text?).each do |attribute| -%>
  has_rich_text :<%= attribute.name %>
<% end -%>
<% attributes.select(&:attachment?).each do |attribute| -%>
  has_one_attached :<%= attribute.name %>
<% end -%>
<% attributes.select(&:attachments?).each do |attribute| -%>
  has_many_attached :<%= attribute.name %>
<% end -%>
<% attributes.select(&:token?).each do |attribute| -%>
  has_secure_token<% if attribute.name != "token" %> :<%= attribute.name %><% end %>
<% end -%>
<% if attributes.any?(&:password_digest?) -%>
  has_secure_password
<% end -%>
<% attributes.select { |attr| [:string, :text].include?(attr.type) }.each do |attribute| -%>
  validates :<%= attribute.name %>, presence: true<% if attribute.name == "email" %>, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }<% end %>
<% end -%>
<% attributes.select { |attr| [:integer, :float, :decimal].include?(attr.type) }.each do |attribute| -%>
  validates :<%= attribute.name %>, numericality: true, allow_nil: true
<% end -%>
<% attributes.select { |attr| [:date, :datetime].include?(attr.type) }.each do |attribute| -%>
  validates :<%= attribute.name %>, date_range: { min: Date.new(1700, 1, 1), max: Date.new(2200, 12, 31) }, allow_nil: true
<% end -%>
<% if attributes.any? { |attr| attr.name == "phone" } -%>
  validates :phone, presence: true, uniqueness: true, format: {
    with: /\A\+?[1-9]\d{1,14}\z/,
    message: "must be a valid phone number"
  }
<% end -%>
<% if attributes.any? { |attr| attr.name == "password" } -%>
  validates :password, presence: true, length: { minimum: 6 }, on: :create
  validates :password_confirmation, presence: true, on: :create
  validate :password_required?, on: :update

  def password_required?
    if password.present?
      if password.length < 6
        errors.add(:password, "must be at least 6 characters long")
      end

      if password_confirmation.blank?
        errors.add(:password_confirmation, "can't be blank")
      else
        password == password_confirmation ? true : errors.add(:password_confirmation, "doesn't match password")
      end
    else
      false
    end
  end
<% end -%>
end
