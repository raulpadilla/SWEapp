/*****************************************************************************
 *
 * Copyright (C) 2001, Siebel Systems, Inc., All rights reserved.
 *
 * FILE:       rtcEditor.js
 *  $Revision: 12 $Date: 2/22/2001
 *    $Author:
 *
 * CREATOR:    Roy Selig
 *
 * DESCRIPTION:
 *		Creates and maintains Rich Text Control (RTC) instances.
 *		RTC requires IE4.x+;  in Netscape and other browsers the component  
 *		gracegully degrades to a textarea
 *     
 *****************************************************************************/

// browser detect
var rtc_brwsr = -1;
var isNS = 0;
var ns4 = 4;
var ns6 = 5;
var isIE = 100;  
var ie4 = 104;
var ie5 = 105;
var ie5_5 = 105.5;
var ie6 = 106;
var agt = navigator.userAgent.toLowerCase();
var isMac = (agt.indexOf("mac") != -1);
rtc_brwsr = (navigator.appName.indexOf("Microsoft")>-1)?isIE:isNS;
if (navigator.appVersion.indexOf("MSIE 6.")>-1)
{	rtc_brwsr += 6;	}
else if (navigator.appVersion.indexOf("MSIE 5.5")>-1)
{	rtc_brwsr += 5.5;	}
else if (navigator.appVersion.indexOf("MSIE 5.")>-1)
{	rtc_brwsr += 5;	}
else{ rtc_brwsr +=  parseInt(navigator.appVersion); }

var rtc_doc = null;

var bNeedFocus = false;
var RTC_MODE_TEXTAREA 	= 0;			//stores the Rich Text Component (RTC) modes
var RTC_MODE_EMBEDDED 	= 1;			//stores the Rich Text Component (RTC) modes
var RTC_MODE_POPUP 		= 2;			//stores the Rich Text Component (RTC) modes
var RTC_MODE_READ_ONLY	= 3;			//stores the Rich Text Component (RTC) modes

var activeSWEField_Obj=null;			//Stores the DOM Object for the SWE field associated with the active RTC
var activeRTC_ID="";					//Stores the DOM id of the active RTC
var activeRTC_Obj="";					//Stores the active RTC object 
var activeRTC_Frame= null;				//Stores the active RTC frame
var activeRTC_Popup= null;				//Stores the active RTC popup
var activeColor="#000000";				//stores the active font color	 

var rtcIndex=0;							//creates a unique index for each RTC
var rtcIsActive = false;				//stores whether or not a RTC is currently being edited
var rtc_sleep = 1000;					//stores the timeout between RTC/SWE Field syncs
var rtcEditor_Frame = null;				//stores iFrame reference where the rtc Editor is loaded
var rtcEditor_Frame_Name = "editFrame";	//stores the name of the iFrame where the rtc Editor is loaded
var rtcMaxChars = 2000;					//stores the number of characters that can be saved into an RTC (includes formatting characters).

var isRTCSupported = false;				//stores whether we have the correct browser to support the RTC Editor

var allRTC_SWEFields = new Array();		//stores the collection of swe fields related to RTCs on this page

var trange = null;						//global text range object

var SWEFldWrapperSuffix = "sweFldWrapper";

										
var focusX=0;							//used to position cursor
var focusY=0;							//when opening in embedded mode

// Flags for marking inserted links and graphics.
var RTC_LINK_INSERTION_POINT	= "RTCLinkInsertionPoint";      // marks link insertion point.
var RTC_GRAPHIC_INSERTION_POINT	= "RTCGraphicInsertionPoint";   // marks graphic insertion point.

//determine if we are in an RTL language and store the correct HTML tag for use later
var appDir="ltr";
var htmlDIR="<html>";

// Stores whether rtc editor is in Popup mode. Default to false.
//   Do not use "window.opener!=null" to detect rtc Popup, because it can be true for the base window itself.
var isRTCPopup = false;

//modified if-test because DIR structure not supported on Mac IE5
if (rtc_brwsr >= ie5 && !isMac)
{  appDIR	=(isRTCPopup)?window.opener.document.dir.toLowerCase():top.document.dir.toLowerCase();
   htmlDIR = (appDIR=="rtl")?"<html dir='rtl'>":"<html>";	}

//Standard Body treatments to be passed into the iFrames
var HTML_html_open_tag          = htmlDIR;
var HTML_body_open_tag          = "<body style='font-family:arial,helvetica; font-size:x-small; margin:2 2 2 2;'>";
var HTML_body_open_tag_embedded = "<body style='font-family:arial,helvetica; font-size:x-small; margin:2 19 2 2'>";
var HTML_open			= htmlDIR + "<base target='_blank'>" + HTML_body_open_tag;
var HTML_open_embedded		= htmlDIR + "<base target='_blank'>" + HTML_body_open_tag_embedded;
var HTML_open_read_only  	= htmlDIR + "<base target='_blank'><body style='font-family:arial,helvetica; font-size:x-small; margin:2 2 2 2; background-color:#f0f0f0'>";
var HTML_close 			= "</body></html>";

//HTML RTC Initialization strings
var RTC_MODE_READ_ONLY_HTML =	"<table cellpadding='0' cellspacing='0'><tr valign='top'>" +
								"<td><iframe rtcMode='%MODE%' scrolling='auto' class='rtcReadOnly' id='%ID%' unselectable='on' onfocus='rtcIsActive=true' onblur='rtcIsActive=false' frameborder='0'>" + htmlDIR + "<body></body></html></iframe></td>" +
	 							"</tr></table>";

//12-HW4AEH src='%PATH%rtcEditorPopup.html' is removed since it causes busy-state problems.
var RTC_MODE_POPUP_HTML =		"<table cellpadding='0' cellspacing='0'><tr valign='top'>" +
								"<td><iframe rtcMode='%MODE%' scrolling='auto' class='rtcPopup' id='%ID%' name='%ID%' unselectable='on' onfocus='rtcIsActive=true' onblur='rtcIsActive=false'  frameborder='0'>" + htmlDIR + "<body></body></html></iframe></td>" +
								"<td><a href='javascript:openRTCEditorPopup(\"%ID%\");'><img id='%ID%Btn' src='images/icon_rtcStripHTML.gif' border='0' style='display:none;'></a><img src='images/spacer' width='21' height='1'></td>" +
								"</tr></table>";							

var RTC_MODE_EMBEDDED_HTML =	"<table cellpadding='0' cellspacing='0'><tr valign='top'>" +
								"<td><iframe rtcMode='%MODE%' scrolling='auto' class='rtcEmbedded' id='%ID%' name='%ID%' unselectable='on' onfocus='openRTCEditorEmbedded(\"%ID%\");' onblur='closeRTCEditorEmbedded(\"%ID%\");' frameborder='1'>" + htmlDIR + "<body></body></html></iframe></td>" +
								"</tr></table>";
							
var RTC_MODE_TEXTAREA_HTML =	"&nbsp;<a href='javascript:stripHTMLTags(\"%ID%\");'>" + 
					  			"<img class='rtcBtn' align='top' src='images/icon_rtcStripHTML.gif' alt='%ALT%' border='0'></a>" +		
				 	  			"<input type='hidden' name='%ID%Hidden'>";		

//Common Regular Expressions to be applied to HTML Initialization strings
var re_ID = new RegExp("%ID%","g");
var re_MODE = new RegExp("%MODE%","g");	
var re_PATH = new RegExp("%PATH%","g");				

var isSIDataLossWarningEnabled = false;
var appletName = "";
var appletId = "";

// wraps the unidentified SWEField in a span with a known id
// which enables us to find the SWEField id at runtime 
// context: main window
function createRTC(type,mode,doc,apltName,apltId)
{
   // CR#:12-CBWTAR
   if (type == 0 )
   {
       doCleanup ();
   }

   rtc_doc = doc;
   var bShowPlainText = (rtc_doc.parentWindow.rtc_ShowPlainText != null)? rtc_doc.parentWindow.rtc_ShowPlainText : false;
	
	initRTCStrings();
		
	//NS, IE4 and other browsers cannot support the RTC Editor so create a textarea instead
        //modified if-test because DIR structure not supported on Mac IE5
	if (bShowPlainText==true || mode==RTC_MODE_TEXTAREA || rtc_brwsr<=ie4 || isMac) {mode = RTC_MODE_TEXTAREA; isRTCSupported=false;}
	//due to an onblur bug with iFrame ie5 can only support the RTC Editor as a popup
	else if (rtc_brwsr >= ie5 && rtc_brwsr < ie5_5)	{mode = RTC_MODE_POPUP; isRTCSupported=true;}
	//ie5.5+ 
	else if (rtc_brwsr >= ie5_5)	{isRTCSupported=true;}	

	//create the component	
	switch (type)
	{ 	case 0:	//open SWE Field wrapper
			var sweFldWrapID="rtc" + rtcIndex + SWEFldWrapperSuffix;
			var displayValue=(mode==RTC_MODE_TEXTAREA)?"visible;":"visible;position:absolute;top:-5000";	
			rtc_doc.write("<span id='" + sweFldWrapID + "' style='display:"+displayValue+";'>");		
			break;
		case 1:	//close SWE Field wrapper
			rtc_doc.write("</span>");
			_createRTC_iFrame(mode);
			rtcIndex++;
			break;
	}
	
	if (apltName != 'undefined' && apltId != 'undefined')
	{
	   isSIDataLossWarningEnabled = true;
	   appletName = apltName;
	   appletId = apltId;
	}
	setDirection ();
	
}

