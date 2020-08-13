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
    <title>无标题文档</title>
    <link href="<%=path%>/teacher/style/style.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path%>/teacher/style/new_common.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path%>/teacher/style/q_answer.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=path%>/teacher/js/teachFolder_data.js"></script>
    <script type="text/javascript" src="<%=path%>/teacher/js/teachFolder_ui.js"></script>
    <!-- 教师共享 -->
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
    <div class="curPos"><img src="<%=path%>/teacher/images/icon_pos.gif" width="16" height="16"/>&nbsp;当前位置：<a href="#">班级空间</a>
        > 班级资源
    </div>
    <div class="mainCon">
        <div class="bgTop"></div>
        <div class="bgMiddle"><!--end left_t-->
            <div class="right_t" id="right1" style="width:100%;">
                <div class="sou_easy posRe qk2" style="background:none;background-color:#fff;border:1px solid #e0e0e0;">
                    <div class="sou_Bg_text">
                        <div style="float: right;"><span id="nav.dir" style="display:none;"></span><span
                                style="color:red;display:none;" id="errmessage"><span><img
                                src="<%=path %>/teacher/images/err-1.jpg" width="20"/></span><span id="errtext">服务器空间已满，暂停上传!</span></span><span
                                id="teachersize" style="padding-right:5px;"></span></div>
                    </div>
                </div><!--end sou_easy-->
                <div class="r_mContent" style="margin-top:0px;">
                    <h1 style="text-align:right; ">
                        <form name="form1" action="" method="post">
                            <img src="<%=path%>/teacher/images/zoom.gif" width="31"
                                 height="27"/>&nbsp;<strong>文件名</strong>：
                            <input name="" class="sou_box w260" type="text" onFocus="cls();" onBlur="res();"
                                   value="请输入文件名"/>
                            <input name="" type="button" class="souBtn" value="搜&nbsp;索" style="font-size:12px;"
                                   onclick="_leftTree.mySerach();"/>
                            &nbsp;&nbsp;
                        </form>
                    </h1>
                    <div class="xicon">
                        <div class="fenxiang" id="chromemenu">
                            <p class="xline"> 
                            <span>排序：<a href="javascript:;" class="blue" rel="dropmenu1"
                                        onclick="_rightMenu.sortFile('filename');">文件名↓</a>|<a href="javascript:;"
                                                                                               class="blue"
                                                                                               rel="dropmenu1"
                                                                                               onclick="_rightMenu.sortFile('filetype');">文件类型↓</a>|<a
                                    href="javascript:;" class="blue" rel="dropmenu1"
                                    onclick="_rightMenu.sortFile('filesize');">文件大小↓</a>|<a href="javascript:;"
                                                                                            class="blue" rel="dropmenu1"
                                                                                            onclick="_rightMenu.sortFile('updatetime');">上传时间↓</a>
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
                                <strong>所有资源</strong><font class="hui" id="allfilesize">（?个）</font> | <a href="#"
                                                                                                         class="blue">教师推荐</a><font
                                    class="hui" id="teacherrecommendsize">（0个）</font> | <a href="#"
                                                                                           class="blue">空间上传</a><font
                                    class="hui" id="spaceuploadsize">（0个）</font></p>

                            <p style="_margin-top:3px;">
                            <ul style="float: left;padding-left: 10px;">
                                <a href="#" onclick="_fileUtil.backDir();" id="backDir" style="display: none;"><img
                                        src="<%=path%>/teacher/images/back.png"/></a>
                                <a href="#" class="zi5" id="netshare.title" style="display:none">共享教师列表</a>
                                <a href="#" class="zi5" id="friend.title" style="display:none">我的好友列表</a>
                            </ul>
                            <ul style="float: right;" id="btns">
                                <a href="#" id="btns.1" class="zi4" onclick="toupload();" id="togetuplaod">文件上传</a>
                                <a href="#" id="btns.2" class="zi4"
                                   onclick="_fileUtil.openFolderCreateWindow();">建文件夹</a>
                                <a href="#" id="btns.3" class="zi4"
                                   onclick="_fileWindow.openFlag=0;_fileUtil.openFileRenameWindow(); ">修改文件</a>

                                <a href="#" id="btns.5" class="zi2"
                                   onclick="_fileWindow.openFlag=0;_fileUtil.openFolderMoveWindow();  ">移动</a>
                                <span style="display:none;">
			                    <a href="#" id="btns.4" class="zi2"
                                   onclick="_fileWindow.openFlag=0;_fileUtil.deleteFile(); ">删除</a>
			                    <a href="#" id="btns.6" class="zi2"
                                   onclick="_fileWindow.openFlag=0;_openFolderShareWindow();">共享</a>
			                    </span>
                                <a href="#" id="btns.7" class="zi2"
                                   onclick="teacherfileplay(_fileUtil.getSelectedFcodes(),2,1);">浏览</a>
                                <a href="#" id="btns.8" class="zi2"
                                   onclick="teacherfiledownload(_fileUtil.getSelectedFcodes(),3);">下载</a>
                            </ul>
                            <!-- 网络共享按钮 -->
                            <ul class="navTop" id="netshare.btns" style="display:none">
                                <a href="#" class="zi4" onclick="_teacherUtil.addFriend();">加为好友</a>
                            </ul>
                            <!-- 我的好友 -->
                            <ul class="navTop" id="friend.btns" style="display:none">
                                <a href="#" class="zi4" onclick="_teacherUtil.deleteFriend();">删除好友</a>
                            </ul>
                            </p>
                            <p>选择：<a href="javascript:_fileUtil.selectAll(1);" class="blue">全选</a> | <a
                                    href="javascript:_fileUtil.selectAll();" class="blue">取消选择</a></p>
                        </div>
                        <!--1st drop down menu -->
                        <div id="dropmenu1" class="dropmenudiv" style="width:100px;"><a href="introduce.html"
                                                                                        title="按上传时间">按上传时间</a><a
                                href="introduce.html" title="按有效时间">按有效时间</a><a href="introduce.html" title="按文件大小">按文件大小</a><a
                                href="xiaoyuan.html" title="按文件名">按文件名</a><a href="xiaoyuan.html"
                                                                             title="按上传者">按上传者</a><a
                                href="xiaoyuan.html" title="按下载次数" style="border-bottom:1px solid #ddd;">按下载次数</a></div>
                        <!--1nd drop down menu -->
                        <!--图标式 -->
                        <s:if test="typecode==null||typecode==''">
                            <strong style="display:none;" id="recommendmess">教师推荐</strong>
                            <ul class="folderList" id="recommendListtable">

                            </ul>
                            <strong>空间上传</strong>
                            <ul class="folderList" id="folderList">

                            </ul>
                        </s:if>
                        <s:else>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr class="title">
                                    <td width="30" align="center"><input name="input4" type="checkbox" value=""
                                                                         onclick="_fileUtil.selectAll(1);"/></td>
                                    <td colspan="2" align="center" onclick="_rightMenu.sortFile('filename');"
                                        style="cursor: pointer;">文件名↓
                                    </td>
                                    <td width="70" align="center" onclick="_rightMenu.sortFile('filesize');"
                                        style="cursor: pointer;">文件大小↓
                                    </td>
                                    <td width="70" align="center">上传者</td>
                                    <td width="100" align="center" onclick="_rightMenu.sortFile('updatetime');"
                                        style="cursor: pointer;">上传时间↓
                                    </td>
                                    <td width="100" align="center">操作</td>
                                </tr>
                            </table>
                            <strong style="display:none;" id="recommendmess">教师推荐</strong>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" id="recommendListtable">

                            </table>
                            <strong>空间上传</strong>
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
        <!--<div class="posNow">当前目录：> 我的文件夹<span id="nav.dir">sdf</span>  </div>  -->
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
    $("#teachersize").html("空间大小" + teachersize + "G;已使用" + ((usesize / 1024).toFixed(2)) + "M");
    //document.getElementById("teachersize").innerHTML="空间大小"+teachersize+"G;已使用"+((usesize/1024).toFixed(2))+"M";
    _fileUtil.getteacherRecommend(teachernumber);

    _fileUtil.getPanduanExt("${applicationScope.ipPathMap['TMS.401']}", "", teachernumber, 1);
</script>

