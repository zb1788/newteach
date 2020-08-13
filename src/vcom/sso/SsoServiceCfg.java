package vcom.sso;

public class SsoServiceCfg {
    public static final String APP_SERVER_NAME = "appServerName";
    public static final String APP_SERVER_PORT = "appServerPort";
    public static final String APP_CONTEXT_PATH = "appContextPath";

    public static final String APP_FLG = "appFlg";


    public static final String SSO_SERVICE_CFG = "ssoServiceCfg";


    public static final String DEPLOY_WAY = "deployWay";
    public static final String SINGLE_HOST = "single_host";
    public static final String MULTI_HOST = "multi_host";


    private String deployWay;//����ʽ��single_host�������� or multi_host���ֲ�����


    /*****�����¼��������****/
    private String scheme;//����Э��
    private String serverName;//�����¼������������
    private String vpnServerName;//�����¼��������VPN IP
    private String serverPort;//�����¼����˿ں�
    private String contextPath;//�����¼������·��

    private String ssoBasePath;

    private String ssoVpnBasePath;
    /*****�����¼��������****/


    /*****ҵ��ϵͳ����*****/
    private String appFlg;//ҵ���ʶ��ÿ��ҵ��ϵͳ�ƶ�Ψһ��ʶ

    /*****ҵ��ϵͳ����*****/


    public String getAppFlg() {
        return appFlg;
    }

    public void setAppFlg(String appFlg) {
        this.appFlg = appFlg;
    }

    public String getScheme() {
        return scheme;
    }

    public void setScheme(String scheme) {
        this.scheme = scheme;
    }

    public String getServerName() {
        return serverName;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    public String getServerPort() {
        return serverPort;
    }

    public void setServerPort(String serverPort) {
        this.serverPort = serverPort;
    }

    public String getContextPath() {
        return contextPath;
    }

    public void setContextPath(String contextPath) {
        this.contextPath = contextPath;
    }

    public String getDeployWay() {
        return deployWay;
    }

    public void setDeployWay(String deployWay) {
        this.deployWay = deployWay;
    }

    public String getVpnServerName() {
        return vpnServerName;
    }

    public void setVpnServerName(String vpnServerName) {
        this.vpnServerName = vpnServerName;
    }

    public String getSsoBasePath() {
        ssoBasePath = scheme + "://" + serverName + ":" + serverPort + "/" + contextPath + "/";
        return ssoBasePath;
    }

    public String getSsoVpnBasePath() {
        if (vpnServerName == null || vpnServerName.trim().equals("")) {
            return null;
        }
        ssoVpnBasePath = scheme + "://" + vpnServerName + ":" + serverPort + "/" + contextPath + "/";
        return ssoVpnBasePath;
    }

}
