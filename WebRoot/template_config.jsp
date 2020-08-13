<%@ page language="java" import="java.util.*" pageEncoding="GBK" %>

<!--模板设置-开始-->
<div class="floatDiv" id="template.window">
    <div class="divTop">
        <div class="divClose" onclick="_tUtil.closeWindow();"></div>
        <div class="divTitle">
            模板设置！
        </div>
        <div class="divContent">
            <h3>
                请您选择所需模板
            </h3>
            <img src="images/selectImg.png"/>
            <ul class="divButton">
                <li class="space1">
                    <a id="template.board"
                       href="javascript:_tUtil.saveTemplateInfo('1');">电子白板</a>
                </li>
                <li class="spaceTV">
                    <a id="template.tv" href="javascript:_tUtil.saveTemplateInfo('2');">电视机</a>
                </li>
            </ul>

        </div>
    </div>
    <div class="divBottom"></div>
</div>
<!--模板设置-结束-->
<SCRIPT LANGUAGE="JavaScript">
    TemplateUtilObj.prototype.openWindow = function () {

        document.getElementById('template.window').style.display = "block";
        /*************/
        if (1 == this.templateId)
            document.getElementById('template.board').focus();
        else
            document.getElementById('template.tv').focus();

        if (isAllowSimpleHotKey) _simpleHotKey.pid = 'template.window'; //使得该层支持简单热键
    }
    TemplateUtilObj.prototype.closeWindow = function () {

        document.getElementById('template.window').style.display = "none";

        if (isAllowSimpleHotKey) _simpleHotKey.pid = "sysConfig.window"; //

        _sysConfg.openWindow();

    };


    TemplateUtilObj.prototype.saveTemplateInfo = function (templateId) {

        if (_macUtil.isReady()) {
            var url = _common.getCurrServerPath() + '/loginLog/AccessQueLog.do?1=1';

            url += '&current.c1=2';//获取模板信息
            url += '&ajaxdate=' + new Date();

            var url = _common.getCurrServerPath() + '/loginLog/externalAccessAddLog.do?1=1';
            url += '&current.mac=' + _macUtil.getMACAdd();//mac地址
            url += '&current.c1=2';//获取模板信息
            url += '&current.templateId=' + templateId;//保存模板信息


            //设置主备课地址
            if ('error' != getMainTeachSeverPath()) {
                //alert();
                url += '&current.ip=' + getMainTeachSeverPath();//传送主备课ip地址
            }
            url += '&ajaxdate=' + new Date();
            //prompt('',url);
            //alert();
            sendRequest(null, url);


            //
            url = '';
            url += _common.getCurrServerPath() + "/newteach/index.do?userSetFlag=1&templateId=" + templateId;
            url += '&cssName=' + _common.getCssName();
            url += '&whiteBoardFlag=' + _tUtil.getWhiteBoardFlag();
            try {
                var currVersionid = _treeVersion.currKsId;
                url += '&currVersionid=' + _treeVersion.currKsId;

                //location.href=_common.getCurrServerPath()+"/newteach/index.do?userSetFlag=1&templateId="+templateId+'&currVersionid='+_vsp.currKsId+'&cssName='+ _common.getCssName();
                location.href = url;
            } catch (e) {

                //location.href=_common.getCurrServerPath()+"/newteach/index.do?userSetFlag=1&templateId="+templateId+'&cssName='+ _common.getCssName();
                location.href = url;
            }


            //alert();
        }
    }
</SCRIPT>


