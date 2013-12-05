/*****************************************************************************
*
* Copyright (C) 2001, Siebel Systems, Inc., All rights reserved.
*
* FILE:       appearance.js
*  $Revision: 2 $Date: 5/29/2001
*    $Author:
*
* CREATOR:    Ashish Singhal
*
* DESCRIPTION:
*    1. Provides access to the CSS classes defined in the included css file
*     
*****************************************************************************/


function JSSAppearance ()
{
  this.name = "";
}

function JSSAppearance_GetClass ()
{
  // only works in IE right now
  if ((navigator.appName.indexOf("Microsoft") >-1) && (parseInt(navigator.appVersion) >= 4)) 
  {
  var sheetList = document.styleSheets;
  var ruleList;
  var i, j;

  var selector = ".javaRoot";

  // check the arguments
  if (arguments.length > 0)
  {
     selector = "." + arguments[0];
  } 
 
  // look through stylesheets in reverse order that
  //   they appear in the document 
  for (i=sheetList.length-1; i >= 0; i--)
  {
    ruleList = sheetList[i].rules;
    for (j=0; j<ruleList.length; j++)
    {
      if (ruleList[j].selectorText == selector)
      {
          return ruleList[j].style;
      }   
    }
  }
  }

  return null;
}


function JSSAppearance_GetFont ()
{

  // only works in IE right now
  if ( (navigator.appName.indexOf("Microsoft")>-1) && (parseInt(navigator.appVersion) >= 4)) 
  {

  var sheetList = document.styleSheets;
  var ruleList;
  var i, j;

  var selector = ".javaRoot";
  var attribute = "fontFamily";

  // check the arguments
  if (arguments.length == 1)
  {
     selector = "." + arguments[0];
  } 
  else if (arguments.length == 2)
  {
     selector = "." + arguments[0];
     attribute = arguments[1];
  }

  // look through stylesheets in reverse order that
  //   they appear in the document 
  for (i=sheetList.length-1; i >= 0; i--)
  {
    ruleList = sheetList[i].rules;
    for (j=0; j<ruleList.length; j++)
    {
      if (ruleList[j].selectorText == selector)
      {
        // verify that the attribute exists
        if (ruleList[j].style[attribute])
          return ruleList[j].style[attribute];
        else
          return null;
      }   
    }
  }
   
  }

  return null;
}

// for netscape 3
new JSSAppearance ();

JSSAppearance.prototype = new JSSObjectBase ();

JSSAppearance.prototype.GetFont       = JSSAppearance_GetFont;

JSSAppearance.prototype.GetClass      = JSSAppearance_GetClass;

