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

    //获取相应参数
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

//???  c3 设置到参数栈 什么意思？
    // stack.set("c3", temp);

    String course = (String) request.getParameter("course");
    //NoTEBOOK对接sso地址加密
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
    //隐私声明
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
    <title>授课平台</title>
    <%
        String whiteBoardFlag = request.getParameter("whiteBoardFlag");
        if (null == whiteBoardFlag || "".equals(whiteBoardFlag)) {
            whiteBoardFlag = "2";
        }
        String cssName = request.getParameter("cssName");//样式
        if (cssName == null || cssName.trim().length() == 0) {
            cssName = "tongyong";
        }

        String pls_css_name = ParamValueCache.getTempKey("pls.css.name");
        System.out.println(pls_css_name);
        //先以授课端为准，若授课端没有定制再获取数据库中的定制
        if (cssName.equals("tongyong")) {
            if (pls_css_name != null || pls_css_name.trim().length() > 0) {
                cssName = pls_css_name;
            }
        }
        //文件类型start
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
    <!-- 协议检查 -->
    <script type="text/javascript">
        var protocol = "<%= vcom.util.InterfaceCfg.ipMap.get("LOCAL_PROTOCOL")+"://"%>";
        if (("http://" == protocol || "https://" == protocol) && window.location.protocol + "//" != protocol) {
            window.location.href = window.location.href.replace(window.location.protocol + "//", protocol);
        }
    </script>
    <!-- 公用文件 -->
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
    <!---------------------------  常用模块start ------------------------------------------------------->
    <!-- 菜单及页面初始化 -->
    <script type="text/javascript" src="js/init.js"></script>
    <!-- 版本及课程面板展示 -->
    <script type="text/javascript" src="js/version_tree.js"></script>
    <!-- 考试专题子栏目选择及左侧菜单树展示 -->
    <script type="text/javascript" src="js/subjectPanel.js?stamp=<%=timestamp %>"></script>
    <!-- 用户登录保护公告 -->
    <script type="text/javascript" src="js/readme.js?stamp=<%=timestamp %>"></script>
    <!-- 课前预习 -->
    <script type="text/javascript" src="js/kqyx_show.js?stamp=<%=timestamp %>"></script>
    <!-- 课堂教学 -->
    <script type="text/javascript" src="js/ktjx_show.js?stamp=<%=timestamp %>"></script>
    <!-- 拓展提升 -->
    <script type="text/javascript" src="js/tzts_show.js?stamp=<%=timestamp %>"></script>
    <!-- 电子教材 -->
    <script type="text/javascript" src="js/dzjc_show.js?stamp=<%=timestamp %>"></script>
    <!-- 教学分析 -->
    <script type="text/javascript" src="js/jxfx_show.js?stamp=<%=timestamp %>"></script>
    <!--课堂训练-章节训练  -->
    <script type="text/javascript" src="js/zjxl_show.js?stamp=<%=timestamp %>"></script>
    <!--离线作业-->
    <script type="text/javascript" src="js/lxzy_show.js?stamp=<%=timestamp %>"></script>
    <!--课后作业-章节作业  -->
    <script type="text/javascript" src="js/zy_show.js?stamp=<%=timestamp %>"></script>
    <!--我的云盘-->
    <script type="text/javascript" src="js/ypzy_show.js?stamp=<%=timestamp %>"></script>
    <!--校本资源-教材资源  -->
    <script type="text/javascript" src="js/xbjc_show.js?stamp=<%=timestamp %>"></script>
    <!--校本资源-专题资源  -->
    <script type="text/javascript" src="js/xbzy_show.js?stamp=<%=timestamp %>"></script>
    <!--课外阅读  -->
    <script type="text/javascript" src="js/tzzy_show.js?stamp=<%=timestamp %>"></script>
    <!--直播课堂  -->
    <script type="text/javascript" src="js/live.js?stamp=<%=timestamp %>"></script>
    <!--本地资源 -->
    <script type="text/javascript" src="js/bdzy_show.js?stamp=<%=timestamp %>"></script>
    <!--考试专题-小升初，中考，高考  -->
    <script type="text/javascript" src="js/kszt_show.js?stamp=<%=timestamp %>"></script>
    <!--微课资源 -->
    <script type="text/javascript" src="js/wkzy_show.js?stamp=<%=timestamp %>"></script>
    <!--名师微课 -->
    <script type="text/javascript" src="js/mswk_show.js?stamp=<%=timestamp %>"></script>
    <!--资源搜索  -->
    <script type="text/javascript" src="js/netTools.js"></script>
    <!--优教搜索  -->
    <script type="text/javascript" src="js/res_search.js?stamp=<%=timestamp %>"></script>
    <!--答题绑定  -->
    <!---------------------------- 常用模块end ----------------------------------------->
    <!-----------------------------其他模块start  -------------------------------------->
    <!-- 系统设置  -->
    <script language="javascript" src="js/sysConfig.js"></script>
    <!-- 教学工具 -->
    <script type="text/javascript" src="js/teachTools.js"></script>
    <!-- 应用工具 -->
    <script type="text/javascript" src="js/footTools.js"></script>
    <!-- 授课地址设置 -->
    <script type="text/javascript" src="js/addressConfigs.js"></script>
    <script type="text/javascript" src="js/Progress.js"></script>
    <script type="text/javascript" src="js/download.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="js/player.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="js/play_adapter.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="js/popup_layer.js"></script>
    <script type="text/javascript" src="js/lefttoright.js"></script>
    <!-- 背景更新 -->
    <script type="text/javascript" src="js/updateClientImage.js"></script>
    <!-- 快捷键 -->
    <script type="text/javascript" src="js/simple_hotkey.js"></script>
    <!-- mac地址获取 -->
    <script type="text/javascript" src="js/mac_util.js"></script>
    <!-- USB浏览 -->
    <script type="text/javascript" src="js/usb_show.js"></script>
    <!-- 班级设置 -->
    <script type="text/javascript" src="js/commondiv.js?stamp=<%=timestamp %>"></script>
    <script type="text/javascript" src="script/base64.js"></script>
    <script type="text/javascript">
        var jxfxjspath = transferProtocol_web + _config['ANLS'] + "/analysis/pages/jxfx2/interface/isShowAnalysisInterface.jsp";
        document.write("<script language=javascript src='" + jxfxjspath + "'><\/script>");
    </script>
    <!--平台定制 js文件
