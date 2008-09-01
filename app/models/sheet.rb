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

class Sheet
  include DataMapper::Resource

  @@VALUE_MAP = {
    :status => [ :new , :open, :closed ],
  }

  property :id,         Integer, :serial => true
  property :sha_id,	String, :nullable => false, :message => "non vuoto"
  property :short_id,	String, :nullable => false
  property :project_short_id, String, :nullable => false
  property :summary,    String, :nullable => false
  property :body,       Text, :nullable => false
  property :author,	String, :nullable => false
  property :requester,	String, :nullable => false
  property :assigned,	String
  property :created_on, DateTime
  property :updated_on, DateTime
  property :opened_on,  DateTime
  property :closed_on,  DateTime
  property :status,	String, :default => :new, :nullable => false
  property :substatus,  String
  property :references, Yaml

  property :type, Discriminator

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

  def substatus=(sym)
    standard_values(:substatus).each do |v|
      self.status = v[1] if v[0] == sym
    end

    self.attributes["substatus"] = sym
  end
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

  property :request_type, String, :lazy => false
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

  property :components, String, :lazy => false
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

  property :components, String, :lazy => false
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


  property :components, String, :lazy => false
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
