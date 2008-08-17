var create_RESTGrid = function(options) {
  this._options = options;

  var grid;
  var store;
  var column_model;
  var listeners;

  var grid_groupview;
  var toolbar;
  var pagingbar;

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

  grid = {
    xtype: 'grid',
    id: options.grid.id,
    el:document.body,
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
  };

  return new Ext.grid.GridPanel(grid);
};