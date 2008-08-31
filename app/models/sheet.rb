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

require 'sha1'

class Sheet
  include DataMapper::Resource

  @@VALUE_MAP = {
    :status => [ :new , :open, :closed ],
  }

  ### ASSOCIATIONS BEGIN
  belongs_to :project
  ### ASSOCIATIONS END

  ### Sheet coordinate:
  # id (db based)
  # sha_id (sha1 based)
  # short_id (a user customized short id)
  # project_short_id (a user customized project short id)
  property :id,         Integer, :serial => true, :key => true
  property :sha_id,	String, :unique => true, :message => "have to be unique and not null"
  property :short_id,	String, :unique => true, :nullable => false, :message => "have to be unique and not null"
  property :project_id, Integer, :nullable => false, :message => "have to be not null"

  ### Sheet stardard data
  property :summary,    String, :nullable => false
  property :body,       Text, :nullable => false
  property :references, Yaml  

  ### Sheet author, requester e assigned users
  property :user_author,	String, :nullable => false
  property :user_requester,	String, :nullable => false
  property :user_assigned,	String

  ### Sheet date
  property :created_on, DateTime
  property :updated_on, DateTime
  property :opened_on,  DateTime
  property :closed_on,  DateTime

  ### Sheet status and substatus
  property :status,	String, :default => :new, :nullable => false
  property :substatus,  String

  ### Sheet class type
  property :type, Discriminator

  ### MANUAL VALIDATIONS BEGIN
  validates_with_method :sha_id, :method => :check_sha_id, :context => [:sha1]

  def check_sha_id
    return [false, "have to be SHA1"] unless sha_id.length == 40 and sha_id =~ /[a-b0-9]+/
    return true
  end
  ### MANUAL VALIDATIONS END

  ### HOOKS BEGIN
  before :save, :generate_sha_id

  def generate_sha_id
    self.sha_id = SHA1::sha1(self.summary) if not self.valid_for_sha1?
  end
  ### HOOKS END

  ### UTILITY METHOS BEGIN
  def reference sheet
    self.references ||= []

    self.references << sheet.sha_id
  end

  def ref_sheets
    self.references.map do |i|
      Sheet.first(:conditions => { :sha_id.like => i }) 
    end
  end

  def from_json json
    self.attributes = JSON::parse(json)
  end

  def standard_values(varsym)
    @@VALUE_MAP[varsym]
  end

  def status=(arg)
    # NOTE: status is read-only
  end

  def substatus=(sym)
    # NOTE: set status coherent to substatus
    standard_values(:substatus).each do |v|
      self.status = v[1] if v[0] == sym
    end

    self.attributes["substatus"] = sym
  end
  ### UTILITY METHOS END

end

class TechnicalSupportRequest < Sheet
  @@VALUE_MAP = {
    :request_type => [ :bug , :feature ],
    :substatus => [
                    [:signaled,:new],
                    [:inwork,:open],
                    [:answered, :closed],
                    [:wontfix, :closed]
                  ]
  }

  property :request_type, String#, :lazy => false
end

class IncidentSheet < Sheet
  @@VALUE_MAP = {
    :substatus => [
                    [:signaled,:new],
                    [:problem_analisys,:open],
                    [:workaround, :open],
                    [:solution, :closed],
                    [:impediment, :open],
                    [:wontfix, :closed]
                  ]
  }

  property :components, String
  property :risks, Text, :lazy => false
  property :workaround, Text, :lazy => false
  property :solution, Text, :lazy => false
end

class ChangeSheet < Sheet
  @@VALUE_MAP = {
    :substatus => [
                    [:signaled,:new],
                    [:planning,:open],
                    [:planned, :open],
                    [:executed, :closed],
                    [:impediment, :open],
                    [:retired, :closed]
                  ]
  }

  property :components, String
  property :reason, Text, :lazy => false
  property :risks, Text, :lazy => false
  property :impact, Text, :lazy => false
  property :plan, Text, :lazy => false
  property :fallback_plan, Text, :lazy => false
end

class TaskSheet < Sheet
  @@VALUE_MAP = {
    :substatus => [
                    [:signaled,:new],
                    [:planning,:open],
                    [:planned, :open],
                    [:executed, :closed],
                    [:impediment, :open],
                    [:retired, :closed]
                  ]
  }


  property :components, String
  property :reason, Text, :lazy => false
  property :risks, Text, :lazy => false
  property :impact, Text, :lazy => false
  property :plan, Text, :lazy => false
  property :fallback_plan, Text, :lazy => false
end

class ProblemSheet < Sheet
  @@VALUE_MAP = {
    :substatus => [
                    [:signaled,:new],
                    [:problem_analisys,:open],
                    [:workaround, :open],
                    [:solution, :closed],
                    [:impediment, :open],
                    [:wontfix, :closed]
                  ]
  }

  property :risks, Text, :lazy => false
  property :theory, Text, :lazy => false
  property :actions, Text, :lazy => false
end
