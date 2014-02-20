// Copyright 2000-2007, Ektron, Inc.
// Revision Date: 2007-02-06

/* It is best NOT to modify this file. */
/*
	See the Developer's Reference Guide for details.
	
	To add your own commands, define one or more of the following:
	eWebEditProExecCommandHandlers[your_cmd_here] = function(sEditorName, strCmdName, strTextData, lData) { }
	function eWebEditProExecCommand(sEditorName, strCmdName, strTextData, lData) { }
	eWebEditPro.onexeccommand = your_custom_event_handler;
	
	To add your own media file handler, define:
	function eWebEditProMediaSelection(sEditorName, sText, lData) { } (for web page using HTTP)
	function eWebEditProMediaNotification(sEditorName) { } (for FTP)
		
	To add your own double-click element handler, define one or more of the following:
	function eWebEditProDblClickElement(oElement) { }
	function eWebEditProDblClickHyperlink(oElement) { }
	function eWebEditProDblClickImage(oElement) { }
	function eWebEditProDblClickTable(oElement) { }
	eWebEditPro.ondblclickelement = your_custom_event_handler;
*/

function onExecCommandHandler(strCmdName, strTextData, lData)
{
/*
	Defer call to actual handler for two reasons:
	1. Avoid recursion in case an action results in this same event firing.
	2. Netscape cannot effectively access the ActiveX control's methods in an event.
*/
	var sEditorName = eWebEditPro.event.srcName;
	strCmdName = strCmdName + ""; // ensure it is a string
	strTextData = strTextData + ""; // ensure it is a string
	lData = lData * 1; // ensure it is a number
	setTimeout('onExecCommandDeferred("' + sEditorName + '", "' + strCmdName + '", ' + toLiteral(strTextData) + ', ' + lData + ')', 1);
}

function onExecCommandDeferred(sEditorName, strCmdName, strTextData, lData)
{
	if ("initialize" == strCmdName)
	{
		var objInstance = eWebEditPro.instances[sEditorName];
		if (typeof objInstance != "undefined" && objInstance != null)
		{
			objInstance.receivedEvent = true;
			if (objInstance.isReady())
			{
				// Respond to the "initialize" event by sending "ready".
				// Responding is optional, but it speeds up initialization.
				// Cannot use eWebEditPro[sEditorName] during "initialize" event.
				// Sync API: objInstance.editor.ExecCommand("ready", "", 0);
				objInstance.asyncCallMethod("ExecCommand", ["ready", "", 0], null, new Function());
			}
		}
		return;
	}
	
	if ("ready" == strCmdName)
	{
		var objInstance = eWebEditPro.instances[sEditorName];
		objInstance.receivedEvent = true;
		if (objInstance.loadWhenReady)
		{
			eWebEditPro.load(objInstance);
		}
		if (objInstance.isReady())
		{
			if ("function" == typeof eWebEditProReady)
			{
				eWebEditProReady(sEditorName);
			}
			if (typeof eWebEditPro.onready != "undefined")
			{
				eWebEditPro.initEvent("onready");
				eWebEditPro.event.type = "ready"; 
				eWebEditPro.event.srcName = sEditorName;
				eWebEditPro.raiseEvent("onready");
			}
		}
		return;
	}
	
	if ("blur" == strCmdName)
	{
		// This command is raised when pressing Ctrl+Tab 
		// (unless Netscape captures the event).
		// Move focus from the editor to the next form field.
		var objInstance = eWebEditPro.instances[sEditorName];
		var objField = eWebEditPro.nextFormField(objInstance);
		if (objField)
		{
			objField.focus();
		}
		return;
	}
	
	var returnValue = true;
	if ("function" == typeof eWebEditProExecCommand)
	{
		returnValue = eWebEditProExecCommand(sEditorName, strCmdName, strTextData, lData);
	}
	
	if (returnValue != false)
	{
		var fnHandler = eWebEditProExecCommandHandlers[strCmdName];
		if ("function" == typeof fnHandler)
		{
			fnHandler(sEditorName, strCmdName, strTextData, lData);
		}
	}
		
	if (typeof eWebEditPro.onexeccommand != "undefined")
	{
		eWebEditPro.initEvent("onexeccommand");
		eWebEditPro.event.type = "execcommand"; 
		eWebEditPro.event.srcName = sEditorName;
		eWebEditPro.event.cmdName = strCmdName;
		eWebEditPro.event.textData = strTextData;
		eWebEditPro.event.data = lData;
		eWebEditPro.raiseEvent("onexeccommand");
	}
}

