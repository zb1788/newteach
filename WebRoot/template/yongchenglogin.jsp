<%@ page language="java" import="java.util.*" pageEncoding="GB18030" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<style>
    #waithtml {
        top: 500px;
        left: 700px;
        position: absolute;
        font-size: 14px;
        font-weight: bold;
    }
</style>
<div class="containers setBg9">
    <div class="banner">
        <script type="text/javascript">
            <!--
            var focus_width = 978
            var focus_height = 324
            var text_height = 0
            var swf_height = focus_height + text_height
            var chengshi = "<s:property value="#session.PLS_CSS_NAME" />"
            var pics = '<%=path%>/newteach/' + chengshi + '/images/banner/01.jpg|<%=path%>/newteach/' + chengshi + '/images/banner/02.jpg|<%=path%>/newteach/' + chengshi + '/images/banner/03.jpg|<%=path%>/newteach/' + chengshi + '/images/banner/04.jpg'
            var links = '||||'
            var texts = '||||'
            document.write('<object id="call_swf" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="' + focus_width + '" height="' + swf_height + '">');
            document.write('<param name="allowScriptAccess" value="sameDomain"><param name="movie" value="<%=path%>/newteach/flash/focusL.swf"><param name=wmode value=transparent><param name="quality" value="high">');
            document.write('<param name="menu" value="false"><param name=wmode value="opaque">');
            document.write('<param name="FlashVars" value="pics=' + pics + '&links=' + links + '&texts=' + texts + '&pic_width=' + focus_width + '&pic_height=' + focus_height + '&textheight=' + text_height + '">');
            document.write('<embed src="<%=path%>/newteach/flash/focusL.swf" wmode="opaque" FlashVars="pics=' + pics + '&links=' + links + '&texts=' + texts + '&borderwidth=' + focus_width + '&borderheight=' + focus_height + '&textheight=' + text_height + '" menu="false" bgcolor="#DADADA" quality="high" width="' + focus_width + '" height="' + swf_height + '" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
            document.write('</object>');


            _loginObj.errTop = 4;//_loginObj
            _loginObj.errLeft = -25;

            //-->
        </script>
    </div>
    <div class="login2">
        <div class="idpw">用户名：
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
                   maxlength="12"/>
            <button onclick="_loginObj.login();" id="login.login">
                登 录
            </button>
            &nbsp;&nbsp;
            <INPUT TYPE="checkbox" style="width: 25px;" NAME=""
                   id="rememberFlag">
            记住密码
            <div id="login.tip">
            </div>
            <ul id="keyboard">

            </ul>

        </div>
        <ul id="userName2">

        </ul>
    </div>