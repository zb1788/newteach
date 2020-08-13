package vcom.mobile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Map;

import javax.xml.parsers.ParserConfigurationException;

import org.xml.sax.SAXException;


public class PhoneConfig {

    public static PhoneConfig instance = new PhoneConfig();

    private PhoneConfig() {
        XmlParser xmlParser = new XmlParser();
        try {
            xmlParser.parseByDoc(new File("/etc/vcom/phoneconfig.xml"));
        } catch (ParserConfigurationException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SAXException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        configInfo = xmlParser.getInfo();

    }

    private Map configInfo;

    /**
     * @return the configInfo
     */
    public Map getConfigInfo() {
        return configInfo;
    }

    /**
     * @param configInfo the configInfo to set
     */
    public void setConfigInfo(Map configInfo) {
        this.configInfo = configInfo;
    }

}
