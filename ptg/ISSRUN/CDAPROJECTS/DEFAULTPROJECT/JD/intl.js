;

//
// SIEBEL SYSTEM GENERATED FILE - DO NOT EDIT
// MSGXTR32 Version 8.1.1.2
//

// LANGUAGE: PTG


var _SWEmsgAry = new Array();
var _SWEbMsgInit = false;

function _SWEgetGlobalMsgAry()

{
    if (! _SWEbMsgInit)
    {
        _SWEbMsgInit = true;

        _SWEmsgAry["ISSCDA_COLUMN_NOT_FOUND"]  = "Coluna %1 n\u00E3o encontrada";
        _SWEmsgAry["ISSCDA_DEFAULT_CALC_PAGE_STR"]  = "A calcular...";
        _SWEmsgAry["ISSCDA_DEFAULT_DATA_LOAD_STR"]  = "A carregar dados...";
        _SWEmsgAry["ISSCDA_ERR_ENGINE_CHANGED"]  = "Motor CDA alterado. Reinicie o browser.";
        _SWEmsgAry["ISSCDA_FRAME_COULD_NOT_LOAD"]  = "N\u00E3o foi poss\u00EDvel carregar %1. A moldura n\u00E3o existe.";
        _SWEmsgAry["ISSCDA_MODULE_DNE"]  = "O m\u00F3dulo %1 n\u00E3o existe";
        _SWEmsgAry["ISSCDA_MODULE_REG_NUM"]  = "O n\u00EDvel do m\u00F3dulo para %1 tem de ser 1 ou superior";
        _SWEmsgAry["ISSCDA_MODULE_WAITING"]  = "M\u00F3dulo %1 est\u00E1 a aguardar que a mold. %2 carregue fich. anterior. Prima OK para continuar aguardar, CANCELAR para carregar sem continuar aguardar. (Aviso: se cancelar poder\u00E3o ocorrer erros).";
        _SWEmsgAry["ISSCDA_MODULE_WAITING_FOR_FRAME"]  = "M\u00F3dulo %1 est\u00E1 a aguardar que a mold. %2 carregue fich. anterior. Prima OK para continuar aguardar, CANCELAR para carregar sem continuar aguardar. (Aviso: se cancelar poder\u00E3o ocorrer erros).";
        _SWEmsgAry["ISSCDA_NO_INTERNAL_PRODUCT_LIST"]  = "O conj. p\u00E1gs. n\u00E3o est\u00E1 ligado a nenhum produto da base de dados.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_LOAD_PAGESET"]  = "Nenhuma \u00E1rea de apresenta\u00E7\u00E3o dispon\u00EDvel para carregar o conj. de p\u00E1ginas.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_SHOW_CONTENTS"]  = "Nenhuma \u00E1rea de apresenta\u00E7\u00E3o dispon\u00EDvel para mostrar a lista de conte\u00FAdo.";
        _SWEmsgAry["ISSCDA_PRICE_CLOSE_STR"]  = "Fechar janela";
        _SWEmsgAry["ISSCDA_UI_WAITING_FOR_FRAME"]  = "A aplic. est\u00E1 a aguardar que p\u00E1gs. visualiz. carreguem fich. anterior. Prima OK para continuar a aguardar, CANCELAR para carregar sem continuar a aguardar. (Aviso: se cancelar poder\u00E3o ocorrer erros).";

   }

   return _SWEmsgAry;

 }

function _SWEgetMessage(key)
{
   ary = _SWEgetGlobalMsgAry();
   return ary[key];
}

