<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%@page import="vcom.sso.vo.*" %>
<%@page import="vcom.util.*" %>
<%@page import="vcom.newteach.service.ParamValueCache" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    String timestamp = new java.text.SimpleDateFormat("MMddHH").format(new Date());
    String posterPath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getSession().getAttribute("pls_one_filepath") + "/"
            + request.getSession().getAttribute("pls_one_fileport") + "/";

    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
    response.setDateHeader("Last-Modified", new Date().getTime());

    //��ȡ��Ӧ����
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

    AuthResult authResult = (AuthResult) request.getSession().getAttribute("authResult");
    if (authResult == null)
        authResult = new AuthResult();
    String schoolStage = "";
    VSysUser user = authResult.getUser();
    if (authResult.getUser() != null && authResult.getUser().getStudyStage() != null)
        for (int i = 0; i < authResult.getUser().getStudyStage().length; i++) {
            if (i > 0) {
                schoolStage += ",";
            }
            schoolStage += authResult.getUser().getStudyStage()[i].getStudyStageCode();
        }

    String loginStyle = "";
    Cookie cookie = vcom.util.RequestUtil.getCookie(request, "loginStyle");
    if (cookie != null) {
        loginStyle = cookie.getValue();
    }
    if (!"1".equals(loginStyle)) loginStyle = "0";

    String ut = "";
    cookie = vcom.util.RequestUtil.getCookie(request, "ut");
    if (cookie != null) {
        ut = cookie.getValue();
    }

    String c2 = "";
    String c3 = "";
    String c6 = "";
    c2 = (String) request.getAttribute("c2");
    Object temp = request.getAttribute("c3");
    c6 = (String) request.getAttribute("c6");

//???  c3 ���õ�����ջ ʲô��˼��
    // stack.set("c3", temp);

    String course = (String) request.getParameter("course");
    //NoTEBOOK�Խ�sso��ַ����
    vcom.util.Vcom_3DES des = new vcom.util.Vcom_3DES("vcommenhutuwenandotheros");
    des.setIsEncrypt(1);
    des.setMessage(vcom.util.InterfaceCfg.ipMap.get("SSO_IP"));
    String desSsoIP = des.Vcom3DESChiper();
    des.setMessage(vcom.util.InterfaceCfg.ipMap.get("SSO"));
    String desSsoDomain = des.Vcom3DESChiper();
    des = null;

    //String versionpath=ParseXml.getXmlNode("vcomdownlaod");

    MD5 m = new MD5();
    int day = new Date().getDate();
    String userName = authResult.getUser().getUsername();
    String sk = m.getMD5ofStr(userName + day);
    //��˽����
    //String infoAllowUseNeed = authResult.getInfoAllowUseNeed(); 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" style="background: #000418;">
