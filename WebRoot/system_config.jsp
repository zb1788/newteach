<%@page import="vcom.util.GetVersion" %>
<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<% String verNum = GetVersion.version();%>
<!-- String verNum="v1.0"; -->
<!--ϵͳ����-��ʼ-->
<div class="floatDiv" id="sysConfig.window">
    <div class="divTop">
        <div class="divClose" onclick="_sysConfg.closeWindow();"></div>
        <div class="divTitle">ϵͳ���ã�</div>
        <div class="divContent">
            <div style="width:100%">
                <h3>��������ϵͳ����</h3>
                <ul class="divButton">
                    <li id="btnCss" class=space4><a id=SysConfig.teachipbutton
                                                    href="javascript:new TeachUrlConfigObj().openWindow1();">�ڿ�ip����</a>
                    </li>
                    <li><a id="SysConfig.teachToolConfigButton" href="javascript:_teachToolConfigObj.openWindow(3);">��������</a>
                    </li>
                </ul>
            </div>
            <%if (null != verNum) {%>
            <div style="width:100%">
                <ul class="divButton">
                    <li style="margin-left:120px;font-size: 18px;font-weight: normal; ">ϵͳ�汾�ţ�<%=verNum%>
                    </li>
                </ul>
            </div>
            <%}%>
            <!-- ϵͳ�汾�� end -->
        </div>
    </div>
    <div class="divBottom"></div>
</div>
<!--ϵͳ����-����-->
<!--���� ���� begin-->
<div id="sysConfig.passwdWindow" class="floatDiv" style="display: none;">
    <div class="divTop">
        <div class="divClose" onclick="_sysConfg.closePasswdWindow();"></div>
        <div class="divTitle">������֤��</div>
        <div class="divContent">
            <h3>������֤</h3>
            <dl class="ipSet">
                <dt>���������룺</dt>
                <dd><input type="password" id="sysConfig.passwd" maxlength="10"/></dd>
                <!-- ϵͳ�汾�� begin -->
                <%if (null != verNum) {%>
                <dt style="margin-top: 10px;">ϵͳ�汾�ţ�</dt>
                <dd style="padding-left: 10px; margin-top: 10px;"><%=verNum%>
                </dd>
                <%}%>
                <!-- ϵͳ�汾�� end -->
            </dl>
            <span class="clearfix"></span>
        </div>
        <span class="clearfix"></span>
        <!-- ��ʾ��Ϣ -->
        <div class="" id="sysConfig.tip"></div>
        <div class="page marR2">
            <div class="pageNext"><a href="javascript:void(0);" onclick="_sysConfg.closePasswdWindow();">�� ��</a></div>
            <div class="pageNext"><a href="javascript:_sysConfg.validatePasswd(); ">ȷ ��</a></div>
        </div>
    </div>
    <div class="divBottom"></div>
</div>
<!--���� ���� end-->


<!-- ģ������ -->