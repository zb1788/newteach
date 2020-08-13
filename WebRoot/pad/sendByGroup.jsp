<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%@page import="net.sf.json.JSONObject" %>
<%@page import="net.sf.json.JsonConfig" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    String loginInfo = request.getParameter("data");
    String jobIds = request.getParameter("jobIds");
    String rcode = request.getParameter("rcode");
    String timestamp = new java.text.SimpleDateFormat("MMddHH").format(new Date());
    if (loginInfo == null) {
        loginInfo = "null";
    }

    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
    response.setDateHeader("Last-Modified", new Date().getTime());
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html style="overflow-y: hidden;overflow-x: hidden;">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gbk"/>
    <meta http-equiv="x-ua-compatible" content="ie=7,ie=8,ie=9"/>
    <base href="<%=basePath%>">

    <jsp:include page="/script/jquery172min.jsp?stamp=<%=timestamp %>"></jsp:include>
    <link href="<%=path%>/pad/css/style.css" rel="stylesheet" type="text/css"/>
    <jsp:include page="/js/config_pls_include.jsp" ></jsp:include><!-- config_pls.js -->
    <script type="text/javascript" src="<%=path%>/js/ajax_common.js?stamp=<%=timestamp %>"></script>
    <jsp:include page="/hdkt/js/class.jsp?stamp=<%=timestamp %>"></jsp:include>
    <script type="text/javascript" src="<%=path%>/js/json2.js"></script>


</head>
<body style="background-color: #ffffff">

<div id="result" class="talks" style="visibility: visible;">
    <div class="title"><a id="exit" style="display: block" href="javascript:exit();" class="close-student"></a>
        <h2 id="theme">班级小组列表</h2>
        <span class="top-s" style="display:block" id="sendToPadtops"></span>
    </div>

    <div class="content">
        <div class="boxCon">

            <div class="group-bk">
                <div class="group-h3">
                    <%--<h3 id="groupName_1" class="bg-blue">第1组</h3>
                    <h3 id="groupName_2" >第2组</h3>
                    <h3 id="groupName_7" >第7组</h3>
                    <h3 id="groupName_8" style="border-right: none;">第8组</h3>--%>
                </div>
                <div id="groupList"
                     style="height: 455px;overflow-x: hidden;;overflow-y: auto; *position:relative;*left:0;*top:0;">
                    <%--<div class="group-list">
                        <ul class="dm-ul">
                            <li><a href="javascript:">林晓艳</a><i class="canSel"></i></li><li><a href="javascript:">林晓艳</a><i class="canSel"></i></li><li><a href="javascript:">林晓艳</a><i class="canSel"></i></li><li><a href="javascript:">林晓艳</a><i class="canSel"></i></li>
                            <li><a href="javascript:">林晓艳</a><i class="canSel"></i></li><li><a href="javascript:">林晓艳</a><i class="canSel"></i></li><li><a href="javascript:">林晓艳</a><i class="canSel"></i></li><li><a href="javascript:">林晓艳</a><i class="canSel"></i></li>
                            <li><a href="javascript:">林晓艳</a><i class="canSel"></i></li>
                        </ul>
                    </div>--%>

                </div>
                <div class="clearfix"></div>
            </div>
            <div class="suo-btn" style="bottom: 0px;">
                <font style="margin-right: 25px;"> <input type="checkbox" onclick="selectAllGroup(this);">全选</font>
                <a href="javascript:" class="bBlue" onclick="send();" id="sendByGroupId">发送</a>
                <a href="javascript:" class="bBlue" onclick="exit();">关闭</a>
            </div>

        </div>

    </div>
