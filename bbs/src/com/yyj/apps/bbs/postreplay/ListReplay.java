package com.yyj.apps.bbs.postreplay;
import com.yyj.apps.bbs.postreplay.model.Bbsreplay;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.db.DbUtils;
import com.yyj.utils.db.Paging;
import freemarker.template.TemplateException;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * 业务模块描述:【列出回复列表】
 * 作者: 严拥江
 * 日期: 2018/03/31 11:50
 */
public class ListReplay extends CommonCmd {
    private Map params;
    public ListReplay(Map params) {
        this.params = params;
    }

    public List<Map<String, Object>> getChild(String fldreplayid) throws IOException, TemplateException {
        params.put("fldreplayid",fldreplayid);
        List<Map<String, Object>> childs=$queryForLisFtl("listReplay.sql", params);
        if(childs!=null&&childs.size()>0){
            for(Map c:childs){
                String fldreplayid2= (String) c.get("id");
                if(fldreplayid2!=null){
                    List<Map<String, Object>> childs2=getChild(fldreplayid2);
                    if(childs2!=null&&childs2.size()>0){
                        c.put("child",childs2);
                    }
                }
            }
        }
        return childs;
    }

    public Object execute() throws Exception {
        if(params.get("start")==null|| params.get("limit")==null) return null;
        Paging<Map<String, Object>> paging=$asPageFtl("listReplay.sql", params);
        if(paging!=null&&paging.getData()!=null&&paging.getData().size()>0){
            List<Map<String, Object>> postlist=paging.getData();
            params.remove("fldfromid");
            for(Map one:postlist){
                String fldreplayid= (String) one.get("id");
                if(fldreplayid!=null){
                    List<Map<String, Object>> childs=getChild(fldreplayid);
                    if(childs!=null&&childs.size()>0){
                        one.put("child",childs);
                    }
                }
            }
        }
        return paging;
    }
}
