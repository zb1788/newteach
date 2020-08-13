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
    <title>无标题文档</title>
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
                教师文件夹存储空间配置
            </h5>
        </td>
    </tr>
    <tr>
        <!--<td><a href="system/sysParamAdd.do">添加</a>  -->
        <td align="right">
            <input name="Submit" type="button" class="ButtonStyle" value="添加"
                   onclick="javascript:addSysParam('<%=path%>/teacherconfig/system/toServerConfigAddPage.do');"/>
        </td>
    </tr>
</table>

<table width="100%" border="0" align="center" cellpadding="0" cellspacing="1" class="TableBorderStyle" name="DataTable"
       onmouseover="changeto()" onmouseout="changeback()">
    <tr class="TableTdBgStyle">
        <td width="60" align="center">序号</td>
        <td width="150" align="center">编号</td>
        <td width="150" align="center">存储路径</td>
        <td width="80" align="center">虚拟目录</td>
        <td width="80" align="center">空间大小</td>
        <td width="80" align="center">已经使用</td>
        <td width="80" align="center">操作</td>
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
                <a href="javascript:addSysParam('<%=path%>/teacherconfig/system/toServerConfigAddPage.do?serverinfo.id=<s:property value='id' />');">修改</a>
                <s:if test="id!=1">
                    |<a href="<%=path%>/teacherconfig/todeleteServerConfig.do?serverinfo.id=<s:property value='id'/>">删除</a>
                </s:if>
            </td>
        </tr>
    </s:iterator>
</table>
<script type="text/javascript">
    var message = "<%=request.getAttribute("message")%>"
    if (message != "null") {
        if (message == "ok") {
            alert("删除配置成功!")
        }
        ;
    else
        alert(message);
    }
</script>
</body>

</html>