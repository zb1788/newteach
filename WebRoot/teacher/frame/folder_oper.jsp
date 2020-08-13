<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>


<!--���ļ��� ��ʼ-- -->
<div class="floatDiv" id="file.window" style="display: none">
    <div class="title">
        <a href="#" onclick="_fileUtil.closeFolderCreateWindow();"><img
                src="images/x.gif"/> </a>
        <span id="file.title">�½��ļ���</span>
    </div>
    <span class="clearfix"></span>

    <table width="90%" align="center" border="0" cellspacing="0"
           cellpadding="0" class="upload marTB">
        <tr>
            <td>
                <p id="file.createTip">
                    ��д������
                    <span>�����50���ַ���</span>
                </p>
            </td>
            <td></td>
        </tr>
        <tr>
            <td class="text">
                <div id="file.otherDivInput">
                    <input type="text" size="45" id="file.folderName" maxlength="50"
                           onKeyDown="if(event.keyCode==13) _fileWindow.enter();"
                           onblur="this.value=this.value.replace(/(^\s*)|(\s*$)/g, '');"/>
                </div>
            </td>
            <td class="kd4 up">
                <button id="file.create"
                        onclick="_fileUtil.createFolder(document.getElementById('file.folderName').value);">
                    �½�
                </button>
                <button id="file.rename"
                        onclick="_fileUtil.renameFile(document.getElementById('file.folderName').value);">
                    �޸�
                </button>
                <button id="file.move"
                        onclick="_fileUtil.renameFile(document.getElementById('file.folderName').value);">
                    �ƶ�
                </button>
                <button onclick="_fileUtil.closeFolderCreateWindow();">
                    ȡ��
                </button>
            </td>
        </tr>
    </table>
</div>

<!----���ļ��� ����-->


