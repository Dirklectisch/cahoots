# rackup -Ilib config/server.ru -s thin -E production

require 'faye'
require 'cahoots'

faye_server = Cahoots.create_server
run faye_server