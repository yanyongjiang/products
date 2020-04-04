package com.yyj.apps.es.index;

import com.yyj.apps.es.index.model.CopyEsAttach;
import com.yyj.apps.es.index.model.Esdata;
import com.yyj.commonservice.CommonCmd;
import java.util.HashMap;
import java.util.Map;

public class CopyData extends CommonCmd {
    private Map params;

    public CopyData(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String ids = (String) params.get("ids");
        if (ids == null) return null;
        String[] idsA = ids.split(",");
        for (String oneid : idsA) {
            Esdata esdata = $get(Esdata.class, oneid);
            if (esdata != null) {
                esdata.setId(null);
                esdata.setFldtm(esdata.getFldtm() + "复制");
                esdata = $save(esdata);
                Map p = new HashMap();
                p.put("frompkid", oneid);
                p.put("topkid", esdata.getId());
                new CopyEsAttach(p).execute();
            }
        }
        return true;
    }
}
