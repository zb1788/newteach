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
<!--USB设备-开始-->
<div class="floatDiv" id="usb.window">
    <div class="divTop">
        <div class="divClose" onclick="_usbObj.closeUSBWindow();"></div>
        <div class="divTitle">U盘资源！</div>
        <div class="divContent" id="usb.ocx"></div>
        <div class="page marR2">
            <DIV class=pageNext><A onclick="_usbObj.closeUSBWindow();" href="javascript:void(0);">返 回</A></DIV>
        </div>
    </div>
    <div class="divBottom"></div>
</div>
<!--USB设备-结束-->
