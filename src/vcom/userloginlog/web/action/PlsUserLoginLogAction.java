package vcom.userloginlog.web.action;

import vcom.newteach.action.BaseAction;
import vcom.newteach.pojo.PlsUserLoginLog;
import vcom.util.GetVersion;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.Dom4JDriver;
import com.thoughtworks.xstream.io.xml.WstxDriver;


public class PlsUserLoginLogAction extends BaseAction{
	protected final Log logger = LogFactory.getLog(getClass());
	
	private PlsUserLoginLog getCurrentParam(HttpServletRequest request){
		String mac = request.getParameter("current.mac");
		String account = request.getParameter("current.account");
		if(mac!=null || account!=null){
			PlsUserLoginLog alog = new PlsUserLoginLog();
			alog.setMac(mac);
			alog.setAccount(account);
			alog.setC1(request.getParameter("current.c1"));
			alog.setC2(request.getParameter("current.c2"));
			alog.setC3(request.getParameter("current.c3"));
			alog.setC4(request.getParameter("current.c4"));
			alog.setC5(request.getParameter("current.c5"));
			alog.setC6(request.getParameter("current.c6"));
			alog.setPwd(request.getParameter("pwd"));
			alog.setUserName(request.getParameter("userName"));
			alog.setTemplateId(request.getParameter("templateId"));
			return alog;
		}
		return null;
	}
	
	/**
	 * �ڲ������û���¼��־(����/�޸�)���ڲ������û���¼��־(����/�޸�)
	 * @return
	 */
	public String AccessAddLog(String method,HttpServletRequest request,HttpServletResponse response){
		String str = "";
		PlsUserLoginLog current=getCurrentParam(request);
		try {
			str = new vcom.newteach.dao.UserLoginDao().upLoginLog(current);
		} catch (Exception e) {
			logger.error("�ڲ������û���¼��־(����/�޸�)���ڲ������û���¼��־(����/�޸�)", e);
			e.printStackTrace();
			str = "���/�޸�ʧ��";
		}
		XStream xstream = new XStream(new WstxDriver());
		String data = xstream.toXML(str);//ת���� xml ��ʽ 
		
		request.setAttribute("data",data);
		return this.SUCCESS;
	}

	/**
	 * ɾ����ʷ�û�
	 * @return
	 */
	public String historyUserDel(String method,HttpServletRequest request,HttpServletResponse response){
		String str = "ɾ����ʷ�û��ɹ�";
		PlsUserLoginLog current=getCurrentParam(request);
		String mac=current.getMac();
		String account=current.getAccount();
		try {
			HashMap<String,String> pmap=new HashMap<String,String>();
			pmap.put("mac",mac);
			pmap.put("account",account);
			
			new vcom.newteach.dao.UserLoginDao().deleteLoginLog(pmap);
		} catch (Exception e) {
			logger.error("�ڲ������û���¼��־(ɾ��)���ڲ������û���¼��־(ɾ��)", e);
			e.printStackTrace();
			str = "ɾ����ʷ�û�ʧ��"+e.getMessage();
		}
		XStream xstream = new XStream(new WstxDriver());
		String data = xstream.toXML(str);//ת���� xml ��ʽ 
		request.setAttribute("data",data);
		return this.SUCCESS;
	}

	/**
	 * �ⲿ�����û���¼��־(��ѯ),�ڲ������û���¼��־(��ѯ)
	 * @return
	 */
	public String AccessQueLog(String method,HttpServletRequest request,HttpServletResponse response){
		try {
			PlsUserLoginLog current=getCurrentParam(request);
			request.getSession().setAttribute("mac", current.getMac());
			List list = new vcom.newteach.dao.UserLoginDao().queryLoginLog(current);
			XStream xstream = new XStream(new WstxDriver());
			xstream.alias("plsUserLoginLog", PlsUserLoginLog.class);
			//xstream.alias("pageList", PageList.class);
			String data = xstream.toXML(list);//ת���� xml ��ʽ 
			try {
				Document doc= DocumentHelper.parseText(data);
				doc.getRootElement().addElement("version").addText(GetVersion.versionnum());
				data=doc.asXML();
				request.setAttribute("data",data);
			} catch (Exception e) {
				// TODO: handle exception
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return this.SUCCESS;
	}
	
}
