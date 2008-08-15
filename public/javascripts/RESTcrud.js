var RESTcrud = function(base_url) {
  this._format = ".json";

  // TODO: se base_url contiene uno slash finale eliminarlo
  this.list = function(params, success_callback, failure_callback) {
    Ext.Ajax.request({
		       method: 'GET',
		       headers: { "Content-Type": "text/json" },
		       url: base_url+this._format,
		       params: params,
		       success: success_callback,
		       failure: failure_callback
		     });
  };

  this.get = function(id,success_callback,failure_callback) {
    Ext.Ajax.request({
		       method: 'GET',
		       headers: { "Content-Type": "text/json" },
		       url: base_url+'/'+id+this._format,
		       params: {},
		       success: success_callback,
		       failure: failure_callback
		     });
  };

  this.create = function(params, success_callback, failure_callback) {
    Ext.Ajax.request({
		       method: 'GET',
		       headers: { "Content-Type": "text/json" },
		       url: base_url+'/new'+this._format,
		       params: params,
		       success: success_callback,
		       failure: failure_callback
		     });
  };

  this.save = function(data, success_callback, failure_callback) {
    Ext.Ajax.request({
		       method: 'POST',
		       headers: { "Content-Type": "text/json" },
		       url: base_url+this._format,
		       params: {data: Ext.util.JSON.encode(data)},
		       success: success_callback,
		       failure: failure_callback
		     });
  };

  this.update = function(id, data, success_callback, failure_callback) {
    Ext.Ajax.request({
		       method: 'PUT',
		       headers: { "Content-Type": "text/json" },
		       url: base_url+'/'+id+this._format,
		       params: {data: Ext.util.JSON.encode(data)},
		       success: success_callback,
		       failure: failure_callback
		     });
  };
  this.destroy = function(id, success_callback, failure_callback) {
    Ext.Ajax.request({
		       method: 'DELETE',
		       headers: { "Content-Type": "text/json" },
		       url: base_url+'/'+id+".json",
		       success: success_callback,
		       failure: failure_callback
		     });
  };
};
