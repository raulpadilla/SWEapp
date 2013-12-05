<%   Response.CacheControl = "no-cache" %>
<HTML>
<HEAD>
<TITLE>Page of download links</TITLE>
</HEAD>
<BODY>
<%
  Dim uniqueID
  
  Set strUser = Request.QueryString("Name")
  Trim(strUser) 
  Set strVersion = Request.QueryString("Version")
  Trim(strVersion) 
  Set documentObject = Server.CreateObject("htmlfile")        
  Set objFSO = CreateObject("Scripting.FileSystemObject")
  
  Function IsPresentInUserFile(uid,uFileName)
     Dim us,pos,id
     IsPresentInUserFile = false
     if  objFSO.FileExists(uFileName) then
		Set uFile = objFSO.OpenTextFile(uFileName)
		While uFile.AtEndOfStream = False
		   us = uFile.ReadLine()
		   Trim(us)
		   if Len(us) > 0 then
		      pos = Instr(us,",")
		      if pos > 0 then
		        id = Left(us, pos - 1)
		        if uid = id then
		           IsPresentInUserFile = true
		           uFile.Close
		           exit function
		        end if
		      end if
		   end if
		WEND		
		uFile.Close
	end if
  End Function


 'Create the HTML document object to generate Unique IDs     
 Dim uFileName
 uFileName = "c:\patchusers.txt"          
 uniqueID = documentObject.uniqueID     
 while IsPresentInUserFile(uniqueID,uFileName)
    uniqueID = documentObject.uniqueID
 Wend
     
Set UserFile = objFSO.OpenTextFile (uFileName, 8, true)   
UserFile.Write(uniqueID & ",")
UserFile.Write(strUser & ",")
UserFile.Write(Request.ServerVariables ("REMOTE_ADDR") & ",")
UserFile.Write(strVersion & ",")
UserFile.WriteLine(now())
UserFile.Close
Response.Status = "200 " & uniqueID
%>
</BODY>
</HTML> 

