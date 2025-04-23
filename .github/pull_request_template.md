# Descrição
<!-- Descreva as mudanças em alto nível -->

## Tipo de Mudança
<!-- Marque com um X as opções que se aplicam -->
- [ ] Nova feature
- [ ] Correção de bug
- [ ] Melhoria de performance
- [ ] Refatoração de código
- [ ] Atualização de documentação
- [ ] Outro (especifique)

## Checklist
<!-- Marque com um X as tarefas que foram completadas -->
### Desenvolvimento
- [ ] Branch criada a partir da develop (feature/ISSUE-123-nome-da-feature)
- [ ] Commits seguem o padrão conventional commits
- [ ] Código segue as convenções de estilo do projeto
- [ ] Realizei uma auto-revisão do meu código

### Testes
- [ ] Testes unitários implementados
- [ ] Testes de integração implementados
- [ ] Testes de sistema implementados (se aplicável)
- [ ] Cobertura de testes mantida ou melhorada

### Documentação
- [ ] Documentação do código atualizada
- [ ] Documentação da API atualizada (se aplicável)
- [ ] CHANGELOG.md atualizado
- [ ] README.md atualizado (se necessário)

### Qualidade
- [ ] Análise estática de código (Rubocop) passando
- [ ] Testes de segurança realizados
- [ ] Performance testada e documentada
- [ ] Compatibilidade com versões anteriores mantida

## Screenshots
<!-- Adicione screenshots se aplicável -->
<!-- Exemplo:
![Tela de Login](https://exemplo.com/login.png)
![Dashboard](https://exemplo.com/dashboard.png)
-->

## Contexto Adicional
<!-- Adicione qualquer contexto adicional sobre o PR aqui -->
<!-- Exemplo:
Este PR implementa a funcionalidade de autenticação de dois fatores (2FA) solicitada na issue #123.
A implementação segue as diretrizes de segurança OWASP e utiliza a gem 'devise-two-factor'.
-->

## Como Testar
<!-- Descreva como testar as mudanças -->
<!-- Exemplo:
1. Faça checkout da branch feature/2fa-authentication
2. Execute `bundle install`
3. Execute `rails db:migrate`
4. Execute `rails test:all`
5. Acesse http://localhost:3000/users/sign_in
6. Tente fazer login com um usuário existente
7. Verifique se o código 2FA é enviado por email
8. Insira o código recebido
9. Verifique se o login é bem sucedido
-->

## Issues Relacionadas
<!-- Lista de issues relacionadas (se houver) -->
<!-- Exemplo:
- Resolve #123 (Implementação do 2FA)
- Relacionado a #456 (Melhorias de segurança)
- Depende de #789 (Atualização do Devise)
-->

## Notas de Deploy
<!-- Instruções especiais para deploy (se necessário) -->
<!-- Exemplo:
### Pré-requisitos
- Ruby 3.2.2
- Rails 7.0.4
- Redis 6.0

### Passos de Deploy
1. Executar migração: `rails db:migrate`
2. Reiniciar workers: `rails restart:workers`
3. Limpar cache: `rails cache:clear`
4. Verificar logs: `tail -f log/production.log`

### Rollback
1. Reverter migração: `rails db:rollback`
2. Reverter para versão anterior: `git checkout v1.2.3`
3. Reiniciar aplicação: `rails restart`
