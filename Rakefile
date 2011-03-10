require 'rake'

ENV['APP_ROOT'] = File.dirname(__FILE__)
ENV['LIBDIR'] = ENV['APP_ROOT'].to_s + '/lib'

desc "Open an irb session preloaded with paths and main module"
task :console do
  sh "irb -I #{ENV['LIBDIR']} -r #{'cahoots'} --simple-prompt"
end

desc "Starts a default server"
task :start do
  sh "rackup -I #{ENV['LIBDIR']} #{ENV['APP_ROOT']}/config/server.ru -s thin -E production"
end

