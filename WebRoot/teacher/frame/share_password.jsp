<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>


<!--���ļ��� ��ʼ-- -->
<div class="floatDiv" id="sharePwd.window" style="display:none;">
    <div class="title" onclick="_sharePwdWindow.closePwdWindow();">
        <a href="#"><img src="images/x.gif"/>
        </a> ���������룺
    </div>
    <span class="clearfix"></span>

    <table width="70%" align="center" border="0" cellspacing="0"
           cellpadding="0" class="upload marTB">
        <tr>
            <td>
                <p></p>
            </td>
        </tr>
        <tr>
            <td>
                <p>
                    ���Ļش�
                    <input type="password" size="35" id="sharePwd.pwd"/>
                </p>
            </td>
        </tr>
        <tr>
            <td class="up">
                <button onclick="_sharePwdWindow.validatePwd();">
                    ȷ ��
                </button>
                <button onclick="_sharePwdWindow.closePwdWindow();">
                    ȡ��
                </button>
            </td>
        </tr>
    </table>
</div>

<!----���ļ��� ����-->


<script type="text/javascript">

    var _sharePwdWindow = new SharePwdWindowObj();

    function SharePwdWindowObj() {
        this.currIndex = -1;//_sharePwdWindow.currIndex
        this.openFlag = -1;//�򿪷�ʽ  0-��ť��ʽ��1-�Ҽ��˵� _sharePwdWindow.openFlag
        this.inputId = 'sharePwd.pwd';//_sharePwdWindow.pwd
        this.moveDivInput = 'file.moveDivInput';
        this.otherDivInput = 'file.otherDivInput';


        this.title = 'file.title';
        this.window = 'sharePwd.window';
        this.btnCreate = 'file.create';//_sharePwdWindow
        this.btnRename = 'file.rename';
        this.btnMove = 'file.move';

    }

    ///_fileUtil.enter()��һҳ  onKeyDown="if(event.keyCode==13) _sharePwdWindow.enter();">
    SharePwdWindowObj.prototype.enter = function () {
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


    //_sharePwdWindow.validatePwd()
    SharePwdWindowObj.prototype.validatePwd = function () {
        //alert();
        var pwd = document.getElementById(_sharePwdWindow.inputId).value;
        // alert(pwd);
        if ('' == pwd) {
            alert('���������룡');
            return false;
        }

        var index = this.currIndex;
        //alert(index+ typeof(index));
        //alert(fileObj.fileName);
        //alert(fileObj.shareType);
        //

        var fileObj = _fileUtil.fileList[index];
        //alert(fileObj);
        // alert(fileObj.fileName);
        //alert(fileObj.sharePassword);
        if (pwd != fileObj.sharePassword) {
            alert('�������');
            //alert('�������'+fileObj.sharePassword);
            document.getElementById(_sharePwdWindow.inputId).value = '';
            document.getElementById(_sharePwdWindow.inputId).focus();
            return false;
        }

        _sharePwdWindow.closePwdWindow();

        //_fileUtil.createSharedFileArray(friendnumber,parentfcode,comeFrom,currPage);
        //_fileUtil.currLevel++;ֻ�Ǵ����봰����������1
        // alert(_teacherUtil.comeFrom+'=_teacherUtil.comeFrom');
        _fileUtil.createSharedFileArray(_fileUtil.friendnumber, fileObj.fCode, _teacherUtil.comeFrom, 1);

        return true;
    };
    //_sharePwdWindow.closePwdWindow()
    SharePwdWindowObj.prototype.closePwdWindow = function () {
        mask.style.display = "none";
        document.getElementById(_sharePwdWindow.window).style.display = 'none';

    };
    //_sharePwdWindow.openPwdWindow()
    SharePwdWindowObj.prototype.openPwdWindow = function (i) {
        this.currIndex = parseInt(i);
        document.getElementById(_sharePwdWindow.inputId).value = '';
        mask.style.display = "";

        document.getElementById(_sharePwdWindow.window).style.display = '';
        document.getElementById(_sharePwdWindow.inputId).focus();

        // alert("openPwdWindow"+_fileUtil.currLevel);

    };


</script>