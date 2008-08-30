class Project
  include DataMapper::Resource

  property :id, Integer, :serial => true, :key => true
  property :short_id, String, :unique => true, :message => "Project short id must be unique"
  property :customer_name, String, :nullable => false
  property :description, Text

  has n, :sheets
end
