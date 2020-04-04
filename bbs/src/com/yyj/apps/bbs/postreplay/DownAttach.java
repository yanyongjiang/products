package com.yyj.apps.bbs.postreplay;

import com.yyj.apps.bbs.postreplay.model.Bbspost;
import com.yyj.utils.db.DbUtils;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;

/**
 * 业务模块描述:【保存贴子图片或者视频】
 * 作者: 严拥江
 * 日期: 2018/03/18 11:50
 */
public class DownAttach {
    private Map params;

    public DownAttach(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
         Bbspost post=new Bbspost();
         String fldtm= (String) params.get("fldtm");
         String fldcontent= (String) params.get("fldcontent");
         post.setFldcontent(fldcontent);
         post.setFldtm(fldtm);
         post.setFldstatus("1");
         post.setFldngdate(new Timestamp(new Date().getTime()));
         return DbUtils.$save(post);
    }
}
