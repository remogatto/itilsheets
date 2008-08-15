module Admin

  class Sheets < Application
    provides :xml, :json, :yaml

    def index
      @sheets = Sheet.all
      display @sheets
    end

    def show
      @sheet = Sheet.get!(params[:id])
      display @sheet
    rescue DataMapper::ObjectNotFoundError
      case content_type
      when :json
        display({ :success => false, :messages => "Not found" }, :status => 404)
      else
#        raise Merb::Controller:NotFoundError
      end
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

      
      case content_type
      when :json
        #create by rest json
        display @sheet
      else
        #create by form
      end
    end

    def create
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

      
      case content_type
      when :json
        #create by rest json
        @sheet.from_json(params[:data])
        display @sheet
      else
        #create by form
      end
    end

    def update
      @sheet = Sheet.get!(params[:id])

      case content_type
      when :json
        #create by rest json
        puts JSON
      else
        #update by form
      end
    end

    def destroy
      @sheet = Sheet.get!(params[:id])

      case content_type
      when :json
        #create by rest json
        puts JSON
      else
        #update by form
      end
    end
  end
end
