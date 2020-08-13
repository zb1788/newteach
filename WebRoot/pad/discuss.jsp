<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%@page import="net.sf.json.JsonConfig" %>
<%@page import="vcom.util.InterfaceCfg" %>
<%@page import="net.sf.json.JSONObject" %>
<%

    JSONObject _config = JSONObject.fromObject(InterfaceCfg.ipMap, new JsonConfig());
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    String loginInfo = request.getParameter("data");
    String type = request.getParameter("type");
    String timestamp = new java.text.SimpleDateFormat("MMddHH").format(new Date());
    if (loginInfo == null) {
        loginInfo = "null";
    }

    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
    response.setDateHeader("Last-Modified", new Date().getTime());
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html style="overflow-y: hidden;overflow-x: hidden;">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <meta http-equiv="x-ua-compatible" content="ie=8,ie=9"/>
    <title>平板签到</title>
    <script type="text/javascript" src="../script/jquery172min.js?stamp=<%=timestamp %>"></script>
    <jsp:include page="/js/config_pls_include.jsp?stamp=<%=timestamp %>" ></jsp:include><!-- config_pls.js -->
    <script type="text/javascript" src="../script/artDialog/artDialog.js?skin=default"></script>
    <script type="text/javascript" src="../script/artDialog/artDialog.fix.js"></script>
    <script type="text/javascript" src="../script/artDialog/plugins/iframeTools.js"></script>
    <script type="text/javascript" src="../js/ajax_common.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="../js/common.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="../script/base64.js"></script>
    <jsp:include page="/hdkt/js/class.jsp?stamp=<%=timestamp %>"></jsp:include>
    <script type="text/javascript" src="./js/padDiscussNew.js?stamp=<%=timestamp %>"></script>
    <link href="./css/discuss.css?stamp=<%=timestamp %>" rel="stylesheet" type="text/css"/>
    <style>
        html, body {
            height: 100%;
            position: relative;
        }

        body {
            padding: 0;
            background: #fff;
        }

        .top-s {
            font-size: 18px;
            position: absolute;
            top: 0px;
            right: 50px;
        }

        .w-red {
            color: #DC0104;
            font-size: 22px;
        }

        .content {
            padding: 10px 0;
        }

        .content p {
            font: normal 18px/30px "微软雅黑";
            padding: 0 15px;
            height: 35px;
        }

        .dian {
            color: #DC0104;
            background: url(images/zhuyi.png) no-repeat left center;
            padding-left: 25px;
            margin-left: 20px;
        }

        .dian:hover {
            color: #f11518;
            text-decoration: underline;
        }

        .ts SPAN {
            vertical-align: middle;
        }
    </style>
</head>
<body>
<script type="text/javascript">
    var loginInfo =<%=loginInfo%>;
    var type = '<%=type%>';
    var _config =<%=_config.toString() %>;
    var transferProtocol_web = _config.LOCAL_PROTOCOL;
    if (typeof (transferProtocol_web) == "undefined" || transferProtocol_web == null) {
        //协议未配置默认http
        transferProtocol_web = "http://";
    } else {
        transferProtocol_web = transferProtocol_web + "://";
    }
    var padLimitVersion = '';
    var basePath = '<%=basePath%>';
</script>

<script language="JavaScript" for="VcomPadTool" event="OnGetStatus(nType, UserResults)">
    onSubmit(nType, UserResults);
</script>
<script language="JavaScript" for="VcomPadTool" event="OnGetLockInfo(stuids)">
    OnGetLockInfoA(stuids);
</script>
<script language="JavaScript" for="VcomAQTool" event="OnGetKeys(id,keys)">
    onGetKeys(id, keys);
</script>
<%--
获取学生上报的结果
--%>
<script language="JavaScript" for="VcomPadTool" event="OnGetResults(userame, lpath)">
    OnGetResults(userame, lpath);
