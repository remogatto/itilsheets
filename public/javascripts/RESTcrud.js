/****************************************************************************
ITILSheets - ITIL-based ticketing webapplication
Copyright (C) 2008 - Alca Società Cooperativa

    http://alca.le.it - info@alca.le.it

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
****************************************************************************/

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