<script type="text/javascript">
    var customjspath = "<%=path%>/style/<%=cssName%>/custom.js?stamp=<%=timestamp %>";
   $.getScript(customjspath);
</script>
 -->
    <!-----------------------------其他模块end    -------------------------------------->
    <script type="text/javascript">
        _naUtil.currPos = 2;//1-上方 2-下方
        var ocxversion = "<%="" %>";//versionpath
        var ip = "<%=ip%>";
        var basePath = "<%=basePath%>";
        var global_basePath = "<%=basePath%>";
        var targetobj;
        var teachernumber = "<%= user.getUsername() %>";
        var teachername = "<%= user.getTruename() %>";
        var teacherjyjg = "<%= user.getSchool().getSchoolId() %>";//不明,基本上是学校id
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
        //学校是否支持平板课堂 0不支持 1NEC平板 2vcom平板 3NEC和vcom平板同时支持； 授课端只支持vcom平板 所以0和1时隐藏平板功能；
        // 为兼容授课端老版电子书包，登录串中如果padTeachAble是2或3时传1 如果是0和1时传0
        var padTeachAble = "<%= user.getSchool().getPadTeachAble() %>";
        if (padTeachAble == "") {
            padTeachAble = 0;
        }
        if (sso_ut == "") {
            var sso_ut = "<%=ut%>";
        }
        //直播校验参数
        var sk = "<%=sk%>";
        var des_sso_domain = "<%=desSsoDomain%>";
        var des_sso_ip = "<%=desSsoIP %>";
        var schoolStage = "<%=schoolStage%>";
        //当前系统时间(供时间比较用)
        var nowtimes =<%=new Date().getTime()+2000%>;
        var loginStyle = "<%=loginStyle%>";//0授课，1预览
        var userclass = "<%=c6%>";
        var userClassType = "";//当前班级类型：行政班，虚拟班
        var userClassName = "";//当前班级名
        var isUseClientAnswer = false;
        if (loginStyle == 1) userclass = null;
        //当前系统时间运行
        $(function () {
            window.setInterval(function () {
                nowtimes += 30000;
            }, 30000);
        });

        setMainTeachSeverPath('<%=ParamValueCache.getTempKey("pls.mainteach.path")%>');
        _common.pls_mainteach_path = '<%=ParamValueCache.getTempKey("pls.mainteach.path")%>';
        // 系统类型：1网络系统;2校园版系统;默认1
        _common.pls_showke_type = '<%=ParamValueCache.getTempKey("pls.showke.type")%>';
        _common.pls_one_filepath = '<%=ParamValueCache.getTempKey("pls.one.filepath")%>';
        _common.pls_one_fileport = '<%=ParamValueCache.getTempKey("pls.one.fileport")%>';
        _common.posterPath = '<%=posterPath%>';
        _common.setCurrServerPath('<%=path%>');
        _common.cssName = "<%=request.getParameter("cssName")%>";//
        var ieBrowser = "<%=request.getParameter("ieBrowser")%>";//是否为ie浏览器模拟授课端登录
        var templateId = "1";//取消电视机、白板选择固定菜单显示在底部
        var whiteBoardFlag =<%=whiteBoardFlag%>;
        var currVersionid = "<%=c2%>";///记录当前用户所选择的版本id

        //各个栏目的默认选中章节
        var defaultSelMap = new Array();//默认各节点选中项{_common.channelid:selectId}

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

        //清楚部分菜单
        function clearUP() {
            /**根据情况显示、隐藏更多菜单 begin***/
            if ('index_0_7' == event.srcElement.id) {

            } else if (1 == _naUtil.mainMoreMenuPosFlag) {

            } else {
                try {
                    document.getElementById('menuMore_window').style.display = "none";
                } catch (e) {
                }
            }
            window.event.returnValue = true;
            /**根据情况显示、隐藏更多菜单 end***/
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

    <!-- 预览顶部工具栏占位弹出层样式 -->
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
<!-- 获取mac地址的控件 begin -->
<jsp:include page="/inc/ieBrowser.jsp" ></jsp:include><!-- 插件 -->
<div class="containers setBg1" id="bg"><!-- 主面板 -->
    <!-- 主面板 -->
    <div class="edibox">
        <!--
            作者：fub@foxmail.com
            时间：2018-07-16
            描述：原header层
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
                    <th class="top-middle"><h2 id="userVersionInfo">数学 &bull; 七年级 &bull; 下学期</h2></th>
                    <th class="w60"><img id="headphoto" src="img/default1.png" width="60" height="60"/></th>
                    <th class="w150">
                        <h5 id="teachername"></h5>
                        <h6 id="className">一年级（1）班</h6>
                    </th>
                </tr>
            </table>
            <div class="pad0-25">
                <div class="address"><h3 class="jieduan" onclick="_naUtil.getNotice();">课堂教学 &gt; 课程 </h3></div>
            </div>
        </DIV>
        <div class="main" id="main">
            <div class="mainLeft" id="mainLeft"></div><!-- 左边栏 -->
            <div class="mainRight">
                <div class="rightCon" id="mainRight"></div>
            </div><!-- 右边栏  -->
        </div>
        <div id=pageRightNav class="page pageRight"></div><!-- 分页 -->
        <div class="subMenu" style="display:block"></div><!-- 三级菜单 -->
        <div class="topMenu" style="display:none">
            <ul id="secendmenu"></ul>
        </div><!-- 二级菜单 -->
        <!-- 底部导航栏开始 -->
        <DIV class=nav sizcache042993950593653474="2" sizset="5">
            <div class="foot">
                <div class="footer">
                    <span class="tongzhi" id="gonggao"></span>
                    <div class="fr">
                        <a class="fr" style="cursor:pointer;" id="outButton" onclick="_naUtil.logout();">
                            <i class="iconY gb"></i>退出</a>
                    </div>
                    <div class="fr">
                        <a class="fr" style="cursor:pointer;" id="sysSet" href="javascript:_sysConfg.openWindow();">
                            <i class="iconY gj"></i>设置</a>
                    </div>
                    <div class="fl" onclick="_naUtil.openYY(this);" id="menu">
                        <a class="fl" style="cursor:pointer;">
                            <i class="iconY yy"></i>应用</a>
                        <ul class="pos-list poos" style="display: none;" id="menuNew">
                        </ul>
                        <ul class="pos-list-more" style=" display: none;" id="menuNewMore">
                        </ul>
                    </div>
                    <div class="fl" onclick="_naUtil.openXk(this);" id="openXk">
                        <a class="fl" style="cursor:pointer;">
                            <i class="iconY xk"></i>选课</a>
                        <ul class="pos-list02 poos" style="display: none;">

                        </ul>
                        <ul class="more-xxk" style="height:0px;overflow-y:auto;">
                            <div class="pad10" id="versionHeight">
                                <span class="zd-more" style="cursor:pointer;"
                                      onclick="_treeVersion.showVersionMore(event);"><i class="ico-up"></i></span>
                                <span class="org-ss" style="cursor:pointer;" onclick="_treeVersion.showVersionPage();">增删备选版本</span>
                            </div>
                        </ul>
                    </div>
                    <!----end----></div>
            </div>
        </DIV>
        <!-- 底部导航栏结束 -->
        <div class="bgNew" onclick="_naUtil.hideBg();"></div>
    </div>
    <div id="usbHint" class="floatHint"></div><!-- u盘面板 -->
    <div id="maskAll"></div><!-- 全局遮罩 -->
    <div id="maskAllDzjc"></div><!-- 全局遮罩 -->
    <div id="maskAllall" style="display: none;"></div><!-- 全局遮罩 -->
    <div id="waithtml" style="display: none;position: absolute;left:40%;top:40%;z-index:100"><!-- 等待面板 -->
        <img src="<%=path%>/images/extanim32.gif"/>
        <span id="messagebox">正在加载数据，请稍后....</span>
    </div>
    <iframe id="iframe_count" src="" style="display: none;"></iframe><!-- 日志设置 -->
    <div id="dzjcDiv" style="width:1022px;height:0px;position: absolute;left:0px;top:0px;z-index:5999;"></div>
    <!--电子教材  -->
    <div class="floatDiv" id="selectPanel" style="display:none;"></div>    <!-- 版本设置面板 -->

    <div class="floatDiv" id="mswkSelectPanel" style="display:none;"></div>    <!-- 名师微课版本设置面板 -->

    <div class="floatDiv" id="commonPanel" style="display:none;">
        <div class=divTop>
            <div class=divClose onclick="void(document.getElementById('commonPanel').style.display='none');"></div>
            <div class=divTitle id='panelTitle'></div>
            <div class="divContent" id='panelContent'>

            </div>
            <div class=page>
                <div class=pageNext><a id='panelClose'
                                       href="javascript:void(document.getElementById('commonPanel').style.display='none');">关
                    闭</a></div>
                <div class=pageNext><a id='panelOk' href="#">确 定</a></div>
            </div>
        </div>
        <div class=divBottom></div>
    </div>    <!-- 公用提示层 -->
    <!--离线作业预览-->
    <div class="floatDiv" id="lxzyView" style="display:none;">
        <div class=divTop>
            <div class=divClose
                 onclick="void(document.getElementById('lxzyView').style.display='none');document.getElementById('maskAll').style.display='none';"></div>
            <div class=divTitle id='lxzyPanelTitle'>离线作业</div>
            <div class="divContent" id='lxzyContent'>
            </div>

            <DIV class=page id="lxzyPage">
            </div>

        </div>
        <div class=divBottom></div>
    </div>
    <!--离线作业详情-->
    <div class="floatDiv" id="lxzyInfo" style="display:none;">
        <div class=divTop>
            <div class=divClose
                 onclick="void(document.getElementById('lxzyInfo').style.display='none');void(document.getElementById('lxzyView').style.display='block');"></div>
            <div class=divTitle id='lxzyInfoTitle'>离线作业</div>
            <div class="divContent" id='lxzyInfoContent'></div>
            <DIV class=page id="lxzyInfoPage">
            </div>
        </div>
        <div class=divBottom></div>
    </div>

    <div class="floatDiv" id="subjectPanel" style="display:none;"><!-- 科目设置面板 -->
        <div class=divTop>
            <div class=divClose onclick="void(document.getElementById('subjectPanel').style.display='none');"></div>
            <div class=divTitle>专题选择！</div>
            <div class="divContent">
                <h3>专题选择：请选择您需要的专题！</h3>
                <div id="subjectPanel_content"></div>
            </div>
            <div class=page>
                <div class=pageNext><a
                        href="javascript:void(document.getElementById('subjectPanel').style.display='none');">关 闭</a>
                </div>
                <div class=pageNext><a
                        href="javascript:void(document.getElementById('subjectPanel').style.display='none');_ssp.refreshSubjectTree();">确
                    定</a></div>
            </div>
        </div>
        <div class=divBottom></div>
    </div>
    <!-- 资源搜索面板 -->
    <!--网络工具-开始-->
    <div class="floatDiv" id="netTools.window">
        <div class="divTop">
            <div class="divClose" onclick="_netTools.closeWindow();"></div>
            <div class="divTitle">资源搜索</div>
            <div class="divContent">
                <h3>请输入搜索内容</h3>
                <dl class="ipSet">
                    <dt>搜索内容：</dt>
                    <dd><input type="text" id="netTools.keyword" maxlength="10" style="width:320px"/></dd>
                </dl>
                <br><br>
                <ul class="divButton">
                    <li class="spaceNetTool">
                        <a id="netTools.googleSearch"
                           href="javascript:resSearch.search(document.getElementById('netTools.keyword').value);">资源搜索</a>
                    </li>
                    <li>
                        <a id="netTools.baiduSearch"
                           href="javascript:_netTools.baiduSearch(document.getElementById('netTools.keyword').value);">百度搜索</a>
                    </li>
                    <li>
                        <a id="netTools.icibaSearch"
                           href="javascript:_netTools.icibaSearch(document.getElementById('netTools.keyword').value);">爱词霸</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="divBottom"></div>
    </div>
    <!--网络工具-结束-->
    <%--
    <OBJECT id="AnswerQuestionTools" align="CENTER" WIDTH=0 HEIGHT=0 classid="clsid:3c782736-05fa-43a4-af03-b7aa96876d99"></OBJECT><br>
    --%>
    <OBJECT id="ClientAnswer" align="CENTER" WIDTH=0 HEIGHT=0
            classid="clsid:F6897699-0EB9-40D7-8641-FCE2C0BE0703"></OBJECT>
    <br>
    <OBJECT id="LessionOcx" align="CENTER" WIDTH=0 HEIGHT=0
            classid="clsid:5DB31BE4-17CE-4767-9A15-7AFC513D1D2D"></OBJECT>
    <br>

    <div class="floatDiv" id="upTrainPanel" style="display:none;"><!-- 提分提示面板 -->
        <DIV class=divTop>
            <DIV class=divClose onclick="upExam.close();"></DIV>
            <DIV class=divTitle>&nbsp;</DIV>
            <DIV class="divContent" style="height:130px">
                <div id="upTrainPanel_content"></div>
            </DIV>
            <span class="clearfix"></span>
            <!-- 提示信息 -->
            <div class="" id="upTrainPanel.tip"></div>
            <div class=page>
                <div class=pageNext><a href="#" onclick="upExam.close();">关 闭</a></div>
            </div>
        </div>
        <div class=divBottom></div>
    </div>

    <!-- 班级收费提示 -->
    <div id="classCostCover"
         style="display:none;background-color:#FFF;width: 100%;height: 100%;position:absolute;z-index: 3;left: 0px;top: 0px;opacity: 0.7;filter: alpha(opacity=70)">
    </div>
    <div class="floatDiv" id="classCostInfo" style="z-index: 5;display:none">
        <div class="divTop">
            <div class="divClose" onclick="classCostClose();"></div>
            <div class="divTitle" id="_commontitle">到期提示</div>
            <div class="divContent">
                <div style="font-size:14px;text-align:left" id="classCostInfoDiv"></div>
            </div>
            <div class="page marR2">
                <div class="pageNext"><a onclick="classCostClose();">退 出</a></div>
            </div>
        </div>
        <div class="divBottom"></div>
    </div>
    <!-- 用户迁移提示 -->
    <div class="floatDiv" id="changeUserDiv" style="display:none">
        <div class="divTop">
            <div class="divClose" onclick="$('#changeUserDiv').css('display','none');"></div>
            <div class="divTitle" id="_commontitle">系统提示</div>
            <div class="divContent">
                <div style="font-size:14px;text-align:left" id="changeUserInfoDiv"></div>
            </div>
            <div class="page marR2">
                <div class="pageNext"><a onclick="$('#changeUserDiv').css('display','none');">关 闭</a></div>
            </div>
        </div>
        <div class="divBottom"></div>
    </div>
    <!-- 版本弹出页面 -->
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
<!--工具箱-->
<jsp:include page="teachTool_config.jsp"></jsp:include>
<!-- 教学工具配置 -->
<jsp:include page="showkeip.jsp"></jsp:include>
<!-- 授课ip配置 -->
<jsp:include page="menu_config.jsp"></jsp:include>
<!-- 菜单配置 -->
<jsp:include page="system_config.jsp"></jsp:include>
<!--系统设置 -->
<jsp:include page="personal_set.jsp"></jsp:include>
<!-- 课程设置 -->
<jsp:include page="inc/commondiv.jsp"></jsp:include>
<!-- 班级设置 -->
<jsp:include page="inc/taskdiv.jsp"></jsp:include>
<!-- 发送任务 -->
<jsp:include page="inc/downloadfile.jsp"></jsp:include>
<!-- 下载面板 -->
<jsp:include page="usb.jsp"></jsp:include>
<!-- 获取mac地址的控件 end -->
<jsp:include page="inc/showMobile.jsp"></jsp:include>
<!--获取手机短信验证码 -->
<script type="text/javascript">
    //判断浏览器
    if ($.browser.msie && (Number($.browser.version) > 6)) {
    } else {
        if (loginStyle != 0) {
            alert("请使用ie浏览器ie7以上版本,否则可能无法正常浏览!");
        }
    }
    //如果是预览模式，隐藏系统设置按钮
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
        /*没装控件会到这*/
        //alert("控件文件处理失败！");
    }
    //读取pad专用配置,并写入cookie
    if (vconfigStr != null && vconfigStr.length > 0) {
        if (vconfigStr.indexOf("platform.deviceType=pad") >= 0) {
            //是PAD客户端
            writeCookie("terminal", "pad", 20);
        }
    }
    //写入升级信息文件
    try {
        ocx.WriteInfo("", "pcupconfig.txt", "&areacode=" + areaId + "&schoolcode=" + schoolId, 0);
    } catch (e) {
        //写入失败
        //alert("控件文件处理失败！");
    }
