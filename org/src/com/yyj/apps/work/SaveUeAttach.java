package com.yyj.apps.work;

import com.yyj.apps.work.model.Orgattach;
import com.yyj.config.Server;
import com.yyj.utils.db.DbUtils;
import com.yyj.utils.file.FtpUtils;
import net.sf.json.JSONObject;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.io.IOUtils;
import sun.misc.BASE64Decoder;

import java.io.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 业务模块描述:【保存贴子图片或者视频】
 * 作者: 严拥江
 * 日期: 2018/03/18 11:50
 */
public class SaveUeAttach {
    private Map params;

    public SaveUeAttach(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        FileItem file = (FileItem) params.get("file");
        String filePath = Server.getProperty("filestore.ftpfilePath");
        String pkid = (String) params.get("pkid");
        String upfile = (String) params.get("upfile");
        String filestoreType = Server.getProperty("filestore.type");
        if (file != null) {
            String fileName = file.getName();
            InputStream in = file.getInputStream();
            String id = DbUtils.uuid();
            String tofileName = filePath + File.separator + id;//文件最终上传的位置
            Orgattach attach = new Orgattach();
            attach.setId(id);
            attach.setFldfilename(fileName);
            attach.setFldngdate(new Timestamp(new Date().getTime()));
            attach.setPkid(pkid);
            attach.setFldpath(id);
            File tofile =null;
            long fldsize=0;
            if("ftp".equals(filestoreType)){
                    FtpUtils ftp=new FtpUtils();
                    ftp.uploadFile(id,in);
                    fldsize=ftp.getFileSize(id);
            }
            else {
                tofile = new File(tofileName);
                OutputStream out = new FileOutputStream(tofile);
                IOUtils.copy(in, out);
                out.close();
                fldsize = tofile.length();
            }
            if(in!=null) in.close();
            attach.setFldsize(fldsize + "");
            String ext = "";
            if (fileName.indexOf(".") != -1) {
                ext = fileName.substring(fileName.indexOf("."));
            }
            attach.setFldsize(fldsize + "");
            attach.setFldext(ext);
            DbUtils.$save(attach);
            Map result = new HashMap<>();
            result.put("original", fileName);
            result.put("size", fldsize + "");
            result.put("state", "SUCCESS");
            result.put("title", fileName);
            result.put("type", ext);
            result.put("url", "/service/work-downUeAttach?id=" + id);
            return JSONObject.fromObject(result);
        } else if (upfile != null) {
            String id = DbUtils.uuid();

            BASE64Decoder decoder = new BASE64Decoder();
            // Base64解码
            byte[] b = decoder.decodeBuffer(upfile);
            for (int i = 0; i < b.length; ++i) {
                if (b[i] < 0) {// 调整异常数据
                    b[i] += 256;
                }
            }
            String fileName = id + "_tyupfilet.jpg";
            //ByteArrayInputStream in = new ByteArrayInputStream(upfile.getBytes("UTF-8"));
            ByteArrayInputStream in = new ByteArrayInputStream(b);
            String tofileName = filePath + File.separator + id;//文件最终上传的位置
            Orgattach attach = new Orgattach();
            attach.setId(id);
            attach.setFldfilename(fileName);
            attach.setFldngdate(new Timestamp(new Date().getTime()));
            attach.setPkid(pkid);
            attach.setFldpath(id);

            File tofile =null;
            long fldsize=0;
            if("ftp".equals(filestoreType)){
                FtpUtils ftp=new FtpUtils();
                ftp.uploadFile(id,in);
                fldsize=ftp.getFileSize(id);
            }
            else {
                tofile = new File(tofileName);
                OutputStream out = new FileOutputStream(tofile);
                IOUtils.copy(in, out);
                out.close();
                fldsize = tofile.length();
            }
            attach.setFldsize(fldsize + "");
            String ext = "";
            if (fileName.indexOf(".") != -1) {
                ext = fileName.substring(fileName.indexOf("."));
            }
            attach.setFldsize(fldsize + "");
            attach.setFldext(ext);
            DbUtils.$save(attach);
            Map result = new HashMap<>();
            result.put("original", fileName);
            result.put("size", fldsize + "");
            result.put("state", "SUCCESS");
            result.put("title", fileName);
            result.put("type", ext);
            result.put("url", "/service/work-downUeAttach?id=" + id);
            return JSONObject.fromObject(result);
        }
        return null;
    }
}
