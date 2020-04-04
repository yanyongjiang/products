select COUNT(*) from bbsreplay a where 1=1
<#assign hasCon = false/>
<#if fldfromid??>
and a.fldfromid='${fldfromid}' and a.fldreplayid is null
<#assign hasCon = true/>
</#if>
<#if id??>
and a.fldngdate < (select fldngdate from bbsreplay where id='${id}')
<#assign hasCon = true/>
</#if>
<#if !hasCon>
    and 0=1
</#if>