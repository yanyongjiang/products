package com.yyj.apps.mh;

import com.yyj.apps.mh.model.Mhcolumn;
import com.yyj.commonservice.CommonCmd;
import com.yyj.utils.bean.BeanUtils;
import java.util.Map;

/**
 * Created by yyj on 2018/11/08.
 */
public class SaveColumn extends CommonCmd {
    private Map params;

    public SaveColumn(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        Mhcolumn mhcol=new Mhcolumn();
        mhcol=BeanUtils.MapToObject(mhcol,params);
        return $save(mhcol);
    }
}
