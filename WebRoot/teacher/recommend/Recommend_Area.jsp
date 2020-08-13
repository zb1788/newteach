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
    <base target="_self">
    <link rel="stylesheet" type="text/css" href="<%= path%>/teacher/style/common.css"/>
    <link rel="stylesheet" id="ext-all-css" type="text/css" href="<%= path%>/ext/resources/css/ext-all.css"/>
    <script type="text/javascript" src="<%= path%>/teacher/js/common.js"></script>
    <script type="text/javascript" src="<%= path%>/ext/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="<%= path%>/ext/ext-all.js"></script>
    <script type="text/javascript" src="<%=path%>/ext/tree.js"></script>
    <script type="text/javascript" src="<%=path%>/ext/tree-expend-checkbox.js"></script>


</head>
<body>
<form action="<%=path %>/teacherrecommend/recommendedFileArea.do" method="post" onsubmit="return checkinput();"
      name="finalForm">
    <div id="hiddenKsIdDiv"></div>
    <s:hidden name="teacherRecommened.RCode"></s:hidden>
    <table width="100%">
        <TR>
            <td>

                <table align="center" width="100%" class="TableForm"
                       cellpadding="3" cellspacing="0">
                    <colgroup>
                        <col width="15%"></col>
                        <col width="50%"></col>
                        <col width="15%"></col>
                        <col width="20%"></col>

                    </colgroup>
                    <tr>
                        <td class="labelTd">
                            区域目录<span class="star">*</span>
                        </td>
                        <td colspan="3">
                            <div id=menuTree></div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" align="center">
                            <input type="submit" class="button" value="[保存]" id="onsubmits">
                            &nbsp;
                            <input class="button" id="resetNote" type="button"
                                   value="[关闭]" onclick="parent.hiderecommendwindow();">
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>
</form>
</body>
<script type="text/javascript">
    var message = "<%=request.getAttribute("message")%>"
    <%--if(message!="null"){--%>
    if (message == "areaOk") {
        alert("添加或者修改成功 !");
        parent.hiderecommendwindow();
    } else if (message != "ok") {
        alert(message);
    }
    <%--}--%>
</script>

<script type="text/javascript">
    parent.west.collapse(true);
    parent.west.hide();
    var areaKsJson =<s:property value="areaKsJson" escape="false"/>;
    var hasSelectKsIdArra = new Array();
    <s:iterator value="areaKsIds" var="hasSelectKsId">
    hasSelectKsIdArra.push('<s:property value="#hasSelectKsId" />');
    </s:iterator>

    Ext.BLANK_IMAGE_URL = '<%= path%>/etc/images/s.gif';
    var checkboxtree = new checkboxtree('menuTree', 2, areaKsJson, "<%=path%>/teacherrecommend/printAreaJson.do", toclick, 'multiple', true, tocheckclick, loadfunction);

    function loadfunction(node) {
        node.eachChild(onNode);

    }

    function onNode(node) {
        if (isContainOld(node.id, hasSelectKsIdArra)) {
            node.attributes.checked = true;
        }
    }

    function isContainOld(id, varr1) {
        if (varr1) {
            for (var i = 0; i < varr1.length; i++) {

                if (id == varr1[i]) return true;
            }
        }
        return false;
    }

    function toclick(node, event) {

    }

    var selectArray = new Array();

    function tocheckclick(node) {

        if (node.attributes.checked == true) {
            selectArray.push(node.id);
        } else {
            deleteArray(node.id, selectArray);
            deleteArray(node.id, hasSelectKsIdArra);
        }

    }

    function deleteArray(id, arrar) {
        var index = 0;
        var flag = false;
        for (var i = 0; i < arrar.length; i++) {
            if (arrar[i] == id) {
                index = i;
                flag = true;
                break;
            }
        }
        if (flag)
            arrar.splice(index, 1);

    }

    function mergeArray(arr1, arr2) {
        var len = arr2.length;
        for (var i = 0; i < len; i++) {
            var tmpValue = arr2[i];
            if (!isContainOld(tmpValue, arr1)) {
                arr1.push(tmpValue);
            }
        }
    }

    function checkinput() {

        mergeArray(hasSelectKsIdArra, selectArray);
        var allArray = hasSelectKsIdArra;
        if (allArray.length > 0) {
            var hiddenDiv = document.getElementById("hiddenKsIdDiv");
            var tmpHtml = "";
            for (var i = 0; i < allArray.length; i++) {
                tmpHtml += "<input type='hidden' name='areaKsIds' value='" + allArray[i] + "'>";
            }
            hiddenDiv.innerHTML = tmpHtml;
            document.getElementById("onsubmits").disabled = true;
            document.getElementById("onsubmits").value = "正在提交...";
            return true;
        } else {
            alert("请选择推荐的区域目录。");
            return false;
        }

    }
</script>
</html>

