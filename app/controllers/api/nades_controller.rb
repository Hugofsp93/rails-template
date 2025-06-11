class Api::NadesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_nade, only: [ :show, :update, :destroy ]

  def index
    @nades = Nade.all
    render json: @nades
  end

  def show
    render json: @nade
  end

  def create
    @nade = Nade.new(nade_params)
    @nade.user = User.first # For testing purposes

    if @nade.save
      render json: @nade, status: :created
    else
      render json: { errors: @nade.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @nade.update(nade_params)
      render json: @nade
    else
      render json: { errors: @nade.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @nade.destroy
    head :no_content
  end

  private

  def set_nade
    @nade = Nade.find(params[:id])
  end

  def nade_params
    params.permit(:name, :description, :age, :population, :price, :total,
                  :is_active, :published_at, :birth_date, :start_time, :binary_data)
  end
end
