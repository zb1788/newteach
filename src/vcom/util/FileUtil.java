package vcom.util;

import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URL;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedList;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.jsp.PageContext;

import org.apache.log4j.Logger;


import java.util.Map;

public class FileUtil {
    private static Logger log = Logger.getLogger(FileUtil.class);

    /**
     * ��ȡͼƬ��С
     *
     * @param path
     * @return
     */
    public static Map<String, Integer> getImageSize(String path) {
        log.debug("GET IMG :" + path);
        HashMap<String, Integer> imagemap = null;
        try {
            //InputStream is = new ByteArrayInputStream(path);
            File imgfile = new File(path);
            if (imgfile.exists()) {
                imagemap = new java.util.HashMap<String, Integer>();
                BufferedImage bufImg = ImageIO.read(imgfile);
                imagemap.put("width", bufImg.getWidth());
                imagemap.put("height", bufImg.getHeight());
                //bufImg.flush();
                bufImg = null;
            } else {
                log.error(" IMG FILE " + path + " NOT EXISTS!! ");
            }
            imgfile = null;
        } catch (IOException e) {
            // TODO Auto-generated catch block
            log.error("GET IMG WIDTH HEIGHT ERROR:" + e.getMessage(), e);
            e.printStackTrace();
        }
        return imagemap;
    }

    /**
     * ��ȡ����ͼƬ��С
     *
     * @param max_width
     * @param max_height
     * @param imgmap
     * @return
     */
    public static Map<String, Integer> getSualtImageWidth(int max_width, int max_height, Map<String, Integer> imgmap) {
        if (imgmap == null || imgmap.get("height") == null || imgmap.get("width") == null) {
            return null;
        }
        //80,120,128,35
        int new_wi = -1;
        int new_he = -1;
        try {
            int wi = imgmap.get("width");
            int he = imgmap.get("height");
            float rate = ((float) wi) / ((float) he);
            boolean rule_width = true;//�Կ��Ϊ׼�����Ը߶�Ϊ׼
            if (wi > max_width && he <= max_height) {
                rule_width = true;
            } else if ((he > max_height && wi <= max_width)) {
                rule_width = false;
            } else if (he > max_height && wi > max_width) {
                if ((max_height * rate) > max_width) {
                    rule_width = true;
                } else {
                    rule_width = false;
                }
            } else {
                if (wi / max_width > he / max_height) {
                    rule_width = true;
                } else {
                    rule_width = false;
                }
            }
            //���ս�����д���
            if (rule_width) {
                //�Կ��Ϊ׼
                new_wi = max_width;
                new_he = new Float((float) new_wi / rate).intValue();
            } else {
                //�Ը߶�Ϊ׼
                new_he = max_height;
                new_wi = new Float(new_he * rate).intValue();
            }
        } catch (Exception e) {
            log.error("img deal error!!", e);
        }
        if (new_wi > -1 && new_he > -1) {
            if (new_wi == 0) {
                new_wi = 1;
            }
            if (new_he == 0) {
                new_he = 1;
            }
            HashMap<String, Integer> rmap = new java.util.HashMap<String, Integer>();
            rmap.put("width", new_wi);
            rmap.put("heigth", new_he);
            return rmap;
        } else {
            return null;
        }
    }

    /**
     * ɾ���ļ��ķ�����ֻɾ��ָ���ļ���
     *
     * @param file
     * @throws java.lang.Exception
     */
    public static void deleteFile(File file) throws Exception {
        if (!file.exists()) {
            return;
        }
        int maxTry = 3;
        while (maxTry > 0) {
            maxTry--;
            if (file.isFile()) {
                if (file.delete())
                    return;
                else
                    continue;
            } else {
                return;
            }
        }
    }

    /**
     * ɾ���ļ��ķ�����ֻɾ��ָ���ļ���
     *
     * @param path
     * @throws java.lang.Exception
     */
    static public void deleteFile(String path) throws Exception {
        File file = new File(path);
        deleteFile(file);
    }

    /**
     * �ļ�����
     *
     * @param from
     * @param to
     * @throws java.lang.Exception
     */
    static public void moveFile(String from, String to) throws Exception {
        boolean ok = copy(from, to);
        if (ok)
            deleteFile(from);
    }

