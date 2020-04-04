select *
    from esdata where 1=1
    <#if fldstatus??>
    and fldstatus = '${fldstatus}'
    </#if>
    <#if yearmon?length gt 4>
    and date_format(fldngdate,'%Y-%m') = '${yearmon}'
    </#if>
     <#if yearmon?length lte 4>
    and date_format(fldngdate,'%Y') = '${yearmon}'
    </#if>
    <#if qcon??>
    and fldtm like '%${qcon}%'
    </#if>
        order by fldngdate desc