select date_format(fldngdate,'%Y')  as name,
    'true' as isParent
    from esdata where 1=1
    <#if fldstatus??>
    and fldstatus = '${fldstatus}'
    </#if>
    group by  date_format(fldngdate,'%Y')
        order by name desc