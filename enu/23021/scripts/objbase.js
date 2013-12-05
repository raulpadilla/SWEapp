/*****************************************************************************
 *
 * Copyright (C) 2000, Siebel Systems, Inc., All rights reserved.
 *
 * FILE:       objbase.js
 *  $Revision: 32 $
 *      $Date: 11/04/01 12:07a $
 *    $Author: Mrfreeze $ of last update
 *
 * CREATOR:    John Coker
 *
 * DESCRIPTION
 *    Base object class for JavaScript browser tier
 *
 *****************************************************************************/

/*
 * JSSObjectBase
 *
 * errorArray
 * errorLock
 */
function JSSObjectBase ()
{
//   this.errorLock = 0;
}

var OK    = "";
var NOTOK = "NOTOK";

function JSSObjectBase_AddErrorMsg (errCode, params, append)
{
   var  i;
   var  errRec;

   if (this.errorLock > 0)
      return (true);

   if (errCode == null || errCode == OK)
      return (false);

   if (this.errorCode == OK)
   {
      SetErrorMsg (errCode, params, null);
      return (true);
   }

   // create the error record
   errRec = new JSSErrorRec ();
   errRec.errorCode = errCode;
   errRec.errorMsg  = this.TranslateError (errCode, params);

   if (this.errorArray == null)
      this.errorArray = new Array ();

   if (append)
   {
      // add to end of array
      this.errorArray[this.errorArray.length] = errRec;
   }
   else
   {
      // insert at beginning of array
      for (i = this.errorArray.length; i > 0; i--)
         this.errorArray[i] = this.errorArray[i - 1];
      this.errorArray[0] = errRec;
   }

   return (true);
}

function JSSObjectBase_AddErrorMsgText (errCode, errMsg, append)
{
   var  i;
   var  errRec;

   if (this.errorLock > 0)
      return (true);

   if (errCode == null || errCode == OK ||
       errMsg  == null || errMsg  == "")
      return (false);

   if (this.errorCode == OK)
   {
      SetErrorMsg (errCode, params, null);
      return (true);
   }

   // create the error record
   errRec = new JSSErrorRec ();
   errRec.errorCode = errCode;
   errRec.errorMsg  = errMsg;

   if (this.errorArray == null)
      this.errorArray = new Array ();

   if (append)
   {
      // add to end of array
      this.errorArray[this.errorArray.length] = errRec;
   }
   else
   {
      // insert at beginning of array
      for (i = this.errorArray.length; i > 0; i--)
         this.errorArray[i] = this.errorArray[i - 1];
      this.errorArray[0] = errRec;
   }

   return (true);
}

