select COUNT(*) from bbsreplaytips a where 1=1
<#if fldtipuserid??>
and a.fldtipuserid='${fldtipuserid}' and a.fldreaddate is null
<#else>
and 0=1
</#if>