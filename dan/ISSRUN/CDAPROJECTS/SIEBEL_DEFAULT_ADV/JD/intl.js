;

//
// SIEBEL SYSTEM GENERATED FILE - DO NOT EDIT
// MSGXTR32 Version 8.1.1.2
//

// LANGUAGE: DAN


var _SWEmsgAry = new Array();
var _SWEbMsgInit = false;

function _SWEgetGlobalMsgAry()

{
    if (! _SWEbMsgInit)
    {
        _SWEbMsgInit = true;

        _SWEmsgAry["ISSCDA_COLUMN_NOT_FOUND"]  = "%1 kolonne blev ikke fundet";
        _SWEmsgAry["ISSCDA_DEFAULT_CALC_PAGE_STR"]  = "Beregner...";
        _SWEmsgAry["ISSCDA_DEFAULT_DATA_LOAD_STR"]  = "Indl\u00E6ser data..";
        _SWEmsgAry["ISSCDA_ERR_ENGINE_CHANGED"]  = "CDA-motor \u00E6ndret. Genstart browseren.";
        _SWEmsgAry["ISSCDA_FRAME_COULD_NOT_LOAD"]  = "Kunne ikke indl\u00E6se %1.  Rammen findes ikke.";
        _SWEmsgAry["ISSCDA_MODULE_DNE"]  = "Modul %1 findes ikke";
        _SWEmsgAry["ISSCDA_MODULE_REG_NUM"]  = "Modulniveau for %1 skal v\u00E6re 1 eller st\u00F8rre";
        _SWEmsgAry["ISSCDA_MODULE_WAITING"]  = "Modul %1 venter stadig p\u00E5 at ramme %2 skal afslutte indl\u00E6sning af forrige fil.  Tryk p\u00E5 OK for fortsat at vente, ANNULLER for at indl\u00E6se uden fortsat at vente.  (Advarsel: Annullering kan for\u00E5rsage fejl.)";
        _SWEmsgAry["ISSCDA_MODULE_WAITING_FOR_FRAME"]  = "Modul %1 venter stadig p\u00E5 at ramme %2 skal afslutte indl\u00E6sning af forrige fil.  Tryk p\u00E5 OK for fortsat at vente, ANNULLER for at indl\u00E6se uden fortsat at vente.  (Advarsel: Annullering kan for\u00E5rsage fejl.)";
        _SWEmsgAry["ISSCDA_NO_INTERNAL_PRODUCT_LIST"]  = "Sides\u00E6t er ikke linket til noget produkt i databasen.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_LOAD_PAGESET"]  = "Intet visningsomr\u00E5de tilg\u00E6ngeligt til indl\u00E6sning af sides\u00E6t.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_SHOW_CONTENTS"]  = "Intet visningsomr\u00E5de tilg\u00E6ngeligt til visning af indholdsliste.";
        _SWEmsgAry["ISSCDA_PRICE_CLOSE_STR"]  = "Luk vindue";
        _SWEmsgAry["ISSCDA_UI_WAITING_FOR_FRAME"]  = "Programmet venter stadig p\u00E5 at visningssiderne skal afslutte indl\u00E6sning af forrige fil. Tryk p\u00E5 OK for fortsat at vente, ANNULLER for at indl\u00E6se uden fortsat at vente. (Advarsel: Annullering kan for\u00E5rsage fejl.)";

   }

   return _SWEmsgAry;

 }

function _SWEgetMessage(key)
{
   ary = _SWEgetGlobalMsgAry();
   return ary[key];
}

