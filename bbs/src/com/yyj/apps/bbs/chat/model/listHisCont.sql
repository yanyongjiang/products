    select a.*,
    b.fldname as fldfromname,c.fldname as fldtoname
    from bbschartcont a left join Bbsuser b on b.id = a.fldfrom
    left join Bbsuser c on c.id = a.fldto
    where a.fldrdate is not null
      <#assign hasCon = false/>
      <#if fldfrom??>
      and (a.fldfrom='${fldfrom}' or a.fldto='${fldfrom}')
      <#assign hasCon = true/>
      </#if>
         <#if fldto??>
      and (a.fldfrom='${fldto}' or a.fldto='${fldto}')
      <#assign hasCon = true/>
      </#if>
      <#if qcon??>
      <#assign hasCon = true/>
      and (a.fldtext like '%${qcon}%'
           or b.fldname like '%${qcon}%'
           or c.fldname like '%${qcon}%')
      </#if>
      <#if !hasCon>
          and 0=1
      </#if>
       order by a.fldngdate desc
