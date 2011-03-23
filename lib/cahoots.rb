require 'cahoots/server'
require 'sinatra/base'
require 'json'

module Cahoots
  
  class Workspaces < Sinatra::Base
    get '/' do
      "Default index"
    end

    get '/workspaces' do
      "Wh00t!"
    end

    get '/workspaces.json' do
      content_type :json
      {}.to_json
    end

    get '/workspaces/:workspace' do
      "Hello #{params[:workspace]}"
    end
    
  end
  
end # Cahoots