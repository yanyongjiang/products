package com.yyj.apps.es.index;
import com.yyj.apps.es.index.model.Esattach;
import com.yyj.commonservice.CommonCmd;
import com.yyj.config.Server;
import com.yyj.utils.db.DbUtils;
import com.yyj.utils.file.FtpUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.io.IOUtils;
import java.io.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;

/**
 * 业务模块描述:【保存附件】
 * 作者: 严拥江
 * 日期: 2018/09/08 11:50
 */
public class SaveEsAttach extends CommonCmd {
    private Map params;

    public SaveEsAttach(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        FileItem file = (FileItem) params.get("file");
        String filePath = Server.getProperty("filestore.ftpfilePath");
        String pkid = (String) params.get("pkid");
        String flduserid= (String) params.get("flduserid");
        String fldusername= (String) params.get("fldusername");
        String filestoreType = Server.getProperty("filestore.type");
        if (file != null) {
            String fileName = file.getName();
            InputStream in = file.getInputStream();
            String id = DbUtils.uuid();
            String tofileName = filePath + File.separator + id;//文件最终上传的位置
            Esattach attach = new Esattach();
            attach.setId(id);
            attach.setFldfilename(fileName);
            attach.setFldngdate(new Timestamp(new Date().getTime()));
            attach.setPkid(pkid);
            attach.setFldpath(id);
            attach.setFlduserid(flduserid);
            attach.setFldusername(fldusername);
            File tofile =null;
            long fldsize=0;
            if("ftp".equals(filestoreType)){
                    FtpUtils ftp=new FtpUtils();
                    ftp.uploadFile(id,in);
                    fldsize=ftp.getFileSize(id);
                    ftp.logOut();
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
            return $save(attach);
        }
        return null;
    }
}
