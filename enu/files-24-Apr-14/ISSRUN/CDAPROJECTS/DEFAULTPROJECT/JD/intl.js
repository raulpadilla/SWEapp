;

//
// SIEBEL SYSTEM GENERATED FILE - DO NOT EDIT
// MSGXTR32 Version 8.1.1.2
//

// LANGUAGE: ENU


var _SWEmsgAry = new Array();
var _SWEbMsgInit = false;

function _SWEgetGlobalMsgAry()

{
    if (! _SWEbMsgInit)
    {
        _SWEbMsgInit = true;

        _SWEmsgAry["ISSCDA_COLUMN_NOT_FOUND"]  = "%1 column not found";
        _SWEmsgAry["ISSCDA_DEFAULT_CALC_PAGE_STR"]  = "Calculating...";
        _SWEmsgAry["ISSCDA_DEFAULT_DATA_LOAD_STR"]  = "Data Loading...";
        _SWEmsgAry["ISSCDA_ERR_ENGINE_CHANGED"]  = "CDA engine changed. Please restart the browser.";
        _SWEmsgAry["ISSCDA_FRAME_COULD_NOT_LOAD"]  = "Could not load %1.  Frame does not exist.";
        _SWEmsgAry["ISSCDA_MODULE_DNE"]  = "Module %1 does not exist";
        _SWEmsgAry["ISSCDA_MODULE_REG_NUM"]  = "Module level for %1 must be 1 or greater";
        _SWEmsgAry["ISSCDA_MODULE_WAITING"]  = "Module %1 is still waiting for frame %2 to finish loading the previous file.  Press OK to continue to wait, CANCEL to load without continuing to wait.  (Warning: Canceling may cause errors.)";
        _SWEmsgAry["ISSCDA_MODULE_WAITING_FOR_FRAME"]  = "Module %1 is still waiting for frame %2 to finish loading the previous file.  Press OK to continue to wait, CANCEL to load without continuing to wait.  (Warning: Canceling may cause errors.)";
        _SWEmsgAry["ISSCDA_NO_INTERNAL_PRODUCT_LIST"]  = "Pageset is not linked to any products in the database.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_LOAD_PAGESET"]  = "No display area available to load pageset.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_SHOW_CONTENTS"]  = "No display area available to show contents list.";
        _SWEmsgAry["ISSCDA_PRICE_CLOSE_STR"]  = "Close Window";
        _SWEmsgAry["ISSCDA_UI_WAITING_FOR_FRAME"]  = "Application is still waiting for the display pages to finish loading the previous file. Press OK to continue to wait, CANCEL to load without continuing to wait. (Warning:Cancelling may cause errors.)";

   }

   return _SWEmsgAry;

 }

function _SWEgetMessage(key)
{
   ary = _SWEgetGlobalMsgAry();
   return ary[key];
}

