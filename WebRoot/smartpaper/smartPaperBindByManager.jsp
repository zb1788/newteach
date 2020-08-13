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
    String updateDb = request.getParameter("updateDb");
    if (updateDb == null) {
        updateDb = "0";
    }
    String timestamp = new java.text.SimpleDateFormat("MMddHH").format(new Date());
    if (loginInfo == null) {
        loginInfo = "null";
    }
    String teachComputerMac = request.getParameter("teachComputerMac");
    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
    response.setDateHeader("Last-Modified", new Date().getTime());
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html style="overflow-y: hidden;overflow-x: hidden;">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <title>ƽ��ǩ��</title>
    <script type="text/javascript" src="../script/jquery172min.js?stamp=<%=timestamp %>"></script>
    <jsp:include page="/js/config_pls_include.jsp?stamp=<%=timestamp %>" ></jsp:include><!-- config_pls.js -->
    <script type="text/javascript" src="../script/artDialog/artDialog.js?skin=default"></script>
    <script type="text/javascript" src="../script/artDialog/artDialog.fix.js"></script>
    <script type="text/javascript" src="../script/artDialog/plugins/iframeTools.js"></script>
    <script type="text/javascript" src="../js/ajax_common.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="../js/common.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="../js/commondiv.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="../script/base64.js"></script>
    <script type="text/javascript" src="./js/jquery.cookie.js"></script>
    <jsp:include page="/hdkt/js/class.jsp?stamp=<%=timestamp %>"></jsp:include>
    <link href="../smartpaper/css/discuss.css?stamp=<%=timestamp %>" rel="stylesheet" type="text/css"/>
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
            background: url(../pad/images/zhuyi.png) no-repeat left center;
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

        .list_table {
            width: 100%;
            border-top: 1px solid #d3dbde;
            border-right: 1px solid #d3dbde;
            text-align: center;
        }

        tr {
            display: table-row;
            vertical-align: inherit;
            border-color: inherit;
        }

        .list_table th {
            height: 37px;
            background: url(./images/box_top.png) repeat-x;
            line-height: 37px;
            border-left: 1px solid #d3dbde;
        }

        .list_table td {
            border-bottom: 1px solid #d3dbde;
            border-left: 1px solid #d3dbde;
            padding: 2px;
            line-height: 26px;
        }

        .suo-btnnew {
            width: 100%;
            height: 50px;
            clear: both;
            text-align: center;
            /* bottom: 50px; */
            background: #fff;
            /* position: absolute; */
            font-size: 20px;
        }

        .suo-btnnew a {
            display: inline-block;
            margin: auto 15px;
            padding: 3px 25px;
            border: 1px solid #efefef;
            border-radius: 3px;
            background: #efefef;
            color: #fff;
        }

        .closebtna {
            position: absolute;
            top: 0;
            right: 0;
            display: inline-block;
            padding: 0px 10px;
            border: 1px solid #efefef;
            border-radius: 3px;
            background: #efefef;
            color: #fff;
        }
    </style>
</head>
<body>
<script type="text/javascript">
    var loginInfo =<%=loginInfo%>;
    var _config =<%=_config.toString() %>;
    var transferProtocol_web = _config.LOCAL_PROTOCOL;
    if (typeof (transferProtocol_web) == "undefined" || transferProtocol_web == null) {
        //Э��δ����Ĭ��http
        transferProtocol_web = "http://";
    } else {
        transferProtocol_web = transferProtocol_web + "://";
    }
    var basePath = '<%=basePath%>';
    var updateDb = "<%=updateDb%>";//�Ƿ�������ݿ�0������1����
</script>

<script language="JavaScript" for="VcomAQTool" event="OnGetOnlineMacs(strmacs,type)">
    OnGetOnlineMacs(strmacs, type);
</script>
<script language="JavaScript" for="VcomAQTool" event="OnGetKeys(id,keys)">
    OnGetKeys(id, keys);
</script>

