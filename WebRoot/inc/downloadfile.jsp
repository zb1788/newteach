<%@ page language="java" import="java.util.*" pageEncoding="gbk" %>

<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";

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
        <div id="uploadlist"></div>
    </div>
</div>