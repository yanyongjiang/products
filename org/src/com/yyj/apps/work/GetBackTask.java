package com.yyj.apps.work;

import com.yyj.apps.work.model.Orgcom;
import com.yyj.apps.work.model.Orgtask;
import com.yyj.utils.db.DbUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 * 保存事项
 */
public class GetBackTask {
    private Map params;
    private String sqlPath="";
    public GetBackTask(Map params) {
        this.params = params;
        this.sqlPath="/"+this.getClass().getPackage().getName().replace(".","/")+"/model/";
    }

    public Object execute() throws Exception {
        String taskid = (String) params.get("id");
        Orgtask task= DbUtils.$get(Orgtask.class,taskid);
        Map r=new HashMap<>();
        if(task!=null){
            List<Orgtask> sendTasks=DbUtils.$find(Orgtask.class,"fldpretaskid",taskid,"fldassgintime","not null");
            if(sendTasks!=null&&sendTasks.size()>0){
                r.put("assginTasks",sendTasks);
            }else{
                DbUtils.$remove(Orgtask.class,"fldpretaskid",taskid);
                if(task.getFldpretaskid()==null){
                    DbUtils.$update(Orgtask.class,taskid,"fldfinishtime",null,"state","2");
                }else{
                    DbUtils.$update(Orgtask.class,taskid,"fldfinishtime",null);
                }
                //把完成时间最大一条改成最后已办一条。
                Map updateM=new HashMap<>();
                updateM.put("fldassginid",task.getFldassginid());
                updateM.put("fldbuk",task.getFldbuk());
                DbUtils.$asUpdateFtl(this.sqlPath+"getBackTask.sql",updateM);
            }
        }
        return r;
    }
}
