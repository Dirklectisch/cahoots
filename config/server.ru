require 'cahoots'

use Faye::RackAdapter, :mount      => '/channel',
                       :timeout    => 45
use Rack::ShowExceptions
use Rack::ShowStatus
# Reload on every request
use Rack::Reloader if ENV['RACK_ENV'] == 'development'

run Cahoots::Workspaces