<head>
    <meta http-equiv="x-ua-compatible" content="IE=EmulateIE7"/>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <meta http-equiv="Pragma" NAME="" CONTENT="no-cache"/>
    <meta http-equiv="Cache-Control" NAME="" CONTENT="no-cache"/>
    <meta http-equiv="Expires" NAME="" CONTENT="0"/>
    <title>�ڿ�ƽ̨</title>
    <%
        String whiteBoardFlag = request.getParameter("whiteBoardFlag");
        if (null == whiteBoardFlag || "".equals(whiteBoardFlag)) {
            whiteBoardFlag = "2";
        }
        String cssName = request.getParameter("cssName");//��ʽ
        if (cssName == null || cssName.trim().length() == 0) {
            cssName = "tongyong";
        }

        String pls_css_name = ParamValueCache.getTempKey("pls.css.name");
        System.out.println(pls_css_name);
        //�����ڿζ�Ϊ׼�����ڿζ�û�ж����ٻ�ȡ���ݿ��еĶ���
        if (cssName.equals("tongyong")) {
            if (pls_css_name != null || pls_css_name.trim().length() > 0) {
                cssName = pls_css_name;
            }
        }
        //�ļ�����start
        String play_txt = new String(Config.getPlayType("txttype"));
        String play_pic = new String(Config.getPlayType("pictype"));
        String play_mp3 = new String(Config.getPlayType("mp3type"));
        String play_mp4 = new String(Config.getPlayType("flashvideotype"));
        String play_video = new String(Config.getPlayType("videotype"));
        String play_flash = new String(Config.getPlayType("swftype"));
        String play_ept = new String(Config.getPlayType("ept"));
    %>
    <style>
        .rightCon .courseTitle {
            text-align: center;
        }
    </style>
    <link href='<%=path%>/style/default.css?stamp=<%=timestamp %>' rel='stylesheet' type='text/css'/>
    <link href='<%=path%>/style/style_v4.css?stamp=<%=timestamp %>' rel='stylesheet' type='text/css'/>
    <link href="<%=path%>/teacher/style/bk_style.css?stamp=<%=timestamp %>" rel="stylesheet" type="text/css"/>
    <link href="<%=path%>/style/<%=cssName %>.css?stamp=<%=timestamp %>" rel="stylesheet" type="text/css"/>
    <link href='<%=path%>/style/ktjx-min-1.0.css?stamp=<%=timestamp %>' rel='stylesheet' type='text/css'/>
    <!-- Э���� -->
    <script type="text/javascript">
        var protocol = "<%= vcom.util.InterfaceCfg.ipMap.get("LOCAL_PROTOCOL")+"://"%>";
        if (("http://" == protocol || "https://" == protocol) && window.location.protocol + "//" != protocol) {
            window.location.href = window.location.href.replace(window.location.protocol + "//", protocol);
        }
    </script>
    <!-- �����ļ� -->
    <script type="text/javascript">
        if (!Array.prototype.forEach) {
            Array.prototype.forEach = function (fun /*, thisp*/) {
                return;
            };
        }
    </script>
    <script type="text/javascript" src="script/jquery172min.js"></script>
    <script type="text/javascript" src="script/artDialog/artDialog.js?skin=default"></script>
    <script type="text/javascript" src="script/artDialog/artDialog.fix.js"></script>
    <script type="text/javascript" src="script/artDialog/plugins/iframeTools.js"></script>
    <script type="text/javascript" src="js/common.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="js/ajax_common.js?stamp=<%=timestamp %>"></script>


    <script type="text/javascript" src="js/config_pls.jsp?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="js/validate_common.js"></script>
    <script type="text/javascript" src="js/teach_constant.js"></script>
    <!-- zoom -->
    <script type="text/javascript" src="js/MyZoom.js"></script>
    <script type="text/javascript" src="js/json2.js"></script>
    <!---------------------------  ����ģ��start ------------------------------------------------------->
    <!-- �˵���ҳ���ʼ�� -->
    <script type="text/javascript" src="js/init.js"></script>
    <!-- �汾���γ����չʾ -->
    <script type="text/javascript" src="js/version_tree.js"></script>
    <!-- ����ר������Ŀѡ�����˵���չʾ -->
    <script type="text/javascript" src="js/subjectPanel.js?stamp=<%=timestamp %>"></script>
    <!-- �û���¼�������� -->
    <script type="text/javascript" src="js/readme.js?stamp=<%=timestamp %>"></script>
    <!-- ��ǰԤϰ -->
    <script type="text/javascript" src="js/kqyx_show.js?stamp=<%=timestamp %>"></script>
    <!-- ���ý�ѧ -->
    <script type="text/javascript" src="js/ktjx_show.js?stamp=<%=timestamp %>"></script>
    <!-- ��չ���� -->
    <script type="text/javascript" src="js/tzts_show.js?stamp=<%=timestamp %>"></script>
    <!-- ���ӽ̲� -->
    <script type="text/javascript" src="js/dzjc_show.js?stamp=<%=timestamp %>"></script>
    <!-- ��ѧ���� -->
    <script type="text/javascript" src="js/jxfx_show.js?stamp=<%=timestamp %>"></script>
    <!--����ѵ��-�½�ѵ��  -->
    <script type="text/javascript" src="js/zjxl_show.js?stamp=<%=timestamp %>"></script>
    <!--������ҵ-->
    <script type="text/javascript" src="js/lxzy_show.js?stamp=<%=timestamp %>"></script>
    <!--�κ���ҵ-�½���ҵ  -->
    <script type="text/javascript" src="js/zy_show.js?stamp=<%=timestamp %>"></script>
    <!--�ҵ�����-->
    <script type="text/javascript" src="js/ypzy_show.js?stamp=<%=timestamp %>"></script>
    <!--У����Դ-�̲���Դ  -->
    <script type="text/javascript" src="js/xbjc_show.js?stamp=<%=timestamp %>"></script>
    <!--У����Դ-ר����Դ  -->
    <script type="text/javascript" src="js/xbzy_show.js?stamp=<%=timestamp %>"></script>
    <!--�����Ķ�  -->
    <script type="text/javascript" src="js/tzzy_show.js?stamp=<%=timestamp %>"></script>
    <!--ֱ������  -->
    <script type="text/javascript" src="js/live.js?stamp=<%=timestamp %>"></script>
    <!--������Դ -->
    <script type="text/javascript" src="js/bdzy_show.js?stamp=<%=timestamp %>"></script>
    <!--����ר��-С�������п����߿�  -->
    <script type="text/javascript" src="js/kszt_show.js?stamp=<%=timestamp %>"></script>
    <!--΢����Դ -->
    <script type="text/javascript" src="js/wkzy_show.js?stamp=<%=timestamp %>"></script>
    <!--��ʦ΢�� -->
    <script type="text/javascript" src="js/mswk_show.js?stamp=<%=timestamp %>"></script>
    <!--��Դ����  -->
    <script type="text/javascript" src="js/netTools.js"></script>
    <!--�Ž�����  -->
    <script type="text/javascript" src="js/res_search.js?stamp=<%=timestamp %>"></script>
    <!--�����  -->
    <!---------------------------- ����ģ��end ----------------------------------------->
    <!-----------------------------����ģ��start  -------------------------------------->
    <!-- ϵͳ����  -->
    <script language="javascript" src="js/sysConfig.js"></script>
    <!-- ��ѧ���� -->
    <script type="text/javascript" src="js/teachTools.js"></script>
    <!-- Ӧ�ù��� -->
    <script type="text/javascript" src="js/footTools.js"></script>
    <!-- �ڿε�ַ���� -->
    <script type="text/javascript" src="js/addressConfigs.js"></script>
    <script type="text/javascript" src="js/Progress.js"></script>
    <script type="text/javascript" src="js/download.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="js/player.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="js/play_adapter.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="js/popup_layer.js"></script>
    <script type="text/javascript" src="js/lefttoright.js"></script>
    <!-- �������� -->
    <script type="text/javascript" src="js/updateClientImage.js"></script>
    <!-- ��ݼ� -->
    <script type="text/javascript" src="js/simple_hotkey.js"></script>
    <!-- mac��ַ��ȡ -->
    <script type="text/javascript" src="js/mac_util.js"></script>
    <!-- USB��� -->
    <script type="text/javascript" src="js/usb_show.js"></script>
    <!-- �༶���� -->
    <script type="text/javascript" src="js/commondiv.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="script/base64.js"></script>
    <script type="text/javascript">
        var jxfxjspath = transferProtocol_web + _config['ANLS'] + "/analysis/pages/jxfx2/interface/isShowAnalysisInterface.jsp";
        document.write("<script language=javascript src='" + jxfxjspath + "'><\/script>");
    </script>
    <!--ƽ̨���� js�ļ�
<script type="text/javascript">
    var customjspath = "<%=path%>/style/<%=cssName%>/custom.js?stamp=<%=timestamp %>";
   $.getScript(customjspath);
</script>
 -->
    <!-----------------------------����ģ��end    -------------------------------------->
    <script type="text/javascript">
        _naUtil.currPos = 2;//1-�Ϸ� 2-�·�
        var ocxversion = "<%="" %>";//versionpath
        var ip = "<%=ip%>";
        var basePath = "<%=basePath%>";
        var global_basePath = "<%=basePath%>";
        var targetobj;
        var teachernumber = "<%= user.getUsername() %>";
        var teachername = "<%= user.getTruename() %>";
        var teacherjyjg = "<%= user.getSchool().getSchoolId() %>";//����,��������ѧУid
        // var teacherforder="<s:property value="#session.teacher.foldername" />";
        // var virtualDirectory="<s:property value="#session.teacher.virtualDirectory" />";
        var areaId = "<%= user.getArea().getAreaId()%>";
        var areaCode = "<%= user.getArea().getAreaCode()%>";
        var usertype = "<%= user.getUsertype() %>";
        var schoolId = "<%= user.getSchool().getSchoolId() %>";
        var schoolName = "<%= user.getSchool().getSchoolName() %>";
        var userPhone = "<%= user.getLink() %>";
        var sso_ut = "<%=authResult.getUt()  %>";
        var serverphone = "";
        //ѧУ�Ƿ�֧��ƽ����� 0��֧�� 1NECƽ�� 2vcomƽ�� 3NEC��vcomƽ��ͬʱ֧�֣� �ڿζ�ֻ֧��vcomƽ�� ����0��1ʱ����ƽ�幦�ܣ�
        // Ϊ�����ڿζ��ϰ�����������¼�������padTeachAble��2��3ʱ��1 �����0��1ʱ��0
        var padTeachAble = "<%= user.getSchool().getPadTeachAble() %>";
        if (padTeachAble == "") {
            padTeachAble = 0;
        }
        if (sso_ut == "") {
            var sso_ut = "<%=ut%>";
        }
        //ֱ��У�����
        var sk = "<%=sk%>";
        var des_sso_domain = "<%=desSsoDomain%>";
        var des_sso_ip = "<%=desSsoIP %>";
        var schoolStage = "<%=schoolStage%>";
        //��ǰϵͳʱ��(��ʱ��Ƚ���)
        var nowtimes =<%=new Date().getTime()+2000%>;
        var loginStyle = "<%=loginStyle%>";//0�ڿΣ�1Ԥ��
        var userclass = "<%=c6%>";
        var userClassType = "";//��ǰ�༶���ͣ������࣬�����
        var userClassName = "";//��ǰ�༶��
        var isUseClientAnswer = false;
        if (loginStyle == 1) userclass = null;
        //��ǰϵͳʱ������
        $(function () {
            window.setInterval(function () {
                nowtimes += 30000;
            }, 30000);
        });

        setMainTeachSeverPath('<%=ParamValueCache.getTempKey("pls.mainteach.path")%>');
        _common.pls_mainteach_path = '<%=ParamValueCache.getTempKey("pls.mainteach.path")%>';
        // ϵͳ���ͣ�1����ϵͳ;2У԰��ϵͳ;Ĭ��1
        _common.pls_showke_type = '<%=ParamValueCache.getTempKey("pls.showke.type")%>';
        _common.pls_one_filepath = '<%=ParamValueCache.getTempKey("pls.one.filepath")%>';
        _common.pls_one_fileport = '<%=ParamValueCache.getTempKey("pls.one.fileport")%>';
        _common.posterPath = '<%=posterPath%>';
        _common.setCurrServerPath('<%=path%>');
        _common.cssName = "<%=request.getParameter("cssName")%>";//
        var ieBrowser = "<%=request.getParameter("ieBrowser")%>";//�Ƿ�Ϊie�����ģ���ڿζ˵�¼
        var templateId = "1";//ȡ�����ӻ����װ�ѡ��̶��˵���ʾ�ڵײ�
        var whiteBoardFlag =<%=whiteBoardFlag%>;
        var currVersionid = "<%=c2%>";///��¼��ǰ�û���ѡ��İ汾id

        //������Ŀ��Ĭ��ѡ���½�
        var defaultSelMap = new Array();//Ĭ�ϸ��ڵ�ѡ����{_common.channelid:selectId}

        <% if(c3!=null && c3!=""){%>
        defaultSelMap =<s:property value='c3' escape="false" />;
        <%}%>

        var prductGrant = null;
        <%
        String prductGrant=(String)request.getAttribute("prductGrant");
        if(prductGrant!=null && prductGrant!=""){
        %>
        prductGrant =<%=prductGrant%>;
        <%}%>
        if (defaultSelMap["version"] == null || loginStyle == 1)
            defaultSelMap["version"] = "<%=course%>"

        //������ֲ˵�
        function clearUP() {
            /**���������ʾ�����ظ���˵� begin***/
            if ('index_0_7' == event.srcElement.id) {

            } else if (1 == _naUtil.mainMoreMenuPosFlag) {

            } else {
                try {
                    document.getElementById('menuMore_window').style.display = "none";
                } catch (e) {
                }
            }
            window.event.returnValue = true;
            /**���������ʾ�����ظ���˵� end***/
        }

        player.type = {
            "txt": "<%=Config.getPlayType("txttype")%>",
            "pic": "<%=Config.getPlayType("pictype")%>",
            "mp3": "<%=Config.getPlayType("mp3type")%>",
            "mp4": "<%=Config.getPlayType("flashvideotype")%>",
            "video": "<%=Config.getPlayType("videotype")%>",
            "flash": "<%=Config.getPlayType("swftype")%>",
            "ept": "<%=Config.getPlayType("ept")%>"
        };
        //*****-->
    </script>

    <!-- Ԥ������������ռλ��������ʽ -->
    <script type="text/javascript">
        _treeVersion.viewHeightMove = -60;
    </script>
    <%if ("1".equals(loginStyle)) { %>
    <style type="text/css">
        .floatDiv {
            top: 0px
        }
    </style>
    <% } %>
