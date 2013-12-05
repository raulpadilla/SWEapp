/* Addition of New Custom Theme */
/*SiebelApp.ThemeManager.addTheme(
    "MY_NEW_THEME",
    {
       css : {
               "css_id" : "files/theme-base.css"  // Location of CSS file which needs to be added as part of new theme 
             }
    }
);*/


/* Addition of CSS in an existing theme */
/*
SiebelApp.ThemeManager.addResource(
    "MY_EXISTING_THEME",
    {
       css : {
               "new_css_id" : "files/theme-gray.css"  // Location of CSS file which needs to be added as part of existing theme 
             }
    }
);
*/
SiebelApp.ThemeManager.addTheme("BLUE_TAB", {
	css : {
		sb_theme : "files/theme-base-blue.css",
		sc_theme : "files/theme-gray-blue.css",
		sn_theme : "files/theme-nav-tab-blue.css",
		sca_them : "files/theme-calendar-blue.css",
		sd_theme : IE8inc,
		colorbox : SIEBEL_BUILD + "3rdParty/colorbox/colorbox.css",
		jcarousel: SIEBEL_BUILD + "3rdParty/jcarousel/skins/tango/skin1.css"
	},
	objList : []
});
