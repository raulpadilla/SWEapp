//************************************************************
//    pipeline_po.js     Meg Sharkey   9/14/99
//
//    This is where all the functions specific to Pipeline
//    (server side save and restore) live. When Pipeline
//    is being used, this needs to be included in nc_items.htm
//    script tag.
//*************************************************************

 if(top.opener){
	var PO_OL = top.opener.top.onlink;
 } else{
	var PO_OL = top.onlink;
 }
 var ACTION;
 var REPEAT = false;
 var ARG1, ARG2, ARG3;
 var RMS_SAVE_NAME= "";
 var RMS_QUOTE_ID = "";

	/////////////////////////////////////////////////////////////////////////
	//A stripped down version of the Init function from po.js which is 
	//called by loadServer when we're loading a saved order from the server.
	////////////////////////////////////////////////////////////////////////
	function Init(orderType)
	{
		ORDER_TYPE = orderType;
		order=orderType;
		window.focus();
	 	TotalAll();
   	}
	
	////////////////////////////////////////////////////////////////////
	// This function is called by the servlet generated HTML
	// when opening a saved quote from the list. 
	// It loads the item arrays with the staged data from the database.
	////////////////////////////////////////////////////////////////////
	function loadServer(inItems,inSubItems,inMulti,inOrderType) {

	     var items = RefItems();
	     var subitems = RefSubItems();
	     var itemstr = RefItemStr();
	     var multi = RefMultiInfo();
             Init(inOrderType);
	     RMS_SAVE_NAME = inMulti['RMS_SAVE_NAME'];
	     RMS_QUOTE_ID = inMulti['RMS_QUOTE_ID'];
	     
             if ((items!=null)||(items.length>0)){
	        items.length = 0;
	        subitems.length=0;
	        itemstr.length=0;
                StoreInfo(inOrderType,"TOTAL", 0);
	     }
	     for  (var field in inMulti) {
		if (field != 'RMS_SAVE_NAME' && field != 'RMS_QUOTE_ID') {
			multi[field] = inMulti[field];
		}
	     }
	     for (var i=0;i<inItems.length;i++) {
	         items[i] = new Object();
		 for  (var field in inItems[i]) {
			if(typeof items[i][field] != "object"){
			 	items[i][field] = inItems[i][field];
			}
			else {
				if(field == "VERSION"){
					for(var obj in inItems[i]["VERSION"]){
						items[i]["VERSION"][obj] = inItems[i]["VERSION"][obj];
					}
				}
			}
		 }
	    }
	    for (var i=0;i<inSubItems.length;i++) {
		 subitems[i] = new Array();
		 for (var j=0; j<inSubItems[i].length; j++) {
		     subitems[i][j] = new Object();
		     for (var field in inSubItems[i][j]) {
		        if(typeof inSubItems[i][j][field] != "object"){
			 	subitems[i][j][field] = inSubItems[i][j][field];
			}
			else {
				if(field == "VERSION"){
					for(var obj in inSubItems[i][j]["VERSION"]){
						subitems[i][j]["VERSION"][obj] = inSubItems[i][j]["VERSION"][obj];
					}
				}
			}
		     }
		 }
	    }

	}
	///////////////////////////////////////////////////////////////////////
	//More stuff for server side save. Duplicated earlier save code here,
	//but its different because only want one form to send stuff to server 
	//(not 1 form per item)
	//////////////////////////////////////////////////////////////////////
	function WriteServerInvisible(orderType, items, subitems, orderinfo,doc,orderwin)
	{		

		var str = "";

		for (var i=0;i<items.length;i++){
			if(items[i] && items[i]["QTY"] != 0){
				str += WriteServerItemArray(items, i);
				//doc.writeln(str);
				if(subitems[i]){
					for (var sub=0;sub<subitems[i].length; sub++){
						str += WriteServerSubItemArray(subitems, i, sub);
						//doc.writeln(str);
					}
				}
			}
		}
		str += WriteServerInfoArray(orderinfo);
		//doc.writeln(str);
		var template = new String(location);
		template = template.substring(0, template.lastIndexOf("/")) + "/../order/confirm_save.htm";
		str += '<input type="hidden" name="template" value="' + template + '"><br>'
		str += '</form>'
		return str;
	}

	/////////////////////////////////////////////////////////////////
	// Adding some versioning code here. If the ITEM version hasn't
	// been defined already at the FAMILY level, set it to the 
	// APP_DATA version as a default.  If that hasn't been set,
	// then there will be no version checking on linkback.
	////////////////////////////////////////////////////////////////

	function WriteServerItemArray(items,i)
	{
		var str="";
		var htmlstr="";

		items[i].ITEM['CHECK_VERSION'] = true;

		str += '<INPUT TYPE=HIDDEN NAME="ITEM_' + i + '" VALUE="';
		for (var col in items[i]){
			if(typeof items[i][col] != "object"){
				typeof items[i][col] == "string" ? htmlstr=ProtectQuotes(items[i][col]) : htmlstr = items[i][col];
				str += col + "|~" + htmlstr + "|~";
			}
			else {
				if(col == "ITEM"){
					for(var obj in items[i]["ITEM"]){
						if(obj.indexOf('.') == -1){
							typeof items[i]["ITEM"][obj] == "string" ? htmlstr=ProtectQuotes(items[i][col][obj]) : htmlstr = items[i][col][obj];
							if(htmlstr!='""' && htmlstr!=null){
								str += obj + "|~" + htmlstr + "|~";
							}
						}
					}
				}
			}
		}
		str += '">\n';
		return str;
	}


	/////////////////////////////////////////////////////////
	// Stuffing the app and codeset versions in here so 
	// that we will have access to them later in case 
	// of potential compatibility issues with later 
	// versions of RM Sales
	////////////////////////////////////////////////////////
	function WriteServerInfoArray(info)
	{
	        var str = "";		
		for(var val in info){
			str += '<INPUT TYPE=HIDDEN NAME="HEADER_' + val + '" VALUE="' + ProtectQuotes(info[val].toString()) + '">\n';
		}
		str += '<INPUT TYPE=HIDDEN NAME="HEADER_CODESET_VERSION" VALUE="' + PO_OL.config.GetConfigVar('CODESET', 'VERSION') + '">\n';
		
		str += '<INPUT TYPE=HIDDEN NAME="HEADER_APP_VERSION" VALUE="' + PO_OL.config.GetConfigVar('APP', 'VERSION') + '">\n';
		str += '<INPUT TYPE=HIDDEN NAME="HEADER_QUOTE_VERSION" VALUE="' + PO_OL.config.GetConfigVar('CODESET', 'QUOTE_VER') + '">\n';
		return str;
	}

	function WriteServerSubItemArray(subitems,count, sub_count)
	{
		var str="";
		var htmlstr="";
		str += '<INPUT TYPE=HIDDEN NAME="SUB_' + count + '_' + sub_count + '" VALUE="';
		for (var col in subitems[count][sub_count]){
			if(typeof subitems[count][sub_count][col] != "object") {
				
				typeof subitems[count][sub_count][col] == "string" ? htmlstr=ProtectQuotes(subitems[count][sub_count][col]) : htmlstr = subitems[count][sub_count][col];
				str += col + "|~" + htmlstr + "|~";
			}
		}
		str += '">\n';
		return str;
	}
	

	//////////////////////////////////////////////////////////////
	// The only reason this function is duplicated here from po.js 
	// is that we don't want to write the message about "opening 
	// in the browser it was created" etc. etc. since its not 
	// applicable to the server-side.
	/////////////////////////////////////////////////////////////
	function WriteServerVisible(orderType,poWin,items,subitems,orderinfo,doc,orderwin)
	{
		poWin.ORDER_SAVE_WIN = orderwin;
		poWin.ORDER_SAVE_DOC = doc;

		var str = ""
		if(orderType.toUpperCase() == 'SINGLE' && items[0]["PAGE"] != null){
			orderinfo["QTFAM"] = items[0]["PAGE"] + "_qt.htm";
		}


		var browser = navigator.appName + " " + navigator.appVersion.substring(0,navigator.appVersion.indexOf(" "));
		str += '<HR>';
		if(orderwin.closed==true){return false;}
		doc.writeln(str);
		poWin.PrintableOrder(orderType, 'HTML', 'qt_save','ROW','SUBITEMS');
		if(orderwin.closed==true){return false;}
		return true;
	}

	function jsEscapeQuotes(inString) {
		var pos = 0;
		while (inString.indexOf("'", pos) != -1) {
	    		inString = inString.substring(0, inString.indexOf("'", pos)) + "\\'" + inString.substring(inString.indexOf("'", pos) + 1);
	    		pos = inString.indexOf("'", pos) + 2;
		}

		return inString;
	}


	/////////////////////////////////////////////////////////////////////////
	//This function is called by PrintableOrder for the "SAVE_FRM" textarea
	//of the qt_save template. It looks for a few things: an end-form tag
	//which it takes out (need to write invisible form elements inside this 
	//form before closing), the SAVE_NAME input box which it pre-fills with 
	//the name which has already been saved if any exists, and the 3 submit 
	//buttons.
	//The three submit buttons are toggled depending on whether or not the 
	//quote has been previously saved. If it has been saved before, we want
	//to show the two submit buttons SAVE_NEW and SAVE_MODIFY (where SAVE_NEW 
	//will create a new quote, and SAVE_MODIFY will overwrite this quote).
	//If the quote has not been saved before, we only want to show a single 
	//button: SAVE_QUOTE.  We can tell if this quote has been previously saved
	//by the existance of the INFO variable RMS_SAVE_NAME.
	/////////////////////////////////////////////////////////////////////////
	function PrintPipeline(orderType,footerval)
	{
		var orderinfo= RefMultiInfo();
		var retstr = "";
		var splitval = new Array();
		var endpt;
		var startpt;
		var tmp_str;
		var frm;

		if(footerval){
			splitval = footerval.split('\n');
		}
		else{return retstr;}
		for(var i=0;i<splitval.length;i++){
			//Set the action for the form and call prompt function if previously saved
			if (splitval[i].indexOf("SAVE_FORM") != -1) {
				startpt = splitval[i].indexOf("SAVE_FORM") + 10;	
				endpt = splitval[i].indexOf(">", splitval[i].indexOf("SAVE_FORM")) + 1;
				frm = splitval[i].substring(0, startpt) + " method= \"post\"  action=\"";
				frm += top.onlink.config.GetConfigVar("QUOTE", "URL");
				frm += "pipeline.QuoteManager?action=QuoteSave";
				frm += "&jrunsessionid=" + top.onlink.config.GetConfigVar("USER", "SESSIONID");
				frm += 	"&rmsqver=" + top.onlink.config.GetConfigVar("CODESET", "QUOTE_VER");
				frm += "\" target=\"NewMulti\""; 
				if(RMS_SAVE_NAME) {
					frm += "onSubmit=\"if (checkQuoteName()){ return promptSaveAs();} else{ return false;}\">\n";
					frm += "<input type=hidden name=SAVE_NEW value=''>\n";
					frm += "<input type=hidden name=HEADER_RMS_QUOTE_ID value=" + RMS_QUOTE_ID + ">\n";
					frm += splitval[i].substring(endpt);
					frm += "\n\n<SCRIPT language=\"JavaScript\">\n\n";
					frm += "function newQuote() {\n\n";
					frm += "    document.SAVE_FORM['SAVE_NEW'].value = 'SAVE_NEW';\n}\n\n";
					frm += "function promptSaveAs() {\n";
					frm += "if (document.SAVE_FORM.SAVE_NAME.value != '" + jsEscapeQuotes(RMS_SAVE_NAME) + "'){\n";
					frm += "var w = window.open(\"\", \"new_qt\", \"width=350,height=200,resizable\");\n";
					frm += "var d = w.document;\n";
					frm += "d.write('Would you like to save a new copy of this quote, or overwrite the existing quote?<br><br>');\n";
					frm += "d.write('<form><center><input type=\"button\" value=\"Save New\"');\n"; 
					frm += "d.write('onClick=\"opener.newQuote(); opener.document.SAVE_FORM.submit(); window.close();\">');\n";
					frm += "d.write('&nbsp;<input type=\"button\" value=\"Overwrite\" onClick=\"opener.document.SAVE_FORM.submit(); window.close();\">&nbsp;<input type=\"button\" value=\"Cancel\" onClick=\"window.close();\"><br></form>');\n";
					frm += "d.close();\n";
					frm += "w.focus();\n";
					frm += "return false;\n}}\n</SCRIPT>\n\n";
				}
				else { 
					frm += " onSubmit=\"return checkQuoteName();\">\n"; 
				}
				splitval[i] = frm + splitval[i].substring(endpt);
			}
			//prefill the text box with the quote name if its defined
			else if(splitval[i].indexOf("SAVE_NAME") != -1) {
				if(RMS_SAVE_NAME) {
					tmp_str = splitval[i].substring(0, splitval[i].indexOf(">", splitval[i].indexOf("SAVE_NAME")));		
					tmp_str += 'value="' + ProtectQuotes(RMS_SAVE_NAME) + '"';
					splitval[i] = tmp_str + splitval[i].substring(splitval[i].indexOf(">", splitval[i].indexOf("SAVE_NAME")));
				}
			}
			//Take out the end form tag so we can stuff all the hidden form variables in the form
			if (splitval[i].indexOf("</form>") != -1) {
				startpt = splitval[i].lastIndexOf("<", splitval[i].indexOf("</form>"));
				endpt = splitval[i].indexOf(">", splitval[i].indexOf("</form>"));
				splitval[i] = splitval[i].substring(0, startpt) + splitval[i].substring(endpt + 1);
			}
			if (splitval[i].indexOf("</FORM>") != -1) {
				startpt = splitval[i].lastIndexOf("<", splitval[i].indexOf("</FORM>"));
				endpt = splitval[i].indexOf(">", splitval[i].indexOf("</FORM>"));
				splitval[i] = splitval[i].substring(0, startpt) + splitval[i].substring(endpt + 1);
			}
			retstr += splitval[i] + '\n';
	
		}
		return retstr;
	}
	

         ////////////////////////////////////////////////////////////////////////////////
	//Writes HTML for quote_save.htm page, both the form which is submitted
	//to the server on save (handled by WriteServerInvisible) and the 
	//formatted display of the order (handled by the normal call to WriteVisible) 
	//This is called from np_totl.htm and so we need to call to the 
	//pipeline_po versions of the functions in nc_items.htm so that we 
	//are not slowing things down with references to data structures across frames.
	/////////////////////////////////////////////////////////////////////////////////
	function SaveServerOrder(orderType,poWin, winargs, winargs2)
	{	
		var pipeline_on;
		pipeline_on = top.onlink.config.GetConfigVar("QUOTE", "ACTIVE");
		if (pipeline_on) {
			user_set = top.onlink.config.GetConfigVar("USER", "VALIDATED");	
			if (user_set == "false") {
				//Get user_id
				ACTION =  "top.onlink.pipeline.SaveServerOrder()";
				ARG1 = orderType;
				ARG2 = poWin;
				if (winargs != null) {
					ARG3 = winargs;				
				}
				if (winargs2 == null) {
					winargs2 = 'height=150,width=200,scrollbars=auto,toolbar=0,menubar=0,resizable=1';
				}
				var login = top.onlink.ol_ui.open('../ui/login.htm', "Login", winargs2);
				return false;
			}
			else {
				if (! CheckProtocol()) {
					alert("You need to be connected to a server to use this feature.");
					return false;
				}
				if (arguments[0] == null) {orderType = ARG1;}
				if (arguments[1] == null) {poWin = ARG2;}
				if ((arguments[2] == null) && ARG3) {winargs = ARG3;}
				var orderinfo;
				if(orderType == 'MULTI'){
					var items = RefItems();
					var subitems = RefSubItems();
					orderinfo = RefMultiInfo();
					var order = 'NewMulti';
				}	 
				else{
					var items = RefSingle();
					var subitems = RefSubSingleItems();
					orderinfo = RefSingleInfo();
					var order = 'NewSingle';
				}

				if(winargs == null){
					winargs =  'height=500,width=500,scrollbars=1,toolbar=0,menubar=1,resizable=1'
				}
	
				var str = "";
				str = '<HTML><HEAD>';
				str += '<TITLE></TITLE>';
				str += '<SCRIPT language=javascript>\n';
				str += 'function checkQuoteName(){\n';
				str += 'var name = document.SAVE_FORM.SAVE_NAME.value;\n';
				str += 'if (name.indexOf(\'\"\') != -1){\n';
				str += '\t alert("Please remove any double-quotes from the name of this quote!");\n';
				str += '\t return false;\n';
				str += '}\nelse {\n';
				str += '\t return true;\n}\n}\n';	
				str += '</SCRIPT></HEAD>';
				str += '<BODY onLoad="window.name=\'' + order + '\'">';
				var neworder = poWin.open('', order,winargs);
				neworder.opener = poWin;
				var newdoc = neworder.document.open();
				newdoc.writeln(str);
				str = "";
				WriteServerVisible(orderType, poWin, items,subitems,orderinfo, newdoc,neworder);
				//Moved this to PrintableOrder for SCR#486
				//str = WriteServerInvisible(orderType,items,subitems,orderinfo,newdoc,neworder);	
				//newdoc.writeln(str);
				if(neworder.closed==true){return false;}
				var str="</BODY></HTML>";
				newdoc.writeln(str);
				newdoc.close();
				neworder.focus();
				ARG1 = null;
				ARG2 = null;
				ARG3 = null;
				return true;
			}
		}
		else {
			if (top.onlink.ol_ui['SpecialCaseQuoteOff']) {
				top.onlink.ol_ui.SpecialCaseQuoteOff();
			}
			poWin.focus();
			return false;
		}
	}

