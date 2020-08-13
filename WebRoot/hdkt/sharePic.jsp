<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    String loginInfo = request.getParameter("data");
    String rcodes = request.getParameter("rcode");
    if (loginInfo == null) {
        loginInfo = "null";
    }
    if (rcodes == null) {
        rcodes = "null";
    }
    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
    response.setDateHeader("Last-Modified", new Date().getTime());
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html style="overflow-y:auto">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <meta http-equiv="x-ua-compatible" content="ie=7,ie=8,ie=9"/>
    <title>分享截图</title>
    <!-- link href="<%=path%>/style/default.css" rel="stylesheet" type="text/css" /  -->
    <script type="text/javascript" src="<%=path%>/script/jquery172min.js"></script>
    <jsp:include page="/js/config_pls_include.jsp" ></jsp:include><!-- config_pls.js -->
    <script type="text/javascript" src="<%=path%>/js/ajax_common.js"></script>
    <script type="text/javascript" src="<%=path%>/js/MyZoom_4k.js"></script>
    <style type="text/css">
        * {
            margin: 0px;
            padding: 0px;
            font-size: 14px
        }

        ul {
            list-style: none;
            float: left;
        }

        li {
            list-style: none;
            float: left;
            width: 175px;
            margin-left: 30px;
            overflow: hiden
        }
    </style>
    <script type="text/javascript">
        var loginInfo =<%=loginInfo%>;
        var rcodes = '<%=rcodes%>';
        //班级对象
        var _commonDiv = new commonDiv();

        //班级选择工具类
        function commonDiv() {
            this.callback = null;//回调方法
            this.unSelectClass = null;//禁选项
            this.selDefault = true;//是否选中默认班级
            this.classDataCache = null;
            this.showtype = 1;//显示方式1单选、2多选
            this.limitGrade = null;//是否限制年级、限制年级的id--多个以,分隔
            this.timer = null;//定时器
        }

        //调用接口获取教师班级,并处理选中及禁选
        function getClassData() {
            try {
                var data = "queryType=byUserName&userName=" + loginInfo.teachernumber;
                var myDate = new Date();
                ajaxJson(pls_config_all["TMS.401"], data, "gbk", function (result) {
                    if (result && result.rtnArray && result.rtnArray.length > 0) {
                        _commonDiv.classDataCache = new Array();
                        $(result.rtnArray).each(function () {
                            _commonDiv.classDataCache.push({
                                classId: $(this).attr("classId"),
                                className: $(this).attr("className"),
                                gradeCode: $(this).attr("gradeCode")
                            });
                        });
                    }
                    showClassList(_commonDiv.classDataCache);
                });
            } catch (e) {
                alert(e);
            }
        }

        function showClassList(classArray) {
            var classHtml = new Array();
            if (classArray != null && classArray.length > 0) {
                for (var i = 0; i < classArray.length; i++) {
                    var temp = classArray[i];
                    var checkedcode = "";
                    if (loginInfo.classId == temp.classId) {
                        checkedcode = "checked='checked'";//默认选中已经设置过的班级
                    }
                    var botype = "checkbox";
                    if (_commonDiv.showtype != 1) {
                        botype = "radio";
                    }
                    classHtml.push('<li><input name="userclass" ' + checkedcode + ' type="' + botype + '" classname="' + temp.className + '" value="' + temp.classId + '" />' + temp.className + '</li>');
                    temp = null;
                }
            }
            if (classHtml.length == 0) {
                if (typeof (_commonDiv.limitGrade) != "undefined" && _commonDiv.limitGrade != null) {
                    classHtml.push("无符合对应年级的班级可选!");
                } else {
                    if (null == userclass || "" == userclass || undefined == userclass) {
                        classHtml.push("未获取到你所在学校的班级信息！请联系管理员！");
                    } else {
                        classHtml.push("你没有加入任何班级!请进入同步学习网用户中心加入班级！");
                    }
                }
            }
            $("#userclassset").html(classHtml.join(""));
        }

        //班级选择处理方法-返回选择班级对象数组{classId,className}
        function selectClass() {
            var userselectclass = new Array();
            $("#userclassset input").each(function () {
                if ($(this).attr("checked") && !$(this).attr("disabled")) {
                    userselectclass.push($(this).attr("value"));
                }
            });
            if (userselectclass.length < 1) {
                document.getElementById('net.tip').innerHTML = "请选择班级！";
                return;
            }
            //置灰确定按钮
            document.getElementById("classConfig.confirm").disabled = true;
            //custSendType 0,一个资源作为一条信息发送； 1，多个资源合并成一个信息发送
            var url = transferProtocol_server + _config["PLS"] + "/youjiao/saveTuiJianXClass.do?resType=2&custSendType=1";
            var udata = "resId=" + rcodes + "&userName=" + loginInfo.teachernumber + "&userType=2&truename=" + encodeURIComponent(encodeURIComponent(loginInfo.teachername)) + "&sendToClass=" + userselectclass.join(",");
            ajaxJson(url, udata, "gbk", function (r) {
                if (r.failCout > 0) {
                    document.getElementById('net.tip').innerHTML = "发送失败！";
                    closeWindow(2500);
                } else {
                    if (r.msg) {
                        document.getElementById('net.tip').innerHTML = r.msg;
                    } else {
                        document.getElementById('net.tip').innerHTML = "发送成功！";
                    }
                    closeWindow(2000);
                }
            });
        }

        //关闭班级选择窗口
        function closeWindow(times) {
            if (typeof (times) != "undefined") {
                this.timer = setTimeout(closeWindow, times);
            } else {
                if (this.timer != null) clearTimeout(this.timer);
                //重新激活按钮
                document.getElementById("classConfig.confirm").disabled = false;
                //清除提示信息
                document.getElementById('net.tip').className = "";
                document.getElementById('net.tip').innerHTML = "";
                //关闭页面
                location.href = "close://";
            }
        };
    </script>