</script>
<div id="result" class="result">
    <div class="title"><a disabled="disabled" style="display: none" href="javascript:pad.exit();"
                          class="close-student-none"></a>
        <h2 id="theme"></h2>
        <span class="top-s" style="display:none" id="signtops">已连接：<b class="w-red"><span
                id="linkedStudentAmount">0</span></b>/<span id="allStudentAmount">0</span></span>
        <span class="top-s" style="display:none" id="sendToPadtops"></span>
    </div>

    <div class="content">
        <p class="discuss" style="display:none">小组讨论已开启，学生新建小组或加入小组进行讨论。<b>讨论时间： <span id="timer"
                                                                                       class="w-red">00：00：00</span></b>
        </p>
        <p class="sign" id="contentDescId" style="display:none">平板互动课堂已开启，请学生按照以下方式连接到平板互动课堂。</p>
        <p class="sign" style="display:none">1.连接本教室wifi，2.使用学生账号登录学生平板，3.请学生平板升级至最新版本。<a style="display: none"
                                                                                          class="dian"
                                                                                          onclick="alert('请手动设置平板的IP地址!')">仍未连接成功？</a>
        </p>
        <p class="shareTitle" style="display:none">请点击学生姓名，查看学生的分享内容</p>
        <div class="qiemenu">
            <a class="cur" style="cursor:pointer;">学生自由创建讨论组</a>
            <a class="" style="cursor:pointer;">教师推荐小组</a>
        </div>
        <div class="qie_nr">
            <div class="boxCon">
                <ul class="stuList dm-ul" id="studentList">
                </ul>
                <ul class="zu-list clear-fix" id="classGroupList_ul" style="display: none; padding: 90px 0;">
                </ul>

                <div class="ts">
                    <ul class="iconTips" id="statusList">
                        <%--<span id="statusColor_10" class="bGreen"></span>已连接（<span id="statusNums_10">0</span>）
                        <span id="statusColor_0" class="bGray"></span>未连接到课堂（<span id="statusNums_0">0</span>）
                        <span id="statusColor_7" class="bGrass"></span>正在分享（<span id="statusNums_7">0</span>）--%>
                    </ul>
                    <div class="ts-right" style="display: none">
                        <a class="bg-blue" id="2Tab_0" href="javascript:">按学生查看</a>
                        <a id="2Tab_1" href="javascript:">按组查看</a>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="box-btn">
                    <%-- <a class="none" href="javascript:closeBtn();" id="closeBtn" disabled="disabled">关闭</a>--%>
                </div>

                <div class="pbottom-top" style="display: none">
                    <a id="kqStatusBtn">
                    </a>
                    <a id="kqClose" style="display: none" disabled="disabled" class="a-btn-none"
                       href="javascript:closeBtn();">关闭</a>
                    <a id="exit2" disabled="disabled" class="a-btn-none" href="javascript:saveKq();">点名结束</a>

                </div>
            </div>
            <div class="boxCon" style="display: none;">
                <div class="group-bk">
                    <div class="group-list">
                        <h3>第一组</h3>
                        <ul class="stuList dm-ul">
                        </ul>
                    </div>
                    <div class="group-list">
                        <h3>第二组</h3>
                        <ul class="stuList dm-ul">
                        </ul>
                    </div>
                    <div class="group-list">
                        <h3>第三组</h3>
                        <ul class="stuList dm-ul">
                        </ul>
                    </div>
                    <div class="group-list">
                        <h3>第四组</h3>
                        <ul class="stuList dm-ul">
                        </ul>
                    </div>
                    <div class="group-list">
                        <h3>第五组</h3>
                        <ul class="stuList dm-ul">
                        </ul>
                    </div>
                    <div class="group-list">
                        <h3>第六组</h3>
                        <ul class="stuList dm-ul">
                        </ul>
                    </div>
                    <div class="group-list">
                        <h3>第七组</h3>
                        <ul class="stuList dm-ul">
                        </ul>
                    </div>
                    <div class="group-list" style="border:none;">
                        <h3>第八组</h3>
                        <ul class="stuList dm-ul">
                        </ul>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
        <div class="suo-btn" style="display: block">
            <a id="startGroup1" class="bBlue" style="cursor: pointer;" onclick="startGroup(1)" style="height: 25px;">开始讨论</a>
            <a id="endGroup1" class="bBlue" style="cursor: pointer;display:none;" onclick="endGroup(1)"
               style="height: 25px;">结束讨论</a>
        </div>
        <div class="suo-btn01" style="display: none;">
	       <span class="fl">
	       	<a id="startGroup2" style="display:none;" disabled="disabled" class="bBlue-none" onclick="startGroup(2)">开始讨论</a> 
	       	<a id="startGroup3" style="display:none;" disabled="disabled" class="bBlue-none" onclick="startGroup(3)">调整分组</a>
	       	<a id="saveGroup" style="display:none;" class="bBlue" onclick="saveGroup()">保存分组</a>
	       	<a id="endGroupNew" style="display:none;" class="bBlue" onclick="endGroup()">结束讨论</a>
	       	班级共<font id="totalNumber">0</font>人，还有<font id="notJoinNumber">0</font>人未加入分组
	       	</span>
            <span class="fr">
	       <a><span class="icons off"></span>未连接（<font class="statusNum_0">33</font>）</a>
	       <a><span class="icons talk"></span>正在讨论（<font id="newdDiscussNum">0</font>）</a>
	       </span>
        </div>
    </div>

