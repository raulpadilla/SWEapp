//////////////////////////////////////////////////////////////////////////////
//
// Copyright (c) 2003, Siebel Systems, Inc., All rights reserved.
//
// FILE:       navctrl.js
//  $Revision:  $
//      $Date:  $
//    $Author:  $ of last update
//
// CREATOR:    Laxman Chinnakotla
//
//  OWNER HISTORY
//    OWNER                START DATE
//    --------             ----------
//    Laxman Chinnakotla  
// 
// DESCRIPTION
//    
// JavaScript Functions used in screenbr, viewbar and subviewbar
// jumptabs (this script file gets loaded into the SWE container)
//
//  CHANGE LOG <maintained by source control, one-line check-out comment
//              inserted automatically (editable), last N comments listed>
//    AUTHOR      DATE      COMMENT
//    ----------  --------  ---------------------------------------------
//
//////////////////////////////////////////////////////////////////////////////

function JSSNavCtrl ()
{
   this.navtabid = 0;                 // nav control tab id for scrolling purposes.
   this.actvtb = 0;                   // active screen tab only set in Activate and SetScreen            
   this.vbmxtb = 0;                   // variable that contains the max left handside tab id.
   this.sweCnt = 0;
   this.prefix = "";                  // prefix for nav ctrl document objects.
                                      // e.g., "vb" for views and "svb" for sub-views.
   this.htmltbl = null; 
   this.vtbs = null;
   this.navctrlElem = null;           // navctrl element. 
   this.timerID  = "";                // Identifier for timer events.
   this.leftjumptab = null;           // images element for right hand side left scroll.
   this.rightjumptab = null;          // images element for right hand side right scroll.
   this.lastvtb = 0;
   this.docObj = null;                // document object for the layout page.
   this.tabs_width = 0;               // width of the nav tab control.
   this.cntrlType = "";               // type: "ScreenBar", "ViewBar" or "SubViewBar".
   this.commonURL = "";               // common url part of the navigation control.
   this.navCtrlTabs = null;           // array containing nav tab properties.
   this.brecursivescroll  = false;    // controls recursive scrolling.
   this.navTxt = "";                  // The navigation text to be added before Screenbar /Viewbar links.
}

///////////////////////////////////////////////////////////////////////////////
//
//  METHOD
//    JSSNavCtrl_Initialize
//
//  METHOD TYPE
//    API Type (External/Module/Private): Module
//    Overridable? (Yes/No)             : No
//    Overrides Virtual? (Yes/No)       : No
//
//  PARAMETERS
//    cntrlType -   [in] Type of the navigation control. 
//                       Valid values are: "ScreenBar", "ViewBar" and "SubViewBar".
//    common_URL -  [in] This parameter is the URL used by all navigation control tabs. 
//    navCtrlTabs - [in] This array contains control tab pertinent information.
//    docObj -      [in] The "docObj" is the document object for the layout page. 
//
//  RETURN VALUE
//    None
//
//  DESCRIPTION
//    Initializes the JSSNavCtrl object.
//
///////////////////////////////////////////////////////////////////////////////

