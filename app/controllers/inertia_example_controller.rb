# frozen_string_literal: true

class InertiaExampleController < ApplicationController
  skip_before_action :authenticate_user!
  def index
    render inertia: "InertiaExample", props: {
      name: params.fetch(:name, "World")
    }
  end
end
