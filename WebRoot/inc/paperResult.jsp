<%@ page contentType="text/html; charset=GBK" %>
<%@page import="java.net.URLDecoder" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", 0);
    String path = request.getContextPath();
    String id = request.getParameter("id");
    String loginStyle = request.getParameter("loginStyle");
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>章节训练</title>
    <meta http-equiv="Content-Type" content="text/html; charset=gbk">
    <link href="<%=path %>/style/fixck.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=path%>/script/jquery172min.js"></script>
    <script type="text/javascript" src="<%=path%>/js/config_pls.jsp?"></script>
    <script type="text/javascript" src="<%=path%>/js/ajax_common.js?"></script>
</head>
<body style="overflow: hidden;">
<div class="realContent neir fixck" style="border-top: 0; position: relative;" id="content">
</div>
<script type="text/javascript">
    var id = "<%=id%>";
    var url = "http://" + _config["OLMS"] + "/online/interface/answerdevice/questions.action?";
    url += "id=" + id;
    //url="http://192.168.143.54/online/interface/answerdevice/questions.action?id=83ccbe443667442892c123f36b7b8f6c";
    ajaxJson(url, null, "utf-8", function (data) {
        if (data && undefined != data && data.qcontent) {
            document.getElementById("content").innerHTML = data.qcontent;
        } else {
            document.getElementById("content").innerHTML = "未获取到试题";
        }
    });
</script>
</body>
</html>
