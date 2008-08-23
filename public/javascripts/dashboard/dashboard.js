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
 * dashboard.js : Configure dashboard layout and components
 *
 *
 */

Ext.BLANK_IMAGE_URL = '/javascripts/ext/resources/images/default/s.gif';

var dashboard;
var mask;

Ext.onReady(function() {
	      // GLOBAL configuration
	      Ext.QuickTips.init();
	      Ext.form.Field.prototype.msgTarget = 'side';

//	      mask = new Ext.LoadMask(document.body,{});

	      dashboard = new Alca.ITILSheets.Dashboard();
	      dashboard.render(document.body);
	      dashboard.syncSize();
	    },window, {delay: 250});
