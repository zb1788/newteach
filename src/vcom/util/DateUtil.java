/**
 * DateUtil.java
 *
 * @date 2011-12-19 ����11:15:43
 * @author �ɻ���
 * @version
 */
package vcom.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.log4j.Logger;

/**
 * ����ת������
 *
 *
 */
public class DateUtil {

    private static transient Logger log = Logger.getLogger(DateUtil.class);

    //ת��ΪDate����
    public static java.util.Date parseDate(String datestr) {
        if (StringUtil.isEmpty(datestr)) {
            return null;
        }
        try {
            datestr = datestr.trim();
            if (datestr.length() == 10) {
                //yyyy-MM-dd
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                return sdf.parse(datestr);
            } else if (datestr.length() == 19) {
                //yyyy-mm-dd HH:mm:ss
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                return sdf.parse(datestr);
            } else if (datestr.length() >= 10) {
                //2011-2-16.0.0. 0. 0
                String[] sarr = datestr.split(".");
                if (sarr != null && sarr.length == 5) {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-M-dd");
                    return sdf.parse(sarr[0]);
                }
            }
        } catch (ParseException e) {
            log.warn("����ת���쳣��" + e.getMessage());
            //e.printStackTrace();
        }
        return null;
    }

    //Dateת��Ϊ�ַ���
    public static String parseDate(Date adate, String pstr) {
        if (adate != null && pstr != null) {
            try {
                SimpleDateFormat sdf = new SimpleDateFormat(pstr);
                return sdf.format(adate);
            } catch (Exception e) {
                log.warn("���ڸ�ʽ���쳣��" + e.getMessage());
                //e.printStackTrace();
            }
        }
        return null;
    }

    /**
     * yyyy-MM-dd HH:mm:ss���ڸ�ʽ��
     * @param date
     * @return
     */
    public static String getAllDateStr(java.util.Date date) {
        return parseDate(date, "yyyy-MM-dd HH:mm:ss");
    }

    /**
     * ����ƫ��ʱ��
     *
     * @param year
     * @param month
     * @param date
     * @param day
     * @param hour
     * @param minute
     * @param second
     * @return
     */
    public static Date computeDate(Date date, int year, int month, int day, int hour, int minute, int second) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        //����ƫ��
        cal.add(Calendar.YEAR, year);
        cal.add(Calendar.MONTH, month);
        cal.add(Calendar.DATE, day);
        cal.add(Calendar.HOUR_OF_DAY, hour);
        cal.add(Calendar.MINUTE, minute);
        cal.add(Calendar.SECOND, second);

        return cal.getTime();
    }

    /**
     * ����dateʱ�䣬�����ÿղ�����Ӧʱ��
     * ���ڻ�ȡ�տ�ʼ���ս���
     * @param date
     * @param hour
     * @param minute
     * @param second
     * @return
     */
    public static Date setDateTime(Date date, Integer hour, Integer minute, Integer second) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        if (hour != null) {
            cal.set(Calendar.HOUR_OF_DAY, hour);
        }
        if (minute != null) {
            cal.set(Calendar.MINUTE, minute);
        }
        if (second != null) {
            cal.set(Calendar.SECOND, second);
        }
        return cal.getTime();
    }

    public static String dateDisplay(long time) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date d = new Date(time);
        return format.format(d);
    }

    public static String dateDisplay(Date d) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        return format.format(d);
    }

    public static void main(String args[]) {
        System.out.println(getAllDateStr(computeDate(new Date(), 0, 0, 30, 24, 0, 0)));
        System.out.println(getAllDateStr(computeDate(new Date(), -1, -1, -10, 0, 0, 0)));
        System.out.println(getAllDateStr(setDateTime(new Date(), 0, 0, 0)));
        System.out.println(getAllDateStr(setDateTime(new Date(), 23, 59, 59)));
    }
}
