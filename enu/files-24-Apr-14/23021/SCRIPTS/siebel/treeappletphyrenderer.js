if(typeof(SiebelAppFacade.TreeAppletPR)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.TreeAppletPR");SiebelApp.S_App.RegisterConstructorAgainstKey(SiebelApp.Constants.get("SWE_UIDEF_TREE_PRENDR"),"SiebelAppFacade.TreeAppletPR");SiebelAppFacade.TreeAppletPR=(function(){var g=SiebelJS.Dependency("SiebelApp.Utils");var e=SiebelJS.Dependency("SiebelApp.Constants");function b(k){var j=k;this.GetPM=function(){return j};this.Init()}b.prototype.Init=function(){this.GetPM().AttachPMBinding("refreshTree",this.BindData,{scope:this});this.GetPM().AttachPMBinding("cleartree",function(){c.call(this)},{scope:this});this.GetPM().AttachPMBinding("FocusSelectedTreeNode",function(k){var l=this.GetPM();var n=l.Get("placeholder");var j="#"+l.Get("selectednode").position;j=j.replace(/\./gi,"\\.");var m=$("#"+n).jstree("get_selected");$("#"+n).jstree("deselect_node",m);$("#"+n).jstree("select_node",j);$(j).addClass("siebel-selectednode");$(j).attr("role","presentation");$(j).children("a").attr("aria-selected","true")},{scope:this})};b.prototype.ShowUI=function(){i.call(this);var k=this.GetPM().Get("placeholder");var j=$("#s_"+this.GetPM().Get("GetFullId")+"_div");if(g.IsTrue(SiebelApp.S_App.GetAccessibilityEnhanced())){j.attr({role:"region",title:this.GetPM().Get("LandMarkTitle")})}$("#"+k).jstree({rules:{deletable:"all"},plugins:["ui","themes","html_data","hotkeys","crrm"]});$("#"+k).jstree("clear_bindingflag");f.call(this)};function f(){var k=$("#s_"+this.GetPM().Get("GetFullId")+"_div");var j=this.GetPM().GetProxy();if(typeof(j.GetObjectType)==="function"){$(k).attr("ot",j.GetObjectType())}if(typeof(j.GetRepstrName)==="function"){$(k).attr("rn",j.GetRepstrName())}if(typeof(j.GetUIName)==="function"){$(k).attr("un",j.GetUIName())}}b.prototype.BindEvents=function(){var j=this.GetPM();var k=j.Get("placeholder");$("#"+k).bind("reopen.jstree",function(n,m){var l="#"+j.Get("selectednode").position.replace(/\./gi,"\\.");$("#"+k).jstree("select_node",l)});$("#"+k).bind("close_node.jstree",function(m,l){if(l.args.length===1){j.OnControlEvent("OnTreeEvent","CollapseTreeItem",l.args[0][0].id)}});$("#"+k).bind("open_node.jstree",function(m,l){if(l.args.length===1){j.OnControlEvent("OnTreeEvent","ExpandTreeItem",l.args[0][0].id)}});$("#"+k).bind("click",function(n,o){n.stopImmediatePropagation();if(n.target.nodeName==="A"){j.ExecuteMethod("SetCurrentNode",$(n.target).parent("li")[0].id);var m=j.Get("currentnode").type;var l="";if(m===e.get("TREENODE_TYPE_NEXT")){l="NextTreeItem"}else{if(m===e.get("TREENODE_TYPE_PREV")){l="PreviousTreeItem"}else{l="SelectTreeItem"}}j.OnControlEvent("OnTreeEvent",l,$(n.target).parent("li")[0].id)}})};function c(){var m=this.GetPM();var k=m.Get("root");if(k&&k.child){for(var l=0;l<=k.child.length-1;l++){var j=k.child[l];d.call(this,j)}}}function d(k){var m=this.GetPM();var j=k.child;var o=m.Get("placeholder");for(var l=0;l<=j.length-1;l++){var n="#"+j[l].position;n=n.replace(/\./gi,"\\.");$("#"+o).jstree("remove",n)}$("#"+o).jstree("deselect_node","#1")}b.prototype.BindData=function(){var n=this.GetPM();var k=n.Get("root");if(k&&k.child){for(var m=0;m<=k.child.length-1;m++){var j=k.child[m];var o=n.Get("placeholder");a.call(this,j,o)}var l="#"+n.Get("selectednode").position.replace(/\./gi,"\\.");$("#"+o).jstree("select_node",l);$(l).addClass("siebel-selectednode").attr("role","presentation").children("a").attr("aria-selected","true")}};function i(){var m=this.GetPM();var o=m.Get("placeholder");$("#"+o).jstree("destroy");var k=m.Get("root");for(var l=0;l<=k.child.length-1;l++){var j=k.child[l];var n='<ul role="group" ><li role="presentation" id ="'+j.position+'"><a role="treeitem" href="#">'+j.caption+"</a></li></ul>";$("#"+o).append(n)}}function h(k,j){var l=j.match(/siebel\-icon[^\s]+/g)||[];return(l.join(" "))}function a(p,q){for(var n=0;n<=p.child.length-1;n++){var r="#"+p.position.replace(/\./gi,"\\.");$("#"+q).attr("role","group");$("#"+q).jstree("create",r,"last",{attr:{id:p.child[n].position},data:{title:p.child[n].caption}},"",true);var o="#"+p.child[n].position.replace(/\./gi,"\\.");$(o).attr("role","presentation");if(n===0){$(o).parent().attr("role","group")}$(o).children("ins").attr("role","presentation");$(o).children("ins").attr("aria-hidden","true");$(o).children("a").attr("role","treeitem");$(o).children("a").attr("tabindex","-1");if(p.child[n].type===e.get("TREENODE_TYPE_NEXT")){var m="#"+p.child[n].position.replace(/\./gi,"\\.");$(m).addClass("siebel-nextpage")}else{if(p.child[n].type===e.get("TREENODE_TYPE_PREV")){var j="#"+p.child[n].position.replace(/\./gi,"\\.");$(j).addClass("siebel-prevpage")}}if(!g.IsEmpty(p.child[n].icon)){var k="#"+p.child[n].position.replace(/\./gi,"\\.");$(k).removeClass(h);$(k).addClass("siebel-icon-"+p.child[n].icon)}if(p.child[n].child.length>0){a(p.child[n],q)}else{$(o).removeClass("jstree-open").addClass("jstree-leaf");$(o).children("a").removeAttr("aria-expanded");$(o).removeClass("jstree-open").addClass("jstree-leaf")}}if(g.IsEmpty(p.expand)){var l="#"+p.position.replace(/\./gi,"\\.");$(l).removeClass("jstree-open").addClass("jstree-closed");$(l).children("a").attr("aria-expanded","false")}}b.prototype.ShowSelection=function(){};b.prototype.SetHighlightState=function(){};b.prototype.FocusFirstControl=function(){};b.prototype.UpdateUIButtons=function(){};return b}())};