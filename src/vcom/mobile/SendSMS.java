package vcom.mobile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import sun.misc.BASE64Encoder;
import vcom.util.Config;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


public class SendSMS {

    /**
     * @param args
     */
    public static void main(String[] args) {
        // TODO Auto-generated method stub

    }

    public boolean sendMobileSMS(String phone, String content) {
        boolean isOk = true;
        Map config = PhoneConfig.instance.getConfigInfo();

        String vsms_platUser = (String) config.get("vsms_platUser");
        String vsms_platPwd = (String) config.get("vsms_platPwd");
        String viManageIcode = (String) config.get("viManageIcode");
        String serviceType = (String) config.get("serviceType");
        HashMap vsmsMap = new HashMap();
        vsmsMap.put("platUser", vsms_platUser);
        vsmsMap.put("platPwd", vsms_platPwd);

        // Base64加密
        content = new BASE64Encoder().encode(content.getBytes());

        Map<String, String> map = new HashMap<String, String>();

        map.put("needReport", "0");
        map.put("taskId", "");
        map.put("cronExpression", "");
        map.put("sendTime", "");
        map.put("msType", "0");
        map.put("sendType", "0");
        map.put("autoSplit", "1");
        map.put("chargeNumber", "");
        map.put("messageContent", content);
        map.put("mtMsType", "A");
        map.put("feeValue", "");
        map.put("spNumber", "");
        map.put("userNumber", phone);

        map.put("reportDes", "0");
        map.put("operateType", "A");

        map.put("givenValue", "000000");
        map.put("priority", "0");
        //map.put("serviceType", "2.1.");
        map.put("serviceType", serviceType);

        ArrayList maps = new ArrayList();
        maps.add(map);
        vsmsMap.put("data", maps);

        String data = JSONObject.fromObject(vsmsMap).toString();

        String sendSMSurl = Config.getGatherDomainAppUrl("VSMS.SEND") + "?reqEncoding=GBK";
        HashMap paramMap = new HashMap();
        paramMap.put("data", data);
        System.out.print("SMS URL=" + sendSMSurl + "&data=" + data);
        HttpSendMsg sendMsg = new HttpSendMsg();
        String vsmsRtnJson = sendMsg.sendPost(sendSMSurl + "&data=" + data, null, "");


        if (vsmsRtnJson == null || "error".equals(vsmsRtnJson) || "null".equals(vsmsRtnJson)) {
            isOk = false;
            return isOk;
        }

        JSONArray jsonArray = JSONArray.fromObject(vsmsRtnJson);
        JSONObject jsonResult = (JSONObject) jsonArray.get(0);
        Integer resultFlag = (Integer) jsonResult.get("resultFlag");

        if (null == resultFlag || 1 != resultFlag.intValue()) {
            isOk = false;
            return isOk;
        }
        return isOk;
    }
}
