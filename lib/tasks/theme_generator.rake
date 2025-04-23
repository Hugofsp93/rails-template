namespace :theme do
  desc "Gera variantes de cor baseadas em um hexadecimal"
  task :generate, [ :name, :color ] => :environment do |t, args|
    unless args[:name] && args[:color]
      puts "Uso: rails theme:generate[utility,#ef4444]"
      puts "     rails theme:generate[neutral,#71717a]"
      exit
    end

    unless [ "utility", "neutral" ].include?(args[:name])
      puts "❌ Nome deve ser 'utility' ou 'neutral'"
      exit
    end

    unless args[:color].match?(/#?[0-9A-Fa-f]{6}/)
      puts "❌ Cor deve ser um valor hexadecimal válido (ex: #ef4444 ou ef4444)"
      exit
    end

    begin
      puts "🎨 Gerando variantes para #{args[:name]} com cor base #{args[:color]}..."
      CssModifierService.update_variants(args[:name], args[:color])
      puts "✅ Variantes geradas com sucesso!"
      puts "⚠️  Não esqueça de commitar as alterações no application.css"
    rescue => e
      puts "❌ Erro: #{e.message}"
    end
  end
end
