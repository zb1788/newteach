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
	 * 内部访问用户登录日志(增加/修改)，内部访问用户登录日志(增加/修改)
	 * @return
	 */
	public String AccessAddLog(String method,HttpServletRequest request,HttpServletResponse response){
		String str = "";
		PlsUserLoginLog current=getCurrentParam(request);
		try {
			str = new vcom.newteach.dao.UserLoginDao().upLoginLog(current);
		} catch (Exception e) {
			logger.error("内部访问用户登录日志(增加/修改)，内部访问用户登录日志(增加/修改)", e);
			e.printStackTrace();
			str = "添加/修改失败";
		}
		XStream xstream = new XStream(new WstxDriver());
		String data = xstream.toXML(str);//转换成 xml 格式 
		
		request.setAttribute("data",data);
		return this.SUCCESS;
	}

	/**
	 * 删除历史用户
	 * @return
	 */
	public String historyUserDel(String method,HttpServletRequest request,HttpServletResponse response){
		String str = "删除历史用户成功";
		PlsUserLoginLog current=getCurrentParam(request);
		String mac=current.getMac();
		String account=current.getAccount();
		try {
			HashMap<String,String> pmap=new HashMap<String,String>();
			pmap.put("mac",mac);
			pmap.put("account",account);
			
			new vcom.newteach.dao.UserLoginDao().deleteLoginLog(pmap);
		} catch (Exception e) {
			logger.error("内部访问用户登录日志(删除)，内部访问用户登录日志(删除)", e);
			e.printStackTrace();
			str = "删除历史用户失败"+e.getMessage();
		}
		XStream xstream = new XStream(new WstxDriver());
		String data = xstream.toXML(str);//转换成 xml 格式 
		request.setAttribute("data",data);
		return this.SUCCESS;
	}

	/**
	 * 外部访问用户登录日志(查询),内部访问用户登录日志(查询)
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
			String data = xstream.toXML(list);//转换成 xml 格式 
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
