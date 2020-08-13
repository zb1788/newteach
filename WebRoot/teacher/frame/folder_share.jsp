<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<script type="text/javaScript">

    function _openFolderShareWindow() {
        if (_fileUtil.isFolder()) {
            var fCodes = _fileUtil.getSelectedFcodes();
            if (fCodes == null || fCodes.length == 0) {
                alert("至少选择一个文件夹");
                return false;
            }
            document.getElementsByName("sharetype").value = "1";
            document.getElementById("fcodes").value = fCodes;
            document.getElementById("sharepass").value = "";
            document.getElementById("sharepass").disabled = true;
            mask.style.display = '';
            var wd = document.getElementById("fileSharewindow");
            if (wd.style.display == 'none') {
                wd.style.display = '';
            }
        } else {
            alert("只能共享文件夹");
            return false;
        }
        var stObj = document.getElementsByName("sharetype");
        var sharetype;
        for (var i = 0; i < stObj.length; i++) {
            if (stObj[i].checked) {
                sharetype = stObj[i].value;
                break;
            }
        }
        if (sharetype == "1") {
            document.getElementById("sharepass").disabled = true;
        }

        if (sharetype == "2" || sharetype == "3") {
            document.getElementById("sharepass").disabled = false;
        }

    }

    function _closeFolderShareWindow() {
        mask.style.display = 'none';
        var wd = document.getElementById("fileSharewindow");
        if (wd.style.display == '') {
            wd.style.display = 'none';
        }
    }

    function shareFile() {
        var stObj = document.getElementsByName("sharetype");
        var sharetype;
        for (var i = 0; i < stObj.length; i++) {
            if (stObj[i].checked) {
                sharetype = stObj[i].value;
            }
        }
        var vl = document.getElementById("sharepass").value;
        if (sharetype == "2") {
            var reg = /^\d{6,12}?$/;
            if (vl == null || vl.length < 6 || vl.length > 12 || reg.test(vl) == false) {
                alert("密码为六到十二位数字");
                return false;
            }
        }
        var fcd = document.getElementById("fcodes").value;
        var url = "<%=basePath%>teacher/sharefile.do?sharetype=" + sharetype + "&sharepass=" + vl + "&fcodes=" + fcd;
        url += '&ajaxdate=' + new Date();
        //alert("请求url："+url);
        sendRequest(this.callBackMethodInvoke, url);
        //document.forms["shareForm"].submit();
    }

    function callBackMethodInvoke(xmlStr) {
        //alert("返回结果："+xmlStr);
        if (xmlStr == null || xmlStr.indexOf("<vcom>500</vcom>") != -1) {
            alert("操作失败！");
        }
        if (xmlStr != null && xmlStr.indexOf("<vcom>200</vcom>") != -1) {
            alert("操作成功！");
        }
        _closeFolderShareWindow();
        _fileUtil.createFileArray(_fileUtil.currParentFcode);
    }
</script>
<div class="floatMoveDiv" id="fileSharewindow" style="display:none;left: 50%;margin-left: -200px;">
    <div class="title">
        <a href="#" onclick="_closeFolderShareWindow();"><img src="images/x.gif"/></a>
        共享文件
    </div>
    <span class="clearfix"></span>

    <!-- <form id="shareForm" name="shareForm" action="<%=path%>/syscfg/sharefile.do" method="post"> -->

    <table width="90%" align="center" border="0" cellspacing="0" cellpadding="0" class="upload marTB">
        <tr>
            <td colspan="2"><p>请选择共享范围<input id="sharetype" name="sharetype" type="radio" class="radio" value="1"
                                             checked="checked"
                                             onclick='if(this.checked){document.getElementById("sharepass").disabled=true ;}'/>全局共享<input
                    id="sharetype" name="sharetype" type="radio" class="radio" value="2"
                    onclick='if(this.checked){document.getElementById("sharepass").disabled=false ;}'/>密码共享<input
                    id="sharetype" name="sharetype" type="radio" class="radio" value="3"
                    onclick='if(this.checked){document.getElementById("sharepass").disabled=true ;}'/>取消共享</p></td>
        </tr>

        <tr>
            <td><input type="password" id="sharepass" name="sharepass" size="12" size="45"/></td>
            <td class="kd4 up">
                <button onclick="shareFile();">确 定</button>
                <button onclick="_closeFolderShareWindow();">取消</button>
            </td>
        </tr>
        <input type="hidden" id="fcodes" name="fcodes">
    </table>
    <!-- </form> -->

</div>

