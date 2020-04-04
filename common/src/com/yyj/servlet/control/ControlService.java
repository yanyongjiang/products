package com.yyj.servlet.control;

import com.yyj.config.Server;
import com.yyj.utils.file.FtpUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.JSONTokener;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URLEncoder;
import java.sql.Timestamp;
import java.util.*;

/**
 * 业务模块描述:【请求service跳转器，返回相应数据】
 * 作者: 严拥江
 * 日期: 2018/03/03 11:50
 */
public class ControlService extends HttpServlet {
    private static Logger logger = LogManager.getLogger(LogManager.ROOT_LOGGER_NAME);

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        try {
            //根据url找到相应的class文件
            String url = request.getRequestURI();
            //将请求参数转成map，生成调用实例执行execute
            String servicePath = url.substring(url.indexOf("/service/") + 9);
            servicePath = servicePath.replace("-", ".");
            String classPackageHome = Server.getProperty("classPackageHome");

            String classpath = classPackageHome + servicePath;
            if(servicePath.indexOf("commonservice")!=-1){
                classpath="com.yyj."+servicePath;
            }
            String firstName = classpath.substring(classpath.lastIndexOf(".") + 1, classpath.lastIndexOf(".") + 2);
            StringBuilder sb = new StringBuilder(classpath);
            sb.replace(classpath.lastIndexOf(".") + 1, classpath.lastIndexOf(".") + 2, firstName.toUpperCase());
            classpath = sb.toString();
            Map executeMap = new HashMap<>();
            List<Map> executeMapA=new ArrayList<>();
            Enumeration paramNames = request.getParameterNames();
            while (paramNames.hasMoreElements()) {
                String paraName = (String) paramNames.nextElement();
                String[] paramValues = request.getParameterValues(paraName);
                if (paramValues.length == 1) {
                    String paramValue = paramValues[0];
                    if (paramValue.length() == 0) {
                        Object json = new JSONTokener(paraName).nextValue();
                        if (json instanceof JSONArray){
                            JSONArray keyval= (JSONArray) json;
                            if(keyval!=null){
                                List<Map> tolist= (List<Map>) JSONArray.toCollection(keyval,Map.class);
                                if(tolist!=null&&tolist.size()>0)
                                    executeMapA.addAll(tolist);
                            }
                        }
                    } else {
                        executeMap.put(paraName, paramValue);
                    }
                } else {
                    executeMap.put(paraName, paramValues);
                }
            }
            if (ServletFileUpload.isMultipartContent(request)) {
                DiskFileItemFactory factory = new DiskFileItemFactory();
                ServletFileUpload upload = new ServletFileUpload(factory);
                upload.setHeaderEncoding("UTF-8");
                List<FileItem> list = null;
                List<FileItem> files = new ArrayList<>();
                try {
                    list = upload.parseRequest(request);
                } catch (Exception e) {
                    logger.error("IllegalAccessException:" + e.getMessage());
                    e.printStackTrace();
                } catch (Throwable e) {
                    logger.error("IllegalAccessException:" + e.getMessage());
                    e.printStackTrace();
                }
                for (FileItem item : list) {
                    if (item.isFormField()) {
                        executeMap.put(item.getFieldName(), item.getString("UTF-8"));
                    } else {
                        files.add(item);
                    }
                }
                if (files.size() > 0) {
                    if (files.size() == 1)
                        executeMap.put("file", files.get(0));
                    else executeMap.put("files", files);
                }
            }
            Class c = null;
            Object result = null;
            try {
                c = Class.forName(classpath);
                Constructor[] cons = c.getDeclaredConstructors();
                Constructor con = cons[0];
                Class[] parameterTypes = con.getParameterTypes();
                if (parameterTypes.length == 1) {
                    Object obj = null;
                    if(executeMapA.size()>0){
                        obj = con.newInstance(executeMapA);
                    }else{
                        obj = con.newInstance(executeMap);
                    }
                    Method m = c.getMethod("execute");
                    result = m.invoke(obj);
                } else if (parameterTypes.length == 2) {
                    Object obj = null;
                    if(executeMapA.size()>0){
                        obj = con.newInstance(executeMapA, request);
                    }else{
                        obj = con.newInstance(executeMap, request);
                    }
                    Method m = c.getMethod("execute");
                    result = m.invoke(obj);
                } else if (parameterTypes.length == 3) {
                    Object obj = null;
                    if(executeMapA.size()>0){
                        obj = con.newInstance(executeMapA, request, response);
                    }else{
                        obj = con.newInstance(executeMap, request, response);
                    }
                    Method m = c.getMethod("execute");
                    result = m.invoke(obj);
                } else if (parameterTypes.length == 4) {
                    Object obj = null;
                    if(executeMapA.size()>0){
                        obj = con.newInstance(executeMapA, request, response, this);
                    }else{
                        obj = con.newInstance(executeMap, request, response, this);
                    }
                    Method m = c.getMethod("execute");
                    result = m.invoke(obj);
                }
            } catch (ClassNotFoundException e) {
                logger.error("ClassNotFoundException:",e);
                Writer writer = new StringWriter();
                e.printStackTrace(new PrintWriter(writer));
                result=writer.toString();
            } catch (InvocationTargetException e) {
                logger.error("InvocationTargetException:",e);
                Writer writer = new StringWriter();
                e.printStackTrace(new PrintWriter(writer));
                result=writer.toString();
            } catch (InstantiationException e) {
                logger.error("InstantiationException:",e);
                Writer writer = new StringWriter();
                e.printStackTrace(new PrintWriter(writer));
                result=writer.toString();
            } catch (IllegalAccessException e) {
                logger.error("IllegalAccessException:",e);
                Writer writer = new StringWriter();
                e.printStackTrace(new PrintWriter(writer));
                result=writer.toString();
            } catch (NoSuchMethodException e) {
                logger.error("NoSuchMethodException:",e);
                Writer writer = new StringWriter();
                e.printStackTrace(new PrintWriter(writer));
                result=writer.toString();
            }catch (Exception e) {
                logger.error("NoSuchMethodException:" ,e);
                Writer writer = new StringWriter();
                e.printStackTrace(new PrintWriter(writer));
                result=writer.toString();
            }
            if (result instanceof Map && ((Map) result).get("ftp") != null) {
                FtpUtils ftp = (FtpUtils) ((Map) result).get("ftp");
                String filename = URLEncoder.encode((String) ((Map) result).get("filename"), "utf-8"); //解决中文文件名下载后乱码的问题
                String ftpfilename = (String) ((Map) result).get("ftpfilename");
                String ftpfilesize = (String) ((Map) result).get("ftpfilesize").toString();
                response.setCharacterEncoding("utf-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + filename + "");
                try {
                    ServletOutputStream out = response.getOutputStream();
                    ftp.getFtpClient().retrieveFile(ftpfilename, out);
                    response.setHeader("Content-Length",ftpfilesize);
                    out.flush();
                    out.close();
                } finally {
                    if (ftp != null) {
                        ftp.logOut();
                    }
                }
            }
            else if (result instanceof Map && ((Map) result).get("file") != null) {
                File file = (File) ((Map) result).get("file");
                String filename = URLEncoder.encode((String) ((Map) result).get("filename"), "utf-8"); //解决中文文件名下载后乱码的问题
                response.setCharacterEncoding("utf-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + filename + "");
                //获取响应报文输出流对象
                FileInputStream in = null;
                try {
                    ServletOutputStream out = response.getOutputStream();
                    in = new FileInputStream(file);
                    byte[] b = new byte[10240];
                    int temp = 0;
                    int readLen = 0;
                    while ((temp = in.read(b)) != -1) {
                        readLen += temp;
                        out.write(b, 0, temp);
                    }
                    response.setHeader("Content-Length", String.valueOf(readLen));
                    //输出
                    out.write(b);
                    out.flush();
                    out.close();
                } finally {
                    if (in != null) {
                        in.close();
                    }
                }
            } else {
                //返回数据给浏览器
                response.setCharacterEncoding("utf-8");
                PrintWriter out = response.getWriter();
                //response.setContentType("application/json; charset=utf-8");
                response.setContentType("text/html; charset=utf-8");
                if (result instanceof JSONObject) {
                    out.print(result.toString());
                } else {
                    Map resultMap = new HashMap<>();
                    resultMap.put("result", result);
                    resultMap.put("success", true);
                    JsonConfig config = new JsonConfig();
                    config.registerJsonValueProcessor(Timestamp.class, new DateJsonValueProcessor("yyyy-MM-dd HH:mm:ss"));
                    JSONObject responseJSONObject = JSONObject.fromObject(resultMap, config);
                    out.print(responseJSONObject.toString());
                }
                out.flush();
                out.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getMessage());
            throw e;
        }
    }
}
