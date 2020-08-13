package vcom.sso.util;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import vcom.sso.pdgrant.ProductGrantUtil;
import vcom.sso.vo.AuthResult;

public class Sso2AppUtil {
    public static void cpSessionVo(HttpServletRequest request, HttpServletResponse response, AuthResult authResult) {
        javax.servlet.http.HttpSession session = request.getSession(true);
        /****************************ҵ��ϵͳ����  ����ҵ��ϵͳ������û���Ϣ��Ȩ��**********************************/
        ProductGrantUtil pdGrantUtil = new ProductGrantUtil();
        pdGrantUtil.getProductGrant(request);


        /****************************ҵ��ϵͳ����  ����ҵ��ϵͳ������û���Ϣ��Ȩ��**********************************/
    }
}
