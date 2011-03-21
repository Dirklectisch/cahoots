require 'rake'

ENV['APP_ROOT'] = File.dirname(__FILE__)
ENV['LIBDIR'] = ENV['APP_ROOT'].to_s + '/lib'

desc "Open an irb session preloaded with paths and main module"
task :console do
  sh "irb -I #{ENV['LIBDIR']} -r #{'cahoots'} --simple-prompt"
end

desc "Starts a default server"
task :start => :copy do
  sh "rackup -I #{ENV['LIBDIR']} #{ENV['APP_ROOT']}/config/server.ru -s thin"
end

task :copy do
  cp "lib/cahoots.js", "client/web/js/cahoots.js"
end

require 'jasmine'
load 'jasmine/tasks/jasmine.rake'