class UsersController < ApplicationController
  before_action :set_user, only: %i[ show edit update destroy ]

  # GET /admin/users
  def index
    authorize User
    @users = policy_scope(User).order(created_at: :desc)

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
      },
      availableRoles: available_roles_for_current_user
    }
  end

  # GET /admin/users/1
  def show
    authorize @user
    render inertia: "User/Show", props: {
      user: serialize_user(@user)
    }
  end

  # GET /admin/users/new
  def new
    authorize User
    @user = User.new
    available_roles = available_roles_for_current_user

    render inertia: "User/New", props: {
      user: serialize_user(@user),
      availableRoles: available_roles
    }
  end

  # GET /admin/users/1/edit
  def edit
    authorize @user
    render inertia: "User/Edit", props: {
      user: serialize_user(@user),
      availableRoles: available_roles_for_current_user
    }
  end

  # POST /admin/users
  def create
    authorize User
    @user = User.new(user_params)
    @user.admin_creation = true # Mark as admin creation
    @user.confirmed_at = Time.current # Auto-confirm users created by admins
    @user.terms = true # Auto-confirm read of terms of service

    if @user.save
      # Assign role if specified
      assign_role_to_user(@user, params[:user][:role]) if params[:user][:role].present?

      redirect_to user_url(@user), notice: "User was successfully created."
    else
      redirect_to new_user_url, inertia: { errors: @user.errors }
    end
  end

  # PATCH/PUT /admin/users/1
  def update
    authorize @user

    # Don't require current password for admin updates
    if current_user.super_admin? || current_user.admin?
      # Remove password fields if they're blank
      if user_params[:password].blank?
        params[:user].delete(:password)
        params[:user].delete(:password_confirmation)
      end

      if @user.update(user_params)
        # Update role if specified
        assign_role_to_user(@user, params[:user][:role]) if params[:user][:role].present?

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
    authorize @user
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
      permitted_params = [
        :name,
        :email,
        :phone,
        :password,
        :password_confirmation,
        :current_password
      ]

      params.require(:user).permit(permitted_params)
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
      ]).merge({
        roles: user.roles.pluck(:name),
        role_name: user.role_name
      })
    end

    def available_roles_for_current_user
      roles = []

      if current_user.super_admin?
        roles << "admin"
        roles << "operator"
      elsif current_user.admin?
        roles << "operator"
      end

      roles
    end

    def assign_role_to_user(user, role_name)
      # Remove all existing roles
      user.roles.clear

      # Add the new role
      user.add_role(role_name.to_sym) if role_name.present?
    end
end
