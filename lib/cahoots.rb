require 'faye'

module Cahoots
  
  #message = "Wh00t! Message is received."
  
  def Cahoots.create_server mount = '/faye'
    Faye::RackAdapter.new(:mount => mount, :timeout => 45)
  end

end