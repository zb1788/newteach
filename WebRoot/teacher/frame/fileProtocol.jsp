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
        <span>�û��ϴ�Э��</span>
    </div>
    <span class="clearfix"></span>

    <table width="100%" align="center" border="0" cellspacing="0"
           cellpadding="0" class="upload marTB xieyi">

        <tr>
            <td class="xieyi">
                <div style="height:520px; overflow-y:auto;">
                    <p>
                        &nbsp;&nbsp;���ȣ���л��ʹ���ϴ����ܡ���ƽ̨֧�ֵ��ϴ���Դ����ֻ�����ı���ͼƬ����Ƶ����������Ƶ�������ͣ��벻Ҫ�ϴ�����������ʽ֮���κ���ʽ����Դ�� </p>
                    <p>&nbsp;&nbsp;�ϴ���Դʱ������������Э�飺</p>
                    <p>
                        1��ͬ�����ء��л����񹲺͹����ع������ܷ��������л����񹲺͹�����Ȩ���������л����񹲺͹��������Ϣϵͳ��ȫ���������������������������������������������ӹ���������涨��������Ϣ���紫��Ȩ�������������йؼ�������������涨�ķ��ɡ����桢ʵʩ�취��
                    </p>
                    <p>
                        2��������Դ�������κη����ܷ���ȷ���Ļ���ԭ��Σ�����Ұ�ȫ��й¶�������ܡ��߸�������Ȩ���ƻ�����ͳһ���ƻ������Žᡢ�𺦹������������桢ɿ�������ޡ��������ӡ��ƻ������Žᡢ�ƻ������ڽ����ߡ�����а�̺ͷ⽨���š����ࡢɫ�顢�Ĳ�����������ɱ���ֲ����߽������������߷̰����ˣ��ֺ����˺Ϸ�Ȩ��ĵȷ��ɡ����������ֹ�����ݻ��������˷��е���Դ��
                    </p>
                    <p>3���ϴ���Դ���ַ��κ��˵�ר�����̱ꡢ����Ȩ����ҵ���ܻ�����ר��Ȩ�����������κε������������Ҫ��������κ��𺦻���ʧ��
                    </p>
                    <p>4���ϴ���Դ��������溯�����������ϡ�"�����ʼ�"�ȣ�
                    </p>
                    <p>5���ϴ���Դ����������š��ƻ��������κμ���������Ӳ����ͨѶ�豸���ܵ����������������������롢�����ͳ���֮���ϣ�
                    </p>
                    <p>6���ϴ���Դ����������ɫ�顢���׺͸�����ߵ����ݣ��ұ��⡢���ͱ�ǩ�в������κξ��е���ɫ�麬������ۣ�
                    </p>
                    <p>&nbsp;&nbsp;��ƽ̨���ϡ���Ϣ���紫��Ȩ����������������������ڶ�ʮ����֮�涨����Ϊ��������н��л�ṩ��Դչʾƽ̨���������Դ�����κ���ʽ����ˡ��޸ĺ�������Ϊ�����ھ��ɱ���վ�����͵����ݣ�֣������ķ�����Ƽ����޹�˾��˾����֤ǰ����Ϸ��ԡ������ԡ�׼ȷ�ԡ������Ի�Ʒ�ʡ�һ�����ϴ���Դ��ƽ̨��Ĭ������ͬ�Ⲣ�����ظ�Э�飬������Դ�����������������û��Ը���Դ������������ء����ϴ������κ�Υ��Э����Ϊ��������׷���ϴ��˵����Ρ�
                    </p>
                    <p>&nbsp;&nbsp;���κ�����£�֣������ķ�����Ƽ����޹�˾�������Ϊ�û��ϴ�����Դ����Υ���������ɡ����棬�����û��е�ȫ�����Σ����������κ�����£�����Դ����������ɾ����֣������ķ�����Ƽ����޹�˾��Ȩ������������£������ݽ��б������¶�������йػ��ر��档</p>
                    <p align="right" sytle="text-align:right;width:100%">��Э�����Ȩ��֣������ķ�����Ƽ����޹�˾���С�

                    </p>
                </div>
            </td>
        </tr>
        <tr>

            <td align="center" class="kd4 up"
                style=" background:#f8f8f8;border-top:1px dotted #e4e4e4; padding-top:5px;width:auto; text-align:center;">
                <button class="blue" onclick="_fileUtil.saveAcceptProtocol(1);">
                    ͬ��
                </button>

                <button onclick="_fileUtil.closeProtocol();">
                    ��ͬ��
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
                    �ƶ�
                </button>
                <button onclick="_fileUtil.closeRecommedActive();">
                    ȡ��
                </button>
            </td>
        </tr>--%>
    </table>
</div>
<script type="text/javascript">
    <!--

    var acceptProtocalToForwardType = 0;//-1�Ƽ�������Դ�����ˡ�

    FileUtilObj.prototype.refuseProtocol = function () {
        // alert("�ܾ�Э���޷�ʹ���ļ��й��ܣ�");
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
            _rightMenu.openRecommendWindow(-1);//���Ƽ����ڡ�
        }

    };
    FileUtilObj.prototype.closeProtocol = function () {
        mask.style.display = "none";
        document.getElementById('file.protocol').style.display = 'none';

    };

    //-->
</script>

