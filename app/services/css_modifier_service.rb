# app/services/css_modifier_service.rb
class CssModifierService
  CSS_PATH = Rails.root.join("app/assets/tailwind/application.css")

  def self.update_variants(color_name, hex_color)
    variants = ColorVariantService.generate_variants(color_name, hex_color)
    content = File.read(CSS_PATH)

    # Procura por qualquer variante da cor
    pattern = /--color-#{color_name}-\d+:.*?;/

    if content.match?(pattern)
      # Se encontrou, substitui todas as variantes
      variants.each do |weight, hex|
        content.gsub!(/--color-#{color_name}-#{weight}:.*?;/, "--color-#{color_name}-#{weight}: #{hex};")
      end
    else
      # Se não encontrou, adiciona novas variantes antes do fechamento do @theme
      new_block = variants.map { |weight, hex| "  --color-#{color_name}-#{weight}: #{hex};" }.join("\n")
      content.insert(content.index(/\}[\s\n]*$/), "\n#{new_block}\n")
    end

    File.write(CSS_PATH, content)
  end
end
