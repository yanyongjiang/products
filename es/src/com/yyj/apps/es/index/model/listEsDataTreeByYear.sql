select
    date_format(fldngdate,'%m') as name,
    'false' as isParent
    from esdata where 1=1
        <#if fldstatus??>
        and fldstatus = '${fldstatus}'
        </#if>
        and date_format(fldngdate,'%Y') = '${year}'
        group by  date_format(fldngdate,'%m')
        order by name desc