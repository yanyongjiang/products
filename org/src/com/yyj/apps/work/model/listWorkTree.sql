select date_format(fldngtime,'%Y')  as name,
    'true' as isParent
    from Orgwork where 1=1
    and ((state is null  or (state!='1' and state!='2')))
      <#if initunitid??>
        and initunitid = '${initunitid}'
        </#if>
        <#if showAll??>
        <#else>
        and EXISTS (select * from Orgauth where Orgwork.id=Orgauth.fldbuk and Orgauth.flduserid= '${flduserid}')
        </#if>
    group by  date_format(fldngtime,'%Y')
        order by name desc