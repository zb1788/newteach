package vcom.util;

import org.apache.log4j.Logger;
import vcom.newteach.service.ParamValueCache;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class Config {

    private static transient Logger log = Logger.getLogger(Config.class);

    public static String ENCODING = "GBK";
    private static String WEB_PROTOCOL = null;
    private static String IP_PROTOCOL = "http://";

    /**
     * ϵͳ����
     */
    //�������������ļ�
    private static Properties DBPropertyTemp = null;
    private static HashMap<String, String> InterfacePropertyTemp = null;
    private static HashMap<String, String> SysPropertyTemp = null;
    private static HashMap<String, String> MessagePropertyTemp = null;

    //���ݿ������ļ�����
    public static final String DBFILE_NAME = "jdbc.properties";
    public static final String INTERFACE_CONFIG_NAME = "yjt_interface.properties";
    public static final String SYS_CONFIG_PATH = "/etc/vcom/yjtconfig.properties";
    public static final String MESSAGE_FILE_NAME = "rebbitmq.properties";

    //��������ӳ��
    private static Map<String, String> playTypeMap = null;

    /**
     * (˽��)��ȡӦ�ø�Ŀ¼�������ļ�(����web���������г������)
     *
     * @param configfilename
     * @return
     */
    private static InputStream getClassConfigFile(String configfilename) {
        log.info(" Load Properties : ( " + configfilename + " ) ");
        return Config.class.getResourceAsStream("/" + configfilename);
    }


    /**
     * ������������
     * pictype;swftype;videotype;flashvideotype;mp3type;txttype;officetype;bttype;ept;mp4;
     *
     * @param code
     * @return
     */
    public static String getPlayType(String typecode) {
        if (playTypeMap == null) {
            playTypeMap = new HashMap<String, String>();
            try {
                playTypeMap.put("pictype", ParamValueCache.getTempKey("pls.play.pic"));
                playTypeMap.put("swftype", ParamValueCache.getTempKey("pls.play.swf"));
                playTypeMap.put("videotype", ParamValueCache.getTempKey("pls.play.video"));
                playTypeMap.put("flashvideotype", ParamValueCache.getTempKey("pls.play.flashvideo"));
                playTypeMap.put("mp3type", ParamValueCache.getTempKey("pls.play.mp3"));
                playTypeMap.put("txttype", ParamValueCache.getTempKey("pls.play.txt"));
                playTypeMap.put("officetype", ",DOC,PPT,XLS,PPS,DOCX,XLSX,PPTX,PDF,");
                playTypeMap.put("bttype", ",WAV,MP3,MIDI,WMA,RA,TAK,RMX,FLAC,VQF,AI,AIFF,AU,CDA,CMF,DSP,S3U,SACD,XLS,");
                playTypeMap.put("ept", ",EPT,");
                playTypeMap.put("mp4", ",MP4,");
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        if (playTypeMap != null) {
            return playTypeMap.get(typecode);
        }
        return null;
    }

    /**
     * �ⲿЭ��
     * @param code
     * @return public static String getWebProtocol(){
    if(WEB_PROTOCOL==null){
    if(getSysProperty()!=null){
    String protocol=getSysProperty().get("LOCAL_PROTOCOL");
    if(!protocol.endsWith("://")){
    WEB_PROTOCOL=protocol+"://";
    }
    }
    }
    return WEB_PROTOCOL;
    }
     */

    /**
     * ����Э��
     *
     * @param code
     * @return
     */
    public static String getIpProtocol() {
        return IP_PROTOCOL;
    }

    /**
     * ϵͳ��ַ
     *
     * @param code
     * @return
     */
    public static String getSysPath(String code) {
		/*
		if(getSysProperty()!=null){
			return getSysProperty().get(code);
		}
		return null;
		*/
        return InterfaceCfg.getSysPath(code);
    }

    /**
     * ���ӿ���Ե�ַ��
     *
     * @param icode
     * @return
     */
    public static String getGatherDomainAppUrl(String icode) {
        return InterfaceCfg.getGatherDomainAppUrl(icode);
    }

    /**
     * ��õ�ǰ���ݿ���������
     *
     * @return
     */
    public static Properties getDBProperty() {
        if (DBPropertyTemp == null) {
            DBPropertyTemp = new Properties();
            InputStream filein;
            try {
                log.debug(" Load DB Info From " + DBFILE_NAME);
                filein = getClassConfigFile(DBFILE_NAME);
                DBPropertyTemp.load(filein);
                try {
                    filein.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
                filein = null;
            } catch (Exception e) {
                //e.printStackTrace();
                log.warn("GET DBTYPE LOAD DB CONFIG FILE ERROR!" + e.getMessage(), e);
            }
        }
        if (DBPropertyTemp != null) {
            String url = DBPropertyTemp.getProperty("url");
            if (url.indexOf("}}") > url.indexOf("{{") && url.indexOf("{{") > -1) {
                String syskey = url.substring(url.indexOf("{{") + 2, url.indexOf("}}"));
                log.debug("DBProperty URL  include {{" + syskey + "}} KEY .");
                if (InterfaceCfg.ipMap.containsKey(syskey)) {
                    url = url.replace("{{" + syskey + "}}", InterfaceCfg.ipMap.get(syskey));
                    log.debug("DBProperty URL  replace {{ORACLE_IP}} TO " + InterfaceCfg.ipMap.get(syskey) + " !!! ");
                    log.debug("DBProperty URL  CHANGE TO : " + url);
                    DBPropertyTemp.setProperty("url", url);
                } else {
                    log.error("DBProperty URL  include {{" + syskey + "}} KEY , BUT NOT FIND SYS CONFIG !!!");
                }
            }
            return DBPropertyTemp;
        }
        log.warn("DBPropertyTemp is NULL!!! ");
        return null;
    }

    /**
     * ��û�����Ϣ������������
     *
     * @return
     */
    public static Map<String, String> getMessageProperty() {
        if (MessagePropertyTemp == null) {
            Properties tempp = new Properties();
            InputStream filein;
            try {
                log.debug(" Load Message Info From " + MESSAGE_FILE_NAME);
                filein = getClassConfigFile(MESSAGE_FILE_NAME);
                tempp.load(filein);
                MessagePropertyTemp = new HashMap<String, String>((Map) tempp);
                try {
                    filein.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
                filein = null;
            } catch (Exception e) {
                //e.printStackTrace();
                log.warn("GET Message CONFIG FILE ERROR!" + e.getMessage(), e);
            }
        }
        if (MessagePropertyTemp == null) {
            log.warn("MessageProperty is NULL!!! ");
        }
        return MessagePropertyTemp;
    }

    /**
     * ��ȡ�ӿ�����
     * @return public static HashMap<String, String> getInterfaceProperty(){
    if(InterfacePropertyTemp==null){
    InputStream filein;
    try{
    log.debug(" Load Interface Info From "+INTERFACE_CONFIG_NAME);
    filein = getClassConfigFile(INTERFACE_CONFIG_NAME);
    Properties interfaceconfig=new Properties();
    interfaceconfig.load(filein);
    InterfacePropertyTemp = new HashMap<String, String>((Map)interfaceconfig);
    try{
    filein.close();
    }catch(Exception e){
    e.printStackTrace();
    }
    filein = null;
    }catch (Exception e){
    //e.printStackTrace();
    log.warn("GET Interface CONFIG FILE ERROR!"+e.getMessage(),e);
    }
    }
    if(InterfacePropertyTemp!=null){
    return InterfacePropertyTemp;
    }
    log.warn("InterfacePropertyTemp is NULL!!! ");
    return null;
    }
     */
    /**
     * ��ȡϵͳ����
     *
     * @return public static HashMap<String, String> getSysProperty(){
     * if(SysPropertyTemp==null){
     * HashMap<String,String> aliasTemp = new HashMap<String,String>();
     * //��ȡϵͳ����
     * InputStream pfi=null;
     * try {
     * pfi = new FileInputStream(new File(SYS_CONFIG_PATH));
     * Properties sysconfig=new Properties();
     * sysconfig.load(pfi);
     * SysPropertyTemp = new HashMap<String, String>((Map)sysconfig);
     * } catch (IOException e) {
     * e.printStackTrace();
     * }finally{
     * if(pfi!=null){
     * try {
     * pfi.close();
     * pfi=null;
     * } catch (IOException e) {
     * e.printStackTrace();
     * }
     * }
     * }
     * }
     * return SysPropertyTemp;
     * }
     */

    public static void main(String args[]) {
        getDBProperty();
    }
}
