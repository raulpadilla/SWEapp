if(typeof(SiebelApp.WebDB)==="undefined"){SiebelJS.Namespace("SiebelApp.WebDB");SiebelApp.WebDB=(function(){var a=SiebelApp.Offlineconstants;var b;function d(){var e;var h=0;var f;g=function g(){b=JSON.parse(window.localStorage.getItem(a.get("TABLEINFO")));return e};g.prototype=this;e=new g();e.constructor=g;this.IncrementTxnCnt=function(){h++};this.DecrementTxnCnt=function(){h--;if(f&&this.GetTxnCnt()<=0){f();this.ResetPostTxnCallback()}};this.SetPostTxnCallback=function(i){f=i};this.ResetPostTxnCallback=function(){f=undefined};this.GetTxnCnt=function(){return h};return e}var c;c=new d();d.prototype.Initialize=function(g){var j=g.dbName;var f=g.version;var e=g.displayName;var l=g.maxSize;var i=g.tables;var h=g.columns;SiebelApp.WebDB.initDatabase(j,f,e,l);if(i){for(var k=0;k<i.length;k++){SiebelApp.WebDB.CreateTable(i[k],h[i[k]])}}};d.prototype.initDatabase=function(f,h,g,j){try{if(!window.openDatabase){alert("Databases are not supported in this browser.")}else{WebDB=openDatabase(f,h,g,j)}}catch(i){if(i===2){SiebelJS.Log("Invalid database version.")}else{SiebelJS.Log("Unknown error "+i+".")}return}};d.prototype.DeleteTable=function(f){var e="DROP TABLE IF EXISTS "+f;SiebelApp.WebDB.IncrementTxnCnt();WebDB.transaction(function(g){g.executeSql(e,[],function(h,i){SiebelApp.WebDB.DecrementTxnCnt()},function(h,i){SiebelApp.WebDB.DecrementTxnCnt();SiebelJS.Log("Oops.  Error was "+i.message+" (Code "+i.code+")");SiebelJS.Log("Oops.  Error was "+i.message+" (Code "+i.code+")");SiebelJS.Log("WebStore.DeleteTable -> DeleteQuery: "+e);return true})})};d.prototype.CreateTable=function(j,g){var h=0;var e="CREATE TABLE IF NOT EXISTS "+j+" (";if(g){e+=" RecordNum INTEGER PRIMARY KEY ASC, ";for(var f=0;f<g.length;f++){e+=" "+g[f]+' default "null"';if(h<g.length-1){e+=", ";h++}}e+=")";SiebelApp.WebDB.IncrementTxnCnt();WebDB.transaction(function(i){i.executeSql(e,[],function(k,l){SiebelApp.WebDB.DecrementTxnCnt()},function(k,l){SiebelApp.WebDB.DecrementTxnCnt();if(l.code===1){SiebelJS.Log("DB Table already exists")}else{SiebelJS.Log("Oops.  Error was "+l.message+" (Code "+l.code+")");SiebelJS.Log("Oops.  Error was "+l.message+" (Code "+l.code+")");SiebelJS.Log("WebStore.CreateTable -> CreateQuery: "+e)}return true})})}};d.prototype.InsertRecord=function(l,h,e,n){var k=0;var m="INSERT INTO "+l+" (";for(var g=0;g<h.length;g++){m+=" "+h[g];if(k<h.length-1){m+=", ";k++}}m+=") VALUES (";k=0;for(var f=0;f<e.length;f++){m+=" ?";if(k<e.length-1){m+=", ";k++}}m+=")";SiebelApp.WebDB.IncrementTxnCnt();WebDB.transaction(function(i){i.executeSql(m,e,function(j,o){if(n){n()}SiebelApp.WebDB.DecrementTxnCnt()},function(j,o){SiebelApp.WebDB.DecrementTxnCnt();if(o.code===1){SiebelJS.Log("DB Table already exists")}else{SiebelJS.Log("Oops.  Error was "+o.message+" (Code "+o.code+")");SiebelJS.Log("Oops.  Error was "+o.message+" (Code "+o.code+")");SiebelJS.Log("WebStore.InsertRecord -> InsertQuery: "+m)}return true})});return e};d.prototype.InsertRecordSet=function(t,f,p,r){var u=500;var s=[];var e=f.length;var h="INSERT INTO "+t+" (";for(var n=0;n<e;n++){h+=" "+f[n];if(n<e-1){h+=", "}}h+=")";var m=p.length;for(var g=0;g<m&&g<u;g++){h+=" SELECT ";var o=0;for(var l=0;l<e;l++){var q=(p[g])[l];q=q.replace(/\"/g,"'");h+=' "'+q+'"';if(l<e-1){h+=", "}}h+=" UNION ALL "}h=SiebelApp.OfflineUtils.RTrim(h," UNION ALL ");SiebelApp.WebDB.IncrementTxnCnt();WebDB.transaction(function(i){i.executeSql(h,[],function(j,k){if(m>u){s=p.slice(u-1);SiebelApp.WebDB.InsertRecordSet(t,f,s,r)}else{if(r){r()}}SiebelApp.WebDB.DecrementTxnCnt()},function(j,k){SiebelJS.Log("Oops.  Error was "+k.message+" (Code "+k.code+")");SiebelJS.Log("Oops.  Error was "+k.message+" (Code "+k.code+")");SiebelJS.Log("WebStore.InsertRecordSet -> InsertQuery: "+h);if(m>u){s=p.slice(u-1);SiebelApp.WebDB.InsertRecordSet(t,f,s,r)}SiebelApp.WebDB.DecrementTxnCnt();return true})})};d.prototype.SelectAll=function(g,e){var i="SELECT * FROM "+g;var h;var f=[];SiebelApp.WebDB.IncrementTxnCnt();WebDB.transaction(function(j){j.executeSql(i,[],function(k,l){for(var m=0;m<l.rows.length;m++){h=l.rows.item(m);f.push(h)}e(f);SiebelApp.WebDB.DecrementTxnCnt()},function(k,l){SiebelApp.WebDB.DecrementTxnCnt();if(l.code===1){SiebelJS.Log("DB Table already exists")}else{SiebelJS.Log("Oops.  Error was "+l.message+" (Code "+l.code+")");SiebelJS.Log("Oops.  Error was "+l.message+" (Code "+l.code+")");SiebelJS.Log("WebStore.SelectAll -> SelectQuery: "+i)}return true})})};d.prototype.SelectRecord=function(r,k,p,q,e,f){var g="SELECT * FROM "+r+" WHERE ";var t="(";var i=k.length;var l=[];for(var j=0;j<i;j++){var m=p[j];if(m){if(typeof(m)!=="string"){var h=m.length;for(var o=0;o<h;o++){l.push(m[o]);t+=k[j]+"  = ? OR "}}else{if(f&&f.indexOf(k[j])!==-1){t+=k[j]+' like "%'+m+'%" '}else{l.push(m);t+=k[j]+"  = ? "}}t=SiebelApp.OfflineUtils.RTrim(t,"OR ");t+=") AND ("}}t=SiebelApp.OfflineUtils.RTrim(t,"AND (");g+=t;var s;SiebelApp.WebDB.IncrementTxnCnt();WebDB.transaction(function(n){n.executeSql(g,l,function(u,v){if(e===true){s=[];for(var w=0;w<v.rows.length;w++){s.push(v.rows.item(w))}}else{if(v.rows&&v.rows.length){s=v.rows.item(0)}}q(s);SiebelApp.WebDB.DecrementTxnCnt()},function(u,v){if(v.code===1){SiebelJS.Log("DB Table already exists")}else{SiebelJS.Log("Oops.  Error was "+v.message+" (Code "+v.code+")");SiebelJS.Log("Oops.  Error was "+v.message+" (Code "+v.code+")");SiebelJS.Log("WebStore.SelectRecordset -> SelectQuery: "+g)}q(s);SiebelApp.WebDB.DecrementTxnCnt()})})};d.prototype.SelectRecordSet=function(h,f,e,g,i){SiebelApp.WebDB.SelectRecord(h,f,e,i,true,g)};d.prototype.SelectFilterRecord=function(g,f,e,i,l){var j;var h=[];if(i===""){SiebelApp.WebDB.SelectAll(g,l)}else{var k="SELECT *  FROM "+g+" WHERE "+f+"  > (SELECT "+f+" FROM "+g+" WHERE "+e+" = ? )";WebDB.transaction(function(m){m.executeSql(k,[i],function(n,o){for(var p=0;p<o.rows.length;p++){j=o.rows.item(p);h.push(j)}l(h)},function(n,o){if(o.code===1){SiebelJS.Log("DB Table already exists")}else{SiebelJS.Log("Oops.  Error was "+o.message+" (Code "+o.code+")");SiebelJS.Log("Oops.  Error was "+o.message+" (Code "+o.code+")");SiebelJS.Log("WebStore.SelectFilterRecord -> SelectFilterRecord: "+k)}return true})})}};d.prototype.DeleteFilterRecord=function(g,f,i,h){var e="DELETE  FROM "+g+" WHERE "+f+"  < (SELECT "+f+" FROM "+g+" WHERE "+i+" = ? )";WebDB.transaction(function(j){j.executeSql(e,[h],function(k,l){},function(k,l){if(l.code===1){SiebelJS.Log("DB Table already exists")}else{SiebelJS.Log("Oops.  Error was "+l.message+" (Code "+l.code+")");SiebelJS.Log("Oops.  Error was "+l.message+" (Code "+l.code+")");SiebelJS.Log("WebStore.DeleteRecord -> DeleteQuery: "+e)}return true})})};d.prototype.DeleteRecord=function(h,g,f){var e="DELETE  FROM "+h+" WHERE "+g+"  = ?";SiebelApp.WebDB.IncrementTxnCnt();WebDB.transaction(function(i){i.executeSql(e,[f],function(j,k){SiebelApp.WebDB.DecrementTxnCnt()},function(j,k){SiebelApp.WebDB.DecrementTxnCnt();if(k.code===1){SiebelJS.Log("DB Table already exists")}else{SiebelJS.Log("Oops.  Error was "+k.message+" (Code "+k.code+")");
SiebelJS.Log("Oops.  Error was "+k.message+" (Code "+k.code+")");SiebelJS.Log("WebStore.DeleteRecord -> DeleteQuery: "+e)}return true})})};d.prototype.UpdateRecordSet=function(m,k,n,h,o,l){if(!(k&&h&&n&&o)){return}var e=o.length;var j="";for(var g=0;g<e;g++){j+='"'+o[g]+'",'}j=SiebelApp.OfflineUtils.RTrim(j,",");var f="UPDATE "+m+" SET "+k+" = ("+k+' || ",'+n+'")';f+=" WHERE "+h+" IN ( "+j+")";WebDB.transaction(function(i){i.executeSql(f,[],function(p,q){l()},function(p,q){console.log("Oops.  Error was "+q.message+" (Code "+q.code+")");console.log("WebStore.UpdateRecordSet -> SQL Stmt: "+f);l()})})};d.prototype.UpdateRecord=function(r,k,h,e,s,q,g,f,m){var n="UPDATE "+r+" SET ";var l=0;if(k){var p=k.length;var o;for(var j=0;j<p;j++){if(g){o=g.indexOf(k[j])}if(g&&o!==-1){if(f[o]===a.get("STRINGNULL")||f[o]===a.get("STRINGUNDEFINED")){n+=k[j]+" = ("+k[j]+' || ",'+m[o]+'")';if(j<p-1){n+=", "}}else{n+=" "+k[j];n+=" = REPLACE("+k[j]+',"'+f[o]+'","'+m[o]+'")';if(j<p-1){n+=", "}}}else{n+=" "+k[j];n+=' = "'+h[j]+'"';if(j<p-1){n+=", "}}}}n+="  WHERE   ";l=0;n+=" "+e;n+=" = ?";n+=";";WebDB.transaction(function(i){i.executeSql(n,[s],function(t,u){if(q){q()}},function(t,u){if(u.code===1){SiebelJS.Log("Unable to Update the record.")}else{SiebelJS.Log("Oops.  Error was "+u.message+" (Code "+u.code+")");SiebelJS.Log("Oops.  Error was "+u.message+" (Code "+u.code+")");SiebelJS.Log("WebStore.UpdateRecord -> UpdateQuery: "+n)}return true})})};d.prototype.DeleteAll=function(f){var e="DELETE  FROM "+f;WebDB.transaction(function(g){g.executeSql(e,[],function(h,i){},function(h,i){if(i.code===1){SiebelJS.Log("DB Table already exists")}else{SiebelJS.Log("Oops.  Error was "+i.message+" (Code "+i.code+")");SiebelJS.Log("Oops.  Error was "+i.message+" (Code "+i.code+")");SiebelJS.Log("WebStore.DeleteAll -> DeleteQuery: "+e)}return true})})};d.prototype.Execute=function(e,g,f){SiebelApp.WebDB.IncrementTxnCnt();WebDB.transaction(function(h){h.executeSql(e,[],function(j,k){SiebelApp.WebDB.DecrementTxnCnt();var m;if(f===true){m=[];for(var l=0;l<k.rows.length;l++){m.push(k.rows.item(l))}}else{if(k.rows&&k.rows.length){m=k.rows.item(0)}}if(g){g(m)}},function(i,j){SiebelApp.WebDB.DecrementTxnCnt();SiebelJS.Log("Oops.  Error was "+j.message+" (Code "+j.code+")");SiebelJS.Log("WebStore.Execute ->: "+e);return true})})};d.prototype.DoesTableExist=function(e){if(!b){b=window.localStorage.getItem(a.get("TABLEINFO"))}if(b){return(b.hasOwnProperty(e))}else{return false}};d.prototype.DoesFieldExist=function(e,h){var f=false;if(!b){b=JSON.parse(window.localStorage.getItem(a.get("TABLEINFO")))}if(b){var g=b[e];if(g){f=(g.indexOf(h)!==-1)}}return f};return c}())};