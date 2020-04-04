//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.yyj.utils.db;

import java.io.Serializable;
import java.util.List;

public class PagingImpl<T> implements Paging<T>, Serializable {
    private int start;
    private int limit;
    private int totalCount;
    private List<T> data;
    private int page;
    private int pageCount;
    private int pageGroup;
    private int pageGroupCount;
    private int pagePerGroup;

    public PagingImpl() {
    }

    public PagingImpl(Paging paging, int pagePerGroup) {
        this(paging.getStart(), paging.getLimit(), paging.getTotalCount(), pagePerGroup);
        this.setData(paging.getData());
    }

    public PagingImpl(int start, int limit, int totalCount, int pagePerGroup) {
        this.start = start;
        this.limit = limit;
        this.totalCount = totalCount;
        this.pagePerGroup = pagePerGroup;
        this.init();
    }

    public void init() {
        if(this.limit < 1) {
            this.limit = 1;
        }

        this.page = this.start / this.limit + 1;
        if(this.limit > 0) {
            if(0 == this.totalCount % this.limit) {
                this.pageCount = this.totalCount / this.limit;
            } else {
                this.pageCount = this.totalCount / this.limit + 1;
            }
        }

        if(this.pagePerGroup > 0) {
            if(0 == this.pageCount % this.pagePerGroup) {
                this.pageGroupCount = this.pageCount / this.pagePerGroup;
            } else {
                this.pageGroupCount = this.pageCount / this.pagePerGroup + 1;
            }

            this.pageGroup = this.page / this.pagePerGroup;
            if(this.page % this.pagePerGroup != 0) {
                ++this.pageGroup;
            }
        }

    }

    public int getStart() {
        return this.start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getLimit() {
        return this.limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getTotalCount() {
        return this.totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public List<T> getData() {
        return this.data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public long getPage() {
        return (long)this.page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public long getPageCount() {
        return (long)this.pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }

    public int getPageGroup() {
        return this.pageGroup;
    }

    public void setPageGroup(int pageGroup) {
        this.pageGroup = pageGroup;
    }

    public int getPageGroupCount() {
        return this.pageGroupCount;
    }

    public void setPageGroupCount(int pageGroupCount) {
        this.pageGroupCount = pageGroupCount;
    }

    public int getPagePerGroup() {
        return this.pagePerGroup;
    }

    public void setPagePerGroup(int pagePerGroup) {
        this.pagePerGroup = pagePerGroup;
    }

    public boolean getIsFirstPage() {
        return 1 == this.page;
    }

    public boolean getIsLastPage() {
        return this.page == this.pageCount;
    }

    public boolean getHasNextPage() {
        return this.page < this.pageCount;
    }

    public boolean getHasPreviousPage() {
        return this.page > 1;
    }

    public boolean getIsFirstPageGroup() {
        return 1 == this.pageGroup;
    }

    public boolean getIsLastPageGroup() {
        return this.pageGroup == this.pageGroupCount;
    }

    public boolean getHasNextPageGroup() {
        return this.pageGroup < this.pageGroupCount;
    }

    public boolean getHasPreviousPageGroup() {
        return this.pageGroup > 1;
    }

    public long getGroupStartPage() {
        return (long)((this.pageGroup - 1) * this.pagePerGroup + 1);
    }

    public long getGroupEndPage() {
        long p = (long)(this.pageGroup * this.pagePerGroup);
        return this.pageCount > 0?((long)this.pageCount > p?p:(long)this.pageCount):p;
    }

    public long getPreviousPageGroupLastPage() {
        return (long)((this.pageGroup - 1) * this.pagePerGroup);
    }

    public long getNextPageGroupFirstPage() {
        return (long)(this.pageGroup * this.pagePerGroup + 1);
    }
}
