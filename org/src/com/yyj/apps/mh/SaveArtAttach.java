package com.yyj.apps.mh;

import com.yyj.apps.mh.model.Mhattach;
import com.yyj.commonservice.CommonCmd;
import com.yyj.config.Server;
import com.yyj.utils.db.DbUtils;
import com.yyj.utils.file.FtpUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 业务模块描述:【保存附件】
 * 作者: 严拥江
 * 日期: 2018/09/08 11:50
 */
public class SaveArtAttach extends CommonCmd {
    private Map params;

    public SaveArtAttach(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        FileItem file = (FileItem) params.get("file");
        String filePath = Server.getProperty("filestore.ftpfilePath");
        String pkid = (String) params.get("pkid");
        String flduserid= (String) params.get("flduserid");
        String fldusername= (String) params.get("fldusername");
        String filestoreType = Server.getProperty("filestore.type");
        String fldtype = (String) params.get("fldtype");
        //removeoldpic
        String removeoldpic = (String) params.get("removeoldpic");
        if("1".equals(removeoldpic)&&fldtype!=null){
            List<Mhattach> dels=$find(Mhattach.class,"pkid",pkid,"fldtype",fldtype);
            if(dels!=null&&dels.size()>0){
                for(Mhattach onedel:dels){
                    Map reM=new HashMap();
                    reM.put("id",onedel.getId());
                    new RemoveArtAttach(reM).execute();
                }
            }
        }
        if (file != null) {
            String fileName = file.getName();
            InputStream in = file.getInputStream();
            String id = DbUtils.uuid();
            String tofileName = filePath + File.separator + id;//文件最终上传的位置
            Mhattach attach = new Mhattach();
            attach.setId(id);
            attach.setFldfilename(fileName);
            attach.setFldngdate(new Timestamp(new Date().getTime()));
            attach.setPkid(pkid);
            attach.setFldpath(id);
            attach.setFlduserid(flduserid);
            attach.setFldusername(fldusername);
            if(fldtype!=null) attach.setFldtype(fldtype);
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
