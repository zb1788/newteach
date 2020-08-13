<%@page contentType="application/json; charset=UTF-8"%><%
response.setContentType("application/json");
request.setCharacterEncoding("UTF-8");
response.setCharacterEncoding("UTF-8");
response.setHeader("Pragma","No-cache");
response.setHeader("Cache-Control","no-cache");
response.setDateHeader("Expires", 0);
//response.setHeader("Access-Control-Allow-Origin","*");
String data=(String)request.getAttribute("data");
String jsoncallback=(String)request.getParameter("jsoncallback");
if(data!=null){
	if(jsoncallback!=null && jsoncallback.trim().length()>0){
		out.print(jsoncallback+"("+data+")");
	}else{
		out.print(data);
	}
}else{
	out.print("error! data is NULL!");
}
%>