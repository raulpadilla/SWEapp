//    po.js     Ver 3.4.1 (Build 10)	20000531		Laura Klein


 if(top.opener){
	var PO_OL = top.opener.top.onlink;
        var PO_SV = top.opener.top.onlink[PO_OL.SV];
}
else{
	var PO_OL = top.onlink;
        var PO_SV = top.onlink[PO_OL.SV];
}
	PO_OL.items["ORDER_ACTIVE"] = false;

	var MAINCLOSED = false;

	function CloseOrder(mainClosed)
	{
	  if(mainClosed){
			MAINCLOSED = true;
			self.close();
			return;
	 	}
		else if(MAINCLOSED != true){
	  	  	PO_OL.codeset.DYNAPO = null;
			PO_OL.items["ORDER_ACTIVE"] = false;
	 	}
		return;
	}

	function BuildOrderWidget(orderType,areaType, widgetName, widgetValue, widgetWidth, widgetHeight, widgetHandler, widgetFunction, widgetParams)
	{
		var returnstring = "";
		var value = PO_OL.items.GetInfo(orderType,widgetName);
  //bug # 72 laurak
		if(areaType.toUpperCase() == "TEXT"){
			value = ProtectQuotes(value);
			returnstring = BuildOrderTextWidget(orderType,widgetName, value, widgetWidth, widgetHandler, widgetFunction, widgetParams);
		}
		if(areaType.toUpperCase() == "TEXTAREA"){
			value = ProtectQuotes(value);
			returnstring = BuildOrderTextAreaWidget(orderType,widgetName, value,widgetWidth,widgetHeight,widgetHandler,widgetFunction, widgetParams);
		}
		if(areaType.toUpperCase() == "CHECKBOX"){
			returnstring = BuildOrderCheckBoxWidget(orderType,widgetName, value,widgetHandler,widgetFunction,widgetParams);
		}
		if(areaType.toUpperCase() == "RADIO"){
			returnstring = BuildOrderRadioWidget(orderType,widgetName,widgetValue,value,widgetHandler,widgetFunction,widgetParams);
		}

		if(areaType.toUpperCase() == "SELECT"){
			returnstring = BuildOrderSelectWidget(orderType,widgetName,value, widgetValue,widgetHeight,widgetHandler,widgetFunction,widgetParams);
		}
		if(areaType.toUpperCase() == "MULTIPLE"){
	   //		returnstring = BuildOrderMultiWidget(orderType,widgetName,value, widgetValue,widgetHeight,widgetHandler,widgetFunction,widgetParams);
		}

		return returnstring;
	}

	function BuildOrderTextWidget(orderType,widgetName, value, widgetWidth, widgetHandler, widgetFunction, widgetParams)
	{
		var handler = "";
		handler = " onChange = \"window.parent.opener.parent.items.StoreInfo('";
		handler += orderType + "','";
		handler += widgetName;
		handler += "',document.widgetForm." + widgetName + ".value); \"";
		if (!widgetParams){
			widgetParams = "";
		}
		if (widgetHandler && widgetFunction){
			if (widgetHandler.toUpperCase() == "ONCHANGE"){
				handler = " onChange =\"";
				handler += " window.parent.opener.parent.items.StoreInfo('";
				handler += orderType + "','";
				handler += widgetName;
				handler += "',document.widgetForm." + widgetName + ".value)\; ";
				handler += widgetFunction + "(" + widgetParams + ")\;\"";
			}
			else{
				handler += widgetHandler + "=" + widgetFunction + "(" + widgetParams + ")\;";
			}
		}


		var returnString = '<INPUT TYPE="TEXT" NAME="';
		returnString +=  widgetName;
		returnString +=  '" SIZE=';
		returnString +=  widgetWidth;
		returnString +=  handler;
		returnString +=  ' value = "';
		returnString +=  value;
		returnString +=  '">';
		return(returnString);
	}

	function BuildOrderTextAreaWidget(orderType,widgetName,value,widgetWidth,widgetHeight,widgetHandler,widgetFunction, widgetParams)
	{
		var handler = "";
		handler = " onChange = \"window.parent.opener.parent.items.StoreInfo('";
		handler += orderType + "','";
		handler +=  widgetName;
		handler +=  "',document.widgetForm." + widgetName + ".value); \"";
		if (!widgetParams){
			widgetParams = "";
		}
		if (widgetHandler && widgetFunction){
			if (widgetHandler.toUpperCase() == "ONCHANGE"){
				handler = " onChange =\"" + widgetFunction + "(" + widgetParams + ");";
				handler +=  " window.parent.opener.parent.items.StoreInfo('";
				handler += orderType + "','";
				handler +=  widgetName;
				handler +=  "',document.widgetForm." + widgetName + ".value);\" ";
			}
			else{
				handler +=  widgetHandler + "=" + widgetFunction + "(" + widgetParams + ");";
			}
		}
		var returnString = '<TEXTAREA NAME="';
		returnString +=  widgetName;
		returnString +=  '" rows=';
		returnString +=  widgetHeight;
		returnString +=  ' cols=';
		returnString +=  widgetWidth;
		returnString +=  handler;
		returnString +=  ' wrap=virtual';
		returnString +=  '">'
		returnString +=  value;
		returnString += '</TEXTAREA>';
		return(returnString);
	}

	function BuildOrderCheckBoxWidget(orderType,widgetName,value,widgetHandler,widgetFunction, widgetParams)
	{
		var handler = "";
		handler = " onclick = \"window.parent.opener.parent.items.StoreInfo('";
		handler += orderType + "','";
		handler +=  widgetName;
		handler +=  "',document.widgetForm." + widgetName + ".checked);\" ";
		if (!widgetParams){
			widgetParams = "";
		}
		if (widgetHandler && widgetFunction){
			if (widgetHandler.toUpperCase() == "ONCLICK"){
				handler = " onClick =\"" + widgetFunction + "(" + widgetParams + ");";
				handler +=  " window.parent.opener.parent.items.StoreInfo('";
				handler += orderType + "','";
				handler +=  widgetName;
				handler +=  "',document.widgetForm." + widgetName + ".checked);\" ";
			}
			else{
				handler +=  widgetHandler + "=" + widgetFunction + "(" + widgetParams + ");";
			}
		}
		var returnString = '<INPUT TYPE="CHECKBOX" NAME="';
		returnString +=  widgetName + '"';
		returnString +=  " " +  handler;
		if (value.toString() == "true"){
 			returnString +=  " CHECKED ";
		}
		returnString +=  '>';
		return(returnString);

	}

	function BuildOrderRadioWidget(orderType,widgetName,widgetValue,value,widgetHandler,widgetFunction, widgetParams)
	{
		var handler = "";
		handler = " onclick = \"window.parent.opener.parent.items.StoreInfo('";
		handler += orderType + "','";
		handler +=  widgetName;
		handler +=  "',document.widgetForm." + widgetName + "[" + (widgetValue-1) + "].value);\"";
		if (!widgetParams){
			widgetParams = "";
		}
		if (widgetHandler && widgetFunction){
			if (widgetHandler.toUpperCase() == "ONCLICK"){
				handler = " onClick =\"" + widgetFunction + "(" + widgetParams + ");";
				handler +=  " window.parent.opener.parent.items.StoreInfo('";
				handler += orderType + "','";
				handler +=  widgetName;
				handler +=  "',document.widgetForm." + widgetName + "[" + (widgetValue-1) + "].value);\" ";
			}
			else{
				handler +=  widgetHandler + "=" + widgetFunction + "(" + widgetParams + ");";
			}
		}
		var returnString = '<INPUT TYPE="RADIO" NAME="';
		returnString +=  widgetName + '"';
		returnString +=  ' VALUE="' + widgetValue + '"';
		returnString +=  " " +  handler;
		if (value == widgetValue){
 			returnString +=  " CHECKED ";
		}
		returnString +=  '>';
		return(returnString);

	}

	function BuildOrderSelectWidget(orderType,widgetName,value,widgetValue,widgetHeight,widgetHandler,widgetFunction, widgetParams)
	{
	var handler = "";
		handler = " onChange = \"window.parent.opener.parent.items.StoreInfo(\'";
		handler += orderType + "','";
		handler +=  widgetName;
		handler +=  "\',document.widgetForm." + widgetName + ".options.selectedIndex);\"";
		if (!widgetParams){
			widgetParams = "";
		}
		if (!widgetHeight){
			widgetHeight = 1;
		}
		if (widgetHandler && widgetFunction){
			if (widgetHandler.toUpperCase() == "ONCHANGE"){
				handler = " onChange =\"" + widgetFunction + "(" + widgetParams + ");";
				handler +=  " window.parent.opener.parent.items.StoreInfo('";
				handler += orderType + "','";
				handler +=  widgetName;
				handler +=  "',document.widgetForm." + widgetName + ".options.selectedIndex);\" ";
			}
			else{
				handler +=  widgetHandler + "=" + widgetFunction + "(" + widgetParams + ");";
			}
		}
		var options = new Array();
		options = widgetValue.split(',');


		var returnString = '<SELECT NAME="';
		returnString +=  widgetName;
		returnString +=  '" SIZE=';
		returnString +=  widgetHeight;
		returnString +=  handler;
		returnString +=  '">'
		for (var i=0; i<options.length;i++){
			if (value == i){
				returnString +=  '<OPTION SELECTED>';
				returnString +=  options[i];
				returnString +=  '</OPTION>';
			}
			else {

				returnString +=  '<OPTION VALUE=\"' + options[i] + '\">';
				returnString +=  options[i];
				returnString +=  '</OPTION>';
			}

		}
		returnString += '</SELECT>';
		return(returnString);
	}


