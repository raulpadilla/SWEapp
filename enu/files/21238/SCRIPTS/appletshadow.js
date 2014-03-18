/*****************************************************************************
 *
 * Copyright (C) 2000, Siebel Systems, Inc., All rights reserved.
 *
 * FILE:       appletshadow.js
 *  $Revision: 30 $
 *      $Date: 9/14/01 6:48p $
 *    $Author: Pramacha $ of last update
 *
 * CREATOR:    Michael Flexer
 *
 * DESCRIPTION
 *    Applet and control shadow objects for JavaScript browser
 *
 *****************************************************************************/

/*
 * JSSAppletShadow
 *
 * _applet
 * _controlShadowArray
 */

function JSSAppletShadow_ActiveMode ()
{
   return this._applet.GetActiveMode ();
}

function JSSAppletShadow_Buscomp ()
{
   
   var buscomp;

   buscomp = this._applet.GetBusComp ();

   if (buscomp == null)
      return (null);

   if (buscomp.shadow == null)
   {
      buscomp.shadow = new JSSBusCompShadow ();
      buscomp.shadow._busComp = buscomp;
   }

   return (buscomp.shadow);
}

function JSSAppletShadow_BusObject ()
{
   var busobj;

   busobj = this._applet.GetBusComp ().GetBusObj ();

   if (busobj == null)
      return (null);

   if (busobj.shadow == null)
   {
      busobj.shadow = new JSSBusObjShadow ();
      busobj.shadow._busobj = busobj;
   }

   return (busobj.shadow);
}

function JSSAppletShadow_FindActiveXControl (controlName)
{
   return this._applet.GetControlElement (controlName);
}

function JSSAppletShadow_FindControl (controlName)
{
   var  i;
   var  controlShadow;
   var  control;
   var bFound;
   if (this._applet == null)
      return (null);

   if (this._controlShadowArray == null)
      this._controlShadowArray = new Array ();

   bFound = false;
   // first, see if this control shadow already exists
   for (i = 0; i < this._controlShadowArray.length; i++)
   {
      controlShadow = this._controlShadowArray[i];

      if (controlShadow._name == controlName)
      {
         if (controlShadow._control != null)
            return (controlShadow);
         else
            break;
         bFound = true;
      }
   }

   if (!bFound)
      controlShadow = null;
   // didn't find it, so create the shadow control

   control = this._applet.GetControl (controlName);
   if (control == null)
   {
      return (null);
   }
	
   if (controlShadow == null)
   {
      controlShadow = new JSSControlShadow ();
      controlShadow._name          = controlName;
      controlShadow._appletShadow  = this;
   }

   controlShadow._control       = control;

   this._controlShadowArray[i] = controlShadow;

   return (controlShadow);
}

function JSSAppletShadow_Name ()
{
   return this._applet.GetName ();
}

function JSSAppletShadow_InvokeMethod (name, inputPropSet)
{
   return this._applet.InvokeMethod (name, inputPropSet);
}

function JSSAppletShadow_ReInit ()
{
   var control;
   var controlName;
   
   if (this._controlShadowArray == null)
      return;

   for (i = 0; i < this._controlShadowArray.length; i++)
   {
      controlShadow = this._controlShadowArray[i];
      controlName = controlShadow._name;
      control = this._applet.GetControl (controlName);
      // but first see if this control really exists
      if (control == null)
         control = this._applet.GetListCol (controlName);
      controlShadow._control = control;
   }
}

function JSSAppletShadow (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new JSSAppletShadow (null);
JSSAppletShadow.prototype = new JSSObjectBase ();

JSSAppletShadow.prototype.ActiveMode              = JSSAppletShadow_ActiveMode;
JSSAppletShadow.prototype.BusComp                 = JSSAppletShadow_Buscomp;
JSSAppletShadow.prototype.BusObject               = JSSAppletShadow_BusObject;
JSSAppletShadow.prototype.FindActiveXControl      = JSSAppletShadow_FindActiveXControl;
JSSAppletShadow.prototype.FindControl             = JSSAppletShadow_FindControl;
JSSAppletShadow.prototype.Name                    = JSSAppletShadow_Name;
JSSAppletShadow.prototype.ReInit                    = JSSAppletShadow_ReInit;
JSSAppletShadow.prototype.InvokeMethod            = JSSAppletShadow_InvokeMethod;


/*
 * JSSControlShadow
 *
 * _name
 * _appletShadow
 */

function JSSControlShadow_Applet ()
{
   return (this._appletShadow);
}

function JSSControlShadow_Buscomp ()
{
   if (this._appletShadow == null)
      return (null);

   return (this._appletShadow.BusComp ());
}

function JSSControlShadow_GetValue ()
{
   return (this._appletShadow._applet.GetControlValueByName (this._name));
}

function JSSControlShadow_Name ()
{
   return (this._name);
}

function JSSControlShadow_SetValue (value)
{
   this._appletShadow._applet.SetControlValueByName (this._name, value);
}

function JSSControlShadow_SetReadOnly(flag)
{
   this.SetProperty ("ReadOnly", flag);
}

function JSSControlShadow_SetEnabled (flag)
{
   this.SetProperty ("Enabled", flag);
}

function JSSControlShadow_SetVisible (flag)
{
   this.SetProperty ("Visible", flag);
}

function JSSControlShadow_GetLabelProperty (propName)
{
   return this._control.GetLabelProperty(propName);
}

function JSSControlShadow_GetProperty (propName)
{
   return this._control.GetProperty(propName);
}

function JSSControlShadow_SetLabelProperty (propName, value)
{
   this._control.SetLabelProperty(propName, value);
}

function JSSControlShadow_SetProperty (name, value)
{
   switch (name)
   {
      case "Enabled":
      case "Visible":
      case "ReadOnly":
      {
         if (value == false || value == "False" || value == "FALSE")
            value = "false";

         if (value == true || value == "True" || value == "TRUE")
            value = "true";
	  }
      default:
         this._control.SetProperty(name, value);
         break;
   }
}

function JSSControlShadow ()
{
}

new JSSControlShadow ();
JSSControlShadow.prototype = new JSSObjectBase ();

JSSControlShadow.prototype.Applet                 = JSSControlShadow_Applet;
JSSControlShadow.prototype.BusComp                = JSSControlShadow_Buscomp;
JSSControlShadow.prototype.GetValue               = JSSControlShadow_GetValue;
JSSControlShadow.prototype.Name                   = JSSControlShadow_Name;
JSSControlShadow.prototype.SetValue               = JSSControlShadow_SetValue;
JSSControlShadow.prototype.SetReadOnly            = JSSControlShadow_SetReadOnly;
JSSControlShadow.prototype.SetEnabled             = JSSControlShadow_SetEnabled;
JSSControlShadow.prototype.SetVisible             = JSSControlShadow_SetVisible;
JSSControlShadow.prototype.SetProperty            = JSSControlShadow_SetProperty;
JSSControlShadow.prototype.GetLabelProperty       = JSSControlShadow_GetLabelProperty;
JSSControlShadow.prototype.GetProperty            = JSSControlShadow_GetProperty;
JSSControlShadow.prototype.SetLabelProperty       = JSSControlShadow_SetLabelProperty;

