class Api::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token

  # Para testes, aceita qualquer request
  # Em produção, você pode adicionar autenticação JWT, API keys, etc.

  private

  def render_error(message, status = :unprocessable_entity)
    render json: { error: message }, status: status
  end
end
