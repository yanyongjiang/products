package com.yyj.apps.bbs.postreplay;

import com.yyj.apps.bbs.postreplay.model.Bbspost;
import com.yyj.apps.bbs.postreplay.model.Bbsreplay;
import com.yyj.apps.bbs.postreplay.model.Bbsreplaytips;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 业务模块描述:【保存贴子】
 * 作者: 严拥江
 * 日期: 2018/03/04 11:50
 */
public class SaveReplay extends CommonCmd {
    private Map params;

    public SaveReplay(Map params) {
        this.params = params;
    }

    public void getTipsUser(String replayid,List<String> tips){
        Bbsreplay replay =$get(Bbsreplay.class,replayid);
        if(replay!=null){
            if(!tips.contains(replay.getFlduserid())){
                tips.add(replay.getFlduserid());
            }
            List<Bbsreplay> child=$find(Bbsreplay.class,"fldreplayid",replay.getId());
            if(child!=null&&child.size()>0){
                for(int i=0;i<child.size();i++){
                    getTipsUser(child.get(i).getId(),tips);
                }
            }
        }
    }
    public Object execute() throws Exception {
        Timestamp time=new Timestamp(new Date().getTime());
        Bbsreplay replay = new Bbsreplay();
        replay = BeanUtils.MapToObject(replay, params);
        replay.setFldstatus("1");
        replay.setFldngdate(time);
        int fldsn = $asIntFtl("saveReplay.sql", params);
        fldsn = fldsn + 1;
        replay.setFldsn(fldsn);
        replay = $save(replay);
        Bbsreplaytips bbsreplaytips = new Bbsreplaytips();
        bbsreplaytips.setFlduserid(replay.getFlduserid());
        bbsreplaytips.setFldpostid(replay.getFldfromid());
        bbsreplaytips.setFldreplayid(replay.getId());
        bbsreplaytips.setFldreplayrid(replay.getFldreplayid());
        bbsreplaytips.setFldngdate(time);
        List<String> tips=new ArrayList<>();
        //贴子人
        Bbspost post=$get(Bbspost.class,replay.getFldfromid());
        if(post!=null)
        tips.add(post.getFlduserid());
        //回复人
        getTipsUser(replay.getFldreplayid(),tips);
        if(tips.size()>0){
            for(String userid:tips){
                  if(!replay.getFlduserid().equals(userid)){
                      bbsreplaytips.setFldtipuserid(userid);
                      $save(bbsreplaytips);
                  }
            }
        }
        return replay;
    }
}
