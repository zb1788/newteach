<!--ȫ����ַ����-->
var a_config = new AddressConfigObj();

function AddressConfigObj() {
}

AddressConfigObj.prototype.openWindow = function () {
    document.getElementById('net.teachUrlConfigWindow').style.display = "none";
    document.getElementById("Address_ConfigWindow").style.display = "block";
    //document.getElementById('address_mark_N').style.display="block";

    //showAlladdress();
}
AddressConfigObj.prototype.closeWindow = function () {
    //	document.getElementById("Address_ConfigWindow").style.display="none";
    alert(document.getElementById("net.teachUrlConfigWindow").style.display);
    //	document.getElementById('net.teachUrlConfigWindow').style.display="block";
}
AddressConfigObj.prototype.closeWindow1 = function () {
    document.getElementById("Address_ConfigWindow").style.display = "none";
    document.getElementById('sysConfig.window').style.display = "block";
}

AddressConfigObj.prototype.confirmAddress = function () {
    var areaAddress = getRadioValue("area");
    if (areaAddress == null) {
        alert("��ѡ�����ڵ���");
        return;
    }

    var areaAddress_Type = getRadioValue("teachUrlConfig_name");

    if (areaAddress_Type == '1') {
        document.getElementById('city_url').value = areaAddress;
        alert("����ϵѧУ�����ʦ��ȡУ���ڿ�IP��ַ����ʾ��˵���ֶ����ã�");

        document.getElementById('net.teachUrlConfigWindow').style.display = "block";
    } else {
        document.getElementById('city_url').value = areaAddress;
        document.getElementById('school_url').value = areaAddress;


    }
    document.getElementById("nextAddUrl_ConfigWindow").style.display = "none";

    if (areaAddress_Type != '1') {
        _tuConfig.setURL();
    }
}

function getRadioValue(names) {
    var teach_radio = document.getElementsByName(names);
    for (var m = 0; m < teach_radio.length; m++) {
        if (teach_radio[m].checked) {
            return teach_radio[m].value;
        }
    }
    return null;
}

