package com.yyj.apps.org;

import com.yyj.apps.org.model.Orgdept;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 */
public class Updatefldsn {
    private List<Map> params;

    public Updatefldsn(List<Map> params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        if(params!=null&&params.size()>0){
            for(Map one:params){
               String id= (String) one.get("id");
               int fldsn= (int) one.get("fldsn");
               DbUtils.$update(Orgdept.class,id,"fldsn",fldsn);
            }
        }
        return true;
    }
}
