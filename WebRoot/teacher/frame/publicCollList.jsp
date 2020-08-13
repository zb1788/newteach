<%@ page contentType="text/html; charset=GBK" %>
<%@page import="vcom.teacher.pojo.TeacherInfo" %>
<%@page import="vcom.teacher.pojo.ServerInfo" %>
<%@page import="vcom.lessons.util.KnowledgeStructureList" %>
<%@page import="vcom.common.util.des_zm" %>
<%@page import="vcom.teacher.util.ParseXml" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    String versionpath = ParseXml.getXmlNode("ftpupload");
    TeacherInfo teacherinfo = (TeacherInfo) request.getAttribute("teacher");
    ServerInfo server = (ServerInfo) request.getAttribute("server");
    //TeacherInfo teacherinfo=(TeacherInfo)request.getSession().getAttribute("teacher");
    //ServerInfo server=(ServerInfo)request.getSession().getAttribute("server") ;
    KnowledgeStructureList klist = new KnowledgeStructureList();
    String type = klist.getSysParamByName("pls.showke.type");
    if (type != null && type != "" && "2".equals(type)) {
        server.setServerip(request.getServerName());
    }
    if (teacherinfo == null) teacherinfo = new TeacherInfo();
    if (server == null) server = new ServerInfo();
    des_zm m = new des_zm();
    String browser = request.getHeader("user-agent");

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

    <link rel="stylesheet" id="ext-all-css" type="text/css" href="<%= path%>/ext/resources/css/ext-all.css"/>

    <script type="text/javascript" src="<%=path%>/teacher/js/teachFolder_data.js"></script>
    <script type="text/javascript" src="<%=path%>/teacher/js/teachFolder_ui.js"></script>
    <!-- ��ʦ���� -->
    <script type="text/javascript" src="<%=path%>/teacher/js/teacherShare_data.js"></script>
    <script type="text/javascript" src="<%=path%>/teacher/js/teacherShare_ui.js"></script>

    <script src="<%=path%>/TextEditorNew/ViewPPTs/playVideo.jsp" type="text/javascript" charset="GBK"></script>
    <script type="text/javascript" src="<%=path%>/teacher/js/dtree.js"></script>

    <link rel="StyleSheet" href="<%=path%>/teacher/style/dtree.css" type="text/css"/>

    <script language="javascript" src="<%=path%>/js/common.js"></script>
    <script language="javascript" src="<%=path%>/teacher/js/ajax_common.js"></script>
    <script language="javascript" src="<%=path%>/js/jquery-1.4.2.min.js"></script>
    <script language="javascript" src="<%=path%>/teacher/js/download.js"></script>
    <script language="javascript" src="<%=path%>/teacher/js/dragorder.js"></script>
    <script language="javascript" src="<%=path%>/teacher/js/LeftMenu.js"></script>
    <script language="javascript" src="<%=path%>/js/common/base.js"></script>

    <%--<script src="<%=new KnowledgeStructureList().getSysParamByName("pls.interfaceweb.ip")%>PORTAL.001" type="text/javascript"></script>--%>
    <script src="<%=KnowledgeStructureList.getInterfacePath("PORTAL.001")%>" type="text/javascript"></script>
    <script type="text/javascript" src="<%=path%>/teacher/ftpjs/FtpFile.js"></script>
    <script type="text/javascript" src="<%=path%>/teacher/ftpjs/FtpFileHandler.js"></script>
    <script type="text/javascript" src="<%=path%>/teacher/ftpjs/FtpFileProgress.js"></script>
    <script type="text/javascript" src="<%=path%>/teacher/ftpjs/Progress.js"></script>
    <script type="text/javascript" src="<%=path%>/teacher/ftpjs/FtpItemFile.js"></script>
    <%--<script type="text/javascript" src="<%=path%>/teacher/ftpjs/jquery.json-2.3.js"></script>--%>

    <script type="text/javascript" src="<%=path%>/ext/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="<%=path%>/ext/ext-all.js"></script>
    <script type="text/javascript" src="<%=path%>/ext/tree.js"></script>
    <script type="text/javascript" src="<%=path%>/ext/tree-expend-checkbox.js"></script>
    <script type="text/javascript" src="<%=path%>/js/json2.js"></script>
    <script type="text/javascript" src="<%=path%>/teacher/js/schoolFolder.js"></script>

    <script type="text/javascript">
        $(function () {
            _fileUtil.getUserClass_fileUp("${applicationScope.ipPathMap['TMS.401']}", teachernumber);

            $('#saveTj').click(function (e) {
                if ($('input[name=tjCheckBox]:checked').length > 0 && $('input[name=fileUpTjClassName]:checked').length > 0) {
                    var selFileName = new Array();
                    $('input[name=tjCheckBox]:checked').each(function (i) {
                        selFileName[i] = $(this).attr('fileName');
                    });
                    _fileUtil.saveteacherRecommend_fileUp(teachernumber, teachername, teacherjyjg, selFileName);
                } else {
                    alert('��ѡ��Ҫ�Ƽ����ļ��Ͱ༶��');
                }

            })

        })
        var tjFlag = false;

        function showTj(prossId, obj) {
            if ($(document.getElementById(prossId + "_sta")).html() != '�ļ��ϴ��ɹ�!') {
                alert('�����ϴ����ļ�');
                $(obj).attr('checked', false);
                return false;
            }
            if ($('input[name=tjCheckBox]:checked').length > 0) {
                if (!tjFlag) {
                    $(".tj_area").slideDown(300);
                }
            } else {
                $(".tj_area").slideUp(300);
                tjFlag = false;
            }
        }

        if (!window.ActiveXObject) {
            (function () {
                var oEvaluator = new XPathEvaluator(), oResult;
                XMLDocument.prototype.selectNodes = Element.prototype.selectNodes = function (sXPath) {

                    oResult = oEvaluator.evaluate(sXPath, this, null, XPathResult.ANY_TYPE, null);
                    var aNodes = [];
                    if (oResult != null) {
                        var oElement = oResult.iterateNext();
                        while (oElement) {
                            aNodes[aNodes.length] = oElement;
                            oElement = oResult.iterateNext();
                        }
                    }
                    return aNodes;
                }
            })()
        }

        function getXMLText(xmlNode) {
            var text = '';
            if (window.ActiveXObject) {
                text = xmlNode[0].text;
            } else {
                text = xmlNode[0].textContent;
            }
            return text;
        }

    </script>

    <style>
        #maskAllall {
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0px;
            top: 0px;
            z-index: 0;
            background: #fff;
            opacity: 0.7;
            display: none;
            filter: alpha(opacity=70);
        }

        #waithtml {
            top: 290px;
            left: 500px;
            position: fixed;
            display: none;
            z-index: 1000;
            font-size: 14px;
            font-weight: bold;
        }

        .addButton {
            font-family: Helvetica, Arial, sans-serif;
            font-size: 14pt;
            background: url(<%=path%>/teacher/images/button.png);
            border-style: none;
            width: 85px;
            height: 24px;
            background-repeat: no-repeat;
        }

    </style>
    <script type="text/javascript">
        var usertype = '<s:property value="usertype"/>';
        var global_basePath = "<%=basePath%>";
        var globalpath = "<%=path%>";
        var teachernumber = "<%=teacherinfo.getTeachnumber()%>";
        var teachername = "<%=teacherinfo.getTeachname()%>";
        var teacherjyjg = "<%=teacherinfo.getTeachjyjg()%>";
        var teacherInSchoolName = "<s:property value='sysCp.cpName'/>"
        var teacherArea = "<%=teacherinfo.getC1()==null?"":teacherinfo.getC1()%>";
        var classTeacher = "";
        var currentuser = "";
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

        var ip = "<%=m.Encode(server.getServerip())%>"
        var port = parseInt("<%=server.getC6()%>");
        var user = "<%=m.Encode(server.getC2())%>";
        var password = "<%=m.Encode(server.getC3())%>";
        var schoolIp = "<s:property value="schoolIp"/>";

    </script>