</head>
<body style="overflow:hiden">
<div id="bodyDiv" style="width:650px;height:250px;">
    <div style="height:145px;margin-top:20px;line-height:20px">
        <ul id="userclassset">
        </ul>
    </div>
    <div style="text-align:center;height:85px">
        <!-- hr style="margin:0px;padding:0px"/  -->
        <div id="net.tip" style="text-align:center;height:25px;color:red"></div>
        <a id="classConfig.confirm" href="javascript:selectClass();" style="margin-right:40px"><img border="0"
                                                                                                    src="image/btn_ok.png"/></a>
        <a id="classConfig.close" href="javascript:closeWindow();"><img border="0" src="image/btn_close.png"/></a>
    </div>
</div>
<!-- 
<div id="class_commondivWindow" class="floatDiv" style="display:block;top:0px">
  <div class="divTop">
  <div class="divClose" onclick="closeWindow();"></div>
  <div class="divTitle" id="_commontitle">推荐班级选择</div>
  <div class="divContent" style="height:225px">
	<h3 id="_commonmessage">请选择您要推荐的班级！</h3>
	<div id="grade_div">
		<ul class="classSet" id="userclassset"></ul>
		<ul class="classSet" id="userdataset"></ul>
		<span class="clearfix"></span>
	</div>
  </div>
  <span class="clearfix"></span>
  <div class="" id="net.tip" style="color:red" ></div>
  <div class="page marR2">
    <div class="pageNext"><a id="classConfig.close" href="javascript:closeWindow();">关 闭</a></div>
	<div class="pageNext"><a href="#" onclick="selectClass();" id="classConfig.confirm">确 定</a></div>
  </div>
 </div>
 <div class="divBottom"></div>
</div>
 -->
<script type="text/javascript">
    getClassData();
    if (screen.width > 2600) {
        myZoom.baseWidth = 610;
        myZoom.baseHeight = 270;
        myZoom.setZoom('#bodyDiv');
    }
</script>
</body>
</html>