// helper to createRTC() which writes rtc iFrame 
// based upon the mode it has been passed
// context: main window
function _createRTC_iFrame(mode)
{
   var rtc_ID = "rtc"+ rtcIndex;
   var scriptDir = resolveScriptsDir();
	switch (mode)
	{
	   case 1: //RTC_MODE_EMBEDDED:
			rtc_doc.write(	RTC_MODE_EMBEDDED_HTML.replace(re_ID,rtc_ID).replace(re_MODE,mode).replace(re_PATH,scriptDir) );
			setOnPropertyChangeHandlers(rtc_ID,mode);
			break;
		case 2: //RTC_MODE_POPUP:
			rtc_doc.write(	RTC_MODE_POPUP_HTML.replace(re_ID,rtc_ID).replace(re_MODE,mode).replace(re_PATH,scriptDir) );
			setOnPropertyChangeHandlers(rtc_ID,mode);
			break;
		case 3: //RTC_MODE_READ_ONLY:	
			rtc_doc.write(	RTC_MODE_READ_ONLY_HTML.replace(re_ID,rtc_ID).replace(re_MODE,mode) );
			setOnPropertyChangeHandlers(rtc_ID,mode);
			break;	
		default: //RTC_MODE_TEXTAREA:
			rtc_doc.write(	RTC_MODE_TEXTAREA_HTML.replace(re_ID,rtc_ID).replace(re_MODE,mode).replace(/%ALT%/gi,sStripHTML)  );
			break;	
	}
}

/*Sets up synchronization between SWE field and RTC iFrame for IE 5+; 
  uses the onpropertychange event to do it; IE 4 will still use the 
  suboptimal timer method*/
function setOnPropertyChangeHandlers(rtc_ID,mode)
{
	if(rtc_brwsr>=ie5)		
	{	//1. get a handle to the SWE Wrapper Span tag
		var sweFldWrap = rtc_doc.getElementById(rtc_ID + SWEFldWrapperSuffix);		

		//2. read the first child of the wrapper span tag
		//     in hi mode it will be the swe span tag; 
		//		in low mode it will be the swe field or plain text.
		var sweSpan = (sweFldWrap)?sweFldWrap.children[0]:null;
		
		//3. if the sweSpan tag is not a span,input or textarea then the field is read only
		//   so pick up its contents, filter out any script tags and wrap it in a stand-in sweSpan 
		if (String("SPAN,INPUT,TEXTAREA").indexOf(sweSpan.tagName)==-1)
		{	var content = sweFldWrap.innerHTML.replace(/<script[^<]*<\/script>/gi,"");
			content = (content.length==0)?"&nbsp;":content;
			sweFldWrap.innerHTML = "<span id='sweSpan" + rtc_ID + "'>"  + content + "</span>"; 
			sweSpan = sweFldWrap.children[0];	
		}		
		
		//4. get a handle to the RTC iFrame
		var rtcFrame = rtc_doc.getElementById(rtc_ID);
		//5. get SWE span tag id and set it as an expando property on RTC Frame
		rtcFrame.swe_ID = sweSpan.id; 
		//6. get RTC Frame id and set it as an expando property on SWE span tag
		sweSpan.rtc_ID = rtc_ID;
                sweSpan.rtcMode = mode;
		//7. check if swe field has already arrived (lo-mode) or read-only
		sweSpan.rtcFrame=null;	
		sweFldInit(sweSpan);
		//8. attach onPropertyChange event handler to SWE span tag
		sweSpan.onpropertychange=swespan_OnPropertyChange;	
	}
}	

/*captures property changes on the swe span tag;
  these are indicative that the field has initialized or changed state so sweFieldInit is called */
function swespan_OnPropertyChange()
{	var sweSpan = this.document.parentWindow.event.srcElement;
	var prop = this.document.parentWindow.event.propertyName;
	if (prop=="innerHTML")	{	sweFldInit(sweSpan);	}	
}

//traverses the SWE span tag to find the swe field
function sweFldInit(sweSpan)
{	
	if (sweSpan.tagName!="TEXTAREA") //we're in hi mode
	{	var allObj = sweSpan.all.tags("TEXTAREA");
	
		if ( allObj.length==0)	
		//if textarea is not found then read-only text was added to the swe span tag or tag has not been initialized yet
		{	var obj = new Object();	
				sweSpan.sweFld = obj; 
				sweSpan.sweFld.value=sweSpan.innerHTML;	
				sweSpan.sweFld.readOnly=true;	
				sweSpan.sweFld.sweIsBase=false;	
		} 
		else //found text area so store it aa a prop on swepsan
		{	sweSpan.sweFld = allObj[0];
			sweSpan.sweFld.sweIsBase=false;	
			
//			var rtcF = window.frames[ sweSpan.rtc_ID ];
//			if (rtcF!=null)
//			{	if (rtcF.frameElement.rtcMode=='3') //RTC_MODE_READ_ONLY
//				{	var baseId = sweSpan.sweFld.id;
//					baseId = baseId.replace(new RegExp("tx","g"),"dv").replace(new RegExp("Edit","g"),"Base");
//					if (baseId!=sweSpan.sweFld.id) 
//					{	var baseObj = sweSpan.all.item(baseId);
//						if (baseObj!=null)
//						{	sweSpan.sweFld = baseObj;
//							sweSpan.sweFld.value = baseObj.innerHTML;
//							sweSpan.sweFld.readOnly = true;
//							sweSpan.sweFld.sweIsBase = true;
//						}
//					}
//				}
//			}
		}
		
	} else //we're in low mode and the sweSpan is actually our swe field
	{	sweSpan.sweFld = sweSpan;
	 	sweSpan.sweFld.sweIsBase = true;
	}		
		
	sweSpan.sweFld.sweSpan = sweSpan; 
	sweSpan.sweFld.onpropertychange = swefld_OnPropertyChange;
	if (sweSpan.rtcFrame==null)	sweSpan.rtcFrame = GetRTCFrame(sweSpan.rtc_ID); 
	if (sweSpan.rtcFrame!=null)	updateRTCFrame(sweSpan.rtcFrame, sweSpan.sweFld.value);	
	
	//manage visual state of the RTC(read-only or editable look-and-feel)
	var rtcObjBtn = GetRTCDoc(sweSpan.rtc_ID).getElementById(sweSpan.rtc_ID + "Btn");
	if (rtcObjBtn!=null)
	{	rtcObjBtn.style.display = ( sweSpan.sweFld.readOnly==true )?"none":"block";		}
	rtcObj = GetRTCDoc(sweSpan.rtc_ID).getElementById(sweSpan.rtc_ID)
	if (rtcObj!=null)
	{	rtcObj.style.borderColor=( sweSpan.sweFld.readOnly==true )?"#cccccc":"#ccccff" ;	}	
		
}

//catches changes to the swe field and refreshes the RTC display
function swefld_OnPropertyChange()
{	var sweFld = this.document.parentWindow.event.srcElement;	
	var prop = this.document.parentWindow.event.propertyName;
	if (rtcIsActive==false || activeRTC_ID!=sweFld.sweSpan.rtc_ID)
	{	switch (prop)
		{	case "innerHTML":
				if (sweFld.sweIsBase!=true) break;
				sweFld.value = sweFld.innerHTML;
				sweFld.readOnly = true;
			case "value":
				updateRTCFrame(sweFld.sweSpan.rtcFrame, sweFld.value);	
			case "readOnly":
			  	var rtcObjBtn = GetRTCDoc(sweFld.sweSpan.rtc_ID).getElementById(sweFld.sweSpan.rtc_ID + "Btn");
				if (rtcObjBtn!=null)
				{	rtcObjBtn.style.display = ( sweFld.readOnly==true )?"none":"block";		}			
			default:
            if (sweFld.sweSpan.rtcFrame!=null)
            {	
               obj = GetRTCDoc(sweFld.sweSpan.rtc_ID).getElementById(sweFld.sweSpan.rtc_ID);

               if (obj != null)
               {
                  obj.style.borderColor=( sweFld.readOnly==true )?"#cccccc":"#ccccff" ;	
                  obj.style.width  = sweFld.style.width;
                  obj.style.height = sweFld.style.height;					   
               }
            }
      }
	}
	else
	{	switch (prop)
		{	case "innerHTML":
				if (sweFld.sweIsBase!=true) break;
				sweFld.value = sweFld.innerHTML;
				sweFld.readOnly = true;
			case "value":
//				if (sweFld.sweSpan.rtcFrame.frameElement==null) break;
				switch (sweFld.sweSpan.rtcMode) // switch (sweFld.sweSpan.rtcFrame.frameElement.rtcMode)
				{ 	case "0": //RTC_TEXTAREA:
						// do nothing: never active
						break;						
					case "1": //RTC_MODE_EMBEDDED:
						updateRTCEditorEmbedded(sweFld.sweSpan.rtc_ID,sweFld.value);
						break;
					case "2": //RTC_MODE_POPUP:
						if (activeRTC_Popup!=null)
						{	activeRTC_Popup.updateRTCEditorPopup(sweFld.value);
						}
						break;	
					case "3": //RTC_MODE_READ_ONLY:
						updateRTCFrame(sweFld.sweSpan.rtcFrame, sweFld.value, RTC_MODE_READ_ONLY);
						break;	
					default: //indeterminant: do nothing.
						break;							
				}//end switch
				break;
			default:
				break;
		}	
	}
}

function getSWEField(rtc_ID)
{

	var sweFldWrapperID = rtc_ID+SWEFldWrapperSuffix;
	var sweWrapper = GetRTCDoc(rtc_ID).getElementById(sweFldWrapperID);  	
	var sweSpan = sweWrapper.children[0];	
	return sweSpan.sweFld;
}

