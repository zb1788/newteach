<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>

<!--导航栏目设置-开始-->
<div id=menuConfig_window class="floatDiv" style="DISPLAY: none">
    <div class="divTop">
        <div class="divClose" onclick="_menuConfig.closeWindow();"></div>
        <div class="divTitle">导航设置！</div>
        <div class="divContent">
            <h3>导航设置：请选择您需要显示的栏目！</h3>
            <div class="subjectCss">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td>
                            <ul class="bbSet" id="menuConfig_menuShow">
                                <li style="DISPLAY: none">
                                    <label><input type="checkbox"
                                                  value="000102,一年级,00010202,下学期,0001020202,语文,000102020202,北师大版"/>北师大版</label>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class=tipsInfo id=menuConfig_tip>提示：请选择您经常使用的导航栏目!<br></div>
        <div class="page">
            <div class=pageNext><a title=返回 onclick="_menuConfig.closeWindow();" href="#">返回</a></div>
            <div class=pageNext><a title=保存 href="#" onclick="_menuConfig.navigationColumnSave();">保存</a></div>
        </div>
    </div>
    <div class="divBottom"></div>
</div>

<!--导航栏目设置-结束-->
<script type="text/javascript">
    var _menuConfig = new MenuConfig();

    function MenuConfig() {
    }

    //_menuConfig.openWindow();
    MenuConfig.prototype.openWindow = function () {
        this.createMenuHtml();
        document.getElementById('menuConfig_window').style.display = "block";
        if (isAllowSimpleHotKey)
            _simpleHotKey.pid = 'menuConfig_window'; //使得该层支持简单热键
    }//end of function
    MenuConfig.prototype.closeWindow = function () {
        document.getElementById('menuConfig_window').style.display = "none";
        if (isAllowSimpleHotKey)
            _simpleHotKey.pid = "sysConfig.window";
        _sysConfg.openWindow();
    };
    //_menuConfig.navigationColumnSave()
    MenuConfig.prototype.navigationColumnSave = function () {
        var checkBox_menu = document.getElementsByName("menuid");
        var count = _checkBox.getCheckBoxSelectCount(checkBox_menu);
        //alert(count +" ---");
        if (count < 1) {
            document.getElementById("menuConfig_tip").innerHTML = "提示：至少选择一项!";
            return;
        }
        var url = _common.getCurrServerPath() + '/menu/navigationColumnSave.do?1=1';
        url += '&menubelong=1';  //   '0-备课 1-授课',
        url += '&menutype=0';  //0-主栏目 1-副栏目',
        url += '&menuids=' + _checkBox.getAllCheckBoxProperty(checkBox_menu, "value");
        url += '&sortnums=' + _checkBox.getAllCheckBoxProperty(checkBox_menu, "sortnum");
        url += '&menuid_selecteds=' + _checkBox.getAllCheckBoxCheckedStatus(checkBox_menu);
        url += '&username=' + _common.getTeacherId();
        //设置主备课地址
        if ('error' != getMainTeachSeverPath()) {
            url += '&remoteip=' + getMainTeachSeverPath();//传送主备课ip地址
        }
        url += '&ajaxdate=' + new Date();
        sendRequest(_menuConfig.parseNavigationColumnSave, url);
    }//end of function
    // 解析导航保存结果
    MenuConfig.prototype.parseNavigationColumnSave = function (xmldoc) {
        var pls_flag = 0;
        try {
            pls_flag = xmldoc.selectNodes("//VCOM/pls/pls_flag")[0].text;//获取
        } catch (e) {
            alert(e.message);
        }
        if (0 == pls_flag) {
            document.getElementById("menuConfig_tip").innerHTML = "提示：导航栏目设置失败!";
        } else {
            document.getElementById("menuConfig_tip").innerHTML = "提示：导航栏目设置成功!";
            location.reload();
        }
    }//end of function
    //创建导航栏目展示页面
    MenuConfig.prototype.createMenuHtml = function () {
        var url = _common.getCurrServerPath() + "/menu/getMenuListUIForXML.do?l=test";
        url += '&menubelong=1';  //   '0-备课 1-授课',
        url += '&menutype=0';  //0-主栏目 1-副栏目',
        url += '&currSys=1';  //当前系统'0-备课 1-授课
        url += '&username=' + _common.getTeacherId();
        url += '&ajaxdate=' + new Date();
        sendRequest(this.createMenuHtmlByXml, url);
    }
    // 创建导航栏目展示页面
    MenuConfig.prototype.createMenuHtmlByXml = function (xmldoc) {
        var menuNodes = xmldoc.selectNodes("//VCOM/pls/menu");//获取
        var h = "";
        for (i = 0; i < menuNodes.length; i++) {
            var menuNode = menuNodes[i];
            var class_name = "";//菜单名称
            var class_id = "";//菜单id
            var class_check = "";//是否选中
            var class_order = "";//
            try {
                class_id = menuNode.selectNodes("class_id")[0].text; //菜单id
                class_name = menuNode.selectNodes("class_name")[0].text; //菜单名称
                class_check = menuNode.selectNodes("class_check")[0].text; //是否选中
                class_order = menuNode.selectNodes("class_order")[0].text; //
                h += '<LI><LABEL>';
                if (1 == class_check) {
                    h += '<INPUT type=checkbox value=' + class_id + ' name=menuid checked  sortnum=' + class_order + '>';
                } else {
                    h += '<INPUT type=checkbox value=' + class_id + ' name=menuid sortnum=' + class_order + '>';
                }
                h += class_name;
                h += '</LABEL></LI>';
            } catch (e) {
                alert(e.message);
            }
        }// end of for
        document.getElementById("menuConfig_menuShow").innerHTML = h;
        try {
            document.getElementsByName("menuid")[0].focus();//设置默认焦点
        } catch (e) {
        }
    }//end of function
</script>