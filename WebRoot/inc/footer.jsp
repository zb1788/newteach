<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
%>
<!--
<div class="footer">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td class="bottomlogo" align="left" width="30%"></td>
<td align="right" width="70%">
<table border="0" cellpadding="0" cellspacing="0" align="right" height="50">
<tr>
<td>
<ul id="navTool">
<li>
<a href="#" onclick="_usbObj.invisible();_commonDiv.getUserClass();_commonDiv.getUserClass();_commonDiv.openWindow();">班级设置</a>
</li>
<li>
<a href="#" onclick="_usbObj.invisible();gradeManage();">课程设置</a>
</li>
<li>
<a href="#" onclick="_sysConfg.openWindow();">系统设置</a>
</li>
<! 天士博： 板书工具、教学工具、白板定位 >
<li id="urlbook" style="display: none">
<a href="#" title="天士博" onclick="_teachTools.openBoardTool()";>板书工具</a>
</li>
<li id="urledu" style="display: none">
<a href="#" title="天士博" onclick="_teachTools.openTeachTool();">教学工具</a>
</li>
<! 红河： 白板工具、清除记录、白板定位 >
<li id="newTool" style="display: none">
<a href="#" title="鸿合" onclick="_teachTools.openBoardTool()";>白板工具</a>
</li>
<li id="clearImgCache" style="display: none">
<a href="#" title="鸿合" onclick="_footTools.clearImgCache();";>清除记录</a>
</li>


<li id="teachToolConfigs.name0" style="display: none">
<a href="javascript:_teachToolConfigObj.openExe(0);"
id="teachToolConfigs.name0_id">***</a>
</li>
<li id="teachToolConfigs.name1" style="display: none">
<a href="javascript:_teachToolConfigObj.openExe(1);"
id="teachToolConfigs.name1_id">***</a>
</li>
<li id="teachToolConfigs.name2" style="display: none">
<a href="javascript:_teachToolConfigObj.openExe(2);"
id="teachToolConfigs.name2_id">***</a>
</li>

<li id="softkeyborard" style="display: none">
<a href="#" style="background-image: url('images/hao.jpg')" onclick="ocx.playFile('C:\\WINDOWS\\system32\\osk.exe');">软键盘</a>
</li>

<li>
<a href="#" onclick="_footTools.logout();">用户退出</a>
</li>


</ul>
</td>
</tr>
</table>
</td>
</tr>
</table>
</div>
-->
<div style="display: none;" id="softkeyborarddiv">
    <!--<div>
        <ul id="navTool">

            <li id="softkeyborard">
                <a href="#" onclick="ocx.playFile('C:\\WINDOWS\\system32\\osk.exe');">软键盘</a>
            </li>

        </ul>
    </div>-->
</div>
<%
    String templateId = new String(request.getParameter("templateId"));
    String whiteBoardFlag = new String(request.getParameter("whiteBoardFlag"));
    String footerCss = "";//背景样式
