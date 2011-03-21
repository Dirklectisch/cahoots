#\ -s thin -E production

require 'cahoots'

use Faye::RackAdapter, :mount      => '/channel',
                       :timeout    => 45
use Rack::ShowExceptions
use Rack::ShowStatus

run MyApp