/*function evalSWEHandler( elt, attr, fn ) : handles special _JGC_sendEvent case*/
function evalSWEHandler( elt, attr, fn )
{
	if (fn!=null)
	{	if (elt.attributes.item(attr)!=null && elt.attributes.item(attr).nodeValue != null &&
		elt.attributes.item(attr).nodeValue.indexOf("_JGC_sendEvent")>-1)
		{	var jgcseValue  = null;
			eval("jgcseValue = " + elt.attributes.item(attr).nodeValue);
			if (jgcseValue!=null && typeof(jgcseValue)=="string" && jgcseValue!="") eval(jgcseValue);
		}
                else if (typeof(fn)=="string")
                {
                   eval(fn)
                }
		else
		{	eval(fn+"anonymous()");
		}
	}
}

function GetRTCDoc (rtc_ID)
{
	//we need to do a test, to see if we have the right rtc_doc
	var sweWrapper;
	try
	{
		sweWrapper = rtc_doc.getElementById(rtc_ID+SWEFldWrapperSuffix);
	}
	catch (e)
	{
	}
	if (sweWrapper == null)
	{
		//then rtc_doc has been lost!  lets get it back!
		//this happens when you REVISIT an rtcEditor
		//after you've ACCESSED A DIFFERENT rtcEdtior
		// (REVIST => not your first time)
		doCleanup();
		rtc_doc = SWEFindFrame(top, rtc_ID).parent.document;
	}
	return rtc_doc;
}

function GetRTCFrame (rtc_ID)
{
   return GetRTCDoc(rtc_ID).getElementById(rtc_ID).contentWindow;
}

function touchSWEField(rtc_ID)
{	var sweFld = getSWEField(rtc_ID)
	sweFld.onpropertychange = null;

	//acquire handle to HI mode prop
	if (this.SWEIsHighInteract==true)
	{	//HI mode handler: fire events manually
		evalSWEHandler( sweFld, "onfocus",  sweFld.onfocus  );
	}
	
	sweFld.onpropertychange = swefld_OnPropertyChange;
}

function setSWEField(rtc_ID,content)
{	var sweFld = getSWEField(rtc_ID)
	sweFld.onpropertychange = null;

	//acquire handle to HI mode prop
	if (this.SWEIsHighInteract==true)
	{	//HI mode handler: fire events manually
		sweFld.value = content;
		evalSWEHandler( sweFld, "onchange", sweFld.onchange ); //if (sweFld.onchange!=null)	eval(sweFld.onchange+"anonymous()");
		evalSWEHandler( sweFld, "onblur",   sweFld.onblur   ); //if (sweFld.onblur!=null)	eval(sweFld.onblur+"anonymous()");
	}
	else
	{	//LI mode handler
	   if (isSIDataLossWarningEnabled && sweFld.value != content)
		{
		   top.trackChange (appletName, appletId);
		}
		sweFld.value = content;
	}
	
	sweFld.onpropertychange = swefld_OnPropertyChange;
}

/*updateRTCFrame(rtcFrame, content, mode): finds the rtc iFrame and updates the value displayed within it*/
function updateRTCFrame(rtcFrame, content, mode)
{	
	var header="";
	
	switch (mode)
	{ 	case 0: //RTC_TEXTAREA:
			header =  HTML_open;
			break;		
		case 1: //RTC_MODE_EMBEDDED:
			header =   HTML_open_embedded;
			break;
		case 2: //RTC_MODE_POPUP:
			header =  HTML_open;
			break;	
		case 3: //RTC_MODE_READ_ONLY:
			header =  HTML_open_read_only;
			break;	
		default: //indeterminant:
			header =  HTML_open;
			break;							
	}//end switch

	rtcFrame.document.open("text/html", "replace"); 
	rtcFrame.document.write(header + securityStrip (content) + HTML_close);
	rtcFrame.document.close();				

}

/**************************
 RTC Editor Functions
***************************/

//Command Init
var cmdBOLD 		= 10001;
var cmdITALIC 		= 10002;
var cmdUNDERLINE	= 10003;
var cmdUL			= 10004;
var cmdOL			= 10005;
var cmdFONTSIZE 	= 10006;
var cmdFONTNAME 	= 100065;
var cmdFONTCOLOR	= 10007;
var cmdINDENT		= 10008;
var cmdOUTDENT		= 10009;
var cmdCUT			= 10010;
var cmdCOPY			= 10011;
var cmdPASTE		= 10012;
var cmdDELETE		= 10013;
var cmdLEFT			= 100141;
var cmdRIGHT		= 100142;
var cmdCENTER		= 100143;
var cmdFIND			= 10051;
var cmdREPLACE		= 10052;

var cmdIMPORT		= 100701;
var cmdEXPORT		= 100702;

var cmdLINK		= 100801;
var cmdIMAGE		= 100802;

var cmdSAVE			= 10090;
var cmdCANCEL		= 10091;

//Color Picker Init
var allColors = new Array("#000000", "#999999", "#66cc66", "#3399ff", "#cc00ff", "#ff0066", "#ffcc33", "#ff6633", "#66cccc", "#9999ff", "#339933", "#6666cc", "#9900cc", "#cc0066", "#cc9933", "#339999", "#3366cc", "#006666", "#003399", "#660099", "#990066", "#996600", "#666699")

//Font Picker Init
var activeFontIndex = 0;
//Font Picker Init
var activeFontNameIndex = 0;


/*  This script contains 13 translatable strings, found directly below and passed
	in by reference to the local string array found in swemessage_[lang].js	*/

//Translatablte string variables
var sPopup_cancel		="-";
var sPopup_ok			="-";
var sPopup_confirm		="-";
var sPopup_WinTitle		="-";
var sStripHTMLConfirm	="-";
var sFind_EOF			="-";
var sFind_go			="-";
var sFind_find			="-";
var sReplace_count		="-";
var sReplace_all		="-";
var sReplace_go			="-";
var sReplace_replace	="-";
var sReplace_with		="-";
var sCenter				="-";
var sLeft				="-";
var sRight				="-";
var sBold				="-";
var sCopy				="-";
var sCut				="-";
var sExportHTML			="-";
var sFindReplace		="-";
var sItalic				="-";
var sImage				="-";
var sImportHTML			="-";
var sIndent				="-";
var sLink				="-";
var sOrderedList		="-";
var sOutdent			="-";
var sPaste				="-";
var sUnderline			="-";
var sUnorderedList		="-";
var sFontColor			="-";
var sStripHTML	   	="-";

//HTML Editor Component Strings
var HTML_COLOR_PICKER_BTN="";
var HTML_COLOR_PICKER_CHIP="";
var HTML_FIND_POP="";
var HTML_FIND_PANEL="";
var HTML_FINDREPLACE_PANEL="";
var HTML_FONTSIZEPICKER="";
var HTML_BTN_OK="";
var HTML_BTN_CANCEL="";

//string init flag
var rtcStringsInitialized = false;

/* called by the openRTCEditor* functions 
	fetches strings if the rtcStringsInitialized flag is false*/
