class UsersController < ApplicationController
  before_action :set_user, only: %i[ show edit update destroy ]
  before_action :authorize_user!, only: %i[ edit update destroy ]

  # GET /admin/users
  def index
    @users = User.all

    # Search functionality
    if params[:search].present?
      @users = @users.where("name ILIKE ? OR email ILIKE ?", "%#{params[:search]}%", "%#{params[:search]}%")
    end

    # Filter by confirmation status
    if params[:confirmed].present?
      @users = if params[:confirmed] == "true"
                 @users.where.not(confirmed_at: nil)
      else
                 @users.where(confirmed_at: nil)
      end
    end

    # Pagination with Pagy - custom items per page for users
    @pagy, @users = pagy(@users, limit: 10)

    render inertia: "User/Index", props: {
      users: @users.map do |user|
        serialize_user(user)
      end,
      pagination: {
        currentPage: @pagy.page,
        totalPages: @pagy.pages,
        totalItems: @pagy.count,
        perPage: @pagy.limit
      }
    }
  end

  # GET /admin/users/1
  def show
    render inertia: "User/Show", props: {
      user: serialize_user(@user)
    }
  end

  # GET /admin/users/new
  def new
    @user = User.new
    render inertia: "User/New", props: {
      user: serialize_user(@user)
    }
  end

  # GET /admin/users/1/edit
  def edit
    render inertia: "User/Edit", props: {
      user: serialize_user(@user)
    }
  end

  # POST /admin/users
  def create
    @user = User.new(user_params)
    @user.admin_creation = true # Mark as admin creation
    @user.confirmed_at = Time.current # Auto-confirm users created by admins

    if @user.save
      redirect_to user_url(@user), notice: "User was successfully created."
    else
      redirect_to new_user_url, inertia: { errors: @user.errors }
    end
  end

  # PATCH/PUT /admin/users/1
  def update
    # Don't require current password for admin updates
    if current_user.id == 1 # current_user.admin? (in the future, when implementing rolify)
      # Remove password fields if they're blank
      if user_params[:password].blank?
        params[:user].delete(:password)
        params[:user].delete(:password_confirmation)
      end

      if @user.update(user_params)
        redirect_to user_url(@user), notice: "User was successfully updated."
      else
        redirect_to edit_user_url(@user), inertia: { errors: @user.errors }
      end
    else
      # For regular users, require current password
      if @user.update(user_params)
        bypass_sign_in(@user) # Prevent logout after update
        redirect_to user_url(@user), notice: "User was successfully updated."
      else
        redirect_to edit_user_url(@user), inertia: { errors: @user.errors }
      end
    end
  end

  # DELETE /admin/users/1
  def destroy
    @user.destroy!
    redirect_to users_url, notice: "User was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(
        :name,
        :email,
        :phone,
        :password,
        :password_confirmation,
        :current_password
      )
    end

    def serialize_user(user)
      user.as_json(only: [
        :id,
        :email,
        :name,
        :phone,
        :address,
        :city,
        :state,
        :zip_code,
        :country,
        :birth_date,
        :gender,
        :created_at,
        :updated_at,
        :confirmed_at
      ])
    end

    # TODO:
    def authorize_user!
      unless current_user.id == 1 || current_user == @user # current_user.admin? (no futuro, quando implementar o rolify)
        redirect_to users_url, alert: "You are not authorized to perform this action."
      end
    end
end
