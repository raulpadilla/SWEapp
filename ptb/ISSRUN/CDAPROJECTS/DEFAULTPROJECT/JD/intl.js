;

//
// SIEBEL SYSTEM GENERATED FILE - DO NOT EDIT
// MSGXTR32 Version 8.1.1.2
//

// LANGUAGE: PTB


var _SWEmsgAry = new Array();
var _SWEbMsgInit = false;

function _SWEgetGlobalMsgAry()

{
    if (! _SWEbMsgInit)
    {
        _SWEbMsgInit = true;

        _SWEmsgAry["ISSCDA_COLUMN_NOT_FOUND"]  = "%1 coluna n\u00E3o localizada";
        _SWEmsgAry["ISSCDA_DEFAULT_CALC_PAGE_STR"]  = "Calculando...";
        _SWEmsgAry["ISSCDA_DEFAULT_DATA_LOAD_STR"]  = "Carregando dados...";
        _SWEmsgAry["ISSCDA_ERR_ENGINE_CHANGED"]  = "Alterado mecanismo CDA. Reinicie o navegador.";
        _SWEmsgAry["ISSCDA_FRAME_COULD_NOT_LOAD"]  = "Imposs\u00EDvel carregar %1.  Quadro n\u00E3o existente.";
        _SWEmsgAry["ISSCDA_MODULE_DNE"]  = "M\u00F3dulo %1 n\u00E3o existe";
        _SWEmsgAry["ISSCDA_MODULE_REG_NUM"]  = "N\u00EDvel do m\u00F3dulo em %1 deve ser  1 ou mais";
        _SWEmsgAry["ISSCDA_MODULE_WAITING"]  = "M\u00F3dulo %1 ainda espera pelo quadro %2 para terminar de carregar o arquivo anterior.  Pressione OK para continuar a esper ou CANCELAR para carregar sem esperar.  (Aviso: O cancelamento pode causar erros.)";
        _SWEmsgAry["ISSCDA_MODULE_WAITING_FOR_FRAME"]  = "M\u00F3dulo %1 ainda espera pelo quadro %2 para terminar de carregar o arquivo anterior.  Pressione OK para continuar a esper ou CANCELAR para carregar sem esperar.  (Aviso: O cancelamento pode causar erros.)";
        _SWEmsgAry["ISSCDA_NO_INTERNAL_PRODUCT_LIST"]  = "A defini\u00E7\u00E3o de p\u00E1gina n\u00E3o est\u00E1 vinculada a nenhum produto no banco de dados.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_LOAD_PAGESET"]  = "\u00C1rea visualiza\u00E7\u00E3o n\u00E3o dispon\u00EDvel p/ carregar config p\u00E1gina.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_SHOW_CONTENTS"]  = "\u00C1rea de visualiza\u00E7\u00E3o n\u00E3o dispon\u00EDvel para exibir lista de conte\u00FAdo.";
        _SWEmsgAry["ISSCDA_PRICE_CLOSE_STR"]  = "Fechar janela";
        _SWEmsgAry["ISSCDA_UI_WAITING_FOR_FRAME"]  = "O aplicativo ainda espera exibi\u00E7\u00E3o de p\u00E1ginas para terminar de carregar o arquivo anterior. Pressione OK para continuar a esperar ou CANCELAR para carregar sem esperar. (Aviso: O cancelamento pode causar erros.)";

   }

   return _SWEmsgAry;

 }

function _SWEgetMessage(key)
{
   ary = _SWEgetGlobalMsgAry();
   return ary[key];
}

