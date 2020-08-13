package vcom.sso.pdgrant;

import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;
import vcom.sso.SsoServiceCfg;
import vcom.sso.util.HttpClientUtil;
import vcom.sso.vo.AuthResult;
import vcom.sso.vo.VSysUser;

public class ProductGrantUtil {

    public static String reqSsoBasePath = null;
    public static String reasonSsoBasePath = null;

    public static String appFlg = null;


    public ProductGrantRtn getProductGrant(HttpServletRequest hrequest) {
        javax.servlet.http.HttpSession session = hrequest.getSession(true);

        ProductGrantRtn productGrantRtn = (ProductGrantRtn) session.getAttribute("productGrantRtn");
        String username = "";
        AuthResult authResult = (AuthResult) session.getAttribute("authResult");
        if (authResult != null) {
            VSysUser vuser = authResult.getUser();
            username = vuser.getUsername();
        }
        if (productGrantRtn == null) {
            productGrantRtn = this.getProductGrantHttp(username, hrequest);
            session.setAttribute("productGrantRtn", productGrantRtn);
        } else {
            if (username != null && !username.equals(productGrantRtn.getUsername())) {
                productGrantRtn = this.getProductGrantHttp(username, hrequest);
                session.setAttribute("productGrantRtn", productGrantRtn);
            }

        }

        return productGrantRtn;
    }

    public ProductGrantRtn getProductGrantHttp(String username, HttpServletRequest hrequest) {
        //�����֤��ַΪ�գ���ʼ����֤��ַ
        if (reqSsoBasePath == null) {
            initPdGrantBasePath(hrequest);
        }

        //��ȡ��Ʒ��Ȩ��Ϣ
        String reqUrl = reqSsoBasePath + "pdGrant?username=" + username + "&appFlg=" + appFlg;
        HttpClientUtil hcu = new HttpClientUtil();
        String rtnJson = null;
        //logger.info("reqUrl��"+reqUrl);

		/*try
		{
			rtnJson=hcu.get(reqUrl);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}*/
        JSONObject js = null;
        try {
            rtnJson = hcu.get(reqUrl);
            js = JSONObject.fromObject(rtnJson);
        } catch (Exception e) {
            e.printStackTrace();

            return null;
        }

        //logger.info("ҵ��ϵͳ�õ�У����Ϣ��"+authResultJson);
        //JSONObject js = JSONObject.fromObject(rtnJson);

        ProductGrantRtn productGrantRtn = (ProductGrantRtn) js.toBean(js, ProductGrantRtn.class);
        String reasonUrl = reasonSsoBasePath + "pdgrant/reason.jsp";
        productGrantRtn.setReasonUrl(reasonUrl);

        return productGrantRtn;
    }


    public ProductGrantRtn getProductGrantCache(String username, HttpServletRequest hrequest) {
        ProductGrantRtn productGrantRtn = null;
        //�ӻ����������ȡ��Ʒ��Ȩ��Ϣ

        return productGrantRtn;
    }

    public void initPdGrantBasePath(HttpServletRequest hrequest) {
        javax.servlet.http.HttpSession session = hrequest.getSession(true);
        ServletContext sc = session.getServletContext();
        SsoServiceCfg ssoServiceCfg = (SsoServiceCfg) sc.getAttribute(SsoServiceCfg.SSO_SERVICE_CFG);

        String deployWay = ssoServiceCfg.getDeployWay();

        //��ʼ����֤����������ַ
        if (deployWay.equals(ssoServiceCfg.SINGLE_HOST)) {
            reqSsoBasePath = ssoServiceCfg.getScheme() + "://127.0.0.1:" + ssoServiceCfg.getServerPort() + "/" + ssoServiceCfg.getContextPath() + "/";
        } else if (deployWay.equals(ssoServiceCfg.MULTI_HOST)) {
            if (ssoServiceCfg.getVpnServerName() != null && !ssoServiceCfg.getVpnServerName().trim().equals("")) {
                reqSsoBasePath = ssoServiceCfg.getScheme() + "://" + ssoServiceCfg.getVpnServerName() + ":" + ssoServiceCfg.getServerPort() + "/" + ssoServiceCfg.getContextPath() + "/";
            } else if (ssoServiceCfg.getServerName() != null && !ssoServiceCfg.getServerName().trim().equals("")) {
                reqSsoBasePath = ssoServiceCfg.getScheme() + "://" + ssoServiceCfg.getServerName() + ":" + ssoServiceCfg.getServerPort() + "/" + ssoServiceCfg.getContextPath() + "/";
            }

        }

        //��ʼ����֤�Ĺ�����ַ
        reasonSsoBasePath = ssoServiceCfg.getScheme() + "://" + ssoServiceCfg.getServerName() + ":" + ssoServiceCfg.getServerPort() + "/" + ssoServiceCfg.getContextPath() + "/";

        //��ʼ��ϵͳ��ʶ
        appFlg = ssoServiceCfg.getAppFlg();
    }

}
