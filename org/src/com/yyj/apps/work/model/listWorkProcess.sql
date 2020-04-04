select a.*,b.fldcretime as comcretime,b.id as comid,b.fldmessage from orgtask a left join orgcom b
on a.id=b.fldtaskid where
      <#if buk??>
       a.fldbuk='${buk}'
      <#else>
       0=1
      </#if>
      order by a.fldcretime