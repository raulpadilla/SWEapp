/*****************************************************************************
 *
 * Copyright (C) 2000, Siebel Systems, Inc., All rights reserved.
 *
 * FILE:       applicationshadow.js
 *  $Revision: 25 $
 *      $Date: 8/10/01 2:00p $
 *    $Author: Wlai $ of last update
 *
 * CREATOR:    Michael Flexer
 *
 * DESCRIPTION
 *    Application shadow object for JavaScript browser tier
 *
 *****************************************************************************/

/*
 * JSSApplicationShadow
 *
 * _application
 */

function JSSApplicationShadow_FindApplet (name)
{
   var view;
   var applet;

   view = this._application.GetMainView ();

   if (view == null)
      return (null);

   applet = view.GetApplet (name);

   if (applet == null)
      return (null);

   if (applet.shadow == null)
   {
      applet.shadow = new this.swescriptFrame.JSSAppletShadow (null);
      applet.shadow._applet = applet;
   }

   return (applet.shadow);
}

function JSSApplicationShadow_ActiveViewName ()
{
   var view;

   view = this._application.GetMainView ();

   if (view == null)
      return (null);

   return view.GetName();
}

function JSSApplicationShadow_ActiveBusObject ()
{
   var busobj;
   var view;

   view = this._application.GetMainView ();

   if (view == null)
      return (null);

   busobj = view.GetBusObj();

   if (busobj == null)
      return (null);

   if (busobj.shadow == null)
   {
      busobj.shadow = new this.swescriptFrame.JSSBusObjShadow ();
      busobj.shadow._busobj = busobj;
   }

   return (busobj.shadow);
}

function JSSApplicationShadow_ActiveApplet ()
{
   var view;
   var applet;

   view = this._application.GetMainView ();

   if (view == null)
      return (null);

   applet = view.GetActiveApplet ();

   if (applet == null)
      return (null);

   if (applet.shadow == null)
   {
      applet.shadow = new this.swescriptFrame.JSSAppletShadow (null);
      applet.shadow._applet = applet;
   }

   return (applet.shadow);
}

function JSSApplicationShadow_ActiveBusComp ()
{
   var view;
   var applet;
   var buscomp;

   view = this._application.GetMainView ();

   if (view == null)
      return (null);

   applet = view.GetActiveApplet ();

   if (applet == null)
      return (null);

   buscomp = applet.GetBusComp();

   if (buscomp == null)
      return (null);

   if (buscomp.shadow == null)
   {
      buscomp.shadow = new this.swescriptFrame.JSSBusCompShadow ();
      buscomp.shadow._busComp = buscomp;
   }

   return (buscomp.shadow);
}

function JSSApplicationShadow_FindBusObject (name)
{
   var busobj;

   busobj = this._application.GetBusObj (name);

   if (busobj == null)
      return (null);

   if (busobj.shadow == null)
   {
      busobj.shadow = new this.swescriptFrame.JSSBusObjShadow ();
      busobj.shadow._busobj = busobj;
   }

   return (busobj.shadow);
}

function JSSApplicationShadow_GetProfileAttr (name)
{
   return this._application.GetProfileAttr (name);
}

function JSSApplicationShadow_GetService (name)
{
   var service;

   service = this._application.GetService (name);

   if (service == null)
      return (null);

   if (service.shadow == null)
   {
      service.shadow = new this.swescriptFrame.JSSServiceShadow ();
      service.shadow._service = service;
   }

   return (service.shadow);
}

function JSSApplicationShadow_InvokeMethod (name, inputPropSet)
{
   return this._application.InvokeMethod (name, inputPropSet);
}

function JSSApplicationShadow_IsReady ()
{
   //check if the application is running or not
   return (this._application != null) ? true : false;
}

function JSSApplicationShadow_Name ()
{
   return (this._application.GetName ());
}

function JSSApplicationShadow_NewPropertySet ()
{
   return (this._application.NewPropertySet ());
}

function JSSApplicationShadow_SetProfileAttr (name, value)
{
   return this._application.SetProfileAttr (name, value);
}

function JSSApplicationShadow_SWEAlert (text)
{
   if (IsOpenUI())
   {
     window.SWEAlert (text);
   }
   else if (typeof (top._swescript) != "undefined")
   {
      top._swescript.SWEAlert (text);
   }
}

function JSSApplicationShadow_ShowModalDialog (url, argin, options)
{
   return this._application.ShowModalDialog (url, argin, options);
}
/*
* category 0:TRC_ERROR, 1: TRC_WARNING,2:TRC_INFO, 3:TRC_DETAIL
*/
function JSSApplicationShadow_SeblTrace(category, trcMessage)
{
   this._application.SeblTrace(category,trcMessage);
}

function JSSApplicationShadow (application)
{
   if (application != null)
   {
      this._application = application;
      application.shadow = this;
      this._application.SeblTrace(2,"JSSApplicationShadow Initialized");
   }
   if (IsOpenUI())
   {
      this.swescriptFrame = window;
   }
   else
   {
      this.swescriptFrame = top._swescript;
   }
}

new JSSApplicationShadow (null);
JSSApplicationShadow.prototype = new JSSObjectBase ();

JSSApplicationShadow.prototype.FindApplet              = JSSApplicationShadow_FindApplet;
JSSApplicationShadow.prototype.ActiveApplet            = JSSApplicationShadow_ActiveApplet;
JSSApplicationShadow.prototype.ActiveViewName          = JSSApplicationShadow_ActiveViewName;
JSSApplicationShadow.prototype.ActiveBusObject         = JSSApplicationShadow_ActiveBusObject;
JSSApplicationShadow.prototype.ActiveBusComp           = JSSApplicationShadow_ActiveBusComp;
JSSApplicationShadow.prototype.FindBusObject           = JSSApplicationShadow_FindBusObject;
JSSApplicationShadow.prototype.GetProfileAttr          = JSSApplicationShadow_GetProfileAttr;
JSSApplicationShadow.prototype.GetService              = JSSApplicationShadow_GetService;
JSSApplicationShadow.prototype.InvokeMethod            = JSSApplicationShadow_InvokeMethod;
JSSApplicationShadow.prototype.IsReady                 = JSSApplicationShadow_IsReady;
JSSApplicationShadow.prototype.Name                    = JSSApplicationShadow_Name;
JSSApplicationShadow.prototype.NewPropertySet          = JSSApplicationShadow_NewPropertySet;
JSSApplicationShadow.prototype.SetProfileAttr          = JSSApplicationShadow_SetProfileAttr;
JSSApplicationShadow.prototype.SWEAlert                = JSSApplicationShadow_SWEAlert;
JSSApplicationShadow.prototype.ShowModalDialog         = JSSApplicationShadow_ShowModalDialog;
JSSApplicationShadow.prototype.SeblTrace              = JSSApplicationShadow_SeblTrace;

function theApplication ()
{
   if ( App() == null )
       return null;
      
   if (IsOpenUI())
       return App().GetShadow();
   else
       return App().shadow;
   
}
