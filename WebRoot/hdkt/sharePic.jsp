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
    <title>�����ͼ</title>
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
        //�༶����
        var _commonDiv = new commonDiv();

        //�༶ѡ�񹤾���
        function commonDiv() {
            this.callback = null;//�ص�����
            this.unSelectClass = null;//��ѡ��
            this.selDefault = true;//�Ƿ�ѡ��Ĭ�ϰ༶
            this.classDataCache = null;
            this.showtype = 1;//��ʾ��ʽ1��ѡ��2��ѡ
            this.limitGrade = null;//�Ƿ������꼶�������꼶��id--�����,�ָ�
            this.timer = null;//��ʱ��
        }

        //���ýӿڻ�ȡ��ʦ�༶,������ѡ�м���ѡ
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
                        checkedcode = "checked='checked'";//Ĭ��ѡ���Ѿ����ù��İ༶
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
                    classHtml.push("�޷��϶�Ӧ�꼶�İ༶��ѡ!");
                } else {
                    if (null == userclass || "" == userclass || undefined == userclass) {
                        classHtml.push("δ��ȡ��������ѧУ�İ༶��Ϣ������ϵ����Ա��");
                    } else {
                        classHtml.push("��û�м����κΰ༶!�����ͬ��ѧϰ���û����ļ���༶��");
                    }
                }
            }
            $("#userclassset").html(classHtml.join(""));
        }

        //�༶ѡ������-����ѡ��༶��������{classId,className}
        function selectClass() {
            var userselectclass = new Array();
            $("#userclassset input").each(function () {
                if ($(this).attr("checked") && !$(this).attr("disabled")) {
                    userselectclass.push($(this).attr("value"));
                }
            });
            if (userselectclass.length < 1) {
                document.getElementById('net.tip').innerHTML = "��ѡ��༶��";
                return;
            }
            //�û�ȷ����ť
            document.getElementById("classConfig.confirm").disabled = true;
            //custSendType 0,һ����Դ��Ϊһ����Ϣ���ͣ� 1�������Դ�ϲ���һ����Ϣ����
            var url = transferProtocol_server + _config["PLS"] + "/youjiao/saveTuiJianXClass.do?resType=2&custSendType=1";
            var udata = "resId=" + rcodes + "&userName=" + loginInfo.teachernumber + "&userType=2&truename=" + encodeURIComponent(encodeURIComponent(loginInfo.teachername)) + "&sendToClass=" + userselectclass.join(",");
            ajaxJson(url, udata, "gbk", function (r) {
                if (r.failCout > 0) {
                    document.getElementById('net.tip').innerHTML = "����ʧ�ܣ�";
                    closeWindow(2500);
                } else {
                    if (r.msg) {
                        document.getElementById('net.tip').innerHTML = r.msg;
                    } else {
                        document.getElementById('net.tip').innerHTML = "���ͳɹ���";
                    }
                    closeWindow(2000);
                }
            });
        }

        //�رհ༶ѡ�񴰿�
        function closeWindow(times) {
            if (typeof (times) != "undefined") {
                this.timer = setTimeout(closeWindow, times);
            } else {
                if (this.timer != null) clearTimeout(this.timer);
                //���¼��ť
                document.getElementById("classConfig.confirm").disabled = false;
                //�����ʾ��Ϣ
                document.getElementById('net.tip').className = "";
                document.getElementById('net.tip').innerHTML = "";
                //�ر�ҳ��
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
  <div class="divTitle" id="_commontitle">�Ƽ��༶ѡ��</div>
  <div class="divContent" style="height:225px">
	<h3 id="_commonmessage">��ѡ����Ҫ�Ƽ��İ༶��</h3>
	<div id="grade_div">
		<ul class="classSet" id="userclassset"></ul>
		<ul class="classSet" id="userdataset"></ul>
		<span class="clearfix"></span>
	</div>
  </div>
  <span class="clearfix"></span>
  <div class="" id="net.tip" style="color:red" ></div>
  <div class="page marR2">
    <div class="pageNext"><a id="classConfig.close" href="javascript:closeWindow();">�� ��</a></div>
	<div class="pageNext"><a href="#" onclick="selectClass();" id="classConfig.confirm">ȷ ��</a></div>
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