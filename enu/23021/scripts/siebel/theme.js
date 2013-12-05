var ua = navigator.userAgent;
var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
if (re.exec(ua) != null && parseFloat(RegExp.$1) <= 8) {
	var IE8inc = "files/ie8-compat.css";
	var IE8incTangerine = "files/ie8-compat-tangerine.css"
} else {
	var IE8inc = "";
	var IE8incTangerine = ""
}
SiebelApp.ThemeManager.addTheme("GRAY_TAB", {
	css : {
		sb_theme : "files/theme-base.css",
		sc_theme : "files/theme-gray.css",
		sn_theme : "files/theme-nav-tab.css",
		sca_them : "files/theme-calendar.css",
		sd_theme : IE8inc
	},
	objList : []
});
SiebelApp.ThemeManager.addTheme("TANGERINE_TAB", {
	css : {
		sb_theme : "files/theme-base.css",
		sc_theme : "files/theme-tangerine.css",
		sn_theme : "files/theme-nav-tab-tangerine.css",
		sca_them : "files/theme-calendar-tangerine.css",
		sd_theme : IE8incTangerine
	},
	objList : []
});
SiebelApp.ThemeManager.addTheme("GRAY_ACCORDION", {
	css : {
		sb_theme : "files/theme-base.css",
		sc_theme : "files/theme-gray.css",
		sn_theme : "files/theme-nav-accordion.css",
		sca_them : "files/theme-calendar.css",
		dyt_them : "files/3rdParty/themes/dynatree/skin/ui.dynatree.css",
		sd_theme : IE8inc
	},
	objList : []
});
SiebelApp.ThemeManager.addTheme("TANGERINE_ACCORDION", {
	css : {
		sb_theme : "files/theme-base.css",
		sc_theme : "files/theme-tangerine.css",
		sn_theme : "files/theme-nav-accordion-tangerine.css",
		sca_them : "files/theme-calendar-tangerine.css",
		dyt_them : "files/3rdParty/themes/dynatree/skin/ui.dynatree.css",
		sd_theme : IE8incTangerine
	},
	objList : []
});