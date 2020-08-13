<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<div class="floatDiv" id="file.tipId" style="display: none;">
    <div class="title">
        <a href="#" onclick="_fileUtil.closeTip();"> <img
                src="images/x.gif"/> </a>
        <span id="tipTitleId">提示</span>
    </div>
    <span class="clearfix"></span>
    <table width="100%" align="center" border="0" cellspacing="0"
           cellpadding="0" class="upload marTB xieyi">
        <tr>
            <td class="xieyi">
                <div style="height:200px; overflow-y:auto;">
                    <div id="tipContentId">


                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td align="center" class="kd4 up"
                style=" background:#f8f8f8;border-top:1px dotted #e4e4e4; padding-top:5px;width:auto; text-align:center;">
                <button onclick="_fileUtil.closeTip();">
                    确定
                </button>
            </td>
        </tr>


        <%-- <tr>
            <td class="text">
                <div id="file.otherDivInput">
                    <input type="text" size="45" id="file.folderName" maxlength="50"
                        onKeyDown="if(event.keyCode==13) _fileWindow.enter();"
                        onblur="this.value=this.value.replace(/(^\s*)|(\s*$)/g, '');" />
                </div>
            </td>
            <td class="kd4 up">

                <button id="file.move"
                    onclick="_fileUtil.renameFile(document.getElementById('file.folderName').value);">
                    移动
                </button>
                <button onclick="_fileUtil.closeRecommedActive();">
                    取消
                </button>
            </td>
        </tr>--%>
    </table>
</div>
<script type="text/javascript">
    <!--


    FileUtilObj.prototype.openTip = function (title, content) {

        mask.style.display = "";
        document.getElementById("file.tipId").style.display = '';
        document.getElementById("tipTitleId").innerHTML = title;
        document.getElementById("tipContentId").innerHTML = content;


    };


    FileUtilObj.prototype.closeTip = function () {
        mask.style.display = "none";
        document.getElementById('file.tipId').style.display = 'none';

    };

    //-->
</script>

