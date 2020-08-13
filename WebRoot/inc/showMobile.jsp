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
                //alert(xml+"请求有错误");
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
                //document.getElementById("mobile_set_tip").innerHTML='提示：请输入手机验证码!<br />';
                void (divid_Mobliediv.style.display = maskAll.style.display = 'block');//显示年级相关数据
                global_divId = "divid_Mobliediv";//贮存全局层id
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
        mobileTip.innerHTML = "重新获取剩余时间<font style=\"color:red\">" + mobileTryCurrent + "秒</font>";

        if (mobileTryCurrent == 0) {
            document.getElementById("pageNextMobileDis").className = "pageNextMobile";
            window.clearInterval(sleepFlag);
            mobileFlag = true;
            var getCodeIdText = document.getElementById("getCodeIdText");
            getCodeIdText.innerHTML = "获取验证码";
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

            getCodeIdText.innerHTML = "正在获取..";
            //
            sleepI(60);
            var sendPhoneCodeUrl = "<%=path%>/mobile/sendPhoneCode.do";
            //发送通知发送验证码到手机
            sendRequestJson(moblieGetCodeNeed, sendPhoneCodeUrl, "GET", "", true);


            // getCodeIdText.innerHTML="获取验证码";

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
                    sendMobileTip.innerHTML = "验证码已发送!";
                } else {
                    sendMobileTip.innerHTML = result.message;

                }
                var getCodeIdText = document.getElementById("getCodeIdText");
                getCodeIdText.innerHTML = "获取验证码";


            }

        }
    }

    //验证手机验证码
    function mobileValidateCode() {

        var validatePhoneCodeUrl = "<%=path%>/mobile/validatePhoneCode.do";
        //发送通知发送验证码到手机
        var mobileCodeText = document.getElementById("mobileCode").value;
        if (mobileCodeText == "") {
            var mobileTip = document.getElementById("mobileTip");
            mobileTip.innerHTML = "验证码不能为空";
        }

        if (myTemplateMobileCode && myTemplateMobileCode != "") {
            validateTmpCode();
        } else {
            var dataStr = "userEnterPhoneCode=" + mobileCodeText;
            sendRequestJson(mobileValidateCodeNeed, validatePhoneCodeUrl, "GET", dataStr, true);
        }
    }

    var mobileNeedSet;

    //获取临时码
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
                    //         document.getElementById("mobileTip").innerHTML="你本月还剩余"+leftCount+"次，能获取临时验证码。";

                    //   document.getElementById("sendMobileTip").innerHTML="获取临时验证码成功";
                    document.getElementById("mobileSelftCount").innerHTML = "<font color=red>" + leftCount + "</font>";


                } else {

                    // document.getElementById("mobileTip").innerHTML="无法获取临时验证码，你本月已经使用了"+parseInt(result.tmpCodeCount)+"次";
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
                    //         document.getElementById("mobileTip").innerHTML="你本月还剩余"+leftCount+"次，能获取临时验证码。";
                    selftCount = leftCount;
                    //   document.getElementById("sendMobileTip").innerHTML="获取临时验证码成功";
                    document.getElementById("mobileSelftCount").innerHTML = "<font color=red>" + leftCount + "</font>";


                } else {

                    // document.getElementById("mobileTip").innerHTML="无法获取临时验证码，你本月已经使用了"+parseInt(result.tmpCodeCount)+"次";
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
            document.getElementById("mobileTip").innerHTML = "您本月获取临时验证码的次数已使用完毕！";
        }

    }

    function validateTmpCode() {
        if (myTemplateMobileCode == document.getElementById("mobileCode").value) {
            var validatePhoneCodeUrl = "<%=path%>/mobile/validateTmpCode.do"
            sendRequestJson(validateTmpCodeJscon, validatePhoneCodeUrl, "GET", "", true);
        } else {
            var mobileTip = document.getElementById("mobileTip");
            mobileTip.innerHTML = "验证码错误";

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
<!--短信验证-开始-->
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

                     手机验证设置：请输入正确的验证码
                 -->
            <dl class="ipSetMobile">
                <dt>
                    请输入手机验证码
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

        <!-- 提示信息 -->

        <div class="page marR2" style="width: 430px;height: 65px;">

            <div class="pageNextMobile" id="pageNextMobileDis">
                <a id="getCodeId" href="javascript:moblieGetCode();"><span id="getCodeIdText">获取验证码</span></a>

            </div>

            <div class="pageNextMobile">
                <a href="javascript:mobileValidateCode(); ">确 定</a>
            </div>
        </div>

        <div style="width: 100%;float: left;font-size: 15px;padding-top:5px;"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为了保证您的帐号安全，每天首次登录本系统时需要输入手机短信验证码，并确保手机处于正常状态。如未及时收到短信验证码，请使用临时验证码。</b>
        </div>

        <div id="tmpMoblieDownTip" style="width: 100%;float: left;font-size: 15px;padding-top:5px;display:block;">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>1：点击</b>
                <button class="pageNextMobile2" onclick="mobileTmpCode('set')" style="font-size: 16px;">获取临时验证码</button>
                <b>系统会自动给您分配一个验证码，您本月还剩余<span id="mobileSelftCount"></span>次获取机会。</b></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>2：如遇问题请拨打客服电话：400-699-3111。</b></p>

        </div>

    </div>

    <div class="divBottom"></div>

</div>