function JSSNavCtrl_Initialize (cntrlType, common_URL, navCtrlTabs, docObj)
{
   this.cntrlType = cntrlType;
   this.commonURL = common_URL;
   this.navCtrlTabs = navCtrlTabs;
   this.docObj = docObj;

   // for each control type determine the the prefix that is used for the
   // document elements.
   if (cntrlType == "ViewBar")
      this.prefix = "vb";
   else if (cntrlType == "ScreenBar")
      this.prefix = "sb";
   else if (cntrlType == "SubViewBar")
      this.prefix = "svb";
   else
      return;

   this.htmltbl = this.docObj.getElementById("s_" + this.prefix + "_t");
   this.vtbs = this.docObj.getElementById("s_" + this.prefix + "r");
   this.navctrlElem = this.docObj.getElementById("s_" + this.prefix);

   if (cntrlType == "ScreenBar")
      this.tabs_width = this.docObj.body.offsetWidth - 110;
   else
      this.tabs_width = this.navctrlElem.offsetWidth - 110;

   // Initialize the variables relating to left and right jumptabs.
   this.leftjumptab = this.docObj.images["s_" + this.prefix + "_l_2"];
   this.rightjumptab = this.docObj.images["s_" + this.prefix + "_r_2"];

   // The jumptab images are loaded only once in the _swescrnbar frame to reduce
   // the layout size. If the application contains no frames, the images are loaded
   // in the main page. 
   var imgDoc;
   var objFrame = SWEFindFrame(top, "_swescrnbar");
   if (objFrame != null) 
      imgDoc = objFrame.document;
   else
      imgDoc = this.docObj;

   // Initialize images that represent enabled, disabled and blank states of left and right
   // jumptabs. 
   if (cntrlType == "ScreenBar")
   {
      this.imgopn0 = this.docObj.sbIopn0;
      this.imgcls0 = this.docObj.sbIcls0; 
      this.imgopn1 = this.docObj.sbIopn1;
      this.imgcls1 = this.docObj.sbIcls1;
      this.imgopn2 = this.docObj.sbIopn2; 
      this.imgcls2 = this.docObj.sbIcls2; 
   } 
   else if (cntrlType == "ViewBar")
   {
      this.imgopn0 = imgDoc.vbIopn0;
      this.imgcls0 = imgDoc.vbIcls0; 
      this.imgopn1 = imgDoc.vbIopn1;
      this.imgcls1 = imgDoc.vbIcls1;
      this.imgopn2 = imgDoc.vbIopn2; 
      this.imgcls2 = imgDoc.vbIcls2; 
   }
   else if (cntrlType == "SubViewBar")
   {
      this.imgopn0 = imgDoc.svbIopn0;
      this.imgcls0 = imgDoc.svbIcls0; 
      this.imgopn1 = imgDoc.svbIopn1;
      this.imgcls1 = imgDoc.svbIcls1;
      this.imgopn2 = imgDoc.svbIopn2; 
      this.imgcls2 = imgDoc.svbIcls2;
   }

   // initialize the states of jumptabs.
   this.Init();
}

///////////////////////////////////////////////////////////////////////////////
//
//  METHOD
//    JSSNavCtrl_Activate
//
//  METHOD TYPE
//    API Type (External/Module/Private): Module
//    Overridable? (Yes/No)             : No
//    Overrides Virtual? (Yes/No)       : No
//
//  PARAMETERS
//    id -   [in] id of the navigation control tab.
//
//  RETURN VALUE
//    None
//
//  DESCRIPTION
//    This function sends the GotoView command to the server.
//
///////////////////////////////////////////////////////////////////////////////

function JSSNavCtrl_Activate(id)
{   
   var nid;

   // In case of screen bar, we donot use prefix because for floating
   // tabs we use insertCell call to insert the new screen tab. insertCell
   // always returns the new tab index which is just an integer numbr.
   if (this.cntrlType == "ViewBar" || this.cntrlType == "SubViewBar")
      nid = this.prefix + id;
   else
      nid = id;

   var obj = this.docObj.getElementById(nid)

   if (obj == null || this.htmltbl == null) 
      return;
   var tb = this.htmltbl.rows[0].cells;
   if (tb == null) 
      return;

   // view frame.
   var vfrm = SWEFindFrame(top, "_sweview");   
   if (vfrm == null) 
      vfrm = "_self";
   else
      vfrm = "_sweview";

   var loc;
   if (this.cntrlType == "ScreenBar")
   {
      var oldx = this.actvtb;
      // If it is not the same active tab.
      if (this.actvtb != id)
      {
         var tbx = tb[this.actvtb];
         if (tbx && this.navCtrlTabs[this.actvtb]) 
            tbx.className = "tier1Off";         
         obj.className = "tier1On";
         this.actvtb = id;
         if (bAccessibleEnhanced)
            AddRemoveScreenText(id,this.docObj,this.navTxt);
      }

      var oldloc = this.commonURL + 
                        URLEncode(this.navCtrlTabs[id].name) + "&SWEVST=-1";
      loc = oldloc.replace(/SWEC=\d*/, "SWEC="+ this.sweCnt);
      SWETargetGotoURL(loc, vfrm);
   }
   else
   {
      loc = this.navCtrlTabs[id].url + URLEncode(this.navCtrlTabs[id].name) + 
            "&SWEVST="+this.navtabid;
      SWETargetGotoURL(loc, vfrm);
   }
}

