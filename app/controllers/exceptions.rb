class Exceptions < Application
  
  # handle NotFound exceptions (404)
  def not_found
    "NOTFOUND"
#    render :format => :html
  end

  def bad_request
    "BADREQUEST"
  end

  # handle NotAcceptable exceptions (406)
  def not_acceptable
    "NOTACCEPTABLE"
#    render :format => :html
  end

end
