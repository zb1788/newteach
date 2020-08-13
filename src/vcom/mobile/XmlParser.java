package vcom.mobile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.Stack;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;
//ȫ�����ַ�����ʽ����.

/**
 * @author yjk
 * @version3.04
 */
public class XmlParser extends DefaultHandler {

    public void startDocument() throws SAXException {
        //System.out.println("xml��ʼ����......");
    }

    // ��������XML�ļ�
    public void endDocument() throws SAXException {
        //  System.out.println("xml�������");
    }

    private final static String VCOM = "vcom";
    private final static String Message = "area";
    Stack<String> position = new Stack<String>();

    public XmlParser() {
        info = new HashMap();
        bodys = new java.util.LinkedHashSet<Map<String, String>>();
        info.put("Message", bodys);
    }

    private Map info;
    private Map body;
    Set<Map<String, String>> bodys;

    private String curQName;
    private String curValue;

    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        curQName = qName;
        curValue = "";
        if (curQName.equals(Message)) {
            body = new HashMap<String, String>();
            bodys.add(body);
        }
        position.push(qName);
    }

    public void endElement(String uri, String localName, String qName) throws SAXException {
        if (position.search(VCOM) == 2)//����info��Ϣ.
        {

            info.put(qName, curValue);

        } else if (position.search(Message) == 2)//����body����Ϣ.
        {

            body.put(qName, curValue);
        }
        if (position.peek().equals(qName)) {
            position.pop();
        }

    }


    public void characters(char ch[], int start, int length) throws SAXException {
        String tvalue = new String(ch, start, length);
        if (tvalue == null || tvalue.length() == 0) {
            tvalue = "";
        }
        curValue = curValue + tvalue;

    }

    public void parseByDoc(File f) throws ParserConfigurationException, SAXException, IOException {
        SAXParserFactory spf = SAXParserFactory.newInstance();
        SAXParser saxParser = spf.newSAXParser();
        saxParser.parse(f, this);
    }

    /*   public static void main(String[] args)
       {
           XmlParser parser=new XmlParser();
           try {
              parser.parseByDoc(new File(XmlParser.class.getResource("/phoneconfig.xml").toURI()));


             Map info=parser.getInfo();
            //System.out.println(info);
            Set<Map<String,String>> list=   (Set) info.get("Message");
            for(Map<String ,String> map : list)
            {
              Set<String> keys=  map.keySet();
               for(String key : keys)
               {
                   System.out.print(map.get(key));
               }
               System.out.println();
            }
             } catch (ParserConfigurationException e) {
              // TODO Auto-generated catch block
              e.printStackTrace();
           } catch (SAXException e) {
              // TODO Auto-generated catch block
              e.printStackTrace();
          } catch (IOException e) {
              // TODO Auto-generated catch block
              e.printStackTrace();
          } catch (URISyntaxException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
       }
*/
    public Map getInfo() {
        return info;
    }


}
