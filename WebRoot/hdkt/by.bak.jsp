<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    String loginInfo = request.getParameter("data");
    if (loginInfo == null) {
        loginInfo = "null";
    }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html style="overflow-y:auto">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <meta http-equiv="x-ua-compatible" content="ie=7,ie=8,ie=9"/>
    <base href="<%=basePath%>">
    <title>表扬</title>
    <link href="<%=path%>/hdkt/css/hddt.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path%>/hdkt/css/style.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=path%>/script/jquery172min.js"></script>
    <script type="text/javascript" src="<%=path%>/js/config_pls.jsp"></script>
    <script type="text/javascript" src="<%=path%>/js/ajax_common.js"></script>
    <script type="text/javascript" src="<%=path%>/hdkt/js/class.js"></script>
    <script type="text/javascript" src="<%=path%>/newLogin/pages/youjiaoplay/js/swfobject.js"></script>

    <script type="text/javascript">
        var loginInfo =<%=loginInfo%>;
    </script>
</head>
<body>
<div id="comments" class="comments" style="display:none;">
    <div id='byimgdiv'>
    </div>
</div>
<div class="qw_xr">
    <div class="boxCon">
        <ul class="stuList" id="stuList_qw"></ul>
        <div class="b">
            <input class="but " type="button" value="表&nbsp&nbsp&nbsp&nbsp扬" onclick="commends();">
            <input class="but" type="button" value="关&nbsp&nbsp&nbsp&nbsp闭" onclick="onclose();">
        </div>
    </div>
</div>

<script type="text/javascript">
    classes.init(loginInfo, function () {
        var rlist = classes.stuList;
        var h = "";
        for (var i = 0; i < rlist.length; i++) {
            var stu = rlist[i];
            h += "<li><a href='javascript:void(0);' class='bgcGreen'>" + stu.realname + "<span>" + stu.realname + "</span></a></li>";
        }
        document.getElementById("stuList_qw").innerHTML = h;
        $(function () {
            $("#stuList_qw > li").click(function () {
                $(this).toggleClass("show");
            })
        })
    });

    function commends() {
        var stunames = "";//alert($("#comments").html());
        $("#stuList_qw > li").each(function () {
            var name = $(this).find("span").text();
            var selected = $(this).hasClass("show");
            if (selected) {
                if ("" == stunames) {
                    stunames += name;
                } else {
                    stunames += "," + name;
                }
                //$(this).removeClass("show");
            }
        })
        classes.commends(stunames, function () {
            $("#stuList_qw > li").each(function () {
                $(this).removeClass("show");
            })
        });
    }

    function onclose() {
        location.href = "close://";
    }
</script>
</body>
</html>
