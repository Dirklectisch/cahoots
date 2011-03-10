require 'faye'
require 'cahoots'

use Rack::Static, :urls => ["/"], :root => "client"

faye_server = Cahoots::Server.create
run faye_server