</script>

<script type="text/javascript">
    _common.setTeacherId(teachernumber);
    /*自动显示教材设置 end*/
    document.onselectstart = function () {
        return false;
    }

    function clearImg() {
        //alert("开始New调用");
        var stauts = '';
        try {
            //新建
            stauts = IInformationOcx.FileNew(true);
        } catch (e) {
            //alert("IInformationOcx.FileNew()执行失败！"+e.toString());
            //alert("请先启动HiteBoard工具！");
            window.status = status;
        }
    }

    clearImg();
    _naUtil.createMenuHtml();
    $('#teachername').html(_common.cutStr(teachername, 5, '', true));
    _treeVersion.getUserHeadPhoto();

    //获取公告
    _naUtil.getNotice();
    //登录保护公告
    /**
     if(infoAllowUseNeed == 1){
	_read.showReadPage();
}
     */
//获取用户所有版本和当前版本以及目录树
//_treeVersion.getUserAllVersionList();
//调整放大倍数
    myZoom.setZoom("#bg");
    zoomStart(myZoom.zoom, ".floatDiv");

    /*_commonDiv.showUserClassName();*/
    _common.addUb("u_shoukelogin", "授课端登录", "");//调用U币接口
</script>

<script type="text/javascript">
    //班级收费提示
    if (loginStyle == 0) {
        mobileShow();
        var classCostFlag = 1;
        try {
            $.getJSON(pls_config_all["SSO.BSS_STATE_SCHOOL"] + "?username=" + teachernumber + "&reqEncoding=gbk&time=" + Math.random() + "&jsoncallback=?", function (res) {
                if (typeof (res.userAble) != "undefined" && !res.userAble) {
                    classCostFlag = 0;
                    document.getElementById("classCostInfoDiv").innerHTML = "尊敬的用户：<br/>&nbsp;&nbsp;&nbsp;&nbsp;您好！<br/>&nbsp;&nbsp;&nbsp;&nbsp;" + res.bssStateFlgTip;
                    document.getElementById("classCostInfo").style.display = "block";
                    document.getElementById("classCostCover").style.display = "block";
                } else if (typeof (res.userAble) != "undefined" && res.userAble && res.bssStateFlg == "2") {
                    classCostFlag = 2;
                    //bssStateFlg 学校运营状态 0:不可用  1：可用 2：保护
                    document.getElementById("classCostInfoDiv").innerHTML = "尊敬的用户：<br/>&nbsp;&nbsp;&nbsp;&nbsp;您好！<br/>&nbsp;&nbsp;&nbsp;&nbsp;" + res.bssStateFlgTip;
                    document.getElementById("classCostInfo").style.display = "block";
                    document.getElementById("classCostCover").style.display = "block";
                }
            });
        } catch (e) {
        }
        //关闭班级收费提示
        //imgMagage.update();//更新客户端主题图片
    }

    function classCostClose() {
        document.getElementById("classCostCover").style.display = "none";
        if (classCostFlag == 0) {
            window.location.href = 'gobackmy://';
        } else {
            document.getElementById("classCostInfo").style.display = "none";
        }
    }

    _teachToolConfigObj.read();//教学工具
    // ypzy.getResList();//初始化云盘资源栏目列表
    //预览模式下判断是否安装控件
    if (loginStyle == "1" && "undefined" == typeof (ocx.GetVersion)) {

        //if(_common.cssName=="tongyong")
        {
            var tempcode = new Array();
            tempcode.push('<div class="floatDiv" id="alertActive" ><div class=divTop><div class=divClose onclick="void(document.getElementById(\'alertActive\').style.display=\'none\');"></div><div class=divTitle>控件未安装</div><div class="divContent" ><H3>请安装控件！</H3><div id="subjectPanel_content" >');
            tempcode.push('您没有安装控件或控件未启用，安装启用之后就可以下载和播放资源啦');
            tempcode.push('</div></div></div><div class=divBottom></div></div>');
            $("#classCostInfo").after(tempcode.join(""));
            $("#alertActive").show();
        }

    }
    if (loginStyle == "0") {
        /*市级专有在线时长统计，校级ut到市级无法对应用户*/
        window.setInterval(getRepeatUserlogin, 295000);
        /*自定义工具*/
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