/*****************************************************************************
 *
 * Copyright (C) 2002, Siebel Systems, Inc., All rights reserved.
 *
 * FILE:       toolbar.js
 *
 * CREATOR:    Jing Chen
 *
 * DESCRIPTION
 *
 *****************************************************************************/

function JSSToolbar (isRTL)
{
   this.name         = "";
   this.index        = -1;
   this.htmlElem     = null;
   this.itemArray    = new Array();
   this.bRecording   = false;
   this.bRecFlgSet   = false;
   this.isRTL        = (typeof (isRTL) == "undefined" ? 0 : isRTL);
}

///////////////////////////////////////////////////////////////////////////////
//
//  METHOD
//    JSSToolbar_SetName
//
//  METHOD TYPE
//    API Type (External/Module/Private): Module
//    Overridable? (Yes/No)             : No
//    Overrides Virtual? (Yes/No)       : No
//
//  PARAMETERS
//    nameIn     -   [in] name of the toolbar. 
//
//  RETURN VALUE
//    None
//
//  DESCRIPTION
//    sets the name of the toolbar.
//
///////////////////////////////////////////////////////////////////////////////
function JSSToolbar_SetName (nameIn)
{
   this.name = nameIn;
}

///////////////////////////////////////////////////////////////////////////////
//
//  METHOD
//    JSSToolbar_SetIndex
//
//  METHOD TYPE
//    API Type (External/Module/Private): Module
//    Overridable? (Yes/No)             : No
//    Overrides Virtual? (Yes/No)       : No
//
//  PARAMETERS
//    indexIn     -   [in] index of the toolbar. 
//
//  RETURN VALUE
//    None
//
//  DESCRIPTION
//    sets the index of the toolbar.
//
///////////////////////////////////////////////////////////////////////////////

function JSSToolbar_SetIndex (indexIn)
{
   this.index = indexIn;
}

///////////////////////////////////////////////////////////////////////////////
//
//  METHOD
//    JSSToolbar_BindAXObj
//
//  METHOD TYPE
//    API Type (External/Module/Private): Module
//    Overridable? (Yes/No)             : No
//    Overrides Virtual? (Yes/No)       : No
//
//  PARAMETERS
//    axObj      -   [in] ActiveX wrapper class.
//    nameIn     -   [in] name of the toolbar. 
//    htmlID     -   [in] html id of the toolbar object. 
//
//  RETURN VALUE
//    None
//
//  DESCRIPTION
//    Binds the javascript class to the ActiveX wrapper class.
//
///////////////////////////////////////////////////////////////////////////////

function JSSToolbar_BindAXObj (axObj, nameIn, htmlID)
{
   this.axObj = axObj;
   axObj.jsObj = this;
   this.name  = nameIn;
   axObj.SetName(nameIn);
   axObj.SetApplication (App());
   axObj.SetHtmlID (htmlID);
}

///////////////////////////////////////////////////////////////////////////////
//
//  METHOD
//    JSSToolbar_GetToolbarItemNames
//
//  METHOD TYPE
//    API Type (External/Module/Private): Module
//    Overridable? (Yes/No)             : No
//    Overrides Virtual? (Yes/No)       : No
//
//  PARAMETERS
//    propertyName  -   [in] name of the requested property. Property names
//                          are: "ToolbarItemDisplayNames", 
//                          and "ToolbarItemStates".
//
//  RETURN VALUE
//    array containing toolbar item captions.
//
//  DESCRIPTION
//    This routine iterates through toolbar items an returns the array
//    toolbar item captions or item states.
//
///////////////////////////////////////////////////////////////////////////////

function JSSToolbar_GetToolbarItemNames (propertyName)
{   
   // create the array to hold the property values.
   var propertyValues = new Array();

   // iterate through toolbar items and retrieve their captions.
   for (var index = 0; index < this.itemArray.length; index++)
   {
      if (propertyName == "ToolbarItemDisplayNames")
         propertyValues[index] = this.itemArray[index].name;  
      else if (propertyName == "ToolbarItemHtmlIDs")
      {
         switch (this.itemArray[index].type)
         {
            case "UtilityLink":
            case "Button":
            case "Link":
            case "Label":
                propertyValues[index] = this.itemArray[index].inEId; 
                break;
            default:
                propertyValues[index] = this.itemArray[index].outEId; 
                break;
         }
      }
      else    
      {
         if (typeof(this.itemArray[index].enabled) == 'undefined')
            propertyValues[index] = false; 
         else
            propertyValues[index] = this.itemArray[index].enabled;  
      }
   }
   return propertyValues;
}

