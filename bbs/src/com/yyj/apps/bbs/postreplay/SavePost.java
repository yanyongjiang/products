package com.yyj.apps.bbs.postreplay;

import com.yyj.apps.bbs.postreplay.model.Bbspost;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;
import java.sql.Timestamp;
import java.util.*;

/**
 * 业务模块描述:【保存贴子】
 * 作者: 严拥江
 * 日期: 2018/03/04 11:50
 */
public class SavePost {
    private Map params;

    public SavePost(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
         Bbspost post=new Bbspost();
         post= BeanUtils.MapToObject(post, params);
         if(post.getFldngdate()==null)
         post.setFldngdate(new Timestamp(new Date().getTime()));
         if(post.getFldstatus()==null)
         post.setFldstatus("1");
         return DbUtils.$save(post);
    }
}
