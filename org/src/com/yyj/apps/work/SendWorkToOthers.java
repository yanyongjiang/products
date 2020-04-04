package com.yyj.apps.work;

import com.yyj.apps.work.model.Orgtask;
import com.yyj.apps.work.model.Orgwork;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 */
public class SendWorkToOthers {
    private Map params;
    private String sqlPath="";

    public SendWorkToOthers(Map params) {
        this.params = params;
        this.sqlPath="/"+this.getClass().getPackage().getName().replace(".","/")+"/model/";
    }

    public Object execute() throws Exception {
        String taskid = (String) params.get("taskid");
        if (taskid == null) return null;
        String toUserids = (String) params.get("toUserids");
        String toUserNames = (String) params.get("toUserNames");
        //toUserfldassginunitnames
        String toUserfldassginunitnames = (String) params.get("toUserfldassginunitnames");
        String toUserfldassginunitids = (String) params.get("toUserfldassginunitids");

        String toUserfldassgindeptnames = (String) params.get("toUserfldassgindeptnames");
        String toUserfldassgindeptids = (String) params.get("toUserfldassgindeptids");

        String toUserfldassginbms = (String) params.get("toUserfldassginbms");
        String toUserfldassginbmids = (String) params.get("toUserfldassginbmids");

        String sendUser = (String) params.get("sendUser");
        String sendUserid = (String) params.get("sendUserid");
        Orgtask task = DbUtils.$get(Orgtask.class, taskid);
        if (task==null) return null;
        Timestamp time=new Timestamp(new Date().getTime());
        Map updateM=new HashMap<>();
        updateM.put("fldassginid",task.getFldassginid());
        updateM.put("fldbuk",task.getFldbuk());
        DbUtils.$asUpdateFtl(this.sqlPath+"updateTaskLast.sql",updateM);
        DbUtils.$update(Orgtask.class,taskid,"fldfinishtime",time,"fldlast","1");
        if (toUserids != null && toUserNames != null) {
            String[] toUseridsA = toUserids.split(",");
            String[] toUserNamesA=toUserNames.split(",");

            String[] fldassginunitnameA=toUserfldassginunitnames.split(",");
            String[] fldassginunitidA=toUserfldassginunitids.split(",");
            String[] fldassgindeptnameA=toUserfldassgindeptnames.split(",");
            String[] fldassgindeptidA=toUserfldassgindeptids.split(",");
            String[] fldassginbmA=toUserfldassginbms.split(",");
            String[] fldassginbmidA=toUserfldassginbmids.split(",");
            int i=0;
            for (String toUser : toUseridsA) {
                 task.setId(null);
                 task.setFldsend(sendUser);
                 task.setFldsendid(sendUserid);
                 task.setFldassginid(toUser);
                 task.setFldassgin(toUserNamesA[i]);
                 task.setFldassginunitname(fldassginunitnameA[i]);
                 task.setFldassginunitid(fldassginunitidA[i]);
                 task.setFldassgindeptname(fldassgindeptnameA[i]);
                 task.setFldassgindeptid(fldassgindeptidA[i]);
                 task.setFldassginbm(fldassginbmA[i]);
                 task.setFldassginbmid(fldassginbmidA[i]);
                 task.setFldcretime(time);
                 task.setFldassgintime(null);
                 task.setFldfinishtime(null);
                 task.setFldlast("1");
                 task.setFldpretaskid(taskid);
                 task.setState(null);
                 DbUtils.$save(task);
                 i++;
            }
        }

        return true;
    }
}
