<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%@page import="vcom.sso.vo.*" %>
<%@page import="vcom.util.*" %>
<%@page import="net.sf.json.JsonConfig" %>
<%@page import="vcom.util.InterfaceCfg" %>
<%@page import="net.sf.json.JSONObject" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);

    AuthResult authResult = (AuthResult) request.getSession().getAttribute("authResult");
    String infoAllowUseNeed = authResult.getInfoAllowUseNeed();
    String infoAllowUseNeedTip = authResult.getInfoAllowUseNeedTip();

    String transferProtocol_web = request.getParameter("transferProtocol_web");
    String ut = request.getParameter("ut");

    JSONObject _config = JSONObject.fromObject(InterfaceCfg.ipMap, new JsonConfig());
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="x-ua-compatible" content="IE=EmulateIE7"/>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <meta http-equiv="Pragma" NAME="" CONTENT="no-cache"/>
    <meta http-equiv="Cache-Control" NAME="" CONTENT="no-cache"/>
    <meta http-equiv="Expires" NAME="" CONTENT="0"/>
    <title>公告</title>
    <link rel="stylesheet" href="./img/read/zy.css" type="text/css">
    <script type="text/javascript" src="<%=path%>/script/jquery172min.js"></script>
    <script type="text/javascript">
        var _config =<%=_config.toString() %>;
        var transferProtocol_web = "<%=transferProtocol_web%>";
        var ut = "<%=ut%>";
        var clickFlag = 1;

        function goPortal() {
            window.location = 'https://test.yjt361.com/loginaction.action?data=';
        }

        function goPwdModify() {
            window.location = 'https://tmstest.yjt361.com:443/tms//ucUser/forceModifyPwd.do';
        }


        var leftTime = 20;

        function goLogin() {
            if (leftTime == 1) {
                goPortal();
            } else {
                leftTime -= 1;
                document.getElementById("leftSencond").innerHTML = leftTime;
            }
        }

        var leftTimeInfoAllow = 6;

        function leftTimeInfoAllowDo() {
            if (leftTimeInfoAllow == 1) {
                document.getElementById("leftSencondInfoAllow").innerHTML = '';
                $("#infoUseAuth").attr("class", "bt");
            } else {
                leftTimeInfoAllow -= 1;
                document.getElementById("leftSencondInfoAllow").innerHTML = leftTimeInfoAllow + '秒后';
            }
        }

        function logout() {
            window.location = 'https://ssotest.yjt361.com:443/sso//logout';
        }

        function infoUseAuth() {
            if (leftTimeInfoAllow == 1) {
                var requrl = transferProtocol_web + _config["SSO"] + "/sso/interface/passInfo.jsp?ut=" + ut;
                alert(requrl);
                /**
                 ajaxJson(requrl,null,null,function(data){
			alert('a');
			if(data.rtnFlg==0){
				//失败
				alert(data.rtnInfo);		
			}else{
				alert('b');
				window.parent.art.dialog({id: 'readInfo'}).close();	
			}		
		})
                 //window.parent.art.dialog({id: 'readInfo'}).close();
                 */

                $.ajax({
                    url: requrl,
                    method: 'get',
                    data: {
                        ran: Math.random(),
                        ut: ut
                    },
                    dataType: 'jsonp',
                    jsonp: "jsoncallback",
                    scriptCharset: 'GBK',
                    success: function (data) {
                        alert('a');
                        alert(data.rtnFlg);
                        clickFlag = 1;
                        if (data.rtnFlg == 0) {
                            //失败
                            alert(data.rtnInfo);
                        } else {
                            alert('xx');
                            alert(window.parent.document.title);
                            window.parent.art.dialog({id: 'readInfo'}).close();
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest.status);
                        alert(XMLHttpRequest.readyState);
                        alert(textStatus);
                        clickFlag = 1;
                    }

                })
                /**
                 $.post(requrl,{random:parseInt(Math.random()*1000 + 1),'ut':ut},function(data){
			if(data.rtnFlg==0){
				//失败
				alert(data.rtnInfo);		
			}else{
				window.parent.art.dialog({id: 'readInfo'}).close();	
			}
		});
                 */
            }
        }


        function ajaxJson(turl, tdata, charset, fun, timeout, ifasync) {
            var myDate = new Date();
            if (!timeout || timeout == null) {
                timeout = 30000;
            }
            var turl1;
            if (turl.indexOf("?") !== -1) {
                turl1 = "&time=" + myDate.getSeconds();
            } else {
                turl1 = "?time=" + myDate.getSeconds();
            }
            if (typeof (charset) == "undefined" && charset == null) {
                charset = "gbk";
            }
            //alert("是否异步："+ifasync);
            if (ifasync != undefined && ifasync != "undefined" && ifasync != null) {

            } else {
                ifasync = true;
            }
            if (null == tdata || undefined == tdata || tdata.length == 0) {
                turl += turl1;
            } else {
                turl += turl1 + "&" + tdata;
            }
            //alert(ifasync);
            $.ajax({
                url: turl,
                type: "get",
                async: ifasync,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                scriptCharset: charset,
                success: function (rdata) {
                    fun(rdata);
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {

                }
            });
        }
    </script>
</head>
<body>
<div id="top">
    <div class="logo"><a class="logoImg" href="javascript:void(0)"></a></div>
    <div class="phone"><img src="./img/read/phone.png">&nbsp;&nbsp;服务热线：400-637-1319</div>
</div><!-- top end -->
<div style="height:2px; background:#e1373a; width:100%;"></div>

<div class="middle-k" style="padding:20px 0; margin-top:15px;">
    <div class="hui-Bg">
        <ul>
            <!-- <h2 class="redfon3" style="font-size:25px; text-indent:2em; margin-bottom:20px;">温馨提醒</h2> -->
            <p><font class="redfon4"><%=infoAllowUseNeedTip %>
            </font></p>
        </ul>
    </div>
    <div class="btBg">
        <!--  <a href="javascript:void(0);" onclick="logout()" class="bt kong">不授权</a>  -->
        <a href="javascript:void(0);" id="infoUseAuth" onclick="infoUseAuth()" class="btGray"><span
                id="leftSencondInfoAllow"></span>同意并继续</a>
    </div>
    <div class="clearfix"></div>
</div><!--end middle -->

<div class="clearfix"></div>
<script type="text/javascript">
    setInterval('leftTimeInfoAllowDo()', 1000);
</script>
</body>
</html>