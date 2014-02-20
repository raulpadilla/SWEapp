/*****************************************************************************
 *
 * Copyright (C) 2000, Siebel Systems, Inc., All rights reserved.
 *
 * FILE:       buscompshadow.js
 *  $Revision: 23 $
 *      $Date: 8/10/01 2:01p $
 *    $Author: Wlai $ of last update
 *
 * CREATOR:    Michael Flexer
 *
 * DESCRIPTION
 *    Buscomp Shadow object for JavaScript browser tier
 *
 *****************************************************************************/

/*
 * JSSBusCompShadow
 *
 * _busComp
 */

function JSSBusCompShadow_BusObject ()
{
   var busobj;

   busobj = this._busComp.GetBusObj ();

   if (busobj == null)
      return (null);

   if (busobj.shadow == null)
   {
      busobj.shadow = new JSSBusObjShadow ();
      busobj.shadow._busobj = busobj;
   }

   return (busobj.shadow);
}

function JSSBusCompShadow_GetFieldValue (fieldName)
{
   return this._busComp.GetFieldValue (fieldName);
}

function JSSBusCompShadow_GetSearchExpr ()
{
   return this._busComp.GetSearchSpec ();
}

function JSSBusCompShadow_GetSearchSpec (fieldName)
{
   return this._busComp.GetFieldSearchSpec (fieldName);
}

function JSSBusCompShadow_InvokeMethod (name, inputPropSet)
{
   return this._busComp.InvokeMethod (name, inputPropSet);
}

function JSSBusCompShadow_Name ()
{
   return this._busComp.GetName ();
}

function JSSBusCompShadow_SetFieldValue (fieldName, value)
{
   return this._busComp.SetFieldValue (fieldName, value);
}

function JSSBusCompShadow_SetFormattedFieldValue (fieldName, value, format)
{
   return this._busComp.SetFormattedValue (fieldName, value, format);
}

function JSSBusCompShadow_GetFormattedFieldValue (fieldName, value, format)
{
   return this._busComp.GetFormattedValue (fieldName, format);
}

function JSSBusCompShadow_WriteRecord ()
{
   return this._busComp.WriteRecord ();
}

function JSSBusCompShadow ()
{
}

new JSSBusCompShadow ();
JSSBusCompShadow.prototype = new JSSObjectBase ();

JSSBusCompShadow.prototype.BusObject               = JSSBusCompShadow_BusObject;
JSSBusCompShadow.prototype.GetFieldValue           = JSSBusCompShadow_GetFieldValue;
JSSBusCompShadow.prototype.GetSearchExpr           = JSSBusCompShadow_GetSearchExpr;
JSSBusCompShadow.prototype.GetSearchSpec           = JSSBusCompShadow_GetSearchSpec;
JSSBusCompShadow.prototype.InvokeMethod            = JSSBusCompShadow_InvokeMethod;
JSSBusCompShadow.prototype.Name                    = JSSBusCompShadow_Name;
JSSBusCompShadow.prototype.SetFieldValue           = JSSBusCompShadow_SetFieldValue;
JSSBusCompShadow.prototype.SetFormattedFieldValue  = JSSBusCompShadow_SetFormattedFieldValue;
JSSBusCompShadow.prototype.GetFormattedFieldValue  = JSSBusCompShadow_GetFormattedFieldValue;
JSSBusCompShadow.prototype.WriteRecord             = JSSBusCompShadow_WriteRecord;

