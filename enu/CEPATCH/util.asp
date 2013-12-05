<%
<!-- #include file="strings.asp" -->
Function DisplayAll(UserFileName, ResultFileName)
    Dim us, rs,pos,uid,str,user,ip,dt,res,result,rpttime,UserFile,rip,ruser,ver
    Set objFSOU = CreateObject("Scripting.FileSystemObject")    
%>
<TABLE width=100% cellpadding=0 cellspacing=0 border=1>
<th><%=IDS_CN_USER_NAME%> </th><th><%=IDS_CN_REMOTE_HOST%></th><th><%=IDS_CN_VERSION%></th><th><%=IDS_CN_DOWNLOAD_REQ_TIME%></th><th><%=IDS_CN_INSTALL_RESULT%></th><th><%=IDS_CN_INSTALL_COMPLETE_TIME%></th>
<%    
if  objFSOU.FileExists(UserFileName) then
	Set UserFile = objFSOU.OpenTextFile (UserFileName)   	
    while UserFile.AtEndOfStream = false
%>
<%    
        us = UserFile.ReadLine ()
		Trim(us)
        if Len(us) > 0 then
           pos = Instr(us,",")
           if pos > 0 then
             uid = Left(us, pos - 1)
             str = Right (us, Len(us)-pos)
             pos = Instr (str, ",")
             if pos > 0 then
                user = Left(str,pos - 1)
                us = Right(str,Len(str) - pos)
                pos = Instr(us,",")
                if pos > 0 then
                   ip = Left(us,pos - 1)
                   str = Right(us, Len(us) - pos)                                                            
                   pos = Instr(str,",")
                   if pos > 0 then
                    ver = Left(str,pos -1)
                    dt = Right(str, Len(str)-pos)
                    res = DisplayDataFromResultFile(uid,user,ip,ver, dt,ResultFileName,"All",false)
                    if GetDataFromResultFile(uid,"id",ResultFileName) = "" then
						if user = "" then
						   user = "&nbsp;"
						end if
						if ver = "" then
						   ver = "&nbsp;"
						end if
%>
<TR align="center">
<td><%=user%></td><td><%=ip%></td><td><%=ver%></td><td><%=dt%></td><td>InComplete</td><td>&nbsp;</td>            
</TR>
<%                   
                   end if
                  end if
                end if
             end if
           end if         
        end if
%>  
<%        
    WEND
    UserFile.Close
  
%>
  </TABLE> 

<%
  end if
End Function

Function DisplayByName(uname,uFileName,rFileName)
 Dim us, rs,pos,uid,str,user,ruser,ip,dt,res,result,rpttime,UserFile,rip,ver
    Set objFSOU = CreateObject("Scripting.FileSystemObject")
    
%>
<TABLE width=100% cellpadding=0 cellspacing=0 border=1>
<th><%=IDS_CN_USER_NAME%> </th><th><%=IDS_CN_REMOTE_HOST%></th><th><%=IDS_CN_VERSION%></th><th><%=IDS_CN_DOWNLOAD_REQ_TIME%></th><th><%=IDS_CN_INSTALL_RESULT%></th><th><%=IDS_CN_INSTALL_COMPLETE_TIME%></th>
<%  
if  objFSOU.FileExists(uFileName) then
	Set UserFile = objFSOU.OpenTextFile (uFileName)   	
	  
    while UserFile.AtEndOfStream = false
%>
<%    
        us = UserFile.ReadLine ()
		Trim(us)
        if Len(us) > 0 then
           pos = Instr(us,",")
           if pos > 0 then
             uid = Left(us, pos - 1)
             str = Right (us, Len(us)-pos)
             pos = Instr (str, ",")
             if pos > 0 then
                  user = Left(str,pos - 1)                
                   us = Right(str,Len(str) - pos)
					pos = Instr(us,",")
					if pos > 0 then
					   ip = Left(us,pos - 1)
					   str = Right(us, Len(us) - pos)                                                            
					   pos = Instr(str,",")
					   if pos > 0 then
						 ver = Left(str,pos -1)
						 dt = Right(str, Len(str)-pos)					   
					     if LCase(user) = LCase(uname) then
					       res = DisplayDataFromResultFile(uid,user,ip,ver,dt,rFileName,uname,false)
					       if GetDataFromResultFile(uid,"id",rFileName) = "" then
							   if user = "" then
								  user = "&nbsp;"
							   end if
							   if ver = "" then
								  ver = "&nbsp;"
							   end if
