package com.yyj.apps.work;

import com.yyj.apps.work.model.Orgcom;
import com.yyj.apps.work.model.Orgtask;
import com.yyj.apps.work.model.Orgwork;
import com.yyj.utils.db.DbUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 * ±£¥Ê ¬œÓ
 */
public class SoftRemoveTask {
    private Map params;
    private String sqlPath="";

    public SoftRemoveTask(Map params) {
        this.params = params;
        this.sqlPath="/"+this.getClass().getPackage().getName().replace(".","/")+"/model/";
    }

    public Object execute() throws Exception {
        String ids = (String) params.get("ids");
        if (ids==null) return null;
        String[] idsA=ids.split(",");
        for(String oneid:idsA){
            Orgtask task = DbUtils.$get(Orgtask.class, oneid);
            if(task!=null){
                String buk=task.getFldbuk();
                Map p1=new HashMap<>();
                p1.put("fldbuk",buk);
                DbUtils.$asUpdateFtl(this.sqlPath+"softRemoveTask.sql",p1);
                DbUtils.$update(Orgwork.class, buk,"state","1");
            }
        }
        return null;
    }
}
