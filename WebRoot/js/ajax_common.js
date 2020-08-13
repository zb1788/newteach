var xmlHttp = null;

/*�õ�http���� begin*/
function getXmlHttpObject() {
    try {// Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    } catch (e) {// Internet Explorer        
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    if (xmlHttp == null) {
        alert("error:the XMLHttpRequest is null!")
        return;
    }
    return xmlHttp;
}

/*�õ�http���� end*/

function shouajaxpro(type) {
    try {
        if (type == 1) {
            waithtml.innerHTML = "<img src='" + global_basePath + "/images/extanim32.gif' /><span>���ڼ������ݣ����Ժ�....</span>"
            waithtml.style.display = "";
            maskAllall.style.display = "";
        } else {
            setTimeout('try{maskAllall.style.display="none";waithtml.style.display="none";}catch(e){}', 600);
        }
    } catch (e) {
    }

}

//jsonajax
/*
�ӿڵ��ȱ�ţ��������ص���������ʱʱ�䣬�Ƿ��첽
*/
function ajaxJson(turl, tdata, charset, fun, timeout, ifasync) {
    var myDate = new Date();
    shouajaxpro(1);
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
    //alert("�Ƿ��첽��"+ifasync);
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
            shouajaxpro(2);
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            /**
             if(console && console.log){
				console.log("errorUrl:"+turl+"error: textStatus:"+textStatus);
				for(name in errorThrown){
					console.log("Error-"+name+":"+errorThrown[name]);
				}
			}
             */
            //�첽��������޷�����쳣
            //alert('����ʱ��');
            shouajaxpro(2);
        }
    });
    setTimeout('shouajaxpro(2)', 8000);
}

/*
 �ӿڵ��ȱ�ţ��������ص���������ʱʱ�䣬�Ƿ��첽
 */
function ajaxJsonWithoutWait(turl, tdata, charset, fun, timeout, ifasync) {
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
    //alert("�Ƿ��첽��"+ifasync);
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
            //alert("error"+textStatus + errorThrown);
            //�첽��������޷�����쳣
            //alert('����ʱ��');
            /**
             if(console && console.log){
				console.log("errorUrl:"+turl+"error: textStatus:"+textStatus);
				for(name in errorThrown){
					console.log("Error-"+name+":"+errorThrown[name]);
				}
			}
             */
        }
    });
}

//ϵͳ��json���ݵ���
function sendJsonRequest(vurl, fun, ifasync, outtime) {
    //�ж��Ƿ�ʱ
    //checkLoginTimeOut();
    //Ĭ��ͬ��
    if (ifasync == undefined) {
        ifasync = true;
    }
    //Ĭ�ϳ�ʱ
    if (outtime == undefined || outtime == null) {
        outtime = 30000;
    }
    $.ajax({
        type: "get",
        url: vurl,
        dataType: "jsonp",
        async: ifasync,
        timeout: outtime,
        jsonp: "jsoncallback",
        success: function (rdata) {
            shouajaxpro(2);
            fun(rdata);
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            shouajaxpro(2);
            /**
             if(console && console.log){
				console.log("errorUrl:"+vurl+"error: textStatus:"+textStatus);
				for(name in errorThrown){
					console.log("Error-"+name+":"+errorThrown[name]);
				}
			}
             */
            //alert('����ʱ��');
        }
    });
}

function sendRequestJsonNew(callback, url, method, xml) {
    //�ж��Ƿ�ʱ
    //checkLoginTimeOut();
    shouajaxpro(1);
    $.ajax({
        url: url,
        type: method,
        datatype: 'json',//������Բ�д����ǧ���дtext����html!!!
        timeout: 10000,
        data: xml,
        error: function (xml, textStatus, errorThrown) {
            shouajaxpro(2);
            /**
             if(console && console.log){
				console.log("errorUrl:"+url+"error: textStatus:"+textStatus);
				for(name in errorThrown){
					console.log("Error-"+name+":"+errorThrown[name]);
				}
			}
             */
        },
        success: function (xml) {
            shouajaxpro(2);
            callback(xml);
        }
    })
}

function sendRequest(callback, url, method, xml) {
    //�ж��Ƿ�ʱ
    //checkLoginTimeOut();
    shouajaxpro(1);
    $.ajax({
        url: url,
        type: method,
        datatype: 'xml',//������Բ�д����ǧ���дtext����html!!!
        timeout: 10000,
        data: xml,
        error: function (xml, textStatus, errorThrown) {
            shouajaxpro(2);
            /**
             if(console && console.log){
				console.log("errorUrl:"+url+"error: textStatus:"+textStatus);
				for(name in errorThrown){
					console.log("Error-"+name+":"+errorThrown[name]);
				}
			}
             */
        },
        success: function (xml) {
            shouajaxpro(2);
            callback(xml);
        }
    })
}

function checkLoginTimeOut() {
    $.ajax({
        type: "get",
        url: "sessioninfo.jsp?ms=" + new Date().getMilliseconds() + "&random=" + Math.random() * 9999,
        dataType: "json",
        async: true,
        success: function (result) {
            if (result.timeout) {
                alert('��¼��ʱ�������µ�¼��');
                top.location.href = "gobackmy://";//��ʱ
            }
        }
    });
}

var isCasShow = true;//������ʾ
//var isCas=true;//��������ʾ

function ajaxMessage(str) {
    if ('' == str || undefined == str)
        alert('Ajax�����쳣!');
}
