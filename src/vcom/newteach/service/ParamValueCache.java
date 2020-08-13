package vcom.newteach.service;

import java.util.*;

import vcom.newteach.dao.ParamValueDao;

public class ParamValueCache {
    private static Map<String, String> tempMap = null;

    /**
     * �ӻ����л�ȡkey��Ӧ��value
     *
     * @param key
     * @return
     * @throws Exception
     */
    public static String getTempKey(String key) throws Exception {
        if (tempMap == null) {
            tempMap = new HashMap<String, String>();
        }
        if (tempMap.get(key) == null) {
            String rval = new ParamValueDao().getParamValue(key);
            tempMap.put(key, rval);
            return rval;
        }
        return tempMap.get(key);
    }
}
