<%@ page language="java" import="java.util.*,vcom.newteach.service.ParamValueCache" pageEncoding="utf-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    String course = (String) request.getParameter("course");
    AuthResult checkedUser = (AuthResult) request.getSession().getAttribute("authResult");

    String cssName = ParamValueCache.getTempKey("pls.css.name");//
    String allow = ParamValueCache.getTempKey("pls.preview.allow");//
    String auth = "0";
    String authInfo = "";
    if (cssName == null || cssName.equals("")) {
        cssName = "tongyong";
    }
    if (checkedUser == null || checkedUser.equals("undefined")) {
        auth = "0";
        checkedUser = new AuthResult();
    } else if (allow != null && allow.equals("false")) {
        //不支持预览功能
        auth = "0";
    } else {
        auth = "1";
        authInfo = (String) checkedUser.getAuthInfo();
        String url = basePath + "/index.do?userSetFlag=";
        url += "&templateId=1&cssName=" + cssName + "&whiteBoardFlag=2&&course=" + course;
        response.sendRedirect(url);
    }

%>
<%@page import="vcom.sso.vo.AuthResult" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">
    <title>正在跳转</title>

    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <!--
    <link rel="stylesheet" type="text/css" href="styles.css">
    -->
</head>
<body>
<br><br>
<div>
    <center><h1 id="transfer"></h1></center>
</div>
<%--
    <center><input type="button"  onclick="javascript:window.open('','_parent','');window.close();"  value="关闭此页面"></center>
--%>
<script type="text/javascript">
    var auth = "<%=auth%>";
    var allow = "<%=allow%>";
    var authinfo = "用户凭证有效";

    function init() {
        if (auth == "0") {
            authinfo = "未获取到认证信息";
            if (allow == "false") {
                authinfo = "暂不支持此功能";
            }
            document.getElementById("transfer").innerHTML = authinfo;
            return;
        }
        return;
    }

    init();

</script>
</body>
</html>
