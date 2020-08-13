package vcom.util;

import java.io.File;

import java.io.FileWriter;

import java.io.IOException;

import java.io.Writer;

import java.text.SimpleDateFormat;

import java.util.Date;

public class WriteLog {

    public static void write(String s, String filepath) {
        //ʹ�����·������־�ļ�����Ŀ��
//		String filepath="log.txt";

        //��õ�ǰϵͳʱ��
        Date date = new Date();

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        String time = df.format(date);

        File file = new File(filepath);

        Writer out = null;

        try {
            //ʹ���ַ���
            out = new FileWriter(file, true);

            //ע�ⷴб�ܵķ���/r�ǻس���/n�ǻ���
            out.write(time + ": " + s + ";" + System.getProperty("line.separator"));
            out.flush();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static void main(String[] args) {
        write("abc", "log.txt");
    }
}