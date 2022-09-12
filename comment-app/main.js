let DB;


let form = document.querySelector('form');
let name1 = document.querySelector('#name1');
let contact = document.querySelector('#contact');
let comments = document.querySelector('#comments'); 
let datetime = document.querySelector('#datetime');             
let commentOut = document.querySelector('#consultations');
let services = document.querySelector('#services');

let dt = new Date();
let fulldate = dt.getDate() + "." + (dt.getMonth()+1) + "." + dt.getFullYear();


    
     // create the database
     let ScheduleDB = window.indexedDB.open('comments', 1);

     // if there's an error
     ScheduleDB.onerror = function() {
          console.log('error');
     }
     // if everything is fine, assign the result is to the (letDB) instance 
     ScheduleDB.onsuccess = function() {
          // console.log('Database Ready');

          
          DB = ScheduleDB.result;

          showConsultations();
     }

   
     ScheduleDB.onupgradeneeded = function(e) {
          
          let db = e.target.result;
          
          let objectStore = db.createObjectStore('comments', { keyPath: 'key', autoIncrement: true } );

        
          objectStore.createIndex('name1', 'name1', { unique: false } );
          objectStore.createIndex('contact', 'contact', { unique: true } );
          objectStore.createIndex('comments', 'comments', { unique: false } );
          objectStore.createIndex('datetime', 'datetime', { unique: false } );

          //console.log('Database ready and fields created!');
     }

     form.addEventListener('submit', addComments);

     datetime = new Date();
          document.getElementById('#datetime');

     function addComments(e) {
          e.preventDefault();
          let newComment = {
               name1 : name1.value,
               contact : contact.value,
               comments : comments.value, 
               datetime : datetime = fulldate 
          }

          let transaction = DB.transaction(['comments'], 'readwrite');
          let objectStore = transaction.objectStore('comments');

          let request = objectStore.add(newComment);
                    request.onsuccess = () => {
               form.reset();
          }
          transaction.oncomplete = () => {
               //console.log('New schedule added');

               showConsultations();
          }
          transaction.onerror = () => {
              //console.log();
          }

     }
     function showConsultations() {
       
          while(commentOut.firstChild) {
            commentOut.removeChild(commentOut.firstChild);
          }
         
          let objectStore = DB.transaction('comments').objectStore('comments');

          objectStore.openCursor().onsuccess = function(e) {
               
               let cursor = e.target.result;
               if(cursor) {
                    let CommentHTML = document.createElement('li');
                    CommentHTML.setAttribute('data-comment-id', cursor.value.key);
                    CommentHTML.classList.add('list-group-item');
                    
                 
                    CommentHTML.innerHTML = `  
                         <p class="font-weight-bold">Name:  <span class="font-weight-normal">${cursor.value.name1}<span></p>
                          <p class="font-weight-bold">Email:  <span class="font-weight-normal">${cursor.value.contact}<span></p>
                         <p class="font-weight-bold">Comment:    <span class="font-weight-normal">${cursor.value.comments}<span></p>
                         <p class="font-weight-bold">Posted On:  <span class="font-weight-normal">${fulldate}<span></p>  
                    `;

                    
                    const cancelBtn = document.createElement('button');
                    cancelBtn.classList.add('btn', 'btn-danger');
                    cancelBtn.innerHTML = 'Delete';
                    cancelBtn.onclick = removeComment;
               
                 
                    CommentHTML.appendChild(cancelBtn);
                 commentOut.appendChild(CommentHTML);

                    cursor.continue();
               } else {
                    if(!commentOut.firstChild) {
                        services.textContent = 'Your Comment';
                         let noSchedule = document.createElement('p');
                         noSchedule.classList.add('text-center');
                         noSchedule.textContent = 'No results Found';
                      commentOut.appendChild(noSchedule);
                    } else {
                        services.textContent = 'Posted Comments'
                    }
               }
          }
     }

          function removeComment(e) {
       
          let scheduleID = Number( e.target.parentElement.getAttribute('data-comment-id') );
         
          let transaction = DB.transaction(['comments'], 'readwrite');
          let objectStore = transaction.objectStore('comments');
         
          objectStore.delete(scheduleID);

          transaction.oncomplete = () => {
             
               e.target.parentElement.parentElement.removeChild( e.target.parentElement );

               if(!commentOut.firstChild) {
                   
                    services.textContent = 'Enter a Comment';
                   
                   let noSchedule = document.createElement('p');
                  
                   noSchedule.classList.add('text-center');
                   
                   noSchedule.textContent = 'No results Found';
                
                    comments.appendChild(noSchedule);
               } else {
                   services.textContent = 'Posted Comments'
               }
          }
     }