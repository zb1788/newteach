
$(document).ready(function(){

	freshQrcode();

})

var uuid;
var timerId;//��ʱ��id
var countLimit = 300;//���������ֹͣ�Զ���ѯɨ���� Ĭ��5����
var frequency = 3;//����������ѯһ��ɨ����  Ĭ��3����
var recordTime=0;//��¼�Ѳ�ѯ������
var qrcode;
var port="8900";//��ά��˿�

function makeQcode()
{
		//��ʾ��ά��
		//��ȡip��port�����������
		if(typeof qrcode =="undefined")
		{
			qrcode = new QRCode(document.getElementById("qrcodeCanvas"), {
				width: 150,
				height: 150
			});
		}
        
		if(tProtocol.indexOf("https")>-1){
			port="8901";
		}
		
		var timestamp = Date.parse(new Date());
		var url = tProtocol+_config["SSO"]+":"+port;
		var data = "type=getcode&timestamp="+timestamp;		
	
		ajaxJson(url,data,"utf-8",function(rdata)
        {
			var myjson = eval(rdata);
			 uuid=myjson.key;
			 var qrcodeUrl = decodeURIComponent(myjson.url);
			 //�ڿζ˽��յ������ά����Ϣ����url����scantype����4
			 if(qrcodeUrl!="")
			 {
				qrcodeUrl = qrcodeUrl + "&scantype=4&areacode=53.";
			 }
			 //qrcodeUrl="www.baidu.com";
			 qrcode.makeCode(qrcodeUrl);
			timerId = setInterval('timeDeal();searchRel();',frequency*1000);
		})
}
function timeDeal()
{
	if(countLimit<=recordTime)
	{
		//��ʾ���ֲ�
		$(".msg-err").css("display","block");
		clearInterval(timerId);
		
	}
	else
	{
		recordTime=recordTime+frequency;
	}

}
function exit() {
    top.art.dialog({id:"qrcodeLogin"}).close();
}
function freshQrcode()
{
	recordTime=0;//��¼�Ѳ�ѯ������
	//�������ֲ�
	$(".msg-err").css("display","none");
	var temptimerId = setInterval(function(){
        clearInterval(temptimerId);
		makeQcode();
	}, 200);
	
}
function searchRel()
{

		var timestamp = Date.parse(new Date());
		var url = "http://"+_config["SSO"]+":"+port;
		var data = "type=getstatus&key="+uuid+"&timestamp="+timestamp;
		ajaxJson(url,data,"utf-8",function(rdata)
        {
		
             var myjson = eval(rdata);
			if(myjson.flag=="2")
			{
				var ssoUrl = "http://"+_config["SSO"]+"/sso/verifyAuthInfo?appFlg=PLS&loginUsertype=teacher&key="+uuid;
				//var ssoUrl = "http://ssokw2.czbanbantong.com/sso/verifyAuthInfo?appFlg=PLS&loginUsertype=teacher&key="+uuid;

				ssoUrl += "&username=";
				ssoUrl +="&pwd=";
				ssoUrl +="&pwdRsa=";
				//ssoUrl +="&encodeP=1";//�� md5�㷨 ,1 rsa�㷨 2 base64�㷨 3 3des�㷨
				ssoUrl +="&mac=";
				
				ajaxJson(ssoUrl,null,"utf-8",function(result)
				{
					if(result.authFlg&&result.authFlg==0)
					{
						//��֤�ɹ�
						top.art.dialog.data("result", 1);
						exit();
					}
				
				});
            
			}
		
       
        });
}
function ajaxJson(turl,tdata,charset,fun,timeout,ifasync,jsoncallback){
	var myDate = new Date();
	if(!timeout || timeout==null ){
		timeout=30000;
	}
	var turl1;
	if(turl.indexOf("?")!==-1){
		turl1="&time="+myDate.getSeconds();
	}
	else{
		turl1="?time="+myDate.getSeconds();
	}
	if(typeof(charset)=="undefined" && charset==null){
		charset="gbk";
	}if(typeof(jsoncallback)=="undefined" && jsoncallback==null){
		jsoncallback="jsoncallback";
	}
	//alert("�Ƿ��첽��"+ifasync);
	if(ifasync!=undefined && ifasync!="undefined" && ifasync!=null){

	}else{
		ifasync=true;
	}
	if(null==tdata||undefined==tdata||tdata.length==0){
		turl+=turl1;
	}else{
		turl+=turl1+"&"+tdata;
	}
	//alert(ifasync);
	$.ajax({
		url:turl,
		type:"get",
		async:ifasync,
		dataType:"jsonp",
		jsonp:jsoncallback,
		scriptCharset:charset,
		success:function(rdata){
			fun(rdata);
		},
		error:function(xmlHttpRequest,textStatus,errorThrown) {
			//alert("error"+textStatus + errorThrown);
			//�첽��������޷�����쳣
			//alert('����ʱ��');
		}
	});
}
function QueryString(name) 
{ 
	var sURL = window.location.search 
	var re = new RegExp("" +name+ "=([^&?]+)", "ig"); 
	var result= re.exec(sURL); 
	if(result) 
	{ 
		var temp= result[0].split('='); 
		return temp[1] ; 
	} 
	else 
	{ 
		return ""; 
	} 
} 	