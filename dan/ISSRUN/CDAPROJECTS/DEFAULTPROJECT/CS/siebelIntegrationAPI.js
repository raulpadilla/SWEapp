function GotoSSConfigurator(prodStr) {
if (typeof prodStr == "undefined") {
prodStr = "complex";
}
var optArgs = new Object();
var entryArgs = OL.GetCDAEntryArgs();
if (typeof entryArgs != "undefined" && entryArgs != null) {
for (var elem in entryArgs) {
optArgs[elem] = entryArgs[elem];
}
entryArgs.RowId = null;
}
optArgs.method = "GotoConfigurator";
optArgs.service = "ISSCDA RT UI Service";
OL.SendEvent("ADD_SIEBEL_ITEM", window, false, prodStr, optArgs);
}
function CheckProjectVersionForShowCDA(pagesetName) {
var optArgs = new Object();
optArgs.CallingService = "CDA";
optArgs.PagesetName = pagesetName;
optArgs.target = OL.FrameToString(OL)+"."+"dataFrame";
SendInformationToServer("ISSCDA RT UI Service", "ShowCDA", optArgs)
}
function AddToSSCart(prodStr, stayInEAdvisor) {
if (typeof prodStr == "undefined" || prodStr == null) {
prodStr = "complex";
}
if (typeof stayInEAdvisor == "undefined" || stayInEAdvisor == null) {
stayInEAdvisor = OL.StayInEAdvisor;
}
var optArgs = new Object();
var entryArgs = OL.GetCDAEntryArgs();
if (typeof entryArgs != "undefined" && entryArgs != null) {
for (var elem in entryArgs) {
optArgs[elem] = entryArgs[elem];
}
entryArgs.RowId = null;
}
optArgs.method = "AddToCart";
optArgs.service = "ISSCDA RT UI Service";
if (stayInEAdvisor) {
optArgs.target = OL.FrameToString(OL)+".dataFrame";
}
optArgs.stayInEAdvisor = stayInEAdvisor;
OL.SendEvent("ADD_SIEBEL_ITEM", window, true, prodStr, optArgs);
}
function CreateOpportunity(prodID, notesStr) {
var optArgs = new Object();
optArgs["Product Id"] = prodID;
optArgs["eAdvisor Results"] = notesStr;
optArgs.ProcessName = "eAdvisor Opportunity Integration";
SendInformationToServer("Workflow Process Manager", "RunProcess", optArgs);
}
function BuildQuestionAnswerString() {
var str = "";
for (var i = 0; i < arguments.length; i+=2) {
str+=arguments[i]+"   "+(((i+1)==arguments.length)?"":arguments[i+1])+(((i+2)==arguments.length)?"":"\n");
}
return str;
}
function SendSelectionInformationToServer(service, method, prodStr, enableLinkback, optArgs)
{
if (typeof prodStr == "undefined" || prodStr == "auto") {
prodStr = "complex";
} 
if(typeof enableLinkback == "undefined"){
enableLinkback = false;
}
if(typeof optArgs == "undefined"){
var optArgs = new Object();
}
optArgs.method = method;
optArgs.service = service;
OL.SendEvent("ADD_SIEBEL_ITEM", window, enableLinkback, prodStr, optArgs);
}
function SendInformationToServer(service, method, optArgs)
{
if(typeof optArgs == "undefined"){
var optArgs = new Object();
}
optArgs.method = method;
optArgs.service = service;
OL.SendEvent("SEND_TO_SERVER", window, optArgs);
}
function GetPrice(prodStr) {
if (typeof prodStr == "undefined") {
prodStr = "complex";
}
var optArgs = new Object();
var entryArgs = OL.GetCDAEntryArgs();
if (typeof entryArgs != "undefined" && entryArgs != null) {
for (var elem in entryArgs) {
optArgs[elem] = entryArgs[elem];
}
}
optArgs.method = "GetMyPrice";
optArgs.service = "ISSCDA RT UI Service";
optArgs.target = OL.FrameToString(OL)+"."+"dataFrame";
OL.SendEvent("ADD_SIEBEL_ITEM", window, false, prodStr, optArgs);
}
function ShowProductDetails(prodStr) {
if (typeof prodStr == "undefined") {
prodStr = "simple";
}
var optArgs = new Object();	
var entryArgs = OL.GetCDAEntryArgs();
if (typeof entryArgs != "undefined" && entryArgs != null) {
for (var elem in entryArgs) {
optArgs[elem] = entryArgs[elem];
}
}
optArgs.method = "GotoProductDetailView";
optArgs.service = "ISSCDA RT UI Service";
OL.SendEvent("ADD_SIEBEL_ITEM", window, false, prodStr, optArgs);
}
function GotoSSView(viewName) {
var optArgs = new Object();	
optArgs["ViewName"] = viewName;
var entryArgs = OL.GetCDAEntryArgs();
if (typeof entryArgs != "undefined" && entryArgs != null) {
for (var elem in entryArgs) {
optArgs[elem] = entryArgs[elem];
}
}
optArgs.method = "GotoView";
optArgs.service = "ISSCDA RT UI Service";
OL.SendEvent("SEND_TO_SERVER", window, optArgs);
}
function GetResultsValueInUnknownState(val) {
if (OL.ENGINE_RUNNING) {
var is = OL.GetInputState();
if (typeof is == "undefined" || is == null) {
return "";
} else {
return OL.GetInputState().results.GetValue(val);
}
} else {
return OL.GetResultsValue(val);
}
}
function GetBusCompID(col) {
var sepIndex = col.indexOf(".");
var busCompCol = col.slice(0, sepIndex+1)+"SS_"+col.slice(sepIndex+1);
return GetResultsValueInUnknownState(busCompCol);
}
function GetAttribute(col) {
var currInst = (OL.configEngine)?(OL.configEngine.currInstance)?OL.configEngine.currInstance:"TOP":"TOP";
var fullName = currInst+OL.GetInstanceDelimeterStr()+col;
var instanceName = OL.GetInstanceFromInstKey(fullName);
var column = OL.GetKeyFromInstKey(fullName);
var allAttrs = OL.GetInputState().GetInstanceInputs(instanceName).dataSet.attributeColumns.GetAttributes();
var matchIndex;
for (var i = 0; i < allAttrs.length; i++) {
matchIndex=allAttrs[i].indexOf(column+"=");
if ( matchIndex != -1) {
return (allAttrs[i].slice(matchIndex+(column+"=").length))+"="+OL.GetResultsValueInUnknownState(col);
}
}
return "";
}
function BuildProductStr(id, qty, attrs, children, relationshipName) {
var str = "";
if (typeof id == "undefined" || id=="" || id==null) return "";
if (typeof relationshipName != "undefined" && relationshipName != null && relationshipName != "") {
str+= "relationship="+relationshipName+"&*";
}
str += "prodID="+id;
if (typeof qty == "undefined" || qty == null) {
qty = 1;
}
str += "&*qty="+qty;
str+="&*attributes={";	
if (typeof attrs != "undefined" && attrs != null  && attrs.length > 0) {
for (var i = 0; i < attrs.length-1; i++) {
if (attrs[i] != "") {
str+=attrs[i]+"&*";
}
}
str+=attrs[attrs.length-1];
}
str+="}"+"&*children={";;
if (typeof children != "undefined" && children != null  && children.length > 0) {
for (var i = 0; i < children.length-1; i++) {
if (children[i] != "") {
str+=children[i]+"|*";
}
}
str+=children[children.length-1];
}
str+="}"
return str;
}
function AddAttributeToProductStr(str, newAttr) {
var m=str.match(/([^\{]+)\&\*attributes=\{([^\}]*)\}(.*)/);
if (m==null | m.length < 4) return "";
return m[1]+"&*attributes={"+((m[2].length>0)?m[2]+"&*":"")+newAttr+"}"+m[3]; 
}
function AddChildToProductStr(str, newChild) {
var m=str.match(/([^\{]+)\&\*attributes=\{([^\}]*)\}\&\*children=\{(.*)\}/);
if (m==null | m.length < 4) return "";
return m[1]+"&*attributes={"+m[2]+"}&*children={"+((m[3].length>0)?m[3]+"|*":"")+newChild+"}"; 
}
function AddRelationshipNameToProductStr(prodStr, relationshipName) {
return ReplaceValue(prodStr, "relationship=", relationshipName);
}
function AddProdIDToProductStr(prodStr, prodID) {
return ReplaceValue(prodStr, "prodID=", prodID);
}
function AddQuantityToProductStr(prodStr, qty) {
return ReplaceValue(prodStr, "qty=", qty);
}
function ReplaceValue(prodStr,key,val) {
var oldIndex = prodStr.indexOf(key);
if (oldIndex == -1) {
return key+val+"&*"+prodStr;
}
var endOfPair = prodStr.indexOf("&*", oldIndex);
if (endOfPair == -1) endOfPair = prodStr.length;
return (prodStr.slice(0, oldIndex)+key+val+prodStr.slice(endOfPair));
}
function BuildAttributeList() {
var arr = new Array();
for (var i = 0; i < arguments.length; i++) {
arr[i] = arguments[i];
}
return arr;
}
function BuildChildList() {
var arr = new Array();
for (var i = 0; i < arguments.length; i++) {
arr[i] = arguments[i];
}
return arr;
}
/*****************************************************************************
*
* Copyright (C) 2000, Siebel Systems, Inc., All rights reserved.
*
* FILE:       propset.js
*  $Revision: 31 $
*      $Date: 11/04/01 12:07a $
*    $Author: Mrfreeze $ of last update
*
* CREATOR:    John Coker
*
* DESCRIPTION
*    Property Set class for JavaScript browser tier
*
*****************************************************************************/
/*
* JSSPropertySet
*
* childArray
* childEnum
* propArray
* propArrayLen
* propEnum
* propEnumArray
* type
* value
* encoded
* encodeArray
* encodePos
* decodePos
*/
function JSSPropertySet (bDontCreateAxObj)
{ 
this.Reset (); 
if ((bDontCreateAxObj == null || bDontCreateAxObj == false) && 
top._swe._sweapp.S_App != null && 
top._swe._sweapp.S_App.useActiveXClient)
{
this.axObj = top._swe._sweapp.S_ClientOM.NewPropertySet();
this.axObj.jsObj = this;
}
else
this.axObj = null;
}
function JSSPropertySet_AddChild (child)
{
if (child == null ||
typeof (child) != "object" ||
child.constructor != JSSPropertySet)
return (false);
if (this.axObj != null)
{
this.axObj.AddChild (child.axObj);
return (true);
}
this.childArray[this.childArray.length] = child;
return (true);
}
function JSSPropertySet_Clone ()
{
var  i;
var  name;
var  value;
var  dup = new JSSPropertySet ();
name = this.GetType ();
if (name != null && name != "")
dup.SetType (name);
value = this.GetValue ();
if (value != null && value != "")
dup.SetValue (value);
for (name in this.propArray)
dup.SetPropertyStr (name, this.propArray[name]);
for (i = 0; i < this.childArray.length; i++)
{
oldChild = this.childArray[i];
if (oldChild == null)
break;
newChild = oldChild.Clone();
dup.AddChild (newChild);
}
return (dup);
}
function JSSPropertySet_Copy (old)
{
var  i;
var  oldChild;
var  name;
if (this.axObj != null)
{     
if (old == null)
return (false);
this.axObj.Copy (old.axObj); 
return (true);
}
this.Reset ();
if (old == null)
return (false);
name = old.GetType ();
if (name != null && name != "")
this.SetType (name);
value = old.GetValue ();
if (value != null && value != "")
this.SetValue (value);
for (name in old.propArray)
this.SetPropertyStr (name, old.propArray[name]);
for (i = 0; i < old.childArray.length; i++)
{
oldChild = old.childArray[i];
if (oldChild == null)
break;
newChild = new JSSPropertySet ();
newChild.Copy (oldChild);
this.AddChild (newChild);
}
return (true);
}
function JSSPropertySet_EnumChildren (first)
{
if (this.axObj != null)
{
var ps = null;
var axPs = this.axObj.EnumChildren (first);
if (axPs != null)
{
ps = new JSSPropertySet (true);
ps.axObj = axPs;
this.axObj.jsObj = this;
}
return (ps);
}
if (first)
this.childEnum = 0;
if (this.childEnum >= this.childArray.length)
return (null);
return (this.childArray[this.childEnum++]);
}
function JSSPropertySet_EnumProperties (first)
{
if (this.axObj != null)
return (this.axObj.EnumProperties (first));
if (first)
{
this.propEnumArray = new Array;
for (next in this.propArray)
this.propEnumArray[this.propEnumArray.length] = next;
this.propEnum = 0;
}
if (this.propEnumArray == null ||
this.propEnum >= this.propEnumArray.length)
return (null);
return (this.propEnumArray[this.propEnum++]);
}
function JSSPropertySet_GetPropertiesSize ()
{
if (this.axObj != null)
return (this.axObj.GetPropertiesSize());
var propName;
var size = 0;
for (propName in this.propArray)
{
size += this.propArray[propName].length;
}
return (size);
}
function JSSPropertySet_GetChild (index)
{
if (this.axObj != null)
{
var ps = null;
var axPs = this.axObj.GetChild (index);
if (axPs != null)
{
ps = new JSSPropertySet (true);
ps.axObj = axPs;
this.axObj.jsObj = this;
}
return (ps);
}
var  at;
at = parseInt (index);
if (isNaN(at) || at < 0 || at >= this.childArray.length)
return (null);
return (this.childArray[at]);
}
function JSSPropertySet_GetChildByType (type)
{
if (this.axObj != null)
{
var ps = null;
var axPs = this.axObj.GetChildByType (type);
if (axPs != null)
{
ps = new JSSPropertySet (true);
ps.axObj = axPs;
this.axObj.jsObj = this;
}
return (ps);
}
var  child;
var  i;
for (i = 0; i < this.childArray.length; i++)
{
child = this.childArray[i];
if (child.type == type)
return (child);
}
return (null);
}
function JSSPropertySet_GetChildCount ()
{
if (this.axObj != null)
return (this.axObj.GetChildCount ());
return (this.childArray.length);
}
function JSSPropertySet_GetFirstProperty ()
{
return (this.EnumProperties(true));
}
function JSSPropertySet_GetNextProperty ()
{
return (this.EnumProperties(false));
}
function JSSPropertySet_GetPropertyAsStr (name)
{
if (this.axObj != null)
return (this.axObj.GetProperty (name));
if (name == null || name == "" || this.propArray[name] == null)
return ("");
return (this.propArray[name].toString());
}
function JSSPropertySet_GetProperty (name)
{
if (name == null || name == "")
return ("");
if (this.axObj != null)
return (this.axObj.GetProperty (String(name)));
return (this.propArray[name]);
}
function JSSPropertySet_GetPropertyCount ()
{
if (this.axObj != null)
return (this.axObj.GetPropertyCount ());
return (this.propArrayLen);
}
function JSSPropertySet_GetQueryString ()
{
if (this.axObj != null)
return (this.axObj.GetQueryString ());
else
return (null);
}
function JSSPropertySet_GetType ()
{
if (this.axObj != null)
return (this.axObj.GetType ());
return (this.type);
}
function JSSPropertySet_GetValue ()
{
if (this.axObj != null)
return (this.axObj.GetValue ());
return (this.value);
}
function JSSPropertySet_InsertChildAt (child, index)
{
if (this.axObj != null)
return (this.axObj.InsertChildAt (child.axObj, index));
var  at;
var  i;
if (child == null ||
typeof (child) != "object" ||
child.constructor != JSSPropertySet)
return (false);
at = parseInt (index);
if (isNaN(at) || at < 0)
return (false);
if (at >= this.childArray.length)
{
this.childArray[this.childArray.length] = child;
}
else
{
for (i = this.childArray.length; i > at; i--)
this.childArray[i] = this.childArray[i - 1];
this.childArray[at] = child;
}
return (true);
}
function JSSPropertySet_PropertyExists (name)
{
if (this.axObj != null)
return (this.axObj.PropertyExists (name));
if (name == null || name == "")
return (false);
return ((this.propArray[name]) != null);
}
function JSSPropertySet_RemoveChild (index)
{
if (this.axObj != null)
return (this.axObj.RemoveChild (index));
var  at;
var  i;
at = parseInt (index);
if (isNaN(at) || at < 0 || at >= this.childArray.length)
return (false);
for (i = at; i < this.childArray.length - 1; i++)
this.childArray[i] = this.childArray[i + 1];
this.childArray[this.childArray.length - 1] = null;
this.childArray.length = this.childArray.length - 1;
return (true);
}
function JSSPropertySet_RemoveProperty (name)
{
if (this.axObj != null)
return (this.axObj.RemoveProperty (name));
if (name == null || name == "")
return;
if (this.propArray[name] == null)
return;
this.propArray[name] = null;
this.propArrayLen--;
}
function JSSPropertySet_Reset ()
{
if (this.axObj != null)
{  
this.axObj.Reset ();
return;
}
this.childArray    = new Array;
this.childEnum     = 0;
this.propArray     = new Array;
this.propArrayLen  = 0;
if (this.propEnum != null)       
this.propEnum   = 0;
if (this.propEnumArray != null)
this.propEnumArray = null;
this.type          = "";
this.value         = "";
}
function JSSPropertySet_SetProperty (name, value)
{
if (name == null || name == "")
return (false);
if (this.axObj != null)
return ( this.axObj.SetProperty (String(name), String(value)) );
return this.SetPropertyStr (String(name), String(value));
}
function JSSPropertySet_SetPropertyStr (name, value)
{
if (this.propArray[name] == null)
this.propArrayLen++;
this.propArray[name] = value;
return (true);
}
function JSSPropertySet_SetType (type)
{
if (this.axObj != null)
return (this.axObj.SetType (type));
this.type = type;
return (true);
}
function JSSPropertySet_SetValue (value)
{
if (this.axObj != null)
return (this.axObj.SetValue (value));
this.value = value;
return (true);
}
function JSSPropertySet_GetAxObj ()
{
return (this.axObj);
}
function JSSPropertySet_DecodeFromStringOld (encodedValue)
{
var  formatPrefix;
var  iFormatPrefix;
this.Reset ();
if (encodedValue == null || encodedValue == "")
return (true);
formatPrefix = encodedValue.charAt(0);
if (formatPrefix != '@')
{
top._swescript.SWEAlert ("Invalid encoding of property set " + encodedValue);  
return (false);
}
this.encoded   = encodedValue;
this.decodePos = 1;
if (!this.ReadHeader () ||
!this.ReadPropertySet (this))
{
this.Reset ();
top._swescript.SWEAlert ("Invalid encoded property set string");
return (false);
}
this.encoded   = null;
this.decodePos = null;
return (true);
}
function JSSPropertySet_EncodeAsStringOld ()
{
var retval;
this.encodeArray    = new Array ();
this.encodeArray[0] = '@';
if (!this.WriteHeader () ||
!this.WritePropertySet (this))
{
assert ("Unable to encode property set");
retval = null;
}
else
{
retval = this.encodeArray.join ("");
}
this.encodeArray = null;
return (retval);
}
function JSSPropertySet_ReadHeader ()
{
var  value;
value = this.ReadInteger ();
if (value != 0)
return (false); 
if (this.ReadInteger () == null)
return (false);   
return (true);
}
function JSSPropertySet_ReadInteger ()
{
var  star;
var  value;
if (this.decodePos >= this.encoded.length)
return (null);
star = this.encoded.indexOf ('*', this.decodePos);
if (star <= 0)
return (null);
value = parseInt (this.encoded.substr (this.decodePos, star - this.decodePos));
if (isNaN(value))
return (null);
this.decodePos = star + 1;
return (value);
}
function JSSPropertySet_ReadPropertySet (propSet)
{
var  nProperties;
var  nChildren;
var  newPropSet;
var  decodePos;
var  length;
var  star;
var  strlen;
var  i;
var  k;
var  v;
nProperties = this.ReadInteger ();
if (nProperties == null)
return (false);
nChildren = this.ReadInteger ();
if (nChildren == null)
return (false);
v = this.ReadString ();
if (v == null)
return (false);
if (!this.ReadValueVariant (propSet))
return (false);
propSet.SetType (v);
decodePos = this.decodePos;
length    = this.encoded.length;
for (i = 0; i < nProperties; i++)
{
/*
k = this.ReadString ();
if (k == null)
return (false);
v = this.ReadString ();
if (v == null)
return (false);
*/
if (decodePos >= length)
return (false);
star = this.encoded.indexOf ('*', decodePos);
if (star <= 0)
return (false);
strlen = parseInt (this.encoded.substr (decodePos, star - decodePos));
if (isNaN(strlen))
return (false);
decodePos = star + 1;
if (strlen > 0)
{
k = this.encoded.substr (decodePos, strlen);
decodePos += strlen;
}
else
k = "";
if (decodePos >= length)
return (false);
star = this.encoded.indexOf ('*', decodePos);
if (star <= 0)
return (false);
strlen = parseInt (this.encoded.substr (decodePos, star - decodePos));
if (isNaN(strlen))
return (false);
decodePos = star + 1;
if (strlen > 0)
{
v = this.encoded.substr (decodePos, strlen);
decodePos += strlen;
}
else
v = "";
/*
propSet.SetPropertyStr (k, v);
*/
if (propSet.propArray[k] == null)
propSet.propArrayLen++;
propSet.propArray[k] = v;
}
this.decodePos = decodePos;
for (i = 0; i < nChildren; i++)
{
newPropSet = new JSSPropertySet ();
propSet.AddChild (newPropSet);
if (!this.ReadPropertySet (newPropSet))
return (false);
}
return (true);
}
function JSSPropertySet_ReadString ()
{
var  cLen;
var  str;
cLen = this.ReadInteger ();
if (cLen == null || cLen < 0)
return (null);
if (cLen == 0)
return ("");
str = this.encoded.substr (this.decodePos, cLen);
this.decodePos += cLen;
return (str);
}
function JSSPropertySet_ReadValueVariant (propSet)
{
var nType;
nType = this.ReadInteger ();
if (nType == 3 || nType == 6)
propSet.value = this.ReadString ();
else if (nType == 0)
propSet.value = "";
else if (nType == 1)
propSet.value = this.ReadInteger ().toString ();
else
{
top._swescript.SWEAlert ("Unsupported property set value type: " + nType);
return (false);
}
return (true);
}
function JSSPropertySet_WriteHeader ()
{
this.WriteInteger (0);
this.WriteInteger (0);
return (true);
}
function JSSPropertySet_WriteInteger (value)
{
this.encodeArray[this.encodeArray.length] = value.toString () + '*';
}
function JSSPropertySet_WritePropertySet (propSet)
{
var  childPropSet;
var  i;
var  nChildren;
var  nProperties;
var  prop;
nProperties = propSet.GetPropertyCount ();
nChildren = propSet.GetChildCount ();
this.WriteInteger (nProperties);
this.WriteInteger (nChildren);
this.WriteString (propSet.GetType ());
if (!this.WriteValueVariant (propSet))
return (false);
for (prop in propSet.propArray)
{
this.WriteString (prop);
this.WriteString (propSet.propArray[prop]);
}
for (i = 0; i < nChildren; i++)
{
childPropSet = propSet.GetChild (i);
if (!this.WritePropertySet (childPropSet))
return (false);
}
return (true);
}
function JSSPropertySet_WriteString (str)
{
if (str == null)
str = "";
this.WriteInteger (str.length);
if (str.length > 0)
this.encodeArray[this.encodeArray.length] = str;
}
function JSSPropertySet_WriteValueVariant (propSet)
{
this.WriteInteger (3);   
this.WriteString (propSet.value);
return (true);
}
function JSSPropertySet_DecodeFromString (encodedValue)
{
if (this.axObj != null)
{
this.axObj.DecodeFromString (encodedValue);
return (true);
}
var  formatPrefix;
var  separator;
var  iFormatPrefix;
this.Reset ();
if (encodedValue == null || encodedValue == "")
return (true);
formatPrefix = encodedValue.charAt(0);
if (formatPrefix != '@')
{
top._swescript.SWEAlert ("Invalid encoding of property set " + encodedValue);  
return (false);
}
separator = encodedValue.charAt(2);
if (separator == '*')
return this.DecodeFromStringOld (encodedValue);
this.arr = encodedValue.split(separator);
this.arr[0] = this.arr[0].substr(1);
this.arrPos = 0;
if (!this.ReadHeader2 () ||
!this.ReadPropertySet2 (this))
{
this.arr    = null;
this.Reset ();
top._swescript.SWEAlert ("Invalid encoded property set string");
return (false);
}
this.arr    = null;
this.arrPos = 0;
return (true);
}
function JSSPropertySet_EncodeAsString ()
{
if (this.axObj != null)
return (this.axObj.EncodeAsString ());
var retval;
this.encodeArray    = new Array ();
this.strArray    = new Array ();
if (!this.WriteHeader2 () ||
!this.WritePropertySet2 (this))
{
assert ("Unable to encode property set");
retval = null;
}
else
{
var datastrs = this.strArray.join("");
var i;
var sepChars = "`^~[";
for (i = 0; i < sepChars.length; i++)
{
if (datastrs.indexOf(sepChars.charAt(i)) < 0)
break;
}
if (i == sepChars.length)
retval = null;
else
{
this.encodeArray[0] = '@' + this.encodeArray[0];
this.encodeArray[this.encodeArray.length] = "";
retval = this.encodeArray.join (sepChars.charAt(i));
}
}
this.encodeArray = null;
this.strArray = null;
if (retval == null)
return this.EncodeAsStringOld ();     
return (retval);
}
function JSSPropertySet_ReadHeader2 ()
{
var  value;
value = this.ReadInteger2 ();
if (value != 0)
return (false); 
if (this.ReadInteger2 () == null)
return (false);   
return (true);
}
function JSSPropertySet_ReadInteger2 ()
{
if (this.arrPos >= this.arr.length)
return (null);
value = parseInt (this.arr[this.arrPos++]);
if (value == NaN)
return (null);
return (value);
}
function JSSPropertySet_ReadPropertySet2 (propSet)
{
var  nProperties;
var  nChildren;
var  newPropSet;
var  i;
var  k;
var  v;
nProperties = this.ReadInteger2 ();
if (nProperties == null)
return (false);
nChildren = this.ReadInteger2 ();
if (nChildren == null)
return (false);
v = this.ReadString2 ();
if (v == null)
return (false);
if (!this.ReadValueVariant2 (propSet))
return (false);
propSet.SetType (v);
for (i = 0; i < nProperties; i++)
{
k = this.arr[this.arrPos++];
if (k == null)
return (false);
v = this.arr[this.arrPos++];
if (v == null)
return (false);
if (propSet.propArray[k] == null)
propSet.propArrayLen++;
propSet.propArray[k] = v;
}
for (i = 0; i < nChildren; i++)
{
newPropSet = new JSSPropertySet ();
propSet.AddChild (newPropSet);
if (!this.ReadPropertySet2 (newPropSet))
return (false);
}
return (true);
}
function JSSPropertySet_ReadString2 ()
{
if (this.arrPos >= this.arr.length)
return (null);
return (this.arr[this.arrPos++]);
}
function JSSPropertySet_ReadValueVariant2 (propSet)
{
var nType;
nType = this.ReadInteger2 ();
if (nType == 3 || nType == 6)
propSet.value = this.ReadString2 ();
else if (nType == 0)
propSet.value = "";
else if (nType == 1)
propSet.value = this.ReadInteger2 ().toString ();
else
{
top._swescript.SWEAlert ("Unsupported property set value type: " + nType);
return (false);
}
return (true);
}
function JSSPropertySet_WriteHeader2 ()
{
this.WriteInteger2 (0);
this.WriteInteger2 (0);
return (true);
}
function JSSPropertySet_WriteInteger2 (value)
{
this.encodeArray[this.encodeArray.length] = value;
}
function JSSPropertySet_WritePropertySet2 (propSet)
{
var  childPropSet;
var  i;
var  nChildren;
var  nProperties;
var  prop;
nProperties = propSet.GetPropertyCount ();
nChildren = propSet.GetChildCount ();
this.WriteInteger2 (nProperties);
this.WriteInteger2 (nChildren);
this.WriteString2safe (propSet.GetType ());
if (!this.WriteValueVariant2 (propSet))
return (false);
for (prop in propSet.propArray)
{
this.WriteString2safe (prop);
if (!this.WriteString2 (propSet.propArray[prop]))
return (false);
}
for (i = 0; i < nChildren; i++)
{
childPropSet = propSet.GetChild (i);
if (!this.WritePropertySet2 (childPropSet))
return (false);
}
return (true);
}
function JSSPropertySet_WriteString2safe (str)
{
if (str == null)
str = "";
this.encodeArray[this.encodeArray.length] = str;
}
function JSSPropertySet_WriteString2 (str)
{
if (str == null)
str = "";
else if (str != "")
this.strArray[this.strArray.length] = str;
this.encodeArray[this.encodeArray.length] = str;
return (true);
}
function JSSPropertySet_WriteValueVariant2 (propSet)
{
this.WriteInteger2 (3);   
if (!this.WriteString2 (propSet.value))
return (false);
return (true);
}
JSSPropertySet.prototype.AddChild         = JSSPropertySet_AddChild;
JSSPropertySet.prototype.Clone            = JSSPropertySet_Clone
JSSPropertySet.prototype.Copy             = JSSPropertySet_Copy;
JSSPropertySet.prototype.DecodeFromString = JSSPropertySet_DecodeFromString;
JSSPropertySet.prototype.EncodeAsString   = JSSPropertySet_EncodeAsString;
JSSPropertySet.prototype.EnumChildren     = JSSPropertySet_EnumChildren;
JSSPropertySet.prototype.EnumProperties   = JSSPropertySet_EnumProperties;
JSSPropertySet.prototype.GetChild         = JSSPropertySet_GetChild;
JSSPropertySet.prototype.GetChildByType   = JSSPropertySet_GetChildByType;
JSSPropertySet.prototype.GetChildCount    = JSSPropertySet_GetChildCount;
JSSPropertySet.prototype.GetProperty      = JSSPropertySet_GetProperty;
JSSPropertySet.prototype.GetPropertyAsStr = JSSPropertySet_GetPropertyAsStr;
JSSPropertySet.prototype.GetFirstProperty = JSSPropertySet_GetFirstProperty;
JSSPropertySet.prototype.GetNextProperty  = JSSPropertySet_GetNextProperty;
JSSPropertySet.prototype.GetPropertyCount = JSSPropertySet_GetPropertyCount;
JSSPropertySet.prototype.GetQueryString   = JSSPropertySet_GetQueryString;
JSSPropertySet.prototype.GetType          = JSSPropertySet_GetType;
JSSPropertySet.prototype.GetValue         = JSSPropertySet_GetValue;
JSSPropertySet.prototype.InsertChildAt    = JSSPropertySet_InsertChildAt;
JSSPropertySet.prototype.PropertyExists   = JSSPropertySet_PropertyExists;
JSSPropertySet.prototype.RemoveChild      = JSSPropertySet_RemoveChild;
JSSPropertySet.prototype.RemoveProperty   = JSSPropertySet_RemoveProperty;
JSSPropertySet.prototype.Reset            = JSSPropertySet_Reset;
JSSPropertySet.prototype.SetProperty      = JSSPropertySet_SetProperty;
JSSPropertySet.prototype.SetPropertyStr   = JSSPropertySet_SetPropertyStr;
JSSPropertySet.prototype.SetType          = JSSPropertySet_SetType;
JSSPropertySet.prototype.SetValue         = JSSPropertySet_SetValue;
JSSPropertySet.prototype.GetAxObj         = JSSPropertySet_GetAxObj;
JSSPropertySet.prototype.GetPropertiesSize= JSSPropertySet_GetPropertiesSize;
JSSPropertySet.prototype.DecodeFromStringOld  = JSSPropertySet_DecodeFromStringOld;
JSSPropertySet.prototype.EncodeAsStringOld    = JSSPropertySet_EncodeAsStringOld;
JSSPropertySet.prototype.ReadHeader        = JSSPropertySet_ReadHeader;
JSSPropertySet.prototype.ReadInteger       = JSSPropertySet_ReadInteger;
JSSPropertySet.prototype.ReadPropertySet   = JSSPropertySet_ReadPropertySet;
JSSPropertySet.prototype.ReadString        = JSSPropertySet_ReadString;
JSSPropertySet.prototype.ReadValueVariant  = JSSPropertySet_ReadValueVariant;
JSSPropertySet.prototype.WriteHeader       = JSSPropertySet_WriteHeader;
JSSPropertySet.prototype.WriteInteger      = JSSPropertySet_WriteInteger;
JSSPropertySet.prototype.WritePropertySet  = JSSPropertySet_WritePropertySet;
JSSPropertySet.prototype.WriteString       = JSSPropertySet_WriteString;
JSSPropertySet.prototype.WriteValueVariant = JSSPropertySet_WriteValueVariant;
JSSPropertySet.prototype.ReadHeader2        = JSSPropertySet_ReadHeader2;
JSSPropertySet.prototype.ReadInteger2       = JSSPropertySet_ReadInteger2;
JSSPropertySet.prototype.ReadPropertySet2   = JSSPropertySet_ReadPropertySet2;
JSSPropertySet.prototype.ReadString2        = JSSPropertySet_ReadString2;
JSSPropertySet.prototype.ReadValueVariant2  = JSSPropertySet_ReadValueVariant2;
JSSPropertySet.prototype.WriteHeader2       = JSSPropertySet_WriteHeader2;
JSSPropertySet.prototype.WriteInteger2      = JSSPropertySet_WriteInteger2;
JSSPropertySet.prototype.WritePropertySet2  = JSSPropertySet_WritePropertySet2;
JSSPropertySet.prototype.WriteString2       = JSSPropertySet_WriteString2;
JSSPropertySet.prototype.WriteString2safe   = JSSPropertySet_WriteString2safe;
JSSPropertySet.prototype.WriteValueVariant2 = JSSPropertySet_WriteValueVariant2;
function CCFMiscUtil_ArrayToString (arr)
{
var       i;
var       encoded = "";
var       str;
for (i = 0; i < arr.length; i++)
{
str = arr[i];
if (str == null || str == "")
encoded += "0*";
else
encoded += str.length + '*' + str;
}
return (encoded);
}
function CCFMiscUtil_StringToArray (str, arr)
{
var      i;
var      len;
var      next;
var      star;
if (arr == null || arr.length > 0)
return (false);
if (str == null || str == "")
return (true);
next   = 0;
i      = 0;
while (next < str.length)
{
star = str.indexOf ('*', next);
if (star <= 0)
return (false);
len    = parseInt (str.substr (next, star - next));
if (isNaN(len))
return (false);
if (len <= 0)
{
arr[i++] = "";
next = star + 1;
}
else
{
arr[i++] = str.substr (star + 1, len);
next = star + 1 + len;
}
}
return (true);
}
function CCFMiscUtil_PropArrayGetVal (arr, prop)
{
var i;
if (arr.length >= 2)
{
for (i = 0; i < arr.length; i += 2)
{
if (arr[i] == prop)
return (arr[i+1]);
}
}
return "";
}
function CCFMiscUtil_PropArraySetVal (arr, prop, val)
{
var i = 0;
if (arr.length >= 2)
{
for (; i < arr.length; i += 2)
{
if (arr[i] == prop)
{
arr[i+1] = val;
return;
}
}
}
arr[i] = prop;
arr[i+1] = val;
}
function CCFMiscUtil_CreatePropSet ()
{
/*   if (typeof (top._swe._sweapp.S_ClientOM) != "undefined" &&
top._swe._sweapp.S_ClientOM != null)
return top._swe._sweapp.S_ClientOM.NewPropertySet();
else*/
return new JSSPropertySet ();
}