///////////////////////////////////////////////////////////////////////////////
//
//  METHOD
//    JSSToolbar_GoToItem
//
//  METHOD TYPE
//    API Type (External/Module/Private): Module
//    Overridable? (Yes/No)             : No
//    Overrides Virtual? (Yes/No)       : No
//
//  PARAMETERS
//    name of the toolbar item.
//
//  RETURN VALUE
//    None
//
//  DESCRIPTION
//    Calls the click event on the given toolbar item.
//
///////////////////////////////////////////////////////////////////////////////
function JSSToolbar_GoToItem(name)
{
   var i;
   for (i = 0; i < this.itemArray.length; i ++)
   {
      if (typeof (this.itemArray[i].menu) != "undefined")
      {
         JSSToolbar_LoadMenu (this, i, false);
               
         var psMenuItem = JSSToolbar_FindMenuItem (top._swe._sweapp._JMenuObj.psMenu, name);
         if (psMenuItem)
         {
            // Activate toolbar item.
            var fakeEt = new Object();
            fakeEt.type = "click";
            this.DoHandleEvent(this, i, fakeEt, psMenuItem);
            break;
         }
      }
      else
      {
         if (this.itemArray[i].name == name)
         {
            // Activate toolbar item.
            var fakeEt = new Object();
            fakeEt.type = "click";
            this.DoHandleEvent(this, i, fakeEt);
            break;
         }
      }
   }
}

function JSSToolbar_AddLinkItem (name,
                             cmdId,
                             caption,
                             menu)
{
   var item    = new JSSToolbarItem();
   item.parent = this;

   item.name = name;
   item.type = "UtilityLink";

   if (cmdId != null && cmdId != "")
      item.cmdId = cmdId;
   if (caption != null && caption != "")
      item.caption = caption;
   if (menu != null && menu != "")
   {
      item.menu = menu;
      item.enabled = true;
   }

   item.index = this.itemArray.length;
   this.itemArray[this.itemArray.length] = item;
}

function JSSToolbar_AddLinkItem (name,
                             cmdId,
                             caption,
                             menu)
{
   var item    = new JSSToolbarItem();
   item.parent = this;

   item.name = name;
   item.type = "UtilityLink";

   if (cmdId != null && cmdId != "")
      item.cmdId = cmdId;
   if (caption != null && caption != "")
      item.caption = caption;
   if (menu != null && menu != "")
   {
      item.menu = menu;
      item.enabled = true;
   }

   item.index = this.itemArray.length;
   this.itemArray[this.itemArray.length] = item;
}

function JSSToolbar_AddItem (name,
                             type,
                             cmdId,
                             caption,
                             bitmap,
                             offBitmap)
{
   var item    = new JSSToolbarItem();
   item.parent = this;

   item.name = name;
   item.type = type;

   if (cmdId != null && cmdId != "")
      item.cmdId = cmdId;
   if (caption != null && caption != "")
      item.caption = caption;
   if (bitmap != null && bitmap != "")
      item.bitmap = bitmap;
   if (offBitmap != null && offBitmap != "")
      item.offBitmap = offBitmap;

   item.index = this.itemArray.length;
   this.itemArray[this.itemArray.length] = item;
}

