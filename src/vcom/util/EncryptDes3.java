package vcom.util;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.Security;

import javax.crypto.Cipher;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.bouncycastle.jce.provider.BouncyCastleProvider;

public class EncryptDes3 {
    /**
     * ���㷨��
     */
    private static String Algorithm = "DESede";
    private static Cipher clipher = getCipher();
    /**
     * ʸ��
     */
    private static byte[] iv = "12345678".getBytes();

    /**
     * ����Key
     *
     * @param key Base64�������24λ��key
     * @return
     */
    public static SecretKey getDecodeKey(String key) {

        return new SecretKeySpec(Base64.decode(key), Algorithm);
    }

    /**
     * ��ʼ�����ܽ��ܶ���
     *
     * @return
     */
    public static Cipher getCipher() {
        Cipher clipher = null;
        try {
            Security.addProvider(new BouncyCastleProvider());
            clipher = Cipher.getInstance("DESede/CBC/PKCS5Padding", "BC");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (NoSuchProviderException e) {
            e.printStackTrace();
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
        }
        return clipher;
    }

    /**
     * @param key  ��Կ
     * @param data ����
     * @return ����
     */
    public static String encode(String key, byte[] data) {
        byte[] result = null;
        try {

            SecretKey secretKey = getDecodeKey(key);
            IvParameterSpec ps = new IvParameterSpec(iv);
            clipher.init(Cipher.ENCRYPT_MODE, secretKey, ps);
            result = clipher.doFinal(data);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return Base64.encode(result);


    }

    /**
     * @param key  ��Կ
     * @param data ����
     * @return ����
     */
    public static byte[] decode(String key, String data) {
        byte[] original = null;
        try {
            SecretKeySpec skeySpec;
            SecretKey secretKey = getDecodeKey(key);
            IvParameterSpec ps = new IvParameterSpec(iv);
            clipher.init(Cipher.DECRYPT_MODE, secretKey, ps);
            original = clipher.doFinal(Base64.decode(data));
        } catch (Exception ex) {
        }
        return original;
    }

    public static void main(String args[]) {
        //��Կ ��ʵ��Ӧ����Ӧ��֧������
        String keystr = "a2prJSoqIyNAQGE4NzEyM14/IX4pbjp8";
        //String keystr ="kjk%**##@@a87123^?!~)n:|";
        //testdecode(keystr,testencode(keystr));
        //
        testencode(keystr, "������2010��", "0");//QJx7KxdA3C/1uQ0SwLw+oA== QJx7KxdA3C/1uQ0SwLw+oA==
    }

    /*
     * tyep��0��ת����1����ת��
     *
     * */
    public static String testencode(String key, String data, String type) {
        StringBuffer sb = new StringBuffer();
        sb.append(data);

        String text = "";
        try {
            text = encode(key, sb.toString().getBytes("UTF-8"));

            if (type.equals("0")) {

                text = ToInitString(text);

            }
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }


        return text;

    }

    public static void testdecode(String key, String text) {


    }

    //���ݲ���ǰ
    public static String ToInitString(String vs) {
        String re = vs;
        re = re.replaceAll("\\+", "*");
        re = re.replaceAll("=", "\\$");
        re = re.replaceAll("/", "@");
        return re;
    }

    //�õ�������
    public static String FromInitString(String vs) {
        String re = vs;
        re = re.replaceAll("\\*", "+");
        re = re.replaceAll("\\$", "=");
        re = re.replaceAll("@", "/");
        return re;
    }
}
