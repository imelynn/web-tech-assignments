import"../modulepreload-polyfill.c7c6310f.js";let t=document.querySelector("form"),n=document.querySelector("#name"),r=document.querySelector("#email"),o=document.querySelector("#date"),u=document.querySelector("#country");document.querySelector("#timezone");let l=document.querySelector("#comment");document.querySelector("#agreement");t.onsubmit=function(e){e.preventDefault(),display_agreement.innerText="You have agreed to submit this form.  Here is your submitted data!",display_name.innerText=n.value,display_email.innerText=r.value,display_date.innerText=o.value,display_country.innerText=u.value,display_comment.innerText=l.value};