function JSSToolbar_Draw (e, isLink)
{
   var html;
   var i;
   var item;
   var evtScript;

   this.Update (/*bInit*/ true);
   this.PrepareToDraw(e, isLink);

   // draw UI:
   html = "<table style='height:27px;cursor:hand'><tr>";
   for (i = 0; i < this.itemArray.length; i ++)
   {
      item = this.itemArray[i];

      // outer <TD>:
      if (isLink)
         item.outEId = this.name + "::" + item.name;
      else
         item.outEId = e.id+"_out"+i;
   
      if (!isLink)
      {
         if (item.checked==true)
            evtScript = " class=\"TBpush" + this.index + "\"";
         else
            evtScript = " class=\"TBflat" + this.index + "\"";
      }
      else
      {
         evtScript = " class=\"TBLink" + this.index + "\"";
         if (item.enabled == false)
            evtScript += "DISABLED";
      }

      switch (this.GetItemStyle(i))
      {
         case "UtilityLink":
            evtScript += " ONMOUSEOVER=\"" + _TB_evt(this.index, i) + "\"" +
                         " ONMOUSEOUT=\"" + _TB_evt(this.index, i) + "\"" +
                         " ONCLICK=\"" + _TB_evt(this.index, i) + "\"";
            break;
         case "rollover":  // use rollover border
            evtScript += " ONMOUSEDOWN=\"" + _TB_evt(this.index, i) + "\"" +
                         " ONMOUSEUP=\"" + _TB_evt(this.index, i) + "\"" +
                         " ONMOUSEOVER=\"" + _TB_evt(this.index, i) + "\"" +
                         " ONMOUSEOUT=\"" + _TB_evt(this.index, i) + "\"" +
                         " ONCLICK=\"" + _TB_evt(this.index, i) + "\"";
            break;

         default:
            break;
      }
      html += "<td nowrap id=\"" + item.outEId + "\"" + evtScript + ">";

      // inner content:
      item.inEId = e.id+"_in"+i;
      html += this.DoGenerateItemHtml(this, i);
   
      html +=  "</td>";
   }
   html += "</tr></table>";

   e.innerHTML = html;
   this.htmlElem = e;
}

function JSSToolbar_GetHtmlElem (elemId)
{
   return this.htmlElem.document.getElementById(elemId);
}

function JSSToolbar_GetItemStyle (idx)
{
   return this.DoGetItemStyle (this, idx);
}

function JSSToolbar_HandleEvent (idx, evt)
{
   if (this.itemArray[idx].enabled != true)
      return false;

   var item    = this.itemArray[idx];
   var oElem   = this.GetHtmlElem(item.outEId);
   if (this.GetItemStyle(idx) == "rollover") 
   {
      switch (evt.type)
      {
         case "mousedown":
         {
            oElem.className = "TBpush";
            break;
         }
         case "click":
         {
            // Automation support.
            if (!this.bRecFlgSet)
            {
                this.bRecording = this.axObj.IsRecording(); 
                this.bRecFlgSet = true;
            }
            if (this.bRecording)
            {  
               var pset = App().NewPropertySet();;
               pset.SetProperty("ToolbarItemDisplayName", this.itemArray[idx].name);
               this.axObj.RecordEvent("GoToItem", pset);
            }
            break;
         }
         case "mouseover":
         case "mouseup":
            oElem.className = "TBpop";
            break;
         case "mouseout":
            if (item.checked==true)
               oElem.className = "TBpush";
            else
               oElem.className = "TBflat"+this.index;

            break;
      }
   }
   else if (this.GetItemStyle(idx) == "UtilityLink") 
   {
      switch (evt.type)
      {
         case "click":
         {
            // Automation support.
            if (!this.bRecFlgSet)
            {
               this.bRecording = this.axObj.IsRecording(); 
               this.bRecFlgSet = true;
            }
            if (this.bRecording && typeof (this.itemArray[idx].menu) == "undefined")
            {  
               var pset = App().NewPropertySet();;
               pset.SetProperty("ToolbarItemDisplayName", this.itemArray[idx].name);
               this.axObj.RecordEvent("GoToItem", pset);
            }
            oElem.style.textDecorationUnderline = true;
            break;
         }
         case "mouseover":
            oElem.style.textDecorationUnderline = true;
            break;
         case "mouseout":
            oElem.style.textDecorationUnderline = false;
            break;
      }
   }

   return this.DoHandleEvent(this, idx, evt);
}

function JSSToolbar_IsUIReady ()
{
   return this.htmlElem != null && typeof(this.htmlElem.document) != "unknown" && this.htmlElem.document.readyState != "uninitialized";
}

