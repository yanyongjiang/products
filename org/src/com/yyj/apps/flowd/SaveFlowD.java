package com.yyj.apps.flowd;

import com.yyj.apps.flowd.model.Flowdef;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.bean.BeanUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by yyj on 2019/02/17.
 */
public class SaveFlowD extends CommonCmd {
    private Map params;

    public SaveFlowD(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        Flowdef fdef=new Flowdef();
        fdef=BeanUtils.MapToObject(fdef,params);
        String fldtype= (String) params.get("fldtype");
        Map uM=new HashMap();
        uM.put("state","2");
        Map wM=new HashMap();
        wM.put("fldtype",fldtype);
        $update(Flowdef.class,uM,wM);
        return $save(fdef);
    }
}
