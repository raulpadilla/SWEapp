<%Option Explicit%>
<% Response.Buffer =True %>
<!-- #include file="../setup.asp" -->
<!-- #include file="../java/jfunct.asp" -->
<%
Dim gtMsgObj, gtMess, Msgs, CurrentUserID, Site, ErrorString, actErrorString
Dim gtForm,gtForms, SiteObj, cPerms, gtObj, Action,VerfiyFalse,VerfiyTrue,ContentId
Dim ValidationId,ValidationType,MinVal,MaxVal,ValidationMsg,editorName,objMod,objRuleData
Dim cRule,cRules,Flag,FieldText

Msgs = "generic Title, js:no items selected, alt back button text, generic page error message " 
ValidationId = Trim(Request("validation_id"))
ValidationType = Request("validation_type")
MinVal = Request("txtMin")
MaxVal = Request("txtMax")
ValidationMsg = server.HTMLEncode(Request("txtErrorMsg"))

editorName = Request("editorName")
ContentId = Request("content_id")
Flag = Request("flag")
Action = Request("action")
FieldText = Request("field_text")
Set objMod = CreateObject(MODULE_OBJ)
Set gtMsgObj = Server.CreateObject(MSG_OBJ)

Set gtMess = gtMsgObj.GetMsgsByTitleTwo(AppConfStr, Msgs, Request.Cookies("ecm")("user_id"),ErrorString)
If (ErrorString <> "") Then
	Response.Write(ErrorString)
End If

If Request.Cookies("ecm").HasKeys Then
	CurrentUserID = Request.Cookies("ecm")("user_id")
	Site = request.cookies("ecm")("site_id")
Else
	CurrentUserID = 0
End If

Set objRuleData = Server.CreateObject("Scripting.Dictionary")
objRuleData.Add "user_id", CurrentUserID
objRuleData.Add "content_id", ContentId
objRuleData.Add "validation_id", ValidationId
objRuleData.Add "validation_type", ValidationType
objRuleData.Add "min_val", MinVal
objRuleData.Add "max_val", MaxVal
objRuleData.Add "validation_message", ValidationMsg

If (Flag = "True") Then
	If (Action = "New") Then
		ValidationId = objMod.AddRule(AppConfStr, objRuleData, ErrorString)
		If (ErrorString <> "") Then
			Response.Redirect "../reterror.asp?info=" & ErrorString
		End If
		If (InStr(1, FieldText, "<textarea") > 0 OR InStr(1, FieldText, "<TEXTAREA") > 0) Then
			If (ValidationType <> 0) Then
				FieldText = Replace(FieldText, "<textarea", "<textarea ekv=" & Chr(34) &  ValidationId & Chr(34) & " class=""redvalidation"" ")
                FieldText = Replace(FieldText, "<TEXTAREA", "<textarea ekv=" & Chr(34) &  ValidationId & Chr(34) & " class=""redvalidation"" ")
			else 
				FieldText = Replace(FieldText, "<textarea", "<textarea ekv=" & Chr(34) &  ValidationId & Chr(34) & " ")
                FieldText = Replace(FieldText, "<TEXTAREA", "<textarea ekv=" & Chr(34) &  ValidationId & Chr(34) & " ")
			end if 
		ElseIf (InStr(1,FieldText,"<select")>0 OR InStr(1,FieldText,"<SELECT")>0) Then
			If ValidationType <>0 Then
				FieldText=Replace(FieldText,"<select","<select ekv=" & Chr(34) &  ValidationId & Chr(34) & " class=""redvalidation"" ")
                FieldText=Replace(FieldText,"<SELECT","<select ekv=" & Chr(34) &  ValidationId & Chr(34) & " class=""redvalidation"" ")
			else 
				FieldText=Replace(FieldText,"<select","<select ekv=" & Chr(34) &  ValidationId & Chr(34) & " ")
                FieldText=Replace(FieldText,"<SELECT","<select ekv=" & Chr(34) &  ValidationId & Chr(34) & " ")
			end if 
		
		ElseIf (InStr(1,FieldText,"/>")>0) Then
			If ValidationType <>0 Then
				FieldText=Replace(FieldText,"/>"," ekv=" & Chr(34) &  ValidationId & Chr(34) &  " class=""redvalidation"" />")
			else 
				FieldText=Replace(FieldText,"/>"," ekv=" & Chr(34) &  ValidationId & Chr(34) &  " />")
			end if 
		Else
			If ValidationType <>0 Then
				FieldText=Replace(FieldText,">"," ekv=" & Chr(34) &  ValidationId & Chr(34) & " class=""redvalidation"" >")
			else 
				FieldText=Replace(FieldText,">"," ekv=" & Chr(34) &  ValidationId & Chr(34) & " >")
			end if 	
				
		End If
	ElseIf (Action = "Update") Then
		ValidationId = objMod.UpdateRule(AppConfStr,objRuleData,ErrorString)
		If (ValidationType = 0) Then
			FieldText = Replace(FieldText, "class=""redvalidation""", " ")
            FieldText = Replace(FieldText, "class=redvalidation", " ")
		elseIf (InStr(1, FieldText, "class=""redvalidation""") = 0) Then
				FieldText=Replace(FieldText,"ekv=""","class=""redvalidation"" ekv=""")
        elseIf (InStr(1, FieldText, "class=redvalidation") = 0) Then
				FieldText=Replace(FieldText,"ekv=","class=""redvalidation"" ekv=""")		
    end if
		If (ErrorString <> "") Then
			Response.Redirect "../reterror.asp?info=" & ErrorString
		End If
	End If
