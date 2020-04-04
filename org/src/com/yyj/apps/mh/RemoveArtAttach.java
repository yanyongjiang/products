package com.yyj.apps.mh;
import com.yyj.apps.mh.model.Mhattach;
import com.yyj.commonservice.CommonCmd;
import com.yyj.config.Server;
import com.yyj.utils.file.FtpUtils;

import java.io.File;
import java.util.Map;

/**
 * 业务模块描述:【保存贴子】
 * 作者: 严拥江
 * 日期: 2018/03/04 11:50
 */
public class RemoveArtAttach extends CommonCmd {
    private Map params;

    public RemoveArtAttach(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
         String id= (String) params.get("id");
         if(id==null) return false;
         Mhattach attach=$get(Mhattach.class, id);
         if(attach!=null){
              $update(Mhattach.class,id,"pkid",attach.getPkid()+"_del");
             //移动附件到删除目录
             String filestoreType = Server.getProperty("filestore.type");
             if("ftp".equals(filestoreType)){
                 FtpUtils ftp=new FtpUtils();
                 ftp.createDirecroty("removefile");
                 ftp.changeWorkingDirectory("/");
                 ftp.moveFile(id,"removefile/"+id);
                 ftp.logOut();
             }else{
                 String filePath = Server.getProperty("filestore.ftpfilePath");
                 String tofileName = filePath+File.separator + id;
                 File fileD=new File(filePath+File.separator+"removefile");
                 if  (!fileD .exists()  && !fileD .isDirectory()){
                     fileD.mkdir();
                 }
                 File tofile = new File(tofileName);
                 tofile.renameTo(new File(filePath+File.separator+"removefile"+File.separator+id));
             }
         }
         return true;
    }
}
