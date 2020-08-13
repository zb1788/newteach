<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<!-- %@page import="vcom.teacher.util.ParseXml"% -->
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    //String versionpath=ParseXml.getXmlNode("vcomdownlaod");
%>
<OBJECT ID="ocx" width="0" height="0" CLASSID="CLSID:B02201C9-1789-4FF0-B95F-C1A03D8B6B99">
    <PARAM NAME="_Version" VALUE="65536">
    <PARAM NAME="_ExtentX" VALUE="10583">
    <PARAM NAME="_ExtentY" VALUE="10583">
    <PARAM NAME="_StockProps" VALUE="0">
</OBJECT>
<OBJECT ID="ftpocx" width="0" height="0" CLASSID="CLSID:B1FF69DA-11A3-4AF0-9C93-7161B79F6AFA"></OBJECT>

<script language="JavaScript" for="ftpocx"
        event="ReturnUploadStatus(lpCurUploadSize, lpTotalSize, fPercent, lStatus,filepath)">
    <%--// alert("currentSize="+lpCurUploadSize);
        //document.getElementById("currentSize").innerHTML=lpCurUploadSize;
        //document.getElementById("totalSize").innerHTML=lpTotalSize;
        //document.getElementById("percent").innerHTML=fPercent;--%>
    i++;
    <%--//document.getElementById("status").innerHTML=lStatus+"i="+i;--%>

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
    <%--//document.getElementById("filepath").innerHTML=document.getElementById("filepath").innerHTML+"<br/>"+filepath+","+fileSize;--%>
    ftpFileHandler.ftpItems.addFtpFile(filepath, fileSize);
</script>
<script language="JavaScript" for="ftpocx" event="ReturnUnSafeName(lpName)">
    <%--//document.getElementById("filepath").innerHTML=document.getElementById("filepath").innerHTML+"<br/>"+filepath+","+fileSize;
     //ftpFileHandler.ftpItems.addFtpFile(filepath,fileSize);--%>
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
        <%-- //alert("所有的发送成功="+str);
         //var jsons=$.toJSON(ftpFileHandler.ftpItems.hasFtpItems);--%>
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

