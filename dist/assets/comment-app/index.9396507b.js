import"../modulepreload-polyfill.c7c6310f.js";let r,d=document.querySelector("form"),f=document.querySelector("#name1"),C=document.querySelector("#contact"),u=document.querySelector("#comments"),a=document.querySelector("#consultations"),l=document.querySelector("#services");var m=new Date,i=m.getFullYear()+"-"+(m.getMonth()+1)+"-"+m.getDate();document.querySelector("datetime");let s=window.indexedDB.open("comments",1);s.onerror=function(){console.log("error")};s.onsuccess=function(){r=s.result,p()};s.onupgradeneeded=function(o){let e=o.target.result.createObjectStore("comments",{keyPath:"key",autoIncrement:!0});e.createIndex("name","name",{unique:!1}),e.createIndex("contact","contact",{unique:!1}),e.createIndex("date","date",{unique:!1}),e.createIndex("comments","comments",{unique:!1}),e.createIndex("datetime","datetime",{unique:!1})};d.addEventListener("submit",h);i=new Date;document.getElementById("#datetime");function h(o){o.preventDefault();let c={name1:f.value,contact:C.value,date:date.value,comments:u.value,datetime:i.value},e=r.transaction(["comments"],"readwrite"),n=e.objectStore("comments").add(c);n.onsuccess=()=>{d.reset()},e.oncomplete=()=>{p()},e.onerror=()=>{}}function p(){for(;a.firstChild;)a.removeChild(a.firstChild);let o=r.transaction("comments").objectStore("comments");o.openCursor().onsuccess=function(c){let e=c.target.result;if(e){let t=document.createElement("li");t.setAttribute("data-comment-id",e.value.key),t.classList.add("list-group-item"),t.innerHTML=`  
                         <p class="font-weight-bold">Name:  <span class="font-weight-normal">${e.value.name1}<span></p>
                          <p class="font-weight-bold">Email:  <span class="font-weight-normal">${e.value.contact}<span></p>
                         <p class="font-weight-bold">Date:  <span class="font-weight-normal">${e.value.date}<span></p>
                         <p class="font-weight-bold">Comment:    <span class="font-weight-normal">${e.value.comments}<span></p>
                         
                    `;const n=document.createElement("button");n.classList.add("btn","btn-danger"),n.innerHTML="Delete",n.onclick=b,t.appendChild(n),a.appendChild(t),e.continue()}else if(a.firstChild)l.textContent="Posted Comments";else{l.textContent="Your Comment";let t=document.createElement("p");t.classList.add("text-center"),t.textContent="No results Found",a.appendChild(t)}}}function b(o){let c=Number(o.target.parentElement.getAttribute("data-comment-id")),e=r.transaction(["comments"],"readwrite");e.objectStore("comments").delete(c),e.oncomplete=()=>{if(o.target.parentElement.parentElement.removeChild(o.target.parentElement),a.firstChild)l.textContent="Posted Comments";else{l.textContent="Enter a Comment";let n=document.createElement("p");n.classList.add("text-center"),n.textContent="No results Found",u.appendChild(n)}}}