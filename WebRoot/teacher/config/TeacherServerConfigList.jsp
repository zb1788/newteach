<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <title>�ޱ����ĵ�</title>
    <base href="<%=basePath%>">
    <link href="newSytles/public.css" rel="stylesheet" type="text/css"/>
    <link href="newSytles/sub.css" rel="stylesheet" type="text/css"/>
    <link href="newSytles/tab.css" rel="stylesheet" type="text/css"/>
    <script src="newJs/publicSysParamView.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/public.js"></script>
    <script type="text/javascript">
        function addSysParam(url) {
            var window_parameter = "dialogWidth:550px;dialogHeight:250px;help:no;scroll:auto;status:no";
            var handle = showModalDialog(url, window, window_parameter);
            if (handle) {
                window.location.href = "<%=path%>/teacherconfig/getServerConfgList.do";
            }
        }

        function loadSysParamList() {
            window.location = "system/sysParam.do";
        }
    </script>
</head>
<body>

<table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
        <td height="23">
            <h5 class="right_title">
                ��ʦ�ļ��д洢�ռ�����
            </h5>
        </td>
    </tr>
    <tr>
        <!--<td><a href="system/sysParamAdd.do">���</a>  -->
        <td align="right">
            <input name="Submit" type="button" class="ButtonStyle" value="���"
                   onclick="javascript:addSysParam('<%=path%>/teacherconfig/system/toServerConfigAddPage.do');"/>
        </td>
    </tr>
</table>

<table width="100%" border="0" align="center" cellpadding="0" cellspacing="1" class="TableBorderStyle" name="DataTable"
       onmouseover="changeto()" onmouseout="changeback()">
    <tr class="TableTdBgStyle">
        <td width="60" align="center">���</td>
        <td width="150" align="center">���</td>
        <td width="150" align="center">�洢·��</td>
        <td width="80" align="center">����Ŀ¼</td>
        <td width="80" align="center">�ռ��С</td>
        <td width="80" align="center">�Ѿ�ʹ��</td>
        <td width="80" align="center">����</td>
    </tr>
    <s:iterator value="list" id="paramlist" status="st">
        <tr>
            <td align="left"><s:property value="#st.index+1"/></td>
            <td align="left" style="word-break:break-all"><s:property value="serverip" escape="false"/></td>
            <td align="left" style="word-break:break-all"><s:property value="serverpath" escape="false"/></td>
            <td align="left" style="word-break:break-all"><s:property value="virtualDirectory" escape="false"/></td>
            <td align="right" style="word-break:break-all"><s:property value="serversize" escape="false"/>G</td>
            <td align="right" style="word-break:break-all"><s:property value="usesize" escape="false"/>G</td>
            <td align="center">
                <a href="javascript:addSysParam('<%=path%>/teacherconfig/system/toServerConfigAddPage.do?serverinfo.id=<s:property value='id' />');">�޸�</a>
                <s:if test="id!=1">
                    |<a href="<%=path%>/teacherconfig/todeleteServerConfig.do?serverinfo.id=<s:property value='id'/>">ɾ��</a>
                </s:if>
            </td>
        </tr>
    </s:iterator>
</table>
<script type="text/javascript">
    var message = "<%=request.getAttribute("message")%>"
    if (message != "null") {
        if (message == "ok") {
            alert("ɾ�����óɹ�!")
        }
        ;
    else
        alert(message);
    }
</script>
</body>

</html>