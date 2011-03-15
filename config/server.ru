#\ -s thin -E production

require 'cahoots'

use Faye::RackAdapter, :mount      => '/faye',
                       :timeout    => 45
use Rack::ShowExceptions
use Rack::ShowStatus

run Rack::File.new "client/web"
