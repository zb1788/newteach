package vcom.mobile;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import vcom.util.Config;
import vcom.util.HttpClient;

import vcom.sso.SsoServiceCfg;
import vcom.sso.util.HttpClientUtil;
import vcom.sso.vo.AuthResult;
import vcom.sso.vo.School;
import vcom.sso.vo.StudyStage;
import vcom.sso.vo.VSysUser;


public class MobileAction {

    Logger log = Logger.getRootLogger();


    /**
     * �ж��Ƿ���Ҫ�ֻ���֤��
     */
    public void needPhoneCode(String method, HttpServletRequest request, HttpServletResponse response) {
        vcom.sso.vo.AuthResult authResult = null;
        authResult = getAuthResult(request, response);
        String phoneNumber = null;
        if (authResult.getUser() != null) {
            phoneNumber = authResult.getUser().getLink();
        }

        if (authResult.getUser().getUsername() == null) {
            return;
        }
        //δ���ֻ�����֤
        if (phoneNumber == null || phoneNumber.trim().length() == 0) {
            printNeedValidate(authResult.getUser().getUsername(), "0", response);
            return;
        }

        request.getSession().removeAttribute("mobileCurrentUserPhone");
        Map config = PhoneConfig.instance.getConfigInfo();
        String boundphone = (String) config.get("boundphone");
        String usertype = (String) config.get("usertype");
        String boundArea = (String) config.get("boundArea");

        boolean flag = false;
        String areaId = authResult.getUser().getArea().getAreaId();
        this.log.info("areaId=" + areaId);
        if (StringUtils.isNotBlank(boundphone) && boundphone.equals("0")) {
            printNeedValidate(authResult.getUser().getUsername(), "0", response);
            return;
        }
        if (StringUtils.isNotBlank(boundArea) && StringUtils.isNotBlank(areaId)) {

            String[] areas = boundArea.split(",");
            for (String tmpArea : areas) {
                if (tmpArea != null) {
                    if (tmpArea.endsWith(".")) {
                        if (areaId.startsWith(tmpArea)) {
                            flag = true;
                            break;
                        }
                    } else {
                        if (areaId.equals(tmpArea)) {
                            flag = true;
                            break;
                        }
                    }
                }
            }
        } else {
            printNeedValidate(authResult.getUser().getUsername(), "0", response);
            return;
        }

        if (!flag) {
            printNeedValidate(authResult.getUser().getUsername(), "0", response);
            return;
        }

        Map myMap = null;
        if (authResult != null) {
            VSysUser user = authResult.getUser();
            myMap = getHaveVailderJsonBy205(user.getUsername(), user.getLink(), "0", null);
        }
        if (myMap != null) {
            //����Ƿ�����֤�����
            String saveDay = (String) config.get("vsms_day");
            int saveMaxDay = 0;
            if (StringUtils.isNotBlank(saveDay)) {
                saveMaxDay = Integer.valueOf(saveDay);
            }
            Object ssoDay = myMap.get("verifyDayBeforeToday");
            if (ssoDay != null) {
                int tmpDay = Integer.valueOf(ssoDay.toString());
                if (tmpDay < saveMaxDay) {
                    printNeedValidate(authResult.getUser().getUsername(), "0", response);
                }
            }
            String myUserType = (String) authResult.getUser().getUsertype();
            //String phoneActiveState = (String) myMap.get("phoneActiveState");
            String isNeedVerifyCode = (String) myMap.get("isNeedVerifyCode");
            String link = null;
            if (myMap.get("link") != null)
                link = myMap.get("link").toString();
            if (StringUtils.isNotBlank(link) && !link.equals("null")) {
                request.getSession().setAttribute(
                        "mobileCurrentUserPhone", link.trim());
            }
            if (StringUtils.isNotBlank(boundphone) && boundphone.equals("1")
                    && StringUtils.isNotBlank(usertype)
                    && usertype.indexOf(myUserType) > 0
                    //&& StringUtils.isNotBlank(phoneActiveState)
                    //&& phoneActiveState.equals("1")
                    && StringUtils.isNotBlank(isNeedVerifyCode)
                    && isNeedVerifyCode.equals("1")) {
                printNeedValidate(authResult.getUser().getUsername(), "1", response);

            } else {

                printNeedValidate(authResult.getUser().getUsername(), "0", response);

            }

        } else// �������������
        {
            this.log.info("yjk network can't connection");
            printNeedValidate(authResult.getUser().getUsername(), "0", response);

        }

    }

