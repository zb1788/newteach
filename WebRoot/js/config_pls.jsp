<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%@page import="net.sf.json.JsonConfig" %>
<%@page import="vcom.util.InterfaceCfg" %>
<%@page import="net.sf.json.JSONObject" %>
<jsp:directive.page import="java.text.SimpleDateFormat"/>
<%

    JSONObject pls_config = JSONObject.fromObject(InterfaceCfg.ipPathMap, new JsonConfig());
    JSONObject _config = JSONObject.fromObject(InterfaceCfg.ipMap, new JsonConfig());


%>
var pls_config_all = <%= pls_config.toString() %>;
var _config=<%=_config.toString() %>;
var timestap = "<%= new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) %>";
var transferProtocol_web = _config.LOCAL_PROTOCOL;
if(typeof(transferProtocol_web)== "undefined" || transferProtocol_web==null){
//–≠“ÈŒ¥≈‰÷√ƒ¨»œhttp
transferProtocol_web="http://";
}else{
transferProtocol_web=transferProtocol_web+"://";
}
var transferProtocol_server = "http://";
var playerProtocol = transferProtocol_web;