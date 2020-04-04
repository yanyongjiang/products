package com.yyj.apps.mh;

import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.db.DbUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/4/30.
 */
public class ListArticle extends CommonCmd {
    private Map params;

    public ListArticle(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        if (params.get("notpage") != null) {
            if (params.get("needAttach") != null) {
                List<Map<String, Object>> l = $queryForLisFtl("listArticle.sql", params);
                List<String> ids = new ArrayList<>();
                for (Map oneM : l) {
                    ids.add((String) oneM.get("id"));
                }
                if (ids.size() > 0) {
                    Map q = new HashMap();
                    q.put("pkids", ids);
                    q.put("fldtype", params.get("fldtype"));
                    List<Map<String, Object>> al = $queryForLisFtl("listArtAttach.sql", q);
                    for (Map oneM : l) {
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
                return l;
            }
            return $queryForLisFtl("listArticle.sql", params);
        } else if (params.get("start") == null || params.get("limit") == null) {
            return $queryForLisFtl("listArticle.sql", params);
        }
        return $asPageFtl("listArticle.sql", params);
    }
}