</div>
<script>
    var loginInfo =<%=loginInfo%>;
    var rcode = "<%=rcode%>";
    var jobIds =<%=jobIds%>;

    $().ready(function () {
        initClassGroup();

    });

    function exit() {
        top.art.dialog({id: "sendByGroup"}).close();
    }

    function sendByStudent() {
        $("#theme").html("班级无小组，可直接选择学生进行答题");
        classes.init(loginInfo, function () {

            var rtnArray = classes.stuList;
            var stuListHtml = [];
            var groupListHtml = [];
            for (var i = 0; i < 8; i++) {
                groupListHtml.push('<h3 id="groupName_1" onclick="groupUlClick(' + i + ');">第' + i + '组</h3>');
                stuListHtml.push('<div class="group-list"><ul class="dm-ul">');

                for (var j = 0; j < rtnArray.length; j++) {
                    var stu = rtnArray[j];
                    //stu.realname = subStr(stu.realname,5);
                    if (j % 8 == i) {
                        stuListHtml.push('<li onclick="groupLiClick(this)"><a href="javascript:" id=' + stu.studentNumber + '>' + stu.realname + '</a><i class="canSel"></i></li>');
                    }
                }

                stuListHtml.push('</ul></div>');

            }
            if (rtnArray.length == 0) {
                stuListHtml = [];
                stuListHtml.push('<li><h2><center>暂无学生</center></h2><li>');
            }
            $("#groupList").html(stuListHtml.join(""));
            $("#groupList").css("height", "500");
            //$(".group-h3").html(groupListHtml.join(""));


        })

    }

    function initClassGroup() {
        var url = transferProtocol_web + _config["TMS"] + "/tms/interface/querySchoolClassGroup.jsp?";
        url += "queryType=bySchoolClassId&classGroupType=1&classId=" + loginInfo.classId + "&ut=" + loginInfo.ssout;
        ajaxJson(url, null, "gbk", function (data) {
            if (null == data || undefined == data || data.length == 0 || null == data[0].rtnArray || 0 == data[0].rtnArray.length) {
                //按不分组发送
                sendByStudent();
                return;
            }

            var stuListHtml = [];
            var groupListHtml = [];
            var stuTotals = 0;
            for (var i = 0; i < data[0].rtnArray.length; i++) {
                var item = data[0].rtnArray[i];
                var groupManager = "";
                var studentNumber = "";
                stuTotals = stuTotals + data[0].rtnArray[i].memberInfo.length;
                //item.classGroupName = subStr(item.classGroupName,6);
                groupListHtml.push('<h3 id="groupName_1" onclick="groupUlClick(' + i + ');">' + item.classGroupName + '</h3>');

                stuListHtml.push('<div class="group-list"><ul class="dm-ul">');
                for (var j = 0; j < item.memberInfo.length; j++) {
                    var stu = item.memberInfo[j];
                    //stu.realName = subStr(stu.realName,5);
                    if (item.memberInfo[j].groupManagerFlg && item.memberInfo[j].groupManagerFlg == 1) {
                        groupManager = "组长：" + item.memberInfo[j].realName;
                        studentNumber = item.memberInfo[j].studentNumber;
                    }
                    stuListHtml.push('<li onclick="groupLiClick(this)"><a href="javascript:" id=' + stu.studentNumber + '>' + stu.realName + '</a><i class="canSel"></i></li>');

                }
                stuListHtml.push('</ul></div>');

                //stuListHtml.push('<li><a id="classGroupStu_'+studentNumber+'" onclick="" class="w-gray" >'+item.classGroupName+' <br><span>'+groupManager+'</span></a></li>')
            }
            if (stuTotals == 0) {
                //按不分组发送
                sendByStudent();
                return;
            } else {
                $("#groupList").html(stuListHtml.join(""));
                $(".group-h3").html(groupListHtml.join(""));
            }

            /*$('.group-h3').children('h3').click(function(){
                $(this).toggleClass('bg-blue');

            });

            $('.dm-ul').children('li').click(function(){
                $(this).children('i').toggleClass('dm-i');
                $(this).children('a').toggleClass('dm-a');
            });
             */

        });

    }

    function subStr(str, i) {
        if (str == null) {
            return "";
        }
        if (str.length <= i) {
            return str;
        }
        return str.substring(0, i);
    }

    function selectAllGroup(obj) {
        /*//全选/非全选
        if($(obj).prop("checked"))
        {
            $("#groupList").find(".group-list").find(".dm-ul li i").attr("class","canSel dm-i");
            //$('.dm-ul').children('li').children('i').attr("class",'dm-i');

        }
        else{
            $("#groupList").find(".group-list").find(".dm-ul li i").attr("class","canSel");
        }*/


        var sel = $("#groupList").find(".group-list").find(".dm-ul");
        for (var i = 0; i < sel.length; i++) {
            selectGroup(i, $(obj).prop("checked"));
        }


    }

    function groupUlClick(i) {
        $(".group-h3").find("h3").eq(i).toggleClass("bg-blue");
        var groupUlClass = $(".group-h3").find("h3").eq(i).attr("class");
        if (groupUlClass == "bg-blue") {
            selectGroup(i, true);
        } else {
            selectGroup(i, false);
        }
    }

    function selectGroup(i, flag) {
        //flag true全选 false非全选
        var groupUlClass = "";
        if (flag) {
            groupUlClass = "bg-blue";
        }
        $(".group-h3").find("h3").eq(i).attr("class", groupUlClass);
        //var groupClass = $(".group-h3").find("h3").eq(i).attr("class");
        var stuSelClass = "canSel";
        if (flag) {
            stuSelClass = "canSel dm-i";
        }
        $("#groupList").find(".group-list").eq(i).find(".dm-ul li i").attr("class", stuSelClass);
        //$("#groupList").find(".group-list").eq(i).find(".dm-ul li a").toggleClass('dm-a');
    }

    function groupLiClick(obj) {
        //
        /*$('.dm-ul').children('li').click(function(){
            $(this).children('i').toggleClass('dm-i');
            $(this).children('a').toggleClass('dm-a');
        });*/
        $(obj).children('i').toggleClass('dm-i');

        var selliLength = $(obj).parent(".dm-ul").find("li .dm-i").length;
        var liLength = $(obj).parent(".dm-ul").find("li").length;
        $("#groupList").find(obj)
        var i = $(obj).parent().parent(".group-list").index(".group-list");
        var groupUlClass = "";
        if (selliLength != 0 && selliLength == liLength) {
            groupUlClass = "bg-blue";
        }
        $(".group-h3").find("h3").eq(i).attr("class", groupUlClass);

    }

    function send() {
        //统计选择的学生
        var stuList = [];

        var stuLi = $("#groupList").find(".group-list .dm-ul li").find("i.dm-i");

        stuLi.each(function () {
            var stuName = $(this).parent("li").children("a").html();
            var stuId = $(this).parent("li").children("a").attr("id");
            var stu = new Object();
            stu.studentId = stuId;
            stu.studentName = encodeURIComponent(stuName);
            stuList.push(stu);
        });
        if (stuList.length == 0) {
            alert("请选择学生");
            return;
        }
        //stuList = "[{'studentId':'41010110054480','studentName':'%E6%A5%9A%E6%A5%9A%E5%8A%A8%E4%BA%BA'},{'studentId':'41010110013661','studentName':'rrrr'},{'studentId':'41010110010093','studentName':'%E6%96%87%E6%96%87'}]";
        sendRecommend(stuList);
    }

    //预习发送
    function sendRecommend(stuList) {
        document.getElementById("sendByGroupId").disabled = true;
        //rcode = "20170222152830343654287984702";
        var number = "";
        number += '[{';
        number += "'classId':'" + loginInfo.classId + "',";
        number += "'className':'" + decodeURIComponent(loginInfo.userClassName) + "',";
        number += "'student':" + JSON.stringify(stuList);
        number += '}]'

        var subJobs = '';
        $.each(jobIds, function (k, v) {
            subJobs += v.code + ',';
        })
        subJobs = subJobs.trimStr(',');

        var url = transferProtocol_web + _config["PLS"] + "/interface/sendPreparation.do";
        //var data = "number="+number+"&id="+rcode+"&classIds="+loginInfo.classId+"&classNames="+encodeURIComponent(loginInfo.userClassName)+"&username="+loginInfo.teachernumber+"&truename="+encodeURIComponent(loginInfo.teachername)+'&subJobs='+subJobs;

        /**
         console.log(url);
         $.post(url,data,function(result){
        if (result != null) {
            if(result.flag==1){
                top.art.dialog.data("result", result.flag);
                alert("发送成功！");
            }else{
                alert(result.msg);
            }
        } else {
                alert("发送异常，未返回");
        }
        exit();
    }, 'json');
         */

        shouajaxpro(1);
        $.ajax({
            url: url,
            data: {
                username: loginInfo.teachernumber,
                truename: decodeURIComponent(loginInfo.teachername),
                classIds: loginInfo.classId,
                classNames: loginInfo.userClassName,
                number: number,
                id: rcode,
                subJobs: subJobs
            },
            type: "post",
            //async:true,
            dataType: "json",
            //jsonp:"jsoncallback",
            scriptCharset: 'GBK',
            success: function (result) {
                shouajaxpro(2);
                if (result != null) {
                    if (result.flag == 1) {
                        top.art.dialog.data("result", result.flag);
                        addTaskUb();
                        alert("发送成功！");
                    } else {
                        alert(result.msg);
                    }
                } else {
                    alert("发送异常，未返回");
                }
                document.getElementById("sendByGroupId").disabled = false;
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                shouajaxpro(2);
                if (console && console.log) {
                    console.log("errorUrl:" + url + "error: textStatus:" + textStatus);
                    for (name in errorThrown) {
                        console.log("Error-" + name + ":" + errorThrown[name]);
                    }
                }
                document.getElementById("sendByGroupId").disabled = false;
                //异步跨域调用无法获得异常
                //alert('请求超时！');
            }
        });
    }

    function addTaskUb() {
        var ucode = 'u_daoxuean';
        var descParm = '发送任务';
        var data = "sys=UB_IP&code=UB.01&a=" + loginInfo.teachernumber + "&ac=" + loginInfo.areaId + "&at=u&c=" + ucode + "&n=1&ut=2&i=" + encodeURIComponent(encodeURIComponent(descParm));
        var url = transferProtocol_web + _config["PLS"] + "/newteach/inc/trains.jsp?" + data;

        $.ajax({
            url: url,
            type: 'get',
            scriptCharset: 'gbk',
            success: function (re) {

            },
            error: function (e) {

            }
        })
    }

    String.prototype.trimStr = function (str) {
        return this.replace(eval("/(^" + str + "*)|(" + str + "*$)/g"), "");
    };
</script>
</body>
</html>
