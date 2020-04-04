package com.yyj.commonservice;


import com.yyj.servlet.control.ControlService;
import com.yyj.utils.db.DbUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Map;

/**
 * 业务模块描述:【根据id获取记录】
 * 作者: 严拥江
 * 日期: 2018/04/21 11:50
 */
public class UpdateJsCssVer {
    private Map params;
    private ControlService controlService;
    public UpdateJsCssVer(Map params, HttpServletRequest request
            , HttpServletResponse response, ControlService controlService) {
        this.params = params;
        this.controlService=controlService;
    }

    public Object execute() throws Exception {
        String v= (String) params.get("v");
        String path=controlService.getServletContext().getRealPath("");
        File files = new File(path);
        String[] filelist = files.list();
        for (int i = 0; i < filelist.length; i++) {
            File file = new File(path +File.separator+ filelist[i]);
            if (!file.isDirectory()) {
                String fileName=file.getName();
                if(fileName.endsWith(".html")){
                    FileInputStream in = new FileInputStream(file);
                    InputStreamReader reader = new InputStreamReader(in,"UTF-8");
                    BufferedReader bReader = new BufferedReader(reader);
                    StringBuilder sb = new StringBuilder();
                    String s = "";
                    while ((s =bReader.readLine()) != null) {
                        String trims=s.trim();//<script type="text/javascript"
                        if((trims.startsWith("<script src=\"/")||trims.startsWith("<script type=\"text/javascript\""))&&trims.endsWith("\"></script>")){
                            String[] sr=s.split("\\.js");
                            sr[0]=sr[0]+".js?v="+v+"\"></script>";
                            sb.append(sr[0] + "\n");
                        }else if (trims.startsWith("<link rel=\"stylesheet\"")&&trims.endsWith("\">")){
                            String[] sr=s.split("\\.css");
                            sr[0]=sr[0]+".css?v="+v+"\">";
                            sb.append(sr[0] + "\n");
                        }
                        else{
                            sb.append(s + "\n");
                        }
                    }
                    bReader.close();
                    in.close();
                    String str = sb.toString();
                    FileOutputStream fos = new FileOutputStream(path +File.separator+ filelist[i]);
                    OutputStreamWriter osw = new OutputStreamWriter(fos, "UTF-8");
                    osw.write(str);
                    osw.flush();
                }
            }
        }
        return true;
    }
}
