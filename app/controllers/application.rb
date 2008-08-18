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

