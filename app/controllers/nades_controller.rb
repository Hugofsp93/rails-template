class NadesController < ApplicationController
  before_action :set_nade, only: %i[ show edit update destroy ]
  before_action :authenticate_user!
  before_action :authorize_nade!, only: %i[ edit update destroy ]

  # GET /nades
  def index
    @nades = Nade.all

    # Search functionality
    if params[:search].present?
      @nades = @nades.where(
        "title ILIKE :search OR description ILIKE :search OR map_name ILIKE :search OR team_function ILIKE :search",
        search: "%#{params[:search]}%"
      )
    end

    # Filter by status
    if params[:status].present?
      @nades = @nades.where(status: params[:status])
    end

    # Pagination with Pagy (use limit: 5 if want that pagination be custom)
    @pagy, @nades = pagy(@nades)

    render inertia: "Nade/Index", props: {
      nades: @nades.map { |nade| serialize_nade(nade) },
      pagination: {
        currentPage: @pagy.page,
        totalPages: @pagy.pages,
        totalItems: @pagy.count,
        perPage: @pagy.limit
      }
    }
  end

  # GET /nades/1
  def show
    render inertia: "Nade/Show", props: {
      nade: serialize_nade(@nade)
    }
  end

  # GET /nades/new
  def new
    @nade = Nade.new
    render inertia: "Nade/New", props: {
      nade: serialize_nade(@nade)
    }
  end

  # GET /nades/1/edit
  def edit
    render inertia: "Nade/Edit", props: {
      nade: serialize_nade(@nade)
    }
  end

  # POST /nades
  def create
    @nade = Nade.new(nade_params)

    if @nade.save
      redirect_to nade_url(@nade), notice: "Nade was successfully created."
    else
      redirect_to new_nade_url, inertia: { errors: @nade.errors }
    end
  end

  # PATCH/PUT /nades/1
  def update
    if @nade.update(nade_params)
      redirect_to nade_url(@nade), notice: "Nade was successfully updated."
    else
      redirect_to edit_nade_url(@nade), inertia: { errors: @nade.errors }
    end
  end

  # DELETE /nades/1
  def destroy
    @nade.destroy!
    redirect_to nades_url, notice: "Nade was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_nade
      @nade = Nade.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def nade_params
      params.require(:nade).permit(:title, :active, :description, :map_name, :team_function)
    end

    def serialize_nade(nade)
      nade.as_json(only: [
        :id,
        :title,
        :active,
        :description,
        :map_name,
        :team_function,
        :created_at,
        :updated_at
      ])
    end

    def authorize_nade!
      unless current_user.id == 2 || current_user == @nade # current_user.admin?
        redirect_to nades_url, alert: "You are not authorized to perform this action."
      end
    end
end
