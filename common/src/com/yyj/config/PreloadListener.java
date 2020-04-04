package com.yyj.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.io.IOException;

public class PreloadListener implements ServletContextListener {
    private static Logger logger = LogManager.getLogger(LogManager.ROOT_LOGGER_NAME);

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        try {
            Server.getProperty("classPackageHome");
        } catch (IOException e) {
            e.printStackTrace();
            logger.error("≥ı ºªØ±®¥Ì",e);
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}