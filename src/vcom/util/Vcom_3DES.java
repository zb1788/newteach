package vcom.util;

import org.apache.log4j.Logger;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.util.encoders.Hex;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.Security;
import java.security.spec.AlgorithmParameterSpec;

public class Vcom_3DES {
    private String keyStr = "";

    private int isEncrypt = -1;// 1Ϊ���ܣ�0Ϊ����
    // private String keyStr;// ����/������Կ������Ϊ16byte����24byte��
    private String message; // Ҫ����/������Ϣ������ʱ��Ϊʮ��������ʾ���ַ�����

    public Vcom_3DES(int isEncrypt, String message) {
        this.isEncrypt = isEncrypt;
        this.message = message;
    }

    public Vcom_3DES(String key) {
        this.keyStr = key;
    }

    public static final Logger log = Logger.getLogger(Vcom_3DES.class);

    public String Vcom3DESChiper() {

        Security.addProvider(new BouncyCastleProvider());

        SecretKey key = new SecretKeySpec(keyStr.getBytes(), "DESede");

        byte[] text = null;
        byte[] bmessage = null;
        String returnStr = null;
        try {
            Cipher cipher = Cipher.getInstance("DESede/CBC/PKCS5Padding", "BC");
            AlgorithmParameterSpec algorithmparameterspec = new IvParameterSpec(
                    "12345678".getBytes());
            if (isEncrypt == 1) {
                bmessage = message.getBytes();
                cipher.init(Cipher.ENCRYPT_MODE, key, algorithmparameterspec);
            } else if (isEncrypt == 0) {
                bmessage = decodeHex(message);
                cipher.init(Cipher.DECRYPT_MODE, key, algorithmparameterspec);
            } else {
                System.out.println("�ӽ������ô�����ȷ�����룺1Ϊ���ܣ�0Ϊ����");
                return null;
            }
            text = cipher.doFinal(bmessage);
//			
            if (isEncrypt == 1) {
                returnStr = encodeHex(text);
            } else if (isEncrypt == 0) {
                returnStr = new String(text);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.info(e);
        }
        return returnStr;
    }

    public int getIsEncrypt() {
        return isEncrypt;
    }

    public void setIsEncrypt(int isEncrypt) {
        this.isEncrypt = isEncrypt;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public static final String encodeHex(byte bytes[]) {
		/*StringBuffer buf = new StringBuffer(bytes.length * 2);
		for (int i = 0; i < bytes.length; i++) {
			if ((bytes[i] & 0xff) < 16)
				buf.append("0");
			buf.append(Long.toString(bytes[i] & 0xff, 16));
		}
		return buf.toString();*/
        return new String(Hex.encode(bytes));
    }

    public static final byte[] decodeHex(String hex) {
	/*	char chars[] = hex.toCharArray();
		byte bytes[] = new byte[chars.length / 2];
		int byteCount = 0;
		for (int i = 0; i < chars.length; i += 2) {
			int newByte = 0;
			newByte |= hexCharToByte(chars[i]);
			newByte <<= 4;
			newByte |= hexCharToByte(chars[i + 1]);
			bytes[byteCount] = (byte) newByte;
			byteCount++;
		}*/
        byte bytes[] = Hex.decode(hex);
        return bytes;
    }

    private static final byte hexCharToByte(char ch) {
        switch (ch) {
            case 48: // '0'
                return 0;

            case 49: // '1'
                return 1;

            case 50: // '2'
                return 2;

            case 51: // '3'
                return 3;

            case 52: // '4'
                return 4;

            case 53: // '5'
                return 5;

            case 54: // '6'
                return 6;

            case 55: // '7'
                return 7;

            case 56: // '8'
                return 8;

            case 57: // '9'
                return 9;

            case 97: // 'a'
                return 10;

            case 98: // 'b'
                return 11;

            case 99: // 'c'
                return 12;

            case 100: // 'd'
                return 13;

            case 101: // 'e'
                return 14;

            case 102: // 'f'
                return 15;

            case 58: // ':'
            case 59: // ';'
            case 60: // '<'
            case 61: // '='
            case 62: // '>'
            case 63: // '?'
            case 64: // '@'
            case 65: // 'A'
            case 66: // 'B'
            case 67: // 'C'
            case 68: // 'D'
            case 69: // 'E'
            case 70: // 'F'
            case 71: // 'G'
            case 72: // 'H'
            case 73: // 'I'
            case 74: // 'J'
            case 75: // 'K'
            case 76: // 'L'
            case 77: // 'M'
            case 78: // 'N'
            case 79: // 'O'
            case 80: // 'P'
            case 81: // 'Q'
            case 82: // 'R'
            case 83: // 'S'
            case 84: // 'T'
            case 85: // 'U'
            case 86: // 'V'
            case 87: // 'W'
            case 88: // 'X'
            case 89: // 'Y'
            case 90: // 'Z'
            case 91: // '['
            case 92: // '\\'
            case 93: // ']'
            case 94: // '^'
            case 95: // '_'
            case 96: // '`'
            default:
                return 0;
        }
    }

    public static void main(String[] args) {
        // TODO Auto-generated method stub


        vcom.util.Vcom_3DES des = new vcom.util.Vcom_3DES("vcommenhutuwenandotheros");
        des.setIsEncrypt(0);
        des.setMessage("4cdc25241e63ea65f688d68413bce571836757bd0c3b265b");
        String sso = des.Vcom3DESChiper();
        System.out.println(sso);

        des.setMessage("09cbab7a85d5bad25e5a3e5727a7d14c");
        String ssoip = des.Vcom3DESChiper();
        System.out.println(ssoip);
//		Vcom_3DES vcom3DES = new Vcom_3DES("PropertyUtil.PLAY_SERVER_DES");
//		vcom3DES.setIsEncrypt(1);
//		vcom3DES.setMessage("2009000202020");
//		String outStr = vcom3DES.Vcom3DESChiper();


//		vcom3DES.setIsEncrypt(1);
//		vcom3DES.setMessage("admin");
//		outStr = vcom3DES.Vcom3DESChiper();


//
//		vcom3DES.setIsEncrypt(0);
//		vcom3DES.setMessage("2026a0bd60d80ec7dc9e8796416513ba");
//		String outStr1 = vcom3DES.Vcom3DESChiper();


    }

    public String getKeyStr() {
        return keyStr;
    }

    public void setKeyStr(String keyStr) {
        this.keyStr = keyStr;
    }
}
