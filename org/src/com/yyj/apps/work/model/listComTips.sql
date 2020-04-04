select a.*,b.fldmessage from Orgcomtip a ,Orgcom b
where a.fldacctime is null and a.fldcomid=b.id
      <#if fldtipuserid??>
      and fldtipuserid='${fldtipuserid}'
      <#else>
      and 0=1
      </#if>
      order by fldcretime desc