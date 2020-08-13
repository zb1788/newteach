package vcom.util;

import java.io.File;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

public class GetVersion {

    /**
     * @param args
     */
    public static void main(String[] args) {

    }

    public static String version() {

        SAXReader reader = new SAXReader();
        Document d = null;
        try {
            String struts = "uiconfig.xml";
            String path = GetVersion.class.getClassLoader().getResource(struts).getPath();
            path = path.substring(0, path.length() - 16 - struts.length());
            d = reader.read(new File(path + "version.xml"));
            Element root = d.getRootElement();
            return root.elementText("versionNum") + " �������ڣ�"
                    + root.elementText("versionDate");
        } catch (DocumentException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return "";
    }

    public static String versionnum() {

        SAXReader reader = new SAXReader();
        Document d = null;
        try {
            String struts = "uiconfig.xml";
            String path = GetVersion.class.getClassLoader().getResource(struts).getPath();
            path = path.substring(0, path.length() - 16 - struts.length());
            d = reader.read(new File(path + "version.xml"));
            Element root = d.getRootElement();
            return root.elementText("versionNum");
        } catch (DocumentException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return "";
    }

//	private static Boolean isAllowLoginBeike = null;

    /**
     * �Ƿ������¼����
     *
     * @return
     */
    public static Boolean isAllowLoginBeike() {

        String allowLoginBeikeFlag = "1";
        SAXReader reader = new SAXReader();
        Document d = null;
        try {
            //String path = GetVersion.class.getResource("/").getPath();
            //path = path.substring(0, path.length() - 16);
            //d = reader.read(new File(path + "version.xml"));
            String struts = "struts.xml";
            String path = GetVersion.class.getClassLoader().getResource(struts).getPath();
            path = path.substring(0, path.length() - 16 - struts.length());
            d = reader.read(new File(path + "version.xml"));


            // String xPath = "//version//versions//allowLoginBeikeFlag";

            List list = d.selectNodes("//version/versions");
            if (null != list) {
                for (int i = 0; i < list.size(); i++) {

                    Element e = (Element) list.get(i);
                    allowLoginBeikeFlag = e.elementText("allowLoginBeikeFlag");
                    // System.out.println(i +allowLoginBeikeFlag);

                }// end of for
            }// end of if

            // 1-������ʱ��Ρ�0-��������ʱ���

            if (null == allowLoginBeikeFlag || "1".equals(allowLoginBeikeFlag))
                return true;
            else
                return false;
        } catch (DocumentException e) {

            e.printStackTrace();
            return true;
        }

    }
}