//Order table target code
	  var ORDER_TYPE = "";

//INIT FUNCTIONS
	var ORDER_TYPE = "";
	var TOTALLED = false;
 	function Init(orderType)
	{
		PO_OL.codeset.DYNAPO = top.window;
		ORDER_TYPE = orderType;
		order=orderType;
		window.focus();
		if(PO_OL.ADD_FLAG != null && PO_OL.ADD_FLAG == true){
			PO_OL.ADD_FLAG = false;
			PO_OL.items.AddItem(order);
		}
	 	TotalAll();
   	}

//BUILD TABLE FUNCTIONS
	function BuildSingleTableWidget()
	{
		self.focus();
		Init('SINGLE');
		var newpage = "";
		items = PO_OL.items.RefSingle();
		subitems = PO_OL.items.RefSubSingleItems();
		if (items == null || subitems == null){return}
		var table = new Array();
		var tablestring = "";

		var topname = BuildSingleTableWidget.arguments[0];
		for(var arg_count=0;arg_count<BuildSingleTableWidget.arguments.length;arg_count++){
			var name = BuildSingleTableWidget.arguments[arg_count];
			table[name] = new Array();
			if(top.single_items){
				tablestring = top.single_items.document.singletargetform.elements[name].value;
			}
			else{
				return;
			}
			if(tablestring.length>0){
				table[name] = tablestring.split("\n");
			}
			else{
				alert('bad table name');
			}
		}
		if(items[0]["QTY"] > 0 ){
			newpage+=PrintTable(table, table[topname],0,-1,'SINGLE',"HTML");
		}

		document.writeln(newpage);
	}

	function BuildMultiTableWidget()
	{
		Init("MULTI");

		var table = new Object();
  		var tablestring = "";
		PO_OL.items.LoadTemplate("multi_items", BuildMultiTableWidget.arguments[0]);
		for(var arg_count=0;arg_count<BuildMultiTableWidget.arguments.length;arg_count++){
			var name = BuildMultiTableWidget.arguments[arg_count];
			table[name] = new Array();
			if(top.multi_items){
				tablestring = top.multi_items.document.ordertargetform.elements[name].value;
			}
			else{
				return;
			}
			if(tablestring.length>0){
			PO_OL.items.AddTemplateSection("multi_items", name, tablestring);

			}
			else{
				alert('bad table name');
			}
		}
	
		PO_OL.items.BuildMultiTableWidget(window.document);
		return;
   	}						


	function SetOutputWin(framename,winargs)
	{
		var refwin = PO_OL.items.RefWinArgs();
		refwin[framename] = winargs;
	}

	function StoreSavedInfo()
	{
	  	var appurl = window.parent.top.opener.top.location.toString();
  		var btype = navigator.userAgent.toString();
    	var bname = navigator.appName.toString();
  		PO_OL.items.StoreInfo("MULTI", "URL",appurl);
  		PO_OL.items.StoreInfo("MULTI", "BTYPE",btype);
   		PO_OL.items.StoreInfo("MULTI", "BNAME",bname);
	}


	function PrintableOrder(orderType,html,framename)
	{
		Init(orderType);
		var newpage = "";
		if(orderType == 'MULTI'){
			var items = PO_OL.items.RefItems();
			var subitems = PO_OL.items.RefSubItems();
			orderinfo = PO_OL.items.RefMultiInfo();

		}
		else{
			var items = PO_OL.items.RefSingle();
			var subitems = PO_OL.items.RefSubSingleItems();
		}

		if (items == null || subitems == null){return false;}

		StoreSavedInfo();

		var table = new Object();
		var tablestring = "";
		var topname = PrintableOrder.arguments[3];
		for(var arg_count=3;arg_count<PrintableOrder.arguments.length;arg_count++){
			var name = PrintableOrder.arguments[arg_count];
			table[name] = new Array();
			if(top[framename]){
				tablestring = top[framename].document.ordertargetform.elements[name].value;
			}
			else{
				return false;
			}
			if(tablestring.length>0){
				table[name] = tablestring.split("\n");
			}
			else{
				alert('bad table name');
			}
		}
		if ((framename != 'order_save') && (framename != 'qt_save')){

			var win = PO_OL.items.RefWinArgs();
			if(win && win[framename]){
				var winargs = win[framename];
			}
			else{
				var winargs = 'toolbar=0,location=0,directories=0,status=0,menubar=1,scrollbars=1,resizable=1';
			}

	//laurak - fix for setoutputwin
			var winname = "Printable_" + framename;
			var newwin=null;
	////SCR 577 JAG 20000125
		    newwin = window.open('../ui/nf_white.htm',winname, winargs);
 			var newdoc = newwin.document.open();
		}
		else{
			var newwin = ORDER_SAVE_WIN;
			var newdoc = ORDER_SAVE_DOC;
		}

		//for pipeline template qt_save.htm - Meg 10/1/99
		if(top[framename].document.ordertargetform.elements["SAVE_FORM"]){
			if (PO_OL['pipeline']['PrintPipeline']) {
				newpage += PO_OL.pipeline.PrintPipeline(orderType,top[framename].document.ordertargetform.elements["SAVE_FORM"].value);
				newpage += PO_OL.pipeline.WriteServerInvisible(orderType,items,subitems,orderinfo,newdoc,newwin);
			}
		}
		if(top[framename].document.ordertargetform.elements["HEADER"]){
			newpage += PrintHeader(orderType,top[framename].document.ordertargetform.elements["HEADER"].value);
		}
		for (var i=0; i<items.length; i++){
			if(items[i] && items[i]["QTY"]>0){
				newpage += PrintTable(table, table[topname],i,-1,'MULTI',html);
			}
			if(newpage.length > 5000){
				if(newwin.closed==true){return false;}
				newdoc.writeln(newpage);
				newpage = "";
			}
		}

		if(top[framename].document.ordertargetform.elements["FOOTER"]){
			newpage += PrintFooter(orderType,top[framename].document.ordertargetform.elements["FOOTER"].value);
		}
		if(newwin.closed==true){return false;}
		newdoc.writeln(newpage);
		newwin.focus();
		if ((framename != 'order_save') && (framename != 'qt_save')){
			if(newwin.closed==true){return false;}
   				newdoc.close();
			}
		top.blur();
		return true;

	}

	function PrintHeader(orderType,headerval)
	{
		var retstr = "";
		var splitval = new Array();

		if(headerval){
			splitval = headerval.split('\n');
		}
		else{return retstr;}
		for(var i=0;i<splitval.length;i++){
			if(splitval[i].indexOf("INFOTARGET") != -1){
				retstr += BuildInfoTarget(orderType,splitval[i]);
			}
			else{
 				retstr += splitval[i].substring(0,splitval[i].length-1);
			}
		}
		return retstr;
	}

	function PrintFooter(orderType,footerval)
	{
		var orderinfo=PO_OL.items.RefMultiInfo();
		var retstr = "";
		var splitval = new Array();

		if(footerval){
			splitval = footerval.split('\n');
		}
		else{return retstr;}
		for(var i=0;i<splitval.length;i++){
			if(splitval[i].indexOf("INFOTARGET") != -1){
				retstr += BuildInfoTarget(orderType,splitval[i]);
			}
			else{
				retstr += splitval[i];
			}
		}
		return retstr;
	}

	function PrintTable(table, table_array,item_count,sub_count,orderType,html)

	{
		var returnstr = PO_OL.items.PrintTable(table, table_array,item_count,sub_count,orderType,html,window);
		return returnstr;
	}
