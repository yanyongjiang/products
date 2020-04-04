select DISTINCT  fldassginid,fldassgin from orgtask
where <#if inituserid??&&fldbuk??>
       fldassginid!='${inituserid}' and fldbuk='${fldbuk}' and fldassgintime is not null
      <#else>
       0=1
      </#if>