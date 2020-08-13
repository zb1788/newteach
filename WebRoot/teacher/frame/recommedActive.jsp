<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<div class="floatDiv" id="file.activeRecommed" style="display: none">
    <div class="title">
        <a href="#" onclick="_fileUtil.closeRecommedActive();"><img
                src="images/x.gif"/> </a>
        <span id="file.activeTitle">�Ƽ��</span>
    </div>
    <span class="clearfix"></span>

    <table width="90%" align="center" border="0" cellspacing="0"
           cellpadding="0" class="upload marTB">

        <tr>
            <td>
                <p style="text-align:left" align="left" id="activeList">

                </p>
            </td>
        </tr>
        <tr>

            <td class="kd4 up">
                <button onclick="_fileUtil.saveRecommendActive();">
                    ȷ��
                </button>
                <button onclick="_fileUtil.closeRecommedActive();">
                    ȡ��
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
                    �ƶ�
                </button>
                <button onclick="_fileUtil.closeRecommedActive();">
                    ȡ��
                </button>
            </td>
        </tr>--%>
    </table>
</div>
<script type="text/javascript">
    <!--

    function getDataStr(jsonObj, countNum) {
        var paramStr = JSON.stringify(jsonObj);
        try {
            if (countNum) {
                for (var i = 0; i < countNum; i++)
                    paramStr = encodeURIComponent(paramStr);
            }
        } catch (e) {
        }
        var data = "data=" + paramStr;
        return data;
    }

    var global_activeType = 0;
    FileUtilObj.prototype.openRecommedActive = function (activeType) {
        global_activeType = activeType;
        var activeTitleId = document.getElementById("file.activeTitle");
        if (global_activeType == 1) {
            activeTitleId.innerHTML = "�Ƽ����屸��";
        } else if (global_activeType == 2) {
            activeTitleId.innerHTML = "�Ƽ��������";
        } else if (global_activeType == 3) {
            activeTitleId.innerHTML = "�Ƽ����л";
        }
        var index;
        if (undefined == index) {
            if (_fileUtil.getSelectedFileObjCount() > 1) {
                alert('ÿ��ֻ���Ƽ�һ���ļ�!');
                return;
            }

            index = _fileUtil.getSelectedFileObjIndex();
            if (index < 0) {
                alert('����ѡ���ļ�!');
                return;
            }
        }
        var selectFile = _fileUtil.fileList[parseInt(index)];
        if (selectFile.type == 1) {
            alert("ֻ���Ƽ��ļ���");
            return;
        }
        jQuery(function ($) {
            var myDate = new Date();
            var paramStr = "username=" + teachernumber + "&type=" + global_activeType + "&areaid=" + teacherArea;
            <%--var param={"username":teachernumber,"type":global_activeType,"areaid":teacherArea};
            var paramStr=getDataStr(param);
            var listActivesUrl=interurll+"ACTIVITY.LIST";
            $.getJSON(listActivesUrl+"&time="+myDate.getSeconds()+"&reqEncoding=GBK&jsoncallback=?",paramStr,function(resultData){--%>
            $.getJSON("${applicationScope.ipPathMap['ACTIVITY.LIST']}?time=" + myDate.getSeconds() + "&reqEncoding=GBK&jsoncallback=?", paramStr, function (resultData) {
                //alert(JSON.stringify(result));
                $("#activeList").html('');

                var emptyTipText = "";
                if (global_activeType == 1) {
                    emptyTipText = "���屸��";
                } else if (global_activeType == 2) {
                    emptyTipText = "�������";
                } else if (global_activeType == 3) {
                    emptyTipText = "����";
                }
                if (!resultData) {
                    $("#activeList").append("��û��" + emptyTipText + "�!!");
                    return;
                }

                var result = resultData.result;
                if (result == null || result.length == 0) {

                    $("#activeList").append("��û��" + emptyTipText + "�!");

                    return;
                } else {
                    if (resultData.status) {
                        if (resultData.status == -1) {
                            alert("�ӿڲ�ͨ������ͻ���ϵ��");
                            return;
                        }

                    }
                    for (var i = 0; i < result.length; i++) {

                        var tmpItem = result[i];
                        if (!tmpItem) break;
                        var activeTitle = tmpItem.title;
                        var activeId = tmpItem.id;
                        var tmpHtml = '<p><input type="radio" name="activeId" value="' + activeId + '">' + activeTitle + '</p>';

                        $("#activeList").append(tmpHtml);
                    }
                }

            });

        });

        mask.style.display = "";
        document.getElementById("file.activeRecommed").style.display = '';

    };


    FileUtilObj.prototype.saveRecommendActive = function () {
        var tmpValues = document.getElementsByName("activeId");
        var tmpPkId = null;
        for (var i = 0; i < tmpValues.length; i++) {
            var tmpMyValue = tmpValues[i];
            if (tmpMyValue.checked) {
                tmpPkId = tmpMyValue.value;
                break;
            }

        }
        if (!tmpPkId) {
            var activeTitleId = document.getElementById("file.activeTitle");
            alert("��ѡ��" + activeTitleId.innerHTML);
            return;
        }

        var index = _fileUtil.getSelectedFileObjIndex();

        var selectFile = _fileUtil.fileList[parseInt(index)];

        var category = global_activeType;
        var myDate = new Date();
        var tmpCategory = category;
        if (category == 1) {
            tmpCategory = 2;
        }
        <%--var postData={"pkId":tmpPkId,"category":tmpCategory,"name":encodeURIComponent(encodeURIComponent(selectFile.fileName)),"httpurl":selectFile.fCode,"username":teachernumber,"areaid":teacherArea,"schoolid":teacherjyjg,"schoolname":encodeURIComponent(encodeURIComponent(teacherInSchoolName)),"truename":encodeURIComponent(encodeURIComponent(teachername)),"restype":"2","suffix":selectFile.fileType};
        var paramStr=getDataStr(postData);
       // alert(paramStr);
        var addActivesUrl=interurll+"ACTIVITY.ADD";

          $.getJSON(addActivesUrl+"&time="+myDate.getSeconds()+"&reqEncoding=GBK&jsoncallback=?",paramStr,function(resultData){--%>
        var paramStr = "pkId=" + tmpPkId + "&category=" + tmpCategory + "&name=" + encodeURIComponent(encodeURIComponent(selectFile.fileName)) + "&httpurl=" + selectFile.fCode + "&username=" + teachernumber + "&areaid=" + teacherArea + "&schoolid=" + teacherjyjg + "&schoolname=" + encodeURIComponent(encodeURIComponent(teacherInSchoolName)) + "&truename=" + encodeURIComponent(encodeURIComponent(teachername)) + "&restype=2&suffix=" + selectFile.fileType;
        $.getJSON("${applicationScope.ipPathMap['ACTIVITY.ADD']}?time=" + myDate.getSeconds() + "&reqEncoding=GBK&jsoncallback=?", paramStr, function (resultData) {
            if (!resultData) {
                alert("�ӿڲ�ͨ������ͻ���ϵ����");
                return;
            }
            // alert(resultData.msg);
            if (resultData) {
                if (resultData.status) {
                    if (resultData.status == -1) {
                        alert("�ӿڲ�ͨ������ͻ���ϵ��");
                        return;
                    }
                }
                if (resultData.done == 0) {
                    alert("�����ɹ���");
                } else {
                    alert(resultData.msg);
                }
            }

        });

    };


    FileUtilObj.prototype.closeRecommedActive = function () {
        mask.style.display = "none";
        document.getElementById('file.activeRecommed').style.display = 'none';

    };

    //-->
</script>

