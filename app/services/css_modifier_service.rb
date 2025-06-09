# app/services/css_modifier_service.rb
class CssModifierService
  CSS_PATH = Rails.root.join("app/frontend/styles/application.css")

  def self.update_variants(color_name, hex_color)
    variants = ColorVariantService.generate_variants(color_name, hex_color)
    content = File.read(CSS_PATH)

    # Search for any color variant
    pattern = /--color-#{color_name}-\d+:.*?;/

    if content.match?(pattern)
      # If found, replace all variants
      variants.each do |weight, hex|
        content.gsub!(/--color-#{color_name}-#{weight}:.*?;/, "--color-#{color_name}-#{weight}: #{hex};")
      end
    else
      # If not found, add new variants before the @theme closing
      new_block = variants.map { |weight, hex| "  --color-#{color_name}-#{weight}: #{hex};" }.join("\n")
      content.insert(content.index(/\}[\s\n]*$/), "\n#{new_block}\n")
    end

    File.write(CSS_PATH, content)
  end
end
