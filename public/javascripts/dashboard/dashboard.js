/*
 * dashboard.js : Configure dashboard layout and components
 *
 *
 */

var dashboard;
var mask;

Ext.onReady(function() {
	      // GLOBAL configuration
	      Ext.QuickTips.init();
	      Ext.form.Field.prototype.msgTarget = 'side';

	      mask = new Ext.LoadMask(document.body,{});

	      dashboard = new Ext.Viewport(UI.blueprints.dashboard);
	    });

var UI = {
  blueprints: {
    dashboard: {
      id: 'dashboard',
      layout: 'border',
      items: [
	{
	  id:'dashboard-header',
	  region: 'north',
	  height: 40,
	  bodyStyle: "background-color: lightblue; padding: 5;",
	  html:'<h1 style="font-size: 24;"> Alca ITIL Sheets Panel </h1>'
	},
	{
	  id: 'dashboard-left',
	  region: 'west',
	  split:true,
          collapsible: true,
          collapseMode: 'mini',
          width: 200,
          minWidth: 150,
          border: false,
          baseCls:'x-plain',

          items: [
	    {
              id: 'dashboard-actions-menu',
              frame:true,
              title: 'Actions Menu',
              collapsible:false,
              titleCollapse: true
            },
            {
              id: 'dashboard-active-filters',
              frame:true,
              title: 'Active Filters',
              collapsible:true,
              titleCollapse: true,
              margins: '4 4 4 4'
            }
          ]
	},
	{
	  region: 'center',
          xtype: 'panel',
          layout: 'card',
          margins: '4 4 4 0',
          border: false,
          id: 'dashboard-content',
          activeItem: 0,
          items: [
            new Ext.grid.GridPanel(blueprints.grids.sheets)
          ]
	}
      ]
    }
  }
};
