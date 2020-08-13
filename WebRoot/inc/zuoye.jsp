<%@ page contentType="text/html; charset=GBK" %>

<%@ taglib prefix="s" uri="/struts-tags" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", 0);
    String path = request.getContextPath();
    String templateId = (String) session.getAttribute("templateId");
    boolean isTv = "2".equals(templateId);
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gbk">
    <title id="__title">作业浏览</title>

    <link href="<%=path %>/style/style.css" rel="stylesheet" type="text/css"/>
    <script language="javascript"
            src="<%=path%>/ext/adapter/jquery/juery-v1-2-6.js"></script>
    <script language="javascript" src="<%=path%>/js/ajax_common.js"></script>
</head>
<body bgcolor="#000000" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" scroll="no">
<%if (isTv) {%>
<div class="btn">
    	<span>
        	<div id="bigwindow" class="btnA" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
                 onclick="tocloseorbg(this,2);"></div>
            <div class="btnC" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
                 onclick="tocloseorbg(this,1);"></div>
        </span>
    <dd id="_title" style="margin-left: -40px;">作业浏览</dd>
</div>
<%}%>
<div class="zycontent" id="zycontent" style="height:360px;">
    <div class='zytitle' id="zytitle" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"></div>
    <div class='zybody' id="zybody"></div>
    <div class='fujian' id="fujian"><span>附件下载：</span><a href='#'><span>课后作业</span></a></div>
</div>
<%if (!isTv) {%>
<div class="btn">
    	<span>
        	<div id="bigwindow" class="btnA" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
                 onclick="tocloseorbg(this,2);"></div>
            <div class="btnC" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
                 onclick="tocloseorbg(this,1);"></div>
        </span>
    <dd id="_title" style="margin-left: -40px;">作业浏览</dd>
</div>
<%}%>
<script type="text/javascript">
    var flashpath = "<%=request.getAttribute("id")%>";
    var afsize = 40;


    window.onresize = function () {
        document.getElementById("zycontent").style.height = document.body.clientHeight - 40;
        $("#zybody").css("height", document.body.clientHeight - 180 - afsize + "px");
        $("#zytitle").css("width", (document.body.clientWidth - 50) + "px");
        //iframe2.height=document.body.clientHeight-40;
        try {
            if (document.body.clientWidth > 900) {
                bigwindow.className = "btnB";
            } else {
                bigwindow.className = "btnA";
            }
        } catch (e) {
        }
    }
    jQuery(function ($) {
        var myDate = new Date();

        var data = "id=" + flashpath;
        $.getJSON(pls_config_all["LCS.ZY.HWINFO4TEACHER"] + "?time=" + myDate.getSeconds() + "&reqEncoding=gbk&jsoncallback=?", data, function (result) {
            //alert(result.homework.content);
            var zyname = result.homework.name;
            if (zyname.length > 26) {
                zyname.substring(0, 26);
            }
            $("#zytitle").css("width", (document.body.clientWidth - 50) + "px");
            $("#zytitle").attr("title", result.homework.name);
            $("#zytitle").html(result.homework.name);
            /*
            if(result.homework.name.length>25){
                $("#zytitle").attr("title",result.homework.name);
                $("#zytitle").html(result.homework.name.substring(0,24)+"...");
            }else{
                $("#zytitle").html(result.homework.name);
            }
            */
            $("#zybody").html(result.homework.content);
            if (result.attachment) {
                $("#fujian").html('<span>附件下载：</span><a href=\'' + result.attachment.path + result.attachment.filename + '\' target="_blank" ><span>' + result.attachment.name + '</span></a>');
                /*	$.getJSON(interfaceurl+"VICenter.001&sysCode=LCS&reqEncoding=gbk&jsoncallback=?","",function(ur){
                        if(ur && ur.serurl){
                            $("#fujian").html('<span>附件下载：</span><a href=\''+result.attachment.path+result.attachment.filename+'\' target="_blank" ><span>'+result.attachment.name+'</span></a>');
                        }
                    });
                  */
            } else {
                $("#fujian").hide();
                afsize = 0;
            }
        })
    })

    function tocloseorbg(obj, type) {
        if (type == 1) {
            var ostype = 0;
            try {
                var ua = window.navigator.userAgent;
                ua = ua.replace("(", "").replace(")", "");
                var osVersion = ua.split(";")[2];
                var osV = osVersion.substr(osVersion.length - 3, 3);
                if (osV == "5.1") ostype = 1;
            } catch (e) {
            }
            if (ostype == 0) {
                window.setTimeout(function () {
                    window.location.href = "close://";
                }, 500);
            } else {
                window.location.href = "close://";
            }
        } else {
            if (obj.className.indexOf("btnA") >= 0) {
                obj.className = "btnB";
                window.location.href = "max://";
            } else {
                obj.className = "btnA";
                window.location.href = "recover://";
            }
        }
    }

    function tochangebg(obj, type) {
        if (type == 1) {
            if (obj.className == "btnA") {
                obj.className = "btnAH";
            } else if (obj.className == "btnB") {
                obj.className = "btnBH";
            } else if (obj.className == "btnC") {
                obj.className = "btnCH";
            }
        } else {
            if (obj.className == "btnAH") {
                obj.className = "btnA";
            } else if (obj.className == "btnBH") {
                obj.className = "btnB";
            } else if (obj.className == "btnCH") {
                obj.className = "btnC";
            }
        }
    }
</script>

</body>
</html>