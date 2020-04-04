package com.yyj.apps.es.index.model;

import com.yyj.commonservice.CommonCmd;

import java.util.List;
import java.util.Map;

import static com.yyj.utils.db.DbUtils.$asUpdateFtl;

/**
 * Created by yyj on 2018/9/8.
 * 更新附件pkId
 */
public class CopyEsAttach extends CommonCmd {
    private Map params;
    public CopyEsAttach(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String frompkid = (String) params.get("frompkid");
        String topkid = (String) params.get("topkid");
        List<Esattach> esl=$find(Esattach.class,"pkid",frompkid);
        if(esl!=null&&esl.size()>0){
            for(Esattach es:esl){
                es.setPkid(topkid);
                es.setId(null);
                $save(es);
            }
        }
        return true;
     }
}
