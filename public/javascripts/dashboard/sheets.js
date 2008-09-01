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
 * sheets.js : Configure specialized sheet components
 *
 *
 */


Ext.namespace("UI.blueprints");

///////// SHEETS GRID

/// SHEET column model
///       group store
///       paging tool bar
///       grouping view

UI.blueprints.sheets_grid = {
  grid: {
    id: 'sheets-grid',
    title: 'sheets'
  },
  form: null,
  fileUpload: false,
  store: {
    url: '/sheets',
    sortInfo: {field: 'updated_on', direction: 'DESC'},
    groupField: 'type',
    fields: ['id', 'sha_id', 'short_id','summary','type',
             'project_short_id', 'author', 'substatus', {name:'updated_on', type:'date'}]
  },
  columnModel: [
    { header: "Short ID", dataIndex: 'short_id' },
    { header: "Sha ID", dataIndex: 'sha_id', hidden: true },
    { header: "Summary", dataIndex: 'summary' },
    { header: "Project", dataIndex: 'project_short_id' },
    { header: "Author", dataIndex: 'author' },
    { header: "Substatus", dataIndex: 'substatus' },
    { header: "Type", dataIndex: 'type' },
    { id: "last", header: "Updated On", dataIndex: 'updated_on' }
  ]
};
