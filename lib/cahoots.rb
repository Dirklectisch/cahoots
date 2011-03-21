require 'cahoots/server'
require 'sinatra/base'

module Cahoots
end # Cahoots

class MyApp < Sinatra::Base
  get '/workspaces/:workspace' do
    "Hello #{params[:workspace]}"
  end
end