</head>
<body scroll=no onDragStart="return false;" id="teachBody" onmousedown="clearUP();">
<!-- ��ȡmac��ַ�Ŀؼ� begin -->
<jsp:include page="/inc/ieBrowser.jsp" ></jsp:include><!-- ��� -->
<div class="containers setBg1" id="bg"><!-- ����� -->
    <!-- ����� -->
    <div class="edibox">
        <!--
            ���ߣ�fub@foxmail.com
            ʱ�䣺2018-07-16
            ������ԭheader��
        -->
        <DIV class="header" sizset="1">
            <table class="wt100 head">
                <tr>
                    <%if (cssName != null && cssName.trim().length() > 0) { %>
                    <th class="top-left"><img src="style/<%=cssName%>/logo.png?stamp=<%=timestamp %>" class="img100"/>
                    </th>
                    <%} else { %>
                    <th class="top-left"><img src="style/cq9xt/cqlogo.png" class="img100"/></th>
                    <% }%>
                    <th class="top-middle"><h2 id="userVersionInfo">��ѧ &bull; ���꼶 &bull; ��ѧ��</h2></th>
                    <th class="w60"><img id="headphoto" src="img/default1.png" width="60" height="60"/></th>
                    <th class="w150">
                        <h5 id="teachername"></h5>
                        <h6 id="className">һ�꼶��1����</h6>
                    </th>
                </tr>
            </table>
            <div class="pad0-25">
                <div class="address"><h3 class="jieduan" onclick="_naUtil.getNotice();">���ý�ѧ &gt; �γ� </h3></div>
            </div>
        </DIV>
        <div class="main" id="main">
            <div class="mainLeft" id="mainLeft"></div><!-- ����� -->
            <div class="mainRight">
                <div class="rightCon" id="mainRight"></div>
            </div><!-- �ұ���  -->
        </div>
        <div id=pageRightNav class="page pageRight"></div><!-- ��ҳ -->
        <div class="subMenu" style="display:block"></div><!-- �����˵� -->
        <div class="topMenu" style="display:none">
            <ul id="secendmenu"></ul>
        </div><!-- �����˵� -->
        <!-- �ײ���������ʼ -->
        <DIV class=nav sizcache042993950593653474="2" sizset="5">
            <div class="foot">
                <div class="footer">
                    <span class="tongzhi" id="gonggao"></span>
                    <div class="fr">
                        <a class="fr" style="cursor:pointer;" id="outButton" onclick="_naUtil.logout();">
                            <i class="iconY gb"></i>�˳�</a>
                    </div>
                    <div class="fr">
                        <a class="fr" style="cursor:pointer;" id="sysSet" href="javascript:_sysConfg.openWindow();">
                            <i class="iconY gj"></i>����</a>
                    </div>
                    <div class="fl" onclick="_naUtil.openYY(this);" id="menu">
                        <a class="fl" style="cursor:pointer;">
                            <i class="iconY yy"></i>Ӧ��</a>
                        <ul class="pos-list poos" style="display: none;" id="menuNew">
                        </ul>
                        <ul class="pos-list-more" style=" display: none;" id="menuNewMore">
                        </ul>
                    </div>
                    <div class="fl" onclick="_naUtil.openXk(this);" id="openXk">
                        <a class="fl" style="cursor:pointer;">
                            <i class="iconY xk"></i>ѡ��</a>
                        <ul class="pos-list02 poos" style="display: none;">

                        </ul>
                        <ul class="more-xxk" style="height:0px;overflow-y:auto;">
                            <div class="pad10" id="versionHeight">
                                <span class="zd-more" style="cursor:pointer;"
                                      onclick="_treeVersion.showVersionMore(event);"><i class="ico-up"></i></span>
                                <span class="org-ss" style="cursor:pointer;" onclick="_treeVersion.showVersionPage();">��ɾ��ѡ�汾</span>
                            </div>
                        </ul>
                    </div>
                    <!----end----></div>
            </div>
        </DIV>
        <!-- �ײ����������� -->
        <div class="bgNew" onclick="_naUtil.hideBg();"></div>
    </div>
    <div id="usbHint" class="floatHint"></div><!-- u����� -->
    <div id="maskAll"></div><!-- ȫ������ -->
    <div id="maskAllDzjc"></div><!-- ȫ������ -->
    <div id="maskAllall" style="display: none;"></div><!-- ȫ������ -->
    <div id="waithtml" style="display: none;position: absolute;left:40%;top:40%;z-index:100"><!-- �ȴ���� -->
        <img src="<%=path%>/images/extanim32.gif"/>
        <span id="messagebox">���ڼ������ݣ����Ժ�....</span>
    </div>
    <iframe id="iframe_count" src="" style="display: none;"></iframe><!-- ��־���� -->
    <div id="dzjcDiv" style="width:1022px;height:0px;position: absolute;left:0px;top:0px;z-index:5999;"></div>
    <!--���ӽ̲�  -->
    <div class="floatDiv" id="selectPanel" style="display:none;"></div>    <!-- �汾������� -->

    <div class="floatDiv" id="mswkSelectPanel" style="display:none;"></div>    <!-- ��ʦ΢�ΰ汾������� -->

    <div class="floatDiv" id="commonPanel" style="display:none;">
        <div class=divTop>
            <div class=divClose onclick="void(document.getElementById('commonPanel').style.display='none');"></div>
            <div class=divTitle id='panelTitle'></div>
            <div class="divContent" id='panelContent'>

            </div>
            <div class=page>
                <div class=pageNext><a id='panelClose'
                                       href="javascript:void(document.getElementById('commonPanel').style.display='none');">��
                    ��</a></div>
                <div class=pageNext><a id='panelOk' href="#">ȷ ��</a></div>
            </div>
        </div>
        <div class=divBottom></div>
    </div>    <!-- ������ʾ�� -->
    <!--������ҵԤ��-->
    <div class="floatDiv" id="lxzyView" style="display:none;">
        <div class=divTop>
            <div class=divClose
                 onclick="void(document.getElementById('lxzyView').style.display='none');document.getElementById('maskAll').style.display='none';"></div>
            <div class=divTitle id='lxzyPanelTitle'>������ҵ</div>
            <div class="divContent" id='lxzyContent'>
            </div>

            <DIV class=page id="lxzyPage">
            </div>

        </div>
        <div class=divBottom></div>
    </div>
    <!--������ҵ����-->
    <div class="floatDiv" id="lxzyInfo" style="display:none;">
        <div class=divTop>
            <div class=divClose
                 onclick="void(document.getElementById('lxzyInfo').style.display='none');void(document.getElementById('lxzyView').style.display='block');"></div>
            <div class=divTitle id='lxzyInfoTitle'>������ҵ</div>
            <div class="divContent" id='lxzyInfoContent'></div>
            <DIV class=page id="lxzyInfoPage">
            </div>
        </div>
        <div class=divBottom></div>
    </div>

    <div class="floatDiv" id="subjectPanel" style="display:none;"><!-- ��Ŀ������� -->
        <div class=divTop>
            <div class=divClose onclick="void(document.getElementById('subjectPanel').style.display='none');"></div>
            <div class=divTitle>ר��ѡ��</div>
            <div class="divContent">
                <h3>ר��ѡ����ѡ������Ҫ��ר�⣡</h3>
                <div id="subjectPanel_content"></div>
            </div>
            <div class=page>
                <div class=pageNext><a
                        href="javascript:void(document.getElementById('subjectPanel').style.display='none');">�� ��</a>
                </div>
                <div class=pageNext><a
                        href="javascript:void(document.getElementById('subjectPanel').style.display='none');_ssp.refreshSubjectTree();">ȷ
                    ��</a></div>
            </div>
        </div>
        <div class=divBottom></div>
    </div>
    <!-- ��Դ������� -->
    <!--���繤��-��ʼ-->
    <div class="floatDiv" id="netTools.window">
        <div class="divTop">
            <div class="divClose" onclick="_netTools.closeWindow();"></div>
            <div class="divTitle">��Դ����</div>
            <div class="divContent">
                <h3>��������������</h3>
                <dl class="ipSet">
                    <dt>�������ݣ�</dt>
                    <dd><input type="text" id="netTools.keyword" maxlength="10" style="width:320px"/></dd>
                </dl>
                <br><br>
                <ul class="divButton">
                    <li class="spaceNetTool">
                        <a id="netTools.googleSearch"
                           href="javascript:resSearch.search(document.getElementById('netTools.keyword').value);">��Դ����</a>
                    </li>
                    <li>
                        <a id="netTools.baiduSearch"
                           href="javascript:_netTools.baiduSearch(document.getElementById('netTools.keyword').value);">�ٶ�����</a>
                    </li>
                    <li>
                        <a id="netTools.icibaSearch"
                           href="javascript:_netTools.icibaSearch(document.getElementById('netTools.keyword').value);">���ʰ�</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="divBottom"></div>
    </div>
    <!--���繤��-����-->
    <%--
    <OBJECT id="AnswerQuestionTools" align="CENTER" WIDTH=0 HEIGHT=0 classid="clsid:3c782736-05fa-43a4-af03-b7aa96876d99"></OBJECT><br>
    --%>
    <OBJECT id="ClientAnswer" align="CENTER" WIDTH=0 HEIGHT=0
            classid="clsid:F6897699-0EB9-40D7-8641-FCE2C0BE0703"></OBJECT>
    <br>
    <OBJECT id="LessionOcx" align="CENTER" WIDTH=0 HEIGHT=0
            classid="clsid:5DB31BE4-17CE-4767-9A15-7AFC513D1D2D"></OBJECT>
    <br>

    <div class="floatDiv" id="upTrainPanel" style="display:none;"><!-- �����ʾ��� -->
        <DIV class=divTop>
            <DIV class=divClose onclick="upExam.close();"></DIV>
            <DIV class=divTitle>&nbsp;</DIV>
            <DIV class="divContent" style="height:130px">
                <div id="upTrainPanel_content"></div>
            </DIV>
            <span class="clearfix"></span>
            <!-- ��ʾ��Ϣ -->
            <div class="" id="upTrainPanel.tip"></div>
            <div class=page>
                <div class=pageNext><a href="#" onclick="upExam.close();">�� ��</a></div>
            </div>
        </div>
        <div class=divBottom></div>
    </div>

    <!-- �༶�շ���ʾ -->
    <div id="classCostCover"
         style="display:none;background-color:#FFF;width: 100%;height: 100%;position:absolute;z-index: 3;left: 0px;top: 0px;opacity: 0.7;filter: alpha(opacity=70)">
    </div>
    <div class="floatDiv" id="classCostInfo" style="z-index: 5;display:none">
        <div class="divTop">
            <div class="divClose" onclick="classCostClose();"></div>
            <div class="divTitle" id="_commontitle">������ʾ</div>
            <div class="divContent">
                <div style="font-size:14px;text-align:left" id="classCostInfoDiv"></div>
            </div>
            <div class="page marR2">
                <div class="pageNext"><a onclick="classCostClose();">�� ��</a></div>
            </div>
        </div>
        <div class="divBottom"></div>
    </div>
    <!-- �û�Ǩ����ʾ -->
    <div class="floatDiv" id="changeUserDiv" style="display:none">
        <div class="divTop">
            <div class="divClose" onclick="$('#changeUserDiv').css('display','none');"></div>
            <div class="divTitle" id="_commontitle">ϵͳ��ʾ</div>
            <div class="divContent">
                <div style="font-size:14px;text-align:left" id="changeUserInfoDiv"></div>
            </div>
            <div class="page marR2">
                <div class="pageNext"><a onclick="$('#changeUserDiv').css('display','none');">�� ��</a></div>
            </div>
        </div>
        <div class="divBottom"></div>
    </div>
    <!-- �汾����ҳ�� -->
    <div id="versionPage" style="display:none;">
        <iframe id="versionPageUrl" src="" width="100%" style="height:470px;" height="100%" frameborder="0"
                scrolling="no"></iframe>
    </div>
    <div id="readPage" style="display:none;">
        <iframe id="readPageUrl" src="" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>
    </div>