function initRTCStrings()
{	if (rtcStringsInitialized == false)
	{	
		//acquire handle to translatable string function
		var appObj = (isRTCPopup)?window.opener:this.parent;
		
		//HI mode acccessor
		if (appObj!=null && appObj.SWEIsHighInteract==true)	
		{			
			/*labels and messages*/
			sPopup_cancel		=appObj.App().GetLocalString("RTCPopupCancel");
			sPopup_ok			=appObj.App().GetLocalString("RTCPopupOK");
			sPopup_confirm		=appObj.App().GetLocalString("RTCPopupConfirm");
			sPopup_WinTitle		=appObj.App().GetLocalString("RTCPopupTitle");
			sStripHTMLConfirm	=appObj.App().GetLocalString("RTCStripHtmlConfirm");
			sFind_EOF			=appObj.App().GetLocalString("RTCFindEOF");
			sFind_go			=appObj.App().GetLocalString("RTCFindGo");
			sFind_find			=appObj.App().GetLocalString("RTCFindTxt");
			sReplace_count		=appObj.App().GetLocalString("RTCReplaceCount");
			sReplace_all		=appObj.App().GetLocalString("RTCReplaceAll");
			sReplace_go			=appObj.App().GetLocalString("RTCReplaceGo");
			sReplace_replace	=appObj.App().GetLocalString("RTCReplaceTxt");
			sReplace_with		=appObj.App().GetLocalString("RTCReplaceWith");		
			
			/*alt text*/
			sCenter				=appObj.App().GetLocalString("RTCCenter");
			sLeft				=appObj.App().GetLocalString("RTCLeft");
			sRight				=appObj.App().GetLocalString("RTCRight");
			sBold				=appObj.App().GetLocalString("RTCBold");
			sCopy				=appObj.App().GetLocalString("RTCCopy");
			sCut				=appObj.App().GetLocalString("RTCCut");
			sExportHTML			=appObj.App().GetLocalString("RTCExportHTML");
			sFindReplace		=appObj.App().GetLocalString("RTCFindReplace");
			sItalic				=appObj.App().GetLocalString("RTCItalic");
			sImage				=appObj.App().GetLocalString("RTCImage");
			sImportHTML			=appObj.App().GetLocalString("RTCImportHTML");
			sIndent				=appObj.App().GetLocalString("RTCIndent");
			sLink				=appObj.App().GetLocalString("RTCLink");
			sOrderedList		=appObj.App().GetLocalString("RTCOL");
			sOutdent			=appObj.App().GetLocalString("RTCOutdent");
			sPaste				=appObj.App().GetLocalString("RTCPaste");
			sUnderline			=appObj.App().GetLocalString("RTCUnderline");
			sUnorderedList		=appObj.App().GetLocalString("RTCUL");
			sFontColor			=appObj.App().GetLocalString("RTCFontColor");		
            sStripHTML			=appObj.App().GetLocalString("RTCStripHTML");
            sStripIFRAME        =appObj.App().GetLocalString("RTCStripIFRAME");
		}
		//LI mode accessor
		else 
		{	/*use appObj as-is*/	
		
			/*labels and messages*/
			sPopup_cancel		=appObj._SWEgetMessage("RTCPopupCancel");
			sPopup_ok			=appObj._SWEgetMessage("RTCPopupOK");
			sPopup_confirm		=appObj._SWEgetMessage("RTCPopupConfirm");
			sPopup_WinTitle		=appObj._SWEgetMessage("RTCPopupTitle");
			sStripHTMLConfirm	=appObj._SWEgetMessage("RTCStripHtmlConfirm");
			sFind_EOF			=appObj._SWEgetMessage("RTCFindEOF");
			sFind_go			=appObj._SWEgetMessage("RTCFindGo");
			sFind_find			=appObj._SWEgetMessage("RTCFindTxt");
			sReplace_count		=appObj._SWEgetMessage("RTCReplaceCount");
			sReplace_all		=appObj._SWEgetMessage("RTCReplaceAll");
			sReplace_go			=appObj._SWEgetMessage("RTCReplaceGo");
			sReplace_replace	=appObj._SWEgetMessage("RTCReplaceTxt");
			sReplace_with		=appObj._SWEgetMessage("RTCReplaceWith");
						
			/*alt text*/
			sCenter				=appObj._SWEgetMessage("RTCCenter");
			sLeft				=appObj._SWEgetMessage("RTCLeft");
			sRight				=appObj._SWEgetMessage("RTCRight");
			sBold				=appObj._SWEgetMessage("RTCBold");
			sCopy				=appObj._SWEgetMessage("RTCCopy");
			sCut				=appObj._SWEgetMessage("RTCCut");
			sExportHTML			=appObj._SWEgetMessage("RTCExportHTML");
			sFindReplace		=appObj._SWEgetMessage("RTCFindReplace");
			sItalic				=appObj._SWEgetMessage("RTCItalic");
			sImage				=appObj._SWEgetMessage("RTCImage");
			sImportHTML			=appObj._SWEgetMessage("RTCImportHTML");
			sIndent				=appObj._SWEgetMessage("RTCIndent");
			sLink				=appObj._SWEgetMessage("RTCLink");
			sOrderedList		=appObj._SWEgetMessage("RTCOL");
			sOutdent			=appObj._SWEgetMessage("RTCOutdent");
			sPaste				=appObj._SWEgetMessage("RTCPaste");
			sUnderline			=appObj._SWEgetMessage("RTCUnderline");
			sUnorderedList		=appObj._SWEgetMessage("RTCUL");
			sFontColor			=appObj._SWEgetMessage("RTCFontColor");				
            sStripHTML			=appObj._SWEgetMessage("RTCStripHTML");
            sStripIFRAME        =appObj._SWEgetMessage("RTCStripIFRAME");
		}
		
		
		//compile UI widget definitions
		HTML_MINIBUTTON	=			'<table height="15" border="0" cellspacing="0" cellpadding="0"><tr>' +
									'<td BACKGROUND="../../images/btn_mid.gif" class="minibuttonOn" unselectable="on"><nobr><a href="javascript:void(0)" onclick="parent.execRTCcmd(event)" cmd="%CMD%">%LABEL%</a></nobr></td>' +
									'</tr></table>';		
	
		HTML_COLOR_PICKER_BTN =		'<div class="btnOut">' + 
									'<img id="colorPickerControl" src="../../images/rtc_txtclr.gif" class="btnOut" align="absmiddle"  ' + 
									'onmousedown="parent.BtnDwn(event);" 	onmouseup="parent.execRTCcmd(event);" ' + 
									'onmouseover="parent.BtnOvrParent(event);" 	onmouseout="parent.BtnOutParent(event);" 	cmd="cmdFONTCOLOR" ' +
									'style="background-color:%ACTIVE_COLOR%" alt="%ALT%">' +
									'<img src="../../images/%ARROW%" class="btnOut" align="absmiddle"  ' + 
									'onmousedown="parent.BtnDwn(event);" onmouseup="parent.togglePopoutPanel(this,\'colorPickerPanel\');" ' + 
									'onmouseover="parent.BtnOvrParent(event);" onmouseout="parent.BtnOutParent(event);" alt="%ALT%">' +
									'</div>';
									
		HTML_COLOR_PICKER_CHIP = 	'<td class="btnPopOut"  unselectable="on">' + 
									'<img unselectable="on" class="btnOut" src="../../images/rtc_colors.gif" align="middle" border="0" ' +
									'onmouseup="parent.setActiveColor(this,this.color);parent.execRTCcmd(event);"  ' +
									'onmouseover="parent.BtnPopOvrParent(event);" onmouseout="parent.BtnPopOutParent(event);"  onmousedown="parent.BtnPopDwn(event)" ' +
									'cmd="cmdFONTCOLOR" color="%COLOR%"  style="background-color:%COLOR%">' +
									'</td>'	
									
									
		HTML_FIND_POP =			'<div class="btnOut">' +
									'<img id="findControl" src="../../images/rtc_find.gif" class="btnOut" align="absmiddle" ' + 
									'onmousedown="parent.BtnDwn(event);" onmouseup="parent.togglePopoutPanel(this,\'find\');"  ' +
									'onmouseover="parent.BtnOvrParent(event);" onmouseout="parent.BtnOutParent(event);"  alt="%ALT%">' +
									'<img src="../../images/%ARROW%" class="btnOut" align="absmiddle"  ' + 
									'onmousedown="parent.BtnDwn(event);" onmouseup="parent.togglePopoutPanel(this,\'find\');" ' + 
									'onmouseover="parent.BtnOvrParent(event);" onmouseout="parent.BtnOutParent(event);" alt="%ALT%">' +
									'</div>';			
									
		HTML_FIND_PANEL =			'<table id="find" cellpadding="0" cellspacing="1" style="display:none;"><tr class="btnPop">' +
									'<td>' +
									'<img unselectable="on" src="../../images/spacer.gif" width="2" height="24"><img unselectable="on" src="../../images/rtc_reveal_opn_d.gif" onmousedown="parent.BtnPopDwn(event);" onmouseup="parent.togglePopoutPanel(this,\'findreplace\');" onmouseover="parent.BtnPopOvr(event)" onmouseout="parent.BtnPopOut(event)" align="absmiddle" class="btnPopOut" show="findreplace" hide="find">' +
									'<img  unselectable="on" src="../../images/spacer.gif" width="6" height="24">' +	
									'</td><td  unselectable="on" >' + sFind_find + ':</td>' + 
									'<td><input unselectable="off" id="find1" type="text" size="10" tabindex="0">&nbsp;</td>' + 
									'<td>' +
									HTML_MINIBUTTON.replace(/%LABEL%/gi, sFind_go).replace(/%CMD%/gi,"cmdFIND") +
									'</td></tr></table>';
									
									
		HTML_FINDREPLACE_PANEL =	'<table id="findreplace" cellpadding="0" cellspacing="1" style="display:none;"><tr class="btnPop">' +
									'<td>' +
									'<img  unselectable="on" src="../../images/spacer.gif" width="2" height="24"><img  unselectable="on" src="../../images/rtc_reveal_cls_d.gif" onmouseup="parent.togglePopoutPanel(this,\'find\')" onmousedown="parent.BtnPopDwn(event);" onmouseover="parent.BtnPopOvr(event)" onmouseout="parent.BtnPopOut(event)" align="absmiddle" class="btnPopOut" show="find" hide="findreplace">' +
									'<img  unselectable="on" src="../../images/spacer.gif" width="6" height="24">' +		
									'</td>' + 
									'<td  unselectable="on" >' + sReplace_replace + ':</td>' +
									'<td><input unselectable="off" id="find2" type="text" size="10"></td>' +
									'<td  unselectable="on" >&nbsp;' + sReplace_with + ':</td>' +
									'<td><input unselectable="off" id="replaceWith" type="text" size="10">&nbsp;</td>' +
									'<td>' +	
									HTML_MINIBUTTON.replace(/%LABEL%/gi, sReplace_go).replace(/%CMD%/gi,"cmdREPLACE") +
									'</td><td>&nbsp;&nbsp;&nbsp;</td>' +	 
									'<td><input unselectable="off" id="replaceAll" type="checkbox" ></td>' +	
									'<td unselectable="on" >' + sReplace_all +	'</td>' +
									'</tr></table>';	
									
									
		HTML_FONTSIZEPICKER = 	'' + 
									'<select unselectable="on" class="btn" onchange="parent.execRTCcmd(event);" cmd="cmdFONTSIZE">' +
									'<option value="2">10</option><option value="-1">--</option><option value="1">8</option><option value="2">10</option>' +
									'<option value="3">12</option><option value="4">14</option><option value="5">18</option><option value="6">24</option>' +
									'<option value="7">36</option></select>';	
									
		HTML_FONTNAMEPICKER = 	'' + 
									'<select unselectable="on" class="btn" onchange="parent.execRTCcmd(event);" cmd="cmdFONTNAME">' +
									'<option value="Arial">Arial</option><option value="-1">---------------</option><option value="Arial">Arial</option><option value="Verdana">Verdana</option>' +
									'<option value="Times New Roman">Times New Roman</option><option value="Courier">Courier</option>' +
									'</select>';										
									
		HTML_BTN_OK	=			HTML_MINIBUTTON.replace(/%LABEL%/gi, sPopup_ok).replace(/%CMD%/gi,"cmdSAVE");	
								
		HTML_BTN_CANCEL	=		HTML_MINIBUTTON.replace(/%LABEL%/gi, sPopup_cancel).replace(/%CMD%/gi,"cmdCANCEL");									
		
		HTML_ICON 			= 	'<td><span unselectable="on" class="btn" onmouseover="parent.BtnOvr(event);" onmouseout="parent.BtnOut(event);" onmouseup="parent.execRTCcmd(event);"><img class="btnOut" src="../../images/%IMG%" border="0" cmd="cmd%CMD%" alt="%ALT%"></span></td>';
		HTML_DIV 			= 	'<td><img src="../../images/rtc_div.gif" border="0" alt=""></td>';
		
		//set string init flag to true							
		rtcStringsInitialized = true;
		
	}//END IF
}																			

