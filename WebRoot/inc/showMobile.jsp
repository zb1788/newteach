<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%
    String path = request.getContextPath();
%>
<!-- inc/showMobile.jsp -->
<script type="text/javascript">
    function mobileShow() {
        sendRequestJson(mobileShowNeed, "<%=path%>/mobile/needPhoneCode.do", "GET", "", false);
        showOnlyTmpCount();
    }

    function sendRequestJson(callback, url, method, dataStr, isAsync) {

        $.ajax({
            url: url,
            type: method,
            async: isAsync,
            datatype: 'json',
            timeout: 30000,
            data: dataStr,
            error: function (xml) {
                //alert(xml+"�����д���");
            },
            success: function (xml) {
                callback(xml);
            }
        });
    }

    function mobileShowNeed(json) {
        try {
            json = json.replace(/\\/g, '/');
            var result = eval('(' + json + ')');

            //alert(result.needPhoneCode);
            if (result.needPhoneCode == "1") {
                maskAll.style.display = 'block';
                //document.getElementById("mobile_set_tip").innerHTML='��ʾ���������ֻ���֤��!<br />';
                void (divid_Mobliediv.style.display = maskAll.style.display = 'block');//��ʾ�꼶�������
                global_divId = "divid_Mobliediv";//����ȫ�ֲ�id
                if (isAllowSimpleHotKey) _simpleHotKey.pid = global_divId;
                moblieGetCode();
            }
        } catch (e) {
        }
        // alert(json);

    }

    var mobileFlag = true;
    var sleepFlag;
    var mobileTryCurrent = 60;

    function sleepI(n) {
        mobileTryCurrent = n;
        sleepFlag = window.setInterval("cSleepFlag()", 1000);
    }

    function cSleepFlag() {
        var mobileTip = document.getElementById("mobileTip");
        mobileTryCurrent--;
        mobileTip.innerHTML = "���»�ȡʣ��ʱ��<font style=\"color:red\">" + mobileTryCurrent + "��</font>";

        if (mobileTryCurrent == 0) {
            document.getElementById("pageNextMobileDis").className = "pageNextMobile";
            window.clearInterval(sleepFlag);
            mobileFlag = true;
            var getCodeIdText = document.getElementById("getCodeIdText");
            getCodeIdText.innerHTML = "��ȡ��֤��";
            mobileTip.innerHTML = "";
        }
    }

    function moblieGetCode() {
        document.getElementById("pageNextMobileDis").className = "pageNextMobileDis";
        var getCodeIdText = document.getElementById("getCodeIdText");
        var mobileTip = document.getElementById("mobileTip");
        if (mobileFlag) {

            mobileFlag = false;
            sendMobileTip.innerHTML = "";

            getCodeIdText.innerHTML = "���ڻ�ȡ..";
            //
            sleepI(60);
            var sendPhoneCodeUrl = "<%=path%>/mobile/sendPhoneCode.do";
            //����֪ͨ������֤�뵽�ֻ�
            sendRequestJson(moblieGetCodeNeed, sendPhoneCodeUrl, "GET", "", true);


            // getCodeIdText.innerHTML="��ȡ��֤��";

            // mobileTip.innerHTML="";
        } else {
            return;
        }

    }

    function moblieGetCodeNeed(jsonStr) {

        if (jsonStr != null && jsonStr != "") {
            var json = jsonStr;
            json = json.replace(/\\/g, '/');
            var result = eval('(' + json + ')');
            if (result) {

                var mobileTip = document.getElementById("mobileTip");
                mobileTip.innerHTML = "";
                if (sleepFlag) {
                    // window.clearInterval(sleepFlag);
                }
                if (result.type == "1") {
                    myTemplateMobileCode = "";
                    sendMobileTip.innerHTML = "��֤���ѷ���!";
                } else {
                    sendMobileTip.innerHTML = result.message;

                }
                var getCodeIdText = document.getElementById("getCodeIdText");
                getCodeIdText.innerHTML = "��ȡ��֤��";


            }

        }
    }

    //��֤�ֻ���֤��
    function mobileValidateCode() {

        var validatePhoneCodeUrl = "<%=path%>/mobile/validatePhoneCode.do";
        //����֪ͨ������֤�뵽�ֻ�
        var mobileCodeText = document.getElementById("mobileCode").value;
        if (mobileCodeText == "") {
            var mobileTip = document.getElementById("mobileTip");
            mobileTip.innerHTML = "��֤�벻��Ϊ��";
        }

        if (myTemplateMobileCode && myTemplateMobileCode != "") {
            validateTmpCode();
        } else {
            var dataStr = "userEnterPhoneCode=" + mobileCodeText;
            sendRequestJson(mobileValidateCodeNeed, validatePhoneCodeUrl, "GET", dataStr, true);
        }
    }

    var mobileNeedSet;

    //��ȡ��ʱ��
    function mobileTmpCode(tmpSet) {
        mobileNeedSet = tmpSet;
        if (!mobileNeedSet && document.getElementById("tmpMoblieDownTip").style.display == "block") {
            document.getElementById("tmpMoblieDownTip").style.display = "none"
            return;
        }

        var validatePhoneCodeUrl = "<%=path%>/mobile/sendTmpCode.do"
        sendRequestJson(mobileTmpCodeJscon, validatePhoneCodeUrl, "GET", "", true);
    }

    function showOnlyTmpCount() {

        var validatePhoneCodeUrl = "<%=path%>/mobile/sendTmpCode.do"
        sendRequestJson(mobileTmpCodeJsconOnlyCount, validatePhoneCodeUrl, "GET", "", true);

    }

    function mobileTmpCodeJsconOnlyCount(jsonStr) {

        if (jsonStr != null && jsonStr != "") {
            var json = jsonStr;
            json = json.replace(/\\/g, '/');
            var result = false;
            try {
                result = eval('(' + json + ')');
            } catch (e) {
            }
            if (result) {
                if (result.allow == "true") {
                    //      document.getElementById("mobileCode").value=result.rand;
                    var leftCount = parseInt(result.tmpCodeCount) - parseInt(result.noCheckCountUsed);
                    //         document.getElementById("mobileTip").innerHTML="�㱾�»�ʣ��"+leftCount+"�Σ��ܻ�ȡ��ʱ��֤�롣";

                    //   document.getElementById("sendMobileTip").innerHTML="��ȡ��ʱ��֤��ɹ�";
                    document.getElementById("mobileSelftCount").innerHTML = "<font color=red>" + leftCount + "</font>";


                } else {

                    // document.getElementById("mobileTip").innerHTML="�޷���ȡ��ʱ��֤�룬�㱾���Ѿ�ʹ����"+parseInt(result.tmpCodeCount)+"��";
                    document.getElementById("mobileSelftCount").innerHTML = "<font color=red>0</font>"
                }

            }
        }
    }


    var myTemplateMobileCode;
    var selftCount = 0;

    function mobileTmpCodeJscon(jsonStr) {
        document.getElementById("mobileCode").value = "";
        if (jsonStr != null && jsonStr != "") {
            var json = jsonStr;
            json = json.replace(/\\/g, '/');
            var result = eval('(' + json + ')');
            if (result) {
                if (result.allow == "true") {
                    //      document.getElementById("mobileCode").value=result.rand;
                    myTemplateMobileCode = result.rand;

                    var leftCount = parseInt(result.tmpCodeCount) - parseInt(result.noCheckCountUsed);
                    //         document.getElementById("mobileTip").innerHTML="�㱾�»�ʣ��"+leftCount+"�Σ��ܻ�ȡ��ʱ��֤�롣";
                    selftCount = leftCount;
                    //   document.getElementById("sendMobileTip").innerHTML="��ȡ��ʱ��֤��ɹ�";
                    document.getElementById("mobileSelftCount").innerHTML = "<font color=red>" + leftCount + "</font>";


                } else {

                    // document.getElementById("mobileTip").innerHTML="�޷���ȡ��ʱ��֤�룬�㱾���Ѿ�ʹ����"+parseInt(result.tmpCodeCount)+"��";
                    document.getElementById("mobileSelftCount").innerHTML = "<font color=red>0</font>"
                }
                if (sleepFlag)
                    window.clearInterval(sleepFlag);
                mobileTryCurrent = 1;
                cSleepFlag();
                document.getElementById("tmpMoblieDownTip").style.display = "block";
                if (mobileNeedSet) {
                    setTmpCodeLink();
                }
            }
        }

    }

    function setTmpCodeLink() {

        if (selftCount > 0) {
            document.getElementById("mobileCode").value = myTemplateMobileCode;
            validateTmpCode();
        } else {
            document.getElementById("mobileTip").innerHTML = "�����»�ȡ��ʱ��֤��Ĵ�����ʹ����ϣ�";
        }

    }

    function validateTmpCode() {
        if (myTemplateMobileCode == document.getElementById("mobileCode").value) {
            var validatePhoneCodeUrl = "<%=path%>/mobile/validateTmpCode.do"
            sendRequestJson(validateTmpCodeJscon, validatePhoneCodeUrl, "GET", "", true);
        } else {
            var mobileTip = document.getElementById("mobileTip");
            mobileTip.innerHTML = "��֤�����";

        }


    }

    function validateTmpCodeJscon(jsonStr) {

        if (jsonStr != null && jsonStr != "") {
            var json = jsonStr;
            json = json.replace(/\\/g, '/');
            var result = eval('(' + json + ')');
            if (result) {
                if (result.msg && result.msg == "ok") {
                    if (sleepFlag) {
                        window.clearInterval(sleepFlag);

                    }


                    divid_Mobliediv.style.display = maskAll.style.display = 'none';

                }
            }

        }
    }


    function mobileValidateCodeNeed(jsonStr) {
        if (jsonStr != null && jsonStr != "") {
            var json = jsonStr;
            json = json.replace(/\\/g, '/');
            var result = eval('(' + json + ')');
            if (result) {
                var mobileTip = document.getElementById("mobileTip");

                if (result.type == "1") {
                    if (sleepFlag) {
                        window.clearInterval(sleepFlag);

                    }


                    divid_Mobliediv.style.display = maskAll.style.display = 'none';
                }
                mobileTip.innerHTML = result.message;

            }
        }

    }