</body>
</html>
<jsp:include page="inc/toolbox.jsp"></jsp:include>
<!--������-->
<jsp:include page="teachTool_config.jsp"></jsp:include>
<!-- ��ѧ�������� -->
<jsp:include page="showkeip.jsp"></jsp:include>
<!-- �ڿ�ip���� -->
<jsp:include page="menu_config.jsp"></jsp:include>
<!-- �˵����� -->
<jsp:include page="system_config.jsp"></jsp:include>
<!--ϵͳ���� -->
<jsp:include page="personal_set.jsp"></jsp:include>
<!-- �γ����� -->
<jsp:include page="inc/commondiv.jsp"></jsp:include>
<!-- �༶���� -->
<jsp:include page="inc/taskdiv.jsp"></jsp:include>
<!-- �������� -->
<jsp:include page="inc/downloadfile.jsp"></jsp:include>
<!-- ������� -->
<jsp:include page="usb.jsp"></jsp:include>
<!-- ��ȡmac��ַ�Ŀؼ� end -->
<jsp:include page="inc/showMobile.jsp"></jsp:include>
<!--��ȡ�ֻ�������֤�� -->
<script type="text/javascript">
    //�ж������
    if ($.browser.msie && (Number($.browser.version) > 6)) {
    } else {
        if (loginStyle != 0) {
            alert("��ʹ��ie�����ie7���ϰ汾,��������޷��������!");
        }
    }
    //�����Ԥ��ģʽ������ϵͳ���ð�ť
    if (loginStyle == 0) {
        document.getElementById("sysSet").style.display = "block";
        document.getElementById("outButton").style.display = "block";
    } else {
        document.getElementById("sysSet").style.display = "none";
        document.getElementById("outButton").style.display = "none";
    }


    var vconfigStr = null;

    try {
        vconfigStr = ocx.ReadInfo("", "vconfig.ini");

    } catch (e) {
        /*ûװ�ؼ��ᵽ��*/
        //alert("�ؼ��ļ�����ʧ�ܣ�");
    }
    //��ȡpadר������,��д��cookie
    if (vconfigStr != null && vconfigStr.length > 0) {
        if (vconfigStr.indexOf("platform.deviceType=pad") >= 0) {
            //��PAD�ͻ���
            writeCookie("terminal", "pad", 20);
        }
    }
    //д��������Ϣ�ļ�
    try {
        ocx.WriteInfo("", "pcupconfig.txt", "&areacode=" + areaId + "&schoolcode=" + schoolId, 0);
    } catch (e) {
        //д��ʧ��
        //alert("�ؼ��ļ�����ʧ�ܣ�");
    }