End If

If CLng(ValidationId) > 0 Then
	Set cRules=objMod.GetAllRulesToEdit(AppConfStr,CurrentUserId,0,ValidationId,ErrorString)
	If ErrorString<>"" Then
		Response.Redirect "../reterror.asp?info=" & ErrorString
	End If
	For Each cRule in cRules
		ValidationId = cRule("VALIDATION_ID")
		ValidationType = cRule("VALIDATION_TYPE")
		MinVal = cRule("MIN_VAL")
		MaxVal = cRule("MAX_VAL")
		ValidationMsg = cRule("VALIDATION_MESSAGE")
	Next
End If

Function isSelected(sValue, sDefault)
	If CStr(sValue) = CStr(sDefault) Then
		isSelected = "selected"
	Else
		isSelected = ""
	End If	
End Function

Set objRuleData=Nothing
%>
<html>
	<head>
		<meta http-equiv="pragma" content="no-cache">
		<%If (gtMess("charset") <> "") Then	%>
			<meta http-equiv="Content-Type" content="text/html; charset=<%=(gtMess("charset"))%>">
		<%End If%>
		<title>Form Validation Rules</title>
		<link rel="StyleSheet" href="../csslib/global.css" type="text/css"> 
		<script language="JavaScript1.2" type="text/javascript" src="eweputil.js"></script>
		<script language="javascript">
		
		function trim(s) {
		  while (s.substring(0,1) == ' ') {
    		s = s.substring(1,s.length);
  		  }
    	  while (s.substring(s.length-1,s.length) == ' ') {
    		s = s.substring(0,s.length-1);
  		  }
  		  return s;
		}
		function CheckKeyValue(item, keys) {
			var keyArray = keys.split(",");
			for (var i = 0; i < keyArray.length; i++) {
				if ((document.layers) || ((!document.all) && (document.getElementById))) {
					if (item.which == keyArray[i]) {
						return false;
					}
				}
				else {
					if (event.keyCode == keyArray[i]) {
						return false;
					}
				}
			}
		}
		function doSubmit(){
				var myindex, idx
				
				 myindex = document.frmValidation.selType.selectedIndex;
				if (myindex != 0 &&  trim(document.frmValidation.txtErrorMsg.value) == '' ) {
					alert('Enter the Error Message')
				}
				else {
					
					if (document.frmValidation.txtErrorMsg.value.match("'") == "'") {
						alert("Invalid Char(\" ' \") in the error message ");
						return false;
					}
					if ( (myindex == 9) || (myindex == 2) ) {
						if ( trim(document.frmValidation.txtMin.value) != '') {
							if (!(isNumeric(document.frmValidation.txtMin.value))) {
								alert('The min value must be a number');
								return;
							}
						}
						if ( trim(document.frmValidation.txtMax.value) != '') {
							if (!(isNumeric(document.frmValidation.txtMax.value))) {
								alert('The Max value must be a number');
								return;
							}
						}
					}
					
					if (myindex == 4) {
						if ( trim(document.frmValidation.txtMin.value) != '') {
							if (!(isDate(document.frmValidation.txtMin.value))) {
								alert('The min value must be a date');
								return;
							}
						}
						if ( trim(document.frmValidation.txtMax.value) != '') {
							if (!(isDate(document.frmValidation.txtMax.value))) {
								alert('The Max value must be a date');
								return;
							}
						}
					}
						
					idx=document.frmValidation.selType.selectedIndex;
					document.frmValidation.validation_type.value=document.frmValidation.selType.options[idx].value;;
					document.frmValidation.action ="validation.asp?flag=True&action=<%=Action%>&editorName=<%=editorName%>";
					document.frmValidation.submit();
				}
			}
			

