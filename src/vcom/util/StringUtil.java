/**
 * StringUtil.java
 *
 * @date 2011-12-19 ����11:46:34
 * @author �ɻ���
 * @version
 */
package vcom.util;

import java.util.regex.Pattern;

import org.apache.log4j.Logger;

/**
 * �ַ�����������
 *
 */
public class StringUtil {
    private static transient Logger log = Logger.getLogger(StringUtil.class);
    //HTMLת���
    private static final char[] AMP_ENCODE = "&amp;".toCharArray();//&and����
    private static final char[] LT_ENCODE = "&lt;".toCharArray();//�������
    private static final char[] GT_ENCODE = "&gt;".toCharArray();//�Ҽ�����
    private static final char[] QUOTE_ENCODE = "&quot;".toCharArray();//˫����
    private static final char[] APOS_ENCODE = "&#39;".toCharArray();//Ӣ�ĵ�����(&apos;IE��ʶ��)
    //"&acute;"//������(��Ӣ��)


    /**
     * �жϿշ���
     * @param str
     * @return
     */
    public static boolean isEmpty(String str) {
        if (str == null || str.length() < 1) {
            return true;
        }
        return false;
    }

    /**
     * �ͷ� StringBuffer �ڴ�
     * @param sbf
     */
    public static void deleteStringBuffer(StringBuffer sbf) {
        if (sbf != null) {
            sbf.delete(0, sbf.length());
            sbf = null;
        }
    }

    /**
     * �ж��ַ����Ƿ�ΪӢ�ĺ�����
     * @param str
     * @return
     */
    public static boolean isWordOrNumber(String str) {
        return Pattern.matches("(\\d|\\w)+", str);
    }

    /**
     * ��replaceAll���滻ֵ���д������������$ʱ���´���
     * @param str
     * @return
     */
    public static String convertForReplaceAll(String str) {
        if (isEmpty(str)) {
            return str;
        }
        return str.replaceAll("", "\\\\\\$");
    }

    /**
     * ����HTML��ǩ��������
     * @param content
     * @return
     */
    public static String converttxt(String content) {
        if (content == null || content.equals(""))
            content = "";
        String res = content.trim();
        res = res.replaceAll("[<]([^>]*)[>]", "");
        return res;
    }

    /**
     * ת��HTML����Ϊ����ʾ����(ת�������/&/˫����)
     * @param i
     * @return
     */
    public static String convertHtml(String htmlcode) {
        StringBuffer buf = new StringBuffer();
        for (int i = 0; i < htmlcode.length(); i++) {
            char tempchar = htmlcode.charAt(i);
            if (tempchar == '"') {
                buf.append(QUOTE_ENCODE);
            } else if (tempchar == '\'') {
                buf.append(APOS_ENCODE);
            } else if (tempchar == '&') {
                buf.append(AMP_ENCODE);
            } else if (tempchar == '<') {
                buf.append(LT_ENCODE);
            } else if (tempchar == '>') {
                buf.append(GT_ENCODE);
            } else {
                buf.append(tempchar);
            }
        }
        String htmlstr = buf.toString();
        deleteStringBuffer(buf);
        return htmlstr;
    }

    /**
     * ���һ���ַ���Ϊnull���򷵻ؿմ�
     * @param str
     * @return
     */
    public static String getStrFromNull(String str) {
        if (str == null || "null".equals(str) || "NULL".equals(str)) {
            str = "";
        }
        return str;
    }

    /**
     * ��ȡ��indexλ�ÿ�ʼ�׸���start��ʼend�������ַ���
     *
     * @param start
     * @param end
     * @param tempstr
     * @param index
     * @return
     */
    public static final String getTagStr(String start, String end, String tempstr, int index) {
        int istart = tempstr.indexOf(start, index);
        int iend = tempstr.indexOf(end, index);
        if (istart > -1 && iend > -1 && istart < iend) {
            return tempstr.substring(istart, iend);
        }
        return null;
    }