// global array of command handlers indexed by command name.
var eWebEditProExecCommandHandlers = new Array();

eWebEditProExecCommandHandlers["toolbarreset"] = function(sEditorName, strCmdName, strTextData, lData) 
{ 
	if (typeof eWebEditPro.ontoolbarreset != "undefined")
	{
		eWebEditPro.initEvent("ontoolbarreset");
		eWebEditPro.event.type = "toolbarreset"; 
		eWebEditPro.event.srcName = sEditorName;
		eWebEditPro.raiseEvent("ontoolbarreset");
	}
	var bValidReq = false;
	if ( eWebEditPro.isIE && eWebEditPro.browserVersion >= 5.0 ) 
	{
		var bValidReq = true;
	}
	if ( !bValidReq )
	{
		var objInstance = eWebEditPro.instances[sEditorName]; 
		var objMenu = objInstance.editor.Toolbars();
		objMenu.CommandDelete("js508table");
	}
} 

eWebEditProExecCommandHandlers["getcssrules"] = function(sEditorName, strCmdName, strTextData, lData) 
{ 
	var objInstance = eWebEditPro.instances[sEditorName]; 
	if (objInstance)
	{
		try
		{
			var strCssText = strTextData;
			var objIFrame = document.getElementById("fraCssReader");
			if (!objIFrame)
			{
				objIFrame = document.createElement("iframe");
				objIFrame.id = "fraCssReader";
				objIFrame.style.display = "none";
				objIFrame.src = eWebEditPro.resolvePath("accesscsspage.htm");
				document.body.appendChild(objIFrame);
			}
			setTimeout(function(/*objInstance, objIFrame, strCssText*/) { // delay to allow time to load .src
			try
			{
				var objDoc = objIFrame.contentWindow.document;
				var objHead = objDoc.getElementsByTagName("head")[0];
				if (null == objHead) 
				{
					setTimeout(arguments.callee, 20);
					return;
				}

				var objStyleElem = objDoc.createElement("style");
				objStyleElem.type = "text/css";
			
				strCssText = strCssText.replace(/\@import\s+url\([^\)]*\);?/gi, ""); // @import causes IE to crash and not supported by Mozilla
				if (objStyleElem.styleSheet) // IE
				{
					objStyleElem.styleSheet.cssText = strCssText;
				}
				else // Mozilla
				{
					var objCssText = objDoc.createTextNode(strCssText);
					objStyleElem.appendChild(objCssText);
				}
				
				objHead.appendChild(objStyleElem); // "Access is denied" error occurs if this line is missing
				var objRules = null;
				if (objStyleElem.styleSheet) // IE
				{
					objRules = objStyleElem.styleSheet.rules;
				}
				else // Mozilla
				{
					objRules = objDoc.styleSheets[objDoc.styleSheets.length - 1].cssRules;
				}
			
				var strRules = "";
				var objRule = null;
				for (var i = 0; i < objRules.length; i++)
				{
					objRule = objRules[i];
					try
					{
						var selText = objRule.selectorText + ""; // ensure it is a string
						if (selText.indexOf(".") >= 0) // only keep rules that define classes
						{
							var bVisible = true;
							try { if (objRule.style.visible == "false") bVisible = false; } catch (e) {};
							
							if (bVisible)
							{
								strRules += '<rule sel="' + eWebEditProUtil.HTMLEncode(objRule.selectorText);
								strRules += '" txt="' + eWebEditProUtil.HTMLEncode(objRule.style.cssText);
								try { if (objRule.style.visible) strRules += '" vis="' + eWebEditProUtil.HTMLEncode(objRule.style.visible); } catch (e) {};
								try { if (objRule.style.localeRef) strRules += '" ref="' + eWebEditProUtil.HTMLEncode(objRule.style.localeRef); } catch (e) {};
								try { if (objRule.style.caption) strRules += '" cap="' + eWebEditProUtil.HTMLEncode(objRule.style.caption); } catch (e) {};
								try { if (objRule.style.isStyleInternal) strRules += '" int="' + eWebEditProUtil.HTMLEncode(objRule.style.isStyleInternal); } catch (e) {};
								try { if (objRule.style.equivClass) strRules += '" eqv="' + eWebEditProUtil.HTMLEncode(objRule.style.equivClass); } catch (e) {};
								strRules += '" />\r\n';
							}
						}
					}
					catch (e)
					{
						// ignore and continue
					}
				}
				objInstance.asyncCallMethod("ExecCommand", ["setcssrules", strRules, 0], null, new Function());
			}
			catch (e)
			{
				//alert(e.message);
				//throw e;
			}
			}, 1); // setTimeout
		}
		catch (e)
		{
			//alert(e.message);
			//throw e;
		}
	}
} 


