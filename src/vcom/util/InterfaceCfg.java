package vcom.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

public class InterfaceCfg {
    private static Logger log = Logger.getLogger(InterfaceCfg.class);
    private final static String yjtIntegerface = "yjt_interface.properties";
    private final static String yjtConfig = "/etc/vcom/yjtconfig.properties";
    //private final static String yjtConfig = "D://yjtconfig.properties";
    /**
     * ��ʾӦ�õ�ǰ׺
     */
    private final static String appNamePre = "ResAppName2014__";
    /**
     * ��ʾ�˿ڵ�ǰ׺
     */
    private final static String portPre = "ResPort2014__";
    //ԭʼyjtconfig����
    public final static Map<String, String> ipMap = new ConcurrentHashMap<String, String>();

    public final static Map<String, String> codeMap = new ConcurrentHashMap<String, String>();

    public final static Map<String, String> ipPathMap = new ConcurrentHashMap<String, String>();
    /**
     * �˿�map
     */
    public final static Map<String, String> portMap = new ConcurrentHashMap<String, String>();
    /**
     * Ӧ��app
     */
    public final static Map<String, String> appMap = new ConcurrentHashMap<String, String>();
    /**
     * ����ʵ��Map
     */
    public static Map<String, String> noteBookMap = new ConcurrentHashMap<String, String>();
    /**
     * Ӣ��ͬ����ϰmap
     */
    public final static Map<String, String> esLearnMap = new ConcurrentHashMap<String, String>();
    /**
     * ��Դ����map
     */
    public final static Map<String, String> cmsInterfaceMap = new ConcurrentHashMap<String, String>();
    /**
     * ����http����https�������á� ��ʹ�øþ�̬��������Ҫֱ�ӵ��� getSysCodeScheme(String sysCode)
     */
    private final static Map<String, String> schemeMap = new ConcurrentHashMap<String, String>();

    public static String getIp(String code) {
        return ipMap.get(code);
    }

    public static String getPath(String icode) {
        return codeMap.get(icode);
    }

    public static String getGatherDomainAppUrl(String code) {
        String prefix = getHttpPort(code, code);
        if (StringUtils.isBlank(prefix)) return null;
        return prefix + getHttpAppname(code);
    }

    /**
     * ����ǿ��ʹ��http
     *
     * @param code
     * @return
     */
    public static String getGatherDomainAppUrlInHttp(String code) {
        String preUrl = getGatherDomainAppUrl(code);
        String startFlag = "https://";
        if (StringUtils.isNotBlank(preUrl) && preUrl.startsWith(startFlag)) {
            int len = startFlag.length();
            preUrl = "http://" + preUrl.substring(len);
        }
        return preUrl;
    }

    /**
     * ��ȡip��url
     *
     * @param code ����ϵͳ�����ȡ
     * @return ip+port+appname��
     */
    public static String getGatherIpAppUrl(String code) {
        String sysCode = code + "_IP";
        String prefix = getHttpPort(sysCode, code);
        if (StringUtils.isBlank(prefix)) return null;
        return prefix + getHttpAppname(code);
    }

    public static String getHttpIpPort(String code) {
        String sysCode = code + "_IP";
        return getHttpPort(sysCode, code);
    }

    public static String getHttpPort(String sysCode, String code) {
        String ip = ipMap.get(sysCode);
        if (StringUtils.isBlank(ip))
            return null;
        String port = portMap.get(portPre + code);
        if (StringUtils.isBlank(port)) {
            return getSysCodeScheme(sysCode) + "://" + ip;
        }

        return getSysCodeScheme(sysCode) + "://" + ip + ":" + port;
    }

    public static String getHttpAppname(String sysCode) {

        String appName = appMap.get(appNamePre + sysCode);
        if (StringUtils.isBlank(appName)) {
            appName = "/";
        }

        if (!appName.startsWith("/")) {
            appName = "/" + appName;
        }
        if (!appName.endsWith("/")) {
            appName = appName + "/";
        }
        return appName;
    }

