<% Response.Expires = 0 %>
<HTML>
<HEAD>
<TITLE>Page of download links</TITLE>
</HEAD>
<BODY>
<!-- #include file="strings.asp" -->
<BR/>
<%  
  Set strResult = Request.QueryString("Result")
  Set strUser =   Request.QueryString("Name")
  Set uid = Request.QueryString("Id")
  Trim(uid)

  if Len(uid) > 0 then
     Set objFSO = CreateObject("Scripting.FileSystemObject")
     Set ResultFile = objFSO.OpenTextFile ("c:\installresult.txt", 8, true)
     ResultFile.Write(uid & ",")
     ResultFile.Write(strUser & ",")
     ResultFile.Write(Request.ServerVariables ("REMOTE_ADDR") & ",")
     if strResult = "Success" then
        ResultFile.Write(IDS_SUCCESS & ",")
     elseif strResult = "Fail" then
        ResultFile.Write(IDS_FAILURE & ",")
     else
		ResultFile.Write(IDS_INCOMPLETE & ",")
	 end if
     
     ResultFile.WriteLine(now())
     ResultFile.Close

     Response.Write ("200")
  else
     Response.Write ("400")
  end if	
%>
</BODY>
</HTML> 

