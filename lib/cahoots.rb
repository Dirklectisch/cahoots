require 'faye'

module Cahoots
  
  #message = "Wh00t! Message is received."
  module Server
    def self.create mount = '/faye'
      Faye::RackAdapter.new(:mount => mount, :timeout => 45)
    end    
  end
  
  class Connection
    def initialize url = 'http://localhost:9292/faye'
      @client = Faye::Client.new(url)
    end
  end

end