</head>

<body onkeydown="if(event.keyCode==13) return false;">

<div class="mainContent">
    <div class="curPos"><img src="<%=path%>/teacher/images/icon_pos.gif" width="16" height="16"/>&nbsp;��ǰλ�ã�<a href="#"><span
            id="nav.dir"></span></a></div>
    <div class="mainCon">
        <div class="bgTop">
        </div>
        <div class="bgMiddle">
            <div class="left_t" id="left1">
                <h1><span class="jiajia"></span>�ҵ��ļ���</h1>
                <ul class="menu2">
                    <li class="sel_t"><a href="javascript:;"
                                         onclick="_leftTree.myFolder(this);"><% if ("1".equals(type)) { %>
                        ���ļ���<%} else { %> �ļ���<%} %></a></li>
                    <li><a href="javascript:;" onclick="_leftTree.netShare(this);">���繲��</a></li>
                    <!--
                    <li><a href="javascript:;" onclick="_leftTree.myFriend(this);">���ѹ���</a></li>
                    -->
                    <% if ("1".equals(type)) { %>
                    <s:if test='schoolIp!=""'>
                        <li><a href="javascript:;" onclick="_leftTree.showSchoolTeachFile(this);">�ڿ��ļ���</a></li>
                    </s:if>
                    <%} %>
                </ul>
            </div><!--end left_t-->
            <div class="right_t" id="right1">
                <div id="" class="sou_easy posRe qk2"
                     style="background:none;background-color:#fff;border:1px solid #e0e0e0;">
                    <div class="sou_Bg"></div>
                    <div class="sou_Bg_text">
                        <div style="float: right;"><span style="color:red;display:none;" id="errmessage"><span><img
                                src="<%=path %>/teacher/images/err-1.jpg" width="20"/></span><span id="errtext">�������ռ���������ͣ�ϴ�!</span></span><span
                                id="teachersize" style="padding-right:5px;"></span></div>
                    </div>
                    <div id="schoolTipHead" style="display:none;"> &nbsp;&nbsp;�����ڿ��ļ��е�չʾ������Уƽ̨�������������ѧУ��ʹ��VPN���ŵ�¼<a
                            target="_blank" href="http://<s:property value='schoolIp'/>/sso">http://<s:property
                            value='schoolIp'/>/sso</a></div>
                    <div id="searchDivId">
                        <form name="form1" action="" method="post">
                            <img src="<%=path%>/teacher/images/zoom.gif" width="31"
                                 height="27"/>&nbsp;<strong>�ؼ���</strong>��<input name="" class="sou_box w260" type="text"
                                                                                onFocus="cls();" onBlur="res();"
                                                                                value="������ؼ���"/>
                            <input name="" type="button" class="souBtn" value="��&nbsp;��" style="font-size:12px;"
                                   onclick="_leftTree.mySerach();"/>
                        </form>
                    </div>
                </div><!--end sou_easy-->
                <div class="r_mContent" onmousedown="_rightMenu.hideRightMenu();">
                    <h1>
                        <ul style="float: left;padding-left: 10px;">
                            <a href="#" onclick="_fileUtil.backDir();" id="backDir" style="display: none;"><img
                                    src="<%=path%>/teacher/images/back.png"/></a>
                            <a href="javascript:void(0);" id="backDirSchool" style="display: none;"><img
                                    src="<%=path%>/teacher/images/back.png"/></a>
                            <a href="#" class="zi5" id="netshare.title" style="display:none">������Ա�б�</a>
                            <a href="#" class="zi5" id="friend.title" style="display:none">�ҵĺ����б�</a>
                            <a href="javascript:void(0);" class="zi5" id="schoolForder.title"
                               style="display:none">�ڿ��ļ���</a>
                        </ul>
                        <ul id="btns">
                            <a href="#" id="btns.1" class="zi4" onclick="toupload();" id="togetuplaod">�ļ��ϴ�</a>
                            <a href="#" id="btns.2" class="zi4" onclick="_fileUtil.openFolderCreateWindow();">���ļ���</a>
                            <a href="#" id="btns.3" class="zi4"
                               onclick="_fileWindow.openFlag=0;_fileUtil.openFileRenameWindow(); ">�޸��ļ�</a>
                            <a href="#" id="btns.4" class="zi2"
                               onclick="_fileWindow.openFlag=0;_fileUtil.deleteFile(); ">ɾ��</a>
                            <a href="#" id="btns.5" class="zi2"
                               onclick="_fileWindow.openFlag=0;_fileUtil.openFolderMoveWindow();  ">�ƶ�</a>
                            <a href="#" id="btns.6" class="zi2"
                               onclick="_fileWindow.openFlag=0;_openFolderShareWindow();">����</a>
                            <a href="#" id="btns.7" class="zi2"
                               onclick="teacherfileplay(_fileUtil.getSelectedFcodes(),2,1);">���</a>
                            <a href="#" id="btns.8" class="zi2"
                               onclick="teacherfiledownload(_fileUtil.getSelectedFcodes(),3);">����</a>

                        </ul>
                        <!-- ���繲��ť -->
                        <ul class="navTop" id="netshare.btns" style="display:none">
                            <!--
                                <a href="#" class="zi4" onclick="_teacherUtil.addFriend(teachernumber);">��Ϊ����</a>
                                -->
                        </ul>
                        <!-- �ҵĺ��� -->
                        <ul class="navTop" id="friend.btns" style="display:none">
                            <a href="#" class="zi4" onclick="_teacherUtil.deleteFriend(teachernumber);">ɾ������</a>
                        </ul>
                    </h1>
                    <ul class="folderList" id="folderList" oncontextmenu="_rightMenu.showRightMenu();">

                    </ul>
                    <%--  <ul class="folderList" id="folderListSchool" >

                   </ul> --%>
                    <div class="fileIcon">
                        <div class="clearfix"></div>
                        <div id="pages" class="page" style="display: none;">��<strong>52</strong>�� ��<strong>1</strong>ҳ/��<strong>6</strong>ҳ
                            <a href="#" class="a1">��һҳ</a> <span>1</span> <a href="#">2</a> <a href="#">3</a> <a
                                    href="#">4</a> <a href="#">5</a> <a href="#" class="a1">��һҳ</a></div>
                    </div>

                </div><!--end r_mContent-->
            </div><!--end right_t-->
            <div class="clearfix"></div>
        </div><!--end bgMiddle-->
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
    <jsp:include flush="true" page="fileProtocol.jsp"></jsp:include>
    <jsp:include page="/teacher/recommend/recommendwindow.jsp"></jsp:include>
    <jsp:include flush="true" page="recommedActive.jsp"></jsp:include>
    <jsp:include flush="true" page="recomendOther.jsp"></jsp:include>
    <jsp:include flush="true" page="tip.jsp"></jsp:include>
