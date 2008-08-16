class Dashboard < Application
  def index
    "DASHBOARD"
  end

  def rest_tester
    render :format => :html
  end
end

