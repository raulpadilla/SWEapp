;

//
// SIEBEL SYSTEM GENERATED FILE - DO NOT EDIT
// MSGXTR32 Version 8.1.1.2
//

// LANGUAGE: FRA


var _SWEmsgAry = new Array();
var _SWEbMsgInit = false;

function _SWEgetGlobalMsgAry()

{
    if (! _SWEbMsgInit)
    {
        _SWEbMsgInit = true;

        _SWEmsgAry["ISSCDA_COLUMN_NOT_FOUND"]  = "Colonne %1 introuvable";
        _SWEmsgAry["ISSCDA_DEFAULT_CALC_PAGE_STR"]  = "Calcul en cours...";
        _SWEmsgAry["ISSCDA_DEFAULT_DATA_LOAD_STR"]  = "Chargement en cours des donn\u00E9es...";
        _SWEmsgAry["ISSCDA_ERR_ENGINE_CHANGED"]  = "Le moteur CDA a \u00E9t\u00E9 modifi\u00E9. Red\u00E9marrez le navigateur.";
        _SWEmsgAry["ISSCDA_FRAME_COULD_NOT_LOAD"]  = "Impossible de charger %1. Le cadre n'existe pas.";
        _SWEmsgAry["ISSCDA_MODULE_DNE"]  = "Le module %1 n'existe pas.";
        _SWEmsgAry["ISSCDA_MODULE_REG_NUM"]  = "Le niveau de module de %1 doit \u00EAtre sup\u00E9rieur ou \u00E9gal \u00E0 1";
        _SWEmsgAry["ISSCDA_MODULE_WAITING"]  = "Le module %1 attend tjrs que le cadre %2 termine charg. fichier pr\u00E9c\u00E9dent. Cliquez sur OK pour poursuivre attente ou sur ANNULER pr charger. (l'annulation peut provoquer des erreurs.)";
        _SWEmsgAry["ISSCDA_MODULE_WAITING_FOR_FRAME"]  = "Le module %1 attend tjrs que le cadre %2 termine charg. fichier pr\u00E9c\u00E9dent. Cliquez sur OK pour poursuivre attente ou sur ANNULER pr charger. (l'annulation peut provoquer des erreurs.)";
        _SWEmsgAry["ISSCDA_NO_INTERNAL_PRODUCT_LIST"]  = "Le jeu de pages n'est li\u00E9 \u00E0 aucun produit de la base de donn\u00E9es.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_LOAD_PAGESET"]  = "Aucune zone d'affichage n'est disponible pour charger le jeu de pages.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_SHOW_CONTENTS"]  = "Aucune zone n'est disponible pour afficher la liste de contenu.";
        _SWEmsgAry["ISSCDA_PRICE_CLOSE_STR"]  = "Fermer la fen\u00EAtre";
        _SWEmsgAry["ISSCDA_UI_WAITING_FOR_FRAME"]  = "L'app. attend tjrs que les pages d'affichage terminent le chargement du fichier pr\u00E9c\u00E9dent. Cliquez sr OK pour poursuivre l'attente ou sr ANNULER pour charger ss attendre. (l'ann. provoque erreurs.)";

   }

   return _SWEmsgAry;

 }

function _SWEgetMessage(key)
{
   ary = _SWEgetGlobalMsgAry();
   return ary[key];
}