//ORDERTARGET building code
	function BuildOrderTarget(targ,item_count,sub_count)
	{
		var returnstr = "";
 			if(targ.indexOf("INPUT") != -1){
				returnstr = BuildOrderInputTarget(targ,item_count,sub_count);
			}
			else if(targ.indexOf("IMG") != -1){
				returnstr = BuildOrderImageTarget(targ,item_count, sub_count);
			}
			else if(targ.indexOf("HIDDEN") != -1){
				returnstr = BuildOrderHiddenTarget(targ,item_count,sub_count);
			}
			else {
				returnstr = BuildOrderTextTarget(targ,item_count, sub_count);
			}
			return returnstr;


	}

	function BuildOrderInputTarget(targ,item_count,sub_count)
	{
		var order = PO_OL.items.RefOrderType();
		var value = "";
		value += GetAttribute(targ, "VALUE",item_count, sub_count);

		if(value=="undefined"){
			value="";
		}
		var name  = GetAttribute(targ, "NAME",item_count, sub_count) + '.' + item_count;
		var func  = "AttributeChanged('" + name  + "','" + item_count + "','" + order + "','" + sub_count + "',this.value)\;";
		if(targ.indexOf("FUNCTION") != -1 && targ.indexOf("HANDLER") != -1 && targ.indexOf("ONCHANGE") != -1){
			func += GetAttribute(targ,"FUNCTION",item_count, sub_count);
		}
		var inputstr = '<INPUT TYPE=\"TEXT\" ';
		inputstr += 'NAME =\"' + name + '\" ';
		// if serial number contains quotes, keep them -- Bug# 61 JWU --
		value = value.replace(/\"/g, "&quot;");
		inputstr += 'VALUE =\"' + value + '\" ';
		inputstr += 'onChange=\"' + func + '\" ';
		if (targ.indexOf("FUNCTION") != -1 && targ.indexOf("HANDLER") != -1 && targ.indexOf("ONCHANGE") == -1){
			inputstr += GetAttribute(targ, "HANDLER",item_count, sub_count) + '=\"' + GetAttribute(targ, "FUNCTION",item_count, sub_count) + '\" ';
		}
		if (targ.indexOf('SIZE') != -1){
			inputstr += 'SIZE =' + GetAttribute(targ, "SIZE",item_count, sub_count) + ' ';
		}
		inputstr += '>';
   		return inputstr;
	}

	function BuildOrderHiddenTarget(targ,item_count,sub_count)
	{
		var value = GetAttribute(targ, "VALUE",item_count, sub_count);
		var name  = GetAttribute(targ, "NAME",item_count, sub_count) + '.' + item_count;
		if(sub_count >= 0){
			name += '.' + sub_count;
		}
		if(typeof value == "string"){
			value = ProtectHTMLString(value);
		}

		var inputstr = '<INPUT TYPE=\"HIDDEN\" ';
		inputstr += 'NAME =\"' + name + '\" ';
		inputstr += 'VALUE =\"' + value + '\" ';
		inputstr += '>';
		return inputstr;
	}

	function BuildOrderImageTarget(targ,item_count, sub_count)
	{
		var path = "";
		if (targ.indexOf("PATH")){
			path = GetAttribute(targ, "PATH", item_count, sub_count);
		}

		var src = GetAttribute(targ,"VALUE", item_count, sub_count);
		if (src == null){
			return "";
		}
		else{
			src = path+src;
		}
		var imgstr = '<IMG SRC=\"' + src;
		imgstr  += '\" NAME=\"' + GetAttribute(targ, "NAME",item_count, sub_count) + '.' + item_count + '\"';
		if (targ.indexOf("SIZE") != -1){
			imgstr  += ' ' + GetAttribute(targ, "SIZE",item_count, sub_count);
		}
		imgstr  += '>';
		if (targ.indexOf("URL") != -1){
			var url = GetAttribute(targ, "URL",item_count, sub_count);
			imgstr.link(url);
		}
		return imgstr;
	}

	function BuildOrderTextTarget(targ,item_count, sub_count)
	{
		var textstr = "";
		textstr += GetAttribute(targ, "VALUE",item_count, sub_count);
		if (targ.indexOf("FORMAT") != -1) {
			var funcName="";
		
			funcName = GetAttribute(targ, "FORMAT", item_count, sub_count);
			funcName = funcName.replace(/\((.+)/,"");	//Trim parenthesis and arguments if passed in
			var funcObj = eval(funcName);				//Evaluate function pointer
			
			if (funcObj != null) {
				textstr = funcObj(textstr);
			}
		}
		var url = "\"\"";
		var handler = " onClick";
		var func = "\"return false\;\""
		if(targ.indexOf("URL") != -1){
			url = GetAttribute(targ, "URL",item_count, sub_count);
		}

		if (targ.indexOf("FUNCTION") != -1){
			if(targ.indexOf("GoToPg")!= -1){
				func = "GoToPg(" + item_count + "," + sub_count + ")\; return false\;";
			}
			else{
				func = GetAttribute(targ,"FUNCTION",item_count, sub_count);
			}
		textstr= '<A HREF=' + url + ' ' + handler + '="' + func + '">' + textstr + '</A>';
		}

		return textstr;
	}

//INFOTARGET building code

	function BuildInfoTarget(orderType,targ)
	{
		var returnstring = "";
		var ptr = targ.indexOf("\"",targ.indexOf("VALUE"));
		if(targ.indexOf("NAME") != 0){
			var name_ptr = targ.indexOf("\"", targ.indexOf("NAME"));
		}
		var name = targ.substring(ptr+1,targ.indexOf("\"",ptr+1));
		var value = PO_OL.items.GetInfo(orderType,targ.substring(ptr+1, targ.indexOf("\"",ptr+1)));
		if(targ.indexOf('TYPE="HIDDEN"') != -1){
			returnstring = "<INPUT TYPE='HIDDEN' NAME='" + name + "' VALUE='" + value + "'>";
		}
		else{
			returnstring = value;
		}
		return returnstring;

	}

 function GetAttribute(targ, att,item_count, sub_count)
	{
		var returnstring = PO_OL.items.GetAttribute(targ,att,item_count,sub_count);
		return returnstring;
	}


	function UpdateOrder()
	{
 		TotalAll();
		if(PO_OL.codeset.DYNAPO != null){
			top.window.document.location.reload(true);
		}

	}


	function AttributeChanged(entryName, item_count, orderType, sub_count,newValue)
	{
		PO_OL.items.AttributeChanged(entryName, item_count, orderType, sub_count,newValue);
		UpdateOrder();
	}

//functions pulled from nc_po

	function DeleteAllQuery(items)
	{
		var delstr = "\nDELETING ALL ITEMS\n\nRemove all items from this Order?\n\n";
		return confirm(delstr);
	}

	function DeleteAllOrderItems()
	{
		PO_OL.ADD_FLAG = false;
		if (DeleteAllQuery()) {
			PO_OL.items.DeleteAllOrderItems();				
	    }
	    if (PO_SV && (typeof(PO_SV.RegisterEvent) != "undefined"))
	    {
	        PO_SV.RegisterEvent("203","",""); 
	        PO_SV.PostEvents();
	    } 
	}


	function DeleteOrderInfoQuery()
	{
		var delstr = "\nDELETING ALL ORDER INFORMATION\n\n\nRemove all customer information from this order?\n\n\n";
		return confirm(delstr);
	}

	function DeleteOrderInfo(orderType)
	{
		var orderinfo = "";
		orderType.toUpperCase() == 'MULTI' ? orderinfo = PO_OL.items.RefMultiInfo() : orderinfo = PO_OL.items.RefSingleInfo();
		if(DeleteOrderInfoQuery()){
			for (var col in orderinfo){
				orderinfo[col] = "";
			}
		}
		UpdateOrder();
	}


	function GoToPg(item_count, sub_count) {
	  


	if (!top.opener.top || top.opener.top.closed) { alert("Unable to display this item.\nMain window has been closed"); return; }

	if (!PO_OL || !PO_OL.Loaded(PO_OL.CS)) { alert("\nERROR\n\nUnable to access main window from order"); return; }

	var items = PO_OL.RefItems();
	if (items==null) { return; }
	var subitems = PO_OL.items.RefSubItems();

	if ((item_count >= items.length)||(items[item_count]["PAGE"]==null)||(items[item_count].PAGE.length<=0)) { alert("\n ERROR\n\nBad Order Item"); return;	}
	if(sub_count < 0){
		PO_OL.GotoPage(items[item_count].PAGE,items[item_count].ITEM,null,items[item_count]["FAMILY_VERSION"],items[item_count]["APP_DATA_VERSION"]);
	}
	else{
		PO_OL.GotoPage(items[item_count].PAGE,items[item_count][sub_count].ITEM,null,items[item_count][sub_count]["FAMILY_VERSION"],items[item_count][sub_count]["APP_DATA_VERSION"]);
	}

		PO_OL.focus();
		//JAG 20000216
		if (PO_OL.aol!=null && typeof PO_OL.aol!="undefined"){
		alert('AOL Users\n\nPlease close the order window to proceed\nYou can reopen your order from the main window');
		}
	}

//protect functions
//test function for stripping HTML out of order stuff

	function StripHTML(str)
	{
		var newstr = PO_OL.items.StripHTML(str);
		return newstr;
	}
	function ProtectHTMLString(htmlstr)
	{
		var retstr = PO_OL.items.ProtectHTMLString(htmlstr);
		return retstr;
	}
	function StrProtectCR(aStr)
	{
		var retstr = PO_OL.items.StrProtectCR(aStr);
		return retstr;
	}

//bug #72 laurak
  //strip the double quotes out of strings entirely
  	function ProtectQuotes(value)
	{
		var retstr=PO_OL.items.ProtectQuotes(value);
		return retstr;
	}


//save and restore functions

	function WriteItemArray(items,i)
	{
		var str= PO_OL.items.WriteItemArray(items,i);
		return str;
	}

	function WriteSubItemArray(subitems,count, sub_count)
	{
		var str= WriteSubItemArray(subitems,count,sub_count);
		return str;
	}

	function WriteInfoArray(info)
	{
		var str = PO_OL.items.WriteInfoArray(info);
		return str;
	}

	var ORDER_SAVE_WIN = null;
	var ORDER_SAVE_DOC = null;


	function WriteVisible(orderType,items,subitems,orderinfo,doc,orderwin)
	{
		ORDER_SAVE_WIN = orderwin;
		ORDER_SAVE_DOC = doc;

		var str = ""
		if(orderType.toUpperCase() == 'SINGLE' && items[0]["PAGE"] != null){
			orderinfo["QTFAM"] = items[0]["PAGE"] + "_qt.htm";
		}


		//SCR 52 JAG 19991228 Save Order window refers to correct browser

		if(navigator.appName == "Microsoft Internet Explorer"){
		var browser=navigator.appName + " " + ((navigator.appVersion.substr(navigator.appVersion.indexOf("MSIE"),8)).substr(4,7)) ;
		}
		else{
		var browser = navigator.appName + " " + navigator.appVersion.substring(0,navigator.appVersion.indexOf(" "));
     	}


 		
 	    str += '<CENTER><FONT SIZE=+2><B>SAVED ORDER</B></FONT></CENTER>\n';
		str += '<P>This Order was generated using OnLink Sales(tm) in ' + browser + '.  ';
		str += 'For best results, please reopen this Order in the browser in which it was created.  ';
		str += '<HR>';
		if(orderwin.closed==true){return false;}
		doc.writeln(str);
		PrintableOrder(orderType, 'HTML', 'order_save','ROW','SUBITEMS');
		if(orderwin.closed==true){return false;}
		return true;
	}

	function WriteInvisible(orderType, items, subitems, orderinfo,doc,orderwin)
	{
		var str = PO_OL.items.WriteInvisible(orderType,items,subitems,orderinfo,doc,orderwin);
		if(orderwin.closed==true){return false;}
		doc.writeln(str);
		return true;

	}


	function SaveOrder(orderType,winargs)
	{
		var orderinfo;
			     
		if(orderType == 'MULTI'){
			var items = PO_OL.items.RefItems();
			var subitems = PO_OL.items.RefSubItems();
			orderinfo = PO_OL.items.RefMultiInfo();
			var order = 'NewMulti';
		}	 
		else{
			var items = PO_OL.items.RefSingle();
			var subitems = PO_OL.items.RefSubSingleItems();
			orderinfo = PO_OL.items.RefSingleInfo();
			var order = 'NewSingle';
		}

		if(winargs == null){
			winargs =  'height=500,width=500,scrollbars=1,toolbar=0,menubar=1,resizable=1'
		}
		var str = "";
		str = '<HTML><HEAD>';
		str += '<TITLE></TITLE>';
		str += '</HEAD>';
		str += '<BODY onLoad="window.name=\'' + order + '\'">';
	//SCR 577 JAG 20000125
		var neworder = window.open('../ui/nf_white.htm', order,winargs);
		var newdoc = neworder.document.open();
		newdoc.writeln(str);
		str = "";
		WriteInvisible(orderType,items,subitems,orderinfo,newdoc,neworder);
		WriteVisible(orderType,items,subitems,orderinfo, newdoc,neworder);
		if(neworder.closed==true){return false;}
		var str="</BODY></HTML>";
		newdoc.writeln(str);
		newdoc.close();
		neworder.focus();
		return true;
	}

//library functions
	function DiscountTotal()
	{
		var total = PO_OL.items.DiscountTotal();
		return total;
	}
function LineDiscount()
	{
		PO_OL.items.LineDiscount();
	}

function TotalVar(total_var)
	{
		var retstr = PO_OL.items.TotalVar(total_var);
		return retstr;
	}

 
	function TotalAll()
	{
	if(TOTALLED==false){
		PO_OL.items.TotalAll();
		TOTALLED=true;
	}
	
	}

	function AddSubPrice()
	{
		PO_OL.items.AddSubPrice();
	}

	function SubTotalItems()
	{
		var subtotal = PO_OL.items.SubTotalItems();
		return subtotal;
	}

	self.focus();



