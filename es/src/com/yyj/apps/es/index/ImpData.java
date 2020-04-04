package com.yyj.apps.es.index;

import com.yyj.apps.es.index.model.Esattach;
import com.yyj.apps.es.index.model.Esdata;
import com.yyj.commonservice.CommonCmd;
import com.yyj.config.Server;
import com.yyj.utils.bean.BeanUtils;
import com.yyj.utils.file.FtpUtils;
import org.apache.tika.Tika;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.TransportAddress;
import org.elasticsearch.transport.client.PreBuiltTransportClient;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.InetAddress;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yyj on 2018/09/15.
 */
public class ImpData extends CommonCmd {
    private Map params;

    public ImpData(Map params) {
        this.params = params;
    }

    public Object execute() throws Exception {
        String ids = (String) params.get("ids");
        SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (ids == null) return null;
        String[] idsA=ids.split(",");
        String esclustername = Server.getProperty("es.cluster.name");
        String esip = Server.getProperty("es.ip");
        String esport= Server.getProperty("es.port");
        Settings esSettings = Settings.builder()
                .put("cluster.name",esclustername)
                .put("client.transport.sniff", true)
                .build();
        TransportClient client = new PreBuiltTransportClient(esSettings);
        client.addTransportAddress(new TransportAddress(InetAddress.getByName(esip), Integer.parseInt(esport)));
        Tika tika = new Tika();
        for(String id:idsA){
            Esdata data=$get(Esdata.class,id);
            if(data!=null){
                Map<String, Object> json = BeanUtils.ObjectToMap(data);
                //处理附件
                StringBuilder sb=new StringBuilder();
                List<Esattach> esattachs=$find(Esattach.class,"pkid",id);
                for(Esattach esattach:esattachs){
                    Map p=new HashMap();
                    p.put("id",esattach.getId());
                    Map result= (Map) new DownEsAttach(p).execute();
                    InputStream inputStream=null;
                    if (result instanceof Map && ((Map) result).get("ftp") != null) {
                        FtpUtils ftp = (FtpUtils) ((Map) result).get("ftp");
                        String ftpfilename = (String) ((Map) result).get("ftpfilename");
                        inputStream=ftp.getFtpClient().retrieveFileStream(ftpfilename);
                    }
                    if (result instanceof Map && ((Map) result).get("file") != null) {
                        File file = (File) ((Map) result).get("file");
                        inputStream=new FileInputStream(file);
                    }
                    if(inputStream!=null){
                        String filecontent = tika.parseToString(inputStream);
                        sb.append(filecontent);
                        inputStream.close();
                        inputStream=null;
                    }
                    json.put("fldattach",sb.toString());
                }
                json.put("fldngdate",formatter.format(json.get("fldngdate")));
                IndexResponse response = client.prepareIndex("esindex", "estype",id)
                        .setSource(json)
                        .get();
                $update(Esdata.class,id,"fldstatus","2");
            }
        }
        client.close();
        return true;
    }
}
