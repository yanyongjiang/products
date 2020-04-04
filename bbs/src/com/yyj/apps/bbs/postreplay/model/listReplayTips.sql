      select a.*,b.fldloginid,b.fldname,c.fldcontent,
       d.fldtm
      from bbsreplaytips a,bbsuser b,bbsreplay c,bbspost d
      where a.flduserid=b.id
       and a.fldreplayid=c.id
       and a.fldpostid=d.id
       and a.fldtipuserid='${fldtipuserid}'
       <#if qcon??>
       and fldtm like '%${qcon}%'
       </#if>
       order by a.fldngdate desc