// Initializes the RTC Editor iFrame
// context: iFrame	
function initEditor(win)
{	
	win.document.dir = appDIR;
	
	rtcEditor_Frame = win.frames[rtcEditor_Frame_Name];
	rtcEditor_Frame.document.designMode="On";
	rtcEditor_Frame.document.open("text/html", "replace"); 	
   rtcEditor_Frame.document.write(HTML_html_open_tag);
	
   // calculate base for relative links.
   var loc = "";
        
   if (isRTCPopup) loc = window.opener.location.href;
   else                     loc = window.parent.location.href;

   if (loc.indexOf("?")!=-1) loc = loc.substr(0,loc.indexOf("?"));
   if (loc.indexOf("#")!=-1) loc = loc.substr(0,loc.indexOf("#"));
   if (loc.lastIndexOf("/")!=-1) 
   {       if (loc.lastIndexOf("/")!=(loc.length-1))
           {       loc = loc.substr(0,loc.lastIndexOf("/")+1);        }
   }
   else
   {       loc = loc + "/";
   }
        
   var base = "<base target='_blank' href='" + loc + "'>";
        
   rtcEditor_Frame.document.write(base);

	//init Popup
	if (isRTCPopup)
	{	rtcEditor_Frame.document.write(HTML_body_open_tag);
		rtcEditor_Frame.document.write(securityStrip (window.opener.activeSWEField_Obj.value));	}
	//init Embedded
	else
	{	rtcEditor_Frame.document.write(HTML_body_open_tag_embedded);
		rtcEditor_Frame.document.write(securityStrip (window.parent.activeSWEField_Obj.value));	}
	
	rtcEditor_Frame.document.write(HTML_close);	
	rtcEditor_Frame.document.close();

	//init text range
	trange = rtcEditor_Frame.document.body.createTextRange();	

	//set focus on the edit frame
	rtcEditor_Frame.focus();	
	rtcEditor_Frame.loaded=true;
}

// Shows the embedded RTC controls	
// context: main window		
function openRTCEditorEmbedded(rtc_ID)
{	//only open for editing if this field is editable
	var obj=getSWEField( rtc_ID );
	
	if (rtcIsActive==false && obj && obj.readOnly==false)
	{				
		rtcIsActive = true;
		activeRTC_ID=rtc_ID;
		touchSWEField(activeRTC_ID);
		activeSWEField_Obj = obj;
		
		//set iFrame scrollbars to no by reading the iframe HTML into memory,
		//destroying the iFrame and recomposing it with scrolling="no"
		activeRTC_Obj = rtc_doc.getElementById(rtc_ID);
		var tmp = activeRTC_Obj.outerHTML;
		var re1 = new RegExp("scrolling='auto'","gi");
		var re2 = new RegExp("<iframe ","gi");
		tmp = tmp.replace(re1,"").replace(re2,"<iframe scrolling='no' ");
		activeRTC_Obj.outerHTML=tmp;
		
		activeRTC_Frame = GetRTCFrame(rtc_ID);
		activeRTC_Frame.location = (resolveScriptsDir()+'rtcEditorEmbedded.html');
	} 
}

// Saves changes back to the SWEField and hides the embedded RTC controls	
// context: main window	
function closeRTCEditorEmbedded(rtc_ID)
{	//only post changes when this field is the active RTC
	if (rtcIsActive==true && activeRTC_ID==rtc_ID && !bNeedFocus)
	{			
		//retrieve new value & set SWE field
		saveRTCEditorEmbedded(rtc_ID);

		//disable design mode - prevents an IE 6 fault.
		var rtcEditor_Frame = GetRTCFrame(rtc_ID).frames[rtcEditor_Frame_Name];
		if (rtcEditor_Frame!=null)
		{	rtcEditor_Frame.document.designMode="Off";
		}

		//set iFrame scrollbars to auto	by reading the iframe HTML,
		//destroying the iFrame and recomposing it with scrolling="auto"	
		activeRTC_Obj = rtc_doc.getElementById(rtc_ID);
		var tmp = activeRTC_Obj.outerHTML;
		var re1 = new RegExp("scrolling='no'","gi");
		var re2 = new RegExp("<iframe ","gi");
		tmp = tmp.replace(re1,"").replace(re2,"<iframe scrolling='auto' ");
		activeRTC_Obj.outerHTML=tmp;
				
		//display new value in the RTC iFrame
		activeRTC_Frame = GetRTCFrame(rtc_ID);
		activeRTC_Frame.document.open("text/html", "replace"); 
		activeRTC_Frame.document.write( HTML_open_embedded + securityStrip (getSWEField( activeRTC_ID ).value) + HTML_close);
		activeRTC_Frame.document.close();
		
		//since we destroyed and recreated the rtcFrame we need to 
		//reinitialize the sweSpan object so that it retains a valid handle to the rtcFrame
		setOnPropertyChangeHandlers(rtc_ID,RTC_MODE_EMBEDDED);
		
		doCleanup();
	}
}

// Saves changes back to the SWEField and hides the embedded RTC controls	
// context: main window	
function saveRTCEditorEmbedded(rtc_ID)
{	//only post changes when this field is the active RTC
	if (rtc_ID=="")	rtc_ID = activeRTC_ID;
	if (rtcIsActive==true && activeRTC_ID==rtc_ID)
	{			
		//retrieve new value & set SWE field
		var rtcEditor_Frame = GetRTCFrame(rtc_ID).frames[rtcEditor_Frame_Name];
		if (rtcEditor_Frame!=null)
		{			
			var newSWEField_Value = rtcEditor_Frame.document.body.innerHTML;
		
			setSWEField(rtc_ID, newSWEField_Value);
		}
	}
}

// Saves changes back to the SWEField and hides the embedded RTC controls	
// context: main window	
function updateRTCEditorEmbedded(rtc_ID,value)
{	//only post changes when this field is the active RTC
	if (rtc_ID=="")	rtc_ID = activeRTC_ID;
	if (rtcIsActive==true && activeRTC_ID==rtc_ID)
	{	if (value != activeRTC_Frame.document.body.innerHTML)
		{	activeRTC_Frame.document.body.innerHTML = value;
			activeRTC_Frame.document.selection.empty();
		}
	}
}

// Launches the RTC Editor in popup mode
// context: main window
function openRTCEditorPopup(rtc_ID)
{		
	rtcIsActive = true;
	activeRTC_ID=rtc_ID; 
	touchSWEField(activeRTC_ID);
	activeSWEField_Obj = getSWEField( activeRTC_ID );
	activeRTC_Frame = GetRTCFrame(rtc_ID);	
	var w = window.open("rtcEditorPopup.html", "", "resizable,width=700,height=500");	
}

// Saves change into SWEField in main window and closes popup window
// context: iFrame
function closeRTCEditorPopup() 
{	
	saveRTCEditorPopup();			
	window.opener.doCleanup();			
	this.close();
}

// Saves change into SWEField in main window
// context: iFrame
function saveRTCEditorPopup() 
{	
	var newSWEField_Value = rtcEditor_Frame.document.body.innerHTML;
	window.opener.setSWEField(window.opener.activeRTC_ID, newSWEField_Value);
	window.opener.activeRTC_Frame.document.open("text/html", "replace");
	window.opener.activeRTC_Frame.document.write(HTML_open + securityStrip (newSWEField_Value) + HTML_close);
	window.opener.activeRTC_Frame.document.close();			
}

// Updates into SWEField in main window
// context: iFrame
function updateRTCEditorPopup(value) 
{	
	if (value!=rtcEditor_Frame.document.body.innerHTML)
	{	rtcEditor_Frame.document.body.innerHTML = value;
		rtcEditor_Frame.document.selection.empty();
		saveRTCEditorPopup();
	}
}

// clears pointers to the active RTC
// context: main window
function doCleanup()
{	activeSWEField_Obj = null;	
	activeRTC_Obj = null;	
	activeRTC_Frame = null;	
	activeRTC_Popup = null;	
	activeRTC_ID="";
	rtcIsActive = false;	
	rtcEditor_Frame=null;
	trange=null;
}

