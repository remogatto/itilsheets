/*
 * dashboard.js : Configure dashboard layout and components
 *
 *
 */

Ext.BLANK_IMAGE_URL = '/javascripts/ext/resources/images/s.gif';

var dashboard;
var mask;

Ext.onReady(function() {
	      // GLOBAL configuration
	      Ext.QuickTips.init();
	      Ext.form.Field.prototype.msgTarget = 'side';

	      mask = new Ext.LoadMask(document.body,{});

	      dashboard = new Ext.Viewport(UI.blueprints.dashboard);

	      dashboard.doLayout();
	    });
