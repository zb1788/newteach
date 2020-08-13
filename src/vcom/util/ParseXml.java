package vcom.util;


import java.io.File;
import java.net.URL;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

/**
 * ����xmlͨ�÷���
 *
 * @author liuzhiqiang
 */
public class ParseXml {
	/*public static  URL parseXml(){
		return ParseXml.class.getResource("/versionconfig.xml");
	}*/

    private static Map<String, String> versionMap = new HashMap<String, String>();

    static {
        Document document = null;
        SAXReader saxreader = new SAXReader();
        try {
            document = saxreader.read(new File(ParseXml.class.getClassLoader().getResource("versionconfig.xml").getPath()));
            Element no = document.getRootElement();
            Iterator i = no.elementIterator();
            while (i.hasNext()) {
                Element e = (Element) i.next();

                //	System.out.println(e.getName()+"="	+e.getTextTrim());
                versionMap.put(e.getName(), e.getTextTrim());
            }
        } catch (DocumentException e) {
            e.printStackTrace();
        }
    }

    /**
     * ��ȡ�ڵ�ֵ
     *
     * @param node
     * @return
     */
    public static String getXmlNode(String node) {
        //Document document=null;
        //SAXReader saxreader=new SAXReader();
        String backnode = "";
		/*try {
			document=saxreader.read(new File(parseXml().getPath()));
			Element no=document.getRootElement();
			backnode= no.elementText(node);
		} catch (DocumentException e) {
			e.printStackTrace();
		}*/
        backnode = versionMap.get(node);
        return backnode;
    }

    public static void main(String[] args) {
        System.out.print(getXmlNode("vcomdownlaod"));

    }

}
