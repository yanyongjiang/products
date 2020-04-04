package com.yyj.config;

import java.io.IOException;
import java.util.Properties;

/**
 * 业务模块描述:【保存贴子】
 * 作者: 严拥江
 * 日期: 2018/04/15 11:50
 */
public class Server {
    public static Properties prop;

    public static String getProperty(String key) throws IOException {
        if(prop==null){
            prop = new Properties();
            prop.load(Server.class.getResourceAsStream("/config.properties"));
        }
        return prop.getProperty(key);
    }
}
