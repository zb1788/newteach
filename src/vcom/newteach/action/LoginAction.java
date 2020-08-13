package vcom.newteach.action;

import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import vcom.newteach.dao.UserLoginDao;
import vcom.newteach.pojo.PlsUserLoginLog;
import vcom.newteach.service.ParamValueCache;
import vcom.sso.vo.AuthResult;
import vcom.util.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LoginAction {
    private static Logger log = Logger.getLogger(LoginAction.class);

    public String readyforlogin(String method, HttpServletRequest request, HttpServletResponse response) throws Exception {

        String pwd = request.getParameter("pwd");
        String userid = request.getParameter("userid");
        String mac = request.getParameter("mac");

        MD5 md5 = new MD5();
        Vcom_3DES des = new Vcom_3DES(ParamValueCache.getTempKey("sso.des3"));

        response.setContentType("application/xml;");
        request.getSession().removeAttribute("schoolVersion");//ѧУ�汾
        request.getSession().removeAttribute("ksUserList");//��ǰ�û��İ汾
        request.getSession().removeAttribute("loginStyle");//��ǰ�û��ĵ�½��ʽ
        des.setIsEncrypt(1);
        des.setMessage(userid);
        String user3DES = des.Vcom3DESChiper();
        if (pwd != null) {
            pwd = pwd.trim();
        }
        String pwdMD5 = md5.getMD5ofStr(pwd);
        int ti = 5000;
        if (StringUtils.isNotBlank(ParamValueCache.getTempKey("pls.rms.source.outtime"))) {
            ti = Integer.parseInt(ParamValueCache.getTempKey("pls.rms.source.outtime"));
        }
        String url = Config.getSysPath("SSO_IP");
        url += "/sso/verifyAuthInfo?appFlg=PLS&pwd=" + pwdMD5 + "&username=" + user3DES + "&loginUsertype=teacher&mac=" + mac;
        String xml = HttpClient.readURL(url, ti, null, "", "command", "service", "");
        log.info("xml=" + xml);

        try {
            if (StringUtils.isNotBlank(xml)) {
                JSONObject js = JSONObject.fromObject(xml);
                AuthResult authResult = (AuthResult) js.toBean(js, AuthResult.class);
                if (authResult != null)
                    request.getSession().setAttribute("authResult", authResult);
            }
        } catch (Exception e) {
        }
        return null;
    }

    public String loginBySSO(String method, HttpServletRequest request, HttpServletResponse response) throws IOException {

        String schoolId = null;
        String mac = request.getParameter("mac");

        request.getSession().removeAttribute("schoolVersion");//ѧУ�汾
        request.getSession().removeAttribute("ksUserList");//��ǰ�û��İ汾
        String xml = null;

        try {
            AuthResult authResult = (AuthResult) request.getSession().getAttribute("authResult");
            if (authResult != null && "1".equals(authResult.getAuthFlg()))//��֤�ɹ�
            {
                if (authResult.getUser() != null) {
                    vcom.sso.vo.VSysUser user = authResult.getUser();//�û�����
                    if (user.getSchool() != null) {
                        schoolId = user.getSchool().getSchoolId();
                    }
                    //��֤�Ƿ��ʦ�û���ֻ�н� ʦ�û����Ե�½
                    if (StringUtils.isNotBlank(user.getUsertype()) && (user.getUsertype().equals("2") || user.getUsertype().equals("3"))) {   //�ǽ�ʦ�û��������ʦ������Ϣ

                        PlsUserLoginLog loglog = new PlsUserLoginLog();
                        PlsUserLoginLog plsUserLoginLog = new PlsUserLoginLog();
                        loglog.setMac(mac);
                        try {
                            List list = new UserLoginDao().queryLoginLog(plsUserLoginLog);
                            if (list.size() > 0) {
                                plsUserLoginLog = (PlsUserLoginLog) list.get(0);
                                //request����ֵ
                                request.setAttribute("className", plsUserLoginLog.getC6());
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }

                        RequestUtil.setCookie(response, "loginStyle", "1", "/");
                    }
                }
            }
            Cookie sso_login_flagCk = new Cookie("sso_login_flag", "1");
            sso_login_flagCk.setPath("/");
            sso_login_flagCk.setMaxAge(-1);
            response.addCookie(sso_login_flagCk);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "success";
    }

    /**
     * ��ȡsso������֤��ַ
     *
     * @return
     */
    public String getSsoUrl(String method, HttpServletRequest request, HttpServletResponse response) {

        String jsoncallback = request.getParameter("jsoncallback");

        String ssoUrl = Config.getSysPath("SSO");
        response.setContentType("text/html;charset=utf-8");


        Map<String, String> data = new HashMap<String, String>();
        data.put("ssoUrl", ssoUrl);
        JSONObject jo = JSONObject.fromObject(data);
        String json = "";
        if (jsoncallback != null && jsoncallback.trim().length() > 0) {
            json = jsoncallback + '(' + jo.toString() + ')';
        } else {
            json = jo.toString();
        }

        PrintWriter out = null;
        try {
            out = new PrintWriter(response.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (out != null) {
            out.print(json);
            out.flush();
            out.close();
        }
        return null;
    }

    /**
     * userid����
     *
     * @return
     */
    public String getUsername(String method, HttpServletRequest request, HttpServletResponse response) {

        String userid = request.getParameter("userid");
        String jsoncallback = request.getParameter("jsoncallback");

        response.setContentType("text/html;charset=utf-8");
        //response.setHeader("Access-Control-Allow-Origin", "*");


        PrintWriter out = null;

        String format = request.getParameter("format");
        if (format != null) {
            response.setContentType("application/xml;");
            String xml = "<?xml version=\"1.0\" encoding=\"GBK\"?>"
                    + "<auth>1</auth>";
            try {
                out = new PrintWriter(response.getOutputStream());
            } catch (IOException e) {
                e.printStackTrace();
            }

            if (out != null) {
                out.print(xml);
                out.flush();
                out.close();
            }
            return null;
        }

//        response.setContentType("application/json;charset=utf-8");
//        PrintWriter out = null;
//
//        String format=request.getParameter("format");
//       if(format!=null)
//       {
//           response.setContentType("application/json;");
//           String json = "{\"auth\":1}";
//           try {
//               out = new PrintWriter(response.getOutputStream());
//           } catch (IOException e) {
//               e.printStackTrace();
//           }
//
//           if (out != null) {
//               out.print(json);
//               out.flush();
//               out.close();
//           }
//           return null;
//       }

        String user3DES = null;
        try {
            Vcom_3DES des = new Vcom_3DES(ParamValueCache.getTempKey("sso.des3"));
            des.setIsEncrypt(1);
            des.setMessage(userid);
            user3DES = des.Vcom3DESChiper();
        } catch (Exception e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }

        Map<String, String> data = new HashMap<String, String>();
        data.put("username", user3DES);
        JSONObject jo = JSONObject.fromObject(data);
        String json = "";
        if (jsoncallback != null && jsoncallback.trim().length() > 0) {
            json = jsoncallback + '(' + jo.toString() + ')';
        } else {
            json = jo.toString();
        }

        try {
            out = new PrintWriter(response.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (out != null) {
            out.print(json);
            out.flush();
            out.close();
        }
        return null;

    }

    /*
     * ��ʦ��ϢУ��ӿ�
     *
     */
    public String execute(String method, HttpServletRequest request, HttpServletResponse response) throws Exception {

        String userid = request.getParameter("userid");
        String pwd = request.getParameter("pwd");
        String mac = request.getParameter("mac");
        String schoolId = null;

        MD5 md5 = new MD5();
        Vcom_3DES des = new Vcom_3DES(ParamValueCache.getTempKey("sso.des3"));

        response.setContentType("application/xml;");
        request.getSession().removeAttribute("schoolVersion");//ѧУ�汾
        request.getSession().removeAttribute("ksUserList");//��ǰ�û��İ汾
        request.getSession().removeAttribute("loginStyle");//��ǰ�û��ĵ�½��ʽ
        des.setIsEncrypt(1);
        des.setMessage(userid);
        String user3DES = des.Vcom3DESChiper();
        if (pwd != null) {
            pwd = pwd.trim();
        }

        String pwdMD5 = md5.getMD5ofStr(pwd);
        int ti = 5000;
        if (StringUtils.isNotBlank(ParamValueCache.getTempKey("pls.rms.source.outtime"))) {
            ti = Integer.parseInt(ParamValueCache.getTempKey("pls.rms.source.outtime"));
        }
        String url = Config.getIpProtocol() + Config.getSysPath("SSO_IP");
        url += "/sso/verifyAuthInfo?appFlg=PLS&pwd=" + pwdMD5 + "&username=" + user3DES + "&loginUsertype=teacher&mac=" + mac;
        ;
        String xml = HttpClient.readURL(url, ti, null, "", "command", "service", "");
        log.info("xml=" + xml);
        System.out.println("xml=" + xml);

        try {
            if (StringUtils.isNotBlank(xml)) {
                JSONObject js = JSONObject.fromObject(xml);
                AuthResult authResult = (AuthResult) js.toBean(js, AuthResult.class);
                System.out.println("ut=" + authResult.getUt());
                log.info(" authFlg:" + authResult.getAuthFlg() + " authInfo:" + authResult.getAuthInfo());
                if (!"0".equals(authResult.getAuthFlg()))//��֤ʧ��
                {
                    if (authResult.getAuthInfo() != null && authResult.getAuthInfo().trim().length() > 0) {
                        xml = "<?xml version=\"1.0\" encoding=\"GBK\"?>"
                                + "<auth>"
                                + "<auth-flag>1</auth-flag>"
                                + "<auth-info>" + authResult.getAuthInfo() + "</auth-info>" + "<auth-user>"
                                + "<username></username>" + "<realname></realname>"
                                + "<areaid></areaid>" + "<areaname></areaname>"
                                + "<business-id></business-id>"
                                + "<business-name></business-name>"
                                + "<user-type></user-type>"
                                + "<user-type-name></user-type-name>"
                                + "<user-set>0</user-set>" + "</auth-user>" + "</auth>";
                    } else {
                        if (StringUtils.isNotBlank(authResult.getUser().getUsername())) {
                            userid = authResult.getUser().getUsername();
                        }
                        xml = "<?xml version=\"1.0\" encoding=\"GBK\"?>" + "<auth>"
                                + "<auth-flag>" + authResult.getAuthFlg() + "</auth-flag>"
                                + "<auth-info>" + authResult.getAuthInfo() + "</auth-info>"
                                + "<auth-user>"
                                + "<username>" + "</username>"
                                + "<realname>" + "</realname>"
                                + "<areaid>" + "</areaid>"
                                + "<schoolId>" + "</schoolId>"
                                + "<areaname>" + "</areaname>"
                                + "<business-id>" + "</business-id>"
                                + "<business-name>" + "</business-name>"
                                + "<user-type>" + "</user-type>"
                                + "<user-type-name>" + "</user-type-name>"
                                + "<pls-css-name>" + "</pls-css-name>"
                                + "<pls-templateid>" + "</pls-templateid>"
                                + "<user-set>" + "</user-set>"
                                + "</auth-user>" + "</auth>";
                    }
                } else {
                    request.getSession().setAttribute("authResult", authResult);
                    if (authResult != null && authResult.getUser() != null) {
                        vcom.sso.vo.VSysUser user = authResult.getUser();
                        if (user.getSchool() != null) {
                            schoolId = user.getSchool().getSchoolId();
                        }
                        //��֤�Ƿ��ʦ�û���ֻ�н� ʦ�û����Ե�½
                        if (StringUtils.isNotBlank(user.getUsertype()) && (user.getUsertype().equals("2") || user.getUsertype().equals("3"))) {


                            String templateid = ParamValueCache.getTempKey("pls.template.defaultId");
                            //��¼��ӦMac�û���¼��Ϣ�����û����ٵ�¼ʹ�á�
                            xml = "<?xml version=\"1.0\" encoding=\"GBK\"?>" + "<auth>"
                                    + "<auth-flag>" + authResult.getAuthFlg() + "</auth-flag>"
                                    + "<auth-info>" + authResult.getAuthInfo() + "</auth-info>"
                                    + "<auth-user>"
                                    + "<username>" + user.getUsername() + "</username>"
                                    + "<realname>" + user.getTruename() + "</realname>"
                                    + "<areaid>" + user.getArea().getAreaId() + "</areaid>"
                                    + "<schoolId>" + schoolId + "</schoolId>"
                                    + "<areaname>" + user.getArea().getAreaname() + "</areaname>"
                                    + "<business-id>" + 26 + "</business-id>"
                                    + "<business-name>" + 26 + "</business-name>"
                                    + "<user-type>" + user.getUsertype() + "</user-type>"
                                    + "<user-type-name>" + getUserType(user) + "</user-type-name>"
                                    + "<pls-css-name>" + ParamValueCache.getTempKey("pls.css.name") + "</pls-css-name>"
                                    + "<pls-templateid>" + templateid + "</pls-templateid>"
                                    + "<user-set>" + "</user-set>"
                                    + "</auth-user>"
                                    + "</auth>";
                        } else {
                            xml = "<?xml version=\"1.0\" encoding=\"GBK\"?>"
                                    + "<auth>"
                                    + "<auth-flag>1</auth-flag>"
                                    + "<auth-info>�ǽ�ʦ�û������Ե�½!" + "</auth-info>" + "<auth-user>"
                                    + "<username></username>" + "<realname></realname>"
                                    + "<areaid></areaid>" + "<areaname></areaname>"
                                    + "<business-id></business-id>"
                                    + "<business-name></business-name>"
                                    + "<user-type></user-type>"
                                    + "<user-type-name></user-type-name>"
                                    + "<user-set>0</user-set>" + "</auth-user>" + "</auth>";
                        }
                    }
                }
            }
            Cookie sso_login_flagCk = new Cookie("sso_login_flag", "0");
            sso_login_flagCk.setPath("/");
            response.addCookie(sso_login_flagCk);
        } catch (Exception e) {
            e.printStackTrace();
            xml = "<?xml version=\"1.0\" encoding=\"GBK\"?>"
                    + "<auth>"
                    + "<auth-flag>1</auth-flag>"
                    + "<auth-info>������֤�����������쳣!" + "</auth-info>" + "<auth-user>"
                    + "<username></username>" + "<realname></realname>"
                    + "<areaid></areaid>" + "<areaname></areaname>"
                    + "<business-id></business-id>"
                    + "<business-name></business-name>"
                    + "<user-type></user-type>"
                    + "<user-type-name></user-type-name>"
                    + "<user-set>0</user-set>" + "</auth-user>" + "</auth>";
        }
        PrintWriter out = new PrintWriter(response.getOutputStream());
        out.print(xml);
        out.flush();
        out.close();
        return null;
    }

    private String getUserType(vcom.sso.vo.VSysUser user) {
        String userType = "2";
        if (StringUtils.isNotBlank(user.getUsertype())) {

            if (user.getUsertype().equals("2")) {
                userType = "2";
            } else if (user.getUsertype().equals("3")) {
                userType = "3";
            } else if (user.getUsertype().equals("4")) {
                userType = "4";
            } else {
                userType = "1";
                if (StringUtils.isNotBlank(user.getUsername()) && user.getUsername().equals("admin")) {
                    userType = "-1";
                }
            }
        }
        return userType;
    }
}
