package com.yyj.apps.work;

import com.yyj.apps.work.model.Orgattach;
import com.yyj.config.Server;
import com.yyj.utils.db.DbUtils;
import com.yyj.utils.file.FtpUtils;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

/**
 * 业务模块描述:【保存贴子图片或者视频】
 * 作者: 严拥江
 * 日期: 2018/03/18 11:50
 */
public class DownUeAttach {
    private Map params;

    public DownUeAttach(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
         String id= (String) params.get("id");
         String filePath = Server.getProperty("filestore.ftpfilePath");
         if(id==null) return null;
         Orgattach bbsattach=DbUtils.$get(Orgattach.class,id);
         if(bbsattach==null) return null;
         String filestoreType = Server.getProperty("filestore.type");
         if("ftp".equals(filestoreType)){
             FtpUtils ftp=new FtpUtils();
             if(ftp.existFile(id)){
                 Map result=new HashMap<>();
                 result.put("ftp",ftp);
                 result.put("filename",bbsattach.getFldfilename());
                 result.put("ftpfilename",id);
                 result.put("ftpfilesize",ftp.getFileSize(id));
                 return result;
             }
             return null;
         }else{
             Map result=new HashMap<>();
             result.put("filename",bbsattach.getFldfilename());
             File file=new File(filePath+File.separator+id);
             if(!file.exists()) return null;
             result.put("file",file);
             return result;
         }
    }
}