function JSSToolbar_PrepareToDraw (e, isLink)
{
   var bgCol;
   var p;

   if (e.document.styleSheets.length == 0 || e.document.styleSheets[0].title != "_TB_css")
   {
      var ss = e.document.createStyleSheet("", 0);
      ss.title = "_TB_css";
      ss.addRule(".TBdivider",   "border:1px solid #ffffff;border-color:#ffffff #666666 #666666 #ffffff;width:3px;height:19px");
      if (!isLink)
      {
         ss.addRule(".TBpush",      "border:1px solid;color:#000000;border-color:#666666 #ffffff #ffffff #666666;background:transparent");
         ss.addRule(".TBpop",       "border:1px solid;background:#99AED9;color:#ffffff;border-color:#ffffff #000000 #000000 #ffffff");
      }
   }

   for (p = e; p != null; p = p.parentElement)
   {
      bgCol = p.currentStyle.backgroundColor;
      if (bgCol != "transparent")
         break;
   }
   if (!isLink)
      e.document.styleSheets[0].addRule(".TBflat"+this.index,      "color:#000000;border:1px solid " + bgCol);
   else
      e.document.styleSheets[0].addRule(".TBLink"+this.index,      "color:#004784;padding:3px");
}

function JSSToolbar_Update (bInit)
{
   if (bInit != true && !this.IsUIReady())
      return;

   return this.DoUpdate (this);
}

function JSSToolbar_DoGenerateItemHtml(toolbar, idx)
{
   var html;
   var item = toolbar.itemArray[idx];
   switch (item.type)
   {
      case "UtilityLink":
      case "Button":
      case "Link":
         // bitmap or caption:
         if (item.bitmap != null)
            html = "<img id=\"" + item.inEId + "\"" +
                   " src=\"" + ((item.enabled != true && item.offBitmap != null)? item.offBitmap : item.bitmap) +
                   "\" align=\"absmiddle\" ALT=\"" + item.caption + "\">";
         else
            html = "<span id=\"" + item.inEId + "\">" + item.caption + "</span>";
         break;

      case "Label":
         html = "<span id=\"" + item.inEId + "\">" + item.caption + "</span>";
         break;

      case "Separator":
         html = "&nbsp;<span class=\"TBdivider divider\"></span>&nbsp;";
         break;

      default :
         html = "&nbsp;";
         break;
   }

   return html;
}

function JSSToolbar_DoGetItemStyle (toolbar, idx)
{
   var item = toolbar.itemArray[idx];
   switch (item.type)
   {
      case "UtilityLink":
         return "UtilityLink";   // rollover underline, mouseover effect
         
      case "Button":
      case "Link":
      default:
         return "rollover";   // rollover border, mouseover effect

      case "Separator":
      case "Edit":
      case "Combo Box":
      case "Label":
         return "";
   }
}

function JSSToolbar_DoHandleEvent (toolbar, idx, evt, psItem)
{
   var rVal    = false;
   var item    = toolbar.itemArray[idx];

   switch (evt.type)
   { 
      case "click":
         if (typeof (psItem) != "undefined")
         {
            var command = psItem.GetProperty("Command");
            var enabled = psItem.GetProperty("Enabled");
            if (command != "" && enabled)
            {
               rVal = App().GetCommandMgr().InvokeUtilityLinkCommand (App(), command);
            }
         }
         else if (item.type == "UtilityLink" && (item.menu != null && item.menu != ""))
         {
            JSSToolbar_ShowMenu (toolbar, idx, this.isRTL);
            rVal = true;
         }
         else if (item.cmdId != null && item.cmdId != "")
         {
            rVal = App().GetCommandMgr().InvokeCommand (item.cmdId);
         }
         break;
      
   }
   return rVal;
}

function JSSToolbar_DoUpdate (toolbar)
{
   var enabledNew;
   var item;

   for (var i = 0; i<toolbar.itemArray.length; i++)
   {
	  if ( toolbar.name == "XMLP Reports")
       {
			if (toolbar.IsUIReady()) 
				toolbar.DoUpdateItemUI(toolbar, i);
	   }
      if (toolbar.DoUpdateItemState(toolbar, i) == false)
         continue;

      if (toolbar.IsUIReady())
         toolbar.DoUpdateItemUI(toolbar, i);
   }
}

