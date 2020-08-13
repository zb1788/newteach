package vcom.newteach.action;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import org.apache.log4j.Logger;
import vcom.util.InterfaceCfg;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

public class ConfigAction extends BaseAction {
    protected static Logger log = Logger.getLogger(ConfigAction.class);


    public String showConfig(String method, HttpServletRequest request, HttpServletResponse response) {

        JSONObject pls_config = JSONObject.fromObject(InterfaceCfg.ipPathMap, new JsonConfig());
        JSONObject _config = JSONObject.fromObject(InterfaceCfg.ipMap, new JsonConfig());

        HashMap<String, Object> result = new HashMap<String, Object>();

        result.put("status", "ok");
        //result.put("status", "error");

        HashMap<String, Object> resultInfo = new HashMap<String, Object>();
        resultInfo.put("plsconfig", pls_config);
        resultInfo.put("config", _config);

        String transferProtocol_web = null;
        if (_config.has("LOCAL_PROTOCOL")) {
            transferProtocol_web = _config.getString("LOCAL_PROTOCOL") + "://";
        } else {
            transferProtocol_web = "http://";
        }


        resultInfo.put("transferProtocol", transferProtocol_web);

        result.put("data", resultInfo);


        JSONObject jsobject = JSONObject.fromObject(result);


        request.setAttribute("data", jsobject.toString());
        return this.SUCCESS;
    }

    public static void main(String[] args) {


    }
}
