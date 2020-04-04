select a.*,b.fldloginid,b.fldname from bbschartuser a,bbsuser b where a.fldfriendid=b.id
<#if flduserid??>
and flduserid='${flduserid}'
</#if>
<#if qcon??>
and b.fldname like '%${qcon}%'
</#if>
 order by fldlastcdate desc