    /**
     * ���ݽӿڱ��롢ϵͳ���룬��ȡip��url
     *
     * @param icode
     * @param code
     * @return ip+port+appname+path
     */
    public static String getIpUrlByICode(String icode, String code) {
        String sysCode = code + "_IP";
        String ip = ipMap.get(sysCode);
        if (StringUtils.isBlank(ip))
            return null;
        String domain = ipMap.get(code);
        if (StringUtils.isBlank(domain)) {
            return null;
        }
        String domainUrl = ipPathMap.get(icode);
        if (StringUtils.isNotBlank(domainUrl)) {
            String tmpUrl = domainUrl.replace(domain, ip);
            int index = tmpUrl.indexOf(":");
            if (index > 0) {
                String nextUrl = tmpUrl.substring(index);
                return getSysCodeScheme(sysCode) + nextUrl;
            }
        }
        //int index=domainUrl.indexOf("");
	  /* String httpPrefix="http://";
	   String path=null;
	   if(domainUrl.startsWith(httpPrefix))
	   {
		  int length=httpPrefix.length();
		  int beginIndex=length-1;
		  domainUrl=domainUrl.substring(beginIndex);
		  int colonIndex=domainUrl.indexOf(":");
		  if(colonIndex>0)
		  {
			  path=domainUrl.substring(colonIndex);
		  }
		  if(StringUtils.isNotBlank(path))
		  {
			  return httpPrefix+ip+path;
		  }
	   }*/
        return null;
    }

    public static String getSipUrlByICode(String icode, String code) {
        String sysCode = code + "_SIP";
        String ip = ipMap.get(sysCode);
        if (StringUtils.isBlank(ip))
            return null;
        String domain = ipMap.get(code);
        if (StringUtils.isBlank(domain)) {
            return null;
        }
        String domainUrl = ipPathMap.get(icode);
        if (StringUtils.isNotBlank(domainUrl)) {
            String tmpUrl = domainUrl.replace(domain, ip);
            int index = tmpUrl.indexOf(":");
            if (index > 0) {
                String nextUrl = tmpUrl.substring(index);
                return getSysCodeScheme(sysCode) + nextUrl;

            }

        }

        return null;
    }

    public static String getSipIp(String code) {
        String sysCode = code + "_SIP";
        String prefix = getHttpPort(sysCode, code);
        if (StringUtils.isBlank(prefix)) return null;
        return prefix + getHttpAppname(code);
    }

    /**
     * ���ݽӿڱ��롢ϵͳ���룬��ȡurl
     *
     * @param icode
     * @param code
     * @return ����+port+appname+path
     */
    public static String getUrlByICode(String icode, String code) {
		/*String ip=ipMap.get(code);
		if(StringUtils.isBlank(ip))
			return null;
		String domain=ipMap.get(code);
		if(StringUtils.isBlank(domain))
		{
			return null;
		}*/
        String domainUrl = ipPathMap.get(icode);
	  /* if(StringUtils.isNotBlank(domainUrl))
	   {
		  return domainUrl.replace(domain, ip);
	   }*/
        return domainUrl;
    }


    public static String getSysCodeScheme(String sysCode) {
        String str = "http";
        //String schemeEnable=schemeMap.get("SCHEME_ENABLE");
        //if(schemeEnable!=null&&schemeEnable.equals("1"))
        String localProtocol = ipMap.get("LOCAL_PROTOCOL");
        if (localProtocol != null && localProtocol.equals("https")) {

            String tmpScheme = schemeMap.get(sysCode);
            if (StringUtils.isNotBlank(tmpScheme)) {
                str = tmpScheme;
            }
        }
        return str;
    }

    public static String getSysCodeSchemePort(String sysCode) {
        String str = "";
        //String schemeEnable=schemeMap.get("SCHEME_ENABLE");

        //if(schemeEnable!=null&&schemeEnable.equals("1"))
        String localProtocol = ipMap.get("LOCAL_PROTOCOL");
        if (localProtocol != null && localProtocol.equals("https")) {
            String tmpScheme = schemeMap.get(sysCode);
            if (StringUtils.isNotBlank(tmpScheme)) {
                str = tmpScheme;
            }
        }


        return str;
    }

