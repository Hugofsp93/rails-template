Rails.application.routes.draw do
  # Routes only for authenticated users
  authenticated :user do
    resources :users, path: "admin/users"
  end

  # Public routes
  resources :pages
  get "contact", to: "pages#contact"

  # Defines the root path route ("/")
  root "pages#home"

  # Authentication routes
  devise_for :users, controllers: {
    passwords: "users/passwords",
    sessions: "users/sessions",
    registrations: "users/registrations",
    confirmations: "users/confirmations"
  }, skip: [ :edit, :update ] # Skip edit/update from registrations

  devise_scope :user do
    get "/sign_in", to: "auth#sign_in"
    get "/sign_up", to: "auth#sign_up"
    get "/forgot_password", to: "auth#forgot_password"
    get "/reset_password", to: "auth#reset_password"
    get "/resend_confirmation", to: "auth#resend_confirmation"
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get "up" => "rails/health#show", as: :rails_health_check
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
end
