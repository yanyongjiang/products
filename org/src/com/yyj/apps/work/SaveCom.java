package com.yyj.apps.work;

import com.yyj.apps.work.model.Orgcom;
import com.yyj.apps.work.model.Orgcomtip;
import com.yyj.apps.work.model.Orgtask;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 * 保存事项
 */
public class SaveCom {
    private Map params;
    private String sqlPath="";

    public SaveCom(Map params) {
        this.params = params;
        this.sqlPath="/"+this.getClass().getPackage().getName().replace(".","/")+"/model/";
    }

    public Object execute() throws Exception {
        Orgcom com=new Orgcom();
        com=BeanUtils.MapToObject(com,params);
        com=DbUtils.$save(com);
        //构造意见提醒表
        String taskid = (String) params.get("fldtaskid");

        Orgtask task=DbUtils.$get(Orgtask.class,taskid);
        Timestamp time=new Timestamp(new Date().getTime());
        if(task!=null){
            String inituserid=task.getFldassginid();
            String initusername=task.getFldassgin();
            String fldbuk=task.getFldbuk();
            String fldtm=task.getFldtm();
            Map par=new HashMap<>();
            par.put("inituserid",inituserid);
            par.put("fldbuk",fldbuk);
            List<Map<String, Object>> tisUsers=DbUtils.$queryForLisFtl(this.sqlPath + "comTipUsers.sql", par);
            if(tisUsers!=null&&tisUsers.size()>0){
                for(Map oneUser:tisUsers){
                    List<Orgcomtip> tips=DbUtils.$find(Orgcomtip.class,
                            "fldacctime",null,"fldtipuserid",(String) oneUser.get("fldassginid"),"fldcomid",com.getId());
                    if(tips==null||tips.size()==0){
                        Orgcomtip tip=new Orgcomtip();
                        tip.setFlduserid(inituserid);
                        tip.setFldusername(initusername);
                        tip.setFldcretime(time);
                        tip.setFldbuk(fldbuk);
                        tip.setFldtm(fldtm);
                        tip.setFldcomid(com.getId());
                        tip.setFldtipuserid((String) oneUser.get("fldassginid"));
                        tip.setFldtipusername((String) oneUser.get("fldassgin"));
                        DbUtils.$save(tip);
                    }
                }
            }
        }
        return com;
    }
}
