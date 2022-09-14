let DB;


let form = document.querySelector('form');
let name1 = document.querySelector('#name1');
let contact = document.querySelector('#contact');
let datetime = document.querySelector('#datetime');
let comments = document.querySelector('#comments');      
let commentOut = document.querySelector('#consultations');
let services = document.querySelector('#services');
let favlist = document.querySelector('#fav-list');
let favHeader = document.querySelector('#fav-header');

let dt = new Date();
let fulldate = dt.getDate() + "." + (dt.getMonth()+1) + "." + dt.getFullYear();
    
     // create the database
     let CommentDB = window.indexedDB.open('comments', 1);

     // if there's an error
     CommentDB.onerror = function() {
          console.log('error');
     }
     // if everything is fine, assign the result is to the (letDB) instance 
     CommentDB.onsuccess = function() {
          // console.log('Database Ready');

          
          DB = CommentDB.result;

          showComments();
     }

   
     CommentDB.onupgradeneeded = function(e) {
          
          let db = e.target.result;
          
          let objectStore = db.createObjectStore('comments', { keyPath: 'key', autoIncrement: true } );
          let favoriteStore = db.createObjectStore('favorites', { keyPath: 'key', autoIncrement: true } );

        
          objectStore.createIndex('name1', 'name1', { unique: false } );
          objectStore.createIndex('contact', 'contact', { unique: true } );
          objectStore.createIndex('comments', 'comments', { unique: false } );
          objectStore.createIndex('datetime', 'datetime', { unique: false } );

          favoriteStore.createIndex('name1', 'name1', { unique: false } );
          favoriteStore.createIndex('contact', 'contact', { unique: true } );
          favoriteStore.createIndex('comments', 'comments', { unique: false } );
          favoriteStore.createIndex('datetime', 'datetime', { unique: false } );

          //console.log('Database ready and fields created!');
     }

     form.addEventListener('submit', addComments);

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

               showComments();
          }
          transaction.onerror = () => {
              //console.log();
          }

     }
     function showComments() {
       
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
                    cancelBtn.classList.add('btn1', 'btn-danger1');
                    cancelBtn.setAttribute('id', 'btn-delete')
                    cancelBtn.innerHTML = 'Delete';
                    cancelBtn.onclick = removeComment;

                    const favBtn = document.createElement('button');
                    favBtn.classList.add('btn2', 'fav-add');
                    favBtn.setAttribute('id', 'fav-btn');
                    favBtn.innerHTML = 'Favorite';
                    favBtn.onclick = addFavorites;
               
                 
                    CommentHTML.appendChild(cancelBtn);
                    CommentHTML.appendChild(favBtn);
                    commentOut.appendChild(CommentHTML);

                    cursor.continue();
               } else {
                    if(!commentOut.firstChild) {
                        services.textContent = 'Posted Comments';
                         let noComment = document.createElement('p');
                         noComment.classList.add('text-center');
                         noComment.textContent = 'No results Found.  Add a comment left.';
                      commentOut.appendChild(noComment);
                    } else {
                        services.textContent = 'Posted Comments'
                    }
               }
          }
     }
          
     function addFavorites(e) {
          e.preventDefault();
          let newFavorite = {
               name1 : name1.value,
               contact : contact.value,
               comments : comments.value,
               datetime : datetime = fulldate        
          }
          
          let transaction = DB.transaction(['favorites'], 'readwrite');
          let favoriteStore = transaction.objectStore('favorites');

          let request = favoriteStore.add(newFavorite);
                    request.onsuccess = () => {

          }
          transaction.oncomplete = () => {
               //console.log('New schedule added');

             
          }
          transaction.onerror = () => {
              //console.log();
          }

     }

     function showFavorites() {
       
          while(favHeader.firstChild) {
            favHeader.removeChild(favHeader.firstChild);
          }
         
          let favoriteStore = DB.transaction('favorites').objectStore('favorites');

          favoriteStore.openCursor().onsuccess = function(e) {
               
               let cursor = e.target.result;
               if(cursor) {
                    let FavoriteHTML = document.createElement('li');
                    FavoriteHTML.setAttribute('data-favorite-id', cursor.value.key);
                    FavoriteHTML.classList.add('list-favorite-item');
                    
                 
                    FavoriteHTML.innerHTML = `  
                         <p class="font-weight-bold">Name:  <span class="font-weight-normal">${cursor.value.name1}<span></p>
                          <p class="font-weight-bold">Email:  <span class="font-weight-normal">${cursor.value.contact}<span></p>
                         <p class="font-weight-bold">Comment:    <span class="font-weight-normal">${cursor.value.comments}<span></p>
                         <p class="font-weight-bold">Posted On:  <span class="font-weight-normal">${fulldate}<span></p>
                    `;

                    cursor.continue();
               } else {
                    if(!favlist.firstChild) {
                        favlist.textContent = 'No Favorites Found'; 
                         let noFavs = document.createElement('p');
                         noFavs.classList.add('fav-center');
                         noFavs.textContent = 'Click the button above to display favorites.';
                      commentOut.appendChild(noFavs);
                    } else {
                        favHeader.textContent = 'Favorites'
                    }
               }
          }
     }
     
     
     function removeComment(e) {
       
          let CommentID = Number( e.target.parentElement.getAttribute('data-comment-id') );
         
          let transaction = DB.transaction(['comments'], 'readwrite');
          let objectStore = transaction.objectStore('comments');
         
          objectStore.delete(CommentID);

          transaction.oncomplete = () => {
             
               e.target.parentElement.parentElement.removeChild( e.target.parentElement );

               if(!comments.firstChild) {
                   
                    services.textContent = 'Posted Comments';
                   
                   let noComment = document.createElement('p');
                  
                   noComment.classList.add('text-center');
                   
                   noComment.textContent = 'No results Found';
                
                    comments.appendChild(noComment);
               } else {
                   services.textContent = 'Comment deleted.'
               }
          }
     }

     function removeFavorite(e) {
       
          let FavoriteID = Number( e.target.parentElement.getAttribute('data-favorite-id') );
         
          let transaction = DB.transaction(['comments'], 'readwrite');
          let objectStore = transaction.objectStore('favorites');
         
          objectStore.delete(FavoriteID);

          transaction.oncomplete = () => {
             
               e.target.parentElement.parentElement.removeChild( e.target.parentElement );

               if(!comments.firstChild) {
                   
                  services.textContent = 'Favorites';
                   
                   let noComment = document.createElement('p');
                  
                   noComment.classList.add('text-center');
                   
                   noComment.textContent = 'No results Found';
                
                    comments.appendChild(noComment);
               } else {
                   services.textContent = 'Comment removed from favorites.'
               }
          }
     }