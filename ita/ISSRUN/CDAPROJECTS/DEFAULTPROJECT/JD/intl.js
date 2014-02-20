;

//
// SIEBEL SYSTEM GENERATED FILE - DO NOT EDIT
// MSGXTR32 Version 8.1.1.2
//

// LANGUAGE: ITA


var _SWEmsgAry = new Array();
var _SWEbMsgInit = false;

function _SWEgetGlobalMsgAry()

{
    if (! _SWEbMsgInit)
    {
        _SWEbMsgInit = true;

        _SWEmsgAry["ISSCDA_COLUMN_NOT_FOUND"]  = "Colonna %1 non trovata";
        _SWEmsgAry["ISSCDA_DEFAULT_CALC_PAGE_STR"]  = "Calcolo in corso...";
        _SWEmsgAry["ISSCDA_DEFAULT_DATA_LOAD_STR"]  = "Caricamento dati in corso...";
        _SWEmsgAry["ISSCDA_ERR_ENGINE_CHANGED"]  = "Il motore CDA \u00E8 stato modificato. Riavviare il browser.";
        _SWEmsgAry["ISSCDA_FRAME_COULD_NOT_LOAD"]  = "Impossibile caricare %1. Il frame non esiste.";
        _SWEmsgAry["ISSCDA_MODULE_DNE"]  = "Modulo %1 inesistente";
        _SWEmsgAry["ISSCDA_MODULE_REG_NUM"]  = "Il livello del modulo di %1 dev'essere uguale o maggiore di 1.";
        _SWEmsgAry["ISSCDA_MODULE_WAITING"]  = "Modulo %1 in attesa che frame %2 finisca di caricare il file prec. Premere OK per attendere oppure Annulla per caricare. Attenzione: l'annullamento potrebbe provocare degli errori.";
        _SWEmsgAry["ISSCDA_MODULE_WAITING_FOR_FRAME"]  = "Modulo %1 in attesa che frame %2 finisca di caricare il file prec. Premere OK per attendere oppure Annulla per caricare. Attenzione: l'annullamento potrebbe provocare degli errori.";
        _SWEmsgAry["ISSCDA_NO_INTERNAL_PRODUCT_LIST"]  = "L'impostazione pagina non \u00E8 collegata ad alcun prodotto nel database.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_LOAD_PAGESET"]  = "Nessuna area di visualizzazione disponibile per il caricamento dell'impostazione pagina.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_SHOW_CONTENTS"]  = "Nessuna area di visualizzazione disponibile per la visualizzazione dell'elenco dei contenuti.";
        _SWEmsgAry["ISSCDA_PRICE_CLOSE_STR"]  = "Chiudi finestra";
        _SWEmsgAry["ISSCDA_UI_WAITING_FOR_FRAME"]  = "Appl. in attesa fine caric. del file prec. dalle pagine di visualizz. Premere OK per attendere, ANNULLA per proseguire senza attendere. Attenzione: l'annull. potrebbe provocare degli errori.";

   }

   return _SWEmsgAry;

 }

function _SWEgetMessage(key)
{
   ary = _SWEgetGlobalMsgAry();
   return ary[key];
}

