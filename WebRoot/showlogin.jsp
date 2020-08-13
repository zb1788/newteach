<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<%@page import="vcom.lessons.util.KnowledgeStructureList" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <meta http-equiv="x-ua-compatible" content="ie=7"/>
    <title>�����������ͨ����</title>
    <script>
        if (screen.width == 1280) {
            document.write("<link href='style/longstyle.css' rel='stylesheet' type='text/css' />");
        } else {
            document.write("<link href='style/style.css' rel='stylesheet' type='text/css' />");
        }

    </script>
    <style>
        .toplogo {
            position: absolute;
            top: 30px;
            left: 30px;
            width: 582px;
            height: 52px;
            background-image: url(<s:property value="#session.PLS_CSS_NAME" />/logo.png);
            background-repeat: no-repeat;
        }

        .bottomlogo {
            background-image: url(<s:property value="#session.PLS_CSS_NAME" />/logobottom1.png);
            background-repeat: no-repeat;
            backbackground-position: center;
        }
    </style>
    <script language="javascript"
            src="<%=path%>/js/validate_common.js"></script>
    <script language="javascript"
            src="<%=path%>/js/ajax_common.js"></script>
    <script language="javascript" src="<%=path%>/js/common.js"></script>
    <script language="javascript"
            src="<%=path%>/js/ajax_common.js"></script>

    <script language="javascript" src="js/teach_constant.js"></script>

    <!-- ��ݼ� -->
    <script language="javascript"
            src="<%=path%>/ext/adapter/jquery/juery-v1-2-6.js"></script>
    <script language="javascript"
            src="<%=path%>/js/simple_hotkey.js"></script>


    <!-- ģ������  -->
    <script language="javascript" src="<%=path%>/js/template.js"></script>
    <!-- ��ѧ����  -->
    <script language="javascript"
            src="<%=path%>/js/teach_tools.js"></script>


    <script language="javascript" src="<%=path%>/js/mac_util.js"></script>

    <script language="javascript" src="<%=path%>/js/login.js"></script>
    <script language="javascript" src="<%=path%>/js/jquery-1.4.2.min.js"></script>
    <style>
        #error2 {
            position: absolute;
            top: 52px;
            left: 666px;
            border: 1px solid #ffd0a8;
            text-align: left;
            height: 20px;
            padding: 10px 5px 10px 45px;
            font-size: 16px;
        }

        .usbSpace4 {
            padding-left: 0px;
        }

        .usbSpace3 {
            padding-left: 30px;
        }

        .usbSpace2 {
            padding-left: 30px;
        }
    </style>

</head>

<body class="loginBg" scroll=no onDragStart="return false;">
<div style="display: none">
</div>
<s:if test="#session.PLS_TEMPLATE_TYPE==''">
    <s:if test="#session.PLS_CSS_NAME=='yongcheng'">
        <jsp:include page="template/yongchenglogin.jsp"></jsp:include>
    </s:if>
    <s:elseif test="#session.PLS_CSS_NAME=='zhengzhou'">
        <jsp:include page="template/zhengzhoulogin.jsp"></jsp:include>
    </s:elseif>
    <s:else>
        <jsp:include page="template/zhengzhoulogin.jsp"></jsp:include>
    </s:else>
</s:if>
<s:else>
    <s:if test="#session.PLS_TEMPLATE_TYPE==1">
        <jsp:include page="template/zhengzhoulogin.jsp"></jsp:include>
    </s:if>
    <s:elseif test="#session.PLS_TEMPLATE_TYPE==2">
        <jsp:include page="template/yongchenglogin.jsp"></jsp:include>
    </s:elseif>
    <s:else>
        <jsp:include page="template/zhengzhoulogin.jsp"></jsp:include>
    </s:else>
</s:else>

<span class="clearfix"></span>
<ul class="indexTools" style="margin-top: 35px;">
    <li id="tools.usb">
        <a href="#" onclick="_usbObj.openUSBWindow(540,280);">U����Դ</a>
    </li>
    <li>
        <a href="#" onclick="_sysConfg.openWindow();">ϵͳ����</a>
    </li>
    <li id="tools.softkeyborard" style="display: none">
        <a style="background-image: url('images/hao.jpg')" href="#"
           onclick="ocx.playFile('C:\\WINDOWS\\system32\\osk.exe');">�����</a>
    </li>
    <li id="tools.whiteBoard" style="display: none">
        <a href="javascript:location.href='myexe://TRACEBook'">���鹤��</a>
    </li>
    <li id="tools.teach" style="display: none">
        <a href="javascript:location.href='myexe://TRACEEdu'">��ѧ����</a>
    </li>
    <li id="newTool" style="display: none">
        <a href="javascript:location.href='myexe://TRACEBook'">�װ幤��</a>
    </li>
    <li id="clearImgCache" style="display: none">
        <a href="#" onclick="_footTools.clearImgCache();" ;>�����¼</a>
    </li>
</ul>

</div>
<div id="tools.softkeyborard_float"
     style="z-index: 10000; position: absolute; top: 624px; left: 563px; display: none;">
    <div>
        <ul id="navTool">

            <li id="softkeyborard">
                <a href="#"
                   onclick="ocx.playFile('C:\\WINDOWS\\system32\\osk.exe');">�����</a>
            </li>

        </ul>
    </div>
</div>


<!-- ��ȡmac��ַ�Ŀؼ� begin -->
<div style="display: none">
    <OBJECT CLASSID="clsid:3bde69c2-9ec0-4636-868c-9e400a44e765"
            ID=mac_ocx Name=mac_ocx>
    </OBJECT>
