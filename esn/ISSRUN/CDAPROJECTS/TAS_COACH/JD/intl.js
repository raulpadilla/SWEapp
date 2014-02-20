;

//
// SIEBEL SYSTEM GENERATED FILE - DO NOT EDIT
// MSGXTR32 Version 8.1.1.2
//

// LANGUAGE: ESN


var _SWEmsgAry = new Array();
var _SWEbMsgInit = false;

function _SWEgetGlobalMsgAry()

{
    if (! _SWEbMsgInit)
    {
        _SWEbMsgInit = true;

        _SWEmsgAry["ISSCDA_COLUMN_NOT_FOUND"]  = "No se ha encontrado la columna %1";
        _SWEmsgAry["ISSCDA_DEFAULT_CALC_PAGE_STR"]  = "Calculando...";
        _SWEmsgAry["ISSCDA_DEFAULT_DATA_LOAD_STR"]  = "Cargando datos...";
        _SWEmsgAry["ISSCDA_ERR_ENGINE_CHANGED"]  = "El motor de CDA ha cambiado. Reinicie el explorador.";
        _SWEmsgAry["ISSCDA_FRAME_COULD_NOT_LOAD"]  = "No se ha podido cargar %1. El marco no existe.";
        _SWEmsgAry["ISSCDA_MODULE_DNE"]  = "El m\u00F3dulo %1 no existe";
        _SWEmsgAry["ISSCDA_MODULE_REG_NUM"]  = "El nivel de m\u00F3dulo %1 debe ser 1 o superior";
        _SWEmsgAry["ISSCDA_MODULE_WAITING"]  = "El m\u00F3dulo %1 est\u00E1 esperando a que el marco %2 finalice la carga del arch. anterior. Pulse Aceptar para continuar o Cancelar para cargar sin esperar. (Advertencia: cancelar puede dar errores.)";
        _SWEmsgAry["ISSCDA_MODULE_WAITING_FOR_FRAME"]  = "El m\u00F3dulo %1 est\u00E1 esperando a que el marco %2 finalice la carga del arch. anterior. Pulse Aceptar para continuar o Cancelar para cargar sin esperar. (Advertencia: cancelar puede dar errores.)";
        _SWEmsgAry["ISSCDA_NO_INTERNAL_PRODUCT_LIST"]  = "El conjunto de p\u00E1ginas no est\u00E1 enlazado a ning\u00FAn producto de la base de datos.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_LOAD_PAGESET"]  = "No existe \u00E1rea de visualizaci\u00F3n disponible para cargar el conjunto de p\u00E1ginas.";
        _SWEmsgAry["ISSCDA_NO_UI_FOR_SHOW_CONTENTS"]  = "No existe \u00E1rea de visualizaci\u00F3n disponible para mostrar la lista de contenido.";
        _SWEmsgAry["ISSCDA_PRICE_CLOSE_STR"]  = "Cerrar ventana";
        _SWEmsgAry["ISSCDA_UI_WAITING_FOR_FRAME"]  = "La aplicaci\u00F3n est\u00E1 esperando a que finalice la carga de las p\u00E1ginas de visualizaci\u00F3n. Pulse Aceptar para continuar o Cancelar para cargar sin esperar. (Advertencia: cancelar puede dar errores.)";

   }

   return _SWEmsgAry;

 }

function _SWEgetMessage(key)
{
   ary = _SWEgetGlobalMsgAry();
   return ary[key];
}