%>
<TR align="center">
<td><%=user%></td><td><%=ip%></td><td><%=ver%></td><td><%=dt%></td><td>InComplete</td><td>&nbsp;</td>            
</TR>
<%                   
                           end if
                       end if 
                     end if
                    end if                
                end if
            end if
         end if
 %>
 <%
    WEND
    UserFile.Close
%>
   </TABLE> 

<%   
  end if
End Function

Function DisplayByResult(rslt,uFileName,rFileName)
Dim us, rs,pos,uid,str,user,ruser,ip,dt,res,result,rpttime,UserFile,rip,ver
    Set objFSOU = CreateObject("Scripting.FileSystemObject")
    
%>
<TABLE width=100% cellpadding=0 cellspacing=0 border=1>
<th><%=IDS_CN_USER_NAME%> </th><th><%=IDS_CN_REMOTE_HOST%></th><th><%=IDS_CN_VERSION%></th><th><%=IDS_CN_DOWNLOAD_REQ_TIME%></th><th><%=IDS_CN_INSTALL_RESULT%></th><th><%=IDS_CN_INSTALL_COMPLETE_TIME%></th>
<%  
if  objFSOU.FileExists(uFileName) then
	Set UserFile = objFSOU.OpenTextFile (uFileName)   	
	  
    while UserFile.AtEndOfStream = false
%>
<%    
        us = UserFile.ReadLine ()
		Trim(us)
        if Len(us) > 0 then
           pos = Instr(us,",")
           if pos > 0 then
             uid = Left(us, pos - 1)
             str = Right (us, Len(us)-pos)
             pos = Instr (str, ",")
             if pos > 0 then
                user = Left(str,pos - 1)                
                us = Right(str,Len(str) - pos)
			    pos = Instr(us,",")
				if pos > 0 then
				    ip = Left(us,pos - 1)
				    str = Right(us, Len(us) - pos)                                                            
					pos = Instr(str,",")
					if pos > 0 then
					   ver = Left(str,pos -1)
					   dt = Right(str, Len(str)-pos)					   
					   res = DisplayDataFromResultFile(uid,user,ip,ver,dt,rFileName,rslt,false)
					   result = GetDataFromResultFile(uid,"result",rFileName)
					   if GetDataFromResultFile(uid,"id",rFileName) = "" and rslt = "InComplete" then
					           if user = "" then
								  user = "&nbsp;"
							   end if
							   if ver = "" then
								  ver = "&nbsp;"
							   end if
	%>
	<TR align="center">
	<td><%=user%></td><td><%=ip%></td><td><%=ver%></td><td><%=dt%></td><td>InComplete</td><td>&nbsp;</td>            
	</TR>
	<%                   
	                   end if
                  end if
                end if                
             end if
           end if
        end if
 %>
 <%
    WEND
    UserFile.Close
%>
   </TABLE> 

<%
   end if
End Function

Function DisplayByTime(datestr,uFileName,rFileName)
    Dim us, rs,pos,uid,str,user,ruser,ip,dt,res,result,rpttime,rptdate,dtdate,UserFile,rip,ver
    Set objFSOU = CreateObject("Scripting.FileSystemObject")
%>
<TABLE width=100% cellpadding=0 cellspacing=0 border=1>
<th><%=IDS_CN_USER_NAME%> </th><th><%=IDS_CN_REMOTE_HOST%></th><th><%=IDS_CN_VERSION%></th><th><%=IDS_CN_DOWNLOAD_REQ_TIME%></th><th><%=IDS_CN_INSTALL_RESULT%></th><th><%=IDS_CN_INSTALL_COMPLETE_TIME%></th>
<%
    if  objFSOU.FileExists(uFileName) then
	    Set UserFile = objFSOU.OpenTextFile (uFileName)   	
    
        while UserFile.AtEndOfStream = false
