function DisplayPrice(arPriceObj) {
if (!OL.IsLoaded('pricing')) {
OL.WaitForModules(new OL.Function_Obj(OL.pricing,"DisplayPrice", arPriceObj),"pricing");
} else {
OL.pricing.DisplayPrice(arPriceObj);
}
}
function Pricer_GetField(fieldName) {
return this[fieldName];
}
function Pricer_SetField(fieldName, val) {
this[fieldName] = val;
}
function Pricer_GetChildren() {
return this.children;
}
function Pricer_AddChild(child) {
this.children[this.children.length] = child;
}
function Pricer_Obj(id, price, desc, comments) {
if (typeof id != "undefined"  && id != null) this.prodName = id;
if (typeof price != "undefined"  && price != null) this.formattedPrice = price;
if (typeof desc != "undefined"  && desc != null) this.description = desc;
if (typeof comments != "undefined"  && comments != null) this.comments = comments; 
this.children = new Array();
}
Pricer_Obj.prototype.AddField = Pricer_SetField;
Pricer_Obj.prototype.GetField = Pricer_GetField;
Pricer_Obj.prototype.GetChildren = Pricer_GetChildren;
Pricer_Obj.prototype.AddChild = Pricer_AddChild;