<script type="text/javascript">

    var _fileWindow = new FileWindowObj();

    function FileWindowObj() {
        this.currIndex = -1;//_fileWindow.currIndex
        this.openFlag = -1;//�򿪷�ʽ  0-��ť��ʽ��1-�Ҽ��˵� _fileWindow.openFlag
        this.inputId = 'file.folderName';//_fileWindow.inputId
        this.moveDivInput = 'file.moveDivInput';
        this.otherDivInput = 'file.otherDivInput';


        this.title = 'file.title';
        this.window = 'file.window';
        this.btnCreate = 'file.create';//_fileWindow
        this.btnRename = 'file.rename';
        this.btnMove = 'file.move';

    }

    ///_fileUtil.enter()��һҳ  onKeyDown="if(event.keyCode==13) _fileWindow.enter();">
    FileWindowObj.prototype.enter = function () {
        //alert();
        var obj = null;
        //
        if (document.getElementById(this.btnCreate).style.display != 'none')
            obj = document.getElementById(this.btnCreate);
        //
        if (document.getElementById(this.btnRename).style.display != 'none')
            obj = document.getElementById(this.btnRename);
        //alert(obj);
        obj.click();

    };//��һҳ

    //_fileUtil.createFolder()
    FileUtilObj.prototype.createFolder = function (folderName) {
        //alert(folderName);
        if ('' == folderName) {
            alert('����д�ļ�����');
            return;
        }
        if (!_fileUtil.validateFolderName(folderName)) return;

        if (0 >= parseFloat(teachersize)) {
            alert('�ռ��СΪ' + teachersize + '���޷������ļ��У�');
            return;
        }

        if (_fileUtil.isContainFileName(folderName)) {
            alert(folderName + '�Ѿ����ڣ�');
            return;
        }
        conectionFtp(_fileUtil.parentDir.replace("�ҵ��ļ���", "") + folderName);
        ftpocx.ReleaseConnect();

        var url = _common.getCurrServerPath() + "/teacher/createFolder.do?1=1";

        url += "&teacherFileObj.noforder=1";//noforder;//0�����ļ���1�����ļ���
        url += "&teacherFileObj.parentfcode=" + _fileUtil.currParentFcode;
        url += "&teacherFileObj.filename=" + encodeURIComponent(encodeURIComponent(folderName));

        url += "&teacherFileObj.teachnumber=" + _common.getTeacherId();
        url += "&ajaxdate=" + new Date();
        //alert(url);
        sendRequest(this.parseStatusXml, url);/**/
    };

    //_fileUtil.parseCreateFolderXml
    FileUtilObj.prototype.parseCreateFolderXml = function (xmldoc) {


    };// end of


    //_fileUtil.openFileRenameWindow()
    FileUtilObj.prototype.openFileRenameWindow = function (i) {
        var index = i;
        if (undefined == index) {
            if (_fileUtil.getSelectedFileObjCount() > 1) {
                alert('ÿ��ֻ���޸�һ���ļ�!');
                return;
            }

            index = _fileUtil.getSelectedFileObjIndex();
            if (index < 0) {
                alert('����ѡ���ļ�!');
                return;
            }
        }

        document.getElementById(_fileWindow.inputId).value = _fileUtil.fileList[index].fileName;


        mask.style.display = "";
        document.getElementById(_fileWindow.title).innerHTML = '�޸��ļ���';
        document.getElementById(_fileWindow.window).style.display = '';
        document.getElementById(_fileWindow.inputId).focus();
        //
        //	this.btnCreate = 'file.create';//_fileWindow
        //this.btnRename = 'file.rename';
        document.getElementById(_fileWindow.btnCreate).style.display = 'none';
        document.getElementById(_fileWindow.btnMove).style.display = 'none';
        document.getElementById(_fileWindow.btnRename).style.display = '';


    };

    //_fileUtil.deleteFile();
    FileUtilObj.prototype.deleteFile = function (fcode) {


        var index;
        var deleteFCodes;

        //alert('�򿪷�ʽ��'+_fileWindow.openFlag);
        // //�򿪷�ʽ  0-��ť��ʽ��1-�Ҽ��˵� _fileWindow.openFlag
        if (fcode) {
            deleteFCodes = fcode;
        } else {
            if (0 == _fileWindow.openFlag) {
                index = this.getSelectedFileObjIndex();//��ñ�ѡ���ļ�������
                deleteFCodes = _fileUtil.getSelectedFcodes();
            } else if (1 == _fileWindow.openFlag) {
                index = _fileWindow.currIndex;
                var currFileObj = this.fileList[index];
                deleteFCodes = currFileObj.fCode;
            }
        }

        if (!confirm("ȷ��Ҫɾ����")) {
            return;
        }
        conectionFtp("");
        //������Ҫɾ�����ļ� begin
        for (var i = 0; i < _fileUtil.fileList.length; i++) {
            if (_fileUtil.fileList[i].selected == true) {
                var liId_str = 'liId_' + i;
                if (_fileUtil.fileList[i].fileType != "") {
                    var status = ftpocx.DeleteFtpFile(teacherforder + _fileUtil.fileList[i].dir.replace("�ҵ��ļ���", "") + _fileUtil.fileList[i].fileName);
                } else {
                    var status = ftpocx.DeleteFtpFile(teacherforder + _fileUtil.fileList[i].dir.replace("�ҵ��ļ���", ""));
                }
                //document.getElementById(liId_str).style.display='none';
            }
        }
        ftpocx.ReleaseConnect();
        //end of for
        //������Ҫɾ�����ļ� end
        // return;
        if (index < 0) {
            alert('����ѡ���ļ�!');
            return;
        }

        var url = _common.getCurrServerPath() + "/teacher/deleteFile.do?1=1";
        url += "&fcodes=" + deleteFCodes;
        url += "&teacherFileObj.teachnumber=" + _common.getTeacherId();
        url += "&ajaxdate=" + new Date();
        //alert(url);
        sendRequest(this.parseFileDeleteXml, url);/**/
    };
    //_fileUtil.parseFileDeleteXml
    FileUtilObj.prototype.parseFileDeleteXml = function (xmldoc) {
        reflashteachersize();
        _fileUtil.parseStatusXml(xmldoc);

    };// end of


    //_fileUtil.getFileTypeFromName ���ļ����л�ȡ�ļ�����
    FileUtilObj.prototype.getFileTypeFromName = function (fileName) {
        //alert(fileName);
        // alert(fileName.lastIndexOf("."));
        var fileType = '';
        var begin = fileName.lastIndexOf(".");
        if (begin > 0) {
            fileType = fileName.substring(begin + 1, fileName.length);
        }
        //alert(fileType);
        return fileType;
    }


    //_fileUtil.resumeFileName()  �ָ��ļ�����
    FileUtilObj.prototype.resumeFileName = function () {
        index = _fileUtil.getSelectedFileObjIndex();//��ñ�ѡ���ļ�������
        var resumeName = _fileUtil.fileList[index].fileName;
        document.getElementById(_fileWindow.inputId).value = resumeName;

    }
    //_fileUtil.renameFile(folderName)
    FileUtilObj.prototype.renameFile = function (folderName) {
        //alert(folderName);
        if ('' == folderName) {
            alert('����д�ļ�����');
            return;
        }


        //�򿪷�ʽ  0-��ť��ʽ��1-�Ҽ��˵� _fileWindow.openFlag
        var index;
        //alert('�򿪷�ʽ��'+_fileWindow.openFlag);
        if (0 == _fileWindow.openFlag) {
            index = this.getSelectedFileObjIndex();//��ñ�ѡ���ļ�������
        } else if (1 == _fileWindow.openFlag) {
            index = _fileWindow.currIndex;
            // alert(index);
        }

        if (_fileUtil.fileList[parseInt(index)].type == 0) {//0-���ļ� 1-�ļ���
            var newFileType = _fileUtil.getFileTypeFromName(folderName);
            if (newFileType != _fileUtil.fileList[parseInt(index)].fileType) {
                alert('�ļ���׺�������޸ģ�');
                _fileUtil.resumeFileName();
                return;
            }

            if (!_fileUtil.validateFileName(folderName)) return;
        } else {
            if (!_fileUtil.validateFolderName(folderName)) return;
        }


        if (this.isContainFileName(folderName, index)) {
            alert(folderName + '�Ѿ����ڣ�');
            _fileUtil.resumeFileName();
            return;
        }

        var oldpath = teacherforder + _fileUtil.parentDir.replace("�ҵ��ļ���", "") + _fileUtil.fileList[index].fileName;
        var newpath = teacherforder + _fileUtil.parentDir.replace("�ҵ��ļ���", "") + folderName;
        if (oldpath == newpath) {
            alert("�޸ĵ��ļ���Դ�ļ���ͬ!");
            return;
        }
        conectionFtp("");
        //alert(oldpath);
        //alert(newpath);
        var status = ftpocx.RenamePath(oldpath, newpath);
        ftpocx.ReleaseConnect();
        if (!status) {
            alert("������ʧ��!");
            return;
        }
        var currFileObj = this.fileList[index];
        var url = _common.getCurrServerPath() + "/teacher/renameFile.do?1=1";

        //url += "&teacherFileObj.noforder=1" ;//noforder;//0�����ļ���1�����ļ���
        //url += "&teacherFileObj.parentfcode=" + _fileUtil.currParentFcode;
        url += "&teacherFileObj.fcode=" + currFileObj.fCode;
        url += "&teacherFileObj.filename=" + encodeURIComponent(encodeURIComponent(folderName));

        url += "&teacherFileObj.teachnumber=" + _common.getTeacherId();
        url += "&ajaxdate=" + new Date();
        //alert(url);
        sendRequest(this.parseRenameXml, url);/**/
    };
    //_fileUtil.parseStatuseXml
    FileUtilObj.prototype.parseStatusXml = function (xmldoc) {

        var status = xmldoc.selectNodes("//VCOM/status")[0].text;//
        //alert(status);
        if (1 == status) {
            alert(xmldoc.selectNodes("//VCOM/info")[0].text);
            return status;
        }


        //alert();

        _fileUtil.closeFolderCreateWindow();
        _fileUtil.createFileArray(_fileUtil.currParentFcode);
        //_fileUtil.refreshLeftFolderTree();

    };// end of
    //_fileUtil.parseCreateFolderXml
    FileUtilObj.prototype.parseRenameXml = function (xmldoc) {
        var status = _fileUtil.parseStatusXml(xmldoc);
        if (1 == status) _fileUtil.resumeFileName();

    };// end of

    //_fileUtil.openFolderCreateWindow()
    FileUtilObj.prototype.openFolderCreateWindow = function () {
        //alert();
        mask.style.display = "";
        document.getElementById(_fileWindow.title).innerHTML = '�½��ļ���';
        document.getElementById(_fileWindow.inputId).value = '';
        document.getElementById(_fileWindow.window).style.display = '';
        document.getElementById(_fileWindow.inputId).focus();

        //
        //	this.btnCreate = 'file.create';//_fileWindow
        //this.btnRename = 'file.rename';
        document.getElementById(_fileWindow.btnCreate).style.display = '';
        document.getElementById(_fileWindow.btnRename).style.display = 'none';
        document.getElementById(_fileWindow.btnMove).style.display = 'none';


    };
    //_fileUtil.closeFolderCreateWindow()
    FileUtilObj.prototype.closeFolderCreateWindow = function () {
        //alert();
        mask.style.display = "none";
        document.getElementById('file.window').style.display = 'none';
    };

    //_fileUtil.moveFile(srcFcode,destFcode)
    FileUtilObj.prototype.moveFile = function (srcFcode, destFcode) {

        var url = _common.getCurrServerPath() + "/teacher/moveFile.do?1=1";


        url += "&srcFcode=" + srcFcode;
        url += "&destFcode=" + destFcode;


        url += "&teacherFileObj.teachnumber=" + _common.getTeacherId();
        url += "&ajaxdate=" + new Date();
        //alert(url);
        sendRequest(this.parseStatusXml, url);/**/
    };

</script>