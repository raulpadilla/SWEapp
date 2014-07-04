/*****************************************************************************
 *
 * Copyright (C) 2003, Siebel Systems, Inc., All rights reserved.
 *
 * FILE:       printcorresp.js
 *  $Revision: $
 *      $Date: $
 *    $Author: $ of last update
 *
 * CREATOR:    jili
 *
 * DESCRIPTION
 *     Correspondence ( Fulfillment ) Print Function
 *
 *****************************************************************************/

function printmergeddocument (args)
{
   //args[0]: URL
   //args[1]: number of records selected
   var i;
   var iRecord = parseInt(args[1], 10);
   var Wrd;
   var url;
   var background = false;
   var dsSaveChangesNo = 0;

   url = window.location.protocol + "//" + window.location.host  + window.location.pathname;
   url = url + args[0];
   
   Wrd = new ActiveXObject("Word.Application");
   Wrd.Application.Visible = false;

   for (i = 0; i < iRecord; i++)
   {
      Wrd.Application.Documents.Open(url);
      Wrd.Application.PrintOut(background);
      Wrd.Application.ActiveDocument.Close(dsSaveChangesNo);
   }
   Wrd.Application.Quit();
   App().ClosePopup();
   return (true);
}

