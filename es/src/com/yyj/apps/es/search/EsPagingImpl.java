package com.yyj.apps.es.search;

import com.yyj.utils.db.Paging;

import java.util.List;

public class EsPagingImpl<T>{
    private int start;
    private int limit;
    private long totalCount;
    private List<T> data;
    private int page;
    private long pageCount;
    private int pageGroup;
    private long pageGroupCount;
    private int pagePerGroup;

    public EsPagingImpl() {
    }

    public EsPagingImpl(Paging paging, int pagePerGroup) {
        this(paging.getStart(), paging.getLimit(), paging.getTotalCount(), pagePerGroup);
        this.setData(paging.getData());
    }

    public EsPagingImpl(int start, int limit, long totalCount, int pagePerGroup) {
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

    public long getTotalCount() {
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

    public long getPageGroupCount() {
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
