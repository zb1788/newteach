<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>

<!--������Ŀ����-��ʼ-->
<div id=menuConfig_window class="floatDiv" style="DISPLAY: none">
    <div class="divTop">
        <div class="divClose" onclick="_menuConfig.closeWindow();"></div>
        <div class="divTitle">�������ã�</div>
        <div class="divContent">
            <h3>�������ã���ѡ������Ҫ��ʾ����Ŀ��</h3>
            <div class="subjectCss">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td>
                            <ul class="bbSet" id="menuConfig_menuShow">
                                <li style="DISPLAY: none">
                                    <label><input type="checkbox"
                                                  value="000102,һ�꼶,00010202,��ѧ��,0001020202,����,000102020202,��ʦ���"/>��ʦ���</label>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class=tipsInfo id=menuConfig_tip>��ʾ����ѡ��������ʹ�õĵ�����Ŀ!<br></div>
        <div class="page">
            <div class=pageNext><a title=���� onclick="_menuConfig.closeWindow();" href="#">����</a></div>
            <div class=pageNext><a title=���� href="#" onclick="_menuConfig.navigationColumnSave();">����</a></div>
        </div>
    </div>
    <div class="divBottom"></div>
</div>

<!--������Ŀ����-����-->
<script type="text/javascript">
    var _menuConfig = new MenuConfig();

    function MenuConfig() {
    }

    //_menuConfig.openWindow();
    MenuConfig.prototype.openWindow = function () {
        this.createMenuHtml();
        document.getElementById('menuConfig_window').style.display = "block";
        if (isAllowSimpleHotKey)
            _simpleHotKey.pid = 'menuConfig_window'; //ʹ�øò�֧�ּ��ȼ�
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
            document.getElementById("menuConfig_tip").innerHTML = "��ʾ������ѡ��һ��!";
            return;
        }
        var url = _common.getCurrServerPath() + '/menu/navigationColumnSave.do?1=1';
        url += '&menubelong=1';  //   '0-���� 1-�ڿ�',
        url += '&menutype=0';  //0-����Ŀ 1-����Ŀ',
        url += '&menuids=' + _checkBox.getAllCheckBoxProperty(checkBox_menu, "value");
        url += '&sortnums=' + _checkBox.getAllCheckBoxProperty(checkBox_menu, "sortnum");
        url += '&menuid_selecteds=' + _checkBox.getAllCheckBoxCheckedStatus(checkBox_menu);
        url += '&username=' + _common.getTeacherId();
        //���������ε�ַ
        if ('error' != getMainTeachSeverPath()) {
            url += '&remoteip=' + getMainTeachSeverPath();//����������ip��ַ
        }
        url += '&ajaxdate=' + new Date();
        sendRequest(_menuConfig.parseNavigationColumnSave, url);
    }//end of function
    // ��������������
    MenuConfig.prototype.parseNavigationColumnSave = function (xmldoc) {
        var pls_flag = 0;
        try {
            pls_flag = xmldoc.selectNodes("//VCOM/pls/pls_flag")[0].text;//��ȡ
        } catch (e) {
            alert(e.message);
        }
        if (0 == pls_flag) {
            document.getElementById("menuConfig_tip").innerHTML = "��ʾ��������Ŀ����ʧ��!";
        } else {
            document.getElementById("menuConfig_tip").innerHTML = "��ʾ��������Ŀ���óɹ�!";
            location.reload();
        }
    }//end of function
    //����������Ŀչʾҳ��
    MenuConfig.prototype.createMenuHtml = function () {
        var url = _common.getCurrServerPath() + "/menu/getMenuListUIForXML.do?l=test";
        url += '&menubelong=1';  //   '0-���� 1-�ڿ�',
        url += '&menutype=0';  //0-����Ŀ 1-����Ŀ',
        url += '&currSys=1';  //��ǰϵͳ'0-���� 1-�ڿ�
        url += '&username=' + _common.getTeacherId();
        url += '&ajaxdate=' + new Date();
        sendRequest(this.createMenuHtmlByXml, url);
    }
    // ����������Ŀչʾҳ��
    MenuConfig.prototype.createMenuHtmlByXml = function (xmldoc) {
        var menuNodes = xmldoc.selectNodes("//VCOM/pls/menu");//��ȡ
        var h = "";
        for (i = 0; i < menuNodes.length; i++) {
            var menuNode = menuNodes[i];
            var class_name = "";//�˵�����
            var class_id = "";//�˵�id
            var class_check = "";//�Ƿ�ѡ��
            var class_order = "";//
            try {
                class_id = menuNode.selectNodes("class_id")[0].text; //�˵�id
                class_name = menuNode.selectNodes("class_name")[0].text; //�˵�����
                class_check = menuNode.selectNodes("class_check")[0].text; //�Ƿ�ѡ��
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
            document.getElementsByName("menuid")[0].focus();//����Ĭ�Ͻ���
        } catch (e) {
        }
    }//end of function
</script>