<div id="result" class="result">
    <div class="title">
        <h2 id="theme">״̬�鿴</h2>
        <span class="top-s" style="display:none" id="signtops">�����ӣ�<b class="w-red"><span id="avas">0</span></b>/<span
                id="allStudentAmount">0</span></span>
        <span class="top-s" style="display:none" id="sendToPadtops"></span>
        <a class="closebtna" style="display: none; background-color:#ff6c6c !important;">�ر�</a>
    </div>
    <div class="content">
        <p class="discuss" id="tips" style="display:none;">�������ѿ�����ѧ����������ǰ�����ĸͨ����д����а󶨡�</p>
        <div class="boxCon" id="mainHeight" style="overflow-y: auto;">
            <table id="studentList" border="0" cellspacing="0" cellpadding="0" class="list_table">
                <tr>
                    <th>���</th>
                    <th>��ĸ</th>
                    <th>mac</th>
                    <th>���к�</th>
                </tr>
            </table>
            <div class="ts" style="position: absolute;bottom: 40px;width:100%;">
                <ul class="iconTips" id="statusList">
                    <span id="statusColor_10" class="bon"></span>�����ӣ�<font id="onlineCount">0</font>��
                    <span id="statusColor_0" class="bGray"></span>δ���ӣ�<font id="offlineCount">0</font>��
                    <span id="statusColor_7" class="bunbind"></span>δ�󶨣�<font id="unBindCount">0</font>��
                    <span id="statusColor_8"></span>���������豸����<font id="linkedStudentAmount">0</font>��
                </ul>
                <div class="clearfix"></div>
            </div>
            <div class="suo-btnnew" style="position: absolute;display: block;bottom:2px;">
                <a id="startBind" class="bBlue" style="cursor: pointer;" onclick="startBind()">��ʼ��</a>
                <a id="sort" class="bBlue" style="cursor: pointer;" onclick="sortBind()">һ������</a>
            </div>
            <div class="pbottom-top" style="display: none">
                <a id="kqClose" style="display: none" disabled="disabled" class="a-btn-none"
                   href="javascript:closeBtn();">�ر�</a>
                <a id="exit2" disabled="disabled" class="a-btn-none" href="javascript:saveKq();">��������</a>
            </div>
        </div>
        <div class="suo-btnnew" style="display: none;">
            <a id="startBind111" class="bBlue" style="cursor: pointer;" onclick="startBind()">��ʼ��</a>
        </div>
    </div>
</div>
<i id="exit" class="pbottom-i-none" disabled="disabled" style="display: none;z-index:99999" onclick="closePage();"></i>

<!--
<script type="text/javascript" src="../js/eruda.js"></script>

<script>
	setTimeout(function () {
		try{eruda.init();}catch(e){alert("eruda is not defined!");}
	},100)