%>
<%    
        us = UserFile.ReadLine ()
		Trim(us)
        if Len(us) > 0 then
           pos = Instr(us,",")
           if pos > 0 then
             uid = Left(us, pos - 1)
             str = Right (us, Len(us)-pos)
             pos = Instr (str, ",")
             if pos > 0 then
                user = Left(str,pos - 1)                
                us = Right(str,Len(str) - pos)
			    pos = Instr(us,",")
				if pos > 0 then
				   ip = Left(us,pos - 1)
				   str = Right(us, Len(us) - pos)                                                            
					pos = Instr(str,",")
					if pos > 0 then
					   ver = Left(str,pos -1)
					   dt = Right(str, Len(str)-pos)
				       dtdate = GetDateStr(dt)				   				   
					   if CompareDate(CDate(dt), CDate(datestr)) then
	                       res = DisplayDataFromResultFile(uid,user,ip,ver,dt,rFileName,datestr,true)                 
	                       if GetDataFromResultFile(uid,"id",rFileName) = "" then
	                           if user = "" then
								  user = "&nbsp;"
							   end if
							   if ver = "" then
								  ver = "&nbsp;"
							   end if
	%>
	<TR align="center">
	<td><%=user%></td><td><%=ip%></td><td><%=ver%></td><td><%=dt%></td><td>InComplete</td><td>&nbsp;</td>            
	</TR>
	<%                   
	                       end if
	                   end if    
	                end if                   
               end if                
             end if
           end if
        end if
 %> 
 <%
    WEND
    UserFile.Close
%>
   </TABLE> 

<%
  end if	
End Function

Function DisplayByIP(ipaddr,uFileName,rFileName)
Dim us, rs,pos,uid,str,user,ruser,ip,dt,res,result,rpttime,UserFile,rip
    Set objFSOU = CreateObject("Scripting.FileSystemObject")
    
%>
<TABLE width=100% cellpadding=0 cellspacing=0 border=1>
<th><%=IDS_CN_USER_NAME%> </th><th><%=IDS_CN_REMOTE_HOST%></th><th><%=IDS_CN_VERSION%></th><th><%=IDS_CN_DOWNLOAD_REQ_TIME%></th><th><%=IDS_CN_INSTALL_RESULT%></th><th><%=IDS_CN_INSTALL_COMPLETE_TIME%></th>
<%  
if  objFSOU.FileExists(uFileName) then
	Set UserFile = objFSOU.OpenTextFile (uFileName)     
    while UserFile.AtEndOfStream = false
%>
<%    
        us = UserFile.ReadLine ()
		Trim(us)
        if Len(us) > 0 then
           pos = Instr(us,",")
           if pos > 0 then
             uid = Left(us, pos - 1)
             str = Right (us, Len(us)-pos)
             pos = Instr (str, ",")
             if pos > 0 then
                user = Left(str,pos - 1)                
                us = Right(str,Len(str) - pos)
			    pos = Instr(us,",")
				if pos > 0 then
				    ip = Left(us,pos - 1)
				    str = Right(us, Len(us) - pos)                                                            
					pos = Instr(str,",")
					if pos > 0 then
					    ver = Left(str,pos -1)
					    dt = Right(str, Len(str)-pos)					                                                             				   
					    if ip = ipaddr then
	                      res = DisplayDataFromResultFile(uid,user,ip,ver,dt,rFileName,ipaddr,false)
	                      if GetDataFromResultFile(uid,"id",rFileName) = "" then
	                           if user = "" then
								  user = "&nbsp;"
							   end if
							   if ver = "" then
								  ver = "&nbsp;"
							   end if
	%>
	<TR align="center">
	<td><%=user%></td><td><%=ip%></td><td><%=ver%></td><td><%=dt%></td><td>InComplete</td><td>&nbsp;</td>           
	</TR>
	<%                   
	                      end if
	                 end if
	                end if
                end if                
             end if
           end if
        end if
 %> 
 <%
    WEND
    UserFile.Close
%>
</TABLE> 

<%
 end if	
End Function

