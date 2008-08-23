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

/*
 * ui.js : Configure various UI components
 *
 *
 */

Ext.namespace("Alca.ITILSheets");

///// DASHBOARD COMPONENTS

Alca.ITILSheets.SheetsGrid = Ext.extend(Ext.grid.GridPanel, {
  initComponent: function() {
    var grid;
    var store;
    var column_model;
    var listeners;

    var grid_groupview;
    var toolbar;
    var pagingbar;

    var options = this.itilsheets;

    store = new Ext.data.GroupingStore({
      proxy: new Ext.data.HttpProxy({
	url: options.store.url+".json",
	method: 'GET'
      }),
      remoteSort: true,
      //NOTA:  Il raggruppamento meglio farlo in locale lato server la query con il group by non da il risultato voluto
      //    remoteGroup: true,
      sortInfo: options.store.sortInfo,
      groupField: options.store.groupField,

      reader: new Ext.data.JsonReader({
	root: 'data',
	id: 'id',
	totalProperty: 'length',
	fields: options.store.fields
      })
				       });

    column_model = new Ext.grid.ColumnModel(options.columnModel);
    column_model.defaultSortable = true;

    toolbar = new Ext.Toolbar({
      items:[
	{
	  text: 'New',
	  cls:'x-btn-text-icon',
	  icon: '/images/backend/icon-new.gif',
	  handler: function(){
	    var my_win = new ActionWindow({form: options.form, fileUpload: options.fileUpload, action: 'new', rest_url: options.store.url, grid_id: options.grid.id });
	    my_win.show();
	  }
	},
	{
	  text: 'Show',
	  cls:'x-btn-text-icon',
	  icon: '/images/backend/icon-no-group.gif',
	  handler: function(){
	    var selected = Ext.getCmp(options.grid.id).getSelectionModel().getSelected();
	    if (!selected) {
	      Ext.Msg.alert("Attenzione!","Selezionare prima una riga");
	      return;
	    }
	    var my_win = new ActionWindow({form: options.form, action: 'show', id: selected.id, rest_url: options.store.url, grid_id: options.grid.id});
	    my_win.show();
	  }
	},
	{
	  text: 'Edit',
	  cls:'x-btn-text-icon',
	  icon: '/images/backend/edit.gif',
	  handler: function(){
	    var selected = Ext.getCmp(options.grid.id).getSelectionModel().getSelected();
	    if (!selected) {
	      Ext.Msg.alert("Attenzione!","Selezionare prima una riga");
	      return;
	    }
	    var my_win = new ActionWindow({form: options.form, fileUpload: options.fileUpload, action: 'edit', id: selected.id, rest_url: options.store.url, grid_id: options.grid.id});
	    my_win.show();
	  }
	},
	{
	  text: 'Delete',
	  cls:'x-btn-text-icon',
	  icon: '/images/backend/delete.gif',
	  handler: function(){
	    var selected = Ext.getCmp(options.grid.id).getSelectionModel().getSelected();
	    if (!selected) {
	      Ext.Msg.alert("Attenzione!","Selezionare prima una riga");
	      return;
	    }
	    var my_win = new ActionWindow({form: options.form, action: 'destroy', id: selected.id, rest_url: options.store.url, grid_id: options.grid.id});
	    my_win.show();
	  }
	}
      ]
    });

    pagingbar = new Ext.PagingToolbar({
      pageSize: 20,
      store: store,
      displayInfo: true,
      displayMsg: 'Righe visualizzate: {0} - {1} di {2}',
      emptyMsg: "Nessuna riga da visualizzare"
    });

    grid_groupview = new Ext.grid.GroupingView({
      forceFit:true,
      groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Righe" : "Riga"]})'
    });

    Ext.apply(this, {
      xtype: 'grid',
      id: options.grid.id,
      anchor: '100% 100%',
      title: options.grid.title,
      store: store,
      cm: column_model,
      loadMask: true,
      sm: new Ext.grid.RowSelectionModel({singleSelect:true}),

      listeners: {
	'show': {fn:function(e){ e.store.load({params:{start:0, limit:20}}); }, scope:this},
	'enable': {fn:function(e){ e.store.load({params:{start:0, limit:20}}); }, scope:this}
      },

      view: grid_groupview,

      tbar: toolbar,
      bbar: pagingbar
    });

    Alca.ITILSheets.SheetsGrid.superclass.initComponent.apply(this, arguments);
  },

  onRender: function() {
    this.store.load();
    Alca.ITILSheets.SheetsGrid.superclass.onRender.apply(this, arguments);
  }
});

