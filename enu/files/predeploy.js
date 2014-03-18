/*	predeploy.js - JavaScript/wsh script - runs under wscript.exe

	Title: This is a script that launches the IE browser in Silent Mode The Browser Window is not visible.

	Usage:
   ////////// start predeploy.js ////////////
   wscript predeploy.js
   ////////// end oprojc.cmd ////////////

      
	The intent of this script is to help  Siebel Installation in Silent Mode
    
*/
var objIE = WScript.CreateObject("InternetExplorer.Application");
objIE.navigate("\\Predeploy.htm");
objIE.left=200;
objIE.top=200;
objIE.height=175;
objIE.width=500;
objIE.menubar=0;
objIE.toolbar=0;
objIE.addressbar=0;
objIE.statusbar=0;
objIE.visible=0;
while (objIE.Busy) 
{
	WScript.Sleep(200)
}
var objDocument = objIE.Document;
WScript.Sleep(800)
objIE.Quit();