eWebEditProExecCommandHandlers["jstm"] = function(sEditorName, strCmdName, strTextData, lData) 
{ 
	// Sync API: eWebEditPro.instances[sEditorName].editor.pasteHTML('<sup><small>TM</small></sup>');
	eWebEditPro.instances[sEditorName].asyncCallMethod("pasteHTML", ['<sup><small>TM</small></sup>'], null, new Function());
} 

eWebEditProExecCommandHandlers["jshyperlink"] = function(sEditorName, strCmdName, strTextData, lData)
{
	eWebEditPro.openDialog(sEditorName, eWebEditPro.resolvePath("hyperlinkpopup.htm"), "", "HyperlinkList", "width=500,height=200");
}

eWebEditProExecCommandHandlers["cmdmfumedia"] = function(sEditorName, strCmdName, strTextData, lData)
{
	if (!eWebEditPro.instances[sEditorName].isEditor())
	{
		return; // write async
	}
	if (eWebEditPro.instances[sEditorName].editor.MediaFile().getPropertyBoolean("HandledInternally") == false)
	{
        // This is for backwards compatibility.
        // We no longer provide this, but the customer may 
        // have created their own.
		if ("function" == typeof eWebEditProMediaSelection)
		{
			eWebEditProMediaSelection(sEditorName, strTextData, lData);
		}
	}
	else
	{
		if ("function" == typeof eWebEditProMediaNotification)
		{
			eWebEditProMediaNotification(sEditorName);
		}
	}
}

eWebEditProExecCommandHandlers["js508table"] = function(sEditorName, strCmdName, strTextData, lData) 
{
	if ( eWebEditPro.isIE && eWebEditPro.browserVersion >= 5.0 ) 
	{
		var strTextData = eWebEditPro[sEditorName].getSelectedHTML();
		var strTemp = strTextData.substr(0, 10);
		var iPos = strTemp.indexOf("<");
		var bValidTable = false;
		if ( iPos > 0 )
		{
			strTemp = strTextData.substring(iPos, iPos+6);
			strTemp = strTemp.toUpperCase();
			if ( "<TABLE" == strTemp ) 
			{ 
				// if TABLE is the first tag in the selected HTML
				// confirm that any leading chars are white space
				for ( var i = 0; i < iPos; i++ ) 
				{
					if ( strTextData.charCodeAt(i)==10 || strTextData.charCodeAt(i)==13 || strTextData.charCodeAt(i)==32 )
					{
						bValidTable = true;
					}
				}
			}
		}
		if ( bValidTable )
		{
			eWebEditPro.openDialog(sEditorName, eWebEditPro.resolvePath("section508table.htm"), "", "", "width=440,height=320,scrollbars=no,resizable=no, location=no,toolbar=no");
		}
		else 
		{
			if ( "object" == typeof eWebEditProMessages )
			{		
				alert(eWebEditProMessages.MsgsTableNotSelected);
			}
		}
	}
}

eWebEditProExecCommandHandlers["jsformform"] = function(sEditorName, strCmdName, strTextData, lData) 
{
	showFormElementDialog(sEditorName, 2, "frmForm", 620, 350);
}

eWebEditProExecCommandHandlers["jsformbutton"] = function(sEditorName, strCmdName, strTextData, lData) 
{
	showFormElementDialog(sEditorName, 9, "frmBBtn", 400, 200);
}

eWebEditProExecCommandHandlers["jsformsubmit"] = function(sEditorName, strCmdName, strTextData, lData) 
{
	showFormElementDialog(sEditorName, 0, "frmSBtn", 400, 200);
}

