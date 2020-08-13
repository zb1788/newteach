<%@ page contentType="text/html; charset=GBK" %>
<%@page import="vcom.teacher.pojo.TeacherInfo" %>
<%@page import="vcom.teacher.pojo.ServerInfo" %>
<%@page import="vcom.lessons.util.KnowledgeStructureList" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    TeacherInfo teacherinfo = (TeacherInfo) request.getAttribute("teacher");
    ServerInfo server = (ServerInfo) request.getAttribute("server");
    //TeacherInfo teacherinfo=(TeacherInfo)request.getSession().getAttribute("cteacher");
    //ServerInfo server=(ServerInfo)request.getSession().getAttribute("server") ;
    if (teacherinfo == null) teacherinfo = new TeacherInfo();
    if (server == null) server = new ServerInfo();
    String ip = request.getHeader("x-forwarded-for");
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
        ip = request.getHeader("Proxy-Client-IP");
    }
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
        ip = request.getHeader("WL-Proxy-Client-IP");
    }
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
        ip = request.getRemoteAddr();
    }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <meta http-equiv="x-ua-compatible" content="ie=7"/>
    <title>�ޱ����ĵ�</title>
    <link href="<%=path%>/teacher/style/style.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path%>/teacher/style/new_common.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path%>/teacher/style/q_answer.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=path%>/teacher/js/teachFolder_data.js"></script>
    <script type="text/javascript" src="<%=path%>/teacher/js/teachFolder_ui.js"></script>
    <!-- ��ʦ���� -->
    <script type="text/javascript" src="<%=path%>/teacher/js/teacherShare_data.js"></script>
    <script type="text/javascript" src="<%=path%>/teacher/js/teacherShare_ui.js"></script>

    <script src="<%=path%>/TextEditorNew/ViewPPTs/playVideo.jsp" type="text/javascript" charset="GBK"></script>
    <script type="text/javascript" src="<%=path%>/teacher/js/dtree.js"></script>

    <link rel="StyleSheet" href="<%=path%>/teacher/style/dtree.css" type="text/css"/>

    <script language="javascript"
            src="<%=path%>/js/common.js"></script>
    <script language="javascript"
            src="<%=path%>/teacher/js/ajax_common.js"></script>
    <script language="javascript" src="<%=path%>/js/jquery-1.4.2.min.js"></script>
    <script language="javascript" src="<%=path%>/teacher/js/download.js"></script>
    <script language="javascript" src="<%=path%>/teacher/js/dragorder.js"></script>
    <script language="javascript" src="<%=path%>/js/common/base.js"></script>
    <script language="javascript" src="<%=path%>/teacher/js/LeftMenu.js"></script>
    <%--<script src="<%=new KnowledgeStructureList().getSysParamByName("pls.interfaceweb.ip")%>PORTAL.001" type="text/javascript"></script>--%>
    <script src="<%=KnowledgeStructureList.getInterfacePath("PORTAL.001")%>" type="text/javascript"></script>
    <script type="text/javascript" src="<%=path%>/teacher/ftpjs/FtpFile.js"></script>
    <script type="text/javascript" src="<%=path%>/teacher/ftpjs/FtpFileHandler.js"></script>
    <script type="text/javascript" src="<%=path%>/teacher/ftpjs/FtpFileProgress.js"></script>
    <script type="text/javascript" src="<%=path%>/teacher/ftpjs/Progress.js"></script>
    <script type="text/javascript" src="<%=path%>/teacher/ftpjs/FtpItemFile.js"></script>
    <script type="text/javascript" src="<%=path%>/teacher/ftpjs/jquery.json-2.3.js"></script>
    <script type="text/javascript">
        var global_basePath = "<%=basePath%>";
        var globalpath = "<%=path%>";
        var teachernumber = "<%=teacherinfo.getTeachnumber()%>";
        var classTeacher = "<s:property value="classTeacher"/>";
        var currentuser = "<s:property value="#session.checkedUser.username"/>";
        var areaId = "<s:property value="#session.checkedUser.ssyArea.areaCode"/>";
        var ip = "<%=ip%>";
        var teacherjyjg = "<%=teacherinfo.getTeachjyjg()%>";
        var teacherforder = "<%=teacherinfo.getFoldername()%>";
        var virtualDirectory = "<%=teacherinfo.getVirtualDirectory()%>";
        var teachersize = "0";
        var typecode = "<s:property value="typecode"/>";
        <%--var interurll="<%=new KnowledgeStructureList().getSysParamByName("pls.interfaceweb.ip")%>";--%>
        <%
        if(teacherinfo.getSpacesize()!=null){
        %>
        teachersize = "<%=String.valueOf(teacherinfo.getSpacesize().doubleValue())%>";
        <%
        }
        %>
        var usesize = "<s:property value="teacherusesize"/>";
        var allusesize = "<%=server.getC1()%>";
        var allsize = "<%=server.getServersize()%>"

        var ip = "192.168.104.250"
        var port = "21";
        var user = "RMS";
        var password = "RMS";
    </script>
