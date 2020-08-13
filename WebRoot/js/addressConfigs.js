//<!--ȫ����ַ����-->
var a_config = new AddressConfigObj();

function AddressConfigObj() {
}

AddressConfigObj.prototype.openWindow = function () {
    document.getElementById('sysConfig.window').style.display = "none";
    document.getElementById('net.teachUrlConfigWindow').style.display = "none";
    document.getElementById("Address_ConfigWindow").style.display = "block";
    a_config.showAlladdress();
    //showAlladdress();
}
AddressConfigObj.prototype.closeWindow = function () {
    document.getElementById("Address_ConfigWindow").style.display = "none";
    document.getElementById('net.teachUrlConfigWindow').style.display = "block";
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

AddressConfigObj.prototype.showAlladdress = function () {
    $.ajax({
        url: "http://www.czbanbantong.com/get_pls_list.php",
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
            tab.geted = true;
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
                    td.innerHTML = "<input type='radio' value='" + urldata + "' name='area'/>" + singledata;
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
    if (areaAddress == null) {
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
    // alert(document.getElementById("Address_ipSet2").geted);
    if ("true" == document.getElementById("Address_ipSet2").geted) {
        //alert(2);
        a_config.openWindow();
    } else {
        document.getElementById('net.teachUrlConfigWindow').style.display = "block";

    }
    if (isAllowSimpleHotKey) _simpleHotKey.pid = 'net.teachUrlConfigWindow';
    document.getElementById('teachUrlConfig.tip').style.display = "none";
    document.getElementById('teachUrlConfig.tip').className = "";
    document.getElementById('teachUrlConfig.tip').innerHTML = '';
    this.load();
    this.clearTip();
}
TeachUrlConfigObj.prototype.openWindow1 = function () {
    document.getElementById("net.teachUrlConfigWindow").style.display = "block";
    document.getElementById("Address_ConfigWindow").style.display = "none";
    document.getElementById('sysConfig.window').style.display = "none";
    this.load();
}
TeachUrlConfigObj.prototype.closeWindow = function () {

    document.getElementById('net.teachUrlConfigWindow').style.display = 'none';
    document.getElementById('sysConfig.window').style.display = "block";
}
TeachUrlConfigObj.prototype.load = function () {
    var url;
    var url2;
    var config_str;
    try {

        config_str = config_str = ocx.ReadInfo("", "showkeip.ini");
        //alert(config_str);
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
    if (typeof (url) == "undefined" || url == null || url == "undefined" || url == "0" || url == "null") {
        url = "";
    }
    if (typeof (url2) == "undefined" || url2 == null || url2 == "undefined" || url == "0" || url == "null") {
        url2 = "";
    }
    document.getElementById('city_url').value = url2;
    document.getElementById('school_url').value = url;
};
TeachUrlConfigObj.prototype.clearTip = function () {
    //�����ʾ��Ϣ
    document.getElementById('teachUrlConfig.tip').style.display = "none";
    document.getElementById('teachUrlConfig.tip').className = "";
    document.getElementById('teachUrlConfig.tip').innerHTML = '';
}
TeachUrlConfigObj.prototype.isURL = function (str) {
    if (str.startWith("http://") || str.startWith("https://"))
        return true;
    return false;
}

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
    //���浽���������ļ�
    try {
        var content = "";
        content += "showke.school_url=" + school_url + ";";
        content += "showke.city_url=" + city_url + ";";
        ocx.WriteInfo("", "showkeip.ini", content, 0);
    } catch (e) {
    }//end of try-catch             
    if (confirm("�ڿ�IP���óɹ�����Ҫ�����ͻ��ˣ�")) {
        _common.exitSystem();
    }
}//end of function;