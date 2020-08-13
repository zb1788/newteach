package vcom.sso.vo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;

import vcom.sso.vo.ou.VUser;


public class AuthResult implements Serializable {
    private String authFlg; //1 �ɹ� 0 ����ƾ֤ʧЧ 2 û�и�ϵͳȨ��

    private String authInfo; //��֤�����Ϣ

    private String appFlg;

    private VSysUser user;

    private VUser ouUser;//���Ŵ�ѧ�û�

    private String ut;

    private UserAuthority[] userAuthoritys;
    //��ʱtoken
    private String tmpToken;
    //�Ƿ���Ҫ�û�ͬ�������Ϣ��Ȩ 0 ����Ҫ 1 ��Ҫ
    private String infoAllowUseNeed;
    //�û�ͬ�������Ϣ��Ȩ ��ʾ��Ϣ
    private String infoAllowUseNeedTip;

    public String getAuthFlg() {
        return authFlg;
    }

    public void setAuthFlg(String authFlg) {
        this.authFlg = authFlg;
    }

    public String getAuthInfo() {
        return authInfo;
    }

    public void setAuthInfo(String authInfo) {
        this.authInfo = authInfo;
    }

    public String getAppFlg() {
        return appFlg;
    }

    public void setAppFlg(String appFlg) {
        this.appFlg = appFlg;
    }

    public VSysUser getUser() {
        return user;
    }

    public void setUser(VSysUser user) {
        this.user = user;
    }

    public UserAuthority[] getUserAuthoritys() {
        return userAuthoritys;
    }

    public void setUserAuthoritys(UserAuthority[] userAuthoritys) {
        this.userAuthoritys = userAuthoritys;
    }

    public VUser getOuUser() {
        return ouUser;
    }

    public void setOuUser(VUser ouUser) {
        this.ouUser = ouUser;
    }

    public String getUt() {
        return ut;
    }

    public void setUt(String ut) {
        this.ut = ut;
    }

    public String getTmpToken() {
        return tmpToken;
    }

    public void setTmpToken(String tmpToken) {
        this.tmpToken = tmpToken;
    }

    public String getInfoAllowUseNeed() {
        return infoAllowUseNeed;
    }

    public void setInfoAllowUseNeed(String infoAllowUseNeed) {
        this.infoAllowUseNeed = infoAllowUseNeed;
    }

    public String getInfoAllowUseNeedTip() {
        return infoAllowUseNeedTip;
    }

    public void setInfoAllowUseNeedTip(String infoAllowUseNeedTip) {
        this.infoAllowUseNeedTip = infoAllowUseNeedTip;
    }

}
