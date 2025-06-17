module ApiHelpers
  def json_response
    return {} unless response.content_type.include?('application/json')
    JSON.parse(response.body)
  rescue JSON::ParserError
    {}
  end

  def auth_headers(user = nil)
    if user
      token = generate_jwt_token(user)
      { 'Authorization' => "Bearer #{token}", 'Content-Type' => 'application/json' }
    else
      { 'Content-Type' => 'application/json' }
    end
  end

  def generate_jwt_token(user)
    payload = {
      user_id: user.id,
      email: user.email,
      exp: 24.hours.from_now.to_i
    }
    JWT.encode(payload, Rails.application.credentials.secret_key_base, "HS256")
  end

  def invalid_token_headers
    { 'Authorization' => 'Bearer invalid_token', 'Content-Type' => 'application/json' }
  end

  def expired_token_headers(user)
    payload = {
      user_id: user.id,
      email: user.email,
      exp: 1.hour.ago.to_i
    }
    token = JWT.encode(payload, Rails.application.credentials.secret_key_base, "HS256")
    { 'Authorization' => "Bearer #{token}", 'Content-Type' => 'application/json' }
  end

  # Helper to send JSON params properly
  def json_params(params)
    params.to_json
  end
end

RSpec.configure do |config|
  config.include ApiHelpers, type: :request
end
