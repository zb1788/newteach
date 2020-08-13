<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/12/19
  Time: 16:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <jsp:include page="/script/jquery172min.jsp"/>
    <script src="<%= request.getContextPath() %>/js/json2.js"></script>

</head>
<body>
<script>
    //播放获取负载地址
    function getLoadAddress(url, callback, type) {
        //1 资源 2教师文件夹 3名师微课
        if (typeof (type) == "undefined") {
            type = 1;
        }
        //名师微课为callback 其它资源为jsoncallback
        var jsoncallback = "jsoncallback";
        if (type == 3) {
            jsoncallback = "callback";
        }
        ajaxJson(url, null, "utf-8", function (rdata) {
            var flist = null;
            if (type == 1) {
                if (rdata && rdata.jsonList && rdata.jsonList.length > 0 && rdata.jsonList[0].list && (typeof rdata.errormsges == 'undefined' || JSON.stringify(rdata.errormsges) == "{}")) {
                    flist = rdata.jsonList[0].list;
                    for (var i = 0; i < flist.length; i++) {
                        flist[i].file_name = flist[i].filepath.replace("/", "");
                        //负载地址添加参数cd=shouke
                        flist[i].path = handleLoadAddress(flist[i].path);
                    }
                } else if (rdata.errormsges) {
                    flist = "没有可播放的资源";
                    try {
                        var ecode = rdata.errormsges.rcode.ecode;
                        if (ecode) {
                            if (ecode == "2" || ecode == "7") {
                                flist = data.errormsges.rcode.errmsg;
                            }
                        }
                    } catch (e) {

                    }
                }
            } else if (type == 2) {
                if (rdata && rdata.list && rdata.list.length > 0 && (typeof rdata.errormsges == 'undefined' || JSON.stringify(rdata.errormsges) == "{}")) {
                    flist = rdata.list;
                    for (var i = 0; i < flist.length; i++) {
                        flist[i].file_name = flist[i].filepath.replace("/", "");
                        flist[i].path = handleLoadAddress(flist[i].path);
                    }
                } else if (rdata.errormsges) {
                    flist = "没有可播放的资源";
                    try {
                        var ecode = rdata.errormsges.rcode.ecode;
                        if (ecode) {
                            if (ecode == "2" || ecode == "7") {
                                flist = data.errormsges.rcode.errmsg;
                            }
                        }
                    } catch (e) {

                    }
                }
            } else if (type == 3) {
                if (rdata.path && (typeof rdata.errormsges == 'undefined' || JSON.stringify(rdata.errormsges) == "{}")) {
                    flist = '[{"path":"' + rdata.path + '","file_name":"' + rdata.filepath.replace("/", "") + '"}]';
                    flist = eval('(' + flist + ')');
                    for (var i = 0; i < flist.length; i++) {
                        //负载地址添加参数cd=shouke
                        flist[i].path = handleLoadAddress(convertSpecialCharacter(flist[i].path));
                    }
                } else if (rdata.errormsges) {
                    flist = "没有可播放的资源";
                    try {
                        var ecode = rdata.errormsges.rcode.ecode;
                        if (ecode) {
                            if (ecode == "2" || ecode == "7") {
                                flist = data.errormsges.rcode.errmsg;
                            }
                        }
                    } catch (e) {

                    }
                }
            }
            callback(flist);
        }, null, null, jsoncallback);
    }

    //jsonajax
    /*
     接口调度编号，参数，回调方法，超时时间，是否异步
     */
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

    function readCookie(name) {
        var cookieValue = null;
        var search = name + "=";
        if (document.cookie.length > 0) {
            offset = document.cookie.indexOf(search);
            if (offset != -1) {
                offset += search.length;
                end = document.cookie.indexOf(";", offset);
                if (end == -1)
                    end = document.cookie.length;
                cookieValue = unescape(document.cookie.substring(offset, end));
            }
        }
        return cookieValue;
    }

    function handleLoadAddress(url) {
        if (typeof url == "undefined" || url == null) {
            return "";
        }
        if (url.indexOf("?") != -1) {
            url = url + "&cd=shouke";
        }
        return url;
    }

    function getDateStr() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + month + strDate;
        return currentdate;
    }

    function convertSpecialCharacter(str) {
        var arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'};
        return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
            return arrEntities[t];
        });
    }
</script>
</body>
</html>