///////////////////////////////////////////////////////////////////////////////
//
//  METHOD
//    JSSNavCtrl_StopScroll
//
//  METHOD TYPE
//    API Type (External/Module/Private): Module
//    Overridable? (Yes/No)             : No
//    Overrides Virtual? (Yes/No)       : No
//
//  PARAMETERS
//    None.
//
//  RETURN VALUE
//    None
//
//  DESCRIPTION
//    This function handles the "onmouseup" event for jump tabs. 
//    Scrolling of navigation control stops when this method is invoked. 
//
///////////////////////////////////////////////////////////////////////////////
function JSSNavCtrl_StopScroll()
{
   window.clearInterval(this.timerID);
   this.timerID  = "";
   this.brecursivescroll  = false;
}

///////////////////////////////////////////////////////////////////////////////
//
//  METHOD
//    JSSNavCtrl_ScrollRight
//
//  METHOD TYPE
//    API Type (External/Module/Private): Module
//    Overridable? (Yes/No)             : No
//    Overrides Virtual? (Yes/No)       : No
//
//  PARAMETERS
//    None.
//
//  RETURN VALUE
//    None
//
//  DESCRIPTION
//    This function handles the "onmousedown" event for scroll-right jump tab. 
//    This function supports bi-directional scrolling.   
//
///////////////////////////////////////////////////////////////////////////////

function JSSNavCtrl_ScrollRight()
{
   var thisObj = this;

   if (this.docObj.dir == "rtl")
   { 	
      if (--this.navtabid < 0) 
      {
         this.navtabid = 0;  
         return;
      }
	this.htmltbl.style.left = this.Offset(this.navtabid);
   }
   else
   {
      if (this.navtabid < 0) 
         this.navtabid = 0;
      if (this.vtbs.scrollWidth == this.vtbs.scrollLeft + this.vtbs.style.pixelWidth) 
         return;
      this.navtabid += 1;
      var obj = this.htmltbl.rows(0).cells(this.navtabid);
      if (obj != null)  
         this.vtbs.scrollLeft = obj.offsetLeft;
   }

   // Calls SetControls to active/deactivate jumptab images.
   this.SetControls(); 
   // Recursively calls ScrollRight method as long as the mouse is down. When
   // the user releases the mouse, the timer is cleared and the scrolling stops. 
   var tmpFunc = function () { thisObj.ScrollRight() };  // FR 12-R1YBUZ: IE5.0 crash bug
   this.timerID = (this.brecursivescroll) ? 
                  window.setTimeout(tmpFunc, 40) : 
                  window.setTimeout(tmpFunc, 400);
   this.brecursivescroll = true;
}

///////////////////////////////////////////////////////////////////////////////
//
//  METHOD
//    JSSNavCtrl_ScrollLeft
//
//  METHOD TYPE
//    API Type (External/Module/Private): Module
//    Overridable? (Yes/No)             : No
//    Overrides Virtual? (Yes/No)       : No
//
//  PARAMETERS
//    None.
//
//  RETURN VALUE
//    None
//
//  DESCRIPTION
//    This function handles the "onmousedown" event for scroll-left jump tab. 
//    This function supports bi-directional scrolling.    
//
///////////////////////////////////////////////////////////////////////////////

function JSSNavCtrl_ScrollLeft()
{
   var thisObj = this;

   if (this.docObj.dir == "rtl")
   {
      this.navtabid += 1;
      if (this.navtabid > this.vbmxtb)
      {
        this.navtabid = this.vbmxtb; 
        return;
      }
      this.htmltbl.style.left = this.Offset(this.navtabid);
   }
   else
   {
      if (this.navtabid <= 0) 
         return;
      this.navtabid -= 1;
      if (this.navtabid < 0) 
         this.navtabid = 0;
      var obj = this.htmltbl.rows(0).cells(this.navtabid);
      if (obj != null) 
         this.vtbs.scrollLeft = obj.offsetLeft;
   }

   // Calls SetControls to active/deactivate jumptab images.
   this.SetControls(); 
   // Recursively calls ScrollLeft method as long as the mouse is down. When
   // the user releases the mouse, the timer is cleared and the scrolling stops. 
   var tmpFunc = function () { thisObj.ScrollLeft() };  // FR 12-R1YBUZ: IE5.0 crash bug
   this.timerID = (this.brecursivescroll) ? 
                  window.setTimeout(tmpFunc, 40) : 
                  window.setTimeout(tmpFunc, 400);
   this.brecursivescroll = true;
}

