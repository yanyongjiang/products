package com.yyj.apps.work;

import com.yyj.apps.work.model.Orgcom;
import com.yyj.utils.db.DbUtils;

import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 * ±£¥Ê ¬œÓ
 */
public class RemoveCom {
    private Map params;

    public RemoveCom(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String id = (String) params.get("id");
        return DbUtils.$removeById(Orgcom.class,id);
    }
}
