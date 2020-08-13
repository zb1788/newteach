<%@ page language="java" import="java.util.*" pageEncoding="gbk" %>
<!-- %@page import="vcom.teacher.util.ParseXml" %-->
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    //String versionpath=ParseXml.getXmlNode("vcomdownlaod");
    String browser = request.getHeader("user-agent");
%>
<div id='TB_overlay'></div>
<div id='TB_window'>
    <div id="mask" style="display:none"></div>
    <div id="upload" class="floatDiv2" style="display:none">
        <div class="title">
            <a href="javascript:tocloseupload();"><img src="<%=path %>/teacher/images/x.gif"/></a>
            <h5 id="__openfile">正在加载资源，请稍候....</h5>
        </div>
        <span class="clearfix"></span>
        <div id="uploadlist">

        </div>
    </div>
</div>
<%-- <script>
<OBJECT ID="ocx" width="0" height="0" codebase="<%=basePath %>office/officdown.cab#version=<%=versionpath.replaceAll("\\.",",") %>" CLASSID="CLSID:B02201C9-1789-4FF0-B95F-C1A03D8B6B99">
    	<PARAM NAME="_Version" VALUE="65536">
    	<PARAM NAME="_ExtentX" VALUE="10583">
    	<PARAM NAME="_ExtentY" VALUE="10583">
    	<PARAM NAME="_StockProps" VALUE="0">
</OBJECT>
<script language="JavaScript" for="ocx" event="OnXmlFinish(strXML)">
	if(filedowntype==1){
		OnXmlFinish2(strXML);
	}else if(filedowntype==2){
		OnXmlFinish(strXML);
	}else if(filedowntype==3){
		OnXmlFinish3(strXML);
	}
</script>
<script language="JavaScript" for="ocx" event="OnProccess(pos,speed)">
	if(filedowntype==1){
		updatePos2(pos,speed);
	}else if(filedowntype==2){
		updatePos(pos,speed);
	}else if(filedowntype==3){
		updatePos3(pos,speed);
	}
</script>
<script language="JavaScript" for="ocx" event="OnStateChange(state,errMsg)">
	updateState(state,errMsg);
</script>
--%><!-- % =versionpath % -->
<script>
    var ocxversion = "";
</script>