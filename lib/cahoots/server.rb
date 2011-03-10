require 'faye'

module Cahoots
  module Server
    def self.create mount = '/faye'
      Faye::RackAdapter.new(:mount => mount, :timeout => 45)
    end    
  end # Server
end # Cahoots