package com.yyj.apps.bbs.postreplay;

import com.yyj.apps.bbs.postreplay.model.Bbspost;
import com.yyj.utils.db.DbUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.io.IOUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;

/**
 * 业务模块描述:【保存贴子图片或者视频】
 * 作者: 严拥江
 * 日期: 2018/03/18 11:50
 */
public class SaveAttach {
    private Map params;

    public SaveAttach(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        FileItem file= (FileItem) params.get("file");
        String filePath= (String) params.get("filePath");
         if(file!=null){
             String fileName=file.getName();
             InputStream in = file.getInputStream();
             String tofileName = filePath+ File.separator+ fileName;//文件最终上传的位置
             File tofile=new File(tofileName);
             OutputStream out = new FileOutputStream(tofile);
             IOUtils.copy(in,out);
             out.close();
             in.close();
         }
         return true;
    }
}
