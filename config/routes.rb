Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/property/:id' => 'static_pages#property'
  get '/login' => 'static_pages#login'
  get '/users/:username' => 'static_pages#user'
  get '/profile' => 'static_pages#profile'


  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create]
    resources :properties, only: [:create, :index, :show]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]

    delete '/sessions' => 'sessions#destroy'
    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/:username/bookings' => 'bookings#get_user_bookings'
    get '/:username/properties' => 'properties#user_properties'
    get '/authenticated' => 'sessions#authenticated'

    #Stripe Webhook
    post '/charges/mark_complete' => 'charges#mark_complete'
  end

end