    static {
        File f = new File(yjtConfig);
        log.info("[InterfaceCfg] InterfaceCfg init start !!!  [InterfaceCfg]\r\n" + f.getAbsoluteFile());

        Map<String, String> item = new ConcurrentHashMap<String, String>();
        openFile(yjtConfig, ipMap);
        String interFacePath = null;
        try {
            interFacePath = InterfaceCfg.class.getClassLoader().getResource(
                    yjtIntegerface).toURI().getPath();
        } catch (URISyntaxException e) {

            e.printStackTrace();
        }
        log.debug("interFacePath=" + interFacePath);
        openFile(interFacePath, item);

        String schemePath = null;
        try {
            schemePath = InterfaceCfg.class.getClassLoader().getResource("scheme.properties").toURI().getPath();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        openFile(schemePath, schemeMap);
        if (ipMap.size() > 0 && item.size() > 0) {
            Set<String> pathKeys = item.keySet();
            String splitChart = "||";
            for (String pathKey : pathKeys) {

                int index = pathKey.indexOf(splitChart);
                if (index >= 0) {//ֻ����ӿڵ�

                    String sysCode = pathKey.substring(0, index);
                    String iCode = pathKey.substring(index + splitChart.length());
                    String path = item.get(pathKey);

                    String ip = ipMap.get(sysCode);
                    if (ip == null) {
                        continue;
                    }
                    String appName = item.get(appNamePre + sysCode);
                    if (StringUtils.isBlank(appName)) {
                        appName = "";
                    }

                    String port = item.get(portPre + sysCode);
                    if (StringUtils.isBlank(port)) {
                        port = "";
                    }
                    String nextPath = "";
                    if (path.indexOf(":") == 0) {
                        port = "";
                        nextPath = path;//·���ϴ��ڶ˿�Ӧ������
                    } else {
                        nextPath = "/" + appName + "/" + path;
                    }


                    //log.debug("nextPath="+nextPath);
                    nextPath = nextPath.replace("//", "/");
                    nextPath = nextPath.replace("//", "/");
                    //log.debug(nextPath);
                    codeMap.put(iCode, port + nextPath);
                    String standardUrl;
                    String tmpScheme = getSysCodeScheme(sysCode);
                    if (StringUtils.isBlank(port)) {
                        standardUrl = tmpScheme + "://" + ip + nextPath;
                    } else {
                        standardUrl = tmpScheme + "://" + ip + ":" + port + nextPath;
                    }

                    //log.debug("iCode="+iCode);
                    ipPathMap.put(iCode, standardUrl);
                } else {
                    if (pathKey.startsWith(portPre)) {
                        String port = item.get(pathKey);
                        if (StringUtils.isNotBlank(port)) ;
                        portMap.put(pathKey, port);
                    } else if (pathKey.startsWith(appNamePre)) {
                        String appName = item.get(pathKey);
                        if (StringUtils.isNotBlank(appName)) {
                            appMap.put(pathKey, appName);
                        }
                    }

                }
            }
        }

        makeEsLearnMap(esLearnMap);
        //getCmsInterfaceMap(cmsInterfaceMap);
    }

    private static void openFile(String filePath, Map<String, String> tmpMap) {
        FileInputStream yjtConfigInput = null;
        try {
            yjtConfigInput = new FileInputStream(filePath);
            writerMap(yjtConfigInput, tmpMap);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (yjtConfigInput != null)
                try {
                    yjtConfigInput.close();
                } catch (IOException e) {

                    e.printStackTrace();
                }
        }
    }

    public static String getSysPath(String code) {
        Map<String, String> map1 = InterfaceCfg.ipMap;
        String path1 = getSysCodeScheme(code) + "://" + map1.get(code);
        ;
        return path1;
    }

    private static void writerMap(FileInputStream yjtConfigInput,
                                  Map<String, String> tmpMap) throws IOException {
        Properties props = new Properties();
        props.load(yjtConfigInput);
        Set<Object> keys = props.keySet();
        for (Object key : keys) {
            String keyStr = key.toString();
            String value = props.getProperty(keyStr);
            //����CMS||��ͷ��ȥ��:\:8080/cms/interface.jsp?readfile\=
            if (keyStr.startsWith("CMS||")) {
                value = value.replaceFirst(":8080/cms/interface.jsp\\?readfile=", "");
                log.debug(keyStr + "=" + value);
            }
            if (value != null) {
                value = value.trim();
            } else {
                value = "";
            }
            tmpMap.put(keyStr, value);
        }
    }


    private static void makeEsLearnMap(Map<String, String> map) {
        Vcom_3DES des = new Vcom_3DES("vcommenhutuwenandotheros");
        des.setIsEncrypt(1);

        des.setMessage(ipMap.get("SSO_IP"));
        String desSsoIP = des.Vcom3DESChiper();

        des.setMessage(ipMap.get("SSO"));
        String desSsoDomain = des.Vcom3DESChiper();
        String desSsoPublicIp = "";

        String ssoPublicIp = ipMap.get("SSO_IP_P");
        if (StringUtils.isNotBlank(ssoPublicIp)) {
            des.setMessage(ssoPublicIp);
            desSsoPublicIp = des.Vcom3DESChiper();
        }
        map.put("desSsoIP", desSsoIP);
        map.put("desSsoDomain", desSsoDomain);
        map.put("desSsoPublicIp", desSsoPublicIp);
    }
}