function  isNumeric( strValue ) {
/******************************************************************************
DESCRIPTION: Validates that a string contains only valid numbers.

PARAMETERS:
   strValue - String to be tested for validity

RETURNS:
   True if valid, otherwise false.
******************************************************************************/
  var objRegExp  =  /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;

  //check for numeric characters
  return objRegExp.test(strValue);
}


function isDate( strValue ) {
/************************************************
DESCRIPTION: Validates that a string contains only
    valid dates with 2 digit month, 2 digit day,
    4 digit year. Date separator can be ., -, or /.
    Uses combination of regular expressions and
    string parsing to validate date.
    Ex. mm/dd/yyyy or mm-dd-yyyy or mm.dd.yyyy

PARAMETERS:
   strValue - String to be tested for validity

RETURNS:
   True if valid, otherwise false.

REMARKS:
   Avoids some of the limitations of the Date.parse()
   method such as the date separator character.
*************************************************/
  var objRegExp = /^\d{1,2}(\/)\d{1,2}\1\d{4}$/

  //check to see if in correct format
  if(!objRegExp.test(strValue))
    return false; //doesn't match pattern, bad date
  else{
    var strSeparator = strValue.substring(2,3) //find date separator
    var arrayDate = strValue.split(strSeparator); //split date into month, day, year
    //create a lookup for months not equal to Feb.
    var arrayLookup = { '01' : 31,'03' : 31, '04' : 30,'05' : 31,'06' : 30,'07' : 31,
                        '08' : 31,'09' : 30,'10' : 31,'11' : 30,'12' : 31}
    var intDay = parseInt(arrayDate[1]);

    //check if month value and day value agree
    if(arrayLookup[arrayDate[0]] != null) {
      if(intDay <= arrayLookup[arrayDate[0]] && intDay != 0)
        return true; //found in lookup table, good date
    }

    //check for February
    var intYear = parseInt(arrayDate[2]);
    var intMonth = parseInt(arrayDate[0]);
    if( ((intYear % 4 == 0 && intDay <= 29) || (intYear % 4 != 0 && intDay <=28)) && intDay !=0)
      return true; //Feb. had valid number of days
  }
  return false; //any other values, bad date
}

		
/***********************************************
* Contractible Headers script- � Dynamic Drive (www.dynamicdrive.com)
* This notice must stay intact for legal use. Last updated Oct 21st, 2003.
* Visit http://www.dynamicdrive.com/ for full source code
***********************************************/

var enablepersist="off" //Enable saving state of content structure using session cookies? (on/off)
var collapseprevious="no" //Collapse previously open content when opening present? (yes/no)

if (document.getElementById){
document.write('<style type="text/css">')
document.write('.switchcontent{display:none;}')
document.write('</style>')
}

function getElementbyClass(classname){
ccollect=new Array()
var inc=0
var alltags=document.all? document.all : document.getElementsByTagName("*")
for (i=0; i<alltags.length; i++){
if (alltags[i].className==classname)
ccollect[inc++]=alltags[i]
}
}

