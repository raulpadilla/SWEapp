/*****************************************************************************
 *
 * Copyright (C) 2000, Siebel Systems, Inc., All rights reserved.
 *
 * FILE:       serviceshadow.js
 *  $Revision: 21 $
 *      $Date: 10/09/01 6:13p $
 *    $Author: Clu $ of last update
 *
 * CREATOR:    Michael Flexer
 *
 * DESCRIPTION
 *    Service shadow object for JavaScript browser tier
 *
 *****************************************************************************/

/*
 * JSSServiceShadow
 *
 * _service
 */

function JSSServiceShadow_InvokeMethod (name, inputPropSet)
{
   var retVal;
   var childSet;
   
   retVal = this._service.InvokeMethod (name, inputPropSet);   

   var childCount = retVal.GetChildCount();
   childSet = null;
   for (var i=0; i<childCount; i++)
   {
      if (retVal.GetChild(i).GetType() == "ResultSet")
      {
         childSet = retVal.GetChild(i);
         break;
      }
   }

   return ((childSet != null) ? childSet : retVal);
}

function JSSServiceShadow_Name ()
{
   return this._service.GetName ();
}

function JSSServiceShadow ()
{
   this.SeblCOMObjHnd   = 0;
}

function JSSServiceShadow_SetProperty (name, value)
{
   return this._service.SetProperty (name, value);
}

function JSSServiceShadow_PropertyExists (name)
{
   return this._service.PropertyExists (name);
}

function JSSServiceShadow_RemoveProperty (name)
{
   return this._service.RemoveProperty (name);
}

function JSSServiceShadow_GetProperty (name)
{
   return this._service.GetProperty (name);
}

function JSSServiceShadow_GetFirstProperty ()
{
   return this._service.GetFirstProperty ();
}

function JSSServiceShadow_GetNextProperty ()
{
   return this._service.GetNextProperty ();
}

new JSSServiceShadow ();
JSSServiceShadow.prototype = new JSSObjectBase ();

JSSServiceShadow.prototype.InvokeMethod            = JSSServiceShadow_InvokeMethod;
JSSServiceShadow.prototype.Name                    = JSSServiceShadow_Name;
JSSServiceShadow.prototype.SetProperty             = JSSServiceShadow_SetProperty;
JSSServiceShadow.prototype.PropertyExists          = JSSServiceShadow_PropertyExists;
JSSServiceShadow.prototype.RemoveProperty          = JSSServiceShadow_RemoveProperty;
JSSServiceShadow.prototype.GetProperty             = JSSServiceShadow_GetProperty;
JSSServiceShadow.prototype.GetFirstProperty        = JSSServiceShadow_GetFirstProperty;
JSSServiceShadow.prototype.GetNextProperty         = JSSServiceShadow_GetNextProperty;
