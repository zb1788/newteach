<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%@page import="vcom.util.*" %>
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
    <title>优教授课平台</title>
    <link href='<%=path%>/style/style.css' rel='stylesheet' type='text/css'/>

    <script language="javascript" src="<%=path%>/js/jquery-1.4.2.min.js"></script>
    <script language="javascript" src="<%=path%>/ext/adapter/jquery/juery-v1-2-6.js"></script>
    <script language="javascript" src="<%=path%>/js/validate_common.js"></script>
    <script language="javascript" src="<%=path%>/js/ajax_common.js"></script>
    <script language="javascript" src="<%=path%>/js/common.js"></script>
    <script language="javascript" src="js/teach_constant.js"></script>
    <script language="javascript" src="<%=path%>/js/simple_hotkey.js"></script>
    <script language="javascript" src="<%=path%>/js/mac_util.js"></script>
    <!-- 接口配置文件 	-->
    <script language="javascript" src="<%=path%>/js/config_pls.jsp"></script>
    <!-- md5加密 -->
    <script language=javascript src="<%=path%>/script/js_md5.js"></script>
    <script language="javascript" src="<%=path%>/js/login.js"></script>
    <script language="javascript">
        var global_basePath = "<%=basePath%>";
        setMainTeachSeverPath('<%=vcom.newteach.service.ParamValueCache.getTempKey("pls.mainteach.path")%>');
        _common.setCurrServerPath('<%=path%>');
    </script>

    <style>
        #error2 {
            position: absolute;
            top: 52px;
            left: 666px;
            border: 1px solid #ffd0a8;
            text-align: left;
            height: 20px;
            padding: 10px 5px 10px 45px;
            font-size: 16px;
        }
    </style>
</head>
<body class="loginBg" scroll=no onDragStart="return false;">
<style>
    #waithtml {
        top: 390px;
        left: 700px;
        position: absolute;
        font-size: 14px;
        font-weight: bold;
    }
</style>
<div class="containers setBg">
    <div class="login">
        <div class="idpw">
            用户名：
            <input id="login.username"
                   onKeyDown="if(event.keyCode==13||event.keyCode==39) event.keyCode=9;"
                   onclick="_loginObj.setActInputObj(this);"
                   type="text"
                   maxlength="16" size="16"/>

            <script type="text/javascript">
                <!--
                //alert(document.getElementById("login.username").focus());
                document.getElementById("login.username").focus();
                _loginObj.setActInputObj(document.getElementById("login.username"));
                //-->
            </script>
            密码：
            <input id="login.pwd" onclick="_loginObj.setActInputObj(this);"
                   onKeyDown="if(event.keyCode==13) _loginObj.login(); if(event.keyCode==37) document.getElementById('login.username').focus();"
                   type="password"
                   maxlength="20"/>
            <button onclick="_loginObj.login();" id="login.login">
                登 录
            </button>
            &nbsp;&nbsp;
            <INPUT TYPE="checkbox" style="width: 25px;" NAME=""
                   id="rememberFlag">
            记住密码
            <input TYPE="checkbox" style="width: 25px;" NAME="" id="loginType">普通登录
            <ul id="keyboard">
            </ul>
            <div id="login.tip">
            </div>
        </div>
        <ul id="userName">
        </ul>
    </div>
    <script type="text/javascript">
        <!--
        _loginObj.errTop = 5;//_loginObj
        _loginObj.errLeft = -25;
        //-->
    </script>
    <span class="clearfix"></span>
</div>
<!-- 获取mac地址的控件 begin -->
<div style="display: none">
    <OBJECT CLASSID="clsid:3bde69c2-9ec0-4636-868c-9e400a44e765" ID=mac_ocx Name=mac_ocx></OBJECT>
</div>
<jsp:include page="/inc/downloadfile.jsp"></jsp:include>
<!-- 获取mac地址的控件 end -->
<div class="closePC close" onclick="_common.exitSystem();"></div>
<div id="maskAllall" style="display: none;">
    <div id="waithtml"><img src="<%=path%>/images/extanim32.gif"/>正在加载数据，请稍后....</div>
</div>
<div id="maskAll" style="display: none;"></div>
<div id="del_icon" style="display: none; position: absolute; left: 0px; top: 0px; cursor: hand"
     onclick=" _loginObj.delHistoryUser();">
    <img id="del_icon_img" src="<%=path%>/images/del.gif"/>
</div>
</body>
</html>
<script type="text/javascript">
    var protocol = "<%= vcom.util.InterfaceCfg.ipMap.get("LOCAL_PROTOCOL")+"://"%>";
    if (("http://" == protocol || "https://" == protocol) && window.location.protocol + "//" != protocol) {
        window.location.href = window.location.href.replace(window.location.protocol + "//", protocol);
    }
</script>
<script type="text/javascript">
    <!--
    //session.PLS_CSS_NAME
    _common.setCssName('tongyong');
    _loginObj.maxAccounts = 10
    _loginObj.getHistoryUser();
    document.onselectstart = function () {
        return false;
    }

    document.onkeydown = tokeyDown;

    function tokeyDown(e) {
        var keyval = event.keyCode;
        if (keyval == 8) {
            if (document.activeElement) {
                if (document.activeElement.tagName != "INPUT") {
                    return false;//如果按后退键， 暂时屏蔽掉
                }
            }
        }
    }

    document.onmouseover = function () {
//alert(event.srcElement.id);
        var obj = event.srcElement;

        if (obj.name != 'history_user' && obj.id != 'del_icon' && obj.id != 'del_icon_img') {
            _loginObj.hideDelButton();
        }
        // return false;
    };
    //-->
</script>
