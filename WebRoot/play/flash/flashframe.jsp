<%@ page language="java" import="java.util.*" pageEncoding="gbk" %>
<%@page import="vcom.newteach.service.ParamValueCache" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" id="ext-all-css" type="text/css"
          href="<%=basePath%>ext/resources/css/ext-all.css"/>
    <script type="text/javascript" id="ex-v2-2-base"
            src="<%=basePath%>ext/ex-v2-2-base.js"></script>
    <script type="text/javascript" id="ex-v2-2-all"
            src="<%=basePath%>ext/ex-v2-2-all.js"></script>
    <script type="text/javascript" src="<%=basePath%>ext/ex-v2-1-tree.js" defer="defer"></script>
    <script type="text/javascript" src="swfobject.js"></script>
    <base id="_base">
    <style>

    </style>
    <title>customtree.html</title>
</head>

<body>
<div id="center">

    <div id="flashContent"></div>

</div>

<div id="east">
    <ul style="list-style: none;" id="listflash">

    </ul>
</div>
<script type="text/javascript">
    var patrn =/<%=ParamValueCache.getTempKey("pls.flash.special")%>/g;
    //method2.movie=parent.flapath;
</script>
<script type="text/javascript">
    Ext.BLANK_IMAGE_URL = '<%=basePath%>ext/resources/images/s.gif';
    var treejson2 = parent.flapath;
    if (Ext.onReady) {
        Ext.onReady(function () {
            var west = new Ext.Panel({
                region: "east",
                width: 200,
                minSize: 0,
                maxSize: 200,
                split: true,
                collapsible: true,
                title: "播放FLASH列表",
                layout: 'fit',
                margins: '0 0 0 0',
                items: new Ext.BoxComponent({
                    el: 'east',
                    height: '100%'
                }),
                collapsed: true
            });
            _center = new Ext.Panel({
                region: 'center',
                title: null,
                collapsible: true,
                split: true,
                width: 225,
                minSize: 175,
                maxSize: 300,
                layout: 'fit',
                margins: '0 0 0 0',
                items: new Ext.BoxComponent({
                    el: 'center',
                    height: '100%'
                })
            });
            var viewport = new Ext.Viewport({
                layout: "border",
                listeners: {
                    'afterlayout': function (c, l) {
                        try {
                            l.east.collapsedEl.createChild({
                                html: '<div style="writing-mode:tb-rl;text-align:center;padding-right: 3px;padding-top: 300px;">单击此处展开列表</div>'
                            });
                            c.removeListener('afterlayout', arguments.callee);
                        } catch (e) {
                        }
                    }
                },
                items: [_center, west]
            });
            var listhtml = "";
            for (var i = 0; i < treejson2.length; i++) {
                listhtml += "<li style=\"font-size: 12px;height: 20px;line-height: 20px;cursor: pointer;\" onclick=\"toclick(" + i + ")\"><IMG style=\"vertical-align: middle;\" src=\"" + treejson2[i].icon + "\">" + treejson2[i].text + "</li>"
            }
            listflash.innerHTML = listhtml;
            if (parent.flapath.length >= 1) {
                //flash播放
                var params = {};
                params.base = ".";
                params.quality = "high";
                params.allowscriptaccess = "sameDomain";
                params.allowfullscreen = "true";
                params.WMode = "opaque";
                swfobject.embedSWF(parent.flapath[0].path, "flashContent", "100%", "100%", "1.0", null, null, params);

            }
        });
    } else {
        AjaxScript("<%=basePath%>ext/ext-all.js", ReLoad);
    }

    function toclick(index) {
        var i = index;

        //flash播放
        var params = {};
        params.base = ".";
        params.quality = "high";
        params.allowscriptaccess = "sameDomain";
        params.allowfullscreen = "true";
        params.WMode = "opaque";
        swfobject.embedSWF(treejson2[i].path, "flashContent", "100%", "100%", "1.0", null, null, params);

        try {
            if (treejson2[i].text.length > 40) {
                parent._flash.innerHTML = treejson2[i].text.substring(0, 40) + "...";
            } else {
                parent._flash.innerHTML = treejson2[i].text;
            }
        } catch (e) {
        }
    }

    //动态加载脚本内容
    function AjaxScript(url, funHand) {
        var request = null;
        try {
            request = new XMLHttpRequest();
        } catch (trymicrosoft) {
            try {
                request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (othermicrosoft) {
                try {
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (failed) {
                    request = false;
                    alert("request could not create !");
                }
            }
        }
        try {
            if (!request) {
                alert("Error initializing XMLHttpRequest!");
            } else {
                request.onreadystatechange = function () {
                    if (request.readyState == 4) {
                        if (request.status == 200 || request.status == 304) {
                            var source = request.responseText;
                            if (source != null) {
                                var oHead = document.getElementsByTagName('HEAD').item(0);
                                var oScript = document.createElement("script");
                                oScript.language = "javascript";
                                oScript.type = "text/javascript";
                                //oScript.id = sId;
                                oScript.defer = true;
                                oScript.text = source;
                                oHead.appendChild(oScript);
                                funHand();
                            }
                        } else {
                            alert('XML request error: ' + request.statusText + ' (' + request.status + ')');
                        }
                    }
                }
                request.ontimeout = function () {
                    alert("超时！");
                }
                request.open("post", url, true);
                request.send(null);
            }
        } catch (e) {
            alert("打开异常!" + e);
        }
    }

    function ReLoad() {
        if (Ext.onReady) {
            Ext.onReady(function () {
                var west = new Ext.Panel({
                    region: "east",
                    width: 200,
                    minSize: 0,
                    maxSize: 200,
                    split: true,
                    collapsible: true,
                    title: "播放FLASH列表",
                    layout: 'fit',
                    margins: '0 0 0 0',
                    items: new Ext.BoxComponent({
                        el: 'east',
                        height: '100%'
                    }),
                    collapsed: true
                });
                _center = new Ext.Panel({
                    region: 'center',
                    title: null,
                    collapsible: true,
                    split: true,
                    width: 225,
                    minSize: 175,
                    maxSize: 300,
                    layout: 'fit',
                    margins: '0 0 0 0',
                    items: new Ext.BoxComponent({
                        el: 'center',
                        height: '100%'
                    })
                });
                var viewport = new Ext.Viewport({
                    layout: "border",
                    listeners: {
                        'afterlayout': function (c, l) {
                            try {
                                l.east.collapsedEl.createChild({
                                    html: '<div style="writing-mode:tb-rl;text-align:center;padding-right: 3px;padding-top: 300px;">单击此处展开列表</div>'
                                });
                                c.removeListener('afterlayout', arguments.callee);
                            } catch (e) {
                            }
                        }
                    },
                    items: [_center, west]
                });
                var listhtml = "";
                for (var i = 0; i < treejson2.length; i++) {
                    listhtml += "<li style=\"font-size: 12px;height: 20px;line-height: 20px;cursor: pointer;\" onclick=\"toclick('" + treejson2[i].path + "')\"><IMG style=\"vertical-align: middle;\" src=\"" + treejson2[i].icon + "\">" + treejson2[i].text + "</li>"
                }
                listflash.innerHTML = listhtml;
                if (parent.flapath.length >= 1) {
                    //flash播放
                    var params = {};
                    params.base = ".";
                    params.quality = "high";
                    params.allowscriptaccess = "sameDomain";
                    params.allowfullscreen = "true";
                    params.WMode = "opaque";
                    swfobject.embedSWF(parent.flapath[0].path, "flashContent", "100%", "100%", "1.0", null, null, params);

                }
            });
        } else {
            document.getElementById("center").innerHTML = "javascript-ext控件加载失败，请检查浏览器设置！";
        }
    }

</script>
</body>
</html>
