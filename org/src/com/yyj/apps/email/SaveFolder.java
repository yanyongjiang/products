package com.yyj.apps.email;

import com.yyj.apps.email.model.Orgemailfolder;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import java.util.Map;

/**
 * Created by yyj on 2018/10/30.
 */
public class SaveFolder  extends CommonCmd {
    private Map params;

    public SaveFolder(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        Orgemailfolder folder=new Orgemailfolder();
        folder=BeanUtils.MapToObject(folder,params);
        return $save(folder);
    }
}
