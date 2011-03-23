# TODO: Ugh, this is ugly
$:.unshift File.join(File.dirname(__FILE__), '..', 'lib')
require 'cahoots'
require 'test/unit'
require 'rack/test'

class CahootsTest < Test::Unit::TestCase
  include Rack::Test::Methods

  def app
    Cahoots::Workspaces
  end

  def test_root_page
    get '/'
    assert_equal 200, last_response.status
  end

  def test_get_workspaces_returns_200
    get '/workspaces'
    assert_equal 200, last_response.status
  end

  def test_get_workspaces_with_json_returns_json
    get '/workspaces.json', {}, 'Accept' => 'application/json'
    assert_equal "application/json", last_response.headers["Content-type"]
  end
end