Ext.reg("alca.itilsheet.sheetsgrid",Alca.ITILSheets.SheetsGrid);

Alca.ITILSheets.DashboardHeader = Ext.extend(Ext.Panel, {
  xtype: 'panel',
  id:'dashboard-header',
  bodyStyle: "background-color: lightblue; padding: 5;",
  html:'<h1 style="font-size: 24;"> Alca ITIL Sheets Panel </h1>',

  initComponent: function() {
    Alca.ITILSheets.DashboardHeader.superclass.initComponent.apply(this, arguments);
  },
  onRender:function() {
    //this.store.load();

    Alca.ITILSheets.DashboardHeader.superclass.onRender.apply(this, arguments);
  }
});

Ext.reg('itilsheet.dashboard.header', Alca.ITILSheets.DashboardHeader);

Alca.ITILSheets.DashboardLeftMenu = Ext.extend(Ext.Panel, {
  id: 'dashboard-left',
  margins: '5 5 5 5',
  border: true,
  baseCls:'x-plain',
  layout: 'accordion',

  initComponent: function() {
    Ext.apply(this,{
		items: [{
			  id: 'dashboard-actions-menu',
			  title: 'Actions Menu',
			  collapsed:true
			}, {
			  id: 'dashboard-active-filters',
			  title: 'Active Filters',
			  collapsed:true
			}]
	      });

    Alca.ITILSheets.DashboardLeftMenu.superclass.initComponent.apply(this, arguments);
  },
  onRender:function() {
    //this.store.load();

    Alca.ITILSheets.DashboardLeftMenu.superclass.onRender.apply(this, arguments);
  }
});

Ext.reg('itilsheet.dashboard.leftmenu', Alca.ITILSheets.DashboardLeftMenu);

Alca.ITILSheets.DashboardContent = Ext.extend(Ext.TabPanel,{
  xtype: 'tabpanel',
  activeTab: 0,
  id: 'dashboard-content',

  initComponent: function() {
    Ext.apply(this,{
      items: {xtype: "alca.itilsheet.sheetsgrid", itilsheets: UI.blueprints.sheets_grid}
      //items: {xtype: "panel", title: "test", html: "prova123"}
    });

    Alca.ITILSheets.DashboardContent.superclass.initComponent.apply(this, arguments);
  },
  onRender:function() {
    //this.store.load();

    Alca.ITILSheets.DashboardContent.superclass.onRender.apply(this, arguments);
  }
});

Ext.reg('itilsheet.dashboard.content', Alca.ITILSheets.DashboardContent);

Alca.ITILSheets.Dashboard = Ext.extend(Ext.Viewport, {
  id: 'dashboard',
  layout: 'border',

  initComponent: function() {
    Ext.apply(this, {
      autoshow: true,
      useShim: true,
      items: [
	{xtype: "itilsheet.dashboard.header",
	region: 'north',
	 autoHeight: true
	},
	{xtype: "itilsheet.dashboard.leftmenu",
	 region: 'west',
	 id: "dashboard-left-menu",
	 frame: true,
	 split: true,
	 collapsible: true,
	 collapseMode: 'mini',
	 maxSize: 300,
	 minSize: 260,
	 width: 220
	},
	{region: 'center', layout: 'fit', xtype: "panel", items: {xtype: "itilsheet.dashboard.content"}}
      ]
    });

    Alca.ITILSheets.Dashboard.superclass.initComponent.apply(this,arguments);
  },
  onRender:function() {
    //this.store.load();

    Alca.ITILSheets.Dashboard.superclass.onRender.apply(this, arguments);
  }
});

Ext.reg('itilsheet.dashboard', Alca.ITILSheets.Dashboard);