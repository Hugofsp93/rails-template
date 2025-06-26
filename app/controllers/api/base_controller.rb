class Api::BaseController < ApplicationController
  skip_before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  before_action :authenticate_api_user!

  # Para testes, aceita qualquer request
  # Em produção, você pode adicionar autenticação JWT, API keys, etc.

  private

  def authenticate_api_user!
    token = extract_token_from_header
    return render_unauthorized unless token

    begin
      decoded_token = JWT.decode(token, jwt_secret_key, true, { algorithm: "HS256" })
      payload = decoded_token[0]
      user_id = payload["user_id"]
      
      # Validate required claims - exp is mandatory
      return render_unauthorized unless user_id && payload["exp"]
      
      # Validate iat is not in the future
      if payload["iat"] && payload["iat"] > Time.current.to_i
        return render_unauthorized
      end
      
      @current_api_user = User.find(user_id)
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
      render_unauthorized
    end
  end

  def current_api_user
    @current_api_user
  end

  def extract_token_from_header
    auth_header = request.headers["Authorization"]
    return nil unless auth_header

    # Must start with "Bearer "
    return nil unless auth_header.start_with?("Bearer ")
    
    auth_header.split(" ").last
  end

  def jwt_secret_key
    Rails.application.credentials.secret_key_base
  end

  def render_unauthorized
    render json: { error: "Invalid or expired token" }, status: :unauthorized
  end

  def render_error(message, status = :unprocessable_entity)
    render json: { error: message }, status: status
  end

  def render_success(data = {}, message = nil)
    response = { success: true }
    response[:data] = data if data.present?
    response[:message] = message if message.present?
    render json: response
  end
end
