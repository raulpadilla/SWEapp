function CreateStringFromPackage(pckg, data)
{
if(typeof data != "undefined" &&  typeof pckg["items"] != "undefined"){
if(typeof pckg["items"] == "object" ) {
if ( typeof data["prodType"] != "undefined" ) {
data["ProductInfo"] = WriteProductString(pckg["items"], data["prodType"]);
}
}
else if(typeof pckg["items"] == "string"){
data["ProductInfo"] = pckg["items"];
}
}
if(typeof pckg["linkBack"] != "undefined" && pckg["linkBack"] != null && typeof pckg["linkBack"] != "undefined"){
data["LinkbackInfo"] = WriteLinkBackString(pckg["linkBack"]);
}
OL.SendEvent("SEND_TO_SERVER", window, data);
}
function WriteProductString(pckg, productType)
{
var str="";
if(productType.indexOf("complex") == 0){
str += WriteComplexProductString(pckg);
}
else if(productType.indexOf("simple") == 0){
str += WriteSimpleProductString(pckg);
}
return str;
}
function WriteComplexProductString(pckg){
var str = "";
for(var item in pckg){
if(typeof pckg[item] != "object"){
var curVal = null;
if(typeof pckg[item] != "undefined" && pckg[item] != ""){
curVal = pckg[item];
}
str += item + "=" + curVal + "&*";	
}
else if(item.indexOf("children")!= -1){
str += "children={"; 
var count = 0;
for(var subitem in pckg[item]){
if(count != 0){str+= "|*";}
str += WriteComplexProductString(pckg[item][subitem]);
count++;
}
str+="}";
}
else if(item.indexOf("attributes")!= -1){
str += "attributes={";
var attr_count = 0;
for(var attr in pckg[item]){
if(attr_count != 0){
str+= "&*";
}
str += attr + "=" + pckg[item][attr];
attr_count++;
}
str+="}&*";
}
}
return str;
}
function WriteSimpleProductString(pckg){
var str = "";
for(var item in pckg){
if(typeof pckg[item] != "object"){
var curVal = null;
if(typeof pckg[item] != "undefined" && pckg[item] != ""){
curVal = pckg[item];
}
if(item.indexOf("prodID") == 0 || item.indexOf("qty") == 0){
if (str.length != 0){
str += "&*";
}	
str += item + "=" + curVal;	
}		
}
}
return str;
}
function WriteLinkBackString(linkback)
{
var str = "";
var top_ct = false;
for(var inst in linkback){
var ct = false;
if(top_ct){
str += "&*";
}
str += inst + "={";
top_ct = true;
for(var info in linkback[inst]){
if(ct){
str+="&*";
}
if(typeof linkback[inst][info]!= "object"){
str+=info + "=" + linkback[inst][info];
}
else{
inst_ct = false;
str+=info + "={";
for(var x in linkback[inst][info]){
if(inst_ct){
str+="&*";
}
str+= x + "=" + linkback[inst][info][x];
inst_ct = true;
}
str+="}"
}
ct = true;
}
str += "}"
}	
return str;
}