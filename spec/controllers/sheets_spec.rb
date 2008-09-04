require File.join(File.dirname(__FILE__), '..', 'spec_helper.rb')

describe Sheets, ' show action' do

  it 'should return the given sheet' do

    Sheet.should_receive(:get!).with('1')

    dispatch_to(Sheets, :show, :id => 1) do |controller|
      controller.stub!(:display)
    end

  end

  it 'should rescue the not found exception' do
    
    Sheet.should_receive(:get!).and_raise(DataMapper::ObjectNotFoundError)
    
    dispatch_to(Sheets, :show) do |controller|
      controller.should_receive(:display).with({:success => false, :messages => 'Not found'}, :status => 404)
    end

  end
end
