#    ITILSheets - ITIL-based ticketing webapplication
#    ------------------------------------------------
#    Copyright (C) 2008 - Alca Società Cooperativa
#
#        http://alca.le.it - info@alca.le.it
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.

class Application < Merb::Controller
end

EXTJS_SCRIPTS = ["/javascripts/ext/adapter/ext/ext-base.js","/javascripts/ext/ext-all-debug.js"]
EXTJS_STYLES = ["/javascripts/ext/resources/css/ext-all.css"]

RESTTESTER_SCRIPTS = EXTJS_SCRIPTS + ["/javascripts/RESTcrud.js","/javascripts/admin/rest_tester.js"]
RESTTESTER_STYLES = EXTJS_STYLES

DASHBOARD_SCRIPTS = EXTJS_SCRIPTS + [ "/javascripts/dashboard/create_restgrid.js",
                                      "/javascripts/dashboard/sheets.js", "/javascripts/dashboard/storage.js",
                                      "/javascripts/dashboard/ui.js", "/javascripts/dashboard/dashboard.js"  ]
DASHBOARD_STYLES = EXTJS_STYLES