///////////////////////////////////////////////////////////////////////////////
//
//  METHOD
//    JSSNavCtrl_Init
//
//  METHOD TYPE
//    API Type (External/Module/Private): Module
//    Overridable? (Yes/No)             : No
//    Overrides Virtual? (Yes/No)       : No
//
//  PARAMETERS
//
//  RETURN VALUE
//    None
//
//  DESCRIPTION
//    This function is called to re-initialize the navigation control.
//
///////////////////////////////////////////////////////////////////////////////
function JSSNavCtrl_Init()
{
   if (this.htmltbl == null || this.vtbs == null) 
      return;
   this.Resize(); 
   this.MaxTab(); 
   this.SetControls();
}

///////////////////////////////////////////////////////////////////////////////
//
//  METHOD
//    JSSNavCtrl_SetControls
//
//  METHOD TYPE
//    API Type (External/Module/Private): Module
//    Overridable? (Yes/No)             : No
//    Overrides Virtual? (Yes/No)       : No
//
//  PARAMETERS
//    None.
//
//  RETURN VALUE
//    None
//
//  DESCRIPTION
//    Determines the states of jump tabs and sets appropriates images to those
//    jump tabs. Valid states are blank, enabled and disabled.     
//
///////////////////////////////////////////////////////////////////////////////

function JSSNavCtrl_SetControls()
{
   if (this.rightjumptab == null)  return;
   if (this.docObj.dir == "rtl")
   {
      if (this.htmltbl.offsetWidth <= this.vtbs.offsetWidth)
      {
         this.rightjumptab.src = this.imgopn2.src;
         this.rightjumptab.style.cursor = "default";
         this.leftjumptab.src = this.imgcls2.src;
         this.leftjumptab.style.cursor = "default";
         return;
      }   	
      if (this.navtabid == this.vbmxtb)
      {
         this.leftjumptab.src = this.imgcls0.src;
         this.leftjumptab.alt = this.imgcls0.alt;
         this.leftjumptab.style.cursor = "default";
      }
      else
      {
         this.leftjumptab.src = this.imgcls1.src;
         this.leftjumptab.alt = this.imgcls1.alt;
         this.leftjumptab.style.cursor = "hand";
      }
      if (this.navtabid<=0)	
      {
         this.rightjumptab.src = this.imgopn0.src;
         this.rightjumptab.alt = this.imgopn0.alt;
         this.rightjumptab.style.cursor = "default";
      }
      else
      {
         this.rightjumptab.src = this.imgopn1.src;
         this.rightjumptab.alt = this.imgopn1.alt;
         this.rightjumptab.style.cursor = "hand";
      }
      return;
   }

   if ((this.htmltbl != null && 
	this.htmltbl.rows[0].cells.length == 0) || 
       (this.vtbs.scrollLeft == 0 && 
        this.vtbs.scrollLeft+this.vtbs.offsetWidth >= this.vtbs.scrollWidth))
   {
      this.leftjumptab.src = this.imgopn2.src;
      this.leftjumptab.style.cursor = "default";
      this.rightjumptab.src = this.imgcls2.src;
      this.rightjumptab.style.cursor = "default";
      return;

   }

   if (this.vtbs.scrollLeft == 0)
   {
      this.leftjumptab.src = this.imgopn0.src;
      this.leftjumptab.alt = this.imgopn0.alt;
      this.leftjumptab.style.cursor = "default";
   }	
   else
   {
      this.leftjumptab.src = this.imgopn1.src;
      this.leftjumptab.alt = this.imgopn1.alt;
      this.leftjumptab.style.cursor = "hand";
   }
   if (this.vtbs.scrollLeft+this.vtbs.offsetWidth == this.vtbs.scrollWidth)
   {
      this.rightjumptab.src = this.imgcls0.src;
      this.rightjumptab.alt = this.imgcls0.alt;
      this.rightjumptab.style.cursor = "default";
   }
   else
   {
      this.rightjumptab.src = this.imgcls1.src;
      this.rightjumptab.alt = this.imgcls1.alt;
      this.rightjumptab.style.cursor = "hand";
   }
}

