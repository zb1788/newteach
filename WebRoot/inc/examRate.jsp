<%@ page contentType="text/html; charset=GBK" %>
<%@page import="java.net.URLDecoder" %>
<%
    String timestamp = new java.text.SimpleDateFormat("MMddHH").format(new java.util.Date());
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", 0);
    String path = request.getContextPath();
    String pointid = request.getParameter("pointid");
    String username = request.getParameter("username");
    String loginStyle = request.getParameter("loginStyle");
    String title = request.getParameter("title");
    if (title != null && !title.equals("")) {
        title = URLDecoder.decode(title, "utf-8");
    } else {
        title = "考频分析";
    }
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>教学分析</title>
    <style type="text/css">
        <!--
        .STYLE1 {
            font-size: 14px;
            font-weight: bold;
        }

        -->
    </style>
    <script type="text/javascript" src="<%=path%>/script/jquery172min.js"></script>
    <script type="text/javascript" src="<%=path%>/script/highstock.js"></script>
    <script type="text/javascript" src="<%=path%>/js/common.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="<%=path%>/js/ajax_common.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="<%=path%>/js/config_pls.jsp?stamp=<%=timestamp %>"></script>
    <link href="<%=path %>/style/style.css" rel="stylesheet" type="text/css"/>
    <meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<body leftmargin="0" topmargin="0" rightmargin="0" bottommargin="0" style="overflow:hidden;">
<div id="htmlHide" style="position: absolute;top: -50px;"></div>
<div id="showDiv" style="width:600px;height:355px;">
    <!-- 柱图层 -->

</div>
<div class="btn" id="btn">
    <%if ("0".equals(loginStyle)) {%>
    <p class="playClose" id="_img" onmouseover="tochangebg(this,1);" onmouseout="tochangebg(this,2);"
       onclick="tocloseorbg(this,1);"></p>
    <%}%>
    <h3 id="_flash"><%=title%>
    </h3>
</div>
<script type="text/javascript">
    var loginStyle = "<%=loginStyle%>";
    if (loginStyle == 1) document.getElementById("btn").innerHTML = '<h3 id="_flash"><%=title%></h3>';
    //获取考频数据
    ajaxJson("http://" + _config["QBMS"] + "/tqms/youpu/pointfrequencylist.action", "username=<%=username%>&pointid=<%=pointid%>", "utf-8", function (data) {
        if (data != null && data != "" && data != undefined && data.recode == 0) {
            var xArr = [];
            var yArr = [];//考频
            $.each(data.pointfrequencylist, function (i, item) {
                xArr.push(item.year);
                yArr.push(Math.round(item.frequency));
            });
            var grade = '一般';
            if (data.frequencygrade == 4) {
                grade = '非常重要';
            } else if (data.frequencygrade == 3) {
                grade = '重要';
            } else if (data.frequencygrade == 2) {
                grade = '比较重要';
            }
            LoadFrequencyHighChart(xArr, yArr, data.frequency, grade);
        }
    });
    window.onerror = ResumeError;

    //中考考频图表展示
    function LoadFrequencyHighChart(xArr, yArr, frequency, frequencygrade) {
        $('#showDiv').highcharts({
            credits: {
                enabled: false
            },
            chart: {
                type: 'column'/* ,
            margin: [ 50, 50, 100, 80] */
            },
            title: {
                text: '',
                align: 'left',
                x: 15
            },
            subtitle: {
                text: '综合值：<span style="color:#FF0000;" id="lessionNum">' + Math.round(frequency) + ' (' + frequencygrade + ')</span>',
                align: 'left',
                x: 15
            },
            xAxis: {
                categories: xArr
            },
            yAxis: {
                min: 0,
                title: {
                    text: '考频'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                shared: true
            },
            series: [{
                name: '考频',
                data: yArr,
                color: '#2772EE'
            }]
        });
    }

    function tocloseorbg(obj, type) {
        if (type == 1) {
            if (loginStyle == 0) window.location.href = "close://";
            else window.close();
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
            obj.className = "playCloseH";
        } else {
            obj.className = "playClose";
        }
    }

    function ResumeError() {
        return true;
    }
</script>
</body>
</html>