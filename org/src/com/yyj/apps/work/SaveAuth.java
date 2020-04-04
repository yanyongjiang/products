package com.yyj.apps.work;

import com.yyj.apps.work.model.Orgauth;
import com.yyj.apps.work.model.Orgcom;
import com.yyj.apps.work.model.Orgcomtip;
import com.yyj.apps.work.model.Orgtask;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.db.DbUtils;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/5/20.
 * ±£¥Ê∂¡’ﬂ”Ú
 */
public class SaveAuth {
    private Map params;

    public SaveAuth(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String fldbuk = (String) params.get("fldbuk");
        String flduserid = (String) params.get("flduserid");
        if (fldbuk == null || flduserid == null) return null;
        List<Orgauth> authlist = DbUtils.$find(Orgauth.class, "fldbuk", fldbuk, "flduserid", flduserid);
        if (authlist != null && authlist.size() > 0) {
            return true;
        }
        Orgauth auth = new Orgauth();
        auth.setFldbuk(fldbuk);
        auth.setFldtype("1");
        auth.setFlduserid(flduserid);
        DbUtils.$save(auth);
        return true;
    }
}