///////////////////////////////////////////////////////////////////////////////
//
//  METHOD
//    JSSNavCtrl_MaxTab
//
//  METHOD TYPE
//    API Type (External/Module/Private): Module
//    Overridable? (Yes/No)             : No
//    Overrides Virtual? (Yes/No)       : No
//
//  PARAMETERS
//    None.
//
//  RETURN VALUE
//    None
//
//  DESCRIPTION
//    sets the highest left hand side navigation tab id in the control. 
//    The vbmxtb variable contains the highest left hand side tab id when
//    the user has navigated to the righmost tab. 
//    For example:
//    -------------------------------------------------------------------------
//    | LeftScrl|RightScrl|vbmxtb|.....|....|...|RightMost| Leftscrl|RightScrl|
//    |Enabled  |Disabled |                     |Tab      |Enabled  |Disabled |  
//    -------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////

function JSSNavCtrl_MaxTab()
{
   var i;
   var tb = this.htmltbl.rows[0].cells;
   var size = tb.length - 1;

   if (this.docObj.dir != "rtl")
   {
      for(i = size; i>=0; i--)
      {
         if (tb[i].offsetLeft < (tb[size].offsetLeft + tb[size].offsetWidth - this.tabs_width))
            break;
      }
   }
   else
   {
      var os = 0;      
      for (i = size; i>=0; i--)
      {
         os += tb[i].offsetWidth;
         if (os >= this.tabs_width)
         {
            this.lastvtb = os - this.tabs_width;
            break;
         }
      }
   }

   this.vbmxtb = i+1;
   if (this.navtabid > this.vbmxtb)
   {
      this.navtabid = this.vbmxtb;
      if (this.docObj.dir == "rtl")
         this.htmltbl.style.left = this.Offset(this.navtabid);
   }
}

///////////////////////////////////////////////////////////////////////////////
//
//  METHOD
//    JSSNavCtrl_Offset
//
//  METHOD TYPE
//    API Type (External/Module/Private): Module
//    Overridable? (Yes/No)             : No
//    Overrides Virtual? (Yes/No)       : No
//
//  PARAMETERS
//    None.
//
//  RETURN VALUE
//    None
//
//  DESCRIPTION
//    Given the navigation tab id calculates the offsetWidth.     
//
///////////////////////////////////////////////////////////////////////////////
function JSSNavCtrl_Offset(x)
{
   if (x <= 0) 
      return 0;
   var os = 0;
   var add = 0;

   if (x == this.vbmxtb)
   {
      x--;
      add = this.lastvtb;
   }
   for (var i = 0; i < x; i++)
      os += this.htmltbl.rows(0).cells(i).offsetWidth;

   return os + add;
}

///////////////////////////////////////////////////////////////////////////////
//
//  METHOD
//    JSSNavCtrl_Resize
//
//  METHOD TYPE
//    API Type (External/Module/Private): Module
//    Overridable? (Yes/No)             : No
//    Overrides Virtual? (Yes/No)       : No
//
//  PARAMETERS
//    None.
//
//  RETURN VALUE
//    None
//
//  DESCRIPTION
//    This function is called when the frame is resized. 
//    This functions recalculates the navigation control width when the 
//    resize event happens.    
//
///////////////////////////////////////////////////////////////////////////////

function JSSNavCtrl_Resize()
{
   if (this.cntrlType == "ScreenBar")
      this.tabs_width = this.docObj.body.offsetWidth - 99;
   else
      this.tabs_width = this.navctrlElem.offsetWidth - 99;
   this.vtbs.style.pixelWidth = this.tabs_width;
}

