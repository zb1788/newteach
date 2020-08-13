<%@ page language="java" import="java.util.*"
         contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
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
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link rel="stylesheet" type="text/css" href="<%= path%>/teacher/style/common.css"/>
    <base target="_self">
    <SCRIPT type="text/javascript">
        var path1 = '<s:property value="serverinfo.serverpath"/>';
        var vpath1 = '<s:property value="serverinfo.virtualDirectory"/>';

        function checkinput() {
            <s:if test="serverinfo.id==null">
            if (document.getElementById("serverpath").value == "") {
                alert("请输入存储路径!");
                return false;
            }
            var serverpathRE = new RegExp("^[a-zA-Z0-9_]+$");
            if (serverpathRE.exec(document.getElementById("serverpath").value) == null) {
                alert("输入的存储路径不合法!");
                return false;
            }
            if (document.getElementById("virtualDirectory").value == "") {
                alert("请输入虚拟目录!");
                return false;
            }
            var virtualDirectoryRE = new RegExp("^[a-zA-Z0-9_]+$");
            if (virtualDirectoryRE.exec(document.getElementById("virtualDirectory").value) == null) {
                alert("输入的虚拟目录不合法!");
                return false;
            }
            </s:if>
            if (document.getElementById("serversize").value == "") {
                alert("请输入空间大小!");
                return false;
            }
            var serversizeRE = new RegExp("^[0-9.]+$")
            if (serversizeRE.exec(document.getElementById("serversize").value) == null) {
                alert("输入的空间大小不合法,必须为数字!");
                return false;
            }
            document.getElementById("serverpath").value = path1 + "/" + document.getElementById("serverpath").value;
            document.getElementById("virtualDirectory").value = vpath1 + "/" + document.getElementById("virtualDirectory").value;
            return true;
        }

        function samevalue(obj) {
            document.getElementById("virtualDirectory").value = obj.value;
        }
    </SCRIPT>
</head>
<body scroll="no">
<form action="<%=path %>/teacherconfig/tosaveOrUpdateServerConfg.do" method="post" onsubmit="return checkinput();">
    <table width="100%">
        <TR>
            <td>
                <input type="hidden" name="serverinfo.id" value="<s:property value="serverinfo.id"/>">
                <table align="center" width="100%" class="TableForm"
                       cellpadding="3" cellspacing="0">
                    <caption>
                        <s:if test="serverinfo.id!=null">
                            修改配置
                        </s:if>
                        <s:else>
                            添加配置
                        </s:else>
                    </caption>
                    <colgroup>
                        <col width="15%"></col>
                        <col width="35%"></col>
                        <col width="15%"></col>
                        <col width="35%"></col>

                    </colgroup>
                    <tr>
                        <td class="labelTd">
                            存储路径<span class="star">*</span>
                        </td>
                        <td colspan="3">
                            <s:if test="serverinfo.id!=null">
                                <s:textfield id="serverpath" disabled="true" name="serverinfo.serverpath"></s:textfield>
                            </s:if>
                            <s:else>
                                <s:property
                                        value="serverinfo.serverpath"/>/<input type="text" id="serverpath" name="serverinfo.serverpath" style="width:345px;" onkeyup="samevalue(this);">
                            </s:else>

                        </td>
                    </tr>
                    <tr>
                        <td class="labelTd">
                            虚拟目录<span class="star">*</span>
                        </td>
                        <td>
                            <s:if test="serverinfo.id!=null">
                                <s:textfield id="virtualDirectory" disabled="true"
                                             name="serverinfo.virtualDirectory"></s:textfield>
                            </s:if>
                            <s:else>
                                <s:property
                                        value="serverinfo.virtualDirectory"/>/<input type="text" id="virtualDirectory" readonly="readonly" name="serverinfo.virtualDirectory" style="width:100px;">
                            </s:else>
                        </td>
                        <td class="labelTd">
                            空间大小<span class="star">*</span>
                        </td>
                        <td>
                            <input type="text" name="serverinfo.serversize" id="serversize"
                                   value="<s:property value="serverinfo.serversize"/>">
                        </td>
                    </tr>

                    <tr>
                        <td colspan="4" align="center">
                            <input type="submit" class="button" value="[保存]">
                            &nbsp;
                            <input class="button" id="resetNote" type="button"
                                   value="[关闭]" onclick="window.close();">
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
            alert("修改配置成功 !");
            window.returnValue = true;
            window.close()
        }
        ;
    else
        if (message == "addok") {
            alert("添加配置成功!");
            window.returnValue = true;
            window.close()
        }
        ;
    else
        alert(message);
    }
</script>
</body>
</html>

