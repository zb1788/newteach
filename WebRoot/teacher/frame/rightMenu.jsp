<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@page import="vcom.lessons.util.KnowledgeStructureList" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    KnowledgeStructureList klist = new KnowledgeStructureList();
    String type = klist.getSysParamByName("pls.showke.type");
%>


<!--�Ҽ��˵� ��ʼ-->
<div id="rightKey" style="display: none"
     onmouseover="_rightMenu.setActiveStatus(1);"
     onmouseout="_rightMenu.setActiveStatus(0);">
    <div class="keyTop"></div>
    <ul class="rightKey" id="rightMenu.window">
        <!--  -->


        <li onclick="_rightMenu.openUploadWindow();" id="rightMenu.upload">
            <img src="<%=path %>/teacher/images/rightKeyIco2.png"/>
            �ļ��ϴ�
        </li>
        <span class="line"></span>
        <li onclick="_rightMenu.openFolderCreateWindow();"
            id="rightMenu.folderCreate">
            <img src="<%=path %>/teacher/images/rightKeyIco4.png"/>
            �½��ļ���
        </li>
        <!--
    <li onclick="_rightMenu.setActiveStatus(0);_rightMenu.hideRightMenu();">
        <img src="images/rightKeyIco1.png" />
        ȡ��
    </li>


    <li onclick="_rightMenu.backDir();" id="rightMenu.backDir">
        <img src="images/rightKeyIco1.png" />
        �����ϼ�Ŀ¼
    </li>-->


        <li onclick="_rightMenu.openFileRenameWindow();"
            id="rightMenu.fileRename">
            <img src="<%=path %>/teacher/images/rightKeyIco.png"/>
            �޸��ļ���
        </li>
        <span class="line"></span>
        <li onclick="_rightMenu.deleteFile();" id="rightMenu.fileDelete">
            <img src="<%=path %>/teacher/images/rightKeyIco3.png"/>
            �ļ�ɾ��
        </li>
        <li onclick="_rightMenu.openFolderMoveWindow();"
            id="rightMenu.fileMove">
            <img src="<%=path %>/teacher/images/rightKeyIco.png"/>
            �ļ��ƶ�
        </li>
        <span class="line"></span>
        <li class="gray" onclick="_rightMenu.openShareWindow();"
            id="rightMenu.share">
            <img src="<%=path %>/teacher/images/rightKeyIco4.png"/>
            �ļ�����
        </li>
        <li onclick="_rightMenu.openFileDownloadWindow();"
            id="rightMenu.fileDownload">
            <img src="<%=path %>/teacher/images/rightKeyIco.png"/>
            �ļ�����
        </li>
        <span class="line"></span>
        <li onclick="_rightMenu.sortFile('filename');">
            <img src="<%=path %>/teacher/images/rightKeyIco.png"/>
            ����������
        </li>
        <li onclick="_rightMenu.sortFile('updatetime');">
            <img src="<%=path %>/teacher/images/rightKeyIco.png"/>
            ��ʱ������
        </li>
        <li onclick="_rightMenu.sortFile('filesize');">
            <img src="<%=path %>/teacher/images/rightKeyIco.png"/>
            ���ļ���С����
        </li>
        <% if ("1".equals(type)) { %>
        <s:if test="#session.authResult.user.usertype==2||#session.authResult.user.usertype==3">
            <span class="line"></span>
            <!--
            <li onclick="_rightMenu.openRecommendWindow('recommend');">
            <img src="<%=path %>/teacher/images/rightKeyIco.png" />
            �Ƽ���У����Դ
            </li>
            -->

            <li onclick="_rightMenu.openRecommendClass('recommend');" id="rightMenu.recommendclass">
                <img src="<%=path %>/teacher/images/rightKeyIco.png"/>
                �Ƽ����༶
            </li>

            <span class="line"></span>
            <li onclick="_rightMenu.openRecommendWindow();">
                <img src="<%=path %>/teacher/images/rightKeyIco.png"/>
                �Ƽ�У����Դ
            </li>
            <li onclick=" _rightMenu.openRecommendWindowProtocol(-1);">
                <img src="<%=path %>/teacher/images/rightKeyIco.png"/>
                �Ƽ�������Դ
            </li>
            <li onclick=" _rightMenu.canelRecommend(1);" id="rightMenu.canelRecomend1">
                <img src="<%=path %>/teacher/images/rightKeyIco.png"/>
                ȡ���Ƽ�У����Դ
            </li>
            <li onclick=" _rightMenu.canelRecommend(2);" id="rightMenu.canelRecomend2">
                <img src="<%=path %>/teacher/images/rightKeyIco.png"/>
                ȡ���Ƽ�������Դ
            </li>
            <span class="line"></span>
            <li onclick="_rightMenu.openRecommendActiveWindow(1);" id="rightMenu.recommendActive">
                <img src="<%=path %>/teacher/images/rightKeyIco.png"/>
                �Ƽ����屸��
            </li>
            <li onclick="_rightMenu.openRecommendActiveWindow(2);" id="rightMenu.recommendActive2">
                <img src="<%=path %>/teacher/images/rightKeyIco.png"/>
                �Ƽ��������
            </li>
            <li onclick="_rightMenu.openRecommendActiveWindow(3);" id="rightMenu.recommendActive3">
                <img src="<%=path %>/teacher/images/rightKeyIco.png"/>
                �Ƽ����л
            </li>
            <span class="line"></span>
            <li onclick="_rightMenu.openRecommedActiveOther(4);" id="rightMenu.recommendActive4">
                <img src="<%=path %>/teacher/images/rightKeyIco.png"/>
                ������Դ���
            </li>
            <s:if test='schoolIp!=""'>
                <span class="line"></span>
                <li onclick="_rightMenu.sysncSelectFiles();" id="rightMenu.sysncSelectFiles">
                    <img src="<%=path %>/teacher/images/rightKeyIco.png"/>
                    �������ڿ��ļ���
                </li>
            </s:if>
        </s:if>
        <%} %>
    </ul>
    <div class="keyBottom"></div>
