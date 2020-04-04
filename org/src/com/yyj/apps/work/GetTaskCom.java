package com.yyj.apps.work;

import com.yyj.apps.work.model.Orgcom;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 * ±£´æÊÂÏî
 */
public class GetTaskCom {
    private Map params;

    public GetTaskCom(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String taskid = (String) params.get("id");
        return DbUtils.$find(Orgcom.class,"fldtaskid",taskid);
    }
}
