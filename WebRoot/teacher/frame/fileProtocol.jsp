<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<div class="floatDiv" id="file.protocol" style="display: none">
    <div class="title">
        <a href="#" onclick="_fileUtil.closeProtocol();"> <img
                src="images/x.gif"/> </a>
        <span>用户上传协议</span>
    </div>
    <span class="clearfix"></span>

    <table width="100%" align="center" border="0" cellspacing="0"
           cellpadding="0" class="upload marTB xieyi">

        <tr>
            <td class="xieyi">
                <div style="height:520px; overflow-y:auto;">
                    <p>
                        &nbsp;&nbsp;首先，感谢您使用上传功能。本平台支持的上传资源类型只包含文本、图片、音频、动画、视频五种类型，请不要上传除此五种形式之外任何形式的资源。 </p>
                    <p>&nbsp;&nbsp;上传资源时请您遵守以下协议：</p>
                    <p>
                        1、同意遵守《中华人民共和国保守国家秘密法》、《中华人民共和国著作权法》、《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《互联网电子公告服务管理规定》、《信息网络传播权保护条例》等有关计算机及互联网规定的法律、法规、实施办法。
                    </p>
                    <p>
                        2、上载资源不包含任何反对宪法所确定的基本原则、危害国家安全、泄露国家秘密、颠覆国家政权、破坏国家统一、破坏民族团结、损害国家荣誉和利益、煽动民族仇恨、民族歧视、破坏民族团结、破坏国家宗教政策、宣扬邪教和封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪、侮辱或者诽谤他人，侵害他人合法权益的等法律、行政法规禁止的内容或其他另人反感的资源；
                    </p>
                    <p>3、上传资源不侵犯任何人的专利、商标、著作权、商业秘密或其他专属权利，而导致任何第三方提出索赔要求或衍生任何损害或损失；
                    </p>
                    <p>4、上传资源不包含广告函件、促销资料、"垃圾邮件"等；
                    </p>
                    <p>5、上传资源不包含会干扰、破坏或限制任何计算机软件、硬件或通讯设备功能的软件病毒或其他计算机代码、档案和程序之资料；
                    </p>
                    <p>6、上传资源不包含具有色情、低俗和格调不高的内容，且标题、简介和标签中不出现任何具有低俗色情含义的字眼；
                    </p>
                    <p>&nbsp;&nbsp;本平台符合《信息网络传播权保护条例》第六条第三款及第二十二条之规定，仅为各区域进行教研活动提供资源展示平台，不会对资源进行任何形式的审核、修改和其他行为。对于经由本网站而传送的内容，郑州威科姆教育科技有限公司公司不保证前述其合法性、正当性、准确性、完整性或品质。一旦您上传资源，平台则默认您已同意并将遵守该协议，允许将资源公开，并允许其他用户对该资源进行浏览和下载。若上传人有任何违反协议行为，将依法追究上传人的责任。
                    </p>
                    <p>&nbsp;&nbsp;在任何情况下，郑州威科姆教育科技有限公司合理地认为用户上传的资源可能违反上述法律、法规，将由用户承担全部责任；并可以在任何情况下，对资源进行无条件删除，郑州威科姆教育科技有限公司有权利在上述情况下，对内容进行保存或披露，并向有关机关报告。</p>
                    <p align="right" sytle="text-align:right;width:100%">本协议解释权归郑州威科姆教育科技有限公司所有。

                    </p>
                </div>
            </td>
        </tr>
        <tr>

            <td align="center" class="kd4 up"
                style=" background:#f8f8f8;border-top:1px dotted #e4e4e4; padding-top:5px;width:auto; text-align:center;">
                <button class="blue" onclick="_fileUtil.saveAcceptProtocol(1);">
                    同意
                </button>

                <button onclick="_fileUtil.closeProtocol();">
                    不同意
                </button>

            </td>
        </tr>


        <%-- <tr>
            <td class="text">
                <div id="file.otherDivInput">
                    <input type="text" size="45" id="file.folderName" maxlength="50"
                        onKeyDown="if(event.keyCode==13) _fileWindow.enter();"
                        onblur="this.value=this.value.replace(/(^\s*)|(\s*$)/g, '');" />
                </div>
            </td>
            <td class="kd4 up">

                <button id="file.move"
                    onclick="_fileUtil.renameFile(document.getElementById('file.folderName').value);">
                    移动
                </button>
                <button onclick="_fileUtil.closeRecommedActive();">
                    取消
                </button>
            </td>
        </tr>--%>
    </table>
</div>
<script type="text/javascript">
    <!--

    var acceptProtocalToForwardType = 0;//-1推荐区域资源接受了。

    FileUtilObj.prototype.refuseProtocol = function () {
        // alert("拒绝协议无法使用文件夹功能！");
        document.getElementById('file.protocol').style.display = 'none';

    }

    FileUtilObj.prototype.openProtocolWin = function () {

        mask.style.display = "";
        document.getElementById("file.protocol").style.display = '';

    };

    FileUtilObj.prototype.saveAcceptProtocol = function (c7) {

        if (c7 == 1) {
            var url = _common.getCurrServerPath() + "/teacher/teacher/saveAcceptProtocol.do?userName=" + teachernumber;
            url += "&ajaxdate=" + new Date();
            sendRequest(this.saveAcceptProtocalXml, url);/**/
        }

    };

    FileUtilObj.prototype.saveAcceptProtocalXml = function (xmldoc) {

        mask.style.display = "none";
        document.getElementById('file.protocol').style.display = 'none';

        if (acceptProtocalToForwardType == -1) {
            _rightMenu.openRecommendWindow(-1);//打开推荐窗口。
        }

    };
    FileUtilObj.prototype.closeProtocol = function () {
        mask.style.display = "none";
        document.getElementById('file.protocol').style.display = 'none';

    };

    //-->
</script>