///////////////////////////////////////////////////////////////////////////////
//
//  METHOD
//    JSSNavCtrl_ExtendTab
//
//  METHOD TYPE
//    API Type (External/Module/Private): Module
//    Overridable? (Yes/No)             : No
//    Overrides Virtual? (Yes/No)       : No
//
//  PARAMETERS
//    idx       -   [in] floating tabs ID. 
//    screenTab -   [in] tab information of the floating screen tab. 
//
//  RETURN VALUE
//    None
//
//  DESCRIPTION
//    Inserts floating screen into the screen tab navigation control.    
//
///////////////////////////////////////////////////////////////////////////////

function JSSNavCtrl_ExtendTab(idx, screenTab)
{
   this.navCtrlTabs[idx] = screenTab;
   var tb = this.htmltbl.rows[0];
   var ntab = tb.insertCell();
   
   // For the newly added tab, generate html to handle user clicks.
   ntab.noWrap = true;
   ntab.className = 'tier1On';
   ntab.id = idx;
   if(screenTab.icon == '')
   {
    if (Top().SWEIsAutomation)
    {
     ntab.innerHTML = "<a id='s_st" +idx+ "' RN='"+screenTab.name+"' UN='"+screenTab.caption+"' OT='SiebWebPageTab' href='javascript:S_ScreenBar.Activate("+idx+")'>"+screenTab.caption+"</a>";
    }
    else
    {
     ntab.innerHTML = "<a id='s_st" +idx+ "' href='javascript:S_ScreenBar.Activate("+idx+")'>"+screenTab.caption+"</a>";
    }
   }
   else
   {
    if (Top().SWEIsAutomation)
    {
     ntab.innerHTML = "<a id='s_st" +idx+ "' RN='"+screenTab.name+"' UN='"+screenTab.caption+"' OT='SiebWebPageTab' href='javascript:S_ScreenBar.Activate("+idx+")'> <img src="+screenTab.icon+" height='18' width='18' border='0' space='0' hspace='0' align='absMiddle'></img> "+screenTab.caption+"</a>";
    }
    else
    {
     ntab.innerHTML = "<a id='s_st" +idx+ "' href='javascript:S_ScreenBar.Activate("+idx+")'> <img src="+screenTab.icon+" height='18' width='18' border='0' space='0' hspace='0' align='absMiddle'></img> "+screenTab.caption+"</a>";
    }
   }

   if (bAccessibleEnhanced)
      AddRemoveScreenText(idx,this.docObj,this.navTxt);
   this.actvtb = idx;
}

///////////////////////////////////////////////////////////////////////////////
//
//  METHOD
//    JSSNavCtrl_SetScreen
//
//  METHOD TYPE
//    API Type (External/Module/Private): Module
//    Overridable? (Yes/No)             : No
//    Overrides Virtual? (Yes/No)       : No
//
//  PARAMETERS
//    screenName - [in]	Name of the screen to highlight.
//    sweCount -   [in]	SWE Count parameter value that is used in the 
//                      URL for screen and view navigations.
//    screenTab - [in]	Screen tab information of the newly activated screen.
//
//
//  RETURN VALUE
//    None
//
//  DESCRIPTION
//    This function highlights the given screen name in the screenbar 
//    navigation control. If the screen is not a part of the navigation 
//    control (floating screen tab), that screen is added to the 
//    navigation control.   
//
///////////////////////////////////////////////////////////////////////////////

