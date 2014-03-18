/*<ORACLECOPYRIGHT>
* Copyright (C) 1994-2013 Oracle and/or its affiliates. All rights reserved.
* Oracle and Java are registered trademarks of Oracle and/or its affiliates.
* Other names may be trademarks of their respective owners.
* UNIX is a registered trademark of The Open Group.
*
* This software and related documentation are provided under a license agreement
* containing restrictions on use and disclosure and are protected by intellectual property laws.
* Except as expressly permitted in your license agreement or allowed by law, you may not use, copy,
* reproduce, translate, broadcast, modify, license, transmit, distribute, exhibit, perform, publish,
* or display any part, in any form, or by any means. Reverse engineering, disassembly,
* or decompilation of this software, unless required by law for interoperability, is prohibited.
*
* The information contained herein is subject to change without notice and is not warranted to be error-free.
* If you find any errors, please report them to us in writing.
*
* U.S. GOVERNMENT RIGHTS Programs, software, databases, and related documentation and technical data delivered to U.S.
* Government customers are "commercial computer software" or "commercial technical data" pursuant to the applicable
* Federal Acquisition Regulation and agency-specific supplemental regulations.
* As such, the use, duplication, disclosure, modification, and adaptation shall be subject to the restrictions and
* license terms set forth in the applicable Government contract, and, to the extent applicable by the terms of the
* Government contract, the additional rights set forth in FAR 52.227-19, Commercial Computer Software License
* (December 2007). Oracle America, Inc., 500 Oracle Parkway, Redwood City, CA 94065.
*
* This software or hardware is developed for general use in a variety of information management applications.
* It is not developed or intended for use in any inherently dangerous applications, including applications that
* may create a risk of personal injury. If you use this software or hardware in dangerous applications,
* then you shall be responsible to take all appropriate fail-safe, backup, redundancy,
* and other measures to ensure its safe use. Oracle Corporation and its affiliates disclaim any liability for any
* damages caused by use of this software or hardware in dangerous applications.
*
* This software or hardware and documentation may provide access to or information on content,
* products, and services from third parties. Oracle Corporation and its affiliates are not responsible for and
* expressly disclaim all warranties of any kind with respect to third-party content, products, and services.
* Oracle Corporation and its affiliates will not be responsible for any loss, costs,
* or damages incurred due to your access to or use of third-party content, products, or services.
</ORACLECOPYRIGHT>*/
(function(){if(typeof(SiebelApp.Offlineconstants)!=="undefined"){return}Namespace("SiebelApp.Offlineconstants");var a=SiebelApp.Utils.DefineConstants;SiebelApp.Offlineconstants=a();var b=SiebelApp.Offlineconstants;b.set("GOTOVIEW","GotoView");b.set("GOTOVIEWCOLD","GotoViewCold");b.set("GETVIEWLAYOUT","GetViewLayout");b.set("NEWRECORD","NewRecord");b.set("EDITRECORD","EditRecord");b.set("DRILLDOWN","Drilldown");b.set("WRITERECORD","WriteRecord");b.set("NEWLAYOUT","NewLayout");b.set("GETAPPLETLAYOUT","GetAppletLayout");b.set("DELETERECORD","DeleteRecord");b.set("PICKRECORD","PickRecord");b.set("ADDRECORD","AddRecord");b.set("CREATERECORD","CreateRecord");b.set("INVOKEMETHOD","InvokeMethod");b.set("UPDATEPREFMSG","UpdatePrefMsg");b.set("NEWPOPUP","NewPopup");b.set("STATUS","Status");b.set("SWECMD","SWECmd");b.set("SWEMETHOD","SWEMethod");b.set("DEFAULT_VIEW_INFO","dvinf");b.set("VIEW_INFO","vinf");b.set("PICK_APLT_INFO","pinf");b.set("NEW_VIEW_INFO","ninf");b.set("POPUP_OBJ_INFO","puoinf");b.set("POPUP_INFO","puinf");b.set("GETCACHEDFRAME","GetCachedFrame");b.set("GOTOPOSTEDACTION","GotoPostedAction");b.set("EDIT_FIELD","EditField");b.set("TEXT","TextFile");b.set("VIEW_NAME","name");b.set("VIEW_LIST","ViewList");b.set("UNDORECORD","UndoRecord");b.set("FLD_PICK_APLT_DET","pmap");b.set("PICK_APLT_DET","pdet");b.set("FLD_PICK_MAP","pfld");b.set("PICK_MAP_INFO","pmif");b.set("CACHE_TYPE_REACTIVE","Reactive");b.set("CACHE_TYPE_PROACTIVE","Proactive");b.set("SYNC_PKG_LENGTH","SyncLength");b.set("SYNC_PKG_REQUESTS","SyncRequest");b.set("TOTAL_SYNC_PACKAGE_LENGTH","TotalSyncPkgLength");b.set("SYNC_REQUEST_LIMIT",15);b.set("INDEX","index");b.set("B_SETUP","bSetUp");b.set("B_UP","bUp");b.set("VALUE_ARRAY","ValueArray");b.set("POSITION_ON_ROW","PositionOnRow");b.set("GO_TO_NEXT","GotoNext");b.set("GO_TO_PREV","GotoPrevious");b.set("SRF_ID","SRFId");b.set("RETRY_UPSYNC_REQUEST",3);b.set("CUD_RESPONSE","@0`0`1`0``0`Status`Completed`");b.set("COL_VIEW_TAG","OF_ViewTag");b.set("COL_PARENT_TAG","OF_ParentIdTag");b.set("STRING_CACHE","StringCache");b.set("END_OF_FILE","EOF");b.set("NEW_APP_TAG_INFO","nati");b.set("GET_DATA_PKG_MODE_ALL","All");b.set("GET_DATA_PKG_MODE_ALL_IN_METADATA","AllInMetadata");b.set("GET_DATA_PKG_MODE_VIEW_BY_VIEW","ViewByView");b.set("GET_DATA_PKG_PS_SCHEMA","Schema");b.set("TAG_NAME","Name");b.set("TAG","Tag");b.set("SWE_POST_CHANGES","PostChanges");b.set("GO_TO_NEXT_SET","GotoNextSet");b.set("GO_TO_PREV_SET","GotoPreviousSet");b.set("SWE_CLOSE_APPLET","CloseApplet");b.set("MESSAGEBAR","Message Bar");b.set("COMMIT_PENDING","cp");b.set("OLD_ROW_ID","OLDRowId");b.set("ASYNC_STATUS","AsyncStatus");b.set("SCROLL_NEXT_DATA","ScrollNextData");b.set("SCROLL_PREV_DATA","ScrollPrevData");b.set("CANINVOKEMETHOD","CanInvokeMethod");b.set("ASSOC","Assoc");b.set("ASSOCID","AssocId");b.set("GOTOBOOKMARKVIEW","GotoBookmarkView");b.set("Timeout",1200000);b.set("MAX_RECORDS",600);b.set("PAGE_SIZE",10);b.set("SCROLL_SIZE",5);b.set("LIMIT","LIMIT");b.set("GETCURRENTDATE","GetCurrentDate");b.set("STRINGNULL","null");b.set("STRINGUNDEFINED","undefined");b.set("STATUSCONTINUE","Continue");b.set("TABLEINFO","TableInfo");b.set("NEW","New");b.set("SHOW_POP_UP","Showpopup");b.set("SHOW_POPUP","ShowPopup");b.set("METADATA_SEP","~");b.set("METADATA_FLD_SEP","}{");b.set("METADATA_LST_SEP","},{");b.set("BCTYPE_NORMAL",0);b.set("BCTYPE_PICKLIST",1);b.set("IS_DYNAMIC","IsDync");b.set("CALCEXPR","ce");b.set("COLUMN_NAME","cln");b.set("DISABLE_SEARCH","dsrch");b.set("DISABLE_SORT","dsrt");b.set("FORCE_ACTIVE","fa");b.set("FORCE_CASE","fc");b.set("LINKNAME","ln");b.set("NOCOPY","nc");b.set("PICKLISTNAME","pln");b.set("POSTDEFAULT","post");b.set("PREDEFAULT","pre");b.set("PRECISION","prcn");b.set("VALIDATIONSPEC","vspec");b.set("PICKMAP","pm");b.set("FIELD_USER_PROP","fup");b.set("SSA_PRIMARY_FIELD","SSA Primary Field");b.set("SEARCHSPEC","sh");b.set("ZONE","z");b.set("STAND_ALONE_INST","sai");b.set("INSMODE_NORMAL","imn");b.set("INSMODE_ASSOCONLY","ima");b.set("SWE_ARG_NOT_EQUAL","<>");b.set("DOUIREG_OBJ_NAME","ObjectName");b.set("DOUIREG_OBJ_TYPE","ObjectType");b.set("DOUIREG_OBJ_MTHD","ObjectMethod");b.set("DOUIREG_EXT_TYPE","ExtType");b.set("DOUIREG_EXT_CONTEXT","Context");b.set("DOUIREG_SRVC_NAME","Service");b.set("DOUIREG_SRVC_MTDH","ServiceMethod");b.set("DOUIREG_OBJ_TYPEAPPLET","Applet");b.set("DOUIREG_OBJ_TYPEBUSCOMP","BusComp");b.set("DOUIREG_EXT_TYPEPRE","Pre");b.set("DOUIREG_EXT_TYPEPOST","Post");b.set("DOUIREG_EXT_TYPEOVERRIDE","Override");b.set("BUILDSCREEN_BS_NORMAL","BS_NORMAL");b.set("BUILDSCREEN_BS_ALTERNATE","BS_ALTERNATE");b.set("ACTION_RPC_REFRESH_VIEW","ActionRPCRefreshView");b.set("REFRESHLAYOUT","RefreshLayout");b.set("COPYRECORD","CopyRecord");b.set("EXECUTEFRMQUERY","ExecuteFrameQuery");b.set("EXECUTESORT","ExecuteSort");b.set("GO_TO_PRV_SET","GotoPreviousSet");b.set("SCROLL_NEXT","ScrollNext");b.set("SCROLL_PREVIOUS","ScrollPrevious");b.set("GO_TO_NEXT_REC","GotoNextRecord");b.set("GO_TO_PREVIOUS_REC","GotoPreviousRecord");b.set("DELETERECORDS","DeleteRecords");b.set("GO_TO_FST_SET","GotoFirstSet");b.set("GO_TO_LAST_SET","GotoLastSet");b.set("EXECUTE_QUERY","ExecuteQuery");b.set("ACTION_RPC_COMPLETED","ActionRPCCompleted");b.set("ACTION_RPC_CONTINUE","ActionRPCContinue");b.set("ACTION_RPC_CLOSE_POPUP","ClosePopup");b.set("ACTION_RPC_BUILD_VIEW_ASYNC","BuildViewAsync");b.set("SWE_FRAME_ID_STR","SWEFI");b.set("SWE_PROP_CAN_DELETE","cdl");b.set("SWE_PROP_HAS_ASSOC","hac");b.set("SWE_PROP_CAN_ASSOC","cac");b.set("SWE_PROP_IS_IN_QUERY","iqs");b.set("SWE_PROP_IS_COMMIT","icp");b.set("SWE_PROP_IS_DELETE","idp");b.set("SWE_PROP_IS_NEW_REC_PEND","inrp");b.set("SAVE_BC_STATE_ALL","sbcsa");b.set("SWE_BCNOTIFY_NEWDATAWS","bcn_ndw");b.set("SAVE_BC_STATE_NONE","bcsn");b.set("SWE_PROP_NOTI_TYPE","type");b.set("SWE_BCNOTIFY_DELETEWSROW","dwr");b.set("SWE_NOTIFY_NUM_RECORDS_STR","nr");b.set("SWE_NOTIFY_NUM_RECORDS_STR","NNR");b.set("SWE_PROP_NOTI_TYPE","type");b.set("SWE_BCNOTIFY_DELETEWSROW","dwr");b.set("SWE_BCNOTIFY_NEWACTIVEROW","nar");b.set("SWE_BCNOTIFY_DELETERECORD","dr");b.set("SWE_BCNOTIFY_INSERTWSFLDVALS","ifv");b.set("SWE_BCNOTIFY_INSERTWSROW","iwr");b.set("SWE_BCNOTIFY_NEWRECORDDATA","nrd");b.set("SWE_BCNOTIFY_NEWRECORDDATAWS","nrdw");b.set("SWE_BCNOTIFY_SCROLLDATA","sd");b.set("SWE_NOTIFY_STATE_STR","state");b.set("SWE_BCNOTIFY_STATECHANGED","sc");b.set("EXECUTE_FRAME_QUERY","ExecuteFrameQuery");b.set("FIND","Find");b.set("LIKE_QUERY","LIKE");b.set("BUILDSCREEN_BS_DRILLDOWN","BS_DRILLDOWN");b.set("BUILDSCREEN_BS_DRILLDOWNBYFIELD","BS_DRILLDOWNBYFIELD");b.set("BUILDSCREEN_BS_DRILLDOWNCUSTOM","BS_DRILLDOWNCUSTOM");b.set("TYPE_FRAME","TYPE_FRAME");b.set("TYPE_BUSCOMP","TYPE_BUSCOMP");b.set("MENU_INFO","ami");b.set("MENU_DATA_REQ","minf");b.set("REGENERATEMETADATA","RegenMD");b.set("METADATATABLEINFO","Metadatatable");b.set("DTYPE_DATETIME","12");b.set("DTYPE_UTCDATETIME","13");b.set("EXISTS","EXISTS");b.set("REFRESH_BUSCOMP","RefreshBusComp");b.set("REFRESH_RECORD","RefreshRecord");
b.set("KEYCODE_ENTER",13)}());