</script>

<script type="text/javascript">
    _common.setTeacherId(teachernumber);
    /*�Զ���ʾ�̲����� end*/
    document.onselectstart = function () {
        return false;
    }

    function clearImg() {
        //alert("��ʼNew����");
        var stauts = '';
        try {
            //�½�
            stauts = IInformationOcx.FileNew(true);
        } catch (e) {
            //alert("IInformationOcx.FileNew()ִ��ʧ�ܣ�"+e.toString());
            //alert("��������HiteBoard���ߣ�");
            window.status = status;
        }
    }

    clearImg();
    _naUtil.createMenuHtml();
    $('#teachername').html(_common.cutStr(teachername, 5, '', true));
    _treeVersion.getUserHeadPhoto();

    //��ȡ����
    _naUtil.getNotice();
    //��¼��������
    /**
     if(infoAllowUseNeed == 1){
	_read.showReadPage();
}
     */
//��ȡ�û����а汾�͵�ǰ�汾�Լ�Ŀ¼��
//_treeVersion.getUserAllVersionList();
//�����Ŵ���
    myZoom.setZoom("#bg");
    zoomStart(myZoom.zoom, ".floatDiv");

    /*_commonDiv.showUserClassName();*/
    _common.addUb("u_shoukelogin", "�ڿζ˵�¼", "");//����U�ҽӿ�
