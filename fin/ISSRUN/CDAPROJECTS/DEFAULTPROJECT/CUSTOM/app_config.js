//*****************************
//app_config.js
//Application Level Config File
//Last Edited 03/30/01
//Created by Julie and Carrie
//*****************************

//Application Version Information

//application version (ex. "Amdahl 2.0")
var APP_VERSION = "";

//meta level dataset version.  Pageset level versions should be set, but
//this will be available as a backup dataset version.
var APP_DATA_VERSION = "";

//Start on Active - location of frame containing Application, defaults to top
var APP_SOA_TOP_LOC = top;

// Show UI when engine loads (false=persistent engine)
var APP_LOAD_UI_ON_STARTUP = false;

// Include Siebel Integration Code
var APP_SIEBEL_INTEGRATION_ON = true;

// location of display area.  If APP_LOAD_UI_ON_STARTUP == false then uses top.swe.contentFrame instead
var APP_DISPLAY_AREA_FRAME = OLStr+".displayArea";

//UI level information.

//window information for help and about windows
var APP_HELP_WIN_ARGS = "status=0,scrollbars=0,resizable=0,menubar=1,width=525,height=375";
var APP_ABOUT_WIN_ARGS = "status=0,scrollbars=1,resizable=0,width=450,height=300";

//auto-load variable
var APP_AUTO_LOAD_RESULTS = true;

//number of exception messages;
var APP_EXC_DISPLAY_NUM = 1;

// calculate config tables not connected to MAIN
var APP_EVALUATE_ALL_TABLES = false;

//Reload all frames after an input change
var APP_RELOAD_ALL = false;

// Reload pages that have inputs when an exception is shown
var APP_RELOAD_INPUTS_ON_EXC = false;

//default amount of time before warning is shown when a module cannot load
var APP_DEFAULT_TIMEOUT=10000;

//indicates whether to display the temporary "data loading" page while data is loading.
//If undefined, defaults to true
var APP_SHOW_DATA_LOADING_PAGE = true;

//variable for loading results pages.If set to true calculating message page will display in 
//exception frame after a widget has changed and before the results page loads
//If undefined, defaults to true
var APP_SHOW_CALC_PAGE = true;

//keep object state in history
var APP_ALWAYS_KEEP_BACK_STATE = true;

//control for the price display window.
var APP_PRICE_TITLE_ATTR = "Pricing Window";
var APP_PRICE_BODY_ATTR = "bgcolor='#ffffff'";
var APP_PRICE_FONT_ATTR = "face='Verdana' size=2 color=blue";
var APP_PRICE_TABLE_ATTR = "border=0 cellpadding=2 cellspacing=2 width=100%";
var APP_PRICE_HEADERS = new Array('Name','Net Price','List Price','Comments','One-Time Charge Total','Monthly Recurring Charge Total');
var APP_PRICE_DATA = new Array('Product Name','Current Price','Original List Price','Pricing Comments','NRC CxTotal','MRC CxTotal');			// list of data items to display in that order.
var APP_PRICE_WIN_ATTR = "status=0,scrollbars=1,resizable=1,width=450,height=200";
var APP_PRICE_CLOSE_ATTR = "Close Window";			// text to display for closing window link.

//Switches for partner applications

//Turn Surveyor on and off
var SURVEYOR_ACTIVE = false;

//Location for Surveyor
var SURVEYOR_URL = "http://10.10.10.203/servlet/surveyor";

//Turn Transact on and off
var TRANSACT_ACTIVE = false;

//Required TRANSACT variables
var TRANSACT_URL = "http://localhost:7001/OnLinkTransact";
var TRANSACT_THIRD_PARTY_CART=false;
var TRANSACT_SHOW_CART_URL="http://localhost";
var TRANSACT_CART_WINARGS="height=500,width=500,scrollbars=1,resizable=1,menubar=0";

//Optional TRANSACT variables
var TRANSACT_NOT_ACTIVE_MSSG = "Sorry, the action you have requested is currently unavailable.\n Please contact your system administrator.\n";
var TRANSACT_CART_TARGET="_new";
var TRANSACT_OPEN_QUOTE_PROMPT="Current Open Quote: ";

//Set the variable that defines a subitem here. 
var ORDER_SUBVAR = "";

//DO NOT CHANGE THESE VARIABLES
var APP_ENGINE_CHANGED = false;
var APP_CONFIG_LOADED = true;
var SURVEYOR_CONFIG_LOADED = true;
var ORDER_CONFIG_LOADED = true;
var TRANSACT_CONFIG_LOADED = true;

