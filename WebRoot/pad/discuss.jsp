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
    <title>ƽ��ǩ��</title>
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
            font: normal 18px/30px "΢���ź�";
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
        //Э��δ����Ĭ��http
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
��ȡѧ���ϱ��Ľ��
--%>
<script language="JavaScript" for="VcomPadTool" event="OnGetResults(userame, lpath)">
    OnGetResults(userame, lpath);
</script>
<div id="result" class="result">
    <div class="title"><a disabled="disabled" style="display: none" href="javascript:pad.exit();"
                          class="close-student-none"></a>
        <h2 id="theme"></h2>
        <span class="top-s" style="display:none" id="signtops">�����ӣ�<b class="w-red"><span
                id="linkedStudentAmount">0</span></b>/<span id="allStudentAmount">0</span></span>
        <span class="top-s" style="display:none" id="sendToPadtops"></span>
    </div>

    <div class="content">
        <p class="discuss" style="display:none">С�������ѿ�����ѧ���½�С������С��������ۡ�<b>����ʱ�䣺 <span id="timer"
                                                                                       class="w-red">00��00��00</span></b>
        </p>
        <p class="sign" id="contentDescId" style="display:none">ƽ�廥�������ѿ�������ѧ���������·�ʽ���ӵ�ƽ�廥�����á�</p>
        <p class="sign" style="display:none">1.���ӱ�����wifi��2.ʹ��ѧ���˺ŵ�¼ѧ��ƽ�壬3.��ѧ��ƽ�����������°汾��<a style="display: none"
                                                                                          class="dian"
                                                                                          onclick="alert('���ֶ�����ƽ���IP��ַ!')">��δ���ӳɹ���</a>
        </p>
        <p class="shareTitle" style="display:none">����ѧ���������鿴ѧ���ķ�������</p>
        <div class="qiemenu">
            <a class="cur" style="cursor:pointer;">ѧ�����ɴ���������</a>
            <a class="" style="cursor:pointer;">��ʦ�Ƽ�С��</a>
        </div>
        <div class="qie_nr">
            <div class="boxCon">
                <ul class="stuList dm-ul" id="studentList">
                </ul>
                <ul class="zu-list clear-fix" id="classGroupList_ul" style="display: none; padding: 90px 0;">
                </ul>

                <div class="ts">
                    <ul class="iconTips" id="statusList">
                        <%--<span id="statusColor_10" class="bGreen"></span>�����ӣ�<span id="statusNums_10">0</span>��
                        <span id="statusColor_0" class="bGray"></span>δ���ӵ����ã�<span id="statusNums_0">0</span>��
                        <span id="statusColor_7" class="bGrass"></span>���ڷ���<span id="statusNums_7">0</span>��--%>
                    </ul>
                    <div class="ts-right" style="display: none">
                        <a class="bg-blue" id="2Tab_0" href="javascript:">��ѧ���鿴</a>
                        <a id="2Tab_1" href="javascript:">����鿴</a>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="box-btn">
                    <%-- <a class="none" href="javascript:closeBtn();" id="closeBtn" disabled="disabled">�ر�</a>--%>
                </div>

                <div class="pbottom-top" style="display: none">
                    <a id="kqStatusBtn">
                    </a>
                    <a id="kqClose" style="display: none" disabled="disabled" class="a-btn-none"
                       href="javascript:closeBtn();">�ر�</a>
                    <a id="exit2" disabled="disabled" class="a-btn-none" href="javascript:saveKq();">��������</a>

                </div>
            </div>
            <div class="boxCon" style="display: none;">
                <div class="group-bk">
                    <div class="group-list">
                        <h3>��һ��</h3>
                        <ul class="stuList dm-ul">
                        </ul>
                    </div>
                    <div class="group-list">
                        <h3>�ڶ���</h3>
                        <ul class="stuList dm-ul">
                        </ul>
                    </div>
                    <div class="group-list">
                        <h3>������</h3>
                        <ul class="stuList dm-ul">
                        </ul>
                    </div>
                    <div class="group-list">
                        <h3>������</h3>
                        <ul class="stuList dm-ul">
                        </ul>
                    </div>
                    <div class="group-list">
                        <h3>������</h3>
                        <ul class="stuList dm-ul">
                        </ul>
                    </div>
                    <div class="group-list">
                        <h3>������</h3>
                        <ul class="stuList dm-ul">
                        </ul>
                    </div>
                    <div class="group-list">
                        <h3>������</h3>
                        <ul class="stuList dm-ul">
                        </ul>
                    </div>
                    <div class="group-list" style="border:none;">
                        <h3>�ڰ���</h3>
                        <ul class="stuList dm-ul">
                        </ul>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
        <div class="suo-btn" style="display: block">
            <a id="startGroup1" class="bBlue" style="cursor: pointer;" onclick="startGroup(1)" style="height: 25px;">��ʼ����</a>
            <a id="endGroup1" class="bBlue" style="cursor: pointer;display:none;" onclick="endGroup(1)"
               style="height: 25px;">��������</a>
        </div>
        <div class="suo-btn01" style="display: none;">
	       <span class="fl">
	       	<a id="startGroup2" style="display:none;" disabled="disabled" class="bBlue-none" onclick="startGroup(2)">��ʼ����</a> 
	       	<a id="startGroup3" style="display:none;" disabled="disabled" class="bBlue-none" onclick="startGroup(3)">��������</a>
	       	<a id="saveGroup" style="display:none;" class="bBlue" onclick="saveGroup()">�������</a>
	       	<a id="endGroupNew" style="display:none;" class="bBlue" onclick="endGroup()">��������</a>
	       	�༶��<font id="totalNumber">0</font>�ˣ�����<font id="notJoinNumber">0</font>��δ�������
	       	</span>
            <span class="fr">
	       <a><span class="icons off"></span>δ���ӣ�<font class="statusNum_0">33</font>��</a>
	       <a><span class="icons talk"></span>�������ۣ�<font id="newdDiscussNum">0</font>��</a>
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

    var debug = false;//������ģʽ

    var groupManagerArr = [];//�鳤 ����
    var nowIndex = 0;//0�ɰ����ۣ�1�°�����
    var classGroupArr = [];//������Ϣ
    var strgroups = '��һ��,�ڶ���,������,������,������,������,������,�ڰ���';//Ĭ�Ϸ�������
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
            h += "<li style='display:none' id='status_" + pad.statusList[i].id + "'><span class='icons " + pad.statusList[i].icon + "'></span>" + pad.statusList[i].name + "��<font class='statusNum_" + pad.statusList[i].id + "'>0</font>��</li>";
        }
        $("#statusList").html(h);

        if (type == "discuss") {
            if (nowIndex == 0) {
                pad.discuss();
            }
        } else {
            alert("��������");
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
            //����������/������ 3���ڲ�����������Ϣ
            if (!waitLockInfo(3)) {
                return;
            }
        }
        //
        for (var j = 0; j < classes.stuList.length; j++) {
            var stu = classes.stuList[j];
            // 1���� 0 ����
            //ȡ����ʾ����
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
        //nType:10ƽ�����
        //alert(nType);
        //��־
        /*        var log = "����:"+type+"; "+"nType:"+nType+"; "+"UserResults:"+UserResults+"; ";
                pad.addLog(log);*/

        if (nType == 13) {
            showOnlineVersionStatus(UserResults);
            OnGetLockInfo(UserResults);
            //�����״̬����
            setStatus();
            return;
        }

        var icon = "";
        for (var i = 0; i < pad.statusList.length; i++) {
            if (pad.statusList[i].id == nType) {
                icon = pad.statusList[i].icon;
            }
        }
        //���������Ч��ֱ�ӷ���
        if (icon == "") {
            return;
        }

        var results = UserResults.split(",");
        for (var i = 0; i < results.length; i++) {
            var tmp = results[i].split(":");
            var stuId = tmp[0];
            var stuId = results[i];
            //����ѧ����ɫ
            setLimitIcon(stuId, icon);
        }
        //�����״̬����
        setStatus();
    }

    //�½ӿ�
    //ƽ��״̬��ʽΪstudentno,����״̬,�汾��,�Ƿ��йܿ�;����ʺ��м��÷ֺ�;�ָ
    //����״̬��0��1���֣�0���������1��������, �汾�Ŵ���V�İ汾�ţ��ܿ�״̬�йܿش�1���޹ܿش�0
    //var str = '41010110000674,0,V3.1.0,1;41010110000675,0,V3.1.0,1;';
    function showOnlineVersionStatus(UserResults) {
        for (var j = 0; j < classes.stuList.length; j++) {
            var stu = classes.stuList[j];
            //console.log(UserResults);
            //��δ���ӵ�ѧ���û�
            if ((";" + UserResults + ";").indexOf(";" + stu.studentNumber + ",") == -1) {
                //��������״̬
                //ѧ��Ͷ�� //���Ͷ����ѧ�����ɴ�δ���ӣ���Ҫͨ�����֪ͨͶ������
                if (("," + pad.screenStuids + ",").indexOf("," + stu.studentNumber + ",") != -1) {
                    //VcomPadTool.InsertIntoAddress(stu.studentNumber,"","");
                }

                var student_css = $("#student_" + stu.studentNumber).attr("class");
                if (!timer.flag) {
                    //��������״̬
                    $("#student_" + stu.studentNumber).attr("class", student_css.replace("talk", ""));
                }
                $("#student_" + stu.studentNumber).attr("class", student_css.replace("on", "off"));

                //���� ��ƽ��������
                if ($("#username_" + stu.studentNumber).length == 1) {
                    $("#username_" + stu.studentNumber).attr("class", "offline");
                    $("#username_" + stu.studentNumber).find("a").attr("class", "off");
                    var student_css2 = $("#username_" + stu.studentNumber).find("a").attr("class");
                    if (!timer.flag) {
                        //��������״̬
                        $("#username_" + stu.studentNumber).find("a").attr("class", student_css2.replace("talk", ""));
                    }
                    $("#username_" + stu.studentNumber).find("a").attr("class", student_css2.replace("on", "off"));
                }
            } else {
                var student_css = $("#student_" + stu.studentNumber).attr("class");
                if (!timer.flag) {
                    //��������״̬
                    $("#student_" + stu.studentNumber).attr("class", student_css.replace("talk", ""));
                }
                student_css = $("#student_" + stu.studentNumber).attr("class");
                $("#student_" + stu.studentNumber).attr("class", student_css.replace("off", "on"));

                //���� ��ƽ�岻һ���ڷ�������
                if ($("#username_" + stu.studentNumber).length == 1) {
                    $("#username_" + stu.studentNumber).attr("class", "online");
                    var student_css2 = $("#username_" + stu.studentNumber).find("a").attr("class");
                    if (!timer.flag) {
                        //��������״̬
                        $("#username_" + stu.studentNumber).find("a").attr("class", student_css2.replace("talk", ""));
                    }
                    student_css2 = $("#username_" + stu.studentNumber).find("a").attr("class");
                    $("#username_" + stu.studentNumber).find("a").attr("class", student_css2.replace("off", "on"));
                }
            }
        }
    }


    //����ѧ����ɫͼ�꣬������ɫ�ò������Ƿ��������
    function setLimitIcon(stuId, icon) {
        //���ò�ͬ�����������ɫ�仯����
        var icons;
        if (type == "sign" || type == "beginClass" || type == "finishClass") { //������δ���� ������
            icons = pad.statusList[0].icon + "," + pad.statusList[1].icon;
        } else if (type == "sendToPad" || type == "yuxizuoda") {
            //������δ���� ������ �������� ����ʧ�� �������� �������
            icons = pad.statusList[0].icon + "," + pad.statusList[1].icon + "," + pad.statusList[2].icon + "," + pad.statusList[3].icon + "," + pad.statusList[4].icon + "," + pad.statusList[5].icon;
        } else if (type == "discuss") {
            //������δ���� ������ ��������
            icons = pad.statusList[0].icon + "," + pad.statusList[1].icon + "," + pad.statusList[6].icon;
        } else if (type == "share") {
            //������δ���� ������ ������� ���ڷ���
            icons = pad.statusList[0].icon + "," + pad.statusList[1].icon + "," + pad.statusList[7].icon + "," + pad.statusList[8].icon;
        }
        if (icons.indexOf(icon) == -1)
            return;

        $("#student_" + stuId).attr("class", "on " + icon);
        $("#username_" + stuId).find("a").attr("class", "on " + icon);//��������״̬
    }

    function setStatus() {
        //�����״̬����
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
        //���� �����״̬����
        var sum = 0;
        for (var i = 1; i < pad.kqStatusList.length; i++) {
            var sel = $("#studentList li").find("." + pad.kqStatusList[i].color);
            $("#kqStatusNum_" + pad.kqStatusList[i].id).html(sel.length);
            sum = sum + sel.length;
        }
        //δ����Ϊ�༶������-��״̬֮��
        $("#kqStatusNum_" + pad.kqStatusList[0].id).html(classes.stuList.length - sum);
    }

    //userame,ѧ���˺�, lpath��������Ϣ
    function OnGetResults(username, groupNum) {
        //�ϱ�ѧ��������Ϣ��ҳ��չʾ
        $("#username_" + username).remove();

        var nowObj = $('div.group-bk div.group-list').eq(groupNameMap[groupNum] - 1);

        $(nowObj).find('ul').append('<li id="username_' + username + '" class="online" sid="' + username + '"><a class="on">' + studentMap[username] + '</a><b class=""></b><i class=""></i></li>');

        //���㻹�ж�����δ����
        var notJoinNum = $("#totalNumber").html() * 1 - $(".group-bk").find("li").length * 1;
        $("#notJoinNumber").html(notJoinNum);
    }


    function onGetKeys(id, key) {//�ύ�¼�

        var stu = classes.getStuById(id);

        var title = "";
        if (null != stu) {
            title = stu.realname;
        } else {
            title = id;
            //���Ǹð�ѧ��
            return;
        }
        //�Զ���������һ�κ�����ʾ�Ͽ�״̬
        if (type == "classkqCard") {
            //�����ѧ��Ϊδ�����������������
            if ($("#student_" + stu.studentNumber).attr("class") != pad.kqStatusList[0].color) {
                return;
            }
            $("#student_" + stu.studentNumber).attr("class", pad.kqStatusList[1].color);

            //ͳ������
            setKqStatus(1);
            //ˢ�µ�ǰ������ѧ��״̬
            $("#kqStatusBtn").find(".pb-cur").click();
        }
        //VcomAQTool.Stop();
    }


    //��ȡpad��Ͱ汾
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
                    //�ɹ�
                    padLimitVersion = result.data.content;
                }
            },
            error: function (e) {
                //console.log(e);
            }
        })
    }


    //�Ƚϰ汾��С(version2��ǰ�汾,version1Ҫ�Աȵİ汾)
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
                    //ȫ��
                    return 0;
                }
            } else if (nvai > cvai) {
                //verson2����version1
                return 1;
            } else {
                return -1;
            }
        }
    }

    $('.qiemenu').children('a').click(function () {
        if (timer.flag) {
            //art.dialog.tips("����ֹͣ����");
            alert("����ֹͣ����");
            return false;
        }
        if (doGroup) {
            //art.dialog.tips("���ȱ������");
            alert("���ȱ������");
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
<!-------����-------->
</body>
</html>
