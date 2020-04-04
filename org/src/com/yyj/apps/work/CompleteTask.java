package com.yyj.apps.work;

import com.yyj.apps.work.model.Orgcom;
import com.yyj.apps.work.model.Orgtask;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 * ±£¥Ê ¬œÓ
 */
public class CompleteTask {
    private Map params;
    private String sqlPath="";

    public CompleteTask(Map params) {
        this.params = params;
        this.sqlPath="/"+this.getClass().getPackage().getName().replace(".","/")+"/model/";
    }

    public Object execute() throws Exception {
        String id = (String) params.get("id");
        String fldfinishtime=(String) params.get("fldfinishtime");
        Orgtask task = DbUtils.$get(Orgtask.class, id);
        Map updateM=new HashMap<>();
        updateM.put("fldassginid",task.getFldassginid());
        updateM.put("fldbuk",task.getFldbuk());
        DbUtils.$asUpdateFtl(this.sqlPath+"updateTaskLast.sql",updateM);
        if(fldfinishtime!=null){
            return  DbUtils.$update(Orgtask.class,id,"fldfinishtime",fldfinishtime,"fldlast","1");
        }
        Timestamp time=new Timestamp(new Date().getTime());
        return  DbUtils.$update(Orgtask.class,id,"fldfinishtime",time,"fldlast","1");
    }
}
