<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <meta http-equiv="x-ua-compatible" content="ie=7"/>
    <script language="javascript" src="<%=path%>/js/jquery-1.4.2.min.js"></script>
    <title>基础教育班班通工程</title>
</head>
<body onload=" init();"></body>
<script type="text/javascript">

    function init() {
        var url = 'toLoginPage.do?default=true&templateId=1';//默认为电子白板
        location.href = url;
    }
</script>
</html>