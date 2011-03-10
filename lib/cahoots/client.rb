require 'eventmachine'
require 'faye'

EM.run {
  ENDPOINT = 'http://localhost:9292/faye'

  client_a = Faye::Client.new(ENDPOINT)
  client_b = Faye::Client.new(ENDPOINT)
  
  client_a.subscribe('/aap') do |message|
    puts "client A received message #{message.inspect}"
  end

  client_b.subscribe('/beer') do |message|
    puts "client B received message #{message.inspect}"
  end

  client_a.publish('/client/aap', {'text' => 'msg from aap'})
  client_b.publish('/client/beer', {'text' => 'msg from beer'})
  
}