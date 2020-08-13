<%@ page language="java" import="java.util.*"
         contentType="text/html; charset=gbk" pageEncoding="gbk" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<%
    String path = request.getContextPath();
    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gbk"/>
    <title></title>
    <link rel="stylesheet" type="text/css" href="<%= path%>/teacher/style/common.css"/>
    <link rel="stylesheet" id="ext-all-css" type="text/css" href="<%= path%>/ext/resources/css/ext-all.css"/>
    <script type="text/javascript" src="<%= path%>/teacher/js/common.js"></script>
    <base target="_self">
    <SCRIPT type="text/javascript">
        var path1 = '<s:property value="serverinfo.serverpath"/>';
        var vpath1 = '<s:property value="serverinfo.virtualDirectory"/>';

        function checkinput() {

            if (document.getElementById("RKsId_1") && document.getElementById("RKsId_name"))
                document.getElementById("RKsId_name").value = document.getElementById("RKsId_1").value;


            var f__filepatrn = /[&><?"*:\/|\\]/;
            if (document.getElementById("heddenselectfile").value == "") {
                document.getElementById("onlySchoolRes").value = "";
                alert("请选择需要推荐的资源!");
                return false;
            }
            if (getradiovalue(form1.rbMainflag) == "") {
                document.getElementById("onlySchoolRes").value = "";
                alert("请选择推荐资源的主文件!");
                return false;
            }
            if (document.getElementById("RTitle").value == "") {
                document.getElementById("onlySchoolRes").value = "";
                alert("资源包标题不能为空!");
                document.getElementById("RTitle").focus();
                return false;
            }
            if (f__filepatrn.exec(document.getElementById("RTitle").value)) {
                document.getElementById("onlySchoolRes").value = "";
                alert("资源包标题不允许包括特殊字符!");
                document.getElementById("RTitle").focus();
                return false;
            }
            <s:if test="onlyAreaRes!=-1">
            if (treecombobox.getValue() == "") {
                alert("请选择校本资源目录!");
                return false;
            }
            </s:if>
            if (document.getElementById("RDesc").value == "") {
                document.getElementById("onlySchoolRes").value = "";
                alert("资源描述不能为空!");
                document.getElementById("RDesc").focus();
                return false;
            }
            /*if(f__filepatrn.exec(document.getElementById("RDesc").value)){
                document.getElementById("onlySchoolRes").value="";
                alert("资源描述不允许包括特殊字符!");
                document.getElementById("RDesc").focus();
                return false;
              }*/
            if (document.getElementById("RDesc").value.length > 1800) {
                document.getElementById("onlySchoolRes").value = "";
                alert("资源描述长度不能超过1800!");
                document.getElementById("RDesc").focus();
                return false;
            }
            var onsubmitsId = document.getElementById("onsubmits");
            var nextAreaButtonId = document.getElementById("nextAreaButton");
            if (onsubmitsId)
                onsubmitsId.disabled = true;

            if (nextAreaButtonId)
                nextAreaButtonId.disabled = true;

            if (document.getElementById("onlySchoolRes").value == "1") {
                if (nextAreaButtonId)
                    nextAreaButtonId.value = "进入区域页面中...";
            } else {
                if (onsubmitsId)
                    onsubmitsId.value = "提交中..";
            }


            return true;
        }

        function nextAreaFun() {
            //需要进入区域页面.
            document.getElementById("onlySchoolRes").value = "1";
            document.getElementById("nextAreaButton").click();
        }

        function samevalue(obj) {
            document.getElementById("virtualDirectory").value = obj.value;
        }

        function testsss(obj) {
            var ele = obj;
            if (ele.skip) return;
            if (ele.className == "Wdate") return;
            if ((ele.type == 'text' || ele.type == 'textarea') && ((ele.name != 'beginTime') && (ele.name != 'endTime'))) {
                var eleValue = ele.value;
                var array = "[&|<|>|%|#|~ ,:\?'\"/\\\\]";
                eleValue = eleValue.replace(new RegExp(array, "gm"), "");
                ele.value = eleValue;
            }
        }

        var ____object = [];
        var vcomframe = {
            //path:top.path,
            allpath: '',
            sigpath: '',
            timeout: 30000,
            //combobox
            manange_alert: '警告',
            manange_message: '打开的页面超过了限制，请关闭不需要的页面!',
            combobox_emptyText: '\u8bf7\u9009\u62e9',
            activecombobox_emptyText: '请输入',
            treecombobox_emptyText: '\u8bf7\u9009\u62e9',
            //openwindow
            openwindow_yes: '确定',
            openwindow_no: '取消'
        }
    </SCRIPT>
</head>
<body>

<script type="text/javascript" src="<%= path%>/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%= path%>/ext/ext-all.js"></script>
<script type="text/javascript" src="<%= path%>/ext/ComboBox.js"></script>
<form action="<%=path %>/teacherrecommend/recommendedFiles.do" method="post" onsubmit="return checkinput();"
      name="form1">
    <table width="100%">
        <TR>
            <td>
                <input type="hidden" name="onlySchoolRes" id="onlySchoolRes">
                <s:hidden id="onlyAreaRes" name="onlyAreaRes"></s:hidden>
                <input type="hidden" name="RKsId_name" id="RKsId_name" value="<s:property value="RKsId_name"  />">
                <input type="hidden" name="teacherRecommened.id" id="id"
                       value="<s:property value="teacherRecommened.id"  />">
                <table align="center" width="100%" class="TableForm"
                       cellpadding="3" cellspacing="0">
                    <colgroup>
                        <col width="15%"></col>
                        <col width="50%"></col>
                        <col width="10%"></col>
                        <col width="25%"></col>

                    </colgroup>
                    <tr>
                        <td class="labelTd">
                            设置主文件<span class="star">*</span>
                        </td>
                        <td colspan="3">
                            <div style="float: left" id="selectfile">请在左侧选择待推荐的资源</div>
                            <div style="float: left" id="heddenselectfile"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="labelTd">
                            标题<span class="star">*</span>
                        </td>
                        <td colspan="3">
                            <s:textfield name="teacherRecommened.RTitle" id="RTitle" maxlength="70"
                                         onblur="testsss(this);"></s:textfield>
                        </td>
                    </tr>
                    <tr>
                        <s:if test="onlyAreaRes!=-1">
                            <td class="labelTd">
                                校本目录<span class="star">*</span>
                            </td>
                            <td>
                                <div id='RKsId'></div>
                            </td>
                        </s:if>
                        <td class="labelTd">
                            资源类型<span class="star">*</span>
                        </td>
                        <td>
                            <select name="RTypecode">
                                <option value="RT001"
                                        <s:if test="teacherRecommened.RTypecode=='RT001'">selected="selected"</s:if>>教案
                                </option>
                                <option value="RT002"
                                        <s:if test="teacherRecommened.RTypecode=='RT002'">selected="selected"</s:if>>素材
                                </option>
                                <option value="RT003"
                                        <s:if test="teacherRecommened.RTypecode=='RT003'">selected="selected"</s:if>>课件
                                </option>
                                <option value="RT004"
                                        <s:if test="teacherRecommened.RTypecode=='RT004'">selected="selected"</s:if>>习题
                                </option>
                                <option value="RT005"
                                        <s:if test="teacherRecommened.RTypecode=='RT005'">selected="selected"</s:if>>
                                    课堂实录
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="labelTd">
                            描述：<span class="star">*</span>
                        </td>
                        <td colspan="3">
                            <s:textarea name="teacherRecommened.RDesc" id="RDesc" cssStyle="height: 80px;"
                                        onblur="testsss(this);"></s:textarea>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" align="center">
                            <s:if test="onlyAreaRes!=-1">
                                <input type="submit" class="longbutton" value="推荐到学校" id="onsubmits">
                                &nbsp;
                            </s:if>
                            <s:else>
                                <input type="submit" class="longbutton" value="下一步" onclick="nextAreaFun()"
                                       id="nextAreaButton">
                                &nbsp;
                            </s:else>
                            <input class="button" id="resetNote" type="button"
                                   value="[关闭]" onclick="parent.hiderecommendwindow();">
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</form>
<script type="text/javascript">
    var message = "<%=request.getAttribute("message")%>"
    if (message != "null") {
        if (message == "ok") {
            alert("添加或者修改成功 !");
            parent.hiderecommendwindow();
        } else
            alert(message);
    }
    var createselectfile = "", selectfilecodes = "";
    var filejson =<s:property value="filejson" escape="false"/>;
    if (filejson.length == 0) {
        try {
            var selectfilecode = parent._fileUtil.getSelectedFcodes().split(",");
            for (var i = 0; i < selectfilecode.length; i++) {
                var filei = parent._fileUtil.getFileObjByFcode(selectfilecode[i]);
                if (i == 0) {
                    createselectfile += "<input type=\"radio\" class=\"radio\" name=\"rbMainflag\" value='" + selectfilecode[i] + "' checked=\"checked\">" + filei.fileName;
                    selectfilecodes += selectfilecode[i];
                } else {
                    createselectfile += "<input type=\"radio\" class=\"radio\" name=\"rbMainflag\" value='" + selectfilecode[i] + "'>" + filei.fileName;
                    selectfilecodes += "," + selectfilecode[i];
                }
            }
        } catch (e) {
        }
    } else {
        for (var i = 0; i < filejson.length; i++) {
            if (i == 0) {
                selectfilecodes += filejson[i].SId;
            } else {
                selectfilecodes += "," + filejson[i].SId;
            }
            if (filejson[i].rbFormat != "forder")
                createselectfile += "<input type=\"radio\" class=\"radio\" name=\"rbMainflag\" value='" + filejson[i].SId + "' " + (filejson[i].rbMainflag == 1 ? "checked" : "") + ">" + filejson[i].rbFilename;
        }
    }
    selectfilecodes = "<input type='hidden' id='selectfilecodes' name='selectfilecodes' value='" + selectfilecodes + "'>"
    if (createselectfile != "") document.getElementById("selectfile").innerHTML = createselectfile + "&nbsp;";
    document.getElementById("heddenselectfile").innerHTML = selectfilecodes;
    <s:if test="onlyAreaRes!=-1">
    Ext.BLANK_IMAGE_URL = '<%= path%>/etc/images/s.gif';
    var treejson =<s:property value="treejson" escape="false"/>;
    var treecombobox = new treecombobox("RKsId", "校本目录", 270, 250, treejson, "<%=path%>/teacherrecommend/getschoolmuenunext.do", <s:property value="rbMainflag" escape="false"/>, true, null, true);
    </s:if>
</script>
</body>
</html>

