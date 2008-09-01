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

Ext.namespace("UI.blueprints");

///// DASHBOARD BLUEPRINTS



UI.blueprints.dashboard_header = {
  xtype: 'box',
  id:'dashboard-header',
  region: 'north',
  height: 40,
  bodyStyle: "background-color: lightblue; padding: 5;",
  html:'<h1 style="font-size: 24;"> Alca ITIL Sheets Panel </h1>'
};

UI.blueprints.dashboard_left = {
  id: 'dashboard-left',
  region: 'west',
  split: true,
  collapsible: true,
  collapseMode: 'mini',
  maxSize: 250,
  minSize: 200,
  width: 200,
  margins: '5 5 5 5',
  border: true,
  baseCls:'x-plain',
  layout: 'accordion',
  items: [{
    id: 'dashboard-actions-menu',
    title: 'Actions Menu',
    collapsed:true
  }, {
    id: 'dashboard-active-filters',
    title: 'Active Filters',
    collapsed:true
  }]
};

UI.blueprints.dashboard_content = new Ext.TabPanel({
  xtype: 'tabpanel',
  deferredRender:false,
  activeTab: 0,
  id: 'dashboard-content',
  items: [create_RESTGrid(UI.blueprints.sheets_grid)]
});

UI.blueprints.dashboard = {
  id: 'dashboard',
  layout: 'border',
  items: [
    new Ext.Panel(UI.blueprints.dashboard_header),
    new Ext.Panel(UI.blueprints.dashboard_left),
    {region: 'center', layout: 'fit', frame: false, margin: '5 5 5 5', items: [UI.blueprints.dashboard_content]}
  ]
};
