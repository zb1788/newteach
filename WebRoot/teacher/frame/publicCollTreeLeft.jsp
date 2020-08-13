<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>


    <title>��ʦ����ϵͳ</title>
    <link rel="StyleSheet" href="<%=path%>/teacher/style/dtree.css"
          type="text/css"/>

    <link href="<%=path%>/newSytles/public.css" rel="stylesheet"
          type="text/css"/>
    <link href="<%=path%>/newSytles/sub.css" rel="stylesheet"
          type="text/css"/>

    <link href="<%=path%>/newSytles/tab.css" rel="stylesheet"
          type="text/css"/>
    <script type="text/javascript" src="<%=path%>/teacher/js/dtree.js"></script>

    <script language="javascript" src="<%=path%>/js/common.js"></script>
    <script language="javascript"
            src="<%=path%>/js/ajax_common.js"></script>
    <script language="javascript" src="<%=path%>/js/jquery-1.4.2.min.js"></script>
</head>

<body>
<!-- class="sc_title" ȥ����ʽ -->
<table height="100%" width="100%" border="0" cellpadding="0"
       cellspacing="0">
    <tr>
        <td height="60">
            <h4 class="mulushu_h4">
                �ҵ��ļ���
                <img src="<%=path%>/newImages/zt_spLine.png" width="196"/>
            </h4>

        </td>
    </tr>
    <tr>
        <td><br>
            <div class="frameCon">
                <table width="98%" border="0" align="center" cellpadding="0"
                       cellspacing="0">
                    <tr>
                        <td>
                            <div id="leftTree">

                            </div>

                            <br></td>
                    </tr>
                </table>
            </div>
            <br></td>
    </tr>
</table>
</body>
</html>
<script type="text/javascript">
    _common.setCurrServerPath('<%=path%>');
    _common.setTeacherId('<s:property value="#session.checkedUser.username" />');