// Executes editing commands depending on which button has been pushed
// context: iFrame
function execRTCcmd(et)
{
	// get requested action via the event target's custom property 'cmd'
	var obj = et.srcElement;
	var text = obj.cmd; 				
	var cmd = eval("window." + text);

   switch ( cmd )
   {

      case cmdUL:
      case cmdOL:
      case cmdINDENT:
      case cmdOUTDENT:
      case cmdLEFT:	
      case cmdRIGHT:
      case cmdCENTER:
         if (rtcEditor_Frame.document.selection.type == 'None')
         {   
            var tr = rtcEditor_Frame.document.selection.createRange ();
            if (tr.moveEnd ("character",1)==0)
               tr.moveStart ("character",-1);
            tr.select ();
         }
          
         break;
   }
	
	//perform requested action
	switch ( cmd )
	{	
		//text edit methods
		case 10001: //cmdBOLD:
			rtcEditor_Frame.document.execCommand("Bold");
			break;
		case 10002: //cmdITALIC:
			rtcEditor_Frame.document.execCommand("Italic");
			break;		
		case 10003: //cmdUNDERLINE:
			rtcEditor_Frame.document.execCommand("Underline");
			break;		
		case 10004: //cmdUL:
			rtcEditor_Frame.document.execCommand("InsertUnorderedList");
			break;		
		case 10005: //cmdOL:
			rtcEditor_Frame.document.execCommand("InsertOrderedList");
			break;		
		case 10006: //cmdFONTSIZE:
			//check that selection is a valid choice, not a div
			if (obj.options[obj.selectedIndex].value>-1)
			{	rtcEditor_Frame.document.execCommand("FontSize",false,obj.options[obj.selectedIndex].value);
				//update drop-down to add active font size to the first position of the drop-down
				activeFontIndex = obj.selectedIndex;
				obj.options[0].text = obj.options[activeFontIndex].text;
				obj.options[0].value = obj.options[activeFontIndex].value;
				obj.selectedIndex=0;
			} else //this is a div so return selection to the previously active selection
			{	obj.selectedIndex=activeFontIndex;	}
			break;		
		case 100065: //cmdFONTNAME:
			//check that selection is a valid choice, not a div
			if (obj.options[obj.selectedIndex].value!="-1")
			{	rtcEditor_Frame.document.execCommand("FontName",false,obj.options[obj.selectedIndex].value);
				//update drop-down to add active font name to the first position of the drop-down
				activeFontNameIndex = obj.selectedIndex;				
				obj.options[0].text = obj.options[activeFontNameIndex].text;
				obj.options[0].value = obj.options[activeFontNameIndex].value;
				obj.selectedIndex=0;
			} else //this is a div so return selection to the previously active selection
			{	obj.selectedIndex=activeFontNameIndex;	}
			break;				
		case 10007: //cmdFONTCOLOR:
			rtcEditor_Frame.document.execCommand("ForeColor",false,activeColor);
			break;	
		case 10008: //cmdINDENT:
			rtcEditor_Frame.document.execCommand("Indent");     
			break;
		case 10009: //cmdOUTDENT:
			rtcEditor_Frame.document.execCommand("Outdent");
			break;
		case 10010: //cmdCUT:
			rtcEditor_Frame.document.execCommand("Copy");
			rtcEditor_Frame.document.selection.createRange().pasteHTML("");
			break;
		case 10011: //cmdCOPY:
			rtcEditor_Frame.document.execCommand("Copy");
			break;			
		case 10012: //cmdPASTE:
			rtcEditor_Frame.document.execCommand("Paste");
			break;			
		case 10013: //cmdDELETE:
			rtcEditor_Frame.document.execCommand("Delete");
			break;	
			
		case 100141: //cmdLeft:
			rtcEditor_Frame.document.execCommand("JustifyLeft");
			break;			
		case 100142: //cmdRight:
			rtcEditor_Frame.document.execCommand("JustifyRight");
			break;							
		case 100143: //cmdLeft:
			rtcEditor_Frame.document.execCommand("JustifyCenter");
			break;									
			
		case 10050: //cmdCREATELINK
			rtcEditor_Frame.document.execCommand("CreateLink");
			break;	
				
				
		//Find & Replace Methods			
		case 10051: //cmdFind
                        //qin li, CR#:12-CDJ7U7 
			findText(activeRTC_Frame.find1.value)
			break;
		case 10052: //cmdFindReplace	
			// qin li, CR#:12-CDJ7U7      
			replaceText(activeRTC_Frame.find2.value,activeRTC_Frame.replaceWith.value,activeRTC_Frame.replaceAll.checked)
			break;
			
		//Import & Export Calling Methods			
		case 100701: //cmdImport
			rtc_importHTML();
			break;
		case 100702: //cmdExport	
			rtc_exportHTML();
			break;			

		//Link & Graphics Pick List Methods
		case 100801: //cmdLINK
			rtcMarkSelection(rtcEditor_Frame.document,RTC_LINK_INSERTION_POINT);
			if (isRTCPopup) 
			{	window.opener.saveRTCEditorPopup();
			} else {
				window.parent.saveRTCEditorEmbedded("");
			}
			rtc_doc.parentWindow.rtcSelectLink();
			if (isRTCPopup) 
			{	if (window.opener.activeSWEField_Obj!=null) window.opener.closeRTCEditorPopup();
			} else {
				if (window.parent.activeSWEField_Obj!=null) window.parent.closeRTCEditorEmbedded(window.parent.activeRTC_ID);
			}
			break;
		case 100802: //cmdIMAGE
			rtcMarkSelection(rtcEditor_Frame.document,RTC_GRAPHIC_INSERTION_POINT);
			if (isRTCPopup) 
			{	window.opener.saveRTCEditorPopup();
			} else {
				window.parent.saveRTCEditorEmbedded("");
			}
			rtc_doc.parentWindow.rtcSelectImage();
			if (isRTCPopup) 
			{	if (window.opener.activeSWEField_Obj!=null) window.opener.closeRTCEditorPopup();
			} else {
				if (window.parent.activeSWEField_Obj!=null) window.parent.closeRTCEditorEmbedded(window.parent.activeRTC_ID);
			}
			break;
	
		//Popup commit methods	
		case 10090: //cmdSAVE:
			closeRTCEditorPopup(rtcEditor_Frame);
			break;	
		case 10091: //cmdCANCEL:
			var proceed = SWEConfirm(sPopup_confirm);
			if (proceed) 
			{	window.opener.doCleanup(); window.close();  	}			
			break;							
	}
}

//Non-supported browsers only: strips the HTML tags from the field value
function stripHTMLTags(rtc_ID)
{
// This has already been done in initRTCStrings
//	sStripHTMLConfirm	=this.App().GetLocalString("RTCStripHtmlConfirm");

	var proceed = rtc_doc.parentWindow.confirm(sStripHTMLConfirm,"");
	if (proceed==true)
	{	
		frmLen=rtc_doc.forms.length;
		targetField=null;
		for (var i=0;i<frmLen;i++)
		{	fldLen = rtc_doc.forms[i].elements.length;
			for (var j=0;j<fldLen;j++)
			{
				if(rtc_doc.forms[i].elements[j].name==rtc_ID+"Hidden")
				{	//if we find the rtc hidden field then 
					//the textarea we are interested in is the 
					//one directly before it(j-1)
					sweFld = rtc_doc.forms[i].elements[j-1];
					if (sweFld)
					{	var str = sweFld.value;
					
						var re1 = new RegExp("<>","gi");
						var re2 = new RegExp("<br>","gi");
						var re3 = new RegExp("<p>","gi");
						var re4 = new RegExp("<[^ ][^>]*>","gi");
						var re5 = new RegExp("&lt;&gt;","gi");
						var re6 = new RegExp("&nbsp;","gi");
						var re7 = new RegExp("&amp;","gi");

						
						var strippedStr = str.replace(re1,"&lt;&gt;").replace(re2,"\r\n").replace(re3,"\r\n\r\n").replace(re4,"").replace(re5,"<>").replace(re6," ").replace(re7,"&");
						
						//acquire handle to HI mode prop
						if (this.SWEIsHighInteract  && this.SWEIsHighInteract==true)
						{	//HI mode handler: fire events manually
							evalSWEHandler( sweFld, "onfocus",  sweFld.onfocus  ); //eval(sweFld.onfocus+"anonymous()");
							sweFld.value = strippedStr;
							evalSWEHandler( sweFld, "onchange", sweFld.onchange ); //eval(sweFld.onchange+"anonymous()");
							evalSWEHandler( sweFld, "onblur",   sweFld.onblur   ); //eval(sweFld.onblur+"anonymous()");
						}
						else
						{	//SI mode handler
							sweFld.value = strippedStr;		}
						
						
					}
					//our work is done so break out of both loops	
					break;break; 
				}//end if	
			}//end for j
		}//end for i
	}//end if proceed	
}

// context: iFrame
function BtnDwn(et)	{	et.srcElement.className = "btnDwn";}


// context: iFrame
function BtnUp(et)	{	et.srcElement.className = "btnUp";}

// context: iFrame
function BtnOvr(et) { et.srcElement.className = "btnOvr"; }
function BtnOvrParent(et)
{
   BtnOvr(et);
	et.srcElement.parentElement.className = "btnOvr";
}

// context: iFrame
function BtnOut(et) { et.srcElement.className = "btnOut"; }
function BtnOutParent(et)
{
   BtnOut(et);
	et.srcElement.parentElement.className = "btnOut";
}

// context: iFrame
function BtnPopOvr(et)		{	et.srcElement.className="BtnPopOvr";	}
function BtnPopOvrParent(et)	{	BtnPopOvr(et);
								et.srcElement.parentElement.className="BtnPopOvr";	}

// context: iFrame
function BtnPopOut(et)		{	et.srcElement.className="BtnPopOut";	}
function BtnPopOutParent(et)	{	BtnPopOut(et);
								et.srcElement.parentElement.className="BtnPopOut";	}

