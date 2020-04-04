package com.yyj.apps.bbs.chat;

import com.yyj.apps.bbs.chat.model.Bbschartcont;
import com.yyj.apps.bbs.chat.model.Bbschartuser;
import com.yyj.commonservice.CommonCmd;
import com.yyj.servlet.control.DateJsonValueProcessor;
import com.yyj.utils.bean.BeanUtils;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/websocket/chat/{userno}")
public class ChatAnnotation extends CommonCmd {

    private static final Map connections =
            new HashMap<>();

    private Session session;

    public ChatAnnotation() {
    }

    @OnOpen
    public void start(@PathParam(value = "userno") String userno, Session session) {
        this.session = session;
        connections.put(userno, this);
        connections.put(session.getId(), userno);
    }

    @OnClose
    public void end(Session session, CloseReason closeReason) {
        String userno = (String) connections.remove(session.getId());
        if (userno != null)
            connections.remove(userno);
    }

    @OnMessage
    public void incoming(String message) throws IllegalAccessException, IOException, EncodeException {

        Map<String, Object> mapJson = JSONObject.fromObject(message);
        String fldrdate = (String) mapJson.get("fldrdate");
        if (fldrdate != null) {
              String ids=(String) mapJson.get("ids");
              $update(Bbschartcont.class,ids.split(","),"fldrdate",fldrdate);
              String fldto=(String) mapJson.get("fldto");
              if(fldto!=null){
                  ChatAnnotation to = (ChatAnnotation) connections.get(fldto);
                  if(to!=null){
                      Map rM=new HashMap<>();
                      rM.put("ids",ids);
                      rM.put("fldrdate",fldrdate);
                      JSONObject contjson = JSONObject.fromObject(rM);
                      to.session.getBasicRemote().sendText(contjson.toString());
                  }
              }
        } else {
            Bbschartcont cont = new Bbschartcont();
            cont = BeanUtils.MapToObject(cont, mapJson);
            Timestamp time = new Timestamp(new Date().getTime());
            cont.setFldngdate(time);
            cont = $save(cont);
            String fldto = cont.getFldto();
            String fldfrom = cont.getFldfrom();
            Map updateM = new HashMap<>();
            updateM.put("fldlastcdate", time);
            Map whereM = new HashMap<>();
            whereM.put("flduserid", fldfrom);
            whereM.put("fldfriendid", fldto);
            $update(Bbschartuser.class, updateM, whereM);
            JsonConfig config = new JsonConfig();
            config.registerJsonValueProcessor(Timestamp.class, new DateJsonValueProcessor("yyyy-MM-dd HH:mm:ss"));
            if (fldto != null) {
                ChatAnnotation to = (ChatAnnotation) connections.get(fldto);
                JSONObject contjson = JSONObject.fromObject(cont, config);
                if (to != null) { //对方在线
                    to.session.getBasicRemote().sendText(contjson.toString());
                    cont.setFldrdate(time);
                    cont = $save(cont);
                }
                if (fldfrom != null) {
                    ChatAnnotation from = (ChatAnnotation) connections.get(fldfrom);
                    if (from != null) { //对方在线
                        contjson = JSONObject.fromObject(cont, config);
                        from.session.getBasicRemote().sendText(contjson.toString());
                    }
                }
            }
        }
    }

    @OnError
    public void onError(Throwable t) throws Throwable {

    }
}
