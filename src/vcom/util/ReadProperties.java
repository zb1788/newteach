package vcom.util;

import java.io.*;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;


public class ReadProperties {

    private String filename;
    //public final static Map<String, String> map_interface = new ConcurrentHashMap<String, String>();

    public ReadProperties(String filename) {
        // TODO Auto-generated constructor stub
        this.filename = filename;
    }

    //��ȡ��Ŀ�ļ�
    public String readPropertiesByResource(String parameter) {
        Properties prop = new Properties();
        InputStream in = ReadProperties.class.getResourceAsStream(filename);
        String arg = null;
        try {
            prop.load(in);
            arg = prop.getProperty(parameter);
            if (arg != null) {
                arg = arg.trim();
            }
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return arg;
    }

    //��ȡ��Ŀ�ļ�
    public Map<String, String> readPropertiesByResource() {
        Map<String, String> map_interface = new ConcurrentHashMap<String, String>();
        Properties prop = new Properties();
        InputStream in = ReadProperties.class.getResourceAsStream(filename);
        String arg = null;
        try {
            prop.load(in);
            writerMap(prop, map_interface);
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return map_interface;
    }

    //��ȡӲ���ļ�
    public String readPropertiesByFile(String parameter) {
        File f1 = new File(filename);
        Properties prop = new Properties();
        InputStream in;
        String arg = null;
        try {
            in = new BufferedInputStream(new FileInputStream(f1));
            prop.load(in);
            arg = prop.getProperty(parameter);
            if (arg != null) {
                arg = arg.trim();
            }
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return arg;
    }

    private static void writerMap(Properties props, Map<String, String> tmpMap) {
        Set<Object> keys = props.keySet();
        for (Object key : keys) {
            String keyStr = key.toString();
            String value = props.getProperty(keyStr);
            //����CMS||��ͷ��ȥ��:\:8080/cms/interface.jsp?readfile\=
            /*if(keyStr.startsWith("CMS||"))
            {
                value=value.replaceFirst(":8080/cms/interface.jsp\\?readfile=", "");
            }*/
            if (value != null) {
                value = value.trim();
            } else {
                value = "";
            }
            tmpMap.put(keyStr, value);
        }
    }

}
