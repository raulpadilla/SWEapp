/*****************************************************************************
 *
 * Copyright (C) 2000, Siebel Systems, Inc., All rights reserved.
 *
 * FILE:       busobjshadow.js
 *  $Revision: 20 $
 *      $Date: 9/15/01 1:25p $
 *    $Author: Pramacha $ of last update
 *
 * CREATOR:    Michael Flexer
 *
 * DESCRIPTION
 *    BusObj Shadow object for JavaScript browser tier
 *
 *****************************************************************************/

/*
 * JSSBusObjShadow
 *
 * _busobj
 */

function JSSBusObjShadow_FirstBusComp ()
{
   return JSSBusObjShadow_GetBCShadow (this._busobj.EnumBusComps (true));
}

function JSSBusObjShadow_GetBCShadow (buscomp)
{
   if (buscomp == null)
      return (null);

   if (buscomp.shadow == null)
   {
      buscomp.shadow = new JSSBusCompShadow ();
      buscomp.shadow._busComp = buscomp;
   }

   return (buscomp.shadow);
}

function JSSBusObjShadow_GetBusComp (name)
{
   return JSSBusObjShadow_GetBCShadow (this._busobj.GetBusCompByName (name));
}

function JSSBusObjShadow_Name ()
{
   return this._busobj.GetName ();
}

function JSSBusObjShadow_NextBusComp ()
{
   return JSSBusObjShadow_GetBCShadow (this._busobj.EnumBusComps (false));
}

function JSSBusObjShadow ()
{
}

new JSSBusObjShadow ();
JSSBusObjShadow.prototype = new JSSObjectBase ();

JSSBusObjShadow.prototype.FirstBusComp            = JSSBusObjShadow_FirstBusComp;
JSSBusObjShadow.prototype.GetBusComp              = JSSBusObjShadow_GetBusComp;
JSSBusObjShadow.prototype.Name                    = JSSBusObjShadow_Name;
JSSBusObjShadow.prototype.NextBusComp             = JSSBusObjShadow_NextBusComp;
