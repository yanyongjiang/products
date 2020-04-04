package com.yyj.apps.mh;

import com.yyj.commonservice.CommonCmd;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/11/24.
 */
public class ListShowCol extends CommonCmd {
    private Map params;

    public ListShowCol(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        List<Map<String, Object>> mapList=$queryForLisFtl("listShowCol.sql",params);
        if (params.get("needarticle")!= null) {
            for(Map onecol:mapList){
                if(params.get("artlimit")!= null){
                    params.put("limit",params.get("artlimit"));
                }
                params.put("fldlmid",onecol.get("id"));
                List artlist=$queryForLisFtl("listArticle.sql", params);
                onecol.put("artlist",artlist);
            }
        }
        if (params.get("fldpicnotnull")!= null) {
            List<String> ids = new ArrayList<>();
            for (Map oneM : mapList) {
                ids.add((String) oneM.get("id"));
            }
            if (ids.size() > 0) {
                Map q = new HashMap();
                q.put("pkids", ids);
                q.put("fldtype", params.get("fldtype"));
                List<Map<String, Object>> al = $queryForLisFtl("listArtAttach.sql", q);
                for (Map oneM : mapList) {
                    String pkid = (String) oneM.get("id");
                    List<Map> attl = new ArrayList<>();
                    for (Map attoneM : al) {
                        String attpkid = (String) attoneM.get("pkid");
                        if (pkid.equals(attpkid)) {
                            attl.add(attoneM);
                        }
                    }
                    if (attl.size() > 0)
                        oneM.put("attachs", attl);
                }
            }
        }
        return mapList;
    }
}
