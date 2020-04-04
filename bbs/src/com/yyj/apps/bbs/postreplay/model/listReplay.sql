select a.*,b.fldloginid,b.fldname from bbsreplay a,bbsuser b where a.flduserid=b.id and a.fldstatus='1'
<#if fldfromid??>
and a.fldfromid='${fldfromid}' and a.fldreplayid is null
<#elseif fldreplayid??>
and a.fldreplayid='${fldreplayid}'
<#else>
and 0=1
</#if>
 order by fldsn