%>
<div style="display: none">
</div>
<SCRIPT LANGUAGE="JavaScript">
    var _footTools = new FootTools();

    //
    function FootTools() {
    }

    //_footTools.getwhiteBoardFlag();
    FootTools.prototype.getwhiteBoardFlag = function () {
        var whiteBoardFlag = 2;
        // alert();
        var urledu = "";
        var urlbook = "";
        //相同是红河、不相同是天士博
        try {
            urlbook = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urlbook");
            //alert("urlbook="+urlbook);
            urledu = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\urledu");
            //alert(whiteBoardPath.length);
        } catch (e) {
            window.status = '获得电子白板类型失败！';
            //alert('获得电子白板类型失败！');
            //return whiteBoardFlag;
        }
        // alert();
        // alert("urlbook="+urlbook);
        // alert("urledu="+urledu);
        if (urlbook.length > 0 && urledu.length > 0) {
            if (urlbook == urledu) whiteBoardFlag = 1;
            else whiteBoardFlag = 3;

        } else {
            whiteBoardFlag = 2;//2-没配置（认为是新版本） 1-相同红河 3-不相同
        }


        return whiteBoardFlag;
    }//end of footTools.getwhiteBoardFlag(str);


    //_footTools.logout();
    FootTools.prototype.logout = function () {
        try {
            IInformationOcx.FileNew(true);
        } catch (e) {
        }//end of try/catch
        //location.href='<%=path%>/newteach/index.html'
        location.href = "gobackmy://";
    }
    //_footTools.clearImgCache();
    FootTools.prototype.clearImgCache = function () {
        var stauts = 0;
        try {
            // 新建
            if (IInformationOcx.IsEnvironmentStart() == 1) {
                if (window.confirm("确定要清除板书记录？")) {
                    stauts = 1;
                    IInformationOcx.FileNew(true);
                }
            } else {
                alert("请先启动白板工具！");
            }

        } catch (e) {
            try {
                if (stauts == 0) {
                    if (window.confirm("确定要清除板书记录？")) {
                        IInformationOcx.FileNew(true);
                    }
                } else {
                    alert("清除记录出错！");
                }
            } catch (ee) {
                alert("清除记录出错！");
            }
        }
    }
    //_footTools.createFootTools(str);
    FootTools.prototype.createFootTools = function (str) {

        if (2 == '<s:property value="#parameters.templateId"/>') {
            //2 -tv
            document.getElementById("softkeyborard").style.display = "";
            document.getElementById("softkeyborarddiv").style.display = "";
            return;
        } else {//PC

            // 2-没配置（认为是新版本） 1-相同红河 3-不相同
            var whiteBoardFlag = _footTools.getwhiteBoardFlag();
            ;
            // alert(whiteBoardFlag);
            _tUtil.whiteBoardFlag = whiteBoardFlag;
            /************/
            _teachToolConfigObj.read();
            var c = 0;
            //不管是不是鸿合均显示第一个按钮
            if (_teachToolConfigObj.name0 && _teachToolConfigObj.name0.length > 0) {
                c++;
                document.getElementById("teachToolConfigs.name0").style.display = '';
                document.getElementById("teachToolConfigs.name0_id").innerHTML = _teachToolConfigObj.name0;
            }
            if (2 == whiteBoardFlag) {//新版本，从配置文件中获取
                if (2 == _teachToolConfigObj.currType) {
                    //document.getElementById("tools.softkeyborard").style.display='';
                    //document.getElementById("tools.softkeyborard_float").style.display='';
                    if (_teachToolConfigObj.name1 && _teachToolConfigObj.name1.length > 0) {
                        c++;
                        document.getElementById("teachToolConfigs.name1").style.display = '';
                        document.getElementById("teachToolConfigs.name1_id").innerHTML = _teachToolConfigObj.name1;
                    }
                    if (_teachToolConfigObj.name2 && _teachToolConfigObj.name2.length > 0) {
                        c++;
                        document.getElementById("teachToolConfigs.name2").style.display = '';
                        document.getElementById("teachToolConfigs.name2_id").innerHTML = _teachToolConfigObj.name2;
                    }
                    if (c == 0) {
                        document.getElementById("softkeyborard").style.display = "";
                        document.getElementById("softkeyborarddiv").style.display = "";
                    }
                } else if (1 == _teachToolConfigObj.currType) {//红河
                    document.getElementById("newTool").style.display = "";
                    document.getElementById("clearImgCache").style.display = "";
                } else {
                    //显示软键盘
                    document.getElementById("softkeyborard").style.display = "";
                    document.getElementById("softkeyborarddiv").style.display = "";
                }//end of if-else if -else
                return;

            } else {
                //alert('old');//旧方法
                if (3 == whiteBoardFlag) {
                    document.getElementById("urlbook").style.display = "";
                    document.getElementById("urledu").style.display = "";
                    return;
                    //}else if(1=='<s:property value="#parameters.whiteBoardFlag"/>'){
                } else if (1 == whiteBoardFlag) {
                    document.getElementById("newTool").style.display = "";
                    document.getElementById("clearImgCache").style.display = "";
                    return;
                }
            }
        }//end of if-else(模板)
        return;
        /***
         var js=""
         var name="工具"
         //alert(str);
         var flag=true;
         var subjects=new Array("语文","数学","物理","化学","英语");
         for(var i=0;i<subjects.length;i++){
        if(str.indexOf(subjects[i])>=0){
           name=subjects[i]+name;
           flag=false;
           //数学:1、物理:2、化学:4、语文:8、英语:16
           var param;
           if(0==i){
             param=8;//语文
           }else if(1==i){
             param=1;//数学
           }else if(2==i){
             param=2;//物理
           }else if(3==i){
              param=4;//化学
           }else if(4==i){
               param=16;//英语
           }
           js='javascript:_footTools.createFootTool( '+param+' );';
           break;
        }
     }// end of for


         var h='<a href="'+js+'">'+name+'</a>';
         //alert(h);
         //alert(h+"  "+document.getElementById("navTool").innerHTML);
         document.getElementById("newTool").innerHTML=h;
         if(flag)
         document.getElementById("newTool").style.display="none";
         else
         document.getElementById("newTool").style.display="";
         */
    }//end of

    //_footTools.createFootTool(str);
    FootTools.prototype.createFootTool = function (param) {
        var status = '';
        try {
            IInformationOcx.ShowSubjectToolbars(false, 31);
            status = IInformationOcx.ShowSubjectToolbars(1, param);
        } catch (e) {
            alert("请先启动HiteBoard工具！");
            window.status = status;
        }
        //alert(status);
    }//end of footTools.createFootTool(str);


</SCRIPT>
<SCRIPT LANGUAGE="JavaScript">
    var _wb = new WhiteBoardObj();

    //白板对象
    function WhiteBoardObj() {
    }

    //打开白板
    WhiteBoardObj.prototype.openWhiteBoard = function () {
        maskAll.style.display = 'block';
        location.href = "mybank://zzvcom";
        setTimeout(function () {
            maskAll.style.display = 'none';
        }, 1000);//若干秒后亦隐藏遮盖层
    }

</SCRIPT>