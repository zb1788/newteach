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
<!--USB�豸-��ʼ-->
<div class="floatDiv" id="usb.window">
    <div class="divTop">
        <div class="divClose" onclick="_usbObj.closeUSBWindow();"></div>
        <div class="divTitle">U����Դ��</div>
        <div class="divContent" id="usb.ocx"></div>
        <div class="page marR2">
            <DIV class=pageNext><A onclick="_usbObj.closeUSBWindow();" href="javascript:void(0);">�� ��</A></DIV>
        </div>
    </div>
    <div class="divBottom"></div>
</div>
<!--USB�豸-����-->
