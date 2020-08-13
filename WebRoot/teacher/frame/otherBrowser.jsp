<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%@page import="vcom.teacher.util.ParseXml" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    String versionpath = ParseXml.getXmlNode("vcomdownlaod");
%>
<OBJECT ID="ocx" width="0" height="0"
        codebase="<%=basePath %>office/officdown.cab#version=<%=versionpath.replaceAll("\\.",",") %>"
        CLASSID="CLSID:B02201C9-1789-4FF0-B95F-C1A03D8B6B99">
    <PARAM NAME="_Version" VALUE="65536">
    <PARAM NAME="_ExtentX" VALUE="10583">
    <PARAM NAME="_ExtentY" VALUE="10583">
    <PARAM NAME="_StockProps" VALUE="0">
</OBJECT>
<OBJECT ID="ftpocx" width="0" height="0" CLASSID="CLSID:B1FF69DA-11A3-4AF0-9C93-7161B79F6AFA"></OBJECT>

<script language="JavaScript" for="ftpocx"
        event="ReturnUploadStatus(lpCurUploadSize, lpTotalSize, fPercent, lStatus,filepath)">

    i++;


    if (ftpFileHandler.ftpFiles[ftpFileHandler.currentIndex] != null) {
        ftpFileHandler.ftpFiles[ftpFileHandler.currentIndex].currentSize = lpCurUploadSize;
        ftpFileHandler.ftpFiles[ftpFileHandler.currentIndex].totalSize = lpTotalSize;
        ftpFileHandler.ftpFiles[ftpFileHandler.currentIndex].percent = fPercent;
        ftpFileHandler.ftpFiles[ftpFileHandler.currentIndex].status = lStatus;
        if (lpCurUploadSize > 0)
            ftpFileHandler.updateFtpFile();
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
        var isFileNum = 0;
        var str = "{'teachernumber':'" + teachernumber + "','parentfcode':'" + window.parent._fileUtil.currParentFcode + "','filelist':[";
        var itemsLength = ftpFileHandler.ftpItems.hasFtpItems.length;
        for (var j = 0; j < ftpFileHandler.ftpItems.hasFtpItems.length; j++) {
            str = str + "{'path':'" + encodeURIComponent(encodeURIComponent(ftpFileHandler.ftpItems.hasFtpItems[j].path)) + "','size':'" + ftpFileHandler.ftpItems.hasFtpItems[j].size + "'},";
            if (ftpFileHandler.ftpItems.hasFtpItems[j].path.indexOf("/") == -1) {
                isFileNum++;
            }
        }
        str = str.replace(/,$/, "") + "]}";

        ftpocx.ReleaseConnect();


        jQuery(function ($) {
            sendRequest(function () {

                window.parent._fileUtil.createFileArray(window.parent._fileUtil.currParentFcode);
                reflashteachersize();
                if (window.parent._fileUtil.currParentFcode == "" || window.parent._fileUtil.currParentFcode == null) {
                    window.parent.startShowFileTree(true);
                } else {
                    if (isFileNum != itemsLength) {
                        window.parent.refreshNode(window.parent._fileUtil.currParentFcode);
                    }
                }
            }, "<%=path%>/teacherfile/uploadfile.do", "post", 'data=' + str)
        });

    }
</script>
<script language="JavaScript" for="ocx" event="OnXmlFinish(strXML)">
    if (filedowntype == 1) {
        OnXmlFinish2(strXML);
    } else if (filedowntype == 2) {
        OnXmlFinishX(strXML);
    } else if (filedowntype == 3) {
        OnXmlFinish3(strXML);
    }
</script>
<script language="JavaScript" for="ocx" event="OnProccess(pos,speed)">
    if (filedowntype == 1) {
        updatePos2(pos, speed);
    } else if (filedowntype == 2) {
        updatePos(pos, speed);
    } else if (filedowntype == 3) {
        updatePos3(pos, speed);
    }
</script>
<script language="JavaScript" for="ocx" event="OnStateChange(state,errMsg)">
    updateState(state, errMsg);
</script>

