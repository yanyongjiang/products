//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.yyj.utils.db;

import java.util.List;

public interface Paging<T> {
    int getStart();

    void setStart(int var1);

    int getLimit();

    void setLimit(int var1);

    int getTotalCount();

    void setTotalCount(int var1);

    List<T> getData();

    void setData(List<T> var1);
}