Function GetDataFromResultFile(uid,dataType,rFileName)
    Dim rs,ruid,rstr,ruser,rip,pos,ResultFile,result
    Set objFSOR = CreateObject("Scripting.FileSystemObject")
    if  objFSOR.FileExists(rFileName) then
	    Set ResultFile = objFSOR.OpenTextFile (rFileName)   
	
		while ResultFile.AtEndOfStream = false
		    rs = ResultFile.ReadLine ()
			Trim(rs)
		    if Len(rs) > 0 then
		       pos = Instr(rs,",")
		       if pos > 0 then
		          ruid = Left(rs,pos-1)
		          if dataType = "id" and uid = ruid then
		            GetDataFromResultFile = ruid
		            ResultFile.Close
		            exit function
		          end if
		          rstr = Right(rs,Len(rs)-pos)
		          pos = Instr(rstr,",")
		          if pos > 0 then
		            ruser = Left(rstr,pos-1)
		            if dataType = "user" and uid = ruid then
		               GetDataFromResultFile = ruser
		               ResultFile.Close
		               exit function
		            end if
		            rs = Right(rstr,Len(rstr)-pos)
		            pos = Instr(rs,",")
		            if pos > 0 then
		                rip = Left(rs, pos - 1)
		                if dataType = "ip" and uid = ruid then
		                   GetDataFromResultFile = rip
		                   ResultFile.Close
		                   exit function
		                end if
		                rstr = Right(rs,Len(rs)-pos)
		                pos = Instr(rstr,",")
		                if pos > 0 then
							if uid = ruid then
							   if dataType = "result" then                    
							      GetDataFromResultFile = Left(rstr,pos -1)
							      ResultFile.Close
							      exit function
							   elseif dataType = "rptime" then
							      result = Left(rstr,pos-1)
							      GetDataFromResultFile = Right(rstr, Len(rstr)-pos)
							      ResultFile.Close
							      exit function						   						      
							   end if					   
							end if
						end if
					end if
				  end if
		       end if
		    end if       
		wend    
		ResultFile.Close
    end if	
    GetDataFromResultFile = ""
End Function

Function GetDateStr(datetimestr)
   Dim d
   
   d = CDate(datetimestr)
   GetDateStr = DatePart("m",d) & "/" & DatePart("d",d) & "/" & DatePart("yyyy",d)
End Function

Function CompareDate(d1,d2)
CompareDate  = false
Dim days, months, years
days = DateDiff("d",d1,d2)
months = DateDiff("m",d1,d2)
years = DateDiff("yyyy",d1,d2)
if days = 0 and months = 0 and years = 0 then
   CompareDate = true
end if
end function


Function DisplayDataFromResultFile(duid,duser,dip,dver,ddt,rFileName,cond,conddate)
    Dim rs,ruid,rstr,ruser,rip,pos,ResultFile,result,rtime,rDate
    Set objFSOR = CreateObject("Scripting.FileSystemObject")    
    DisplayDataFromResultFile = false
    if  objFSOR.FileExists(rFileName) then
	    Set ResultFile = objFSOR.OpenTextFile (rFileName)   	    		
	    while ResultFile.AtEndOfStream = false
	        rs = ResultFile.ReadLine ()
			Trim(rs)
	        if Len(rs) > 0 then
	           pos = Instr(rs,",")
	           if pos > 0 then
	              ruid = Left(rs,pos-1)
	              rstr = Right(rs,Len(rs)-pos)
	              pos = Instr(rstr,",")
	              if pos > 0 then
	                ruser = Left(rstr,pos-1)
	                rs = Right(rstr,Len(rstr)-pos)
	                pos = Instr(rs,",")
	                if pos > 0 then
	                    rip = Left(rs, pos - 1)
	                    rstr = Right(rs,Len(rs)-pos)
	                    pos = Instr(rstr,",")
	                    if pos > 0 then
	                       result = Left(rstr,pos - 1)
	                       rtime = Right(rstr, Len(rstr)-pos)
	                       rDate = GetDateStr(rtime)
						   if ruid = duid then
						      if conddate then
						         if CompareDate(CDate(cond),CDate(rtime)) then
						          DisplayDataFromResultFile = true
						          if duser = "" then
	                                 duser = "&nbsp;"
	                              end if
	                              if dver = "" then
	                                 dver = "&nbsp;"
	                              end if
	%>
	<TR align="center">
	<td><%=duser%></td><td><%=dip%></td><td><%=dver%></td><td><%=ddt%></td><td><%=result%></td><td><%=rtime%></td>            
	</TR>       	 
	<%
	                             end if
	                          elseif cond = "All" or LCase(cond) = LCase(ruser) or cond = rip or cond = result then
	                              DisplayDataFromResultFile = true
	                              if duser = "" then
	                                 duser = "&nbsp;"
	                              end if
	                              if dver = "" then
	                                 dver = "&nbsp;"
	                              end if
%>
	<TR align="center">
	<td><%=duser%></td><td><%=dip%></td><td><%=dver%></td><td><%=ddt%></td><td><%=result%></td><td><%=rtime%></td>            
	</TR>       	 
<%	                          
	                          end if
						   end if	
						end if
					end if
				  end if
	           end if
	        end if       
	    wend    
       ResultFile.Close
  end if
End Function


%>