</script>

<script type="text/javascript">
    //�༶�շ���ʾ
    if (loginStyle == 0) {
        mobileShow();
        var classCostFlag = 1;
        try {
            $.getJSON(pls_config_all["SSO.BSS_STATE_SCHOOL"] + "?username=" + teachernumber + "&reqEncoding=gbk&time=" + Math.random() + "&jsoncallback=?", function (res) {
                if (typeof (res.userAble) != "undefined" && !res.userAble) {
                    classCostFlag = 0;
                    document.getElementById("classCostInfoDiv").innerHTML = "�𾴵��û���<br/>&nbsp;&nbsp;&nbsp;&nbsp;���ã�<br/>&nbsp;&nbsp;&nbsp;&nbsp;" + res.bssStateFlgTip;
                    document.getElementById("classCostInfo").style.display = "block";
                    document.getElementById("classCostCover").style.display = "block";
                } else if (typeof (res.userAble) != "undefined" && res.userAble && res.bssStateFlg == "2") {
                    classCostFlag = 2;
                    //bssStateFlg ѧУ��Ӫ״̬ 0:������  1������ 2������
                    document.getElementById("classCostInfoDiv").innerHTML = "�𾴵��û���<br/>&nbsp;&nbsp;&nbsp;&nbsp;���ã�<br/>&nbsp;&nbsp;&nbsp;&nbsp;" + res.bssStateFlgTip;
                    document.getElementById("classCostInfo").style.display = "block";
                    document.getElementById("classCostCover").style.display = "block";
                }
            });
        } catch (e) {
        }
        //�رհ༶�շ���ʾ
        //imgMagage.update();//���¿ͻ�������ͼƬ
    }

    function classCostClose() {
        document.getElementById("classCostCover").style.display = "none";
        if (classCostFlag == 0) {
            window.location.href = 'gobackmy://';
        } else {
            document.getElementById("classCostInfo").style.display = "none";
        }
    }

    _teachToolConfigObj.read();//��ѧ����
    // ypzy.getResList();//��ʼ��������Դ��Ŀ�б�
    //Ԥ��ģʽ���ж��Ƿ�װ�ؼ�
    if (loginStyle == "1" && "undefined" == typeof (ocx.GetVersion)) {

        //if(_common.cssName=="tongyong")
        {
            var tempcode = new Array();
            tempcode.push('<div class="floatDiv" id="alertActive" ><div class=divTop><div class=divClose onclick="void(document.getElementById(\'alertActive\').style.display=\'none\');"></div><div class=divTitle>�ؼ�δ��װ</div><div class="divContent" ><H3>�밲װ�ؼ���</H3><div id="subjectPanel_content" >');
            tempcode.push('��û�а�װ�ؼ���ؼ�δ���ã���װ����֮��Ϳ������غͲ�����Դ��');
            tempcode.push('</div></div></div><div class=divBottom></div></div>');
            $("#classCostInfo").after(tempcode.join(""));
            $("#alertActive").show();
        }

    }
    if (loginStyle == "0") {
        /*�м�ר������ʱ��ͳ�ƣ�У��ut���м��޷���Ӧ�û�*/
        window.setInterval(getRepeatUserlogin, 295000);
        /*�Զ��幤��*/
        //footTools.initFootTool();
    }

    function getRepeatUserlogin() {
        $.ajax({
            url: pls_config_all["SSO.207"] + "?appFlg=PLS&username=" + teachernumber + "&lastUt=" + sso_ut,
            type: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            scriptCharset: "gbk",
            success: function (rdata) {
                var checkLogin = true;
                if (rdata.lastutEqualsUt != "true") {
                    checkLogin = false;
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {

            }
        });
    }

    if ("" != sso_ut) {
        writeCookie("sso_ut", sso_ut, 1);
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
</script>