</div>
<!--�Ҽ��˵� ����-->
<script type="text/javascript">


    var _rightMenu = new RightMenuObj();

    function RightMenuObj() {
        this.prefix = "rightMenu.";
        //this.window = this.prefix +"window";//_rightMenu.inputId
        this.window = "rightKey";//
        this.currIndex = -1;
        this.active = 0;//0-δ� 1-�ѻ
        this.id_backDir = 'rightMenu.backDir';//
        this.id_share = 'rightMenu.share';//
    }

    /*
    function test(obj){
        obj.onmouseout=function(){
            alert("sss");
        }
    }**/
    //_rightMenu.setActiveStatus();//0-δ� 1-�ѻ
    RightMenuObj.prototype.setActiveStatus = function (active) {
        this.active = active;
        window.status = '��ǰ�״����' + this.active;

    }


    //_rightMenu.sortFile(sort);
    RightMenuObj.prototype.sortFile = function (sort) {

        _rightMenu.setActiveStatus(0);
        _rightMenu.hideRightMenu();

        _fileUtil.createSortFileArray(_fileUtil.currParentFcode, 1, sort);
    }
    //_rightMenu.backDir();
    RightMenuObj.prototype.backDir = function () {
        //alert(this.currIndex);
        if (_fileUtil.currLevel <= 0) return;


        _fileUtil.backDir();
        _rightMenu.setActiveStatus(0);
        _rightMenu.hideRightMenu();

    }
    //_rightMenu.openShareWindow(); �򿪹�����
    RightMenuObj.prototype.openShareWindow = function () {
        if (document.getElementById(this.id_share).className == 'gray') return;
        if (!_fileUtil.isFolder()) return;//


        //���������Ҽ��˵�
        _rightMenu.setActiveStatus(0);
        _rightMenu.hideRightMenu();

        _openFolderShareWindow();

    }
    //_rightMenu.openUploadWindow();
    RightMenuObj.prototype.openUploadWindow = function () {
        if (document.getElementById("rightMenu.upload").className == 'gray') return;
        //���������Ҽ��˵�
        _rightMenu.setActiveStatus(0);
        _rightMenu.hideRightMenu();


        toupload();

    }
    RightMenuObj.prototype.openRecommendWindowProtocol = function (flag) {
        acceptProtocalToForwardType = flag;
        mask.style.display = "";//����ʾ��
        var url = _common.getCurrServerPath() + "/teacher/acceptProtocolXml.do?userName=" + teachernumber;
        url += "&ajaxdate=" + new Date();
        sendRequest(this.acceptProtocalXml, url);/**/

    }

    RightMenuObj.prototype.acceptProtocalXml = function (xmldoc) {
        //���������Ҽ��˵�
        _rightMenu.setActiveStatus(0);
        _rightMenu.hideRightMenu();
        var status = xmldoc.selectNodes("//item/c7")[0].text;//
        if (status == "1") {
            mask.style.display = "none";
            if (acceptProtocalToForwardType == -1) {
                _rightMenu.openRecommendWindow(-1);//���Ƽ����ڡ�
            }
        } else {
            _fileUtil.openProtocolWin();

        }

    }

    RightMenuObj.prototype.openRecommendWindow = function (flag) {

        //if(document.getElementById("recommendwindow").className=='gray') return;
        //���������Ҽ��˵�
        _rightMenu.setActiveStatus(0);
        _rightMenu.hideRightMenu();


        var window_parameter = "dialogWidth:750px;dialogHeight:450px;help:no;scroll:auto;status:no";

        var param = "selectfilecodes=" + _fileUtil.getSelectedFcodes();
        if (flag) {
            param += "&onlyAreaRes=" + flag;
        }

        // var handle = showModalDialog("<%=path%>/teacherrecommend/changerecommendframe.do?"+param,window,window_parameter);

        //window.open("<%=path%>/teacherrecommend/changerecommendframe.do?"+param);
        var title = "У����Դ�Ƽ�";
        if (flag == -1)
            title = "������Դ�Ƽ�";
        recommendwindow("<%=path%>/teacherrecommend/changerecommendframe.do?" + param, title);

    }
    //ȡ���Ƽ�
    RightMenuObj.prototype.canelRecommend = function (flag) {
        var tmp = "rightMenu.canelRecomend" + flag;
        if (document.getElementById(tmp).className == 'gray') return;
        var tmpFcode = _fileUtil.fileList[this.currIndex].fCode;
        var tmpUrl = "<%=path%>/teacherfile/cancelRecomend.do?fcode=" + tmpFcode + "&canelType=" + flag;
        tmpUrl += "&ajaxdate=" + new Date();
        sendRequest(this.canelRecommendXml, tmpUrl);

    }
    RightMenuObj.prototype.canelRecommendXml = function (xmldoc) {
        _rightMenu.setActiveStatus(0);
        _rightMenu.hideRightMenu();
        var status = xmldoc.selectNodes("//item/status")[0].text;
        if (status == "1") {
            alert("ȡ���Ƽ��ɹ�");
            _fileUtil.createFileArray(_fileUtil.currParentFcode);
        } else {
            alert("ȡ��ʧ�ܳɹ�");
            _fileUtil.createFileArray(_fileUtil.currParentFcode);
        }

    }
    RightMenuObj.prototype.openRecommedActiveOther = function (flag) {
        var compId;
        if (flag == 1) {
            compId = document.getElementById("rightMenu.recommendActive");
        } else {
            compId = document.getElementById("rightMenu.recommendActive" + flag);
        }

        if (compId && compId.className == 'gray') return;
        //���������Ҽ��˵�
        _rightMenu.setActiveStatus(0);
        _rightMenu.hideRightMenu();
        _fileUtil.openRecommedActiveOther();

    }


    RightMenuObj.prototype.openRecommendClass = function () {
        _rightMenu.setActiveStatus(0);
        _rightMenu.hideRightMenu();
        $("#pop").show();
        $("#maskAllall").show();
    }
    //_rightMenu.hideRecommendClass();
    RightMenuObj.prototype.hideRecommendClass = function () {
        $("#pop").hide();
        $("#maskAllall").hide();
    }
    //_rightMenu.deleteFile();
    RightMenuObj.prototype.deleteFile = function () {
        if (document.getElementById("rightMenu.fileDelete").className == 'gray') return;
        //alert(this.currIndex);
        //_fileWindow.currIndex=this.currIndex;
        //alert(_fileWindow.currIndex);
        _rightMenu.setActiveStatus(0);

        _rightMenu.hideRightMenu();
        _fileWindow.openFlag = 0;
        _fileUtil.deleteFile();

    }
    //_rightMenu.openFileDownloadWindow()
    RightMenuObj.prototype.openFileDownloadWindow = function () {
        if (document.getElementById("rightMenu.fileDownload").className == 'gray') return;
        //alert(this.currIndex);
        _fileWindow.currIndex = this.currIndex;
        _rightMenu.setActiveStatus(0);
        _rightMenu.hideRightMenu();
        teacherfiledownload(_fileUtil.getSelectedFcodes(), 3);


    }
    //_rightMenu.openFileRenameWindow()
    RightMenuObj.prototype.openFileRenameWindow = function () {
        if (document.getElementById("rightMenu.fileRename").className == 'gray') return;
        //alert(this.currIndex);
        _fileWindow.currIndex = this.currIndex;
        _rightMenu.setActiveStatus(0);
        _fileUtil.openFileRenameWindow(this.currIndex);

        _rightMenu.hideRightMenu();

    }

    //_rightMenu.openFolderCreateWindow()
    RightMenuObj.prototype.openFolderCreateWindow = function () {
        if (document.getElementById("rightMenu.folderCreate").className == 'gray') return;
        //alert();
        _rightMenu.setActiveStatus(0);
        _fileUtil.openFolderCreateWindow();
        _rightMenu.hideRightMenu();

    }

    //_rightMenu.openFolderMoveWindow()
    RightMenuObj.prototype.openFolderMoveWindow = function () {
        if (document.getElementById("rightMenu.fileMove").className == 'gray') return;
        //alert();
        _rightMenu.setActiveStatus(0);
        _fileUtil.openFolderMoveWindow();
        _rightMenu.hideRightMenu();

    }

    //���Ƽ��
    RightMenuObj.prototype.openRecommendActiveWindow = function (activeType) {
        var tmp;
        if (activeType == 1) {
            tmp = document.getElementById("rightMenu.recommendActive");
        } else {
            tmp = document.getElementById("rightMenu.recommendActive" + activeType);
        }
        if (tmp && tmp.className == 'gray') return;

        //alert();
        _rightMenu.setActiveStatus(0);
        _fileUtil.openRecommedActive(activeType);
        _rightMenu.hideRightMenu();

    }

    //ͬ���ļ��е�ѧУ
    RightMenuObj.prototype.sysncSelectFiles = function () {
        var tmpFcodes = "";
        for (var j = 0; j < _fileUtil.fileList.length; j++) {
            var tempObj = _fileUtil.fileList[j];
            if (tempObj.selected == true) {
                tmpFcodes += tempObj.fCode + ",";
            }
        }


        if (tmpFcodes == "") {
            alert("��ѡ���ļ����ļ��С�");
            _rightMenu.setActiveStatus(0);
            _rightMenu.hideRightMenu();
            return;
        }
        var tmpUrl = "<%=path%>/teacher/sysncSelectFiles.do?fcodes=" + tmpFcodes;
        tmpUrl += "&ajaxdate=" + new Date();
        sendRequest(this.sysncSelectFilesXml, tmpUrl);
    }

    RightMenuObj.prototype.sysncSelectFilesXml = function (xmldoc) {

        _rightMenu.setActiveStatus(0);
        _rightMenu.hideRightMenu();
        var status = xmldoc.selectNodes("//VCOM/status")[0].text;
        var msg = xmldoc.selectNodes("//VCOM/info")[0].text;
        if (status == "0") {
            // alert(""+msg);
            _fileUtil.openTip("�������ڿ��ļ��гɹ�", '<div align="center" sytle="text-align:center;color:red"><font color="red">�������ڿ��ļ��гɹ�</font></div></br>�������ڿ��ļ���ͬ����ѧУƽ̨����Լ��Ҫ30����-120����.�������ʹ��,����ѧУ��ʹ��VPN���ŵ�¼<a target="_blank" href="http://' + schoolIp + '/sso">http://' + schoolIp + '/sso</a>��¼Уƽ̨');
        } else {
            alert("" + msg);

        }

    }


    //_rightMenu.hideRightMenu()
    RightMenuObj.prototype.hideRightMenu = function () {
        if (0 == this.active)
            document.getElementById(this.window).style.display = 'none';
    }

    //_rightMenu.showRightMenu()
    RightMenuObj.prototype.showRightMenu = function () {
        window.event.returnValue = false;
        if (0 == _fileUtil.comeFrom && 0 == _fileUtil.searchFlag) {
            //alert(event);
            //alert(event.srcElement.outerHTML);
            //alert(event.srcElement.index);
            var showrecommend = 0;
            var index = event.srcElement.index;
            for (var j = 0; j < _fileUtil.fileList.length; j++) {
                var tempObj = _fileUtil.fileList[j];
                if (tempObj.selected == true && tempObj.fileType == '') {
                    showrecommend = 1;
                    break;
                } else if (tempObj.selected == true) {
                    showrecommend = 2
                }
            }
            /**********����Ҽ���������ѡ�е��ļ����ᱻȡ��************
             for(var j=0;j<_fileUtil.fileList.length;j++){
	         
	          var tempObj=_fileUtil.fileList[j];
	          if(j==index){
	              tempObj.selected=true;
	              _fileUtil.setSelectStatusCss(j);
	          }else{
	             if(tempObj.selected==true){
	               tempObj.selected=false;
	               _fileUtil.setSelectStatusCss(j);
	             }
	          }
	        
	        }
             **********************/
            //alert(i);
            if (document.getElementById("rightMenu.canelRecomend1"))
                document.getElementById("rightMenu.canelRecomend1").className = 'gray';

            if (document.getElementById("rightMenu.canelRecomend2"))
                document.getElementById("rightMenu.canelRecomend2").className = 'gray';
            if (undefined == index) {
                this.currIndex = -1;

                //
                document.getElementById("rightMenu.folderCreate").className = '';
                document.getElementById("rightMenu.upload").className = '';

                document.getElementById("rightMenu.fileRename").className = 'gray';
                document.getElementById("rightMenu.fileDelete").className = 'gray';
                document.getElementById("rightMenu.fileMove").className = 'gray';
                document.getElementById("rightMenu.fileDownload").className = 'gray';
                //
                document.getElementById(this.id_share).className = 'gray';

                if (document.getElementById("rightMenu.recommendActive"))
                    document.getElementById("rightMenu.recommendActive").className = 'gray';
                if (document.getElementById("rightMenu.recommendActive2"))
                    document.getElementById("rightMenu.recommendActive2").className = 'gray';
                if (document.getElementById("rightMenu.recommendActive3"))
                    document.getElementById("rightMenu.recommendActive3").className = 'gray';
                if (document.getElementById("rightMenu.recommendActive4"))
                    document.getElementById("rightMenu.recommendActive4").className = 'gray';


            } else {
                this.currIndex = index;


                if (_fileUtil.fileList[index].selfCode == "1") {
                    if (document.getElementById("rightMenu.canelRecomend1"))
                        document.getElementById("rightMenu.canelRecomend1").className = '';
                }
                if (_fileUtil.fileList[index].areaCode == "1") {
                    if (document.getElementById("rightMenu.canelRecomend2"))
                        document.getElementById("rightMenu.canelRecomend2").className = '';
                }

                //
                document.getElementById("rightMenu.folderCreate").className = 'gray';
                document.getElementById("rightMenu.upload").className = 'gray';

                document.getElementById("rightMenu.fileRename").className = '';
                document.getElementById("rightMenu.fileDelete").className = '';
                document.getElementById("rightMenu.fileMove").className = '';
                document.getElementById("rightMenu.fileDownload").className = '';
                if (document.getElementById("rightMenu.recommendActive"))
                    document.getElementById("rightMenu.recommendActive").className = '';
                if (document.getElementById("rightMenu.recommendActive2"))
                    document.getElementById("rightMenu.recommendActive2").className = '';
                if (document.getElementById("rightMenu.recommendActive3"))
                    document.getElementById("rightMenu.recommendActive3").className = '';
                if (document.getElementById("rightMenu.recommendActive4"))
                    document.getElementById("rightMenu.recommendActive4").className = '';


                if (_fileUtil.isFolder())
                    document.getElementById(this.id_share).className = '';
                else
                    document.getElementById(this.id_share).className = 'gray';
            }
            try {
                if (showrecommend != 2) document.getElementById("rightMenu.recommendclass").style.display = 'none';
                else document.getElementById("rightMenu.recommendclass").style.display = '';
            } catch (e) {
            }


            //alert('showRightMenu');
            if (mask.style.display != "" && mask.style.display != "block") {
                var currWindow = document.getElementById(this.window);
                //alert(this.window);
                currWindow.style.display = '';
                var mouseX = event.clientX;
                //alert(mouseX);
                var mouseY = event.clientY;
                var mouseX = event.clientX;
                window.status = 'mouseY=' + mouseY;

                /*****��ֹ�˵��߳������Ƿ�Χ begin******/
                    //alert(mouseY+213+'  '+document.documentElement.clientHeight);
                var rightMenuHeight = 300;
                var tempHeight = mouseY + rightMenuHeight;
                var docHeight = document.documentElement.clientHeight;
                currWindow.style.pixelTop = mouseY;
                //alert("tempHeight="+tempHeight+",docHeight="+docHeight);
                while (tempHeight > docHeight) {
                    tempHeight -= 10;
                    currWindow.style.pixelTop -= 10;
                }
                //  alert(document.body.clientHeight );
                //alert("tempHeight="+tempHeight+",docHeight="+docHeight);
                try {
                    if (document.body.clientHeight <= currWindow.style.pixelTop + 600) {

                        currWindow.style.pixelTop = document.body.clientHeight - 700;
                    }
                } catch (e) {
                }

                /*****��ֹ�˵��߳������Ƿ�Χ end******/

                /*****��ֹ�˵��������Ƿ�Χ begin******/
                    //alert(mouseY+213+'  '+document.documentElement.clientHeight);
                var rightMenuWidth = 223;

                var tempWidth = mouseX + rightMenuWidth;
                var docWidth = document.documentElement.clientWidth;
                currWindow.style.pixelLeft = mouseX;
                while (tempWidth > docWidth) {
                    tempWidth -= 10;
                    currWindow.style.pixelLeft -= 10;
                }
                /*****��ֹ�˵��������Ƿ�Χ end******/






                _fileWindow.openFlag = 1;//�򿪷�ʽ  0-��ť��ʽ��1-�Ҽ��˵�
                //alert('�򿪷�ʽ��'+_fileWindow.openFlag);


                //alert(_fileUtil.currLevel);
                /**
                 if(_fileUtil.currLevel==0)
                 document.getElementById(this.id_backDir).className='gray';
                 else
                 document.getElementById(this.id_backDir).className='';
                 **/


            }

        }
        return false;
    }

    //document.oncontextmenu=false;


</script>