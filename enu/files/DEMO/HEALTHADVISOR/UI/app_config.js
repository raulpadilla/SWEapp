//*****************************
//app_config.js
//Application Level Config File
//*****************************

//Switches for partner applications

//Turn Surveyor on and off
var SURVEYOR_ACTIVE = false;

//Location for Surveyor
var SURVEYOR_URL = "";

//Turn Sales Quote on and off
var QUOTE_ACTIVE = false;

//URL for Sales Quote servlet
var QUOTE_URL = "";

//Application version
var APP_VERSION = "";

//Data Set version.  Pageset versions should be set in the Inputs Layout File
var APP_DATA_VERSION = "";

//Window information for Help and About windows
var APP_HELP_WIN_ARGS = "status=0,scrollbars=0,resizable=0,menubar=1,width=525,height=375";
var APP_ABOUT_WIN_ARGS = "status=0,scrollbars=1,resizable=0,width=450,height=300";

// Autoload results page
var APP_AUTO_LOAD_RESULTS = true;

//Case analysis
var APP_CASE_ANALYSIS_FIX_ACTIVE = false;

//Order configuration variables

//Window information for the Order window
var ORDER_WIN_ARGS = "width=580,height=500,status=0,menubar=0,scrollbars=1,resizable=1";

//Initialize the variable that identifies a subitem.  Replacement for API function InitSubVar().
var ORDER_SUBVAR = "PRM";

//Initialize the variables for main items and subitems.  Replacement for API function InitItems().
var ORDER_ITEMVARS = new Array();
ORDER_ITEMVARS[0] = "PRM";
ORDER_ITEMVARS[1] = "PRICE";
ORDER_ITEMVARS[2] = "TEXTFIELD";

//Initialize the variables to track subitem subtotal as well as total order.  Replacement for API function InitTotalVar().
var ORDER_TOTALVAR = new Array();

//NOTE: DO NOT CHANGE THESE VARIABLES
var APP_CONFIG_LOADED = true;
var SURVEYOR_CONFIG_LOADED = true;
var QUOTE_CONFIG_LOADED = true;
var ORDER_CONFIG_LOADED = true;
