#    ITILSheets - ITIL-based ticketing webapplication
#    ------------------------------------------------
#    Copyright (C) 2008 - Alca Società Cooperativa
#
#        http://alca.le.it - info@alca.le.it
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.

class Sheets < Application
  provides :json

  def index
    @sheets = Sheet.all
    display({:success => true, :data => @sheets, :length => @sheets.length})
  end

  def show
    @sheet = Sheet.get!(params[:id])
    display @sheet
  rescue DataMapper::ObjectNotFoundError
    ### DOC: return status 404 if the record don't exist
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
    ### DOC: merge raw post into the params hash
    ### TODO: why merb don't do it?
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

    ### DOC,TODO: if validation fail return status 200 with validation errors
    if @sheet.save
      display @sheet
    else
      errors = {}
      @sheet.errors.keys.each do |i|
        errors[i] = @sheet.errors.on(i)
      end

      display({ :success => false, :message => "Validation Error", :errors => errors }, :status => 200)
    end
  rescue NameError, JSON::ParseError
    display({ :success => false, :message => "Error in the data" }, :status => 406)
  end

  def update
    params.merge!(Merb::Request.query_parse(request.raw_post))
    @sheet = Sheet.get!(params[:id])

    @sheet.from_json(params[:data])
    if @sheet.save
      display @sheet
    else
      errors = {}
      @sheet.errors.keys.each do |i|
        errors[i] = @sheet.errors.on(i)
      end

      display({ :success => false, :message => "Validation Error", :errors => errors }, :status => 200)
    end
  rescue DataMapper::ObjectNotFoundError
    ### DOC: return status 404 if the record don't exist
    display({ :success => false, :messages => "Not found" }, :status => 404)
  rescue NameError, JSON::ParseError
    display({ :success => false, :messages => "Error in the data" }, :status => 406)
  end

  def destroy
    @sheet = Sheet.get!(params[:id])

    @sheet.destroy
  rescue DataMapper::ObjectNotFoundError
    ### DOC: return status 404 if the record don't exist
    display({ :success => false, :messages => "Not found" }, :status => 404)
  end
end
