<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<!-- %@page import="vcom.teacher.util.ParseXml"% -->
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!-- 下载插件 -->
<OBJECT ID="ocx" width="0" height="0" CLASSID="CLSID:B02201C9-1789-4FF0-B95F-C1A03D8B6B99">
    <PARAM NAME="_Version" VALUE="65536">
    <PARAM NAME="_ExtentX" VALUE="10583">
    <PARAM NAME="_ExtentY" VALUE="10583">
    <PARAM NAME="_StockProps" VALUE="0">
</OBJECT>
<!-- mac插件 -->
<div style="display: none">
    <object classid="clsid:3bde69c2-9ec0-4636-868c-9e400a44e765" id="mac_ocx" name="mac_ocx"></object>
</div>

<!-- 鸿合白板工具控件 start -->
<div style="display: none">
</div>

<!-- ftp插件 -->
<OBJECT ID="ftpocx" width="0" height="0" CLASSID="CLSID:B1FF69DA-11A3-4AF0-9C93-7161B79F6AFA"></OBJECT>
<script language="JavaScript" for="ftpocx"
        event="ReturnUploadStatus(lpCurUploadSize, lpTotalSize, fPercent, lStatus,filepath)">
    if (ftpFileHandler.ftpFiles[ftpFileHandler.currentIndex] != null) {
        ftpFileHandler.ftpFiles[ftpFileHandler.currentIndex].currentSize = lpCurUploadSize;
        ftpFileHandler.ftpFiles[ftpFileHandler.currentIndex].totalSize = lpTotalSize;
        ftpFileHandler.ftpFiles[ftpFileHandler.currentIndex].percent = fPercent;
        ftpFileHandler.ftpFiles[ftpFileHandler.currentIndex].status = lStatus;
        if (lpCurUploadSize > 0) ftpFileHandler.updateFtpFile();
    }
</script>
<script language="JavaScript" for="ftpocx" event="ReturnFileUpload(filepath,fileSize)">
    ftpFileHandler.ftpItems.addFtpFile(filepath, fileSize);
</script>
<script language="JavaScript" for="ftpocx" event="ReturnUnSafeName(lpName)">
    errarray = errarray + lpName + ",";
</script>
<script language="JavaScript" for="ftpocx" event="ReturnUploadEnd(endStatus)">
    if (endStatus == 0) {
        ftpFileHandler.startUpNext();
    } else if (endStatus == 1) {
        var str = "{'teachernumber':'" + teachernumber + "','parentfcode':'" + _fileUtil.currParentFcode + "','filelist':[";
        for (var j = 0; j < ftpFileHandler.ftpItems.hasFtpItems.length; j++) {
            str = str + "{'path':'" + encodeURIComponent(encodeURIComponent(ftpFileHandler.ftpItems.hasFtpItems[j].path)) + "','size':'" + ftpFileHandler.ftpItems.hasFtpItems[j].size + "'},";
        }
        str = str.replace(/,$/, "") + "]}";
        ftpocx.ReleaseConnect();
        jQuery(function ($) {
            sendRequest(function () {
                _fileUtil.createFileArray(_fileUtil.currParentFcode);
                reflashteachersize();
            }, "<%=path%>/teacherfile/uploadfile.do", "post", 'data=' + str)
        });
    }
</script>
<script language="JavaScript" for="ocx" event="OnXmlFinish(strXML)">
    callbackGetXmlFinish(strXML);
</script>
<script language="JavaScript" for="ocx" event="OnProccess(pos,speed)">
    player.OnProccess(pos, speed);
</script>
<script language="JavaScript" for="ocx" event="OnStateChange(state,errMsg)">
    player.updateState(state, errMsg);
</script>