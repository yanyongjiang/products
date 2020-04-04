update orgtask set fldlast='0'
where <#if fldassginid??&&fldbuk??>
      fldassginid='${fldassginid}' and fldbuk='${fldbuk}' and fldfinishtime is not null
      <#else>
      0=1
      </#if>