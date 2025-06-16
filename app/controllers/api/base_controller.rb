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
      user_id = decoded_token[0]["user_id"]
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

    auth_header.split(" ").last
  end

  def jwt_secret_key
    Rails.application.credentials.secret_key_base
  end

  def render_unauthorized
    render json: { error: "Unauthorized" }, status: :unauthorized
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
