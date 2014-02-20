<HTML>
<HEAD>
<TITLE>Interface Template</TITLE>
<SCRIPT></SCRIPT><SCRIPT src="../jd/header.js"></SCRIPT>
<SCRIPT language=javascript>
OL.StartUIInfo('%1');
OL.RegisterFrameSet("oc_default_ui", "oc_default_ui.htm", OLStr+".ol_ui.mainArea");
OL.RegisterPageLocation("%1_1.htm",OLStr+".ol_ui.mainArea.oc_frame1","true");
OL.RegisterPageLocation("%1_2.htm",OLStr+".ol_ui.mainArea.oc_frame2","true");
OL.RegisterPriorityPages("%1_1.htm");
OL.RegisterExceptionFrames(OLStr+".ol_ui.mainArea.oc_frame2");
</SCRIPT>
</HEAD>
<BODY onLoad="OL.EndUIInfo('%1')">
</BODY>
</HTML>
