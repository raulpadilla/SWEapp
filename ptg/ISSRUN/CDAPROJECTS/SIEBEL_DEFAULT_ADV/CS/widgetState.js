function InputState_Obj() {
this.requiredInstances = new Object();
this.instanceInputs = new Object();
this.ClearChangedInputs();
this.oldStates = new Object();
}
InputState_Obj.prototype.AddInstance = InputState_AddInstance;
InputState_Obj.prototype.GetValue = InputState_GetValue;
InputState_Obj.prototype.SetValue = InputState_SetValue;
InputState_Obj.prototype.SetStartValue = InputState_SetStartValue;
InputState_Obj.prototype.IsReady = InputState_IsReady;
InputState_Obj.prototype.GetInstanceInputs = InputState_GetInstanceInputs;
InputState_Obj.prototype.ClearChangedInputs = InputState_ClearChangedInputs;
InputState_Obj.prototype.SetUpInstanceState = InputState_SetUpInstanceState;
InputState_Obj.prototype.SetTriggers = InputState_SetTriggers;
InputState_Obj.prototype.GetChangedInputs = InputState_GetChangedInputs;
InputState_Obj.prototype.ClearChildState = InputState_ClearChildState;
InputState_Obj.prototype.SaveChildState = InputState_SaveChildState;
InputState_Obj.prototype.SetSubconfigValues = InputState_SetSubconfigValues;
InputState_Obj.prototype.InsertValue = InputState_InsertValue;
function InputState_GetChangedInputs() {
return this.changedInputs;
}
function InputState_ClearChangedInputs() {
this.changedInputs = new Array();
}
function InputState_GetInstanceInputs(instanceName) {
return this.instanceInputs[instanceName];
}
function InputState_AddInstance(instanceName, product, parent, fdata, tdata, dataSet) {
this.requiredInstances[instanceName] = true;
this.instanceInputs[instanceName] = new Object();
this.instanceInputs[instanceName].dataSet = dataSet;
this.instanceInputs[instanceName].featureData = fdata;
this.instanceInputs[instanceName].triggerData = tdata;
this.instanceInputs[instanceName].inputSelections = new Object();
this.instanceInputs[instanceName].children = new Array();
this.instanceInputs[instanceName].dataValues = new Object();
this.instanceInputs[instanceName].instanceName = instanceName;
this.instanceInputs[instanceName].product = product;
this.instanceInputs[instanceName].parent = parent;
}
function InputState_GetValue(tableName, instanceName) {
if (this.instanceInputs[instanceName] == null || typeof this.instanceInputs[instanceName] == "undefined") { return null; }
return (this.instanceInputs[instanceName].inputSelections[tableName]);
}
function InputState_IsReady() {
for (child in this.requiredInstances) {
if (this.requiredInstances[child] == false) {
return false;
}
}
return true;
}
function InputState_SetTriggers(tableName, instanceName, value, preconfigObj) {
var setTriggers = new Array();
if (typeof this.instanceInputs[instanceName].triggerData == "undefined" || this.instanceInputs[instanceName].triggerData == null) {return setTriggers;}
var trigger = this.instanceInputs[instanceName].triggerData.GetTable(tableName);
if (trigger != null && typeof trigger != "undefined" && trigger.lastSel != value) {
trigger.lastSel = value;
for (var i = 0; i < trigger.length; i++) {
this.instanceInputs[instanceName].featureData.SetTable(trigger[i].GetTarget(), trigger[i].GetTargetTable(value));
setTriggers = setTriggers.concat(this.SetStartValue(trigger[i].GetTarget(), instanceName, this.instanceInputs[instanceName].featureData, preconfigObj));
setTriggers[setTriggers.length] =trigger[i].GetTarget();
}
for (var i = 0; i < trigger.length; i++) {
this.SetSubconfigValues(trigger[i].GetTarget(), instanceName, this.GetValue(trigger[i].GetTarget(), instanceName), preconfigObj);
}
}
return setTriggers;
}
function RowsToCode(tables,inputSelections) {
var preconfig = "";
for (var input in inputSelections) {
if (typeof tables[input] != "undefined") {
preconfig+=(","+input+"="+tables[input].GetRowCode(inputSelections[input]));
} else {
preconfig+=(","+input+"="+ inputSelections[input]);
}
}
if (preconfig.length > 0) {
preconfig = preconfig.slice(1);
}
return preconfig;
}
function InputState_InsertValue(tableName, instanceName, value) {
if (typeof this.instanceInputs[instanceName] == "undefined" || this.instanceInputs[instanceName] == null) {
return new Array();
}
var table = this.instanceInputs[instanceName].featureData.GetTable(tableName);
var row = null;
var delimStr = OL.GetInstanceDelimeterStr();
if (table == null) {
this.instanceInputs[instanceName].dataValues[tableName] = value;
this.instanceInputs[instanceName].inputSelections[tableName] = value;
return new Array();
}
row = table.GetRow(value);
if (table.GetRows().length <= value) {
value = 0;
}
this.instanceInputs[instanceName].inputSelections[tableName] = value;
this.changedInputs[this.changedInputs.length] = instanceName+delimStr+tableName;
return this.SetTriggers(tableName, instanceName, value);
}
function InputState_SetValue(tableName, instanceName, value, preconfigObj) {
var setTriggers = this.InsertValue(tableName, instanceName, value);
this.SetSubconfigValues(tableName, instanceName, value, preconfigObj);
return setTriggers;
}
function InputState_SetSubconfigValues(tableName, instanceName, value, preconfigObj) {
var delimStr = OL.GetInstanceDelimeterStr();
var table = this.instanceInputs[instanceName].featureData.GetTable(tableName);
if (table == null) return;
var row = table.GetRow(this.instanceInputs[instanceName].inputSelections[tableName]);
var subtable = this.instanceInputs[instanceName+delimStr+tableName];
if (row != null && typeof row.CHILD !="undefined" &&  (row.CHILD != null)&&(row.CHILD != "null")&& 
(typeof  subtable == "undefined" || (subtable == null) || 
(subtable != null && (this.instanceInputs[instanceName].featureData.GetTable(tableName).GetRow(value).CHILD != subtable.product)))) {
var data = new Object();
data.instanceName = instanceName+delimStr+tableName;
data.product = row.CHILD;
if (typeof preconfigObj != "undefined" &&  preconfigObj != null){
data.dynDefObj = preconfigObj;
this.instanceInputs[instanceName].children[this.instanceInputs[instanceName].children.length] = data.instanceName;
} else if (typeof this.oldStates[data.instanceName] != "undefined" && typeof this.oldStates[data.instanceName][data.product] != "undefined") {
data.dynDefObj = OL.ConvertStrToDynDefObj(RowsToCode(this.oldStates[data.instanceName][data.product].featureData.GetAllTables(),this.oldStates[data.instanceName][data.product].inputSelections), data.instanceName);
} else {
if (typeof row.DYNDEF == "undefined" || row.DYNDEF == null) { 
data.dynDefObj = OL.ConvertStrToDynDefObj("",data.instanceName);
} else {
data.dynDefObj = OL.ConvertStrToDynDefObj(row.DYNDEF, data.instanceName);
}
if (typeof data.dynDefObj != "undefined" &&  data.dynDefObj != null){
var preValue;
var fTable;
var instPreConfig = data.dynDefObj.inputState[data.instanceName];
for (var key in instPreConfig) {
preValue = instPreConfig[key];
if (this.GetValue(preValue, instanceName) != null && typeof this.GetValue(preValue, instanceName) != "undefined") {
instPreConfig[key] = this.instanceInputs[instanceName].featureData.GetTable(preValue).GetRowCode(this.GetValue(preValue, instanceName));
} else if (preValue.indexOf(".") != -1) {
fTable = preValue.slice(0, preValue.indexOf("."));
if (this.GetValue(fTable, instanceName) != null && typeof this.GetValue(fTable, instanceName) != "undefined") {
instPreConfig[key] = this.instanceInputs[instanceName].featureData.GetTable(fTable).GetRow(this.GetValue(fTable, instanceName))[preValue.slice(preValue.indexOf(".")+1)];
}
}
}
}
this.instanceInputs[instanceName].children[this.instanceInputs[instanceName].children.length] = data.instanceName;
}
if (subtable != null) {
this.SaveChildState(data.instanceName);
this.ClearChildState(data.instanceName);
}
data.parent = instanceName;
data.inputState = this;
this.requiredInstances[data.instanceName] = false;
OL.LoadDatasetWithDynDefObj(data.product, data.dynDefObj, data);
return;
}
if (row != null && (row.CHILD == null || row.CHILD == "null") && subtable != null && typeof subtable != "undefined") {
this.SaveChildState(instanceName+delimStr+tableName);
this.ClearChildState(instanceName+delimStr+tableName);
}
}
function InputState_SaveChildState(instanceName) {
if (this.instanceInputs[instanceName] == null) { return; }
if (typeof this.oldStates[instanceName] == "undefined") {
this.oldStates[instanceName] = new Object();
}
this.oldStates[instanceName][this.instanceInputs[instanceName].product] = this.GetInstanceInputs(instanceName);
for (var i = 0; i < this.instanceInputs[instanceName].children.length; i++) {
this.SaveChildState(this.instanceInputs[instanceName].children[i]);
}
}
function InputState_ClearChildState(instanceName) {
if (this.instanceInputs[instanceName] == null) { return; }
for (var i = 0; i < this.instanceInputs[instanceName].children.length; i++) {
this.ClearChildState(this.instanceInputs[instanceName].children[i]);
}
this.instanceInputs[instanceName] = null;
}
function InputState_SetStartValue(table, instanceName, featureData, preconfigObj) {
if (typeof preconfigObj != "undefined" && preconfigObj != null && preconfigObj.GetValue(table, instanceName) != null) {
if (featureData.GetTable(table) == null) {
return this.InsertValue(table, instanceName, preconfigObj.GetValue(table, instanceName),preconfigObj);
}
for (var i = 0; i < featureData.GetTable(table).GetRows().length; i++) {
if (featureData.GetTable(table).GetRowCode(i) == preconfigObj.GetValue(table, instanceName)) {
return this.InsertValue(table, instanceName, i,preconfigObj);
}
}
return this.InsertValue(table, instanceName, featureData.GetTable(table).defaultRow,preconfigObj);
} else {
return this.InsertValue(table, instanceName, featureData.GetTable(table).defaultRow,preconfigObj);
}
}
function InputState_SetUpInstanceState(instanceName, product, parent, featureData, triggerData, preconfigObj, dataSet) {
var triggerChanges = new Array();
this.AddInstance(instanceName, product, parent, featureData, triggerData, dataSet);
var child;
for (var table in featureData.GetAllTables()) {
triggerChanges = triggerChanges.concat(this.SetStartValue(table, instanceName, featureData, preconfigObj));
}
if (typeof preconfigObj != "undefined" &&  preconfigObj != null) {
for (var feature in preconfigObj.inputState[instanceName]) {
if (featureData.GetTable(feature) == null) {
this.SetValue(feature, instanceName, preconfigObj.GetValue(feature, instanceName),preconfigObj);
}
}
}
for (var table in featureData.GetAllTables()) {
this.SetSubconfigValues(table, instanceName, this.GetValue(table, instanceName), preconfigObj);
}
return triggerChanges;
}  