function JSSToolbar_DoUpdateItemState (toolbar, idx)
{
   var bUpdated   = false;
   var enabledNew;
   var sProp;
   var item       = toolbar.itemArray[idx];

   if (item.cmdId == null)
      return bUpdated;

   var s_cmdmgr = App().GetCommandMgr();
   // canInvoke state:
   enabledNew = s_cmdmgr.CanInvokeCommand(item.cmdId);
   if (enabledNew != item.enabled)
   {
      bUpdated = true;
      item.enabled = enabledNew;
   }

   // extended state:
   sProp  = s_cmdmgr.GetCommandState(item.cmdId);
   if (sProp != null && typeof (sProp) == "object")
   {
      var temp = (sProp.GetProperty("Checked") == "true") ? true : false;
      if (temp != item.checked)
      {
         item.checked = temp;
         bUpdated = true;
      }
   }

   return bUpdated;
}

function JSSToolbar_DoUpdateItemUI (toolbar, idx)
{
   var item = toolbar.itemArray[idx];
   var completedRptCount = 0;
   
   switch (item.type)
   {
      case "UtilityLink":
         toolbar.GetHtmlElem(item.outEId).disabled = !item.enabled;
         break;
      case "Button":
      case "Link":
      
		          // link state:
         if (item.checked == true)
            toolbar.GetHtmlElem(item.outEId).className = "TBpush";
         else if (item.checked == false)
            toolbar.GetHtmlElem(item.outEId).className = "TBflat"+this.index;

         // disable/enable state:
         if (item.offBitmap != null)
            toolbar.GetHtmlElem(item.inEId).src = (item.enabled == true) ? item.bitmap : item.offBitmap;

         break;
     case "Label":
         //for UI notification toolbar update info
		 if(item.name == "Reports")
		 {
			var inputProps = App().NewPropertySet ();         
			var outputProps = App().NewPropertySet ();  
			var notificationLabel = item.caption;
			if ( notificationLabel == "")
			{
				notificationLabel = "Report(s)";	
			}
			var service = App().GetService ("Report Menu Handler (SWE)");
			//var service = top._swe._sweapp.S_App.GetService ("XMLP Report Menu Service");

			outputProps = service.InvokeMethod ("GetUINotificationReportCount", inputProps );
			if ( outputProps == null)
			    break;
			var pResultSet = outputProps.GetChildByType("ResultSet");
			if ( pResultSet == null)
			    break;
			var nChildCount = pResultSet.GetChildCount ();
			if( nChildCount != 0 )
			{
				var pUINotifyChildPropSet = pResultSet.GetChildByType("UINotification");
				
				if (pUINotifyChildPropSet != null)
				{
					completedRptCount = pUINotifyChildPropSet.GetProperty("UINotificationRptCount");
				}
			}
		    if ( completedRptCount > 0 )
		    {
				toolbar.GetHtmlElem(item.inEId).innerText = completedRptCount +" "+notificationLabel; 
		    }
		    else
		    {	
				toolbar.GetHtmlElem(item.inEId).innerText = "";
		    }
			
			toolbar.GetHtmlElem(item.inEId).style.cursor = "auto";
			toolbar.GetHtmlElem(item.outEId).onmousedown = "null";
			toolbar.GetHtmlElem(item.outEId).onmouseout = "null";
			toolbar.GetHtmlElem(item.outEId).onmouseup = "null";
			toolbar.GetHtmlElem(item.outEId).onclick = "null";	
		    if ( completedRptCount == 0 )
		    {
				toolbar.GetHtmlElem(item.inEId).style.display = "none";		
		        toolbar.GetHtmlElem(item.outEId).onmouseover = _TB_evt(this.index, idx);	        
		    }
		    else
		    {					
				toolbar.GetHtmlElem(item.inEId).style.display = "";				
				toolbar.GetHtmlElem(item.outEId).onmouseover = _TB_evt(this.index, idx);
				toolbar.GetHtmlElem(item.outEId).onmousemove = _TB_evt(this.index, idx);
			}
			
		 }
		 break;         

      default :
         break;
   }
}

function JSSToolbar_ShowMenu (toolbar, idx, isRTL)
{
   // If the menu object is not yet created, create it.
   if (top._swe._sweapp._JMenuObj == null)
      top._swe._sweapp._JMenuObj = new top._swe._sweapp.JMenu ();
      
   var item = toolbar.itemArray[idx];
   var menu = toolbar.name + "::" + item.menu;
   if (item.cmdId != null && item.cmdId != "")
   {
      menu += "::" + item.cmdId;
   }
   
   var srcElement = toolbar.GetHtmlElem(item.outEId)
   var x = (isRTL) ? srcElement.offsetWidth : 0;
   var y = srcElement.offsetHeight;
   
   _JMenu_Initialize (srcElement, menu, "UtilityLink", toolbar.axObj, toolbar.isRTL, false, x, y);
}