    public static final String escapeHTMLTags(String in) {
        if (in == null) {
            return null;
        }
        char ch;
        int i = 0;
        int last = 0;
        char[] input = in.toCharArray();
        int len = input.length;
        StringBuffer out = new StringBuffer((int) (len * 1.3));
        for (; i < len; i++) {
            ch = input[i];
            if (ch > '>') {
                continue;
            } else if (ch == '<') {
                if (i > last) {
                    out.append(input, last, i - last);
                }
                last = i + 1;
                out.append(LT_ENCODE);
            } else if (ch == '>') {
                if (i > last) {
                    out.append(input, last, i - last);
                }
                last = i + 1;
                out.append(GT_ENCODE);
            } else if (ch == '"') {
                out.append(QUOTE_ENCODE);
            } else if (ch == '\'') {
                out.append(APOS_ENCODE);
            } else if (ch == '&') {
                out.append(AMP_ENCODE);
            }
        }
        if (last == 0) {
            return in;
        }
        if (i > last) {
            out.append(input, last, i - last);
        }
        return out.toString();
    }

    /**
     * Replaces all instances of oldString with newString in line.
     *
     * @param line the String to search to perform replacements on
     * @param oldString the String that should be replaced by newString
     * @param newString the String that will replace all instances of oldString
     *
     * @return a String will all instances of oldString replaced by newString
     */
    public static final String replace(String line, String oldString, String newString) {
        if (line == null) {
            return null;
        }
        oldString = getStrFromNull(oldString);
        newString = getStrFromNull(newString);
        int i = 0;
        if ((i = line.indexOf(oldString, i)) >= 0) {
            char[] line2 = line.toCharArray();
            char[] newString2 = newString.toCharArray();
            int oLength = oldString.length();
            StringBuffer buf = new StringBuffer(line2.length);
            buf.append(line2, 0, i).append(newString2);
            i += oLength;
            int j = i;
            while ((i = line.indexOf(oldString, i)) > 0) {
                buf.append(line2, j, i - j).append(newString2);
                i += oLength;
                j = i;
            }
            buf.append(line2, j, line2.length - j);
            return buf.toString();
        }
        return line;
    }

    /**
     * Ϊ�ַ����е�����ؼ��ּ���ת������������ַ�����Ӧ��������ʽ
     * @param str
     * @return
     */
    public static String parseRegex(String str) {
        if (StringUtil.isEmpty(str)) {
            return str;
        }
        return str.replaceAll("(\\.|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\^|\\$|\\\\|\\-|\\+|\\*|\\,)", "\\\\$1");
    }

    /**
     * ��ȡjson���ı�(����б�ߡ������š�˫���ż�б����ת�崦��)
     * @param str
     * @return
     */
    public static String getJsonText(String str) {
        if (StringUtil.isEmpty(str)) {
            return "";
        }
        String restr = null;
        restr = str.replaceAll("\\r", "").replaceAll("\\n", "").replaceAll("\\\\", "\\\\\\\\").replaceAll("\'", "\\\\\'").replaceAll("\"", "\\\\\"");
        return restr;
    }

    /**
     * ȥ���ظ��ı�ǩ
     * @param testStr String
     * @return String
     */
    public static String getnorepeatstr(String testStr) {
        StringBuffer returnStr = new StringBuffer(20);
        String[] tmpList = testStr.split(",");
        for (int i = 0; i < tmpList.length; i++) {
            if (testStr.indexOf(tmpList[i]) != -1) {
                if (testStr.indexOf(tmpList[i]) != testStr.lastIndexOf(tmpList[i])) {
                    testStr = replace(testStr, tmpList[i], "");
                    //testStr = testStr.replaceAll(tmpList[i], ""); �������ظ���ǩ��ʱ���java.util.regex.PatternSyntaxException����
                }
                returnStr.append(",").append(tmpList[i]);
            }
        }

        return returnStr.substring(1);
    }

}
