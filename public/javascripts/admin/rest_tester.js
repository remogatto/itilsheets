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

const DEBUG = 0;


Ext.onReady(function(){
  Ext.QuickTips.init();

  function disable_all(id_ary) {
    id_ary.forEach(function(id) {
		     Ext.getCmp(id).disable();
		   },this);
  };

  function enable_all(id_ary) {
    id_ary.forEach(function(id) {
		     Ext.getCmp(id).enable();
		   },this);
  };

  function do_rest_action() {
    var base_url = Ext.getCmp('rest-base-url').getValue();
    var action_type = Ext.getCmp('rest-action-type').getValue();
    var id = Ext.getCmp('rest-id').getValue();
    var params = Ext.getCmp('rest-params').getValue();
    var body = Ext.getCmp('rest-body').getValue();

    var model = new RESTcrud(base_url);
    var cp = Ext.getCmp('content-panel');

    try {
      params = Ext.util.JSON.decode("{"+params+"}");
      body = Ext.util.JSON.decode("{"+body+"}");
    }
    catch (e) {
      if (DEBUG)
        console.log(e);
    }

    switch(action_type) {
    case "list":
      model.list(params,
		 function success(response) {
		   cp.body.dom.innerHTML = String(response.responseText);
		 },
		 function failure(response) {
		   response = <b style="color: red;">{response.statusText}</b>;
		   cp.body.dom.innerHTML = response.toXMLString();
		 });
      break;
    case "show":
      model.get(id,
                 function success(response) {
		   cp.body.dom.innerHTML = String(response.responseText);
		 },
		 function failure(response) {
		   status = <b style="color: red;">{response.statusText}</b>;
		   cp.body.dom.innerHTML = status.toXMLString()+response.responseText;
		 });
      break;
    case "create":
      model.create(params,function success(response) {
		   cp.body.dom.innerHTML = String(response.responseText);
		 },
		 function failure(response) {
		   response = <b style="color: red;">{response.statusText}</b>;
		   cp.body.dom.innerHTML = response.toXMLString();
		 });
      break;
    case "save":
      model.save(body,
                 function success(response) {
		   cp.body.dom.innerHTML = String(response.responseText);
		 },
		 function failure(response) {
		   status = <b style="color: red;">{response.statusText}</b>;
		   cp.body.dom.innerHTML = status.toXMLString()+response.responseText;
		 });
      break;
    case "update":
      model.update(id,body,
                 function success(response) {
		   cp.body.dom.innerHTML = String(response.responseText);
		 },
		 function failure(response) {
		   status = <b style="color: red;">{response.statusText}</b>;
		   cp.body.dom.innerHTML = status.toXMLString()+response.responseText;
		 });
      break;
    case "destroy":
      model.destroy(id,
                 function success(response) {
		   cp.body.dom.innerHTML = String(response.responseText);
		 },
		 function failure(response) {
		   status = <b style="color: red;">{response.statusText}</b>;
		   cp.body.dom.innerHTML = status.toXMLString()+response.responseText;
		 });
      break;


    }
  };

  function do_file_upload() {
    fileForm.getForm().doAction('submit', {
      success: function(form,action) {
	console.dir(action);
      },
      failure: function(form,action) {
	console.dir(action);
      }
    });
  };

    var fileForm  = new Ext.FormPanel({
      id: 'file-upload-form',
      frame: true,
      title: 'File Upload',
      collapsible:true,
      titleCollapse: true,
      fileUpload: true,
      url: '/admin/attachments.json',
      method: 'POST',
      buttons: [{ id: 'submit', text: 'submit', handler: do_file_upload}],
      items: [
	{xtype: 'textfield', inputType: 'file', id: 'file_upload', fieldLabel: 'file'},
	{xtype: 'textfield', name: 'name', fieldLabel: 'nome del file' },
	{xtype: 'textfield', name: 'campaign_id', fieldLabel: 'ID campagna' }
      ]
    });

    var restForm = new Ext.FormPanel({
      id: 'rest-config',
      frame:true,
      title: 'REST Action Config',
      collapsible:true,
      titleCollapse: true,
      buttons: [{ id: 'submit', text: 'submit', handler: do_rest_action }],
      items: [
          {
	    xtype: 'combo',
	    id: 'rest-action-type',
	    mode: 'local',
	    fieldLabel: 'REST Action',
	    editable: false,
	    forceSelection: true,
	    width: '100%',
	    store: [['list','List'],['show','Show'],['create','Create'],['save','Save'],['update','Update'],['destroy','Destroy']],
	    listeners: {
	      "beforequery": function (query_evt) {
		query_evt.query = "";
		return true;
	      },
	      "select": function (cmp,record) {
		switch(record.data.value) {
		case "list":
		  enable_all(['rest-base-url','rest-params']);
		  disable_all(['rest-id','rest-body']);
		  break;
		case "show":
		  enable_all(['rest-base-url','rest-id']);
		  disable_all(['rest-params','rest-body']);
		  break;
		case "create":
		  enable_all(['rest-base-url','rest-params']);
		  disable_all(['rest-id','rest-body']);
		  break;
		case "save":
		  enable_all(['rest-base-url','rest-body']);
		  disable_all(['rest-id','rest-params']);
		  break;
		case "update":
		  enable_all(['rest-base-url','rest-id','rest-body']);
		  disable_all(['rest-params']);
		  break;
		case "destroy":
		  enable_all(['rest-base-url','rest-id']);
		  disable_all(['rest-params','rest-body']);
		  break;
		}
	      }
	    }
	  },
	  {
	    xtype: 'textfield',
	    id: 'rest-base-url',
	    fieldLabel: 'base url',
	    width: '100%',
	    disabled: true
	  },
	  {
	    xtype: 'textfield',
	    fieldLabel: 'id',
	    width: '100%',
	    id: 'rest-id',
	    disabled: true
	  },
	  {
	    xtype: 'textarea',
	    id: 'rest-params',
	    width: '100%',
	    fieldLabel: 'params (JSON)',
	    disabled: true
	  },
	  {
	    xtype: 'textarea',
	    id: 'rest-body',
	    width: '100%',
	    fieldLabel: 'body',
	    disabled: true
	  }
	]
    });

    var formPanel = new Ext.Panel({
    	id:'form-panel',
    	region:'west',
    	split:true,
    	collapsible: true,
    	collapseMode: 'mini',
    	width:350,
    	minWidth: 150,
    	border: false,
    	baseCls:'x-plain',
    	items: [restForm,fileForm]
    });

    var contentPanel = new Ext.Panel({
      id: 'content-panel',
      region: 'center'
    });

    var viewport = new Ext.Viewport({
      layout:'border',
      items: [formPanel,contentPanel]
    });
});