function JSSToolbar_LoadMenu (toolbar, idx, isRTL)
{
   // If the menu object is not yet created, create it.
   if (top._swe._sweapp._JMenuObj == null)
      top._swe._sweapp._JMenuObj = new top._swe._sweapp.JMenu ();
      
   var item = toolbar.itemArray[idx];
   var menu = toolbar.name + "::" + item.menu;
   if (item.cmdId != null && item.cmdId != "")
   {
      menu += "::" + item.cmdId;
   }
   
   var srcElement = toolbar.GetHtmlElem(item.outEId)
   var x = (isRTL) ? srcElement.offsetWidth : 0;
   var y = srcElement.offsetHeight;
   
   _JMenu_Initialize (srcElement, menu, "UtilityLink", toolbar.axObj, toolbar.isRTL, false, 0, 0, false, false, true);
}

function JSSToolbar_FindMenuItem (psMenu, menuitemCmd)
{
   var i = 0;

   for (i = 0; i < psMenu.GetChildCount (); i++)
   {
      psMenuItem = psMenu.GetChild (i);

      caption = psMenuItem.GetProperty ("Caption");
      if (caption == "")
         continue;
            
      var type = psMenuItem.GetProperty ("Type");
      if (type == "Menu")
      {
          psMenuItem = _JMenu_FindMenuItem (psMenuItem, menuitemName);
          if (psMenuItem)
             return (psMenuItem);
      }
      else
      {
         sCmdStr = psMenuItem.GetProperty ("Command");
         if (sCmdStr == menuitemCmd)
            return (psMenuItem);
      }
   }
   return null;
}

new JSSToolbar ();
JSSToolbar.prototype  = new JSSObjectBase ();

// Methods are not to be overridden
JSSToolbar.prototype.AddItem                    = JSSToolbar_AddItem;
JSSToolbar.prototype.AddLinkItem                = JSSToolbar_AddLinkItem;
JSSToolbar.prototype.Draw                       = JSSToolbar_Draw;
JSSToolbar.prototype.GetHtmlElem                = JSSToolbar_GetHtmlElem;
JSSToolbar.prototype.GetItemStyle               = JSSToolbar_GetItemStyle;
JSSToolbar.prototype.HandleEvent                = JSSToolbar_HandleEvent;
JSSToolbar.prototype.IsUIReady                  = JSSToolbar_IsUIReady;
JSSToolbar.prototype.PrepareToDraw              = JSSToolbar_PrepareToDraw;
JSSToolbar.prototype.Update                     = JSSToolbar_Update;
JSSToolbar.prototype.ShowMenu                   = JSSToolbar_ShowMenu;
JSSToolbar.prototype.LoadMenu                   = JSSToolbar_LoadMenu;
JSSToolbar.prototype.FindMenuItem               = JSSToolbar_FindMenuItem;

// Methods can be overriden by derived classes
JSSToolbar.prototype.DoGenerateItemHtml         = JSSToolbar_DoGenerateItemHtml;
JSSToolbar.prototype.DoGetItemStyle             = JSSToolbar_DoGetItemStyle;
JSSToolbar.prototype.DoHandleEvent              = JSSToolbar_DoHandleEvent;
JSSToolbar.prototype.DoUpdate                   = JSSToolbar_DoUpdate;
JSSToolbar.prototype.DoUpdateItemState          = JSSToolbar_DoUpdateItemState;
JSSToolbar.prototype.DoUpdateItemUI             = JSSToolbar_DoUpdateItemUI;
JSSToolbar.prototype.GetToolbarItemNames        = JSSToolbar_GetToolbarItemNames;
JSSToolbar.prototype.SetName                    = JSSToolbar_SetName;
JSSToolbar.prototype.SetIndex                   = JSSToolbar_SetIndex;
JSSToolbar.prototype.BindAXObj                  = JSSToolbar_BindAXObj;
JSSToolbar.prototype.GoToItem                   = JSSToolbar_GoToItem;

/*------------------------------*/
function JSSToolbarItem ()
{
  this.index   = -1;
  this.name    = "";
  this.type    = "";
}

