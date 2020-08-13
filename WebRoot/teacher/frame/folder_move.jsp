<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<!--�ļ��ƶ� ��ʼ -->
<div class="floatMoveDiv" id="fileMove.window" style="display: none;left: 50%;margin-left: -200px;">
    <div class="title">
        <a href="#" onclick="_fileUtil.closeFileMoveWindow();"><img
                src="images/x.gif"/> </a> ��ѡ���ƶ����λ��
    </div>
    <span class="clearfix"></span>

    <table width="50%" align="center" border="0" cellspacing="0"
           cellpadding="0" class="upload marTB">
        <!--
        <tr>
            <td>
                <p>
                    ��ѡ���ƶ����λ��
                </p>
            </td>
        </tr> -->
        <tr>
            <td>
                <div id="fileMove.fileTree"
                     style="width:320px; height: 240px; FLOAT: left; border: 1px solid #999999; padding: 1px; overflow: auto"></div>
                <div id="fileMove.fileTree2" style="height: 50" scroll="auto"></div>
                <!--������ʾ��״Ŀ¼  -->
            </td>
        </tr>
        <tr>
            <td class="up">
                <button onclick="_fileUtil.moveFile();">
                    ȷ ��
                </button>
                <button onclick="_fileUtil.closeFileMoveWindow();">
                    ȡ��
                </button>
            </td>
        </tr>
    </table>
</div>


<!--�ļ��ƶ� ���� -->