function showAlladdress() {
    $.ajax({
        url: window.location.protocol + "//www.czbanbantong.com/get_pls_list.php",
        dataType: "jsonp",
        jsonp: "jsoncallback",
        success: function (data) {
            //alert(data);
            var len = data.length;
            //var row=3;
            var cell = 4;
            //var cell= parseInt(len/row);				
            var row = parseInt(len / cell);
            //if(len%row!=0){++cell;}	
            if (len % cell != 0) {
                ++row;
            }
            var tab = document.getElementById("Address_ipSet2");
            while (tab.rows.length > 0) {
                tab.deleteRow(0);
            }
            tab.geted = "true";
            for (var i = 0; i < row; i++) {
                var tr = tab.insertRow();
                for (var j = 0; j < cell; j++) {
                    var td = tr.insertCell()
                    var num = i + j * row;
                    if (num >= len) {
                        break;
                    }
                    var singledata = data[num].areaName;
                    var urldata = data[num].pls_url;
                    td.innerHTML = "<input type='radio' value='" + urldata + "' name='area' />" + singledata;
                }

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            alert("error" + textStatus + errorThrown);
            //�첽��������޷�����쳣
            //alert('����ʱ��');

        }
    });
}


var nextA_ConfigWindow = new NextAddress_ConfigWindow();

function NextAddress_ConfigWindow() {
}

NextAddress_ConfigWindow.prototype.openWindow = function () {
    var areaAddress = getRadioValue("area");
    if (areaAddress == null || areaAddress == "") {
        alert("��ѡ�����ڵ���");
        return;
    }

    document.getElementById("nextAddUrl_ConfigWindow").style.display = "block";
    document.getElementById("Address_ConfigWindow").style.display = "none";

}

NextAddress_ConfigWindow.prototype.closeWindow = function () {
    document.getElementById("nextAddUrl_ConfigWindow").style.display = "none";
    document.getElementById("Address_ConfigWindow").style.display = "block";
}


var _tuConfig = new TeachUrlConfigObj();

function TeachUrlConfigObj() {
}

//_tuConfig.tip();
TeachUrlConfigObj.prototype.tip = function (tip) {
    document.getElementById('teachUrlConfig.tip').className = "tipsInfo";
    document.getElementById('teachUrlConfig.tip').innerHTML = tip;
}
TeachUrlConfigObj.prototype.openWindow = function (flag) {
    //�жϵ��������Ƿ��Ѿ���ã���������ֱ�Ӵ򿪵���ѡ�񣬷�����Ϊ���粻��ͨ���ֹ�����ip����
    if ("true" == document.getElementById("Address_ipSet2").geted) {
        a_config.openWindow();
    } else {
        document.getElementById('net.teachUrlConfigWindow').style.display = "block";
        //document.getElementById('address_mark_N').style.display="none";
        //�Զ�ѡ�н���
        /*
        try{
            document.getElementById('school_url').focus();
        }catch(e){}
        */
    }
    if (isAllowSimpleHotKey) _simpleHotKey.pid = 'net.teachUrlConfigWindow';
    //�����ʾ��Ϣ
    document.getElementById('teachUrlConfig.tip').style.display = "none";
    document.getElementById('teachUrlConfig.tip').className = "";
    document.getElementById('teachUrlConfig.tip').innerHTML = '';
    //�����ڿε�ַ����
    this.load();
    this.clearTip();
}
TeachUrlConfigObj.prototype.openWindow1 = function () {
    document.getElementById("net.teachUrlConfigWindow").style.display = "block";
    document.getElementById("Address_ConfigWindow").style.display = "none";
}
TeachUrlConfigObj.prototype.closeWindow = function () {
    void (document.getElementById('net.teachUrlConfigWindow').style.display = 'none');
    _sysConfg.openWindow();
};
//��ȡ�ڿ�ip����140526����Ϊ���ļ���ȡ
TeachUrlConfigObj.prototype.load = function () {
    var url;
    var url2;
    var config_str;
    try {
        config_str = config_str = VCOMPlayer.ReadInfo("", "showkeip.ini");
        if (config_str != "-1" && config_str.length > 1) {
            var configs = config_str.split(";");
            for (var i = 0; i < configs.length; i++) {
                var config_pair = configs[i].split("=");
                var name = config_pair[0];
                var value = config_pair[1];
                if ("showke.school_url" == name) {
                    url = value;
                } else if ("showke.city_url" == name) {
                    url2 = value;
                }
            }//end of for
        }
    } catch (e) {
    }
    if (typeof (url) == "undefined" || url == null || url == "undefined" || url == "null" || url == "0") {
        url = "";
    }
    if (typeof (url2) == "undefined" || url2 == null || url2 == "undefined" || url == "null" || url == "0") {
        url2 = "";
    }
    document.getElementById('city_url').value = url2;
    document.getElementById('school_url').value = url;
};

//����Ƿ��״�ʹ��(δ���õ�½��ַ),ͬʱ�����޵�ַ�����ļ���ע�������
function firstOpen() {
    var eFlag = false;
    var url;
    var url2;
    var config_str;
    //��ȡ�����ļ�
    try {
        config_str = config_str = VCOMPlayer.ReadInfo("", "showkeip.ini");
        if ('-1' == config_str) eFlag = true;
    } catch (e) {
        eFlag = true;
    }
    try {
        if (config_str.length <= 1) {
            eFlag = true;
        } else {
            var configs = config_str.split(";");
            for (var i = 0; i < configs.length; i++) {
                var config_pair = configs[i].split("=");
                var name = config_pair[0];
                var value = config_pair[1];
                if ("showke.school_url" == name) {
                    url = value;
                } else if ("showke.city_url" == name) {
                    url2 = value;
                }
            }//end of for
        }
    } catch (e) {
    }
    //�����ļ����޷��õ�������Ϣʱ
    if (eFlag) {
        try {
            url = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\URL");
            url2 = document.getElementById("mac_ocx").GetKeyPath("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\URL2");
            if (url == "0") {
                url = ""
            }
            if (url2 == "0") {
                url2 = ""
            }
            if (url && url != null && url != "0" && url != "" && url2 && url2 != null && url2 != "" && url2 != "0") {
                var content = "";
                content += "showke.school_url=" + url + ";";
                content += "showke.city_url=" + url2 + ";";
                VCOMPlayer.WriteInfo("", "showkeip.ini", content, 0);
                config_str = config_str = VCOMPlayer.ReadInfo("", "showkeip.ini");
                if ('-1' == config_str || config_str.length <= 1) {
                    alert("�ڿ�IP�ؼ�����(�ڿε�ַ�޷�д���ļ�)��");
                } else {
                    //���ע�������(��ֹ���������쳣����ִ�д˲���)
                    //var url="HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\URL=0";
                    //var url2="HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\URL2=0";
                    //document.getElementById("ipActiveX").SetGetwayArddress(url);
                    //document.getElementById("ipActiveX").SetGetwayArddress(url2);
                }
            }
        } catch (e) {
            //window.status='�ڿ�IP�ؼ����󣡣�';
            //alert('�ڿ�IP�ؼ�����(�ڿε�ַ��ȡ�쳣)��');
        }
    }
    //ע�����ļ��о��޵�ַ������Ϣʱ
    if ((url == null || url == "" || url == "0") && (url2 == null || url2 == "" || url2 == "0")) {
        showAlladdress();
        window.setTimeout("_tuConfig.openWindow()", 1000);
    }
}

//****����ҳ�����ü���û���ַ����***
jQuery(function ($) {
    firstOpen();
});


TeachUrlConfigObj.prototype.tip = function (str) {
    //�����ʾ��Ϣ
    document.getElementById('teachUrlConfig.tip').style.display = "";
    document.getElementById('teachUrlConfig.tip').className = "tipsInfo";
    document.getElementById('teachUrlConfig.tip').innerHTML = str;
}
TeachUrlConfigObj.prototype.clearTip = function () {
    //�����ʾ��Ϣ
    document.getElementById('teachUrlConfig.tip').style.display = "none";
    document.getElementById('teachUrlConfig.tip').className = "";
    document.getElementById('teachUrlConfig.tip').innerHTML = '';
}
TeachUrlConfigObj.prototype.isURL = function (str) {
    if (str.startWith("http://") || str.startWith("https://")) return true;
    return false;
}
//�����ڿ�ip����,140526����Ϊ��д���ļ�
TeachUrlConfigObj.prototype.setURL = function () {
    var city_url = document.getElementById('city_url').value;
    var school_url = document.getElementById('school_url').value;
    if (!this.isURL(city_url)) {
        this.tip("�м��ڿε�ַ���벻�Ϸ���");
        return;
    }
    if (!this.isURL(school_url)) {
        this.tip("У�ڿε�ַ���벻�Ϸ���");
        return;
    }

    //���浽ע�����
    /* try{
        var url="HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\URL=";
        url+=school_url;
        var url2="HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VCOMIE\\URL2=";
        url2+= city_url;
        //alert(url);
        var  ipConfigStr = document.getElementById("ipActiveX").SetGetwayArddress(url);
        var  ipConfigStr2 = document.getElementById("ipActiveX").SetGetwayArddress(url2);
        /*if((ipConfigStr.toUpperCase()=="OK")&&(ipConfigStr2.toUpperCase()=="OK")){
             this.clearTip();
             if(confirm("�ڿ�IP���óɹ�����Ҫ�����ͻ��ˣ�")){
                 _common.exitSystem();
             }
        } else if(ipConfigStr.toUpperCase()=="NO"){
                   alert("�ڿ�IP����ʧ�ܣ�");
        } **/
    /* }catch(e){
     
     }**/
    //end of try-catch
    //���浽���������ļ�
    try {
        var content = "";
        content += "showke.school_url=" + school_url + ";";
        content += "showke.city_url=" + city_url + ";";
        VCOMPlayer.WriteInfo("", "showkeip.ini", content, 0);
    } catch (e) {

    }//end of try-catch
    if (confirm("�ڿ�IP���óɹ�����Ҫ����ϵͳ��")) {
        _common.exitSystem();
    }
}//end of function;