module Admin

  class Sheets < Application
    provides :json

    def index
      @sheets = Sheet.all
      display @sheets
    end

    def show
      @sheet = Sheet.get!(params[:id])
      display @sheet
    rescue DataMapper::ObjectNotFoundError
      display({ :success => false, :messages => "Not found" }, :status => 404)
    end

    def new
      case params[:type]
      when "incident":
          @sheet = IncidentSheet.new
      when "problem":
          @sheet = ProblemSheet.new
      when "change":
          @sheet = ChangeSheet.new
      when "task":
          @sheet = TaskSheet.new
      else #techsupport
        @sheet = TechnicalSupportRequest.new
      end

      
      display @sheet
    end

    def create

      params.merge!(Merb::Request.query_parse(request.raw_post))

      case params[:type]
      when "incident":
          @sheet = IncidentSheet.new
      when "problem":
          @sheet = ProblemSheet.new
      when "change":
          @sheet = ChangeSheet.new
      when "task":
          @sheet = TaskSheet.new
      else #techsupport
        @sheet = TechnicalSupportRequest.new
      end

      
      #create by rest json
      @sheet.from_json(params[:data])
      display @sheet
    end

    def update
      @sheet = Sheet.get!(params[:id])

      puts JSON
    end

    def destroy
      @sheet = Sheet.get!(params[:id])

      puts JSON
    end
  end
end
