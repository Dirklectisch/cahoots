require 'faye'
require 'eventmachine'

module Cahoots
  
  #message = "Wh00t! Message is received."
  module Server
    def self.create mount = '/faye'
      Faye::RackAdapter.new(:mount => mount, :timeout => 45)
    end    
  end
  
  class Connection
    attr_reader :client
    
    def initialize url = 'http://localhost:9292/faye'
      @client = Faye::Client.new(url)
    end
    
    def subscribe channel = '/file'
      EM.run {
        client.subscribe(channel) do |message|
          puts "Received message #{message.display}"
        end
      }
    end
    
    def publish channel = '/file', msg = 'Hello world'
      EM.run {
        client.publish(channel, 'text' => 'Hello world')
      }
    end    
  end # Connection
end # Cahoots