</head>

<body onkeydown="if(event.keyCode==13) return false;">

<div class="mainContent">
    <div class="curPos"><img src="<%=path%>/teacher/images/icon_pos.gif" width="16" height="16"/>&nbsp;��ǰλ�ã�<a href="#">�༶�ռ�</a>
        > �༶��Դ
    </div>
    <div class="mainCon">
        <div class="bgTop"></div>
        <div class="bgMiddle"><!--end left_t-->
            <div class="right_t" id="right1" style="width:100%;">
                <div class="sou_easy posRe qk2" style="background:none;background-color:#fff;border:1px solid #e0e0e0;">
                    <div class="sou_Bg_text">
                        <div style="float: right;"><span id="nav.dir" style="display:none;"></span><span
                                style="color:red;display:none;" id="errmessage"><span><img
                                src="<%=path %>/teacher/images/err-1.jpg" width="20"/></span><span id="errtext">�������ռ���������ͣ�ϴ�!</span></span><span
                                id="teachersize" style="padding-right:5px;"></span></div>
                    </div>
                </div><!--end sou_easy-->
                <div class="r_mContent" style="margin-top:0px;">
                    <h1 style="text-align:right; ">
                        <form name="form1" action="" method="post">
                            <img src="<%=path%>/teacher/images/zoom.gif" width="31"
                                 height="27"/>&nbsp;<strong>�ļ���</strong>��
                            <input name="" class="sou_box w260" type="text" onFocus="cls();" onBlur="res();"
                                   value="�������ļ���"/>
                            <input name="" type="button" class="souBtn" value="��&nbsp;��" style="font-size:12px;"
                                   onclick="_leftTree.mySerach();"/>
                            &nbsp;&nbsp;
                        </form>
                    </h1>
                    <div class="xicon">
                        <div class="fenxiang" id="chromemenu">
                            <p class="xline"> 
                            <span>����<a href="javascript:;" class="blue" rel="dropmenu1"
                                        onclick="_rightMenu.sortFile('filename');">�ļ�����</a>|<a href="javascript:;"
                                                                                               class="blue"
                                                                                               rel="dropmenu1"
                                                                                               onclick="_rightMenu.sortFile('filetype');">�ļ����͡�</a>|<a
                                    href="javascript:;" class="blue" rel="dropmenu1"
                                    onclick="_rightMenu.sortFile('filesize');">�ļ���С��</a>|<a href="javascript:;"
                                                                                            class="blue" rel="dropmenu1"
                                                                                            onclick="_rightMenu.sortFile('updatetime');">�ϴ�ʱ���</a>
                            	<s:if test="typecode==null||typecode==''">
                                    <!--
                                    <a href="<%=path%>/teacher/showClassFile.do?data={'classId':'<s:property
                                        value="classId"/>','usertype':'5','typecode':'','classTeacher':'<s:property
                                        value="classTeacher"/>'}"><img src="<%=path%>/teacher/images/icon3/share_icons_r23_c1_s1.png" width="13" height="20" /></a>
                                    -->
                                    <a href="<%=path%>/teacher/showClassFile.do?data={'classId':'<s:property value="classId"/>','usertype':'5','typecode':'1','classTeacher':'<s:property value="classTeacher"/>'}"><img
                                            src="<%=path%>/teacher/images/icon3/share_icons_r23_c24_s1.png" width="13"
                                            height="20"/></a>
                                </s:if>
                            	<s:else>
                                    <!--
                                    <a href="<%=path%>/teacher/showClassFile.do?data={'classId':'<s:property
                                        value="classId"/>','usertype':'5','typecode':'','classTeacher':'<s:property
                                        value="classTeacher"/>'}"><img src="<%=path%>/teacher/images/icon3/share_icons_r23_c15_s1.png" width="13" height="20" /></a>
                                    -->
                                    <a href="<%=path%>/teacher/showClassFile.do?data={'classId':'<s:property value="classId"/>','usertype':'5','typecode':'1','classTeacher':'<s:property value="classTeacher"/>'}"><img
                                            src="<%=path%>/teacher/images/icon3/share_icons_r23_c9_s1.png" width="13"
                                            height="20"/></a>
                                </s:else>
                           </span>
                                <strong>������Դ</strong><font class="hui" id="allfilesize">��?����</font> | <a href="#"
                                                                                                         class="blue">��ʦ�Ƽ�</a><font
                                    class="hui" id="teacherrecommendsize">��0����</font> | <a href="#"
                                                                                           class="blue">�ռ��ϴ�</a><font
                                    class="hui" id="spaceuploadsize">��0����</font></p>

                            <p style="_margin-top:3px;">
                            <ul style="float: left;padding-left: 10px;">
                                <a href="#" onclick="_fileUtil.backDir();" id="backDir" style="display: none;"><img
                                        src="<%=path%>/teacher/images/back.png"/></a>
                                <a href="#" class="zi5" id="netshare.title" style="display:none">�����ʦ�б�</a>
                                <a href="#" class="zi5" id="friend.title" style="display:none">�ҵĺ����б�</a>
                            </ul>
                            <ul style="float: right;" id="btns">
                                <a href="#" id="btns.1" class="zi4" onclick="toupload();" id="togetuplaod">�ļ��ϴ�</a>
                                <a href="#" id="btns.2" class="zi4"
                                   onclick="_fileUtil.openFolderCreateWindow();">���ļ���</a>
                                <a href="#" id="btns.3" class="zi4"
                                   onclick="_fileWindow.openFlag=0;_fileUtil.openFileRenameWindow(); ">�޸��ļ�</a>

                                <a href="#" id="btns.5" class="zi2"
                                   onclick="_fileWindow.openFlag=0;_fileUtil.openFolderMoveWindow();  ">�ƶ�</a>
                                <span style="display:none;">
			                    <a href="#" id="btns.4" class="zi2"
                                   onclick="_fileWindow.openFlag=0;_fileUtil.deleteFile(); ">ɾ��</a>
			                    <a href="#" id="btns.6" class="zi2"
                                   onclick="_fileWindow.openFlag=0;_openFolderShareWindow();">����</a>
			                    </span>
                                <a href="#" id="btns.7" class="zi2"
                                   onclick="teacherfileplay(_fileUtil.getSelectedFcodes(),2,1);">���</a>
                                <a href="#" id="btns.8" class="zi2"
                                   onclick="teacherfiledownload(_fileUtil.getSelectedFcodes(),3);">����</a>
                            </ul>
                            <!-- ���繲��ť -->
                            <ul class="navTop" id="netshare.btns" style="display:none">
                                <a href="#" class="zi4" onclick="_teacherUtil.addFriend();">��Ϊ����</a>
                            </ul>
                            <!-- �ҵĺ��� -->
                            <ul class="navTop" id="friend.btns" style="display:none">
                                <a href="#" class="zi4" onclick="_teacherUtil.deleteFriend();">ɾ������</a>
                            </ul>
                            </p>
                            <p>ѡ��<a href="javascript:_fileUtil.selectAll(1);" class="blue">ȫѡ</a> | <a
                                    href="javascript:_fileUtil.selectAll();" class="blue">ȡ��ѡ��</a></p>
                        </div>
                        <!--1st drop down menu -->
                        <div id="dropmenu1" class="dropmenudiv" style="width:100px;"><a href="introduce.html"
                                                                                        title="���ϴ�ʱ��">���ϴ�ʱ��</a><a
                                href="introduce.html" title="����Чʱ��">����Чʱ��</a><a href="introduce.html" title="���ļ���С">���ļ���С</a><a
                                href="xiaoyuan.html" title="���ļ���">���ļ���</a><a href="xiaoyuan.html"
                                                                             title="���ϴ���">���ϴ���</a><a
                                href="xiaoyuan.html" title="�����ش���" style="border-bottom:1px solid #ddd;">�����ش���</a></div>
                        <!--1nd drop down menu -->
                        <!--ͼ��ʽ -->
                        <s:if test="typecode==null||typecode==''">
                            <strong style="display:none;" id="recommendmess">��ʦ�Ƽ�</strong>
                            <ul class="folderList" id="recommendListtable">

                            </ul>
                            <strong>�ռ��ϴ�</strong>
                            <ul class="folderList" id="folderList">

                            </ul>
                        </s:if>
                        <s:else>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr class="title">
                                    <td width="30" align="center"><input name="input4" type="checkbox" value=""
                                                                         onclick="_fileUtil.selectAll(1);"/></td>
                                    <td colspan="2" align="center" onclick="_rightMenu.sortFile('filename');"
                                        style="cursor: pointer;">�ļ�����
                                    </td>
                                    <td width="70" align="center" onclick="_rightMenu.sortFile('filesize');"
                                        style="cursor: pointer;">�ļ���С��
                                    </td>
                                    <td width="70" align="center">�ϴ���</td>
                                    <td width="100" align="center" onclick="_rightMenu.sortFile('updatetime');"
                                        style="cursor: pointer;">�ϴ�ʱ���
                                    </td>
                                    <td width="100" align="center">����</td>
                                </tr>
                            </table>
                            <strong style="display:none;" id="recommendmess">��ʦ�Ƽ�</strong>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" id="recommendListtable">

                            </table>
                            <strong>�ռ��ϴ�</strong>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" id="folderListtable">

                            </table>
                        </s:else>

                    </div>
                    <!--end r_mContent-->
                </div>
                <!--end right_t-->
                <div class="clearfix"></div>
            </div>
            <!--end bgMiddle-->
            <div class="bgBottom"></div>
        </div>
    </div>


    <div class="fold" onmousedown="_rightMenu.hideRightMenu();">
        <!--<div class="posNow">��ǰĿ¼��> �ҵ��ļ���<span id="nav.dir">sdf</span>  </div>  -->
        <jsp:include page="openview.jsp"></jsp:include>
        <jsp:include page="folder_oper.jsp"></jsp:include>
        <jsp:include page="folder_move.jsp"></jsp:include>
        <jsp:include page="folder_share.jsp"></jsp:include>
        <jsp:include page="share_password.jsp"></jsp:include>
        <jsp:include page="/teacher/recommend/recommendwindow.jsp"></jsp:include>
    </div>
    <jsp:include page="rightMenu.jsp"></jsp:include>
    <div style="position: absolute;top: 500px;left: 200px;display: none" id="testdrag">ddddd</div>
</body>

</html>
<script type="text/javascript">
    _common.setCurrServerPath('<%=path%>');
    _common.setTeacherId(teachernumber);
    _fileUtil.currLevel = -1;

    _fileUtil.createFileArrayByClick(0);
    //document.oncontextmenu= function(){window.event.returnValue=false;};
    document.onmousedown = function () {
        _rightMenu.hideRightMenu()
    };
    getchangeusesizestate(parseFloat(usesize));
    $("#teachersize").html("�ռ��С" + teachersize + "G;��ʹ��" + ((usesize / 1024).toFixed(2)) + "M");
    //document.getElementById("teachersize").innerHTML="�ռ��С"+teachersize+"G;��ʹ��"+((usesize/1024).toFixed(2))+"M";
    _fileUtil.getteacherRecommend(teachernumber);

    _fileUtil.getPanduanExt("${applicationScope.ipPathMap['TMS.401']}", "", teachernumber, 1);
</script>