// Replaces single and double quote chars
function JSSObjectBase_CheckQuotes(str, bSingleQuote)
{
   if (str.indexOf('"') >= 0 || str.indexOf('\'') >= 0)
   {
      if (bSingleQuote)
         return str.replace(/"/g, escape("\"")).replace(/'/g, "\\'");
      else
         return str.replace(/"/g, "\\\"").replace(/'/g, escape("'"));
   }
   else
      return str;
}

function JSSObjectBase_ClearErrorMsg ()
{
   if (this.errorLock)
   {
      if (this.errorLock > 0)
         return;
   }

   // clear out the error array
   if (this.errorArray)
      this.errorArray = null;
}

function JSSObjectBase_CopyErrorMsg (object)
{
   var  i;
   var  errRec;

   if (this.errorLock > 0)
      return (true);

   if (object == null || typeof (object) != "object")
      return this.ClearErrorMsg ();

   this.ClearErrorMsg ();

   if (!object.HasErrorMsg ())
      return (true);

   this.errorArray = new Array (object.errorArray.length);

   for (i = 0; i < object.errorArray.length; i++)
   {
      errRec = new JSSErrorRec ();

      errRec.errorCode  = object.errorArray[i].errorCode;
      errRec.errorMsg   = object.errorArray[i].errorMsg;
      errRec.errorChild = object.errorArray[i].errorChild;

      this.errorArray[i] = errRec;
   }

   return (true);
}

//Port of CSSSWEUtilHtml::EncodeQuotes so that we can encode quotes
function JSSObjectBase_EncodeQuotes(orig)
{
   var encoded;  
   var i, idx, iLimit;
   var currentchar;
   
   encoded = "";

   for (i = 0, idx = 0, iLimit = orig.length; i < iLimit; i++)
   {
      currentchar = orig.charAt(i);
      switch (currentchar)
      {
      case '"':
         encoded += orig.substr(idx, i-1);
         encoded += "&#34;";
         idx = i + 1;
         break;

      case '\'':
         encoded += orig.substr(idx, i-1);
         encoded += "&#39;";
         idx = i + 1;
         break;

      default:
         break;
      }
   }
   if (idx != i)
      encoded += orig.substr(idx, orig.length-1);

   return encoded;
}

function JSSObjectBase_FormatString (format, params)
{
   var  format;
   var  i;
   var  paramArray;
   var  paramNo;
   var  message;

   // make sure we have a valid format
   if (format == null || format == "")
      return ("");

   // get the parameters as an array
   if (typeof (params) == "object")
   {
      // already passed in an array
      paramArray = params;
   }
   else if (params != null)
   {
      // one parameter passed in
      paramArray = new Array (1);
      paramArray[0] = params + "";
   }

   if (paramArray != null)
   {
      // substitute parameters into the array
      message = "";
      for (i = 0; i < format.length; i++)
      {
         if (format.substr (i, 1) == '%' &&
             i + 1 < format.length)
         {
            paramNo = parseInt (format.substr (i + 1, 1));
            if (isNaN (paramNo) ||
                paramNo < 1 || paramNo > paramArray.length)
            {
               // not a valid substition
               message += format.substr (i, 1);
               i++;
               message += format.substr (i, 1);
            }
            else
            {
               // substitute in the pararameter
               message += paramArray[paramNo - 1];
               i++;
            }
         }
         else
            message += format.substr (i, 1);
      }
   }
   else
   {
      // no parameters to substitute
      message = format;
   }

   return (message);
}

function JSSObjectBase_GetApplication ()
{
   if (this.application)
      return (this.application);

   // find the application object in our special frame
   if (top._swe != null && top._swe._sweapp != null)
   {
      this.application = App();
      return (this.application);
   }
   else
      return (null);
}

function JSSObjectBase_GetErrorCount ()
{
   if (this.errorArray == null)
      return (0);

   return (this.errorArray.length);
}

function JSSObjectBase_GetErrorMsg (index)
{
   if (index == null)
      index = 0;

   if (this.errorArray == null ||
       this.errorArray.length <= index)
      return ("");

   return (this.errorArray[index].errorMsg);
}

function JSSObjectBase_GetErrorCode (index)
{
   if (index == null)
      index = 0;

   if (this.errorArray == null ||
       this.errorArray.length <= index)
      return (OK);

   return (this.errorArray[index].errorCode);
}

function JSSObjectBase_HasErrorMsg ()
{
   if (this.errorArray == null)
      return (false);

   return (this.errorArray.length > 0);
}

function JSSObjectBase_LockErrorMsg ()
{
   if (this.errorLock == null)
      this.errorLock = 1;
   else
      this.errorLock++;

   return (true);
}

function JSSObjectBase_SetErrorMsg (errCode, params, child)
{
   var  errRec;

   if (this.errorLock > 0)
      return (true);

   if (child != null && typeof (child) != "object")
      child = null;

   this.ClearErrorMsg ();
   if (errCode == null || errCode == "OK")
      return (true);

   if (child != null)
   {
      // copy error message from child
      this.CopyErrorMsg (child);

      // insert specific error record if different
      if (errCode != OK &&
          errCode != this.GetErrorCode ())
      {
         // insert our specific error at head
         this.AddErrorMsg (errCode, params, false);
      }
   }
   else
   {
      this.errorArray = new Array (1);

      // set our specific error record
      errRec = new JSSErrorRec ();
      errRec.errorCode  = errCode;
      errRec.errorMsg   = this.TranslateError (errCode, params);

      this.errorArray[0] = errRec;
   }

   return (true);
}

function JSSObjectBase_SetErrorMsgText (errCode, errMsg)
{
   var  errRec;

   if (this.errorLock > 0)
      return (true);

   this.ClearErrorMsg ();
   if (errCode == null || errCode == OK)
      return (true);

   this.errorArray = new Array (1);

   // set our specific error record
   errRec = new JSSErrorRec ();
   errRec.errorCode = errCode;
   errRec.errorMsg  = errMsg;

   this.errorArray[0] = errRec;

   return (true);
}

function JSSObjectBase_TextToHTML (text)
{
   if (text == null || text == "")
      return ("&nbsp;");

   text = text.replace (/&/g, "&amp;");
   text = text.replace (/</g, "&lt;");
   text = text.replace (/>/g, "&gt;");

   return (text);
}

function JSSObjectBase_TranslateError (errCode, params)
{
   var  application;
   var  format;

   // lookup the error code in our translation array
   application = this.GetApplication ();

   if (application == null)
   {
      // no application to do the translation
      message = errCode;
   }
   else
   {
      // translate the error code into a message format
      format = application.GetLocalString (errCode);
      if (format == null || format == "")
      {
         // use the error code
         message = errCode;
      }
      else
      {
         // substitute parameters into the array
         message = this.FormatString (format, params);
      }
   }

   // return the resulting message
   return (message);
}

function JSSObjectBase_UnLockErrorMsg ()
{
   this.errorLock--;

   return (true);
}


new JSSObjectBase ();

JSSObjectBase.prototype.AddErrorMsg     = JSSObjectBase_AddErrorMsg;
JSSObjectBase.prototype.AddErrorMsgText = JSSObjectBase_AddErrorMsgText;
JSSObjectBase.prototype.CheckQuotes     = JSSObjectBase_CheckQuotes;
JSSObjectBase.prototype.ClearErrorMsg   = JSSObjectBase_ClearErrorMsg;
JSSObjectBase.prototype.CopyErrorMsg    = JSSObjectBase_CopyErrorMsg;
JSSObjectBase.prototype.EncodeQuotes    = JSSObjectBase_EncodeQuotes;
JSSObjectBase.prototype.FormatString    = JSSObjectBase_FormatString;
JSSObjectBase.prototype.GetApplication  = JSSObjectBase_GetApplication;
JSSObjectBase.prototype.GetErrorCode    = JSSObjectBase_GetErrorCode;
JSSObjectBase.prototype.GetErrorCount   = JSSObjectBase_GetErrorCount;
JSSObjectBase.prototype.GetErrorMsg     = JSSObjectBase_GetErrorMsg;
JSSObjectBase.prototype.HasErrorMsg     = JSSObjectBase_HasErrorMsg;
JSSObjectBase.prototype.LockErrorMsg    = JSSObjectBase_LockErrorMsg;
JSSObjectBase.prototype.SetErrorMsg     = JSSObjectBase_SetErrorMsg;
JSSObjectBase.prototype.SetErrorMsgText = JSSObjectBase_SetErrorMsgText;
JSSObjectBase.prototype.TextToHTML      = JSSObjectBase_TextToHTML;
JSSObjectBase.prototype.TranslateError  = JSSObjectBase_TranslateError;
JSSObjectBase.prototype.UnLockErrorMsg  = JSSObjectBase_UnLockErrorMsg;


function JSSErrorRec ()
{
   this.errorCode = OK;
   this.errorMsg  = "";
}
