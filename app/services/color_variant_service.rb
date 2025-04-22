# app/services/color_variant_service.rb
require "httparty"

class ColorVariantService
  include HTTParty
  base_uri "https://tailwind.simeongriggs.dev"

  def self.generate_variants(color_name, hex_color)
    # Remove o # do hex color se existir
    hex_color = hex_color.gsub("#", "")

    response = get("/api/#{color_name}/#{hex_color}")

    if response.success?
      parsed = JSON.parse(response.body)
      parsed[color_name]
    else
      raise "Erro ao gerar variantes: #{response.message}"
    end
  end
end
