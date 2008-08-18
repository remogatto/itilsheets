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