function SetQuoteName(inName, inId) {

	RMS_SAVE_NAME = inName;
	RMS_QUOTE_ID = inId;
}


function QuoteList(inWin, winargs) {
	var url, user, connected, pipeline_on;
	
	pipeline_on = top.onlink.config.GetConfigVar("QUOTE", "ACTIVE");
	if (pipeline_on) {
		//only link to list if user is defined
		user_set = top.onlink.config.GetConfigVar("USER", "VALIDATED");	
		if (user_set == "false") {
			//Get user_id
			if(winargs == null){
				winargs =  'height=150,width=200,scrollbars=auto,toolbar=0,menubar=0,resizable=1';
			}
			ACTION =  "top.onlink.pipeline.QuoteList()";
			ARG1 = inWin;
			ARG2 = winargs;
			ARG3 = null;
			var login = top.onlink.ol_ui.open('../ui/login.htm', "Login", winargs);
		}
		else {
			if (arguments[0] == null) { inWin = ARG1; }
			if (arguments[1] == null) { winargs = ARG2; }
			url = top.onlink.config.GetConfigVar("QUOTE", "URL");
			url += "pipeline.QuoteManager?action=QuoteList&";
			var template = new String(location);
			url += "template=" + template.substring(0, template.lastIndexOf("/")) + "/../order/qt_list.htm";
			url += "&jrunsessionid=" + top.onlink.config.GetConfigVar("USER", "SESSIONID");
			url += "&rmsqver=" + top.onlink.config.GetConfigVar("CODESET", "QUOTE_VER");
			if (OL.BTYPE.indexOf("IE") != -1){
				inWin.location.replace(url);	
			}
			else {
				inWin.location.href = url;
			}
			ARG1 = null;
			ARG2 = null;
			ARG3 = null;
		}
	}
	else {
		//alert user that the functionality is unavailable
		if (top.onlink.ol_ui['SpecialCaseQuoteOff']) {
			top.onlink.ol_ui.SpecialCaseQuoteOff();
		}
	}
	//never link, just set location of target
	return false;
}


function VerifyUser(inForm) {
	var template, action;

	template = new String(location);
	action = top.onlink.config.GetConfigVar("QUOTE", "URL") + "login.Login?ACTION=" + ACTION;
	action += "&FAILTEMPLATE=" + template.substring(0, template.lastIndexOf("/")) + "/../ui/login_fail.htm";
	action += "&rmsqver=" + top.onlink.config.GetConfigVar("CODESET", "QUOTE_VER");
	inForm.action = action;
	inForm.method = "POST";

}

function CheckProtocol(msg) {

	if ((location.protocol == "http:")||(location.protocol == "https:")) {
		return true;
	}
	else {
		alert(msg);
		return false;
	}	

}