    //����Ƿ�Ҫ������֤���
    private void printNeedValidate(String username, String needStr, HttpServletResponse response) {
        Map<String, String> map = new HashMap<String, String>();
        map.put("username", username);
        map.put("needPhoneCode", needStr);
        printJson(map, response);
    }

    private void printJson(Map<String, String> map, HttpServletResponse response) {
        PrintWriter out = null;
        JSONObject json = JSONObject.fromObject(map);
        String str = json.toString();
        try {
            str = new String(str.getBytes(), "GBK");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        this.log.info(str);
        response.setContentType("text/html; charset=GBK");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Charset", "GBK");
        try {
            out = new PrintWriter(response.getOutputStream());
        } catch (IOException e) {

            e.printStackTrace();
        } finally {
            if (out != null) {
                out.print(str);
                out.flush();
                out.close();
            }
        }
    }

    /**
     * �����Ƿ���Ҫ��֤����֤ͨ���ӿ�
     *
     * @param usernumber  �û��˺�
     * @param phoneNumber �绰
     * @param doVerify    0��飬1ͨ��(Ĭ��0)
     * @return
     */
    public Map getHaveVailderJsonBy205(String usernumber, String phoneNumber, String doVerify, Integer noCheckCount) {
        if (usernumber == null || phoneNumber == null || usernumber.trim().length() == 0 || phoneNumber.trim().length() == 0) {
            return null;
        }
        if (doVerify == null || doVerify.trim().length() == 0) {
            doVerify = "0";
        }
        if ("1".equals(doVerify) && noCheckCount == null) {
            return null;
        }
        String data = null;
        data = "username=" + usernumber + "&verifyPhone=" + phoneNumber + "&doVerify=" + doVerify;
        if ("1".equals(doVerify)) {
            data += "&noCheckCount=" + noCheckCount;
        }
        String url = Config.getSysPath("SSO_IP") + "/sso/interface/smsVerifyCode.jsp?" + data;
        this.log.info(url);
        //String jsonStr = HttpClient.readURLByParamEncode(url,null, null, "gbk",timeOut);
        String jsonStr = HttpClient.readURLByParamEncode(url, null, null, "gbk");
        if (StringUtils.isNotBlank(jsonStr)) {
            JSONObject js = JSONObject.fromObject(jsonStr);
            Map myMap = new HashMap();
            myMap = (Map) JSONObject.toBean(js, myMap.getClass());
            return myMap;
        }
        return null;
    }
	/*
	public Map getHaveVailderJsonBy207(TeacherInfo teacherinfo)
	{

		String data = "username="+ teacherinfo.getTeachnumber()+ "lastUt=&doVerify=0";
		String url = InterfaceCfg.getIpUrlByICode("SSO.207","SSO")+"?" + data;
		this.log.info("ONE URL=" + url);
		String jsonStr = MyHttpClient
				.sendPlayServlet(url, null, "gbk", timeOut);
		if (StringUtils.isNotBlank(jsonStr)) {
			JSONObject js = JSONObject.fromObject(jsonStr);
			Map myMap = new HashMap();
			myMap = (Map) JSONObject.toBean(js, myMap.getClass());
			return myMap;
		}
		return null;
	}
	*/

    //����Ƿ�����ʱ��֤��
    public void sendTmpCode(String method, HttpServletRequest request, HttpServletResponse response) {

        Map config = PhoneConfig.instance.getConfigInfo();
        Map<String, String> json = new HashMap<String, String>();
        json.put("allow", "true");
        int rand = Common.getrandom(6);
        json.put("rand", "" + rand);
        String boundphone = (String) config.get("boundphone");

        if (StringUtils.isNotBlank(boundphone) && boundphone.equals("0")) {
            printJson(json, response);
            return;
        }
        Map map = null;
        AuthResult authResult = getAuthResult(request, response);
        if (authResult != null) {
            VSysUser user = authResult.getUser();
            map = getHaveVailderJsonBy205(user.getUsername(), user.getLink(), "0", null);
        }

        if (map != null && map.get("noCheckCountUsed") != null) {

            String count = map.get("noCheckCountUsed").toString();
            if (StringUtils.isBlank(count)) {
                count = "0";
            }
            Object tmpObj = config.get("tmpCodeCount");
            if (tmpObj != null) {
                String tmpCodeCount = (String) tmpObj;
                json.put("noCheckCountUsed", count);
                json.put("tmpCodeCount", tmpCodeCount);
                int useCount = Integer.valueOf(count);
                int maxCount = Integer.valueOf(tmpCodeCount);
                if (useCount >= maxCount) {
                    json.put("allow", "false");
                }
            }
        }
        printJson(json, response);
    }

    //��֤��ʱ��֤��
    public void validateTmpCode(String method, HttpServletRequest request, HttpServletResponse response) {
        Map<String, String> json = new HashMap<String, String>();
        Map map = null;
        AuthResult authResult = getAuthResult(request, response);
        if (authResult != null) {
            VSysUser user = authResult.getUser();
            map = getHaveVailderJsonBy205(user.getUsername(), user.getLink(), "0", null);
        }
        if (map != null) {
            Integer noCheckCountUsed = null;
            String verifyPhone = "";
            Integer obj1 = (Integer) map.get("noCheckCountUsed");

            if (obj1 != null) {
                noCheckCountUsed = obj1 + 1;
            }
            Object obj2 = map.get("verifyPhone");
            if (obj2 != null) {
                verifyPhone = obj2 + "";
            }
            map = getHaveVailderJsonBy205(authResult.getUser().getUsername(), verifyPhone, "1", noCheckCountUsed);
        }
        json.put("msg", "ok");
        printJson(json, response);
    }


    /**
     * �������ֻ���֤��
     */
    public void sendPhoneCode(String method, HttpServletRequest request, HttpServletResponse response) {

        SendSMS send = new SendSMS();
        String back = "";
        Map config = PhoneConfig.instance.getConfigInfo();
        String content = (String) config.get("vsms_content");
        int rand = Common.getrandom(6);
		
		/*String currentUserPhone = (String) request.getSession()
				.getAttribute("mobileCurrentUserPhone");*/
        String currentUserPhone = null;
        AuthResult authResult = getAuthResult(request, response);
        if (authResult != null && authResult.getUser() != null) {
            currentUserPhone = authResult.getUser().getLink();
        }
        if (currentUserPhone != null) {
            try {
                boolean sendtype = send.sendMobileSMS(currentUserPhone, content
                        .replace("###", String.valueOf(rand)));
                if (sendtype) {
                    request.getSession().setAttribute("vicode", rand + "");
                    back = "{'type':'1','message':'','icode':'" + rand + "'}";
                } else {
                    back = "{'type':'0','message':'���Ͷ���ʧ��!'}";
                }
            } catch (Exception e) {
                e.printStackTrace();
                back = "{'type':'0','message':'���Ͷ���ʧ��!'}";
            }
        } else {
            back = "{'type':'0','message':'�û��ֻ��Ż�ȡʧ��!'}";
        }
        try {

            back = new String(back.getBytes(), "GBK");
            response.setContentType("text/html; charset=GBK");
            response.setHeader("Cache-Control", "no-cache");
            response.setHeader("Charset", "GBK");
            response.getWriter().write(back);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    private String userEnterPhoneCode;

    /**
     * @return the userEnterPhoneCode
     */
    public String getUserEnterPhoneCode() {
        return userEnterPhoneCode;
    }

    /**
     * @param userEnterPhoneCode the userEnterPhoneCode to set
     */
    public void setUserEnterPhoneCode(String userEnterPhoneCode) {
        this.userEnterPhoneCode = userEnterPhoneCode;
    }

    // http://192.168.144.5/viManage/VIHttpService?icode=SSO.207&data={"lastUt":"","username":"4101810000010001","doVerify":"1"}


    /**
     * Ŀǰ����Ҫ���ˣ���needPhoneCode�ﴦ���ˣ���֪��ҳ���ĵ��õ������

     private boolean isNeedPhoneCodeByLastLoginMobileTime( TeacherInfo teacherinfo) {
     boolean flag = true;
     Map config = PhoneConfig.instance.getConfigInfo();
     String saveDay = (String) config.get("vsms_day");
     int saveMaxDay = 0;
     if (StringUtils.isNotBlank(saveDay)) {
     saveMaxDay = Integer.valueOf(saveDay);
     }
     if(saveMaxDay==0)return true;

     String url = InterfaceCfg.getIpUrlByICode("SSO.207","SSO") + "?username=" + teacherinfo.getTeachnumber() + "&lastUt=&doVerify=0";
     this.log.info("ONE URL=" + url);
     String jsonStr = MyHttpClient.sendPlayServlet(url, null, "gbk", timeOut);
     if (StringUtils.isNotBlank(jsonStr)) {
     JSONObject js = JSONObject.fromObject(jsonStr);
     Map myMap = new HashMap();
     myMap = (Map) JSONObject.toBean(js, myMap.getClass());
     Object ssoDay = myMap.get("verifyDayBeforeToday");
     this.log.info("ssoDay=" + ssoDay);
     if (ssoDay != null) {

     int tmpDay = Integer.valueOf(ssoDay.toString());
     if (tmpDay < saveMaxDay) {
     flag = false;
     }
     }

     }
     return flag;
     }
     */
    /*
     * //�ֻ����ĵ�¼ public final String lastLoginMobileTime="LastLoginMobileTime";
     *
     * private boolean isNeedPhoneCodeByLastLoginMobileTime() { Map
     * config=PhoneConfig.instance.getConfigInfo(); String saveDay=(String)
     * config.get("vsms_day"); int saveMaxDay=1;
     * if(StringUtils.isNotBlank(saveDay)) {
     * saveMaxDay=Integer.valueOf(saveDay); } boolean flag=true;
     * KnowledgeStructureList knowledgeStructureList=new
     * KnowledgeStructureList();
     *
     * String platformType=
     * knowledgeStructureList.getSysParamByName("pls.showke.type");
     * if(platformType.equals("1")) { //��ͳһ��ȡ } Object obj=
     * getServletContext().getAttribute(lastLoginMobileTime); if(obj!=null) {
     * Long lastTime= (Long) obj; Calendar now=Calendar.getInstance(); int
     * year=now.get(Calendar.YEAR); int dayInYear=now.get(Calendar.DAY_OF_YEAR);
     * now.setTimeInMillis(lastTime); int lastyear=now.get(Calendar.YEAR); int
     * lastDayInYear=now.get(Calendar.DAY_OF_YEAR);
     * if(year==lastyear&&dayInYear-lastDayInYear<saveMaxDay) { flag=false; }
     *  } return flag; }
     */

    /**
     * ��֤������ֻ���֤��.
     */
    public void validatePhoneCode(String method, HttpServletRequest request, HttpServletResponse response) {
        Map<String, String> tmpMap = new HashMap<String, String>();
        if (StringUtils.isNotBlank(userEnterPhoneCode)) {
            String viCode = (String) request.getSession().getAttribute("vicode");

            if (StringUtils.isBlank(viCode)) {
                tmpMap.put("type", "0");
                tmpMap.put("message", "���Ȼ�ȡ�ֻ���֤��");

            } else {

                if (viCode.equals(userEnterPhoneCode.trim())) {

                    tmpMap.put("type", "1");
                    tmpMap.put("message", "��֤����ȷ");
                    Map map = null;
                    AuthResult authResult = getAuthResult(request, response);
                    if (authResult != null) {
                        VSysUser user = authResult.getUser();
                        map = getHaveVailderJsonBy205(user.getUsername(), user.getLink(), "0", null);
                    }
                    if (map != null) {
                        String verifyPhone = "";
                        Integer noCheckCountUsed = (Integer) map.get("noCheckCountUsed");
                        Object obj2 = map.get("verifyPhone");
                        if (obj2 != null) {
                            verifyPhone = obj2 + "";
                        }
                        map = getHaveVailderJsonBy205(authResult.getUser().getUsername(), verifyPhone, "1", noCheckCountUsed);
                    }

                    // KnowledgeStructureList knowledgeStructureList=new
                    // KnowledgeStructureList();

                    // String platformType=
                    // knowledgeStructureList.getSysParamByName("pls.showke.type");
                    /*
                     * if(platformType.equals("1")) { //���浽Զ�� }
                     */
                    // getServletContext().setAttribute(lastLoginMobileTime, new
                    // Date().getTime());

                } else {
                    tmpMap.put("type", "0");
                    tmpMap.put("message", "�ֻ���֤�벻��ȷ");

                }
            }
        } else {
            tmpMap.put("type", "0");
            tmpMap.put("message", "�ֻ���֤�벻��Ϊ��");
        }
        printJson(tmpMap, response);
    }
	
	/*
	private void phoneSucessNotidy(String noCheckCount,String  verifyPhone) {
		TeacherInfo teacherinfo = (TeacherInfo) getRequest().getSession()
				.getAttribute("teacher");
		String data = "username="+teacherinfo.getTeachnumber()+"&lastUt=&doVerify=1&noCheckCount="+noCheckCount+"&verifyPhone="+verifyPhone;
		String url = InterfaceCfg.getIpUrlByICode("SSO.207","SSO")+"?" + data;
		this.log.info("ONE URL=" + url);
		String message = MyHttpClient
				.sendPlayServlet(url, null, "gbk", timeOut);
		this.log.info("message=" + message);
	}
	*/


    public static void main(String[] args) {

        Calendar now = Calendar.getInstance();
        print(now);

        try {
            Thread.sleep(1000 * 10);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        long ss = new Date().getTime();
        now.setTimeInMillis(ss);
        print(now);

    }

    private static void print(Calendar now) {
        int year = now.get(Calendar.YEAR);
        int month = now.get(Calendar.MONTH);
        int day = now.get(Calendar.DAY_OF_YEAR);
        int hour = now.get(Calendar.DAY_OF_MONTH);
        int m = now.get(Calendar.MINUTE);
        int s = now.get(Calendar.SECOND);
        //System.out.println("year=" + year + ",month=" + month + ",day=" + day				+ ",h=" + hour + ",m=" + m + ",s=" + s);

    }
	
	
	
	/*
	public String yxExecute(){
		 HttpServletResponse hresponse =(HttpServletResponse)getResponse() ;
		if(StringUtils.isBlank(flag)){
			flag="0";
	   	 }
		setMyCookie("m_flag", flag, hresponse);
		setMyCookie("viewType",viewType+"",hresponse);
		
		HttpServletRequest hrequest =(HttpServletRequest)getRequest() ;
		AuthResult authResult = getAuthResult(hrequest, hresponse); 
		if(StringUtils.isNotBlank(time)){
	   		infoStartTime = new Date();
			mobileLog.setInfoStartTime(infoStartTime);
	   	 }
		if(authResult!=null){
			VSysUser user = authResult.getUser();
			if(user!=null){
				if(StringUtils.isNotBlank(user.getUsertype())){
					if(user.getUsertype().equals("0")){//�ҳ�
						return parentExecute(user);
					}else if(user.getUsertype().equals("4")){//ѧ��
						return studentExecute(user);
					}else{
						return teacherExecute(user);//��ʦ
					}
				}
			}else{
				log.error("user����Ϊ��:"+authResult.getAuthInfo());
				mobileLog.setC1("1");
				saveMobileLog(time);
				return "error";
			}
		}else{
			log.error("���û����Ļ�ȡ�û���Ϣʧ��");
			mobileLog.setC1("2");
			saveMobileLog(time);
			return "error";
		}
		
		return "success";
	}
	*/

    /*
    private void setMyCookie(String key, String value,
            HttpServletResponse response) {
        if (StringUtils.isNotBlank(value)) {
            String value64 = null;
            try {
                value64 = URLEncoder.encode(value, "UTF-8");
            } catch (Exception ex) {
                return;
            }
            Cookie cookie = new Cookie(key, value64);
            cookie.setMaxAge(60 * 60 * 24 * 2);//2h
            cookie.setPath("/");
           //if(key.equals("ut"))
           //{
             String serverName=request.getServerName();
              if(serverName!=null)
              {
                boolean tmpFlag= StringUtil.isDomainName(serverName);
                if(tmpFlag)
                {
                    int tmpIndex=serverName.indexOf(".");
                    if(tmpIndex>0)
                    {
                    cookie.setDomain(serverName.substring(tmpIndex+1));
                    }
                }
              }
            //}
            response.addCookie(cookie);
            log.info(key + "=" + value);
        }
    }
    */
    private void setMyRequest(String key, String value,
                              HttpServletRequest request) {
        if (StringUtils.isNotBlank(value)) {
//			String value64 = null;
//			try {
//				value64 = URLEncoder.encode(value, "UTF-8");
//			} catch (Exception ex) {
//				return;
//			}
            request.setAttribute(key, value);
            log.info(key + "=" + value);
        }
    }


    public AuthResult getAuthResult(HttpServletRequest hrequest, HttpServletResponse hresponse) {
        hresponse.setHeader("P3P", "CP=CAO PSA OUR");
        hresponse.setHeader("X-XSS-protection", "0; mode=block");
        javax.servlet.http.HttpSession session = hrequest.getSession(true);
        AuthResult authResult = (AuthResult) session.getAttribute("authResult");
        return authResult;
    }

}