function JSSNavCtrl_SetScreen(screenName, cnt, screenTab)
{
   var tbx;
   var tb = this.htmltbl.rows[0].cells;
   this.sweCnt = cnt;
      
   var oldactv = this.actvtb;
   var oldtbx = null;

   if (oldactv >= 0)
      oldtbx = tb[oldactv];

   //same active tab, no need to update
   if (oldtbx && oldtbx.className == "tier1On" && 
         this.navCtrlTabs[oldactv] && this.navCtrlTabs[oldactv].name == screenName)
      return; 

   // iterate through the screen tabs and find the activated screen tab.
   for(x=0; x < tb.length; x++)
   {
      tbx = tb[x];
      if (tbx && this.navCtrlTabs[x] && this.navCtrlTabs[x].name == screenName)
      {
         tbx.className = "tier1On";
         this.actvtb = x;   
         if (bAccessibleEnhanced)
            AddRemoveScreenText(x,this.docObj,this.navTxt);
         break;
      }
   }

   // If the screen is not part of the screen bar, we need to add the
   // screen caption (floating screen tab) to the screenbar nav control.
   if (x >= tb.length && screenTab)
   {
      if (oldtbx && this.navCtrlTabs[oldactv])
         oldtbx.className = "tier1Off";   

      // need to extend screen tab
      var caption = screenTab.caption;
      if (caption != "" && caption != null)
      {
         this.ExtendTab(x, screenTab);
         this.MaxTab();   //tabs length changes
      }
   }
   // deactivate the old screen tab.
   else if (oldtbx && this.navCtrlTabs[oldactv] && 
               this.navCtrlTabs[oldactv].name != screenName)
      oldtbx.className = "tier1Off";
 
   if (this.docObj.dir != "rtl")
   {
      // Always make sure navigation happens only upto the
      // maximum allowed left hand side tab. This allows us to 
      // show the entine screen tab width of tabs. 
      tbx = tb[x];
      var tbstId = tb[this.navtabid];
      if (tbx && tbstId &&
            (tbstId.offsetLeft > tbx.offsetLeft || 
               tbx.offsetLeft + tbx.offsetWidth - tbstId.offsetLeft > this.tabs_width))
      {
         this.navtabid = (x > this.vbmxtb) ? this.vbmxtb : x;
         tbstId = tb[this.navtabid];
      }
      if (tbstId)
         this.vtbs.scrollLeft = tbstId.offsetLeft; 
   }
   else
   {
      var stId_os = this.Offset(this.navtabid);
      var x_os = this.Offset(x);
      var xwid = 0;
      if (tb[x]) xwid = tb[x].offsetWidth;
      if (stId_os > x_os || xwid + x_os - stId_os > this.tabs_width)
         this.navtabid = (x > this.vbmxtb) ? this.vbmxtb : x;
      this.htmltbl.style.left = this.Offset(this.navtabid);
   }
   this.Init();
}

///////////////////////////////////////////////////////////////////////////////
//
//  METHOD
//    JSSNavCtrl_SetView
//
//  METHOD TYPE
//    API Type (External/Module/Private): Module
//    Overridable? (Yes/No)             : No
//    Overrides Virtual? (Yes/No)       : No
//
//  PARAMETERS
//    viewName -   [in]	Name of the view to highlight.
//    category -   [in]	type of the view. "Category" if it is a category view.
//
//  RETURN VALUE
//    None
//
//  DESCRIPTION
//    This function highlights the given view name in the viewbar 
//    navigation control. 
///////////////////////////////////////////////////////////////////////////////

function JSSNavCtrl_SetView(viewName, type)
{     
   //initialize a few globals here
   this.navtabid = 0;

   if (this.htmltbl == null || this.vtbs == null) 
      return;

   if (this.navtabid<0) 
   {    
      this.navtabid=0; 
      this.Init(); 
      return; 
   }

   var tb = this.htmltbl.rows[0].cells;
   var size = tb.length - 1;

   // If the view type is a category view.
   if (type == "category")
   {
      for (x = this.navtabid; x <= size; x++)
      {
         if (this.navCtrlTabs[x] != null && this.navCtrlTabs[x].caption == viewName)
         {
            tb[x].className = "tier3On";
            if (bAccessibleEnhanced)
               AddRemoveViewText(x,this.docObj,this.navTxt);
            break;
         }
      }
   }
   // Find the view and highlight the view tab.
   else
   {
      for (x = this.navtabid; x <= size; x++)
      {         
         if (this.navCtrlTabs[x] != null && this.navCtrlTabs[x].name == viewName)
         {
            tb[x].className = "tier3On";
            if (bAccessibleEnhanced)
               AddRemoveViewText(x,this.docObj,this.navTxt);
            break;
         }
      }
   }

   if (x > size) 
   { 
      this.Init(); 
      return; 
   }

   this.MaxTab();
   if (this.docObj.dir != "rtl")
   {
      // Always make sure navigation happens only upto the
      // maximum allowed left hand side tab. This allows us to 
      // show the entine screen tab width of tabs. 
      if (tb[this.navtabid].offsetLeft > tb[x].offsetLeft || 
            tb[x].offsetLeft - tb[this.navtabid].offsetLeft > this.tabs_width)
         this.navtabid = (x > this.vbmxtb) ? this.vbmxtb : x;
      this.vtbs.scrollLeft = tb[this.navtabid].offsetLeft;
   }

   else
   {
      var tabid_os = this.Offset(this.navtabid);
      var x_os = this.Offset(x);
      if (tabid_os > x_os || x_os - tabid_os > this.tabs_width)
         this.navtabid = (x > this.vbmxtb) ? this.vbmxtb : x;
      
      this.htmltbl.style.left = this.Offset(this.navtabid);
   }
   this.Init();
}
function JSSNavCtrl_SetScreenText (navText)
{
   this.navTxt = navText;
}

