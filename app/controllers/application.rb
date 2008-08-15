class Application < Merb::Controller
end

class Exceptions < Application
  def bad_request
    "BADREQUEST"
  end

  def not_found
    "NOTFOUND"
  end
end