<script type="text/javascript">
    var _fileMoveWindow = new FileMoveWindowObj();

    function FileMoveWindowObj() {
        this.targetFcode = -1;//_fileMoveWindow.targetFcode Ҫ�ƶ���Ŀ���ļ���
        this.targetpath = "";

    }

    //_fileMoveWindow.setTargetFcode(targetFcode);
    FileMoveWindowObj.prototype.setTargetFcode = function (targetFcode, targetpath) {
        this.targetFcode = targetFcode;
        this.targetpath = targetpath;

    };


    //_fileUtil.openFolderMoveWindow();
    FileUtilObj.prototype.openFolderMoveWindow = function () {
        this.targetFcode = -1;
        var url = _common.getCurrServerPath() + "/teacher/getFileListTree.do?1=1";

        url += "&teacherFileObj.teachnumber=" + _common.getTeacherId();
        url += "&ajaxdate=" + new Date();
        //alert(url);
        sendRequest(this.parseFileTreeXml, url);/**/


    };

    FileUtilObj.prototype.parseFileTreeXml = function (xmldoc) {

        var h = '';

        var fileNodes = xmldoc.selectNodes("//VCOM/files/file");//��ȡ
        d = new dTree('d');
        //d.config.folderLinks = true;

        var jsStr = 'javascript:' + '_fileMoveWindow.setTargetFcode(\'' + 0 + '\',\'\');';
        //alert(jsStr);
        d.add(0, -1, '�ҵ��ļ���', jsStr, '', '');
        //d.add(12,0,'Recycle Bin','example01.html','','','img/trash.gif');


        //alert(fileNodes.length);
        for (var i = 0; i < fileNodes.length; i++) {
            var space = "";
            var fileNode = fileNodes[i];


            var id = i;
            var fCode = "";//
            var parentFcode = "";//
            var fileName = "";//
            var fileType = "";//
            var level = "";//
            var type = "";//
            var path = "";

            try {
                fileName = getXMLText(fileNode.selectNodes("fileName")); //

                //alert(fileName);
            } catch (e) {
                //alert(e.message);
            }
            try {
                parentFcode = getXMLText(fileNode.selectNodes("parentFcode")); //

                //alert(fileName);
            } catch (e) {
                //alert(e.message);
            }

            try {
                fileType = getXMLText(fileNode.selectNodes("fileType")); //
            } catch (e) {
                //alert(e.message);
            }

            try {
                fCode = getXMLText(fileNode.selectNodes("fCode")); //
                //alert(fCode);
            } catch (e) {
                //alert(e.message);
            }
            try {
                type = getXMLText(fileNode.selectNodes("type")); //
                //alert(fCode);
            } catch (e) {
                //alert(e.message);
            }

            try {
                level = getXMLText(fileNode.selectNodes("level")); //
                //alert(fCode);
            } catch (e) {
                //alert(e.message);
            }
            try {
                path = getXMLText(fileNode.selectNodes("path")); //
                //alert(fCode);
            } catch (e) {
                //alert(e.message);
            }
            //alert(level);
            for (var j = 0; j < parseInt(level); j++) {
                space += "-";
            }


            //d.add(fCode,parentFcode,fileName,'example01.html','','','img/trash.gif');
            //alert(parentFcode);
            if (1 == type) {
                jsStr = 'javascript:' + '_fileMoveWindow.setTargetFcode(\'' + fCode + '\',\'' + path + '\');';
                //alert(jsStr);
                d.add(fCode, parentFcode, fileName, jsStr, '', '');
            }
        }// end of for


        //
        //alert(d);
        mask.style.display = "";
        document.getElementById("fileMove.window").style.display = '';

        document.getElementById("fileMove.fileTree").innerHTML = d.toString();

    };// end of


    //_fileUtil.closeFileMoveWindow()
    FileUtilObj.prototype.closeFileMoveWindow = function () {
        //alert();
        mask.style.display = "none";
        document.getElementById('fileMove.window').style.display = 'none';
    };
    FileUtilObj.prototype.dragmoveFile = function (filepath, tarpath, filecode, tarcode) {
        selectFCodes = "";
        conectionFtp("");
        var status = ftpocx.FtpMoveFile(filepath, tarpath);

        if (status) {
            selectFCodes = filecode;
        }
        ftpocx.ReleaseConnect();

        if (selectFCodes == "") {
            alert('�ƶ��ļ�ʧ��!');
            return;
        }
        var url = _common.getCurrServerPath() + "/teacher/moveFile.do?1=1";


        url += "&srcFcode=" + filecode.replace(/,$/, "");
        url += "&destFcode=" + tarcode;

        //alert(selectFCodes);
        url += "&teacherFileObj.teachnumber=" + _common.getTeacherId();
        url += "&ajaxdate=" + new Date();
        //alert(url);return;
        sendRequest(this.parseFileMovesXml, url);/**/
    }
    //_fileUtil.moveFile()
    FileUtilObj.prototype.moveFile = function () {

        destFcode = _fileMoveWindow.targetFcode;//_fileMoveWindow.targetpath
        if (destFcode < 0) {
            alert('��ѡ��Ŀ���ļ��У�');
            return;
        }
        //alert(destFcode=''+destFcode);

        var selectFCodes = _fileUtil.getSelectedFcodes();
        if ('' == selectFCodes) {
            alert('����ѡ����ƶ����ļ����ļ���!');
            return;
        }


        conectionFtp("");
        selectFCodes = "";
        for (var i = 0; i < _fileUtil.fileList.length; i++) {
            if (_fileUtil.fileList[i].selected == true) {
                var liId_str = 'liId_' + i;
                var tarpath = "";
                if (_fileUtil.fileList[i].fileType != "") {
                    tarpath = teacherforder + _fileUtil.fileList[i].dir.replace("�ҵ��ļ���", "") + _fileUtil.fileList[i].fileName;
                } else {
                    tarpath = teacherforder + _fileUtil.fileList[i].dir.replace("�ҵ��ļ���", "");
                }

                tarpath = tarpath.replace(/\/\//g, "/").replace(/\/$/, "");
                var newpath = (teacherforder + _fileMoveWindow.targetpath).replace(/\/\//g, "/").replace(/\/$/, "") + "/";

                // alert(tarpath);
                // alert(newpath);
                if (newpath != tarpath) {
                    //alert("ftp��ʼ�ƶ��ļ�"+tarpath+"-->"+newpath);
                    var status = ftpocx.FtpMoveFile(tarpath, newpath);
                    if (status) {
                        //alert("�ƶ��ļ��ɹ�");
                        selectFCodes = selectFCodes + _fileUtil.fileList[i].fCode + ",";
                    }
                } else {
                    alert("ѡ������ص�Ŀ¼�������ι�!");
                }

            }
        }
        //alert("ftp�ƶ��ɹ����ļ�-->"+selectFCodes);
        ftpocx.ReleaseConnect();
        if (selectFCodes == "") {
            alert('�ƶ��ļ�ʧ��!');
            return;
        }
        var url = _common.getCurrServerPath() + "/teacher/moveFile.do?1=1";


        url += "&srcFcode=" + selectFCodes.replace(/,$/, "");
        url += "&destFcode=" + destFcode;

        //alert(selectFCodes);
        url += "&teacherFileObj.teachnumber=" + _common.getTeacherId();
        url += "&ajaxdate=" + new Date();
        //alert(url);return;
        sendRequest(this.parseFileMovesXml, url);/**/
    };

    //_fileUtil.parseFileMovesXml
    FileUtilObj.prototype.parseFileMovesXml = function (xmldoc) {

        var status = xmldoc.selectNodes("//VCOM/status")[0].text;//
        //alert(status);
        if (1 == status) {
            alert(xmldoc.selectNodes("//VCOM/info")[0].text);
            //return ;
        }


        //alert();
        _fileUtil.closeFileMoveWindow();
        _fileUtil.createFileArray(_fileUtil.currParentFcode);
        _fileUtil.refreshLeftFolderTree();


    };// end of
</script>

<script type="text/javascript">
    <!--

    //-->
</script>