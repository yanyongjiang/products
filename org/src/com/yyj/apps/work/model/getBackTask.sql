update orgtask set fldlast='1'
where <#if fldassginid??&&fldbuk??>
      fldassginid='${fldassginid}' and fldbuk='${fldbuk}' and fldfinishtime is not null and fldfinishtime in (
      select * from (select MAX(fldfinishtime) from orgtask
       where fldassginid='${fldassginid}' and fldbuk='${fldbuk}' and fldfinishtime is not null) tmp)
      <#else>
      0=1
      </#if>