eWebEditProExecCommandHandlers["jsformreset"] = function(sEditorName, strCmdName, strTextData, lData) 
{
	showFormElementDialog(sEditorName, 1, "frmRBtn", 400, 200);
}

eWebEditProExecCommandHandlers["jsformhidden"] = function(sEditorName, strCmdName, strTextData, lData) 
{
	showFormElementDialog(sEditorName, 4, "frmHiddenFld", 400, 200);
}

eWebEditProExecCommandHandlers["jsformtext"] = function(sEditorName, strCmdName, strTextData, lData) 
{
	showFormElementDialog(sEditorName, 3, "frmTextFld", 400, 200);
}

eWebEditProExecCommandHandlers["jsformpassword"] = function(sEditorName, strCmdName, strTextData, lData) 
{
	showFormElementDialog(sEditorName, 8, "frmPasswordFld", 400, 200);
}

eWebEditProExecCommandHandlers["jsformtextarea"] = function(sEditorName, strCmdName, strTextData, lData) 
{
	showFormElementDialog(sEditorName, 5, "frmTextarea", 400, 250);
}

eWebEditProExecCommandHandlers["jsformradio"] = function(sEditorName, strCmdName, strTextData, lData) 
{
	showFormElementDialog(sEditorName, 6, "frmOptionBox", 400, 250);
}

eWebEditProExecCommandHandlers["jsformcheckbox"] = function(sEditorName, strCmdName, strTextData, lData) 
{
	showFormElementDialog(sEditorName, 7, "frmCheckbox", 400, 250);
}

eWebEditProExecCommandHandlers["jsformselect"] = function(sEditorName, strCmdName, strTextData, lData) 
{
	showFormElementDialog(sEditorName, 11, "frmDropList", 400, 600);
}

eWebEditProExecCommandHandlers["jsformfile"] = function(sEditorName, strCmdName, strTextData, lData) 
{
	showFormElementDialog(sEditorName, 10, "frmFormFile", 400, 200);
}

function showFormElementDialog(sEditorName, sFormElement, sWin, width, height)
{
	var bNetscape6 = (eWebEditPro.isNetscape && (eWebEditPro.browserVersion >= 6.0));
	if (bNetscape6)
	{
		onExecCommandHandler("blur", "", 0);
	}		
	var sWindowFeatures = "scrollbars,resizable,width=" + width + ",height=" + height;
	var sFilename = "formelementinsert.htm";
	if (11 == sFormElement)
	{
		sFilename = "formelementinsertframe.htm";
	}
	eWebEditPro.openDialog(sEditorName, eWebEditPro.resolvePath(sFilename), "formelement=" + escape(sFormElement), sWin, sWindowFeatures);
}

eWebEditProExecCommandHandlers["jscomment"] = function(sEditorName, strCmdName, strTextData, lData) 
{
	showCommentDialog(sEditorName);
}

function eWebEditProInsertButton(sEditorName, name, caption, attributes)
{
	var sHTML = "<button name=" + toLiteral(name)+ " " + attributes + ">" + caption + "</button>";
	eWebEditPro.instances[sEditorName].asyncCallMethod("pasteHTML", [sHTML], null, new Function());
}

eWebEditProExecCommandHandlers["mybtn"] = function(sEditorName, strCmdName, strTextData, lData)
{
	eWebEditProInsertButton(sEditorName, strCmdName, "Button", "");
}

eWebEditProExecCommandHandlers["clicktag"] = function(sEditorName, strCmdName, strTextData, lData) 
{
	var objXmlDoc = eWebEditPro.instances[sEditorName].editor.XMLProcessor();
	var objXmlTag = objXmlDoc.ActiveTag();
	if((typeof objXmlTag != "undefined") && (objXmlTag != null))
	{
		var sXPath = objXmlTag.GetXPath();
		if ("mybtn" == strTextData)
		{
			sXPath += "/Field1";
			var objDataFld = objXmlDoc.FindDataField(sXPath);
			if (objDataFld)
			{
				var sValue = objDataFld.getPropertyString("Content");
				alert(sValue);
			}
			else
			{
				alert("Could not find field with XPath: " + sXPath);
			}
		}
	}
}