</div>
<jsp:include page="rightMenu.jsp"></jsp:include>
<div style="position: absolute;top: 100px;left: 100px; display: none;" id="testdrag">ddddd</div>
<div id="maskAllall"></div>
<div id="waithtml">
    <img src="<%=path%>/images/extanim32.gif"/>
    <span id="messagebox">���ڼ������ݣ����Ժ�....</span>
</div>

<div class="pop" id="pop">
    <h2><span><a href="#" onclick="_rightMenu.hideRecommendClass();" title="�ر�"><img
            src="<%=path%>/teacher/images/closeBtn.gif" width="18" height="18"/></a></span>��Դ�Ƽ�</h2>
    <ul>
        <div class="biaodan course" style="border:none; background:none;">
            <h3><span></span>ѡ���Ƽ���Χ
                <p>��ѡ��</p></h3>

            <form name="form1" action="" method="post">
                <p id="userclass">
                    <label>�༶��</label>
                </p>
                <!--
               <p id="usergroup">
                       <label>Ⱥ�飺</label>
                      </p>

          -->

                <p style="text-align:left; padding-left:135px; ">
                    <label>&nbsp;</label><input type="button" class="loginBtn" value="ȷ�����"
                                                onclick="_fileUtil.saveteacherRecommend(teachernumber,teachername,teacherjyjg);"/>
                    <label>&nbsp;</label><input name="����" type="reset" class="loginBtn" value="����"/>
                    <label>&nbsp;</label><input name="�ر�" type="button" class="loginBtn" value="�ر�"
                                                onclick="_rightMenu.hideRecommendClass();"/>
                </p>
            </form>
        </div>
    </ul>
