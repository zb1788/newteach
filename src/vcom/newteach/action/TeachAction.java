package vcom.newteach.action;

import vcom.util.Config;
import vcom.util.HttpClient;
import vcom.util.Vcom_3DES;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import vcom.util.MD5;
import vcom.util.DateUtil;
//import vcom.util.RequestUtil;
import vcom.newteach.dao.UserLoginDao;
import vcom.newteach.pojo.PlsUserLoginLog;
import vcom.newteach.service.ParamValueCache;
import vcom.sso.vo.AuthResult;
import vcom.sso.vo.VSysUser;


public class TeachAction {
    private static Logger log = Logger.getLogger(TeachAction.class);

    /**
     *
     * ��ת����¼ҳ��
     *
     * @return
     */

    /**
     * ˫����תʱ������cookie UID���µ�½
     *
     * @throws Exception
     */
    public AuthResult getAuthResult(HttpServletRequest request) throws Exception {
        AuthResult authResult = (AuthResult) request.getSession().getAttribute("authResult");

        if (authResult == null) {
            throw new Exception("No Login Error!");
        }

        return authResult;
    }

    /**
     * ��ת��ҳ��
     *
     * @return
     */
    public String toIndexPage(String method, HttpServletRequest request, HttpServletResponse response) {
        String mac = request.getParameter("mac");
        String rememberPwd = request.getParameter("rememberPwd");
        String pwd = request.getParameter("pwd");

        log.debug("CHECK MAC IF NULL" + (mac == null));

        AuthResult authResult = null;
        try {
            authResult = (AuthResult) request.getSession().getAttribute("authResult");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            //e.printStackTrace();
            log.warn(" NOT get authResult by Session!!! MAY BE OLD CLIENT !!!!!!");
        }//��ȡAuthResult

        //�ϵ�½�Ŀ�Ӧ��֧��cookie
        if (authResult == null) {
            long ntime = new java.util.Date().getTime();
            //sdes�����˺�
            String saccount = getCookie(request, "saccount");
            //md5����
            String spwd = getCookie(request, "spwd");
            //��½Date.getTime
            Long tims = 0L;
            try {
                if (getCookie(request, "ltime") != null) {
                    tims = Long.parseLong(getCookie(request, "ltime"));
                }
            } catch (Exception e) {
            }
            Long timepass = ntime - tims;
            log.info("OLD LOGIN CHECK COOKIE! saccount:" + saccount + " spwd:" + spwd + "stime:" + tims + " timepass:" + timepass);
            //15���ڵ�cookie��Ч
            if (spwd != null && saccount != null && 0 < timepass && timepass < 15000) {
                String url = Config.getSysPath("SSO_IP");
                url += "/sso/verifyAuthInfo?appFlg=PLS&pwd=" + spwd + "&username=" + saccount + "&loginUsertype=teacher";

                String xml = HttpClient.readURL(url, 5000, null, "", "command", "service", "");
                log.info("RE LOGIN URL:" + url + " result:" + xml);
                try {
                    if (StringUtils.isNotBlank(xml)) {
                        JSONObject js = JSONObject.fromObject(xml);
                        authResult = (AuthResult) js.toBean(js, AuthResult.class);
                        if (authResult != null) {
                            request.getSession().setAttribute("authResult", authResult);
                            if (request.getServerName() != null && request.getServerName().indexOf("pls") > -1) {
                                String partDomain = request.getServerName().substring(request.getServerName().indexOf(".") + 1);
                                Cookie acookie = new Cookie("ut", URLEncoder.encode(authResult.getUt(), "UTF-8"));
                                acookie.setDomain(partDomain);
                                acookie.setPath("/");
                                response.addCookie(acookie);
                            }
                        } else {
                            log.error(" NO LOGIN INFO !!!  get Login Info By Cookie Failed !!!!!!!");
                        }
                    }
                } catch (Exception e) {
                }
            }
        }

        log.info("authResult IS NULL: " + (authResult == null));

        if (authResult == null) {
            return "loginerror";
        }
        //��ȡ�༶�汾����Ϣ
        PlsUserLoginLog slog = new PlsUserLoginLog();
        PlsUserLoginLog templog = new PlsUserLoginLog();
        slog.setAccount(authResult.getUser().getUsername());
        UserLoginDao loginDao = new UserLoginDao();
        try {
            List<PlsUserLoginLog> list = loginDao.queryLoginLog(slog);
            if (list.size() > 0) {
                PlsUserLoginLog tlog = list.get(0);
                templog.setC2(tlog.getC2());
                templog.setC3(tlog.getC3());
            }

            slog.setAccount(authResult.getUser().getUsername());
            slog.setMac(mac);
            slog.setCount(1);
            list = loginDao.queryLoginLog(slog);
            if (list.size() > 0) {
                templog.setC6(((PlsUserLoginLog) list.get(0)).getC6());
            } else {
                templog.setC6("");
            }

            request.setAttribute("c2", templog.getC2());
            request.setAttribute("c3", templog.getC3());
            request.setAttribute("c6", templog.getC6());

        } catch (Exception e) {
            e.printStackTrace();
        }

        //���汾�ε�½
        PlsUserLoginLog loglog = new PlsUserLoginLog();
        if (!StringUtils.isEmpty(mac)) {
            try {
                loglog.setMac(mac);
                loglog.setAccount(authResult.getUser().getUsername());
                loglog.setUserName(authResult.getUser().getTruename());
                if (!"false".equals(rememberPwd)) {
                    //��ס���룬����δ���ò������ϰ汾��
                    loglog.setPwd(pwd);
                } else {
                    //�������
                    loglog.setPwd("");
                }
                loglog.setC1("1");
                loginDao.upLoginLog(loglog);

            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            log.info("û�л�ȡ�������ַ");
        }

        ///////////////////
        //��Ʒ��Ȩ���ݽӿ�

        log.info("authResult.getUser()=null" + (authResult.getUser() == null));

        String url2 = Config.getSysPath("SSO_IP");
        url2 += "/sso/pdGrant?appFlg=TLS&username=" + authResult.getUser().getUsername();
        String prductGrant = HttpClient.readURL(url2, 3000, null, "", "command", "service", "");
        log.info("prductGrant=null" + (prductGrant == null));
        if (!(prductGrant.startsWith("{") && prductGrant.endsWith("}"))) {
            prductGrant = null;
        } else {
            request.setAttribute("prductGrant", prductGrant);
        }

        return "success";
    }
    /**
     * ���ݿ�Ŀ���ƻ���û�������Ϣ
     *
     * @return
     * @throws Exception

    public String getUserSetBySubjectName() throws Exception {

    TeachAction teachAction = new TeachAction();
    vcom.sso.vo.AuthResult authResult = null;
    try {
    authResult = teachAction.getAuthResult(request);
    } catch (Exception e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
    }
    VSysUser user=null;
    if(authResult!=null && authResult.getUser()!=null)
    {
    user=authResult.getUser();
    if(user.getSchool()!=null)
    {
    schoolId=user.getSchool().getSchoolId();
    for (int i=0;i<user.getStudyStage().length;i++)
    {
    if(i>0){studyStages+=",";}
    this.studyStages+=user.getStudyStage()[i].getStudyStageCode();
    }
    }
    }
    int ti=5000;
    String url="";
    String type=ParamValueCache.getTempKey("pls.showke.type");
    String path=Config.getIpUrlByICode("TMS.601","TMS");
    log.info("��ȡ�Ľӿڵ�ַpath:"+path);
    if(StringUtils.isNotBlank(type))
    {
    if(type.equals("1"))
    {
    url=path+"?data={\"queryType\":\"byUser\",\"username\":\""+username+"\",\"schoolId\":\""+schoolId+"\",\"realSet\":\"1\"}&s="+DateUtil.getDate(new Date(),"yyyy-MM-ddHH:mm:ss");

    }else{
    url=ParamValueCache.getTempKey("pls.school.version.url")+"?data={\"queryType\":\"byUser\",\"username\":\""+username+"\",\"schoolId\":\""+schoolId+"\",\"realSet\":\"1\"}&s="+DateUtil.getDate(new Date(),"yyyy-MM-ddHH:mm:ss");
    }
    }else
    {
    url=path+"?data={\"queryType\":\"byUser\",\"username\":\""+username+"\",\"schoolId\":\""+schoolId+"\",\"realSet\":\"1\"}&s="+DateUtil.getDate(new Date(),"yyyy-MM-ddHH:mm:ss");
    }
    //this.LOG.info(url);
    if(StringUtils.isNotBlank(ParamValueCache.getTempKey("pls.rms.source.outtime")))
    {
    ti=Integer.parseInt(ParamValueCache.getTempKey("pls.rms.source.outtime"));
    }
    HttpServletRequest request = ServletActionContext.request;

    UserCenterVersion uv=new UserCenterVersion();
    uv.getUserCenterVersion(url, ti, kslist);
    uv.getUserCenterVersionToKscodeByStages(kslist, studyStages);
    HttpServletResponse response = ServletActionContext.getResponse();
    PrintWriter out = null;
    response.setContentType("text/html;charset=gbk");
    VersionList versionList=uv.versionList;
    List<Map> list=new ArrayList<Map>();
    String json="";
    if(versionList!=null &&versionList.getRtnArray()!=null)
    {
    Version v=null;
    for (int i = 0; i < versionList.getRtnArray().length; i++)
    {
    v=versionList.getRtnArray()[i];
    if(StringUtils.isNotBlank(v.getKsid()))
    {
    Map<String, String> map = new HashMap<String, String>();
    map.put("stageCode",v.getStudyStageCode());
    map.put("stageName",v.getStudyStage());
    map.put("gradeId",v.getGradeCode());
    map.put("gradeName",v.getGrade());
    map.put("termCode",v.getTermCode());
    map.put("termName",v.getTerm());
    map.put("subjectCode",v.getSubjectCode());
    map.put("subjectName",v.getSubject());
    map.put("ksId",v.getKsid());
    map.put("ksTrueName",v.getKsTrueName());
    map.put("ksName",v.getKsName());
    map.put("bookId", v.getBookId());
    list.add(map);
    }else{
    System.out.println("�Ҳ�����ӦĿ¼�İ汾��"+v.getStudyStageCode()+" "+ v.getGradeCode()+" "+ v.getTermCode()+" "+v.getSubjectCode()+" "+ v.getVersionCode());
    }
    }
    }
    if(jsoncallback!=null && jsoncallback.trim().length()>0){json=jsoncallback+'('+JSONArray.fromObject(list).toString()+')';}
    try {out = new PrintWriter(response.getOutputStream());}catch(IOException e) {e.printStackTrace();}
    if (out != null) {
    out.print(json);
    out.flush();
    out.close();
    }
    return null;
    }
     */

    /**
     * ���reponse
     *
     * @return
     */
    private HttpServletResponse getXmlResponse(HttpServletResponse response) {
        response.setContentType("application/xml;");
        response.setHeader("progma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);

        response.setCharacterEncoding(Config.ENCODING);
        //log.info("the response is :" + response);
        return response;
    }

    /**
     * ������ҵ�鿴ҳ��
     *
     * @return
     */
    public String shouzuoye() {
        System.out.println("������ҵҳ��!");
        return "success";
    }

    //�û����İ汾����
	/*
	public String setKsid(){
		int ti=5000;
		String url="";
		String type=ParamValueCache.getTempKey("pls.showke.type");		
		String path=Config.getIpUrlByICode("TMS.601","TMS");
		log.info("��ȡ�Ľӿڵ�ַpath:"+path);
		if(StringUtils.isNotBlank(type))
		{
			if(type.equals("1"))
			{
				url=path+"?data={\"queryType\":\"userVersionProgressSetLast\",\"username\":\""+plsUserLoginLog.getAccount()+"\"}&s="+DateUtil.getDate(new Date(),"yyyy-MM-ddHH:mm:ss");
			  
			}else{
				url=ParamValueCache.getTempKey("pls.school.version.url")+"?data={\"queryType\":\"userVersionProgressSetLast\",\"username\":\""+plsUserLoginLog.getAccount()+"\"}&s="+DateUtil.getDate(new Date(),"yyyy-MM-ddHH:mm:ss");			
			}
		}else
		{
			url=path+"?data={\"queryType\":\"userVersionProgressSetLast\",\"username\":\""+plsUserLoginLog.getAccount()+"\"}&s="+DateUtil.getDate(new Date(),"yyyy-MM-ddHH:mm:ss");
		}
		//this.LOG.info(url);
		if(StringUtils.isNotBlank(ParamValueCache.getTempKey("pls.rms.source.outtime")))
		{
			ti=Integer.parseInt(ParamValueCache.getTempKey("pls.rms.source.outtime"));
		} 
		String version = HttpClient.readURL(url, ti, null, "", "command","service", "");
		JSONObject js = JSONObject.fromObject(version);
		Version v=(Version)js.toBean(js.getJSONObject("book"),Version.class);
		UserCenterVersion uv=new UserCenterVersion();
		String ksid=(String)uv.getKsIdbyUserCenterVersion(v);
		return ksid;
	}
	*/

    public String getLoginStyle(HttpServletRequest request) {
        String loginStyle = "";//���õ�¼��ʽ
        loginStyle = getCookie(request, "sso_login_flag");
        if (!loginStyle.equals("1")) loginStyle = "0";
        return loginStyle;
    }

    private String getCookie(HttpServletRequest request, String name) {
        String rval = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0) {
            for (int i = 0; i < cookies.length; i++) {
                Cookie c = cookies[i];
                if (c.getName().equals(name)) {
                    rval = c.getValue();
                }
            }
        }
        return rval;
    }
}