    /**
     * CHL
     * ɾ��path����·���ļ���,�������ļ�
     *
     * @param path
     * @return
     */
    public static void delFolder(String folderPath) {
        try {
            delAllFile(folderPath); //ɾ����������������
            String filePath = folderPath;
            filePath = filePath.toString();
            java.io.File myFilePath = new java.io.File(filePath);
            myFilePath.delete(); //ɾ�����ļ���
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * CHL
     * ɾ��path����·���ļ����µ������ļ�
     *
     * @param path
     * @return
     */
    public static boolean delAllFile(String path) {
        boolean flag = false;
        File file = new File(path);
        if (!file.exists()) {
            return flag;
        }
        if (!file.isDirectory()) {
            return flag;
        }
        String[] tempList = file.list();
        File temp = null;
        for (int i = 0; i < tempList.length; i++) {
            if (path.endsWith(File.separator)) {
                temp = new File(path + tempList[i]);
            } else {
                temp = new File(path + File.separator + tempList[i]);
            }
            if (temp.isFile()) {
                temp.delete();
            }
            if (temp.isDirectory()) {
                delAllFile(path + "/" + tempList[i]);//��ɾ���ļ���������ļ�
                delFolder(path + "/" + tempList[i]);//��ɾ�����ļ���
                flag = true;
            }
        }
        return flag;
    }

    /**
     * �����ļ���Ŀ¼�ķ���
     *
     * @param path-�ļ�·��
     * @throws java.lang.Exception
     */
    public static void createFile(String path) throws Exception {
        File dirName = new File(path);
        if (!dirName.exists()) {
            boolean success = dirName.mkdirs(); //�����ļ�
        }
    }

    /**
     * �����ļ���д�����ݵķ���
     *
     * @param path-�ļ�Ŀ¼
     * @param filename-�ļ���
     * @param content-�ļ�����
     */
    public static void createFile(String path, String filename, String content, String charset) {
        //�ж�����ļ����ڣ����µ�д������Ϊ�����ٸ����ļ�����
        if (new File(path).exists() && (StringUtil.isEmpty(content) || "null".equals(content))) {
            return;
        }
        try {
            createFile(path);
            PrintWriter pw = null;
//	            if ("/".equals(File.separator)) {
            if (StringUtil.isEmpty(charset)) {
                pw = new PrintWriter(new OutputStreamWriter(new FileOutputStream(path + "/" + filename)));
            }
            pw = new PrintWriter(new OutputStreamWriter(new FileOutputStream(path + "/" + filename), charset));
//	            }
//	            else {
//	                pw = new PrintWriter(new FileOutputStream(path + "/" + filename));
//	            }
            pw.println(content);
            pw.close();
        } catch (Exception e) {
            log.error("CREATE FILE " + path + " " + filename + " ERROR:" + e.getMessage(), e);
        }
    }


    /**
     * ���ݱ����ȡ�ļ�
     *
     * @param filePath
     * @return
     */
    public static String readFile(String filePath, String encode) {
        StringBuffer sb = new StringBuffer();
        File file = new File(filePath);
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new BufferedReader(new InputStreamReader(new FileInputStream(file), encode)));
            String tempString = null;
            while ((tempString = reader.readLine()) != null) {
                sb.append(tempString);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
        }
        return sb.toString();
    }

    public static void writeFile(File file, byte[] data) throws IOException {
        final int MAX_BUFFER_SIZE = 4096;
        FileOutputStream output = null;
        FileChannel fc = null;
        try {
            output = new FileOutputStream(file);
            fc = output.getChannel();
            ByteBuffer buffer = ByteBuffer.allocate(MAX_BUFFER_SIZE);
            int offset = 0;
            while (offset < data.length) {
                buffer.clear();
                int len = data.length - offset;
                if (len > MAX_BUFFER_SIZE)
                    len = MAX_BUFFER_SIZE;
                buffer.put(data, offset, len);
                offset += len;
                buffer.flip();
                fc.write(buffer);
            }
        } finally {
            if (fc != null) {
                try {
                    fc.close();
                } catch (IOException e) {
                }
            }
            if (output != null) {
                try {
                    output.close();
                } catch (IOException e) {
                }
            }
        }
    }

    /**
     * ��ȡ�ļ�ȫ������·��
     * �ļ���Ҫ��Ӧ��Ŀ¼��
     *
     * @param filename
     */
    public String getFilePath(String filename) {
        URL furl = getClass().getClassLoader().getResource(filename);
        String strURL = furl.toString();
        furl = null;
        if (System.getProperty("os.name").toUpperCase().indexOf("WINDOWS") != -1) {
            strURL = strURL.replaceAll("file:/", "");//ɾ��file:/ --windows����
        } else {
            strURL = strURL.replaceAll("file:", "");//ɾ��file:	//--linux����
        }
        return strURL;
    }

    /**
     * ��ȡ��ǰӦ��ϵͳ·��
     */
    public String getpath() {
        String strClassName = getClass().getName();
        String strPackageName = "";
        if (getClass().getPackage() != null) {
            strPackageName = getClass().getPackage().getName();
        }
        String strClassFileName = "";
        if (!"".equals(strPackageName)) {
            strClassFileName = strClassName.substring(strPackageName.length() + 1, strClassName.length());
        } else {
            strClassFileName = strClassName;
        }

        String strURL = getFilePath(strClassFileName + ".class");
        int index = strURL.indexOf("/WEB-INF/");
        if (index > -1) {
            strURL = strURL.substring(0, strURL.indexOf("/WEB-INF/"));
        } else {
            strURL = System.getProperty("user.dir");
            if (System.getProperty("os.name").toUpperCase().indexOf("WINDOWS") != -1) {
                strURL = strURL.replaceAll("file:/", "");//ɾ��file:/ --windows����
            } else {
                strURL = strURL.replaceAll("file:", "");//ɾ��file:	//--linux����
            }
        }
        strURL = strURL.replaceAll("%20", " ");
        return strURL;
    }

    /**
     * ��ȡbasePathĿ¼��������չ��Ϊextname�ļ�·����ַ
     *
     * @param basePath
     * @param extname  ��չ�� ���Ϊ�� ���ȡ�����ļ�
     * @return
     */
    public static String[] listFiles(String basePath, String extname) {
        String[] files = null;
        File file = new File(basePath);
        if (!file.exists()) {
            return new String[]{};
        }
        LinkedList l = new LinkedList();
        getFilesList(file, basePath, basePath, extname, l);
        files = new String[l.size()];
        for (int i = 0; i < l.size(); i++) {
            files[i] = (String) l.get(i);
        }
        return files;
    }

    /**
     * �ݹ鷽�� ��ȡbasePathĿ¼��������չ��Ϊextname���ļ�
     *
     * @param file
     * @param basePath
     * @param parentName
     * @param extname    ��չ�� ���� xml html�ȵ� ���Ϊ�� �򷵻������ļ�
     * @param l
     * @return
     */
    private static LinkedList getFilesList(File file, String basePath, String parentName, String extname, LinkedList l) {
        StringBuffer fileNodeStr = new StringBuffer();
        try {
            String dir = file.getPath();
            dir = dir.replaceAll("\\\\", "/");

            File TempFile[] = file.listFiles();
            String filepath = null;
            for (int i = 0; i < TempFile.length; i++) {
                File tmpFile = TempFile[i];
                if (tmpFile.isDirectory()) {
                    getFilesList(tmpFile, basePath, tmpFile.getName(), extname, l);
                } else {
                    filepath = tmpFile.getCanonicalPath();
                    filepath = filepath.substring(basePath.length());
                    if (extname == null || extname.trim().equals("")) {
                        l.add(filepath);
                    } else {
                        if (tmpFile.getName().endsWith("." + extname)) {
                            l.add(filepath);
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return l;
    }

    /**
     * ������ķ�ʽ���ش�Ŀ¼�µ��ļ��б�
     *
     * @param dirpath
     * @return
     * @throws java.lang.Exception
     */
    static public String[] listFiles(String dirpath) throws Exception {
        File file = new File(dirpath);
        File files[] = file.listFiles();
        String[] fileslist = new String[files.length];
        for (int i = 0; i < files.length; i++) {
            String NewsFileName = files[i].getName();
            fileslist[i] = dirpath + "\\" + NewsFileName;
        }
        return fileslist;
    }

    /**
     * �ļ�������������
     * �������ڣ�(2002-1-24 9:52:47)
     *
     * @param from java.lang.String
     * @param to   java.lang.String
     */
    public static boolean copy(String from, String to) {
        try {
            to = to.replaceAll("\\\\", "/ <file://\\> ");
            String toPath = to.substring(0, to.lastIndexOf("/"));
            File f = new File(toPath);
            if (!f.exists())
                f.mkdirs();
            BufferedInputStream bin = new BufferedInputStream(new
                    FileInputStream(from));
            BufferedOutputStream bout = new BufferedOutputStream(new
                    FileOutputStream(to));
            int c;
            while ((c = bin.read()) != -1)
                bout.write(c);
            bin.close();
            bout.close();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    /**
     * ���������ļ�������
     *
     * @param oldPath String ԭ�ļ�·�� �磺c:/fqf
     * @param newPath String ���ƺ�·�� �磺f:/fqf/ff
     * @return boolean
     * @throws Exception
     */
    public static void copyFolder(String oldPath, String newPath) throws Exception {
        createFile(newPath); // ����ļ��в����ڣ��������ļ���
        File a = new File(oldPath);
        String[] file = a.list();
        if (file == null) {
            return;
        }
        File temp = null;
        for (int i = 0; i < file.length; i++) {
            if (oldPath.endsWith(File.separator)) {
                temp = new File(oldPath + file[i]);
            } else {
                temp = new File(oldPath + File.separator + file[i]);
            }

            if (temp.isFile()) {
                FileInputStream input = new FileInputStream(temp);
                FileOutputStream output = new FileOutputStream(newPath + "/"
                        + (temp.getName()).toString());
                byte[] b = new byte[1024 * 5];
                int len;
                while ((len = input.read(b)) != -1) {
                    output.write(b, 0, len);
                }
                output.flush();
                output.close();
                input.close();
            }
            if (temp.isDirectory()) {// ��������ļ���
                copyFolder(oldPath + "/" + file[i], newPath + "/" + file[i]);
            }
        }

    }

    /**
     * ͨ��ִ��shell�ű�ǿ��ɾ��filePath
     *
     * @param filePath
     */
    public static void delByShell(String filePath) {
		/*
		if (Globals.LINUX_OS.equals(Globals.getOSType())) {
			execShell("rm -fr " + filePath);
		} else {
			filePath = filePath.replace("/", "\\");
			execShell("rd /q /s " + filePath);
		}
		*/
    }

    /**
     * ����shell�ű�
     *
     * @param shell ��Ҫ���е�shell�ű�
     */
    public static void execShell(String shell) {
        try {
            Runtime rt = Runtime.getRuntime();
            rt.exec(shell);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * �ļ����ļ����޸����֡�
     *
     * @param oldName
     * @param newName
     * @return
     */
    public boolean rename(String oldName, String newName) {
        File oldFile = new File(oldName);
        if (!oldFile.exists()) {
            return false;
        }
        return oldFile.renameTo(new File(newName));
    }

    /**
     * ���Ŀ¼����ɾ��Ŀ¼�µ������ļ��������ļ��С�
     *
     * @param filePath
     */
    public void cleanDir(String filePath) {
        File file = new File(filePath);
        if (file.isDirectory()) {
            File[] fe = file.listFiles();
            if (fe == null)
                return;
            for (int i = 0; i < fe.length; i++) {
                cleanDir(fe[i].toString());
                if (fe[i].isFile())
                    fe[i].delete();
            }
        }
        if (file.isFile())
            file.delete();
    }

    public String getFileTypeImg(String filename) {
        String str = "00.gif";
        if (filename == null || filename.trim().length() < 5) {
            str = "00.gif";
        } else {
            filename = filename.trim();
            filename = filename.substring(filename.length() - 4, filename.length());
            filename = filename.toLowerCase();

            if (filename.equals(".txt")) {
                str = "txt.gif";
            } else if (filename.equals(".xml")) {
                str = "xml.gif";
            } else if (filename.equals(".xsl") || filename.equals("xslt")) {
                str = "xsl.gif";
            } else if (filename.equals(".doc")) {
                str = "doc.gif";
            } else if (filename.equals(".css")) {
                str = "css.gif";
            } else if (filename.equals(".htm") || filename.equals("html")) {
                str = "htm.gif";
            } else if (filename.equals(".gif")) {
                str = "gif.gif";
            } else if (filename.equals(".jpg") || filename.equals("jpeg")) {
                str = "jpg.gif";
            } else if (filename.equals(".psd")) {
                str = "psd.gif";
            } else if (filename.equals(".mid")) {
                str = "mid.gif";
            } else if (filename.equals(".wav")) {
                str = "wav.gif";
            } else if (filename.equals(".avi")) {
                str = "avi.gif";
            } else if (filename.equals(".rar")) {
                str = "rar.gif";
            } else if (filename.equals(".zip")) {
                str = "zip.gif";
            } else {
                str = "00.gif";
            }
            filename = filename.substring(filename.length() - 3, filename.length());
            if (filename.equals(".js")) {
                str = "js.gif";
            }
        }
        return str;
    }


    /**
     * ת���ļ�lengthΪ���ֱ�ʾ��С�����size==0
     *
     * @param size
     * @return
     */
    public static String parseFileSize(long size) {
        if (size == 0) {
            return "0KB";
        }
        long k_size = (size / 1024) % 1024;
        long m_size = size / (1024 * 1024);
        return m_size > 0 ? (m_size + "M" + k_size + "KB") : (k_size + "KB");
    }

}
