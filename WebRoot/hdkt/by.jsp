<%@ page language="java" import="java.util.*,java.net.URLEncoder" pageEncoding="GBK" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    String loginInfo = request.getParameter("data");
    if (loginInfo == null) {
        loginInfo = "null";
    }
    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
    response.setDateHeader("Last-Modified", new Date().getTime());
    String code = URLEncoder.encode(loginInfo, "UTF-8");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html style="overflow-y:auto">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gbk"/>
    <meta http-equiv="x-ua-compatible" content="ie=8,ie=9"/>
    <script type="text/javascript" src="<%=basePath%>/hdkt/praise/js/jquery-1.10.1.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>/hdkt/praise/praise.jsp"></script>
    <script type="text/javascript" src="<%=path%>/js/MyZoom_4k.js"></script>

</head>
<body>
<script>
    var loginInfo =<%=loginInfo%>;
</script>
<%--,ie=8,ie=9
<iframe id="mysavesetformtargetId"  name="mysavesetformtarget" style="display: none"></iframe>
--%>
<%--<h1>
    layer是一款近年来备受青睐的web弹层组件，她具备全方位的解决方案，致力于服务各水平段的开发人员，您的页面会轻松地拥有丰富友好的操作体验。

    在与同类组件的比较中，layer总是能轻易获胜。她尽可能地在以更少的代码展现更强健的功能，且格外注重性能的提升、易用和实用性，正因如此，越来越多的开发者将媚眼投上了layer（已被5798625人次关注）。layer 甚至兼容了包括 IE6 在内的所有主流浏览器。她数量可观的接口，使得您可以自定义太多您需要的风格，每一种弹层模式各具特色，广受欢迎。当然，这种“王婆卖瓜”的陈述听起来总是有点难受，因此你需要进一步了解她是否真的如你所愿。

    layer 采用 MIT 开源许可证，将会永久性提供无偿服务。因着数年的坚持维护，截至到2017年9月13日，已运用在超过 30万 家 Web 平台，其中不乏众多知名大型网站。目前 layer 已经成为国内乃至全世界最多人使用的 Web 弹层解决方案，并且她仍在与 Layui 一并高速发展。Fly
</h1>--%>


<script type="text/javascript">
    $(document).ready(function () {
        var basePath = "<%=basePath%>";
        var teachernumber = loginInfo.teachernumber;
        var teachername = decodeURIComponent(loginInfo.teachername);
        var classId = loginInfo.classId;
        var subjectId = loginInfo.subjectId;
        var subjectName = decodeURIComponent(loginInfo.subjectName);
        var className = decodeURIComponent(loginInfo.userClassName);
        //var reUrl="http://"+_config["PLS"]+"/praiseResult.jsp";
        var reUrl = basePath + "/hdkt/praise/praiseResult.jsp";

        //var studentList = '[{ "realname": "dudu","studentNumber": "41019910307206","headPhoto":"/upload/user/teacher/20170925/1/4101011111110004.jpg"}]';
        /*    var studentList = [];
            var stu = new Object;
            stu.realname = "dudu";
            stu.studentNumber = "41019910307206";
            stu.headPhoto = "/upload/user/teacher/20170925/1/4101011111110004.jpg";
            studentList.push(stu);*/


        Praise.init({
            "teachernumber": teachernumber,
            "teachername": teachername,
            "classId": classId,
            "className": className,
            "subjectId": subjectId,
            "reUrl": reUrl,
            "subjectName": subjectName,
            ifzoom: true
        });

        //Praise.setStudentList(studentList);

        //Praise.setAutoGetStuListFlag(false);"studentList":studentList,

        //Praise.showStudentList({"maxmin":false,"showCloseBtn":false,"title":false,"max":true,"bytime":50000});
        Praise.showStudentList({"maxmin": false, "showCloseBtn": false, "title": false, "max": true, "bytime": 3000});

        //Praise.execute(2,studentList,"测试");

    })

    function selResultCallback(praiseType, selStuList, selStuNames) {
        //alert("selResultCallback"+praiseType);
        //return false;
    }

    function beforeSendCallback(praiseType, selStuList, selStuNames) {
        //alert("beforeSendCallback");
        //return false;
    }

    function afterSendCallback(praiseType, selStuList, result) {

        if (screen.width > 2600) {
            var pdiv = $("#praise_Component_v1-by").parent().parent();
            $("#praise_Component_v1-by").parent().css("height", "600px");
            $("#praise_Component_v1-by .pname-p").css("height", "80px");
            $("#praise_Component_v1-by .pname-one").css("height", "80px");
            $("#praise_Component_v1-by .pname-d").css("height", "80px");
            var left = ($(window).width() - 600 * myZoom.zoom) / 2;
            var top = ($(window).height() - 440 * myZoom.zoom) / 2;
            pdiv.css("zoom", myZoom.zoom);
            pdiv.css("top", top + "px");
            pdiv.css("left", left + "px");
        }
    }

    function praise_Component_v1_Close() {
        location.href = "close://";
    }

    /*
    alert(screen.width+"*"+screen.height);
    alert($(window).width()+"*"+$(window).height());
    alert("XDPI : "+(window.screen.deviceXDPI / 96));
    */
    myZoom.baseWidth = 780;
    myZoom.baseHeight = 630;

    /*
     * myZoom.baseWidth=960;myZoom.baseHeight=610;
     */

    function zoomBY() {
        /*$('.stuList li').css("width","75.7px");
        $('.stuList').css("width","757px");
        myZoom.setZoom('.stuList');*/
        $(".stuList").css("height", 330 * myZoom.zoom + "px");
        var fsize = Math.round(16 * myZoom.zoom);
        if (fsize > 36) {
            fsize = 36;
        }
        $(".stuList li a").css("font-size", fsize + "px");
        myZoom.setZoom('.praise-bottom');
        myZoom.setZoom('.all-name');
        $(".all-name").css("width", zoomWidth($(window).width() - 50) + "px");
        myZoom.setZoom('.pbottom-i');
        $('.pbottom-top').css("font-size", 12 * myZoom.zoom);
        $('#praise_Component_v1 .pbottom-top').css("height", 24 * myZoom.zoom + "px");
        $('.pbottom-i').css("height", 50 * myZoom.zoom + "px").css("width", 50 * myZoom.zoom + "px");
        //alert(330*myZoom.zoom);
    }

    if (screen.width > 2600) {
        myZoom.setZoom('.pbottom-i');
        setTimeout("zoomBY()", 500);//layui-layer-content
        setTimeout("zoomBY()", 1000);
        var fsize = 28;
        if (Math.round(13 * myZoom.zoom) > 28) {
            fsize = Math.round(13 * myZoom.zoom);
        }
        $("<style></style>").text("#praise_Component_v1 .pbottom-top span{font-size:" + (fsize * 2) + "px;line-height:" + (fsize * 2) + "px} #praise_Component_v1 .li-box span{font-size:" + fsize + "px} #praise_Component_v1 .stu-table td{font-size:" + Math.round(13 * myZoom.zoom) + "px}\r\n .stu-table td {font-size:" + Math.round(13 * myZoom.zoom) + "px}").appendTo($("head"));
    }
</script>
</body>
</html>
