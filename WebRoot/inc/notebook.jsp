<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
//NoTEBOOK对接sso地址加密
    vcom.newteach.util.Vcom_3DES des = new vcom.newteach.util.Vcom_3DES();
    des.setKeyStr("vcommenhutuwenandotheros");
    des.setIsEncrypt(1);
    String sso_ut = request.getParameter("ut");
    if (sso_ut == null || sso_ut.trim().length() == 0) {
        out.println("参数错误!");
        return;
    }
    des.setMessage(vcom.youjiao.InterfaceCfg.ipMap.get("SSO_IP"));
    String desSsoIP = des.Vcom3DESChiper();
    des.setMessage(vcom.youjiao.InterfaceCfg.ipMap.get("SSO"));
    String desSsoDomain = des.Vcom3DESChiper();
    des = null;
    String notebook = vcom.youjiao.InterfaceCfg.ipMap.get("NOTEBOOK");

    response.sendRedirect("http://" + notebook + "/experiment/index/wuli?sso=" + desSsoDomain + "&sso_ip=" + desSsoIP + "&ut=" + sso_ut);
%>