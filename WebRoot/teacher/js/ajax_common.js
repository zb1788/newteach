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

function getDocumXmlObject(text) {
    var xmlDoc;
    try {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(text);

    } catch (e) {
        try //Firefox, Mozilla, Opera, etc.
        {
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(text, "text/xml");

        } catch (e) {
            alert(e.message)
        }

    }

    return xmlDoc;
}


function shouajaxpro(type) {
    try {
        if (type == 1) {
            $("#waithtml").html("<img src='" + global_basePath + "/images/extanim32.gif' /><span>���ڼ������ݣ����Ժ�....</span>");
            $("#waithtml").show();
            $("#maskAllall").show();
        } else {
            $("#waithtml").hide();
            $("#maskAllall").hide();
        }
    } catch (e) {
    }

}

//jqueryԶ�̵���
function ajaxJson(url, data, uncode, fun) {
    var myDate = new Date();
    shouajaxpro(1);
    jQuery(function ($) {
        $.getJSON(interurll + url + "&time=" + myDate.getSeconds() + "&reqEncoding=" + uncode + "&jsoncallback=?", data, function (result) {
            fun(result);
            shouajaxpro(0);
        })
        /*
        $.ajax({ 
          url:(interurll+url+"&time="+myDate.getSeconds()+"&reqEncoding="+uncode), 
          type: "post", 
          datatype: 'jsonp',//������Բ�д����ǧ���дtext����html!!! 
          jsonp: 'jsoncallback',
          timeout: 1000,
          data:data,
          error: function(xml){ 
              alert("��ȡ����ʧ��!");
              shouajaxpro(0);
          }, 
          success: function(xml){ 
              fun(result);
              shouajaxpro(0);
          }
       })
       */
    });
}

function ajaxJsonJK(url, data, callback, callerror) {


    var request = $.ajax(
        {
            url: url,
            type: "POST",
            data: data,
            dataType: "json",
            error: function (o, textStatus, errorThrown) {
                if (callerror) {
                    callerror(textStatus);
                }

            },
            success: function (dataStr, textStatus) {
                if (callback) {
                    callback(dataStr);
                }

            }
        }
    );
}


/*�õ�http���� end ͬ��*/

/**/
function sendRequestSync(callback, url, method, xml) {
    /**
     var _method="get";
     if(null!=method)
     _method=method;
     xmlHttp=getXmlHttpObject();
     xmlHttp.open(_method,url,true);
     xmlHttp.onreadystatechange=callback;
     xmlHttp.send(null);
     */
    shouajaxpro(1);
    $.ajax({
        url: url,
        type: method,
        datatype: 'xml',//������Բ�д����ǧ���дtext����html!!! 
        timeout: 60000,
        async: false,//ͬ��
        data: xml,
        error: function (xml) {
            //maskAllall.style.display="none";
            //_loginObj.error('��¼��ʱ��');
            alert(xml);
            shouajaxpro(0);
            //top.location= _common.getCurrServerPath()+"/login/toLoginPage.do";
            // _common.timeout(null);//��ʱ
        },
        success: function (xml) {
            shouajaxpro(0);
            //alert(typeof(xml));

            if ('string' == typeof (xml)) {
                //alert('string'==typeof(xml));
                if (xml.indexOf('window.parent.parent') > 0) {
                    alert('��¼��ʱ�������µ�¼��');
                    top.location = _common.getCurrServerPath() + "/login/toLoginPage.do";
                    return;
                }
            }
            callback(xml);
        }
    })
}

/*�õ�http���� end*/

/**/
function sendRequest(callback, url, method, xml) {
    /**
     var _method="get";
     if(null!=method)
     _method=method;
     xmlHttp=getXmlHttpObject();
     xmlHttp.open(_method,url,true);
     xmlHttp.onreadystatechange=callback;
     xmlHttp.send(null);
     */
    shouajaxpro(1);
    $.ajax({
        url: url,
        type: method,
        datatype: 'xml',//������Բ�д����ǧ���дtext����html!!! 
        timeout: 60000,
        data: xml,
        error: function (xml) {
            //maskAllall.style.display="none";
            //_loginObj.error('��¼��ʱ��');
            alert(xml);
            shouajaxpro(0);
            //top.location= _common.getCurrServerPath()+"/login/toLoginPage.do";
            // _common.timeout(null);//��ʱ
        },
        success: function (xml) {
            shouajaxpro(0);
            //alert(typeof(xml));

            if ('string' == typeof (xml)) {


                //alert('string'==typeof(xml));
                if (xml.indexOf('window.parent.parent') > 0) {
                    alert('��¼��ʱ�������µ�¼��');
                    top.location = _common.getCurrServerPath() + "/login/toLoginPage.do";
                    return;
                }
                //  xml=getDocumXmlObject(xml);
            }
            callback(xml);
        }
    })
}

var isCasShow = true;//������ʾ
//var isCas=true;//��������ʾ

function ajaxMessage(str) {
    if ('' == str || undefined == str)
        alert('Ajax�����쳣!');
}