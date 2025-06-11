class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.super_admin?
        scope.joins(:roles).where.not(roles: { name: "super_admin" })
      elsif user.admin?
        scope.joins(:roles).where(roles: { name: "operator" })
      else
        scope.where(id: user.id)
      end
    end
  end

  def index?
    user.super_admin? || user.admin? || user.operator?
  end

  def show?
    user.super_admin? ||
    user.admin? ||
    (user.operator? && record == user)
  end

  def create?
    user.super_admin? || user.admin?
  end

  def update?
    return true if user.super_admin?
    return true if user.admin? && !record.super_admin?
    return true if user.operator? && record == user
    false
  end

  def destroy?
    return true if user.super_admin?
    return true if user.admin? && !record.super_admin? && !record.admin?
    false
  end

  # Custom permissions for role management
  def assign_roles?
    user.super_admin? || user.admin?
  end

  def assign_admin_role?
    user.super_admin? || user.admin?
  end

  def assign_operator_role?
    user.super_admin? || user.admin?
  end
end