</script>
-->
<script type="text/javascript">
    var paperListArr = [];//������д������
    var baseKeyArr = [];//������ĸ����
    //�����ѡ�ַ���
    var testArray = ["A", "B", "C", "D", "E", "F", "G"];
    var orderByKey = [];//��Ÿ���ĸ�Ķ�Ӧ��ϵ

    var macIndex = {};//mac��paperListArr�е�λ��
    var orderIndex = {};//�����paperListArr�е�λ��
    var teachComputerMac = "<%=teachComputerMac%>";//���ҵ���mac
    var isStart = false;//�Ƿ����ð�
    var OnlineMacArr = [];//���ӵ�AP���豸����
    //teachComputerMac = '6C-4B-90-78-9B-E7';
    var tmsUrl;
    $(function () {
        setTimeout('' +
            '$("#exit").attr("class","pbottom-i");$("#exit").removeAttr("disabled");$("#exit").show();', 2000);
        tmsUrl = transferProtocol_web + _config["TMS"];
        // tmsUrl = 'http://192.168.144.111';
        initPage();
    })


    //��ʼ��ҳ�棬��tms�ӿڷ�����ţ���ţ�mac��������ʾ����sn
    function initPage() {
        var url = tmsUrl + "/tms/clientInterface/querySmartPaperByTeachComputerMac.do?";
        url += "schoolId=" + loginInfo.schoolId + "&teachComputerMac=" + teachComputerMac + "&ut=" + loginInfo.ssout;
        ajaxJson(url, null, "gbk", showStudentList);
        // if( _macUtil.isReady()){//�������ȡmac��ַ���Ŀؼ����سɹ�
        //     teachComputerMac = _macUtil.getMACAdd();//mac��ַ
        // }
    }

    function showStudentList(data) {
        var rlist = data;
        var h = "";
        for (var i = 0; i < rlist.length; i++) {
            var obj = {};
            var stu = rlist[i];
            obj.smartPaperIdNumber = stu.smartPaperIdNumber;//���к�
            obj.smartPaperMac = stu.smartPaperMac;//mac
            obj.smartPaperNumber = stu.smartPaperNumber;//���
            obj.smartPaperOrder = stu.smartPaperOrder;//���
            paperListArr.push(obj);

            orderIndex['"' + stu.smartPaperNumber + '"'] = i;
            if (stu.smartPaperMac == '') {
                //δ���û�
                h += "<tr class='bunbind' id='" + stu.smartPaperNumber + "' xuhao='" + stu.smartPaperOrder + "'><td>" + stu.smartPaperNumber + "</td><td></td><td>" + stu.smartPaperMac + "</td><td>" + stu.smartPaperIdNumber + "</td></tr>";
            } else {
                //������
                macIndex['"' + stu.smartPaperMac + '"'] = i;

                h += "<tr class='bGray' id='" + stu.smartPaperNumber + "' xuhao='" + stu.smartPaperOrder + "'><td>" + stu.smartPaperNumber + "</td><td></td><td>" + stu.smartPaperMac + "</td><td>" + stu.smartPaperIdNumber + "</td></tr>";
            }

        }

        // for(var i=0;i<80;i++){
        // 	h += "<tr class='bunbind' ><td>111</td><td></td><td>222</td><td>444</td></tr>";
        // }

        console.log('studentListArr:');
        console.log(paperListArr);
        console.log('macIndex:');
        console.log(macIndex);
        console.log('orderIndex:');
        console.log(orderIndex);


        $("#studentList").append(h);

        $('#mainHeight').height($(window).height() - 180);

        updateStudentStatus();


        //��ʼ�������ʼ��ȡ�����ϵ�mac
        setTimeout("initVcomTool();", 500);
    }

    function initVcomTool() {
        console.log('��������״̬�鿴');
        try {
            VcomAQTool.SetOnlineMacs();
        } catch (e) {
        }
    }


    //����������/δ����/δ��״̬
    function updateStudentStatus() {
        var sel = $("#studentList tr.bon");
        $("#onlineCount").html(sel.length);

        var sel = $("#studentList tr.bGray")
        $("#offlineCount").html(sel.length);

        var sel = $("#studentList tr.bunbind");
        $("#unBindCount").html(sel.length);
    }

    //һ������
    function sortBind() {
        var url = tmsUrl + "/tms/clientInterface/querySmartPaperByTeachComputerMac.do?";
        url += "schoolId=" + loginInfo.schoolId + "&teachComputerMac=" + teachComputerMac + "&reOrder=1" + "&ut=" + loginInfo.ssout;
        ajaxJson(url, null, "gbk", function (rdata) {
            if (isStart) {
                try {
                    VcomAQTool.Stop();
                } catch (e) {
                    alert('VcomAQTool.Stop() failed')
                }
            }
            window.location.href = 'smartPaperBindByManager.jsp?data=' + JSON.stringify(loginInfo) + "&teachComputerMac=" + teachComputerMac + "&updateDb=1";
            //window.location.reload();
        });
    }


    //��ʼ��
    function startBind() {
        $('#startBind').hide();
        $('#statusColor_7').hide();
        for (var i = 1; i < 5; i++) {
            generateString("", i);
        }

        var i = 0;
        $('#studentList tr:not(:first)').each(function () {
            //ÿ��ѧ�������ĸ
            var item = baseKeyArr[i];
            $(this).find('td').eq(1).html(item);
            orderByKey[item] = $(this).attr('id');

            //��δ�󶨵ĸ�Ϊδ����
            if ($(this).find('a').attr('class') == 'no') {
                //$(this).find('a').attr('class','');
            }
            i++;
        })

        $('#tips').show();


        console.log('�رհ�����');
        //�رհ�����
        VcomAQTool.CloseWhiteCard();
        //��ʼ��
        setTimeout("start();", 500);
    }

    function start() {
        isStart = true;
        try {
            console.log('VcomAQTool.Start()');
            VcomAQTool.Start();
        } catch (e) {

        }
    }

    //�ر�ҳ��
    function closePage() {
        if (isStart) {
            try {
                VcomAQTool.Stop();
            } catch (e) {
                alert('VcomAQTool.Stop() failed')
            }
            window.location.href = "smartPaperStatus.jsp?data=" + JSON.stringify(loginInfo) + "&teachComputerMac=" + teachComputerMac + "&updateDb=1";
        } else {
            if (updateDb == 1) {
                window.location.href = "smartPaperStatus.jsp?data=" + JSON.stringify(loginInfo) + "&teachComputerMac=" + teachComputerMac + "&updateDb=1";
            } else {
                window.location.href = "smartPaperStatus.jsp?data=" + JSON.stringify(loginInfo) + "&teachComputerMac=" + teachComputerMac + "&updateDb=0";
            }
        }

        return false;
    }

    //�ص�������ȡ�û���������( idλmac��keysΪABCD)
    function OnGetKeys(mac, keys) {
        console.log('ԭʼmack|key:' + mac + '|' + keys);
        //���滻GΪF�����滻HΪG��˳���ܴ�
        keys = keys.replace("G", "F").replace("H", "G");
        console.log('�滻���key');
        console.log(mac + "|" + keys);
        //orderByKey�������ĸ�Ķ�Ӧ��ϵ
        var orderNumber = orderByKey[keys];

        if (typeof orderNumber != 'undefined') {
            var stu = paperListArr[orderIndex['"' + orderNumber + '"']];
            var url = tmsUrl + "/tms/clientInterface/bindSmartPaperNumber.do?";
            url += "schoolId=" + loginInfo.schoolId + "&smartPaperMac=" + mac + "&smartPaperNumber=" + stu.smartPaperNumber + "&smartPaperOrder=" + stu.smartPaperOrder + "&teachComputerMac=" + teachComputerMac + "&ut=" + loginInfo.ssout + "&rand=" + Math.random();
            ajaxJson(url, null, "gbk", function (rdata) {
                if (rdata.bindResult == 1) {
                    //�Ƚ��
                    if (typeof macIndex['"' + mac + '"'] != 'undefined') {
                        var stu = paperListArr[macIndex['"' + mac + '"']];
                        $('#' + stu.smartPaperNumber).attr('class', 'bunbind');
                        $('#' + stu.smartPaperNumber).find('td').eq(2).html('');
                        $('#' + stu.smartPaperNumber).find('td').eq(3).html('');
                        paperListArr[macIndex['"' + mac + '"']].smartPaperMac = '';
                        delete macIndex['"' + mac + '"'];
                    }

                    //�ٰ�
                    var stu = paperListArr[orderIndex['"' + orderNumber + '"']];
                    $('#' + stu.smartPaperNumber).attr('class', 'bon');
                    delete macIndex['"' + stu.smartPaperMac + '"'];
                    macIndex['"' + mac + '"'] = orderIndex['"' + orderNumber + '"'];
                    paperListArr[orderIndex['"' + orderNumber + '"']].smartPaperMac = mac;

                    updateStudentStatus();
                    $('#' + stu.smartPaperNumber).find('td').eq(2).html(rdata.smartPaperMac);
                    $('#' + stu.smartPaperNumber).find('td').eq(3).html(rdata.smartPaperIdNumber);
                } else {
                    alert(rdata.bindResultInfo);
                }
            });
        }

    }


    //�ص�������ȡ�����ϵ���д��mac,type1:���ӣ�2���Ͽ�
    function OnGetOnlineMacs(mac, type) {
        console.log(mac + "|" + type);
        if (type == 1) {
            if (findEleInArr(mac, OnlineMacArr) == -1) {
                OnlineMacArr.push(mac);
            }
            if (typeof macIndex['"' + mac + '"'] != 'undefined') {
                var stu = paperListArr[macIndex['"' + mac + '"']];
                $('#' + stu.smartPaperNumber).attr('class', 'bon');

            }
        } else {
            if (findEleInArr(mac, OnlineMacArr) == -1) {
                return false;
            }
            OnlineMacArr.splice(findEleInArr(mac, OnlineMacArr), 1);
            if (typeof macIndex['"' + mac + '"'] != 'undefined') {
                var stu = paperListArr[macIndex['"' + mac + '"']];
                $('#' + stu.smartPaperNumber).attr('class', 'bGray');
            }
        }

        var totalOnlineNum = OnlineMacArr.length;
        $('#linkedStudentAmount').html(totalOnlineNum);
        updateStudentStatus();


    }


    //�����ַ���
    //����preStr�����øú���֮ǰ�����ɵ��ַ���
    //����layer�����ɵ����ڼ����ַ�
    function generateString(preStr, layer) {
        //��ٿ�ѡ�ַ���
        for (var i = 0; i < testArray.length; i++) {
            if (layer > 1) {
                if (preStr.indexOf(testArray[i]) == -1) {
                    generateString(preStr + testArray[i], layer - 1);
                }
            } else {
                //�Ѿ��������һ���ַ���������
                if (preStr.indexOf(testArray[i]) == -1) {
                    var str = preStr + testArray[i];
                    if (findEleInArr(sortStr(str), baseKeyArr) == -1) {
                        baseKeyArr.push(str);
                        //document.write(str+'|');
                    }
                }
            }
        }
    }


    function checkLocalStorage() {
        if (!window.localStorage) {
            alert("�����ֻ���֧��Ԥ������");
            return false;
        }
    }

    function setLocalStorage(name, value) {
        checkLocalStorage();
        window.localStorage.setItem(name, value);
    }

    function getLocalStorage(name) {
        checkLocalStorage();
        var value = window.localStorage.getItem(name);
        return decodeURI(value);
    }


    function sortStr(str) {
        var arr = [];
        for (var i = 0; i < str.length; i++) {
            arr.push(str[i]);
        }

        arr.sort();
        return arr.join('');
    }


    function findEleInArr(ele, arr) {
        if (!Array.indexOf) {
            Array.prototype.indexOf = function (obj) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == obj) {
                        return i;
                    }
                }
                return -1;
            };
        }
        var index = arr.indexOf(ele);
        return index;
    }

    (function () {
        var method;
        var noop = function () {
        };
        var methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        var console = (window.console = window.console || {});

        while (length--) {
            method = methods[length];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = noop;
            }
        }
    }());
    if (!Object.keys) {
        Object.keys = (function () {
            var hasOwnProperty = Object.prototype.hasOwnProperty, //ԭ���ϵķ�����ֻȡ�����е����ԣ�
                hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'), //ie6һ�£���֮�������Ϊfalse;
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function (obj) {
                if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

                var result = [];

                for (var prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) result.push(prop);
                }

                if (hasDontEnumBug) {
                    for (var i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
                    }
                }
                return result;
            }
        })()
    }
    ;
</script>


<OBJECT id="VcomAQTool" align="CENTER" WIDTH=0 HEIGHT=0 classid="clsid:3c782736-05fa-43a4-af03-b7aa96876d99"></OBJECT>
<!-------����-------->
</body>
</html>
