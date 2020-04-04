select *
    from Orgwork where 1=1
    and ((state is null  or (state!='1' and state!='2')))
    <#if yearmon?length gt 4>
    and date_format(fldngtime,'%Y-%m') = '${yearmon}'
    </#if>
     <#if yearmon?length lte 4>
    and date_format(fldngtime,'%Y') = '${yearmon}'
    </#if>
    <#if initunitid??>
    and initunitid = '${initunitid}'
    </#if>
    <#if showAll??>
    <#else>
        and EXISTS (select * from Orgauth where Orgwork.id=Orgauth.fldbuk and Orgauth.flduserid= '${flduserid}')
    </#if>
    <#if qcon??>
    and fldtm like '%${qcon}%'
    </#if>
        order by fldngtime desc