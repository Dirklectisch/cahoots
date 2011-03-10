# rackup -Ilib config/server.ru -s thin -E production

require 'faye'
require 'cahoots'

faye_server = Cahoots::Server.create
run faye_server