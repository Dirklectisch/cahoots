# rackup config/server.ru -s thin -E production

require 'faye'

faye_server = Faye::RackAdapter.new(:mount => '/file', :timeout => 45)
run faye_server