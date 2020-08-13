<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<!-- IP设置 begin -->


<div style="display: none;">
    <OBJECT ID="ipActiveX" WIDTH=350 HEIGHT=50
            CLASSID="CLSID:f7f17642-76a0-4824-97dc-bb623582c998">
        <PARAM NAME="_Version" VALUE="65536">
        <PARAM NAME="_ExtentX" VALUE="2646">
        <PARAM NAME="_ExtentY" VALUE="1323">
        <PARAM NAME="_StockProps" VALUE="0">
    </OBJECT>
</div>
<form action="" name="ipform">
    <!--IP 窗口 begin-->
    <div id="net.ipConfigWindow" class="floatDiv" style="display: none;">

        <div class="divTop">
            <div class="divClose" onclick="new IPConfigObj().closeWindow();"></div>
            <div class="divTitle">
                IP设置！
            </div>
            <div class="divContent">
                <h4>
                    <label>
                        <input type="radio" id="dhcpEnabled1" name="dhcpEnabled" value="1"
                               onfocus="javascript:changeGetMode(this.value);"/>
                        自动获得IP地址（如果网络支持此功能，则可以获取自动指派的IP设置）
                    </label>

                    <br/>

                    <label>
                        <input type="radio" id="dhcpEnabled0" name="dhcpEnabled" value="0"
                               onfocus="javascript:changeGetMode(this.value);"/>
                        使用下面的IP地址（否则，您需要从网络管理员处获得适当的IP设置）
                    </label>
                </h4>
                <dl class="ipSet">
                    <!--  IP地址-->
                    <dt>
                        IP地址：
                    </dt>
                    <dd>
                        <input type="text" id="ipAddress" name="ipAddress"/>
                    </dd>
                    <!--  子网掩码：-->
                    <dt>
                        子网掩码：
                    </dt>
                    <dd>
                        <input type="text" id="subnetMask" name="subnetMask"/>
                    </dd>
                    <!--  默认网关：：-->
                    <dt>
                        默认网关：
                    </dt>
                    <dd>
                        <input type="text" id="defaultGateway" name="defaultGateway"/>
                    </dd>
                    <!--  首选DNS服务器：：-->
                    <dt>
                        首选DNS服务器：
                    </dt>
                    <dd>
                        <input type="text" id="dnsServer" name="dnsServer"/>
                    </dd>
                    <!--  备用DNS服务器：-->
                    <dt>
                        备用DNS服务器：
                    </dt>
                    <dd>
                        <input type="text" id="dnsServerBak" name="dnsServerBak"/>
                    </dd>
                </dl>


                <span class="clearfix"></span>

            </div>
            <span class="clearfix"></span>
            <!-- 提示信息 -->
            <div class="" id="net.tip">
            </div>
            <div class="page marR2">

                <div class="pageNext">
                    <a href="javascript:new IPConfigObj().closeWindow();">返 回</a>
                </div>
                <div class="pageNext">

                    <a href="#" onclick="setIpConfig();"
                       id="ipConfig.confirm">确 定</a>
                </div>
            </div>
        </div>


        <div class="divBottom"></div>
    </div>
    <!--IP 窗口 end-->
