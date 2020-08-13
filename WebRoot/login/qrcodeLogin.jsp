<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html style="overflow-y: hidden;overflow-x: hidden;">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=GBK"/>

    <title></title>
    <script type="text/javascript" src="js/jquery172min.js"></script>
    <script type="text/javascript" src="js/qrcode.js"></script>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        body {
            top: 0px;
            left: 0px;

            background: #e0e0e0;
            color: #555;
            font-family: "Microsoft YaHei", Times New Roman, serif;
        }

        .content {
            background: #e0e0e0;
            width: 400px;
            height: 400px;
            position: relative;


            margin-left: auto;
            margin-right: auto;


        }

        .timu {
            /*background: #8C8C8C;*/
            font-size: 18px;
            font-weight: normal;
            margin: 0;
            padding: 10px 10px;
        }

        .del {
            display: block;
            float: right;
            font-style: normal;
            color: #888;
            font-size: 28px;
            position: absolute;
            top: 0px;
            right: 10px;
            cursor: pointer;
        }

        .del:hover {
            color: #333;
        }

        .wei {
            padding: 5px 0px;
        }

        .wei-one {
            padding: 0px 25px;

        }

        .wei-img {
            display: block;
            margin: auto;
            width: 200px;
        }

        .wei-h4 {
            text-align: center;
            font-size: 15px;
            margin: 10px auto;
        }

        .wei-h5 {
            text-align: center;
            font-size: 13px;
            margin: 10px auto;
            cursor: hand;
            color: #129ae8;
        }

        .wei-h5:hover {
            color: #1E90FF;
        }

        .wei-a {
            display: block;
            text-align: center;
            font-size: 18px;
            color: #129ae8;
            margin-right: 10px;
        }

        .wei-a:hover {
            color: #1E90FF;
        }

        .wei-p {
            font: normal 17px/25px "Microsoft YaHei";
            margin: auto;
            color: #333;
        }
    </style>
    <style>
        .msg-err {
            width: 330px;
            height: 330px;
            background: rgb(255, 255, 255);
            background: rgba(255, 255, 255, .90);
            position: absolute;
            left: 10px;
            top: 30px;
            z-index: 9999
        }

        .msg-err h6 {
            color: #3c3c3c;
            margin-top: 38px;
            margin-bottom: 8px;
            text-align: center
        }

        .msg-err .refresh {
            width: 100px;
            height: 36px;
            line-height: 36px;
            text-decoration: none;
            text-align: center;
            margin: 0 auto;
            background: #f40;
            display: block;
            color: #fff;
            border-radius: 3px
        }

        .msg-err .refresh:hover {
            background: #f52b00
        }

    </style>
</head>
<body>
<div class="content">
    <h1 class="timu">
        <center>打开优教信使或微信扫描二维码登录</center>
        <i class="del" onclick="exit()">×</i></h1>
    <div class="wei" id="wei">
        <div id="qrcodeCanvas"
             style="width: 310px; height: 300px; padding-left: 10px; display:block;margin-left:auto;margin-right:auto">
        </div>
        <div class="msg-err"
             style="width: 310px; height: 300px; padding-left: 10px; display:block;margin-left:auto;margin-right:auto;display:none;">
            <h6>二维码已失效</h6>
            <a href="javascript:;" onclick="freshQrcode()" class="refresh J_QRCodeRefresh">请点击刷新</a>
        </div>

    </div>

</div>

<script type="text/javascript">

    $(document).ready(function () {

        freshQrcode();

    })
</script>

<script>
    var uuid;
    var timerId;//定时器id
    var countLimit = 300;//允许多少秒停止自动查询扫码结果 默认5分钟
    var frequency = 3;//允许多少秒查询一次扫码结果  默认3秒钟
    var recordTime = 0;//记录已查询多少秒
    var qrcode;
    var port = "8900";//二维码端口
    try {
        if (QueryString("sso").indexOf("https") > -1) {
            port = "8901";
        }
    } catch (e) {
    }

    function makeQcode() {
        //显示二维码
        //获取ip，port，计算机名称
        if (typeof qrcode == "undefined") {
            qrcode = new QRCode(document.getElementById("qrcodeCanvas"), {
                width: 300,
                height: 300
            });
        }


        var timestamp = Date.parse(new Date());
        var url = decodeURIComponent(QueryString("sso")) + ":" + port;
        var data = "type=getcode&timestamp=" + timestamp;

        ajaxJson(url, data, "utf-8", function (rdata) {
            var myjson = eval(rdata);
            uuid = myjson.key;
            var qrcodeUrl = decodeURIComponent(myjson.url);
            //授课端接收到请求二维码信息后，在url加上scantype参数4
            if (qrcodeUrl != "") {
                qrcodeUrl = qrcodeUrl + "&scantype=4";
            }
            qrcode.makeCode(qrcodeUrl);
            timerId = setInterval('timeDeal();searchRel();', frequency * 1000);
        })
    }

    function timeDeal() {
        if (countLimit <= recordTime) {
            //显示遮罩层
            $(".msg-err").css("display", "block");
            clearInterval(timerId);

        } else {
            recordTime = recordTime + frequency;
        }

    }

    function exit() {
        top.art.dialog({id: "qrcodeLogin"}).close();
    }

    function freshQrcode() {
        recordTime = 0;//记录已查询多少秒
        //隐藏遮罩层
        $(".msg-err").css("display", "none");
        var temptimerId = setInterval(function () {
            clearInterval(temptimerId);
            makeQcode();
        }, 200);

    }

    function searchRel() {

        var timestamp = Date.parse(new Date());
        var url = decodeURIComponent(QueryString("sso")) + ":" + port;
        var data = "type=getstatus&key=" + uuid + "&timestamp=" + timestamp;
        ajaxJson(url, data, "utf-8", function (rdata) {

            var myjson = eval(rdata);
            if (myjson.flag == "2") {
                var ssoUrl = decodeURIComponent(QueryString("sso")) + "/sso/verifyAuthInfo?appFlg=PLS&loginUsertype=teacher&key=" + uuid;
                //var ssoUrl = "http://ssokw2.czbanbantong.com/sso/verifyAuthInfo?appFlg=PLS&loginUsertype=teacher&key="+uuid;

                ssoUrl += "&username=";
                ssoUrl += "&pwd=";
                ssoUrl += "&pwdRsa=";
                //ssoUrl +="&encodeP=1";//空 md5算法 ,1 rsa算法 2 base64算法 3 3des算法
                ssoUrl += "&mac=";

                ajaxJson(ssoUrl, null, "utf-8", function (result) {
                    if (result.authFlg && result.authFlg == 0) {
                        //认证成功
                        top.art.dialog.data("result", 1);
                        exit();
                    }

                });

            }


        });
    }

    function ajaxJson(turl, tdata, charset, fun, timeout, ifasync, jsoncallback) {
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
        if (typeof (jsoncallback) == "undefined" && jsoncallback == null) {
            jsoncallback = "jsoncallback";
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
            jsonp: jsoncallback,
            scriptCharset: charset,
            success: function (rdata) {
                fun(rdata);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                //alert("error"+textStatus + errorThrown);
                //异步跨域调用无法获得异常
                //alert('请求超时！');
            }
        });
    }

    function QueryString(name) {
        var sURL = window.location.search
        var re = new RegExp("" + name + "=([^&?]+)", "ig");
        var result = re.exec(sURL);
        if (result) {
            var temp = result[0].split('=');
            return temp[1];
        } else {
            return "";
        }
    }
</script>
</body>
</html>
