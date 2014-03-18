<html>
	<head>
		<title>Comment</title>
	</head>
	<body onload="JavaScript:self.focus()">
	<form action="validation.asp" method="post" name="frmValidation">
		<input type="hidden" name="field_text" value="">
		<input type="hidden" name="validation_id" value="0">
		<input type="hidden" name="Action" value="New">
		<input type="hidden" name="editorName" value="<%=Request("editor_name")%>">
		<input type="hidden" name="content_id" value="<%=Request("id")%>">
	</form>
	<script language="JavaScript1.2" type="text/javascript" src="eweputil.js"></script>
	<script language="JavaScript1.2" type="text/javascript">
		var strTextData='';
		var objInstance = eWebEditProUtil.getOpenerInstance();
		strTextData = objInstance.editor.getSelectedHTML();
		// Remove CR LF
		strTextData = strTextData.replace(/\n/g, "");
		strTextData = strTextData.replace(/\r/g, "");
		
		if (!((strTextData.indexOf('<input')==0 && (strTextData.indexOf('type=')==-1 || strTextData.indexOf('type="input')>-1 || strTextData.indexOf('type="password')>-1)) || strTextData.indexOf('<textarea')==0 || strTextData.indexOf('<select')==0) &&
                !((strTextData.indexOf('<INPUT')==0 && (strTextData.indexOf('type=')==-1 || strTextData.indexOf('type=input')>-1 || strTextData.indexOf('type=password')>-1)) || strTextData.indexOf('<TEXTAREA')==0 || strTextData.indexOf('<SELECT')==0)) {
			alert('Can not apply validation to the type of field selected.');
			self.close();
		}else{
			document.frmValidation.field_text.value=strTextData;
			var iPos = strTextData.indexOf("ekv");
			if ( iPos > 0 ){
				document.frmValidation.validation_id.value=FindEkvID(strTextData);
				document.frmValidation.Action.value="Update";
			}else{
				document.frmValidation.validation_id.value="0";
				document.frmValidation.Action.value="New";
			}
			document.frmValidation.action="validation.asp";
			
			document.frmValidation.submit();
		}
		function FindEkvID(ekvText) {
			var strLength = ekvText.length;
			var cTemp='';
			var Id='';
			var cQuote=0;
			var i = ekvText.indexOf("ekv");
			var new_ekvText = ekvText.substring(i,strLength)
			for(var i=0;i < new_ekvText.length; i++) {
				cTemp =  new_ekvText.charAt(i);
				if (cTemp=="\""){
					cQuote+=1;
				}
				if ((cQuote==1) && (cTemp!="\"")){
					Id+=cTemp
				}
			}
			return(Id);
		}
	</script>
	</body>
	
</html>