// context: iFrame
function BtnPopDwn(et){	et.srcElement.className="BtnPopDwn";	}

//maintains an array of all popout panels
function registerAsPopoutPanel(win,name)	{	win.document.allPopoutPanels[win.document.allPopoutPanels.length] = name;	}

//active panel accessor methods
function setActivePopoutPanel(win,name)		{	win.document.activePopoutPanel = name;		}
function getActivePopoutPanel(win)			{	return	win.document.activePopoutPanel;	}

/*hides or shows the named panel; hides all other panels*/
function togglePopoutPanel(win,panel)
{	var showOurPanel=false;
	//determine if our panel is the active panel; if it is it should be hidden
	if (getActivePopoutPanel(win)==panel)
	{	showOurPanel=false; setActivePopoutPanel(win,"");

		/*give the height of our panel back to the edit frame*/
		var height = win.document.all["editFrame"].offsetHeight + win.document.all[panel].offsetHeight;		
		win.document.all["editFrame"].height = height;
		win.document.all["editFrame"].style.height = height; // necessary in some cases.
	}
	else 
	{	showOurPanel=true;	
		prevPanelH = (getActivePopoutPanel(win)!="")?win.document.all[getActivePopoutPanel(win)].offsetHeight:0;
		setActivePopoutPanel(win,panel);

		win.document.all[ panel ].style.display="block";

		/*make room for our panel by adding back the height of the previous panel to the height of the edit frame and 
			removing the height of our panel from the height of the edit frame	*/
		var height = win.document.all["editFrame"].offsetHeight + prevPanelH - win.document.all[panel].offsetHeight;
		win.document.all["editFrame"].height = height;
		win.document.all["editFrame"].style.height = height; // necessary in some cases.
	}
	
	//hide all panels except our panel
	var len = win.document.allPopoutPanels.length;
	for (var i=0;i<len;i++)
	{	if (win.document.allPopoutPanels[i] != panel || showOurPanel==false)
		{	win.document.all[ win.document.allPopoutPanels[i] ].style.display="none";	}	}
	
}

// generates the rtcEditor font-size drop-down
function createFontSizePicker()		{	return "<td>" + HTML_FONTSIZEPICKER + "</td>";	}

// generates the rtcEditor font-name drop-down
function createFontNamePicker()		{	return "<td>" + HTML_FONTNAMEPICKER + "</td>";	}

function createColorPickerControl(direction)
{	if (direction=="below")	{img="rtc_reveal_dwn.gif";}
	else 					{img="rtc_reveal_up.gif";}				
	return "<td>" + HTML_COLOR_PICKER_BTN.replace(/%ACTIVE_COLOR%/gi,activeColor).replace(/%ARROW%/gi,img).replace(/%ALT%/gi,sFontColor) + "</td>";	
}

function createColorPickerPanel(win,direction)
{
	var HTML = "";
	var len = allColors.length;
	for (var i=0;i<len; i++ )
	{	HTML += HTML_COLOR_PICKER_CHIP.replace(/%COLOR%/gi,allColors[i]); 	}
	
	HTML = '<table align="center" id="colorPickerPanel" style="display:none" cellpadding="2" cellspacing="1"><tr valign="middle" unselectable="on">' + 
			'<td><img src="../../images/spacer.gif" width="1" height="12"></td>' + HTML + '</tr></table>';
			
	registerAsPopoutPanel(win,"colorPickerPanel");		
	
	return HTML;
}

//Once a color is picked this function stores the value and hides the color picker panel
function setActiveColor(win,color)
{	activeColor = color;
	win.document.all['colorPickerControl'].style.backgroundColor=activeColor;
	togglePopoutPanel(win,'colorPickerPanel');	}


/*----------------------*/
/*---Find/Replace Code--*/
/*----------------------*/

//Find & Replace Widget Constructors
function createFindReplaceControl(direction) 
{	if (direction=="below")	{img="rtc_reveal_dwn.gif";}
	else 					{img="rtc_reveal_up.gif";}		
	return "<td>" +	HTML_FIND_POP.replace(/%ARROW%/gi,img).replace(/%ALT%/gi,sFindReplace)	+"</td>";		
}

function createFindReplacePanel(win,direction)
{		
	registerAsPopoutPanel(win,"find");		
	registerAsPopoutPanel(win,"findreplace");	
	return (HTML_FIND_PANEL + HTML_FINDREPLACE_PANEL);
}

/* Find & Replace Functions*/
function findText(str1)
{	if (str1.length==0) return;
	var found=trange.findText(str1);
	if (found==true)	{	trange.select();	trange.collapse(false);	}
	else {	//reset the text range to the full range
			trange.expand("textedit");
                        SWEAlert(sFind_EOF, rtc_doc.parentWindow);        }
}

function replaceText(str1,str2,globalReplace)
{	
	if (str1.length==0) return;	
	var count=0;
	trange.expand("textedit"); //reset text range to the full range
	var found=trange.findText(str1);
	if (trange && found==true)
	{	found=true; trange.select(); trange.text = str2;	count++;	}
	
	while (trange && found==true && globalReplace==true)
	{	found=trange.findText(str1);
		if (found==true)
		{	trange.select(); trange.text = str2; trange.collapse(false); count++;	}
		else
		{	//reset the text range to the full range
			trange.expand("textedit");
                        SWEAlert( sReplace_count.replace("%1",count), rtc_doc.parentWindow ); }
	}
}

function createIcon(img,cmd,alt)
{	return HTML_ICON.replace(/%IMG%/gi,img).replace(/%CMD%/gi,cmd).replace(/%ALT%/gi,alt);		}

function createDiv()
{	return HTML_DIV;		}

function resolveScriptsDir()
{	//resolve scripts directory
		//1. get a handle to the current document's script array
		var scriptDir="";
		var scriptArray = this.document.scripts;
		//2. find the src value of the scripts element that contains rtceditor.js
		for (var i=0;i < scriptArray.length;i++)
		{	var path=scriptArray[i].src;
			if (path.toLowerCase().indexOf("rtceditor.js")>-1)
			{	//3. parse this string to determine the path to the scripts directory
				var pos = path.lastIndexOf("/");
				if (pos>-1)	
				{	scriptDir=path.slice(0,pos+1);
					break; }
			}			
		}		
		return scriptDir;
}


/*--------------------------------------------------------------------------*/
/*---RTC Add-on Functionality: Import & Export------------------------------*/
/*--------------------------------------------------------------------------*/

var launchpadEnabled=false;
function rtc_writeLaunchPad(doc)
{	
	rtc_doc = doc;
	if (launchpadEnabled==false && rtc_brwsr>=ie5 && isMac==false)
	{	var objectTag='<OBJECT id="siebelhtmlEditorLaunch" width="1" height="1" border="0" codeBase="'+resolveAppletDir()+'siebelhtmlEditorLaunch.cab#version=1,0,0,0" classid="CLSID:727BEA23-42BE-4B46-9D2C-11521BF55940"><PARAM NAME="_ExtentX" VALUE="159"><PARAM NAME="_ExtentY" VALUE="159"></OBJECT>';
		rtc_doc.write(objectTag);	
		launchpadEnabled=true;	}
}

function rtc_exportHTML()
{	var appObj = (isRTCPopup)?window.opener:this.parent;
	if (appObj.launchpadEnabled)
	{	var objLaunch = new ActiveXObject("siebelhtmlEditorLaunch.shtmlLnchCtrl"); 
		var rtcEditor_Frame = GetRTCFrame(activeRTC_ID).frames[rtcEditor_Frame_Name];
		var HTML=rtcEditor_Frame.document.body.innerHTML;
		var ret = objLaunch.ExportHTMLAndLaunchEditor(HTML);
		delete objLaunch;	
	}
}

function rtc_importHTML()
{	var appObj = (isRTCPopup)?window.opener:this.parent;
	if (appObj.launchpadEnabled)
	{
		appObj.bNeedFocus=true;
		bNeedFocus=true;	
		var objLaunch = new ActiveXObject("siebelhtmlEditorLaunch.shtmlLnchCtrl");
		var HTML = objLaunch.ImportHTML();
		if (objLaunch.importCancelled != 1)
		{
			var rtcEditor_Frame = GetRTCFrame(activeRTC_ID).frames[rtcEditor_Frame_Name];
			updateRTCFrame(rtcEditor_Frame, HTML, GetRTCFrame(activeRTC_ID).rtcMode); //rtcEditor_Frame.document.body.innerHTML=HTML;

		}
		delete objLaunch;
		appObj.bNeedFocus=false;
		bNeedFocus=false;	
	}
}
	
// determines the path to SWE generated applets directory (for CABs/JARs files)
function resolveAppletDir()
{	//resolve scripts directory
		//1. get a handle to the current document's script array
		var scriptDir="";
		var appletDir="";
		var scriptArray = this.document.scripts;
		//2. find the src value of the scripts element that contains rtceditor.js
		for (var i=0;i < scriptArray.length;i++)
		{	var path=scriptArray[i].src;
			if (path.toLowerCase().indexOf("rtceditor.js")>-1)
			{	//3. parse this string to determine the path to the scripts directory
				var pos = path.lastIndexOf("/");
				if (pos>-1)	
				{	scriptDir=path.slice(0,pos+1);
					appletDir=scriptDir.replace(/SCRIPTS/gi,"applets");
					break;				}
			}			
		}		
		return appletDir;
}

