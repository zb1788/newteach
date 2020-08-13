package vcom.newteach.action;

import net.sf.json.JSONObject;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import vcom.newteach.pojo.PlsUserLoginLog;
import vcom.util.GetVersion;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class UserLoginLogAction extends BaseAction {
    protected final Log logger = LogFactory.getLog(getClass());

    private PlsUserLoginLog getCurrentParam(HttpServletRequest request) {
        String mac = request.getParameter("current.mac");
        String account = request.getParameter("current.account");
        if (mac != null || account != null) {
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
     *
     * @return
     */
    public String AccessAddLog(String method, HttpServletRequest request, HttpServletResponse response) {
        String str = "";
        PlsUserLoginLog current = getCurrentParam(request);

        HashMap<String, Object> result = new HashMap<String, Object>();
        try {
            str = new vcom.newteach.dao.UserLoginDao().upLoginLog(current);
            result.put("status", "ok");

        } catch (Exception e) {
            logger.error("�ڲ������û���¼��־(����/�޸�)���ڲ������û���¼��־(����/�޸�)", e);
            e.printStackTrace();
            str = "���/�޸�ʧ��";
            result.put("status", "error");
        }

        result.put("msg", str);

        JSONObject jsobject = JSONObject.fromObject(result);


//		XStream xstream = new XStream(new WstxDriver());
//		String data = xstream.toXML(str);//ת���� xml ��ʽ
        request.setAttribute("data", jsobject.toString());
        return this.SUCCESS;
    }

    /**
     * ɾ����ʷ�û�
     *
     * @return
     */
    public String historyUserDel(String method, HttpServletRequest request, HttpServletResponse response) {
        String str = "ɾ����ʷ�û��ɹ�";
        PlsUserLoginLog current = getCurrentParam(request);
        String mac = current.getMac();
        String account = current.getAccount();

        HashMap<String, String> pmap = new HashMap<String, String>();

        HashMap<String, Object> result = new HashMap<String, Object>();
        try {
            pmap.put("mac", mac);
            pmap.put("account", account);

            new vcom.newteach.dao.UserLoginDao().deleteLoginLog(pmap);

            result.put("status", "ok");
            result.put("msg", "ɾ���ɹ�");
        } catch (Exception e) {
            logger.error("�ڲ������û���¼��־(ɾ��)���ڲ������û���¼��־(ɾ��)", e);
            e.printStackTrace();
            str = "ɾ����ʷ�û�ʧ��" + e.getMessage();
            result.put("status", "error");
            result.put("msg", str);
        }
//		XStream xstream = new XStream(new WstxDriver());
//		String data = xstream.toXML(str);//ת���� xml ��ʽ 

        JSONObject jsobject = JSONObject.fromObject(result);

        request.setAttribute("data", jsobject.toString());
        return this.SUCCESS;
    }

    /**
     * �ⲿ�����û���¼��־(��ѯ),�ڲ������û���¼��־(��ѯ)
     *
     * @return
     */
    public String AccessQueLog(String method, HttpServletRequest request, HttpServletResponse response) {
        try {
            PlsUserLoginLog current = getCurrentParam(request);
            request.getSession().setAttribute("mac", current.getMac());
            List<PlsUserLoginLog> list = new vcom.newteach.dao.UserLoginDao().queryLoginLog(current);
            System.out.println(list.size());
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("userAccount", list);
            map.put("version", GetVersion.versionnum());

            JSONObject jsObject = JSONObject.fromObject(map);

            request.setAttribute("data", jsObject.toString());

//			XStream xstream = new XStream(new WstxDriver());
//			xstream.alias("plsUserLoginLog", PlsUserLoginLog.class);
//			//xstream.alias("pageList", PageList.class);
//			String data = xstream.toXML(list);//ת���� xml ��ʽ 
//			try {
//				Document doc= DocumentHelper.parseText(data);
//				doc.getRootElement().addElement("version").addText(GetVersion.versionnum());
//				data=doc.asXML();
//				request.setAttribute("data",data);
//			} catch (Exception e) {
//				// TODO: handle exception
//				e.printStackTrace();
//			}
//			
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return this.SUCCESS;
    }

}
