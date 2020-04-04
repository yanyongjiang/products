select COUNT(*) from Bbschartcont a where 1=1
<#if fldtipuserid??>
and a.fldto='${fldtipuserid}' and a.fldrdate is null
<#else>
and 0=1
</#if>