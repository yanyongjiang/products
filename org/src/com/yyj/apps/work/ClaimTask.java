package com.yyj.apps.work;

import com.yyj.apps.work.model.Orgtask;
import com.yyj.utils.db.DbUtils;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 * ±£´æÊÂÏî
 */
public class ClaimTask {
    private Map params;

    public ClaimTask(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String id = (String) params.get("id");
        String fldbuk=(String) params.get("fldbuk");
        String flduserid=(String) params.get("flduserid");
        String fldassgintime=(String) params.get("fldassgintime");
        Map auth=new HashMap<>();
        auth.put("fldbuk",fldbuk);
        auth.put("flduserid",flduserid);
        new SaveAuth(auth).execute();
        if(fldassgintime!=null){
            return  DbUtils.$update(Orgtask.class,id,"fldassgintime",fldassgintime);
        }
        Timestamp time=new Timestamp(new Date().getTime());
        return  DbUtils.$update(Orgtask.class,id,"fldassgintime",time);
    }
}
