#\ -s thin -E production

require 'cahoots'

use Faye::RackAdapter, :mount      => '/faye',
                       :timeout    => 45

run Rack::File.new "client"
