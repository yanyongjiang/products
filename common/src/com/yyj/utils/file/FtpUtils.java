package com.yyj.utils.file;

import com.yyj.config.Server;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.*;
import java.net.MalformedURLException;
import java.util.Properties;

public class FtpUtils {
    private static Logger logger = LogManager.getLogger(LogManager.ROOT_LOGGER_NAME);
    //ftp服务器地址
    public String hostname = null;
    //ftp服务器端口号默认为21
    public Integer port = null;
    //ftp登录账号
    public String username = null;
    //ftp登录密码
    public String password = null;

    public FTPClient ftpClient = null;

    public FTPClient getFtpClient() throws IOException {
        if (this.ftpClient == null) {
            if (hostname == null || port == null || username == null || password == null) {
                 hostname = Server.getProperty("filestore.ftphostname");
                 port = Integer.parseInt(Server.getProperty("filestore.ftpport"));
                 username = Server.getProperty("filestore.ftpusername");
                 password = Server.getProperty("filestore.ftppassword");
            }
            return new FTPClient();
        }
        return this.ftpClient;
    }

    /**
     * 初始化ftp服务器
     */
    public void initFtpClient() throws IOException {
        if (ftpClient == null) {
            ftpClient = getFtpClient();
            ftpClient.setControlEncoding("utf-8");
            try {
                logger.info("connecting...ftp服务器:" + this.hostname + ":" + this.port);
                ftpClient.connect(hostname, port); //连接ftp服务器
                ftpClient.login(username, password); //登录ftp服务器
                int replyCode = ftpClient.getReplyCode(); //是否成功登录服务器
                if (!FTPReply.isPositiveCompletion(replyCode)) {
                    logger.error("connect failed...ftp服务器:" + this.hostname + ":" + this.port);
                }
                logger.info("connect successfu...ftp服务器:" + this.hostname + ":" + this.port);
            } catch (MalformedURLException e) {
                e.printStackTrace();
                logger.error("connect failed...ftp服务器:" + this.hostname + ":" + this.port + "原因：" + e.getMessage());
            } catch (IOException e) {
                e.printStackTrace();
                logger.error("connect failed...ftp服务器:" + this.hostname + ":" + this.port + "原因：" + e.getMessage());
            }
        }
    }

