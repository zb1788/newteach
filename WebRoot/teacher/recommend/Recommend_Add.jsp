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
                alert("��ѡ����Ҫ�Ƽ�����Դ!");
                return false;
            }
            if (getradiovalue(form1.rbMainflag) == "") {
                document.getElementById("onlySchoolRes").value = "";
                alert("��ѡ���Ƽ���Դ�����ļ�!");
                return false;
            }
            if (document.getElementById("RTitle").value == "") {
                document.getElementById("onlySchoolRes").value = "";
                alert("��Դ�����ⲻ��Ϊ��!");
                document.getElementById("RTitle").focus();
                return false;
            }
            if (f__filepatrn.exec(document.getElementById("RTitle").value)) {
                document.getElementById("onlySchoolRes").value = "";
                alert("��Դ�����ⲻ������������ַ�!");
                document.getElementById("RTitle").focus();
                return false;
            }
            <s:if test="onlyAreaRes!=-1">
            if (treecombobox.getValue() == "") {
                alert("��ѡ��У����ԴĿ¼!");
                return false;
            }
            </s:if>
            if (document.getElementById("RDesc").value == "") {
                document.getElementById("onlySchoolRes").value = "";
                alert("��Դ��������Ϊ��!");
                document.getElementById("RDesc").focus();
                return false;
            }
            /*if(f__filepatrn.exec(document.getElementById("RDesc").value)){
                document.getElementById("onlySchoolRes").value="";
                alert("��Դ������������������ַ�!");
                document.getElementById("RDesc").focus();
                return false;
              }*/
            if (document.getElementById("RDesc").value.length > 1800) {
                document.getElementById("onlySchoolRes").value = "";
                alert("��Դ�������Ȳ��ܳ���1800!");
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
                    nextAreaButtonId.value = "��������ҳ����...";
            } else {
                if (onsubmitsId)
                    onsubmitsId.value = "�ύ��..";
            }


            return true;
        }

        function nextAreaFun() {
            //��Ҫ��������ҳ��.
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
            manange_alert: '����',
            manange_message: '�򿪵�ҳ�泬�������ƣ���رղ���Ҫ��ҳ��!',
            combobox_emptyText: '\u8bf7\u9009\u62e9',
            activecombobox_emptyText: '������',
            treecombobox_emptyText: '\u8bf7\u9009\u62e9',
            //openwindow
            openwindow_yes: 'ȷ��',
            openwindow_no: 'ȡ��'
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
                            �������ļ�<span class="star">*</span>
                        </td>
                        <td colspan="3">
                            <div style="float: left" id="selectfile">�������ѡ����Ƽ�����Դ</div>
                            <div style="float: left" id="heddenselectfile"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="labelTd">
                            ����<span class="star">*</span>
                        </td>
                        <td colspan="3">
                            <s:textfield name="teacherRecommened.RTitle" id="RTitle" maxlength="70"
                                         onblur="testsss(this);"></s:textfield>
                        </td>
                    </tr>
                    <tr>
                        <s:if test="onlyAreaRes!=-1">
                            <td class="labelTd">
                                У��Ŀ¼<span class="star">*</span>
                            </td>
                            <td>
                                <div id='RKsId'></div>
                            </td>
                        </s:if>
                        <td class="labelTd">
                            ��Դ����<span class="star">*</span>
                        </td>
                        <td>
                            <select name="RTypecode">
                                <option value="RT001"
                                        <s:if test="teacherRecommened.RTypecode=='RT001'">selected="selected"</s:if>>�̰�
                                </option>
                                <option value="RT002"
                                        <s:if test="teacherRecommened.RTypecode=='RT002'">selected="selected"</s:if>>�ز�
                                </option>
                                <option value="RT003"
                                        <s:if test="teacherRecommened.RTypecode=='RT003'">selected="selected"</s:if>>�μ�
                                </option>
                                <option value="RT004"
                                        <s:if test="teacherRecommened.RTypecode=='RT004'">selected="selected"</s:if>>ϰ��
                                </option>
                                <option value="RT005"
                                        <s:if test="teacherRecommened.RTypecode=='RT005'">selected="selected"</s:if>>
                                    ����ʵ¼
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="labelTd">
                            ������<span class="star">*</span>
                        </td>
                        <td colspan="3">
                            <s:textarea name="teacherRecommened.RDesc" id="RDesc" cssStyle="height: 80px;"
                                        onblur="testsss(this);"></s:textarea>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" align="center">
                            <s:if test="onlyAreaRes!=-1">
                                <input type="submit" class="longbutton" value="�Ƽ���ѧУ" id="onsubmits">
                                &nbsp;
                            </s:if>
                            <s:else>
                                <input type="submit" class="longbutton" value="��һ��" onclick="nextAreaFun()"
                                       id="nextAreaButton">
                                &nbsp;
                            </s:else>
                            <input class="button" id="resetNote" type="button"
                                   value="[�ر�]" onclick="parent.hiderecommendwindow();">
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
            alert("��ӻ����޸ĳɹ� !");
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
    var treecombobox = new treecombobox("RKsId", "У��Ŀ¼", 270, 250, treejson, "<%=path%>/teacherrecommend/getschoolmuenunext.do", <s:property value="rbMainflag" escape="false"/>, true, null, true);
    </s:if>
</script>
</body>
</html>

