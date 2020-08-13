<%@ page language="java" import="java.util.*" pageEncoding="gbk" %>
<%@page import="vcom.teacher.util.ParseXml" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";

    String browser = request.getHeader("user-agent");
    //System.out.println(browser);
    String versionpath = ParseXml.getXmlNode("vcomdownlaod");
%>
<!--弹出窗口-->
<div id='TB_overlay'></div>
<div id='TB_window'>
    <div id="mask" style="display: none"></div>
    <div id="upload2" class="floatDiv" style="display: none">
        <div class="title">
            <a href="javascript:tocloseup();"><img src="images/x.gif"/></a>
            <h5 id="__uploadfile">上传到：根目录</h5>
        </div>
        <span class="clearfix"></span>

        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload">
            <tr class="line">
                <td class="kd1">
                    <button onClick="openDir();" class="button2">选文件夹</button>
                </td>
                <td class="kd1">
                    <button onClick="openFile();" class="button2">选文件</button>
                </td>
                <td class="kd1">
                    <button onClick="tostartupload();" class="button2">开始上传</button>
                </td>
                <td class="href" style="width: 10%"><a href="javascript:void(0);"></a></td>
                <td class="kd2">大小</td>
                <td class="kd2">删除</td>
                <td id="tjHead" class="kd2">推荐</td>
            </tr>
        </table>
        <div class="box" id="startuploadlist">
        </div>
        <div class="tj_area">
            <h6>选择推荐范围</h6>
            <div class="tj_con">
                <h3>班&nbsp;级</h3>
                <ul id="tuijian_ul">
                    <div class="clearfix"></div>
                </ul>
                <div class="clearfix"></div>
            </div>
            <div class="btn_ar"><a href="javascript:void(0);" class="btn9" id="saveTj">确定</a></div>
        </div>

        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload">
            <tr class="gray linet">
                <td id="allfile"><br/><br/></td>
                <td class="kd3" id="allfilesize"><br/><br/></td>
            </tr>
        </table>
    </div>
    <div id="upload" class="floatDiv" style="display: none">
        <div class="title">
            <a href="javascript:tocloseupload();"><img src="<%=path %>/teacher/images/x.gif"/></a>
            <h5 id="__openfile">正在加载资源，请稍候....</h5>
        </div>
        <span class="clearfix"></span>
        <div id="uploadlist">

        </div>
    </div>
</div>


<% if (browser.indexOf("MSIE") >= 0) { %>

<jsp:include flush="true" page="ieBrowser.jsp"></jsp:include>
<%} else if (browser.indexOf("Gecko") != -1 || browser.indexOf("Safari") != -1 || browser.indexOf("WebKit") != -1) { %>
<jsp:include flush="true" page="otherBrowser.jsp"></jsp:include>
<% } else {%>
<jsp:include flush="true" page="ieBrowser.jsp"></jsp:include>
<%} %>
<script>
    if (usertype != '2' && usertype != '3') {

        $('#tjHead').html('&nbsp;');
    }
    //显示上传窗口
    var ocxversion = "<%=versionpath %>";

    function toupload() {
        mask.style.display = "";
        upload2.style.display = "";
        startuploadlist.innerHTML = "";
        if (_fileUtil.currParentObj.dir) {
            if (_fileUtil.currParentObj.dir.length > 35) {
                __uploadfile.innerHTML = "..." + _fileUtil.parentDir.substring(_fileUtil.parentDir.length - 35, _fileUtil.parentDir.length)
            } else {
                __uploadfile.innerHTML = _fileUtil.parentDir || "我的文件夹";
            }
        } else {
            __uploadfile.innerHTML = _fileUtil.parentDir || "我的文件夹";
        }
        //__uploadfile.innerHTML=_fileUtil.currParentObj.dir||"我的文件夹";
        //upload2.style.left=document.documentElement.clientWidth/2-330;
        try {
            TB_show('test', 500, 850);
        } catch (e) {
            e
        }
        //getchangeusesizestate(parseFloat(usesize));
    }

    //关闭上传窗口
    function tocloseup() {
        mask.style.display = "none";
        upload2.style.display = "none";
        //backusesize();
        //reflashteachersize();
        //clearAFile();
        //cleartable();
        cleaninserthtml();
        ftpFileHandler.clearALL();
        $(".tj_area").hide();
        try {
            TB_remove();
        } catch (e) {
        }
    }

    //清空列表
    function toclearallfile() {
        cleartable();
        clearAFile();
    }

    function tostartupload() {
        conectionFtp(_fileUtil.parentDir.replace("我的文件夹", ""));
        ftpFileHandler.restartUpLoad()
    }

    function reflashteachersize() {
        var url = global_basePath + "teacherfile/togetteachersize.do?teachernumber=" + teachernumber + '&ajaxdate=' + new Date();
        sendRequest(function (xml) {
            var size = parseFloat(xml);
            usesize = size;
            getchangeusesizestate(size);
        }, url);/**/
    }
</script>