</script>
<!--������֤-��ʼ-->
<div class="floatDiv" id="divid_Mobliediv" style="height:600px">
    <div class="divTop">
        <div style="display:none" class="divClose"
             onclick="void(divid_Mobliediv.style.display=maskAll.style.display='none');"></div>
        <div class="divTitle">

        </div>
        <div class="divContent">
            <br/>
            <br/>


            <!--<h3>&nbsp;</h3>

                     �ֻ���֤���ã���������ȷ����֤��
                 -->
            <dl class="ipSetMobile">
                <dt>
                    �������ֻ���֤��
                </dt>
                <dd style="width: 400px;">
                    <input type="text" id="mobileCode" maxlength="13"/> <span id="sendMobileTip"></span>
                </dd>
            </dl>
            <dl class="ipSetMobile">
                <dt>&nbsp;&nbsp;</dt>
                <dd id="mobileTip" style="width: 400px;">

                </dd>
            </dl>
            <span class="clearfix"></span>

        </div>

        <!-- ��ʾ��Ϣ -->

        <div class="page marR2" style="width: 430px;height: 65px;">

            <div class="pageNextMobile" id="pageNextMobileDis">
                <a id="getCodeId" href="javascript:moblieGetCode();"><span id="getCodeIdText">��ȡ��֤��</span></a>

            </div>

            <div class="pageNextMobile">
                <a href="javascript:mobileValidateCode(); ">ȷ ��</a>
            </div>
        </div>

        <div style="width: 100%;float: left;font-size: 15px;padding-top:5px;"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ϊ�˱�֤�����ʺŰ�ȫ��ÿ���״ε�¼��ϵͳʱ��Ҫ�����ֻ�������֤�룬��ȷ���ֻ���������״̬����δ��ʱ�յ�������֤�룬��ʹ����ʱ��֤�롣</b>
        </div>

        <div id="tmpMoblieDownTip" style="width: 100%;float: left;font-size: 15px;padding-top:5px;display:block;">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>1�����</b>
                <button class="pageNextMobile2" onclick="mobileTmpCode('set')" style="font-size: 16px;">��ȡ��ʱ��֤��</button>
                <b>ϵͳ���Զ���������һ����֤�룬�����»�ʣ��<span id="mobileSelftCount"></span>�λ�ȡ���ᡣ</b></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>2�����������벦��ͷ��绰��400-699-3111��</b></p>

        </div>

    </div>

    <div class="divBottom"></div>

</div>