    /**
     * 上传文件
     *
     * @param pathname       ftp服务保存地址
     * @param fileName       上传到ftp的文件名
     * @param originfilename 待上传文件的名称（绝对地址） *
     * @return
     */
    public boolean uploadFile(String pathname, String fileName, String originfilename) {
        boolean flag = false;
        InputStream inputStream = null;
        try {
            logger.info("开始上传文件路径" + pathname);
            logger.info("开始上传文件名称" + fileName);
            logger.info("开始上传文件源名称" + originfilename);
            inputStream = new FileInputStream(new File(originfilename));
            initFtpClient();
            ftpClient.setFileType(ftpClient.BINARY_FILE_TYPE);
            createDirecroty(pathname);
            ftpClient.makeDirectory(pathname);
            ftpClient.changeWorkingDirectory(pathname);
            ftpClient.storeFile(fileName, inputStream);
            inputStream.close();
            //ftpClient.logout();
            flag = true;
            logger.info("上传文件成功");
        } catch (Exception e) {
            logger.info("上传文件失败：" + e.getMessage());
            e.printStackTrace();
        } finally {
            if (null != inputStream) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return true;
    }

    /**
     * 上传文件
     *
     * @param fileName    上传到ftp的文件名
     * @param inputStream 输入文件流
     * @return
     */
    public boolean uploadFile(String fileName, InputStream inputStream) throws IOException {
        return uploadFile("/", fileName, inputStream);
    }

    /**
     * 上传文件
     *
     * @param pathname    ftp服务保存地址
     * @param fileName    上传到ftp的文件名
     * @param inputStream 输入文件流
     * @return
     */
    public boolean uploadFile(String pathname, String fileName, InputStream inputStream) throws IOException {
        boolean flag = false;
        try {
            logger.info("开始上传文件路径" + pathname);
            logger.info("开始上传文件名称" + fileName);
            initFtpClient();
            ftpClient.setFileType(ftpClient.BINARY_FILE_TYPE);
            createDirecroty(pathname);
            ftpClient.makeDirectory(pathname);
            ftpClient.changeWorkingDirectory(pathname);
            ftpClient.storeFile(fileName, inputStream);
            inputStream.close();
            // ftpClient.logout();
            flag = true;
            logger.info("上传文件成功");
        } catch (Exception e) {
            logger.info("上传文件失败：" + e.getMessage());
            e.printStackTrace();
            throw e;
        } finally {
            if (null != inputStream) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return true;
    }

    //改变目录路径
    public boolean changeWorkingDirectory(String directory) throws IOException {
        initFtpClient();
        boolean flag = true;
        try {
            flag = ftpClient.changeWorkingDirectory(directory);
            if (flag) {
                logger.info("进入文件夹" + directory + " 成功！");

            } else {
                logger.error("进入文件夹" + directory + " 失败！开始创建文件夹");
            }
        } catch (IOException ioe) {
            ioe.printStackTrace();
            logger.error("改变目录路径失败"+ioe.getMessage());
        }
        return flag;
    }

    //创建多层目录文件，如果有ftp服务器已存在该文件，则不创建，如果无，则创建
    public boolean createDirecroty(String remote) throws IOException {
        initFtpClient();
        boolean success = true;
        String directory = remote + "/";
        // 如果远程目录不存在，则递归创建远程服务器目录
        if (!directory.equalsIgnoreCase("/") && !changeWorkingDirectory(new String(directory))) {
            int start = 0;
            int end = 0;
            if (directory.startsWith("/")) {
                start = 1;
            } else {
                start = 0;
            }
            end = directory.indexOf("/", start);
            String path = "";
            String paths = "";
            while (true) {
                String subDirectory = new String(remote.substring(start, end).getBytes("GBK"), "iso-8859-1");
                path = path + "/" + subDirectory;
                if (!existFile(path)) {
                    if (makeDirectory(subDirectory)) {
                        changeWorkingDirectory(subDirectory);
                    } else {
                        logger.error("创建目录[" + subDirectory + "]失败");
                        changeWorkingDirectory(subDirectory);
                    }
                } else {
                    changeWorkingDirectory(subDirectory);
                }

                paths = paths + "/" + subDirectory;
                start = end + 1;
                end = directory.indexOf("/", start);
                // 检查所有目录是否创建完毕
                if (end <= start) {
                    break;
                }
            }
        }
        return success;
    }

    //判断ftp服务器文件是否存在
    public boolean existFile(String path) throws IOException {
        boolean flag = false;
        initFtpClient();
        FTPFile[] ftpFileArr = ftpClient.listFiles(path);
        if (ftpFileArr.length > 0) {
            flag = true;
        }
        return flag;
    }

    //创建目录
    public boolean makeDirectory(String dir) throws IOException {
        initFtpClient();
        boolean flag = true;
        try {
            flag = ftpClient.makeDirectory(dir);
            if (flag) {
                logger.info("创建文件夹" + dir + " 成功！");

            } else {
                logger.info("创建文件夹" + dir + " 失败！");
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.info("创建文件夹" + dir + " 失败！原因："+e.getMessage());
            throw e;
        }
        return flag;
    }

    /**
     * 下载文件 *
     *
     * @param pathname  FTP服务器文件目录 *
     * @param filename  文件名称 *
     * @param localpath 下载后的文件路径 *
     * @return
     */
    public File downloadFile(String pathname, String filename, String localpath) throws IOException {
        OutputStream os = null;
        File localFile = null;
        try {
            logger.info("开始下载文件:pathname:"+pathname+",filename:"+filename+",localpath:"+localpath);
            initFtpClient();
            //切换FTP目录
            ftpClient.changeWorkingDirectory(pathname);
            FTPFile[] ftpFiles = ftpClient.listFiles();
            for (FTPFile file : ftpFiles) {
                if (filename.equalsIgnoreCase(file.getName())) {
                    localFile = new File(localpath + "/" + file.getName());
                    os = new FileOutputStream(localFile);
                    ftpClient.retrieveFile(file.getName(), os);
                    os.close();
                }
            }
            logger.info("下载文件成功:pathname:"+pathname+",filename:"+filename+",localpath:"+localpath);
        } catch (Exception e) {
            logger.info("下载文件失败:pathname:"+pathname+",filename:"+filename+",localpath:"+localpath);
            logger.info("\n原因:" + e.getMessage());
            e.printStackTrace();
            throw e;
        } finally {
            if (null != os) {
                try {
                    os.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return localFile;
    }

    /**
     * 删除文件 *
     *
     * @param pathname FTP服务器保存目录 *
     * @param filename 要删除的文件名称 *
     * @return
     */
    public boolean deleteFile(String pathname, String filename) throws IOException {
        boolean flag = false;
        try {
            logger.info("开始删除文件pathname:"+pathname+",文件名:"+filename);
            initFtpClient();
            //切换FTP目录
            ftpClient.changeWorkingDirectory(pathname);
            ftpClient.dele(filename);
            flag = true;
            logger.info("成功删除文件pathname:" + pathname + ",文件名:" + filename);
        } catch (Exception e) {
            logger.info("删除文件失败pathname:"+pathname+",文件名:"+filename+"原因:"+e.getMessage());
            e.printStackTrace();
            throw e;
        }
        return flag;
    }

    /**
     * 获取文件大小 *
     *
     * @param pathname FTP服务器保存目录 *
     * @param filename 文件名称 *
     * @return
     */
    public long getFileSize(String pathname, String filename) throws IOException {
        initFtpClient();
        //切换FTP目录
        ftpClient.changeWorkingDirectory(pathname);
        FTPFile[] ftpFiles = ftpClient.listFiles();
        for (FTPFile file : ftpFiles) {
            if (filename.equalsIgnoreCase(file.getName())) {
                return file.getSize();
            }
        }
        return 0;
    }
    /**
     * 获取文件大小 *
     * @param filename 文件名称 *
     * @return
     */
    public long getFileSize(String filename) throws IOException {
        return getFileSize("/",filename);
    }

    public void moveFile(String fileName,String TargetFileName) throws IOException {
        initFtpClient();
        if(fileName.indexOf("/")!=-1){
            String pathname=fileName.substring(0,fileName.lastIndexOf("/"));
            ftpClient.changeWorkingDirectory(pathname);
            fileName=fileName.substring(fileName.lastIndexOf("/")+1);
        }
        ftpClient.rename(fileName,TargetFileName);
    }
    /**
     * 获取文件大小
     * @return
     */
    public void logOut() throws IOException {
        if (ftpClient.isConnected()) {
            try {
                ftpClient.disconnect();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}