var pwdConfig = function () {
    this.regStr = "/^(?![0-9]+$)[0-9A-Za-z_]{8,12}$/";
}
//��ʱtoken
pwdConfig.tmpToken = "";
//�Ƿ�ִ���޸���
pwdConfig.doing = false;
//��������ʽ
pwdConfig.checkPwdFormat = function (str) {
    return (new RegExp(pwdConfig.regStr).test(str));
}
pwdConfig.message = function (str) {
    $("#pwdConfigTip").html(str);
    $("#pwdConfigTip").show();
}
pwdConfig.show = function () {

    var protocol_web = "http://";
    if (transferProtocol_web && typeof (transferProtocol_web) != "undefined") {
        protocol_web = transferProtocol_web;
    }
    var url = protocol_web + _config["TMS"] + "/tms/interface/queryPwdLevel.jsp";
    $.ajax({
        url: url,
        type: "get",
        dataType: "jsonp",
        jsonp: "jsoncallback",
        scriptCharset: "gbk",
        timeout: 30000,
        success: function (result) {
            pwdConfig.regStr = result.pwdreg;
            $("#pwdRegTip").text(result.tip);
            $("#pwdConfigWindow").show();
        }
    });
}
pwdConfig.ok = function (str) {
    if (pwdConfig.doing) {
        return;
    }
    pwdConfig.doing = true;
    var oldpwd = $("#old_pwd").val().trim();
    var newpwd = $("#new_pwd").val().trim();
    var renewpwd = $("#renew_pwd").val().trim();
    if ("" == oldpwd) {
        pwdConfig.message("ԭ���벻��Ϊ�գ�");
        pwdConfig.doing = false;
        return;
    }
    if ("" == newpwd) {
        pwdConfig.message("�����벻��Ϊ�գ�");
        pwdConfig.doing = false;
        return;
    }
    if (!pwdConfig.checkPwdFormat(newpwd)) {
        pwdConfig.message("�������ʽ����");
        pwdConfig.doing = false;
        return;
    }
    if ("" == renewpwd) {
        pwdConfig.message("ȷ�������벻��Ϊ�գ�");
        pwdConfig.doing = false;
        return;
    }
    if (renewpwd != newpwd) {
        pwdConfig.message("���������벻һ�£�");
        pwdConfig.doing = false;
        return;
    }
    var protocol_web = "http://";
    if (transferProtocol_web && typeof (transferProtocol_web) != "undefined") {
        protocol_web = transferProtocol_web;
    }
    //��tmpToken������userName
    //�������MD5
    var url = protocol_web + _config["TMS"] + "/tms/clientInterface/editSelfPwdSafeI.do?tmpToken=" + pwdConfig.tmpToken + "&oldpwd=" + hex_md5(oldpwd) + "&newpwd=" + hex_md5(newpwd);
    $.ajax({
        url: url,
        type: "get",
        dataType: "jsonp",
        jsonp: "jsoncallback",
        scriptCharset: "gbk",
        timeout: 30000,
        error: function (result) {
            pwdConfig.doing = false;
            maskAllall.style.display = "none";
        },
        success: function (result) {
            pwdConfig.doing = false;
            if ("0" == result.opRsCode) {
                alert("�޸���ɣ�");
                $("#old_pwd").val("");
                $("#new_pwd").val("");
                $("#renew_pwd").val("");
                maskAllall.style.display = 'none';
                $('#pwdConfigWindow').hide();
            } else {
                pwdConfig.message(result.opRsInfo);
                pwdConfig.doing = false;
            }
        }
    });
}