</div>
</div>
<i id="exit" class="pbottom-i-none" disabled="disabled" style="display: none;z-index:99999" onclick="closePage();"></i>

<script type="text/javascript">
    if (typeof Array.prototype.map != "function") {
        Array.prototype.map = function (fn, context) {
            var arr = [];
            if (typeof fn === "function") {
                for (var k = 0, length = this.length; k < length; k++) {
                    arr.push(fn.call(context, this[k], k, this));
                }
            }
            return arr;
        };
    }
    String.prototype.trimStr = function (str) {
        return this.replace(eval("/(^" + str + "*)|(" + str + "*$)/g"), "");
    };

    var debug = false;//开发者模式

    var groupManagerArr = [];//组长 数组
    var nowIndex = 0;//0旧版讨论，1新版讨论
    var classGroupArr = [];//分组信息
    var strgroups = '第一组,第二组,第三组,第四组,第五组,第六组,第七组,第八组';//默认分组名称
    var groupNameMap = {};
    groupNameMap['A'] = 1;
    groupNameMap['B'] = 2;
    groupNameMap['C'] = 3;
    groupNameMap['D'] = 4;
    groupNameMap['E'] = 5;
    groupNameMap['F'] = 6;
    groupNameMap['G'] = 7;
    groupNameMap['H'] = 8;
    var doGroup = false;
    var studentMap = {};
    var clientVersion = "0";
    var d = art.dialog.defaults;
    d.zIndex = 0;

    var arr = [];
    $(document).ready(function () {
        //getPadVersion();
        getGroupByTms();
        var h = "";
        for (var i = 0; i < pad.statusList.length; i++) {
            h += "<li style='display:none' id='status_" + pad.statusList[i].id + "'><span class='icons " + pad.statusList[i].icon + "'></span>" + pad.statusList[i].name + "（<font class='statusNum_" + pad.statusList[i].id + "'>0</font>）</li>";
        }
        $("#statusList").html(h);

        if (type == "discuss") {
            if (nowIndex == 0) {
                pad.discuss();
            }
        } else {
            alert("参数错误！");
        }
        classes.init(loginInfo, function () {
            var lockClass = "lock";
            if (pad.lockVisible == false) {
                lockClass = "";
            }
            var canSelClass = "canSel";
            var cursorClass = "cursor:pointer";
            if (pad.canSel == false) {
                canSelClass = "";
                cursorClass = "cursor:default";
            }
            var rlist = classes.stuList;
            var h = "";
            arr = rlist;
            for (var i = 0; i < rlist.length; i++) {
                var stu = rlist[i];
                studentMap[stu.studentNumber] = stu.realname;
                h += "<li studentNumber='" + stu.studentNumber + "' ><a style='" + cursorClass + "' id='student_" + stu.studentNumber + "'  onclick='' class='off'>" + stu.realname + "</a><b class=''></b><i class=" + canSelClass + "></i></li>";
            }
            $("#studentList").html(h);
            $("#allStudentAmount").html(rlist.length);
            $(".statusNum_0").html(rlist.length);
            $("#totalNumber").html(rlist.length);

            $('.dm-ul').children('li').click(function () {
                $(this).children('i.canSel').toggleClass('dm-i');
            });
        });
        setTimeout("initVcomPadTool();", 500);
        var windowHeight = screen.height;
        $('.group-bk').height(windowHeight - 235);
    });

    function initVcomPadTool() {

        if (type == "discuss") {
            VcomPadTool.InitConnectPad("");
        }

        setTimeout('' +
            '$("#exit").attr("class","pbottom-i");$("#exit").removeAttr("disabled");$("#exit").show();' +
            '$("#kqClose").attr("class","a-btn-close");$("#kqClose").removeAttr("disabled");', 2000);

    }

    function waitLockInfo(count) {
        var timerId = setInterval(function () {
            if (count <= 0) {
                pad.timeFlag = false;
                clearInterval(timerId);
            } else {
                count--;
                return false;
            }

        }, 1000);
    }

    function OnGetLockInfo(stuids) {
        if (pad.timeFlag) {
            //当设置锁屏/解锁后 3秒内不更新锁屏信息
            if (!waitLockInfo(3)) {
                return;
            }
        }
        //
        for (var j = 0; j < classes.stuList.length; j++) {
            var stu = classes.stuList[j];
            // 1锁屏 0 解屏
            //取消显示锁屏
            if ((";" + stuids + ";").indexOf(";" + stu.studentNumber + ",1") == -1) {
                $("#student_" + stu.studentNumber).parent("li").children('b').attr("class", '');
                $("#username_" + stu.studentNumber).children('b').attr("class", '');
            } else {
                //$("#student_" + stu.studentNumber).parent("li").children('b').attr("class",'lock');
                //$("#username_" + stu.studentNumber).children('b').attr("class",'lock');
            }
        }

    }

    function onSubmit(nType, UserResults) {
        //console.log(UserResults);
        //nType:10平板管理
        //alert(nType);
        //日志
        /*        var log = "功能:"+type+"; "+"nType:"+nType+"; "+"UserResults:"+UserResults+"; ";
                pad.addLog(log);*/

        if (nType == 13) {
            showOnlineVersionStatus(UserResults);
            OnGetLockInfo(UserResults);
            //计算各状态人数
            setStatus();
            return;
        }

        var icon = "";
        for (var i = 0; i < pad.statusList.length; i++) {
            if (pad.statusList[i].id == nType) {
                icon = pad.statusList[i].icon;
            }
        }
        //如果命令无效，直接返回
        if (icon == "") {
            return;
        }

        var results = UserResults.split(",");
        for (var i = 0; i < results.length; i++) {
            var tmp = results[i].split(":");
            var stuId = tmp[0];
            var stuId = results[i];
            //设置学生颜色
            setLimitIcon(stuId, icon);
        }
        //计算各状态人数
        setStatus();
    }

    //新接口
    //平板状态格式为studentno,锁屏状态,版本号,是否有管控;多个帐号中间用分号;分割。
    //锁屏状态有0和1两种，0代表解锁，1代表锁屏, 版本号传带V的版本号，管控状态有管控传1，无管控传0
    //var str = '41010110000674,0,V3.1.0,1;41010110000675,0,V3.1.0,1;';
    function showOnlineVersionStatus(UserResults) {
        for (var j = 0; j < classes.stuList.length; j++) {
            var stu = classes.stuList[j];
            //console.log(UserResults);
            //将未连接的学生置灰
            if ((";" + UserResults + ";").indexOf(";" + stu.studentNumber + ",") == -1) {
                //增加在线状态
                //学生投屏 //如果投屏的学生若干次未连接，需要通过插件通知投屏界面
                if (("," + pad.screenStuids + ",").indexOf("," + stu.studentNumber + ",") != -1) {
                    //VcomPadTool.InsertIntoAddress(stu.studentNumber,"","");
                }

                var student_css = $("#student_" + stu.studentNumber).attr("class");
                if (!timer.flag) {
                    //不在讨论状态
                    $("#student_" + stu.studentNumber).attr("class", student_css.replace("talk", ""));
                }
                $("#student_" + stu.studentNumber).attr("class", student_css.replace("on", "off"));

                //在线 的平板又下线
                if ($("#username_" + stu.studentNumber).length == 1) {
                    $("#username_" + stu.studentNumber).attr("class", "offline");
                    $("#username_" + stu.studentNumber).find("a").attr("class", "off");
                    var student_css2 = $("#username_" + stu.studentNumber).find("a").attr("class");
                    if (!timer.flag) {
                        //不在讨论状态
                        $("#username_" + stu.studentNumber).find("a").attr("class", student_css2.replace("talk", ""));
                    }
                    $("#username_" + stu.studentNumber).find("a").attr("class", student_css2.replace("on", "off"));
                }
            } else {
                var student_css = $("#student_" + stu.studentNumber).attr("class");
                if (!timer.flag) {
                    //不在讨论状态
                    $("#student_" + stu.studentNumber).attr("class", student_css.replace("talk", ""));
                }
                student_css = $("#student_" + stu.studentNumber).attr("class");
                $("#student_" + stu.studentNumber).attr("class", student_css.replace("off", "on"));

                //在线 的平板不一定在分组里面
                if ($("#username_" + stu.studentNumber).length == 1) {
                    $("#username_" + stu.studentNumber).attr("class", "online");
                    var student_css2 = $("#username_" + stu.studentNumber).find("a").attr("class");
                    if (!timer.flag) {
                        //不在讨论状态
                        $("#username_" + stu.studentNumber).find("a").attr("class", student_css2.replace("talk", ""));
                    }
                    student_css2 = $("#username_" + stu.studentNumber).find("a").attr("class");
                    $("#username_" + stu.studentNumber).find("a").attr("class", student_css2.replace("off", "on"));
                }
            }
        }
    }


    //设置学生颜色图标，过滤颜色该操作下是否允许出现
    function setLimitIcon(stuId, icon) {
        //设置不同功能允许的颜色变化限制
        var icons;
        if (type == "sign" || type == "beginClass" || type == "finishClass") { //仅允许未连接 已连接
            icons = pad.statusList[0].icon + "," + pad.statusList[1].icon;
        } else if (type == "sendToPad" || type == "yuxizuoda") {
            //仅允许未连接 已连接 正在下载 下载失败 正在作答 作答完成
            icons = pad.statusList[0].icon + "," + pad.statusList[1].icon + "," + pad.statusList[2].icon + "," + pad.statusList[3].icon + "," + pad.statusList[4].icon + "," + pad.statusList[5].icon;
        } else if (type == "discuss") {
            //仅允许未连接 已连接 正在讨论
            icons = pad.statusList[0].icon + "," + pad.statusList[1].icon + "," + pad.statusList[6].icon;
        } else if (type == "share") {
            //仅允许未连接 已连接 分享完成 正在分享
            icons = pad.statusList[0].icon + "," + pad.statusList[1].icon + "," + pad.statusList[7].icon + "," + pad.statusList[8].icon;
        }
        if (icons.indexOf(icon) == -1)
            return;

        $("#student_" + stuId).attr("class", "on " + icon);
        $("#username_" + stuId).find("a").attr("class", "on " + icon);//增加讨论状态
    }

    function setStatus() {
        //计算各状态人数
        for (var i = 0; i < pad.statusList.length; i++) {
            var sel = $("#studentList li").find("." + pad.statusList[i].icon);
            $(".statusNum_" + pad.statusList[i].id).html(sel.length);

            if (i == 1) {
                $("#linkedStudentAmount").html(sel.length);
            }

            if (type == "discuss") {
                var selDiscuss = $(".group-bk li").find(".talk");
                $("#newdDiscussNum").html(selDiscuss.length);
            }
        }

    }

    function setKqStatus(id) {
        //考勤 计算各状态人数
        var sum = 0;
        for (var i = 1; i < pad.kqStatusList.length; i++) {
            var sel = $("#studentList li").find("." + pad.kqStatusList[i].color);
            $("#kqStatusNum_" + pad.kqStatusList[i].id).html(sel.length);
            sum = sum + sel.length;
        }
        //未点名为班级总人数-各状态之和
        $("#kqStatusNum_" + pad.kqStatusList[0].id).html(classes.stuList.length - sum);
    }

    //userame,学生账号, lpath，分组信息
    function OnGetResults(username, groupNum) {
        //上报学生分组信息，页面展示
        $("#username_" + username).remove();

        var nowObj = $('div.group-bk div.group-list').eq(groupNameMap[groupNum] - 1);

        $(nowObj).find('ul').append('<li id="username_' + username + '" class="online" sid="' + username + '"><a class="on">' + studentMap[username] + '</a><b class=""></b><i class=""></i></li>');

        //计算还有多少人未加入
        var notJoinNum = $("#totalNumber").html() * 1 - $(".group-bk").find("li").length * 1;
        $("#notJoinNumber").html(notJoinNum);
    }


    function onGetKeys(id, key) {//提交事件

        var stu = classes.getStuById(id);

        var title = "";
        if (null != stu) {
            title = stu.realname;
        } else {
            title = id;
            //不是该班学生
            return;
        }
        //自动点名连接一次后不再显示断开状态
        if (type == "classkqCard") {
            //如果该学生为未点名才允许继续操作
            if ($("#student_" + stu.studentNumber).attr("class") != pad.kqStatusList[0].color) {
                return;
            }
            $("#student_" + stu.studentNumber).attr("class", pad.kqStatusList[1].color);

            //统计人数
            setKqStatus(1);
            //刷新当前类型下学生状态
            $("#kqStatusBtn").find(".pb-cur").click();
        }
        //VcomAQTool.Stop();
    }


    //获取pad最低版本
    function getPadVersion() {
        var url = transferProtocol_web + _config["VFS"] + '/individualizedManage/api/index.php?field=classbag&version=' + clientVersion;
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'jsonp',
            jsonp: "jsoncallback",
            scriptCharset: 'GBK',
            success: function (result) {
                if (result.code == 1) {
                    //成功
                    padLimitVersion = result.data.content;
                }
            },
            error: function (e) {
                //console.log(e);
            }
        })
    }


    //比较版本大小(version2当前版本,version1要对比的版本)
    function compareVersion(version1, version2) {
        varsion1 = _common.strTrim(version1);
        varsion2 = _common.strTrim(version2);

        var nvArr = version2.split(".");
        var cvArr = version1.split(".");


        if (nvArr.length > cvArr.length) {
            var len = nvArr.length - cvArr.length;
            for (var i = 0; i < len; i++) {
                cvArr.push(0);
            }
        } else if (nvArr.length < cvArr.length) {
            var len = cvArr.length - nvArr.length;
            for (var i = 0; i < len; i++) {
                nvArr.push(0);
            }
        }

        for (var vi = 0; vi < cvArr.length; vi++) {
            var nvai = Number(nvArr[vi]);
            var cvai = Number(cvArr[vi]);

            if (nvai == cvai) {
                if (vi == (cvArr.length - 1)) {
                    //全等
                    return 0;
                }
            } else if (nvai > cvai) {
                //verson2大于version1
                return 1;
            } else {
                return -1;
            }
        }
    }

    $('.qiemenu').children('a').click(function () {
        if (timer.flag) {
            //art.dialog.tips("请先停止讨论");
            alert("请先停止讨论");
            return false;
        }
        if (doGroup) {
            //art.dialog.tips("请先保存分组");
            alert("请先保存分组");
            return false;
        }
        $(this).addClass('cur');
        $(this).siblings('a').removeClass('cur');
        var ss = $(this).index();
        $('.qie_nr').children('div').eq(ss).show();
        $('.qie_nr').children('div').eq(ss).siblings('div').hide();
        if (ss == 1) {
            $(".suo-btn01").show();
            $(".suo-btn").hide();
            getGroupByTms();
            setTimeout('' +
                '$("#startGroup2").removeAttr("disabled").attr("class","bBlue");' +
                '$("#startGroup3").removeAttr("disabled").attr("class","bBlue");', 2000);
        } else {
            $(".suo-btn01").hide();
            $(".suo-btn").show();
        }
    })
</script>

<!-- 
<OBJECT ID="ocx" width="0" height="0"  CLASSID="CLSID:B02201C9-1789-4FF0-B95F-C1A03D8B6B99">
    	<PARAM NAME="_Version" VALUE="65536">
    	<PARAM NAME="_ExtentX" VALUE="10583">
    	<PARAM NAME="_ExtentY" VALUE="10583">
    	<PARAM NAME="_StockProps" VALUE="0">
</OBJECT>
-->
<OBJECT id="LessionOcx" align="CENTER" WIDTH=0 HEIGHT=0 classid="clsid:5DB31BE4-17CE-4767-9A15-7AFC513D1D2D"></OBJECT>
<br>
<OBJECT id="VcomPadTool" align="CENTER" WIDTH=0 HEIGHT=0 classid="clsid:57519B34-9C20-4096-AB5D-3D6B3D595253"></OBJECT>
<br>
<!-------抢答-------->
</body>
</html>
