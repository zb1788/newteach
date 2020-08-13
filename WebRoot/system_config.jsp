<%@page import="vcom.util.GetVersion" %>
<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<% String verNum = GetVersion.version();%>
<!-- String verNum="v1.0"; -->
<!--系统设置-开始-->
<div class="floatDiv" id="sysConfig.window">
    <div class="divTop">
        <div class="divClose" onclick="_sysConfg.closeWindow();"></div>
        <div class="divTitle">系统设置！</div>
        <div class="divContent">
            <div style="width:100%">
                <h3>请您进行系统设置</h3>
                <ul class="divButton">
                    <li id="btnCss" class=space4><a id=SysConfig.teachipbutton
                                                    href="javascript:new TeachUrlConfigObj().openWindow1();">授课ip设置</a>
                    </li>
                    <li><a id="SysConfig.teachToolConfigButton" href="javascript:_teachToolConfigObj.openWindow(3);">工具配置</a>
                    </li>
                </ul>
            </div>
            <%if (null != verNum) {%>
            <div style="width:100%">
                <ul class="divButton">
                    <li style="margin-left:120px;font-size: 18px;font-weight: normal; ">系统版本号：<%=verNum%>
                    </li>
                </ul>
            </div>
            <%}%>
            <!-- 系统版本号 end -->
        </div>
    </div>
    <div class="divBottom"></div>
</div>
<!--系统设置-结束-->
<!--密码 窗口 begin-->
<div id="sysConfig.passwdWindow" class="floatDiv" style="display: none;">
    <div class="divTop">
        <div class="divClose" onclick="_sysConfg.closePasswdWindow();"></div>
        <div class="divTitle">密码验证！</div>
        <div class="divContent">
            <h3>密码验证</h3>
            <dl class="ipSet">
                <dt>请输入密码：</dt>
                <dd><input type="password" id="sysConfig.passwd" maxlength="10"/></dd>
                <!-- 系统版本号 begin -->
                <%if (null != verNum) {%>
                <dt style="margin-top: 10px;">系统版本号：</dt>
                <dd style="padding-left: 10px; margin-top: 10px;"><%=verNum%>
                </dd>
                <%}%>
                <!-- 系统版本号 end -->
            </dl>
            <span class="clearfix"></span>
        </div>
        <span class="clearfix"></span>
        <!-- 提示信息 -->
        <div class="" id="sysConfig.tip"></div>
        <div class="page marR2">
            <div class="pageNext"><a href="javascript:void(0);" onclick="_sysConfg.closePasswdWindow();">返 回</a></div>
            <div class="pageNext"><a href="javascript:_sysConfg.validatePasswd(); ">确 定</a></div>
        </div>
    </div>
    <div class="divBottom"></div>
</div>
<!--密码 窗口 end-->


<!-- 模板设置 -->