</div>
<jsp:include page="/teacher/frame/downloadfile.jsp"></jsp:include>
<!-- ��ȡmac��ַ�Ŀؼ� end -->
<div class="closePC close" onclick="_common.exitSystem();"></div>
<div id="maskAllall" style="display: none;">
    <div id="waithtml">
        <img src="<%=path%>/images/extanim32.gif"/>
        ���ڼ������ݣ����Ժ�....
    </div>
</div>
<div id="maskAll" style="display: none;">
</div>
<!-- ϵͳ���� begin -->
<jsp:include page="system_config.jsp"></jsp:include>
<!-- ��ȡmac��ַ�Ŀؼ� end -->
<jsp:include page="usb.jsp"></jsp:include>
<div id="del_icon"
     style="display: none; position: absolute; left: 0px; top: 0px; cursor: hand"
     onclick=" _loginObj.delHistoryUser();">

    <img id="del_icon_img" src="<%=path%>/images/del.gif"/>
</div>
<div class="toplogo"></div>
<div class="bottomlogo"></div>
</body>
</html>


<script type="text/javascript">
    <!--
    //alert('<%=request.getSession().getAttribute("PLS_CSS_NAME")%>');


    setMainTeachSeverPath('<%=new KnowledgeStructureList()
							.getSysParamByName("pls.mainteach.path")%>');
    //setMainTeachSeverPath('192.168.15.138:8080/pls');
    _common.setCurrServerPath('<%=path%>');
    _common.setCssName('<s:property value="#session.PLS_CSS_NAME" />');


    //�����ʾ���û����� _loginObj.maxAccounts
    if ('<s:property value="#session.PLS_TEMPLATE_TYPE" />' == "") {
        if (_common.getCssName() == 'yongcheng') _loginObj.maxAccounts = 9;
        else _loginObj.maxAccounts = 10;
    } else {
        if ('<s:property value="#session.PLS_CSS_NAME" />' == '2') _loginObj.maxAccounts = 9;
        else _loginObj.maxAccounts = 10;
    }


    _loginObj.getHistoryUser();
    var templateId = "<%=request.getParameter("templateId")%>";//ģ��id
    _tUtil.templateId = "<%=request.getParameter("templateId")%>";//ģ��id
    document.onselectstart = function () {
        return false;
    }

    document.onkeydown = tokeyDown;

    function tokeyDown(e) {
        var keyval = event.keyCode;
        if (keyval == 8) {
            if (document.activeElement) {
                if (document.activeElement.tagName != "INPUT") {
                    return false;//��������˼��� ��ʱ���ε�
                }
            }
        }
    }

    document.onmouseover = function () {
//alert(event.srcElement.id);
        var obj = event.srcElement;

        if (obj.name != 'history_user' && obj.id != 'del_icon' && obj.id != 'del_icon_img') {
            _loginObj.hideDelButton();
        }
        // return false;
    };


    //-->
</script>
<script type="text/javascript">
    var _footTools = new FootTools();

    //
    function FootTools() {
    }

    //_footTools.clearImgCache();
    FootTools.prototype.clearImgCache = function () {
        if (window.confirm("ȷ��Ҫ��������¼��")) {
            var stauts = '';
            try {
                // �½�
                stauts = IInformationOcx.FileNew(true);
            } catch (e) {
                // alert("IInformationOcx.FileNew()ִ��ʧ�ܣ�"+e.toString());
                alert("���������װ幤�ߣ�");
                // alert(status);
                window.status = status;
            }
        }
    }

    FootTools.prototype.initBtn = function () {
        var whiteBoardFlag = 2;
        // alert();
        var urledu = "";
        var urlbook = "";
        try {
            urlbook = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urlbook");
            //alert(urlbook);
            urledu = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urledu");
            //alert(whiteBoardPath.length);
        } catch (e) {
            window.status = '��õ��Ӱװ�����ʧ�ܣ�';
            alert('��õ��Ӱװ�����ʧ�ܣ�');
            //return whiteBoardFlag;
        }
        // alert();
        if (urlbook.length > 0 && urledu.length > 0) {
            if (urlbook == urledu) whiteBoardFlag = 1;
            else whiteBoardFlag = 3;

        } else {
            whiteBoardFlag = 2;//2-������ʾ 1-��ʾ��ѧ���� 3-��ʾ����
        }
        //alert(' whiteBoardFlag='+whiteBoardFlag);
        //
        //whiteBoardFlag=3;
        if (2 == whiteBoardFlag) {//ע���û�н���ʾ�����
            document.getElementById("tools.usb").className = 'usbSpace3';

            document.getElementById("tools.teach").style.display = 'none';
            document.getElementById("tools.whiteBoard").style.display = 'none';
            //
            document.getElementById("tools.softkeyborard").style.display = '';
            document.getElementById("tools.softkeyborard_float").style.display = '';

        } else if (1 == whiteBoardFlag) {
            //urlbook��edubook����������ͬ ������ʾ�װ幤�ߡ������¼��
            document.getElementById("tools.usb").className = 'usbSpace4';

            document.getElementById("newTool").style.display = "";
            document.getElementById("clearImgCache").style.display = "";

            //��������̰�ť
            document.getElementById("tools.softkeyborard").style.display = 'none';
            document.getElementById("tools.softkeyborard_float").style.display = 'none';

        } else if (3 == whiteBoardFlag) {//��ʾ2��
            //urlbook��edubook�������Ҳ���ͬ ������ʾ��ѧ���ߡ����鹤�ߣ�
            document.getElementById("tools.usb").className = 'usbSpace4';

            //
            document.getElementById("tools.teach").style.display = '';
            document.getElementById("tools.whiteBoard").style.display = '';

            //��������̰�ť
            document.getElementById("tools.softkeyborard").style.display = 'none';
            document.getElementById("tools.softkeyborard_float").style.display = 'none';

            //
        }
    }//end of initBtn

    _footTools.initBtn();

</script>