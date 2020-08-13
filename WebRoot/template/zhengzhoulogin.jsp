<%@ page language="java" import="java.util.*" pageEncoding="GB18030" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

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
                   maxlength="12"/>
            <button onclick="_loginObj.login();" id="login.login">
                登 录
            </button>
            &nbsp;&nbsp;
            <INPUT TYPE="checkbox" style="width: 25px;" NAME=""
                   id="rememberFlag">
            记住密码
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