</form>
<!-- IP设置 end-->
<SCRIPT LANGUAGE="JavaScript">
    var _ipConfig = new IPConfigObj();

    function IPConfigObj() {
    }

    //_ipConfig.tip();
    IPConfigObj.prototype.tip = function (tip) {
        document.getElementById('net.tip').className = "tipsInfo";
        document.getElementById('net.tip').innerHTML = tip;

    }
    IPConfigObj.prototype.openWindow = function () {
        document.getElementById('net.ipConfigWindow').style.display = "block";
        loadIpConfig();
        if (isAllowSimpleHotKey) _simpleHotKey.pid = 'net.ipConfigWindow';

        document.getElementById('net.tip').className = "";
        document.getElementById('net.tip').innerHTML = '';
    }
    IPConfigObj.prototype.closeWindow = function () {

        void (document.getElementById('net.ipConfigWindow').style.display = 'none');
        _sysConfg.openWindow();
        // document.getElementById('netconfig.ipbutton').focus();

    };

    var strHref = window.location.href;
    var intPos = strHref.indexOf("?");
    var strRight = strHref.substr(intPos + 1);
    var arrTmp = strRight.split("&");
    var gotoUrl = "";//页面访问方式需要这样，file:///F:/pd/1/PLS/WebRoot/teach/ipconfig.htm?gotoURL=http://192.168.104.193/teach/
    for (var i = 0; i < arrTmp.length; i++) {
        var arrTemp = arrTmp[i].split("=");
        if (arrTemp[0].toUpperCase() == "GOTOURL".toUpperCase()) {
            gotoUrl = arrTemp[1];
        }
    }

    //xml加载函数
    /*
function loadXMLDoc(dname)
{
    try //Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
    }
    catch(e)
    {
        try //Firefox, Mozilla, Opera, etc.
        {
            xmlDoc=document.implementation.createDocument("","",null);
        }
        catch(e) {alert(e.message)}
    }
    try
    {
        xmlDoc.async=false;
        xmlDoc.load(dname);
        return(xmlDoc);
    }
    catch(e) {alert(e.message)}
    return(null);
}
*/
    //检查内容是否为IP地址！
    function CheckIP(objValue) {
        var Re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
        var passedTest = false;

        if (Re.test(objValue)) {
            objValue.match(Re);
            if (RegExp.$1 <= 255 && RegExp.$1 >= 1
                && RegExp.$2 <= 255 && RegExp.$2 >= 0
                && RegExp.$3 <= 255 && RegExp.$3 >= 0
                && RegExp.$4 <= 255 && RegExp.$4 >= 0) {
                passedTest = true;
            }
        }

        if (!passedTest) {
            return false;
        } else {
            return true;
        }
    }

    function loadIpConfig() {
        //alert();
        var str = document.getElementById("ipActiveX").LoadParameter();
        //alert("The parameter you entered is:<br> " +  str);
        var ipArr = str.split("|");
        if (ipArr[0] == "1") {//自动
            document.getElementById("dhcpEnabled1").checked = "true";
            document.getElementById("dhcpEnabled1").focus();
        } else if (ipArr[0] == "0") {//手动
            document.getElementById("dhcpEnabled0").checked = "true";
            document.getElementById("dhcpEnabled0").focus();
        }
        document.getElementById("ipAddress").value = ipArr[1];
        document.getElementById("subnetMask").value = ipArr[2];
        document.getElementById("defaultGateway").value = ipArr[3];
        var dns = ipArr[4];
        document.getElementById("dnsServer").value = dns.split(",")[0];
        if (dns.indexOf(",") > 0) {
            document.getElementById("dnsServerBak").value = dns.split(",")[1];
        } else {
            document.getElementById("dnsServerBak").value = "";
        }
    }

    function setIpConfig() {
        var passStr = "";
        var ipaddress;
        var subnetmask;
        var defaultgateway;
        var dnsserver;
        var ipConfigStr = "";//设置执行后的返回串

        ipaddress = document.getElementById("ipAddress").value;
        subnetmask = document.getElementById("subnetMask").value;
        defaultgateway = document.getElementById("defaultGateway").value;
        dnsserver = document.getElementById("dnsServer").value;
        dnsserverbak = document.getElementById("dnsServerBak").value;
        var dhcpArr = document.getElementsByName("dhcpEnabled");
        for (i = 0; i < dhcpArr.length; i++) {
            if (dhcpArr[i].checked) {
                passStr += dhcpArr[i].value;
                if (dhcpArr[i].value == "1") {// 自动
                    if (dnsserver != null && dnsserver != "" && !CheckIP(dnsserver)) {
                        _ipConfig.tip("首选DNS服务器不是有效的IPV4格式！");
                        document.getElementById("dnsServer").focus();
                        return false;
                    } else if (dnsserverbak != null && dnsserverbak != "" && !CheckIP(dnsserverbak)) {
                        _ipConfig.tip("备用DNS服务器不是有效的IPV4格式！");
                        document.getElementById("dnsServerBak").focus();
                        return false;
                    }
                    passStr += "|||";//自动获取IP时，ip、子网掩码、默认网关都为空
                } else if (dhcpArr[i].value == "0") {// 手动
                    if (ipaddress == null || ipaddress == "") {
                        _ipConfig.tip("请输入IP地址");
                        document.getElementById("ipAddress").focus();
                        return false;
                    } else if (!CheckIP(ipaddress)) {
                        _ipConfig.tip("IP地址不是有效的IPV4格式！");
                        document.getElementById("ipAddress").focus();
                        return false;
                    } else if (subnetmask == null || subnetmask == "") {
                        _ipConfig.tip("请输入子网掩码！");
                        document.getElementById("subnetMask").focus();
                        return false;
                    } else if (!CheckIP(subnetmask)) {
                        _ipConfig.tip("子网掩码不是有效的IPV4格式！");
                        document.getElementById("subnetMask").focus();
                        return false;
                    } else if (defaultgateway == null || defaultgateway == "") {
                        _ipConfig.tip("请输入默认网关！");
                        document.getElementById("defaultGateway").focus();
                        return false;
                    } else if (!CheckIP(defaultgateway)) {
                        _ipConfig.tip("默认网关不是有效的IPV4格式！");
                        document.getElementById("defaultGateway").focus();
                        return false;
                    } else if (dnsserver != null && dnsserver != "" && !CheckIP(dnsserver)) {
                        _ipConfig.tip("首选DNS服务器不是有效的IPV4格式！");
                        document.getElementById("dnsServer").focus();
                        return false;
                    } else if (dnsserverbak != null && dnsserverbak != "" && !CheckIP(dnsserverbak)) {
                        _ipConfig.tip("备用DNS服务器不是有效的IPV4格式！");
                        document.getElementById("dnsServerBak").focus();
                        return false;
                    }
                    passStr += "|" + ipaddress;
                    passStr += "|" + subnetmask;
                    passStr += "|" + defaultgateway;
                }
                if ((dnsserver == null || dnsserver == "") && (dnsserverbak != null && dnsserverbak != "")) {
                    passStr += "|" + dnsserverbak;
                } else {
                    if (dnsserver != null && dnsserver != "") {
                        passStr += "|" + dnsserver;
                    } else {
                        passStr += "|";
                    }
                    if (dnsserverbak != null && dnsserverbak != "") {
                        passStr += "," + dnsserverbak;
                    }
                }
            }
        }
        ipConfigStr = document.getElementById("ipActiveX").SetParameter(passStr);
        if (ipConfigStr.toUpperCase() == "OK") {

            if (confirm("网络设置成功，需要重启客户端！")) {
                _common.exitSystem();
                //document.getElementById("ipActiveX").PcRestart();
            }
            /*
            xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async=false;
            xmlDoc.load("url.xml");
            //gotoUrl = xmlDoc.getElementsByTagName("url")[0].childNodes[0].nodeValue;
            gotoUrl = "http://192.168.60.222/teach/index.do";
            //alert("gotoUrl:"+gotoUrl);
            if(gotoUrl!=""){
                setTimeout(function(){
                    alert(gotoUrl);
                    window.location.href = gotoUrl;
                    },3000);
            }
            */
        } else if (ipConfigStr.toUpperCase() == "NO") {
            alert("网络设置失败！");
        }
    }

    function hideIp(id) {
        //document.getElementById(id).value="";
        document.getElementById(id).disabled = true;
    }

    function showIp(id) {
        document.getElementById(id).disabled = false;
    }

    function changeGetMode(objValue) {
        if (objValue == "0") { // 手动获取IP
            showIp("ipAddress");
            showIp("subnetMask");
            showIp("defaultGateway");
        } else if (objValue == "1") { // 自动获取IP
            hideIp("ipAddress");
            hideIp("subnetMask");
            hideIp("defaultGateway");
        }
    }

    function resetIpConfig() {
        window.location.href = window.location.href;
    }
</SCRIPT>
</head>