/*----------- utils: -----------*/
function _TB_evt (idx1, idx2)
{
   return "Top()._swescript.SWEHandleTBEvent(" +idx1+ "," +idx2+ ",event)";
}

/*
 * JSSJavaToolbar
 * proxy class for Java Toolbar Applet
 *
 * name
 * itemEnum
 * items
 * application
 */
function JSSJavaToolbar ()
{
	this.ToolbarApplet = null;
}


function JSSJavaToolbar_GetToolbarApplet()
{
   var len = Top()._sweclient.frames.length;
   for(var i = 0; i < len; i++)
   {
      this.ToolbarApplet = Top()._sweclient.frames[i].document.getElementById(this.name);
      if(this.ToolbarApplet != null)
         return;
   }
}

function JSSJavaToolbar_GoToItem (item)
{
    if(this.ToolbarApplet == null)
    {
        this.GetToolbarApplet();
        if(this.ToolbarApplet == null)
            return "Toolbar not found!";
    }

	var propSet = App().NewPropertySet();
    var encodedProp = propSet.EncodeAsString(); 
    return this.ToolbarApplet.handleAutomationRequest(item, encodedProp);
}

function JSSJavaToolbar_IsUIReady ()
{
   return true;
}

JSSJavaToolbar.prototype = new JSSToolbar ();

//Exposed Methods
JSSJavaToolbar.prototype.GoToItem                 =  JSSJavaToolbar_GoToItem;
JSSJavaToolbar.prototype.IsUIReady                =  JSSJavaToolbar_IsUIReady;
JSSJavaToolbar.prototype.GetToolbarApplet         =  JSSJavaToolbar_GetToolbarApplet;

/*
 * JSSJavaToolbar
 * proxy class for Java Toolbar Applet
 *
 * name
 * itemEnum
 * items
 * application
 */
function JSSJavaToolbar ()
{
   this.GetToolbarApplet();
   var itemName;
   if(this.ToolbarApplet != null)
   {
      for(itemName = this.ToolbarApplet.enumItems(true); itemName != null && itemName != ""; itemName = this.ToolbarApplet.enumItems(false))
      {
		 this.AddItem(itemName, "button");
      }
   }
}


function JSSJavaToolbar_GetToolbarApplet()
{
   var len = Top()._sweclient.frames.length;
   for(var i = 0; i < len; i++)
   {
      this.ToolbarApplet = Top()._sweclient.frames[i].document.getElementById("Communication");
      if(this.ToolbarApplet != null)
         return;
   }

//	this.ToolbarApplet = this.getElementById(this.name);
}

function JSSJavaToolbar_GoToItem (item)
{
    if(this.ToolbarApplet == null)
    {
        this.GetToolbarApplet();
        if(this.ToolbarApplet == null)
            return "Toolbar not found!";
    }

	var propSet = App().NewPropertySet();
    var encodedProp = propSet.EncodeAsString(); 
    return this.ToolbarApplet.handleAutomationRequest(item, encodedProp);
}

function JSSJavaToolbar_IsUIReady ()
{
   return true;
}

function JSSJavaToolbar_InvokeMethod (method, inputArgs)
{
   if(method == "Set Number")
   {
      var phNum = inputArgs.GetProperty("PhNumber");
      if(phNum != null)
      {
         var encodedProp = inputArgs.EncodeAsString(); 
         return this.ToolbarApplet.handleAutomationRequest(method, encodedProp);
      }
   }
   else if(method == "Select Item")
   {
      var item = inputArgs.GetProperty("item");
      var pos = inputArgs.GetProperty("Pos");
      if(item != null && pos != null)
      {
         var encodedProp = inputArgs.EncodeAsString(); 
         return this.ToolbarApplet.handleAutomationRequest(method, encodedProp);      
      }
   }
}

JSSJavaToolbar.prototype = new JSSToolbar ();

//Exposed Methods
JSSJavaToolbar.prototype.GoToItem                 =  JSSJavaToolbar_GoToItem;
JSSJavaToolbar.prototype.IsUIReady                =  JSSJavaToolbar_IsUIReady;
JSSJavaToolbar.prototype.GetToolbarApplet         =  JSSJavaToolbar_GetToolbarApplet;
JSSJavaToolbar.prototype.InvokeMethod             =  JSSJavaToolbar_InvokeMethod;


