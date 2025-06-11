# frozen_string_literal: true

require "rails/generators/resource_helpers"
require "inertia_rails/generators/helper"

module Inertia
  module Generators
    # This class is a modified copy of Rails::Generators::ScaffoldControllerGenerator.
    # We don't use inheritance because some gems (i.e. jsbuilder) monkey-patch it.
    class ScaffoldControllerGenerator < Rails::Generators::NamedBase
      include InertiaRails::Generators::Helper
      include Rails::Generators::ResourceHelpers

      source_root File.expand_path("./templates", __dir__)

      check_class_collision suffix: "Controller"

      class_option :helper, type: :boolean
      class_option :orm, banner: "NAME", type: :string, required: true,
                         desc: "ORM to generate the controller for"

      class_option :skip_routes, type: :boolean, desc: "Don't add routes to config/routes.rb."

      class_option :cypress, type: :boolean, default: true,
                         desc: "Generate Cypress tests"

      argument :attributes, type: :array, default: [], banner: "field:type field:type"

      def create_controller_files
        template "controller.rb",
                 File.join("app/controllers", controller_class_path, "#{controller_file_name}_controller.rb")
      end

      def create_policy_files
        template "policy.rb",
                 File.join("app/policies", "#{file_name}_policy.rb")
      end

      def create_policy_tests
        template "../../../templates/rspec/policy/policy_spec.rb",
                 File.join("spec/policies", "#{file_name}_policy_spec.rb")
      end

      def create_model_tests
        template "../../../templates/rspec/model/model_spec.rb.tt",
                 File.join("spec/models", "#{file_name}_spec.rb")
      end

      def create_factory_tests
        template "../../../templates/rspec/factory/factory.rb.tt",
                 File.join("spec/factories", "#{plural_file_name}.rb")
      end

      def create_request_tests
        template "../../../templates/rspec/request/request_spec.rb.tt",
                 File.join("spec/requests", "#{plural_file_name}_spec.rb")
      end

      def create_controller_tests
        template "../../../templates/rspec/scaffold/controller_spec.rb.tt",
                 File.join("spec/controllers", "#{controller_file_name}_controller_spec.rb")
      end

      def create_cypress_tests
        return unless options[:cypress]

        template "cypress_spec.js.tt",
                 File.join("cypress/e2e", "#{plural_table_name}.cy.js")
      end

      hook_for :inertia_templates, as: :scaffold, required: true,
                                   default: InertiaRails::Generators::Helper.guess_inertia_template

      hook_for :resource_route, in: :rails, required: true do |route|
        invoke route unless options.skip_routes?
      end

      hook_for :test_framework, in: :rails, as: :scaffold

      # Invoke the helper using the controller name (pluralized)
      hook_for :helper, in: :rails, as: :scaffold do |invoked|
        invoke invoked, [ controller_name ]
      end

      private

      # Convert string attributes back to GeneratedAttribute objects
      def generated_attributes
        @generated_attributes ||= attributes.map do |attr|
          if attr.is_a?(Rails::Generators::GeneratedAttribute)
            attr
          else
            Rails::Generators::GeneratedAttribute.parse(attr)
          end
        end
      end

      def permitted_params
        attachments, others = attributes_names.partition { |name| attachments?(name) }
        params = others.map { |name| ":#{name}" }
        params += attachments.map { |name| "#{name}: []" }
        params.join(", ")
      end

      def attachments?(name)
        attribute = generated_attributes.find { |attr| attr.name == name }
        attribute&.attachments?
      end
    end
  end
end
