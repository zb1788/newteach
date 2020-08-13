/*****��ʦ�ļ��� begin*******/
var _teachFolder = new TeachFolder();

function TeachFolder() {

}

//�򿪽�ѧ����
TeachFolder.prototype.createHtml = function () {
    _pMain.folderStyle();
    /**
     var h='';
     h+='<ul class="folder">';
     h+='<li><p><img src="images/folder.png" /></p>ͼƬ</li>';
     h+='<li><p><img src="images/folder.png" /></p>�̰�</li>';
     h+='<li><p><img src="images/folder.png" /></p>��Ƶ</li>';
     h+='<li><p><img src="images/folder.png" /></p>����</li>';
     h+='<li><p><img src="images/folder.png" /></p>�μ�</li>';

     h+='</ul>';
     if(null!=_pMain.getMain()){
    try{
     _pMain.getMain().innerHTML=h;
    }catch(e){
      //alert(e);
      window.status=e+"  "+ _pMain.getMain()==null;
      
    }
   }
     **/
    //��ҳ���С������ʾ�ļ�����
    _fileUtil.pageSize = Math.floor((screen.width - 120) / 115) * Math.floor((screen.height - 300) / 145);
    //_fileUtil.pageSize=2;
    _fileUtil.currLevel = -1;
    _fileUtil.createFileArrayByClick(0);


}


/*****��ʦ�ļ��� end*******/