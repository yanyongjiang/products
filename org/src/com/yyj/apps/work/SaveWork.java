package com.yyj.apps.work;

import com.yyj.apps.org.GetMaxUserSn;
import com.yyj.apps.org.model.Orgdeptuser;
import com.yyj.apps.org.model.Orguser;
import com.yyj.apps.work.model.Orgtask;
import com.yyj.apps.work.model.Orgwork;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 */
public class SaveWork {
    private Map params;

    public SaveWork(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        Orgwork work=new Orgwork();
        work=BeanUtils.MapToObject(work,params);
        Orgtask task=null;
        if(work.getId()!=null){
            work=DbUtils.$save(work);
        }else{
            work=DbUtils.$save(work);
            Timestamp time=new Timestamp(new Date().getTime());
            task=new Orgtask();
            task=BeanUtils.MapToObject(task,params);
            task.setFldtm(work.getFldtm());
            task.setFldassgin(work.getInitusername());
            task.setFldassginid(work.getInituserid());
            task.setFldassginunitname(work.getInitunitname());
            task.setFldassginunitid(work.getInitunitid());
            task.setFldassgindeptname(work.getInitdeptname());
            task.setFldassgindeptid(work.getInitdeptid());
            task.setFldassginbm(work.getInitbm());
            task.setFldassginbmid(work.getInitbmid());
            task.setFldassgintime(time);
            task.setFldcretime(time);
            task.setFldbuk(work.getId());
            task.setFldlast("1");
            task=DbUtils.$save(task);
            //Î¬»¤×÷ÕßÓò
            Map auth=new HashMap<>();
            auth.put("fldbuk",work.getId());
            auth.put("flduserid",work.getInituserid());
            new SaveAuth(auth).execute();
        }
        Map r=new HashMap<>();
        r.put("work",work);
        r.put("task",task);
        return r;
    }
}
