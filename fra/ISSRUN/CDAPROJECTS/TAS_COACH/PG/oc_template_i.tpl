<HTML>
<HEAD>
<TITLE>Interface Template</TITLE>
<SCRIPT></SCRIPT><SCRIPT src="../jd/header.js"></SCRIPT>
<SCRIPT language=javascript>
OL.StartUIInfo('%1');
OL.RegisterFrameSet("oc_default_ui", "oc_default_ui.htm", OL.GetPagesetDisplayArea());
OL.RegisterPageLocation("%1_1.htm",OL.GetPagesetDisplayArea()+".oc_frame1","true");
OL.RegisterPageLocation("%1_2.htm",OL.GetPagesetDisplayArea()+".oc_frame2","true");
OL.RegisterPriorityPages("%1_1.htm");
OL.RegisterExceptionFrames(OL.GetPagesetDisplayArea()+".oc_frame2");
</SCRIPT>
</HEAD>
<BODY onLoad="OL.EndUIInfo('%1')">
</BODY>
</HTML>
