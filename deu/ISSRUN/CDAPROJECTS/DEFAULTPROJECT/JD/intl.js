;

//
// SIEBEL SYSTEM GENERATED FILE - DO NOT EDIT
// MSGXTR32 Version 8.1.1.2
//

// LANGUAGE: DEU


var _SWEmsgAry = new Array();
var _SWEbMsgInit = false;

function _SWEgetGlobalMsgAry()

{
    if (! _SWEbMsgInit)
    {
        _SWEbMsgInit = true;

        _SWEmsgAry["ISSCDA_COLUMN_NOT_FOUND"]  = "Spalte %1 nicht gefunden";
        _SWEmsgAry["ISSCDA_DEFAULT_CALC_PAGE_STR"]  = "Berechnung l\u00E4uft...";
        _SWEmsgAry["ISSCDA_DEFAULT_DATA_LOAD_STR"]  = "Daten werden geladen...";
        _SWEmsgAry["ISSCDA_ERR_ENGINE_CHANGED"]  = "\u00C4nderung an der CDA-Engine. Starten Sie den Browser neu.";
        _SWEmsgAry["ISSCDA_FRAME_COULD_NOT_LOAD"]  = "'%1' konnte nicht geladen werden. Frame ist nicht vorhanden.";
        _SWEmsgAry["ISSCDA_MODULE_DNE"]  = "Modul %1 ist nicht vorhanden";
        _SWEmsgAry["ISSCDA_MODULE_REG_NUM"]  = "Modulebene f\u00FCr %1 muss mindestens 1 sein";
        _SWEmsgAry["ISSCDA_MODULE_WAITING"]  = "Modul %1 ist so lange inaktiv, bis Frame %2 d. vorh Datei geladen hat.  Klicken Sie auf OK, um weiter zu warten, o. auf ABBRECHEN, um sofort zu laden.  (Achtung: Fehler d. Abbruch m\u00F6gl.)";
        _SWEmsgAry["ISSCDA_MODULE_WAITING_FOR_FRAME"]  = "Modul %1 ist so lange inaktiv, bis Frame %2 d. vorh Datei geladen hat.  Klicken Sie auf OK, um weiter zu warten, o. auf ABBRECHEN, um sofort zu laden.  (Achtung: Fehler d. Abbruch m\u00F6gl.)";
        _SWEmsgAry["ISSCDA_NO_INTERNAL_PRODUCT_LIST"]  = "Seiteneinstellungen sind mit keinem Produkt in der Datenbank verkn\u00FCpft.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_LOAD_PAGESET"]  = "Kein Anzeigebereich zum Laden der Seiteneinstellungen verf\u00FCgbar.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_SHOW_CONTENTS"]  = "Kein Anzeigebereich zum Anzeigen der Inhaltsliste verf\u00FCgbar.";
        _SWEmsgAry["ISSCDA_PRICE_CLOSE_STR"]  = "Fenster schlie\u00DFen";
        _SWEmsgAry["ISSCDA_UI_WAITING_FOR_FRAME"]  = "Anw. ist noch so lange inaktiv, bis d. Anzeigeseiten d. vorh. Datei geladen haben. Klicken Sie auf OK, um weiter zu warten, o. auf ABBRECHEN, um sofort zu laden. (Achtung: Fehler d. Abbruch m\u00F6gl.)";

   }

   return _SWEmsgAry;

 }

function _SWEgetMessage(key)
{
   ary = _SWEgetGlobalMsgAry();
   return ary[key];
}

