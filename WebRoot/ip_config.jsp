<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>
<!-- IP���� begin -->


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
    <!--IP ���� begin-->
    <div id="net.ipConfigWindow" class="floatDiv" style="display: none;">

        <div class="divTop">
            <div class="divClose" onclick="new IPConfigObj().closeWindow();"></div>
            <div class="divTitle">
                IP���ã�
            </div>
            <div class="divContent">
                <h4>
                    <label>
                        <input type="radio" id="dhcpEnabled1" name="dhcpEnabled" value="1"
                               onfocus="javascript:changeGetMode(this.value);"/>
                        �Զ����IP��ַ���������֧�ִ˹��ܣ�����Ի�ȡ�Զ�ָ�ɵ�IP���ã�
                    </label>

                    <br/>

                    <label>
                        <input type="radio" id="dhcpEnabled0" name="dhcpEnabled" value="0"
                               onfocus="javascript:changeGetMode(this.value);"/>
                        ʹ�������IP��ַ����������Ҫ���������Ա������ʵ���IP���ã�
                    </label>
                </h4>
                <dl class="ipSet">
                    <!--  IP��ַ-->
                    <dt>
                        IP��ַ��
                    </dt>
                    <dd>
                        <input type="text" id="ipAddress" name="ipAddress"/>
                    </dd>
                    <!--  �������룺-->
                    <dt>
                        �������룺
                    </dt>
                    <dd>
                        <input type="text" id="subnetMask" name="subnetMask"/>
                    </dd>
                    <!--  Ĭ�����أ���-->
                    <dt>
                        Ĭ�����أ�
                    </dt>
                    <dd>
                        <input type="text" id="defaultGateway" name="defaultGateway"/>
                    </dd>
                    <!--  ��ѡDNS����������-->
                    <dt>
                        ��ѡDNS��������
                    </dt>
                    <dd>
                        <input type="text" id="dnsServer" name="dnsServer"/>
                    </dd>
                    <!--  ����DNS��������-->
                    <dt>
                        ����DNS��������
                    </dt>
                    <dd>
                        <input type="text" id="dnsServerBak" name="dnsServerBak"/>
                    </dd>
                </dl>


                <span class="clearfix"></span>

            </div>
            <span class="clearfix"></span>
            <!-- ��ʾ��Ϣ -->
            <div class="" id="net.tip">
            </div>
            <div class="page marR2">

                <div class="pageNext">
                    <a href="javascript:new IPConfigObj().closeWindow();">�� ��</a>
                </div>
                <div class="pageNext">

                    <a href="#" onclick="setIpConfig();"
                       id="ipConfig.confirm">ȷ ��</a>
                </div>
            </div>
        </div>


        <div class="divBottom"></div>
    </div>
    <!--IP ���� end-->
</form>
<!-- IP���� end-->
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
    var gotoUrl = "";//ҳ����ʷ�ʽ��Ҫ������file:///F:/pd/1/PLS/WebRoot/teach/ipconfig.htm?gotoURL=http://192.168.104.193/teach/
    for (var i = 0; i < arrTmp.length; i++) {
        var arrTemp = arrTmp[i].split("=");
        if (arrTemp[0].toUpperCase() == "GOTOURL".toUpperCase()) {
            gotoUrl = arrTemp[1];
        }
    }

    //xml���غ���
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
    //��������Ƿ�ΪIP��ַ��
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
        if (ipArr[0] == "1") {//�Զ�
            document.getElementById("dhcpEnabled1").checked = "true";
            document.getElementById("dhcpEnabled1").focus();
        } else if (ipArr[0] == "0") {//�ֶ�
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
        var ipConfigStr = "";//����ִ�к�ķ��ش�

        ipaddress = document.getElementById("ipAddress").value;
        subnetmask = document.getElementById("subnetMask").value;
        defaultgateway = document.getElementById("defaultGateway").value;
        dnsserver = document.getElementById("dnsServer").value;
        dnsserverbak = document.getElementById("dnsServerBak").value;
        var dhcpArr = document.getElementsByName("dhcpEnabled");
        for (i = 0; i < dhcpArr.length; i++) {
            if (dhcpArr[i].checked) {
                passStr += dhcpArr[i].value;
                if (dhcpArr[i].value == "1") {// �Զ�
                    if (dnsserver != null && dnsserver != "" && !CheckIP(dnsserver)) {
                        _ipConfig.tip("��ѡDNS������������Ч��IPV4��ʽ��");
                        document.getElementById("dnsServer").focus();
                        return false;
                    } else if (dnsserverbak != null && dnsserverbak != "" && !CheckIP(dnsserverbak)) {
                        _ipConfig.tip("����DNS������������Ч��IPV4��ʽ��");
                        document.getElementById("dnsServerBak").focus();
                        return false;
                    }
                    passStr += "|||";//�Զ���ȡIPʱ��ip���������롢Ĭ�����ض�Ϊ��
                } else if (dhcpArr[i].value == "0") {// �ֶ�
                    if (ipaddress == null || ipaddress == "") {
                        _ipConfig.tip("������IP��ַ");
                        document.getElementById("ipAddress").focus();
                        return false;
                    } else if (!CheckIP(ipaddress)) {
                        _ipConfig.tip("IP��ַ������Ч��IPV4��ʽ��");
                        document.getElementById("ipAddress").focus();
                        return false;
                    } else if (subnetmask == null || subnetmask == "") {
                        _ipConfig.tip("�������������룡");
                        document.getElementById("subnetMask").focus();
                        return false;
                    } else if (!CheckIP(subnetmask)) {
                        _ipConfig.tip("�������벻����Ч��IPV4��ʽ��");
                        document.getElementById("subnetMask").focus();
                        return false;
                    } else if (defaultgateway == null || defaultgateway == "") {
                        _ipConfig.tip("������Ĭ�����أ�");
                        document.getElementById("defaultGateway").focus();
                        return false;
                    } else if (!CheckIP(defaultgateway)) {
                        _ipConfig.tip("Ĭ�����ز�����Ч��IPV4��ʽ��");
                        document.getElementById("defaultGateway").focus();
                        return false;
                    } else if (dnsserver != null && dnsserver != "" && !CheckIP(dnsserver)) {
                        _ipConfig.tip("��ѡDNS������������Ч��IPV4��ʽ��");
                        document.getElementById("dnsServer").focus();
                        return false;
                    } else if (dnsserverbak != null && dnsserverbak != "" && !CheckIP(dnsserverbak)) {
                        _ipConfig.tip("����DNS������������Ч��IPV4��ʽ��");
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

            if (confirm("�������óɹ�����Ҫ�����ͻ��ˣ�")) {
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
            alert("��������ʧ�ܣ�");
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
        if (objValue == "0") { // �ֶ���ȡIP
            showIp("ipAddress");
            showIp("subnetMask");
            showIp("defaultGateway");
        } else if (objValue == "1") { // �Զ���ȡIP
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
