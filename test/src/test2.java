import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by yyj on 2018/5/21.
 */
public class test2 {
    public static void main(String[] args) throws IOException, TemplateException {

        int v=2;
        File file = new File("D:\\work\\product1\\test\\src\\2.html");//定义一个file对象，用来初始化FileReader
        FileInputStream in = new FileInputStream(file);
        InputStreamReader reader = new InputStreamReader(in,"UTF-8");//定义一个fileReader对象，用来初始化BufferedReader
        BufferedReader bReader = new BufferedReader(reader);//new一个BufferedReader对象，将文件内容读取到缓存
        StringBuilder sb = new StringBuilder();//定义一个字符串缓存，将字符串存放缓存中
        String s = "";
        while ((s =bReader.readLine()) != null) {//逐行读取文件内容，不读取换行符和末尾的空格
            String trims=s.trim();
            if(trims.startsWith("<script src=\"/")&&trims.endsWith("\"></script>")){
                String[] sr=s.split("\\.js");
                sr[0]=sr[0]+".js?v="+v+"\"></script>";
                sb.append(sr[0] + "\n");
            }else if (trims.startsWith("<link rel=\"stylesheet\"")&&trims.endsWith(".css\">")){
                String[] sr=s.split("\\.css");
                sr[0]=sr[0]+".css?v="+v+"\">";
                sb.append(sr[0] + "\n");
            }
            else{
                sb.append(s + "\n");
            }
            //System.out.println(s);
        }
        bReader.close();
        in.close();
        String str = sb.toString();
        System.out.println(str);
//        File file1 = new File("D:\\work\\product1\\test\\src\\2v1.html");
//        BufferedWriter bw = new BufferedWriter(new FileWriter(file1,"utf-8"));
//        bw.write(str);
//        bw.flush();
//        bw.close();
        FileOutputStream fos = new FileOutputStream("D:\\work\\product1\\test\\src\\2.html");
        OutputStreamWriter osw = new OutputStreamWriter(fos, "UTF-8");
        osw.write(str);
        osw.flush();

    }

}
