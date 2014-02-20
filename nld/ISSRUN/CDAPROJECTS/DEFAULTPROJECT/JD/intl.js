;

//
// SIEBEL SYSTEM GENERATED FILE - DO NOT EDIT
// MSGXTR32 Version 8.1.1.2
//

// LANGUAGE: NLD


var _SWEmsgAry = new Array();
var _SWEbMsgInit = false;

function _SWEgetGlobalMsgAry()

{
    if (! _SWEbMsgInit)
    {
        _SWEbMsgInit = true;

        _SWEmsgAry["ISSCDA_COLUMN_NOT_FOUND"]  = "Kolom %1 niet gevonden";
        _SWEmsgAry["ISSCDA_DEFAULT_CALC_PAGE_STR"]  = "Bezig met berekenen...";
        _SWEmsgAry["ISSCDA_DEFAULT_DATA_LOAD_STR"]  = "Gegevens laden...";
        _SWEmsgAry["ISSCDA_ERR_ENGINE_CHANGED"]  = "CDA-engine gewijzigd. Start de browser opnieuw.";
        _SWEmsgAry["ISSCDA_FRAME_COULD_NOT_LOAD"]  = "Kan %1 niet laden. Frame bestaat niet.";
        _SWEmsgAry["ISSCDA_MODULE_DNE"]  = "Module %1 bestaat niet";
        _SWEmsgAry["ISSCDA_MODULE_REG_NUM"]  = "Moduleniveau voor %1 moet 1 zijn of hoger";
        _SWEmsgAry["ISSCDA_MODULE_WAITING"]  = "Module %1 wacht op frame %2 om het laden van het vorige bestand te voltooien.  Druk op OK om te blijven wachten, of annuleer om te laden zonder te wachten.  (Waarschuwing: Bij annuleren kunnen fouten optreden.)";
        _SWEmsgAry["ISSCDA_MODULE_WAITING_FOR_FRAME"]  = "Module %1 wacht op frame %2 om het laden van het vorige bestand te voltooien.  Druk op OK om te blijven wachten, of annuleer om te laden zonder te wachten.  (Waarschuwing: Bij annuleren kunnen fouten optreden.)";
        _SWEmsgAry["ISSCDA_NO_INTERNAL_PRODUCT_LIST"]  = "Paginaset is niet gekoppeld aan producten in de database.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_LOAD_PAGESET"]  = "Geen weergavegebied beschikbaar om paginaset te laden.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_SHOW_CONTENTS"]  = "Geen weergavegebied beschikbaar om inhoudsoverzicht te tonen.";
        _SWEmsgAry["ISSCDA_PRICE_CLOSE_STR"]  = "Venster sluiten";
        _SWEmsgAry["ISSCDA_UI_WAITING_FOR_FRAME"]  = "Toepassing wacht op weergavepagina's om het laden van het vorige bestand te voltooien. Druk op OK om te blijven wachten, of annuleer om te laden zonder te wachten. (Waarschuwing: Bij annuleren kunnen fouten optreden.)";

   }

   return _SWEmsgAry;

 }

function _SWEgetMessage(key)
{
   ary = _SWEgetGlobalMsgAry();
   return ary[key];
}