</div>
<div id="tempPluginDiv"></div>
</body>

</html>
<script type="text/javascript">


    window.onload = function () {


        try {
            if (pluginobj) {
                initTmpPlugin();
            }
        } catch (e) {
        }


        _common.setCurrServerPath('<%=path%>');
        _common.setTeacherId(teachernumber);
        _fileUtil.currLevel = -1;
//_rightMenu.openRecommendWindowProtocol();
        <s:if test="typecode==1">
        _fileUtil.createFileArrayByClick(0);
        </s:if>
        <s:elseif test="typecode==2">
        _teacherUtil.createHasSharedTeacherArrayRequest();
        </s:elseif>
        <s:elseif test="typecode==3">
        _teacherUtil.createFriendArrayRequest();
        </s:elseif>
        <s:else>
        _fileUtil.createFileArrayByClick(0);
        </s:else>


//document.oncontextmenu= function(){window.event.returnValue=false;};
        document.onmousedown = function () {
            _rightMenu.hideRightMenu()
        };
        getchangeusesizestate(parseFloat(usesize));
        $("#teachersize").html("�ռ��С" + teachersize + "G;��ʹ��" + ((usesize / 1024).toFixed(2)) + "M");
//��ȡ��ʦ�İ༶��Ϣ
        _fileUtil.getUserClass("${applicationScope.ipPathMap['TMS.401']}", teachernumber);
//_fileUtil.getUserGroup(interurll,teachernumber);
//�ж��ϴ��ؼ��Ƿ�װ
        var playversion = "<%=versionpath%>";
//alert(ftpocx.GetVersion()+"||"+playversion);

        try {
            if (ftpocx.GetVersion() < playversion) {
                showinsertocxmessage(5);
            } else {
                ftpocx.ReleaseConnect();
            }

        } catch (e) {
            //alert(e);
            $("#btns\\.1").attr("disabled", true);
            $("#btns\\.2").attr("disabled", true);
            $("#btns\\.3").attr("disabled", true);
            $("#btns\\.4").attr("disabled", true);
            $("#btns\\.5").attr("disabled", true);
            $("#btns\\.6").attr("disabled", true);
            showinsertocxmessage(4);
        }
    }

</script>