function AddRemoveScreenText(id, docObj,navText)
{
    var anchrId;
    var anchObj;
    var oldHTML;
    var newHTML;

    if (id==0)
    anchrId ='s_ScreenBar';
    else
    anchrId ='s_st' + id;
    
    var spObj = docObj.getElementById('sp_scrn');
    if (spObj != null)
    {
        spObj.parentNode.removeChild(spObj);
    }
    anchObj =docObj.getElementById(anchrId);
    if (anchObj != null)
    {
        oldHTML =anchObj.innerHTML;
        newHTML = '<SPAN id="sp_scrn" style="OVERFLOW: hidden; WIDTH: 1px; POSITION: absolute; TOP: 10px; HEIGHT: 1px">' + navText + '</SPAN>' + oldHTML;
        docObj.getElementById(anchrId).innerHTML = newHTML;
    }
}

function AddRemoveViewText(id, docObj,navText)
{
    var anchrId;
    var anchObj;
    var oldHTML;
    var newHTML;

    if (id==0)
    anchrId ='s_ViewBar';
    else
    anchrId ='s_vbt' + id;
    
    var spObj = docObj.getElementById('sp_view');
    if (spObj != null)
    {
        spObj.parentNode.removeChild(spObj);
    }
    anchObj =docObj.getElementById(anchrId);
    if (anchObj != null)
    {
        oldHTML =anchObj.innerHTML;
        newHTML = '<SPAN id="sp_view" style="OVERFLOW: hidden; WIDTH: 1px; POSITION: absolute; TOP: 10px; HEIGHT: 1px">' + navText + '</SPAN>' + oldHTML;
        docObj.getElementById(anchrId).innerHTML = newHTML;
    }
}

///////////////////////////////////////////////////////////////////////////////
new JSSNavCtrl ();

// Methods that are implemented by JSSNavCtrl class.
JSSNavCtrl.prototype.Initialize   = JSSNavCtrl_Initialize;
JSSNavCtrl.prototype.Activate     = JSSNavCtrl_Activate;
JSSNavCtrl.prototype.Init         = JSSNavCtrl_Init;
JSSNavCtrl.prototype.StopScroll   = JSSNavCtrl_StopScroll;
JSSNavCtrl.prototype.ScrollLeft   = JSSNavCtrl_ScrollLeft;
JSSNavCtrl.prototype.ScrollRight  = JSSNavCtrl_ScrollRight;
JSSNavCtrl.prototype.Offset       = JSSNavCtrl_Offset;
JSSNavCtrl.prototype.Resize       = JSSNavCtrl_Resize;
JSSNavCtrl.prototype.MaxTab       = JSSNavCtrl_MaxTab;
JSSNavCtrl.prototype.SetControls  = JSSNavCtrl_SetControls;
JSSNavCtrl.prototype.SetView      = JSSNavCtrl_SetView;
JSSNavCtrl.prototype.ExtendTab    = JSSNavCtrl_ExtendTab;
JSSNavCtrl.prototype.st_scrn      = JSSNavCtrl_SetScreen;
JSSNavCtrl.prototype.SetScreenText =JSSNavCtrl_SetScreenText;
///////////////////////////////////////////////////////////////////////////////