</script>
<script type="text/javascript">
    <!--
    var d11 = null;
    var _leftTree = new LeftTreeObj();

    function LeftTreeObj() {
        this.dirList = new Array();
    }

    LeftTreeObj.prototype.createFileArray = function (parentfcode, pos) {
        //alert('createFileArray');
        var url = _common.getCurrServerPath() + "/teacher/getFileList.do?1=1";

        url += "&parentfcode=0";
        url += "&teachnumber=" + _common.getTeacherId();
        url += "&ajaxdate=" + new Date();
        //alert(url);
        sendRequest(this.createTree, url);/**/
        //this.parseFileXmlToObject();
    };//end of ����ֱ������

    //�ҵ��ļ���  _leftTree.myFolder();
    LeftTreeObj.prototype.myFolder = function () {
        try {
            if (!parent.newRight._rightMenu) {
                toswitch(null, 1);
            } else {
                //�����Ҽ��˵�
                parent.newRight._rightMenu.setActiveStatus(0);
                parent.newRight._rightMenu.hideRightMenu();
                parent.newRight._fileUtil.currLevel = 0;
                parent.newRight._fileUtil.createFileArrayByLeft(0);
            }

        } catch (e) {
            window.status = '�Ҳ�ҳ����δ�����꣬���Եȣ�';
        }
    }//end of


    //���繲��  _leftTree.netShare();
    LeftTreeObj.prototype.netShare = function () {
        try {
            //�����Ҽ��˵�
            if (!parent.newRight._rightMenu) {
                toswitch(null, 2);
            } else {
                parent.newRight._rightMenu.setActiveStatus(0);
                parent.newRight._rightMenu.hideRightMenu();
                parent.newRight._teacherUtil.createHasSharedTeacherArrayRequest();
            }

        } catch (e) {
            window.status = '�Ҳ�ҳ����δ�����꣬���Եȣ�';
        }
    }//end of

    //�ҵĺ��� _leftTree.myFriend();
    LeftTreeObj.prototype.myFriend = function () {
        try {
            //�����Ҽ��˵�
            if (!parent.newRight._rightMenu) {
                toswitch(null, 3);
            } else {
                parent.newRight._rightMenu.setActiveStatus(0);
                parent.newRight._rightMenu.hideRightMenu();
                parent.newRight._teacherUtil.createFriendArrayRequest();
            }

        } catch (e) {
            window.status = '�Ҳ�ҳ����δ�����꣬���Եȣ�';
        }
    }//end of
    //�ҵ��Ƽ�����Դ _leftTree.myRecommend();
    LeftTreeObj.prototype.myRecommend = function () {
        try {
            //�����Ҽ��˵�
            if (parent.newRight._rightMenu) {
                toswitch(1);
            } else {

            }
        } catch (e) {
            window.status = '�Ҳ�ҳ����δ�����꣬���Եȣ�';
        }
    }//end of
    LeftTreeObj.prototype.createTree = function (xmldoc) {
        //alert(_fileUtil.pos);
        var fileNodes = xmldoc.selectNodes("//VCOM/files/file");//��ȡ
        //alert(fileNodes.length);
        d11 = new dTree('d11');

        d11.config.useCookies = false;
        //d11.config.folderLinks = false;
        d11.config.target = "_self";


        var jsStr = '';
        jsStr = 'javascript:_leftTree.myFolder();';
        //alert(jsStr);
        d11.add(0, -1, '�ҵ��ļ���', jsStr, '', '');


        //
        jsStr = '';
        jsStr = 'javascript:_leftTree.netShare();';

        d11.add('���繲��', -1, '���繲��', jsStr, '', '');

        //
        jsStr = '';
        jsStr = 'javascript: _leftTree.myFriend();';

        d11.add('�ҵĺ���', -1, '�ҵĺ���', jsStr, '', '');

        jsStr = 'javascript: _leftTree.myRecommend();';

        d11.add('���Ƽ�����Դ', -1, '���Ƽ�����Դ', jsStr, '', '');
        /*********
         for (var i = 0; i < fileNodes.length; i++) {
				var fileNode = fileNodes[i];
				
				
				var id=i;
				var fCode= "";//
				var fileName= "";//
				var fileType= "";//
				var fileSize= "";// 
				var type = "";// 
				 
				try {
					fileName=fileNode.selectNodes("fileName")[0].text; // 
					
					//alert(fileName);
				}catch (e) {
					//alert(e.message);
				}	
					
				try {	
					fileType  = fileNode.selectNodes("fileType")[0].text; // 
				}catch (e) {
					//alert(e.message);
				}
				
				try {	
					fCode  = fileNode.selectNodes("fCode")[0].text; // 
					//alert(fCode);
				}catch (e) {
					//alert(e.message);
				}
				try {	
					type  = fileNode.selectNodes("type")[0].text; // 
					//alert(fCode);
				}catch (e) {
					//alert(e.message);
				}
				
				try {	
					fileSize  = fileNode.selectNodes("fileSize")[0].text; // 
					//alert(fCode);
				}catch (e) {
					//alert(e.message);
				}
				 
				if(1==type){
				   //jsStr='javascript:alert();';
				   jsStr='';
				   jsStr='javascript:'; 
				   jsStr+='parent.newRight._fileUtil.currLevel=1;';
				   
				   var navStr='�ҵ��ļ���/'+fileName;
				   jsStr+='parent.newRight._fileUtil.createFileArrayByLeft(\''+fCode+'\',1,\''+navStr+'\');';
				   
				   
				   //jsStr+='parent.newRight._fileUtil.setPathNav(\''+navStr+'\');alert();';//��ʾ����·��
				   //alert(jsStr);
				   var name=fileName;
				   if(name.length>14)
				      name=name.substring(0,13)+'��';
				   d11.add(fCode,0,name,jsStr,'','');
				   //d11.add(fCode,0,fileName,jsStr,'img/folder.gif','img/folder.gif');
	            }  
			   
			}// end of for
         **/
        leftTree.innerHTML = d11;
        //alert('??'+d11);
    };// end of


    _leftTree.createFileArray();


    //d.config.folderLinks = true;


    function toswitch(type, code) {
        if (type == 1) parent.switchClose("<%=path%>/teacherrecommend/getRecommendedList.do", false);
        else parent.switchClose("<%=path%>/teacher/teacherTreeLeft.do?teachernumber=<s:property value="#session.checkedUser.username" />&typecode=" + code, false);
    }

    toswitch();
    //-->
</script>