/*--------------------------------------------------------------------------*/
/*---RTC Add-on Functionality: Link & Image Dialogs-------------------------*/
/*--------------------------------------------------------------------------*/
var rtc_link_image_dialogs_Enabled=false;
var rtc_link_dialogs_Available=false;
var rtc_image_dialogs_Available=false;

// makes the RTC link button available if enabled.
function setRTCLinkDialogAvailable()
{	rtc_link_dialogs_Available=true;
}

// makes the RTC image button available if enabled.
function setRTCImageDialogAvailable()
{	rtc_image_dialogs_Available=true;
}

// wraps the unidentified SWEField in a span which 
// enables us to hide the SWEField at runtime 
// context: main window
function createRTCLinkCtl(type,doc)
{
   rtc_doc = doc;
	
	//NS, IE4 and other browsers cannot support the RTC Editor Link Button
        //modified if-test because DIR structure not supported on Mac IE5
	if (rtc_brwsr<=ie4 || isMac) {rtc_link_image_dialogs_Enabled = false;}
	//due to an onblur bug with iFrame ie5 can only support the RTC Editor as a popup
	//since the popup would disappear when the link dialog popup was invoked, 
	//disable the feature with ie5 
	else if (rtc_brwsr >= ie5 && rtc_brwsr < ie5_5)	{rtc_link_image_dialogs_Enabled = false;}
	//ie5.5+ 
	else if (rtc_brwsr >= ie5_5)	{rtc_link_image_dialogs_Enabled = true;}	

	//create the component - do nothing in text mode.	
        if (rtc_link_image_dialogs_Enabled)
	{	switch (type)
		{ 	case 0:	//open SWE Field wrapper
				rtc_doc.write ("<span unselectable='on' style='display:visible;position:absolute;top:-5000;'>");		
				break;
			case 1:	//close SWE Field wrapper
				rtc_doc.write ("</span>");
				break;
		}
	}	
}

function rtcMarkSelection(doc,marker)
{
	var a     = doc.anchors;
	var len   = a.length;
	var i     = 0;
        
	// Filter any old bookmarks.
	for (i = 0; i < len; i++)
	{	if (a[i].name == RTC_LINK_INSERTION_POINT)
		{	a[i].outerHTML = a[i].innerHTML;	}
		else if (a[i].name == RTC_GRAPHIC_INSERTION_POINT)
		{	a[i].outerHTML = a[i].innerHTML;	}
        }
	
	// Insert a bookmark.	
	if (marker==RTC_LINK_INSERTION_POINT)
	{	if (doc.selection.type == 'None')
		{	var tr = doc.selection.createRange ();
			if (tr.moveEnd ("character",1)==0)
				tr.moveStart ("character",-1);
			tr.select ();
		}
		doc.execCommand("CreateBookmark",false,marker);
	} 
	else 
	{	doc.execCommand("InsertImage",false,marker);
		doc.selection.empty();
	}
}

function createEm()
{
   var appObj = (isRTCPopup)?window.opener:this.parent;
	var HTML = 	createFindReplaceControl();						
				
	HTML +=(appObj.launchpadEnabled)?createDiv():"";
	HTML +=(appObj.launchpadEnabled)?createIcon("rtc_import_d.gif",	"IMPORT", sImportHTML):""; 
	HTML +=(appObj.launchpadEnabled)?createIcon("rtc_export_d.gif",	"EXPORT", sExportHTML):"";
														
	HTML +=(appObj.rtc_link_image_dialogs_Enabled && (appObj.rtc_link_dialogs_Available || appObj.rtc_image_dialogs_Available))?createDiv():"";
	HTML +=(appObj.rtc_link_image_dialogs_Enabled && appObj.rtc_link_dialogs_Available)?createIcon("rtc_link.gif", "LINK", sLink):""; 
	HTML +=(appObj.rtc_link_image_dialogs_Enabled && appObj.rtc_image_dialogs_Available)?createIcon("rtc_image.gif", "IMAGE", sImage):"";
					
	HTML += createDiv()+
			createIcon("rtc_cut.gif",		"CUT",	sCut)       +
			createIcon("rtc_copy.gif",		"COPY",	sCopy)      +
			createIcon("rtc_paste.gif",		"PASTE", sPaste)	+												
			createDiv()                                         +
			createFontNamePicker()                              +
			createFontSizePicker()                              +	
			createColorPickerControl()                          +
			createDiv()                                         +
			createIcon("rtc_b.gif",			"BOLD", sBold)           +
			createIcon("rtc_i.gif",			"ITALIC", sItalic)       +
			createIcon("rtc_u.gif",			"UNDERLINE", sUnderline) +
			createDiv()                                         +
			createIcon("rtc_ol_d.gif",		"OL", sOrderedList)      +
			createIcon("rtc_ul_d.gif",		"UL", sUnorderedList)    +
			createIcon("rtc_indent_d.gif",	"INDENT", sIndent)       +
			createIcon("rtc_outdent_d.gif",	"OUTDENT", sOutdent)     +
			createDiv()                                         +
			createIcon("rtc_align_l_d.gif",	"LEFT", sLeft)           +
			createIcon("rtc_align_c.gif",	"CENTER", sCenter)       +
			createIcon("rtc_align_r_d.gif",	"RIGHT", sRight);

	return HTML;
}

function createPop()
{
   var appObj = (isRTCPopup)?window.opener:this.parent;
	var HTML = 	createFindReplaceControl("below");						
				
	HTML +=(appObj.launchpadEnabled)?createDiv():"";
	HTML +=(appObj.launchpadEnabled)?createIcon("rtc_import_d.gif",	"IMPORT", sImportHTML):""; 
	HTML +=(appObj.launchpadEnabled)?createIcon("rtc_export_d.gif",	"EXPORT", sExportHTML):"";
														
	HTML +=(appObj.link_image_dialogs_Enabled)?createDiv():"";
	HTML +=(appObj.link_image_dialogs_Enabled)?createIcon("rtc_link.gif",	"LINK",  sLink):""; 
	HTML +=(appObj.link_image_dialogs_Enabled)?createIcon("rtc_image.gif",	"IMAGE", sImage):"";
					
	HTML += createDiv()+
			createIcon("rtc_cut.gif",		"CUT",	sCut)       +
			createIcon("rtc_copy.gif",		"COPY",	sCopy)      +
			createIcon("rtc_paste.gif",		"PASTE", sPaste)	+												
			createDiv()                                         +
			createFontNamePicker()                              +
			createFontSizePicker()                              +	
			createColorPickerControl("below")                   +
			createDiv()                                         +
			createIcon("rtc_b.gif",			"BOLD", sBold)           +
			createIcon("rtc_i.gif",			"ITALIC", sItalic)       +
			createIcon("rtc_u.gif",			"UNDERLINE", sUnderline) +
			createDiv()                                         +
			createIcon("rtc_ol_d.gif",		"OL", sOrderedList)      +
			createIcon("rtc_ul_d.gif",		"UL", sUnorderedList)    +
			createIcon("rtc_indent_d.gif",	"INDENT", sIndent)       +
			createIcon("rtc_outdent_d.gif",	"OUTDENT", sOutdent)     +
			createDiv()                                         +
			createIcon("rtc_align_l_d.gif",	"LEFT", sLeft)           +
			createIcon("rtc_align_c.gif",	"CENTER", sCenter)       +
			createIcon("rtc_align_r_d.gif",	"RIGHT", sRight);	

   return HTML;
}

// selectively strips content for security purposes.
function securityStrip (HTML)
{
   HTML = stripIFRAME (HTML);
   return HTML;
}
 
// replaces IFRAME tags with HTML special characters
// to display as literal text instead of as a frame.
function stripIFRAME (HTML)
{
   var msg = "<br><br>--- " + sStripIFRAME + " ---<br>"
 
   // $1: IFRAME tag.
   var regexIFRAME = /<(\/?IFRAME(\s[^>]*)?)>/ig;

   if (regexIFRAME.test (HTML))
      HTML = HTML.replace (regexIFRAME, msg + "&lt$1&gt<br><br>");

   return HTML;
}

function setDirection ()
{   
   if (!isMac && rtc_brwsr >= ie5 && rtc_doc.dir.toLowerCase() == "rtl")
   {
      appDIR = 'rtl';
      htmlDIR = '<html dir="rtl">';

      HTML_html_open_tag = htmlDIR;
      HTML_open = htmlDIR + "<base target='_blank'>" + HTML_body_open_tag;
      HTML_open_embedded = htmlDIR + "<base target='_blank'>" + HTML_body_open_tag_embedded;
      HTML_open_read_only = htmlDIR + "<base target='_blank'><body style='font-family:arial,helvetica; font-size:x-small; margin:2 2 2 2; background-color:#f0f0f0'>";

      HTML_FONTSIZEPICKER = '' + 
                            '<select dir="rtl" unselectable="on" class="btn" onchange="parent.execRTCcmd(event);" cmd="cmdFONTSIZE">' +
                            '<option value="2">10</option><option value="-1">--</option><option value="1">8</option><option value="2">10</option>' +
                            '<option value="3">12</option><option value="4">14</option><option value="5">18</option><option value="6">24</option>' +
                            '<option value="7">36</option></select>';	
		     
      HTML_FONTNAMEPICKER = '' + 
                            '<select dir="rtl" unselectable="on" class="btn" onchange="parent.execRTCcmd(event);" cmd="cmdFONTNAME">' +
                            '<option value="Arial">Arial</option><option value="-1">---------------</option><option value="Arial">Arial</option><option value="Verdana">Verdana</option>' +
                            '<option value="Times New Roman">Times New Roman</option><option value="Courier">Courier</option>' +
                            '</select>';										
		
   }
}