function contractcontent(omit){
var inc=0
while (ccollect[inc]){
if (ccollect[inc].id!=omit)
ccollect[inc].style.display="none"
inc++
}
}


function expandcontent(cid){
if (typeof ccollect!="undefined"){
if (collapseprevious=="yes")
contractcontent(cid)
document.getElementById(cid).style.display=(document.getElementById(cid).style.display!="block")? "block" : "none"
}
}

function expand_it(cid){
if (typeof ccollect!="undefined"){
document.getElementById(cid).style.display="block"
}
}

function collapse_it(cid){
if (typeof ccollect!="undefined"){
document.getElementById(cid).style.display="none"
}
}

function revivecontent(){
	contractcontent("omitnothing")
	selectedItem=getselectedItem()
	selectedComponents=selectedItem.split("|")
	for (i=0; i<selectedComponents.length-1; i++)
	document.getElementById(selectedComponents[i]).style.display="block"
}

function get_cookie(Name) { 
var search = Name + "="
var returnvalue = "";
if (document.cookie.length > 0) {
offset = document.cookie.indexOf(search)
if (offset != -1) { 
offset += search.length
end = document.cookie.indexOf(";", offset);
if (end == -1) end = document.cookie.length;
returnvalue=unescape(document.cookie.substring(offset, end))
}
}
return returnvalue;
}

function getselectedItem(){
if (get_cookie(window.location.pathname) != ""){
selectedItem=get_cookie(window.location.pathname)
return selectedItem
}
else
return ""
}

function saveswitchstate(){
var inc=0, selectedItem=""
while (ccollect[inc]){
if (ccollect[inc].style.display=="block")
selectedItem+=ccollect[inc].id+"|"
inc++
}

document.cookie=window.location.pathname+"="+selectedItem
}

function do_onload(){
	getElementbyClass("switchcontent")
	if (enablepersist=="on" && typeof ccollect!="undefined")
	revivecontent()
}


if (window.addEventListener)
window.addEventListener("load", do_onload, false)
else if (window.attachEvent)
window.attachEvent("onload", do_onload)
else if (document.getElementById)
window.onload=do_onload

if (enablepersist=="on" && document.getElementById)
window.onunload=saveswitchstate

		   
 function show_range() {
 	 var myindex
	 myindex = document.frmValidation.selType.selectedIndex;
	 if ((myindex == 9) || (myindex == 2) || (myindex == 4)) {	
		expand_it('sc3');
		if (myindex == 4) {
			expand_it('sc2');
		}
	 } else {
		collapse_it('sc3');
		collapse_it('sc2');
	 }
  }
  function show_range2(Min, Max) {
 	 var myindex
 	 var bMin
 	 var bMax
 	 var arMin = Min.split(',');
 	 var arMax = Max.split(',');
 	 bMin = false;
 	 bMax = false;
	 myindex = document.frmValidation.selType[document.frmValidation.selType.selectedIndex].value;
	 for (var i = 0; i < arMin.length; i++) {		
		//alert(myindex + ' == ' + trim(arMin[i]));
		if (myindex == trim(arMin[i])){
			bMin = true;
			break;
		}
	 }
	 for (var i = 0; i < arMax.length; i++) {
		if (myindex == trim(arMax[i])){
			bMax = true;
			break;
		}
	 }
	 if (bMin || bMax) {
		expand_it('sc3');		
	 } else {
		collapse_it('sc3');
		collapse_it('sc2');
	 }
  }
 
