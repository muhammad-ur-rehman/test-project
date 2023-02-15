Rails.application.routes.draw do
  scope '/api/v1' do
    resources :spots do
      resources :reviews, only: %i[index create]
    end
    resources :reviews, only: %i[update]
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