eWebEditProExecCommandHandlers["dblclicktag"] = function(sEditorName, strCmdName, strTextData, lData) 
{
	var objXmlTag = eWebEditPro.instances[sEditorName].editor.XMLProcessor().ActiveTag();
	if((typeof objXmlTag != "undefined") && (objXmlTag != null) && (true == objXmlTag.IsValid()))
	{
		if ("mycomment" == objXmlTag.getPropertyString("TagName"))
		{
			showCommentDialog(sEditorName);
		}
	}
}

function showCommentDialog(sEditorName)
{
	eWebEditPro.openDialog(sEditorName, eWebEditPro.resolvePath("commentpopup.htm"), "", "",
			"width=650,height=350,resizable,scrollbars,status,titlebar");
}
	
function onDblClickElementHandler(oElement)
{
/*
	Netscape cannot effectively access the ActiveX control's methods unless called from setTimeout().
	However, there would not be any access to the oElement if called from setTimeout().
*/
	var returnValue = true;
	if ("function" == typeof eWebEditProDblClickElement)
	{
		returnValue = eWebEditProDblClickElement(oElement);
	}
	
	if (returnValue != false)
	{
		eWebEditProDblClickElementDispatcher(oElement);
	}
		
	if (typeof eWebEditPro.ondblclickelement != "undefined")
	{
		eWebEditPro.initEvent("ondblclickelement");
		//eWebEditPro.event.type = "dblclickelement"; 
		//eWebEditPro.event.srcName = eWebEditPro.event.srcName;
		eWebEditPro.event.srcElement = oElement;
		eWebEditPro.raiseEvent("ondblclickelement");
	}
}

function eWebEditProDblClickElementDispatcher(oElement)
{
	var sTagName = oElement.tagName + ""; 
	sTagName = sTagName.toUpperCase(); 
	
	var returnValue = true;
	if ("A" == sTagName)
	{
		if ("function" == typeof eWebEditProDblClickHyperlink)
		{
			returnValue = eWebEditProDblClickHyperlink(oElement);
		}
		if (returnValue != false)
		{
			onDblClickHyperlinkHandler(oElement);
		}
	}
	else if ("IMG" == sTagName)
	{
		if ("function" == typeof eWebEditProDblClickImage)
		{
			returnValue = eWebEditProDblClickImage(oElement);
		}
	}
	else if ("TABLE" == sTagName)
	{
		if ("function" == typeof eWebEditProDblClickTable)
		{
			returnValue = eWebEditProDblClickTable(oElement);
		}
	}
}

function onDblClickHyperlinkHandler(oElement)
{
	var sProtocol = oElement.protocol + ""; 
	var sHost = oElement.host + ""; 
	var sUrl = oElement.href + ""; 
	
	if (sUrl)
	{
		if (/\/\#$/.test(sUrl)) // ends in "/#"
		{	
			sUrl = "#";
			return; // not a real URL, just a hyperlink with onclick
		}
		var oWin;
		if ("mailto:" == sProtocol.toLowerCase())
		{
			oWin = window.open(sUrl, "", "width=2,height=2");
			if (null == oWin && eWebEditProMessages.popupBlockedMessage)
			{
				alert(eWebEditProMessages.popupBlockedMessage);
			}
			else if (oWin != null)
			{
				oWin.close();
			}
		}
		else if (sUrl.substring(0,1) == "#")
		{
			alert("Internal hyperlink to '" + sUrl.substring(1) + "'.");
		}
		else
		{
			if (!sHost)
			{
				if (sUrl.substring(0,1) != "/")
				{
					var sPath = window.document.location.pathname + "";
					var iEndOfPath = sPath.lastIndexOf("/");
					if (iEndOfPath > -1)
					{
						sPath = sPath.substring(0, iEndOfPath + 1);
						sUrl = sPath + sUrl;
					}
				}
				sHost = window.document.location.host + "";
				sUrl = sHost + sUrl;
			}
			if (!sProtocol)
			{
				sProtocol = window.document.location.protocol + "";
				sUrl = sProtocol + "//" + sUrl;
			}
			oWin = window.open(sUrl, "", "location,resizable,scrollbars,status");
			if (null == oWin && eWebEditProMessages.popupBlockedMessage)
			{
				alert(eWebEditProMessages.popupBlockedMessage);
			}
		}
	}
}
