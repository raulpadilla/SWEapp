;

//
// SIEBEL SYSTEM GENERATED FILE - DO NOT EDIT
// MSGXTR32 Version 8.1.1.2
//

// LANGUAGE: FIN


var _SWEmsgAry = new Array();
var _SWEbMsgInit = false;

function _SWEgetGlobalMsgAry()

{
    if (! _SWEbMsgInit)
    {
        _SWEbMsgInit = true;

        _SWEmsgAry["ISSCDA_COLUMN_NOT_FOUND"]  = "Saraketta %1 ei l\u00F6ydy";
        _SWEmsgAry["ISSCDA_DEFAULT_CALC_PAGE_STR"]  = "Lasketaan...";
        _SWEmsgAry["ISSCDA_DEFAULT_DATA_LOAD_STR"]  = "Ladataan tietoja...";
        _SWEmsgAry["ISSCDA_ERR_ENGINE_CHANGED"]  = "CDA-toiminto muutettu. K\u00E4ynnist\u00E4 selain uudelleen.";
        _SWEmsgAry["ISSCDA_FRAME_COULD_NOT_LOAD"]  = "Ei voi ladata kohdetta %1. Kehyst\u00E4 ei ole olemassa.";
        _SWEmsgAry["ISSCDA_MODULE_DNE"]  = "Moduulia %1 ei ole olemassa";
        _SWEmsgAry["ISSCDA_MODULE_REG_NUM"]  = "Kohteen %1 moduulitason on oltava v\u00E4hint\u00E4\u00E4n 1";
        _SWEmsgAry["ISSCDA_MODULE_WAITING"]  = "Moduuli %1 odottaa yh\u00E4, ett\u00E4 kehys %2 lopettaa edellisen tiedoston lataamisen. Jos haluat yh\u00E4 odottaa, valitse OK. Jos haluat ladata etk\u00E4 jatka odottamista, valitse PERUUTA.  (Varoitus: Peruuttaminen voi aiheuttaa virheit\u00E4.)";
        _SWEmsgAry["ISSCDA_MODULE_WAITING_FOR_FRAME"]  = "Moduuli %1 odottaa yh\u00E4, ett\u00E4 kehys %2 lopettaa edellisen tiedoston lataamisen. Jos haluat yh\u00E4 odottaa, valitse OK. Jos haluat ladata etk\u00E4 jatka odottamista, valitse PERUUTA.  (Varoitus: Peruuttaminen voi aiheuttaa virheit\u00E4.)";
        _SWEmsgAry["ISSCDA_NO_INTERNAL_PRODUCT_LIST"]  = "Sivustoa ei ole linkitetty mihink\u00E4\u00E4n tietokannan tuotteisiin.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_LOAD_PAGESET"]  = "Sivustoa ei voi ladata, koska n\u00E4ytt\u00F6aluetta ei ole k\u00E4ytett\u00E4viss\u00E4.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_SHOW_CONTENTS"]  = "Sis\u00E4llysluetteloa ei voi n\u00E4ytt\u00E4\u00E4, koska n\u00E4ytt\u00F6aluetta ei ole k\u00E4ytett\u00E4viss\u00E4";
        _SWEmsgAry["ISSCDA_PRICE_CLOSE_STR"]  = "Sulje ikkuna";
        _SWEmsgAry["ISSCDA_UI_WAITING_FOR_FRAME"]  = "Sovellus odottaa yh\u00E4, ett\u00E4 n\u00E4ytett\u00E4v\u00E4t sivut lopettavat edellisen tiedoston lataamisen. Jos haluat yh\u00E4 odottaa, valitse OK. Jos haluat ladata etk\u00E4 jatka odottamista, valitse PERUUTA. (Varoitus: Peruuttaminen voi aiheuttaa virheit\u00E4.)";

   }

   return _SWEmsgAry;

 }

function _SWEgetMessage(key)
{
   ary = _SWEgetGlobalMsgAry();
   return ary[key];
}