</script>

	</head>
	<body onload="setTimeout('myBodyLoad()', 50);">
		<form name="frmValidation" action="validation.asp" method="post">
			<input type=hidden name=editor_name value="<%=editorName%>">
			<input type=hidden name=field_text value="<%=Server.HTMLEncode(FieldText)%>">
			<input type=hidden name=validation_id value="<%=ValidationId%>">
			<input type=hidden name=validation_type value="<%=ValidationType%>">
			<input type=hidden name=content_id value="<%=ContentId%>">
			<table>
				<tr>
				<td class=label width="95">Validation Type:</td>				
				<td>
						<%
							dim cEnums, cEnum, ElementName, ElementType, strOptions, arMin, arMax
							Set objMod = CreateObject(MODULE_OBJ)
							if (InStr(1,FieldText,"<select") > 0 OR InStr(1,FieldText,"<SELECT") > 0) Then
								set cEnums = objMod.GetAllValidationEnum(AppConfstr, CurrentUserID, Site, "SELECT", "", true, ErrorString)								
							elseif (InStr(1,FieldText,"<textarea")>0 OR InStr(1,FieldText,"<TEXTAREA")>0) Then
								set cEnums = objMod.GetAllValidationEnum(AppConfstr, CurrentUserID, Site, "TEXTAREA", "text", false, ErrorString)								
							else
								ElementName = "INPUT"
								if (InStr(1, FieldText, "type=""password") > 0 OR InStr(1, FieldText, "type=password") > 0) then
									set cEnums = objMod.GetAllValidationEnum(AppConfstr, CurrentUserID, Site, "INPUT", "PASSWORD", false, ErrorString)									
								else
									set cEnums = objMod.GetAllValidationEnum(AppConfstr, CurrentUserID, Site, "INPUT", "TEXT", false, ErrorString)									
								end if
							end if
							
							For each cEnum in cEnums
								if (cEnum("EnumRange") <> 0) then
									if (cEnum("EnumRange") = 3) then
										if (arMin <> "") then
											arMin = arMin & ", " & cEnum("EnumID")
										else
											arMin = cEnum("EnumID")
										end if
										if (arMax <> "") then
											arMax = arMax & ", " & cEnum("EnumID")
										else
											arMax = cEnum("EnumID")
										end if
									else
										if (cEnum("EnumRange") = 1) then
											if (arMin <> "") then
												arMin = arMin & ", " & cEnum("EnumID")
											else
												arMin = cEnum("EnumID")
											end if
										else
											if (arMax <> "") then
												arMax = arMax & ", " & cEnum("EnumID")
											else
												arMax = cEnum("EnumID")
											end if
										end if
									end if
								end if							
								strOptions = strOptions & "<option value=""" & cEnum("EnumID") & """" & isSelected(ValidationType, cEnum("EnumID")) & ">" & cEnum("EnumName") & "</option>" & VbCrLf
							next
							set objMod = nothing
						%>
						<select name="selType" onchange="show_range2('<%=(arMin)%>','<%=(arMax)%>');">
							<%= (strOptions) %>
						</select>		
						<script language=javascript>
						function myBodyLoad() {	
							show_range2('<%=(arMin)%>','<%=(arMax)%>');
						}
						</script>	
				</td>
				</tr>				
				<tr>
					<td class=label width="95">Error Message:</td><td><input type=text name=txtErrorMsg OnKeyPress="javascript:return CheckKeyValue(event,'34');" size=40 value="<%=ValidationMsg%>"></td>
				</tr>
			</table>
			
			<div class="switchcontent" id="sc3">
				<table>
				<tr>
					<td class=label width="95">Min Value:</td><td><input type=text name=txtMin size=10 value="<%=MinVal%>"><div class="switchcontent" id="sc2"> Ex. mm/dd/yyyy</div></td>
				</tr>
				<tr>
					<td class=label width="95">Max Value:</td><td><input type=text name=txtMax size=10 value="<%=MaxVal%>"></td>
				</tr>
				</table>
			</div>
			<table align=center>
				<tr>
					<td><input type=button value="Save" name=btnSave onclick="javascript:doSubmit();"><input type=button value="Cancel" name=btnCancel onclick="javascript:self.close();"></td>
				</tr>
			</table>
		</form>
		
	</body>	
</html>	
<%If (Flag = "True") Then%>
<script language=javascript>		
		var objInstance = eWebEditProUtil.getOpenerInstance();
		objInstance.editor.pasteHTML('<%=FieldText%>');
		self.close();
</script>
<%End If%>
