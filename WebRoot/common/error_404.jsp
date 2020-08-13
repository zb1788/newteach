<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);

%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">
<HTML xmlns="http://www.w3.org/1999/xhtml">
<HEAD>
    <META content="text/html; charset=UTF-8" http-equiv=Content-Type>
    <TITLE>404页面</TITLE>
    <link href="<%=path%>/common/style/common.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=path%>/script/jquery-1.7.2.js"></script>
    <style>
        .error {
            background: url(<%=path%>/common/images/404.jpg) no-repeat;
            width: 980px;
            min-height: 400px;
            height: auto;
            display: block;
            margin: 30px auto;
        }

        .text_con {
            padding: 380px 0 0 290px;
        }

        .error h2 {
            height: 30px;
            line-height: 30px;
            font-family: Microsoft YaHei;
            font-size: 16px;
            display: block;
            margin-bottom: 10px;
        }

        .error p {
            line-height: 24px;
        }

        .error a, .error a:visited {
            color: #00f;
            text-decoration: underline;
        }

        .error a:hover {
            color: #f60;
        }
    </style>
</HEAD>
<BODY>
<div class="error">
    <div class="text_con">
        <h2>您访问的页面未找到! </h2>
        <p> 1、检查一下您的域名和地址是否输入正确；<br/>
            2、动动手指&nbsp;<a href="javascript:location.reload();">刷新</a>&nbsp;尝试一下；<br/>
            3、如果您当前使用授课客户端，请点此 <a href="close://" tareget="_self">关闭</a> 错误页面；<br/>
            4、您还可以拨打我们的客服电话哦！(<font class="orangeFon">400-699-3111</font>)

        </p>
    </div>
</div>
</BODY>
</HTML>