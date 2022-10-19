let DB;

let movieSearchBox = document.getElementById('movie-search-box');
let searchList = document.getElementById('search-list');
let resultGrid = document.getElementById('result-grid');

// create the database
let MovieDB = window.indexedDB.open('movies', 1);

// if there's an error
MovieDB.onerror = function() {
     console.log('error');
}
// if everything is fine, assign the result is to the (letDB) instance 
MovieDB.onsuccess = function() {
     // console.log('Database Ready');

     
     DB = MovieDB.result;
}

MovieDB.onupgradeneeded = function(e) {
          
    let db = e.target.result;
    
    let objectStore = db.createObjectStore('searches', { keyPath: 'key', autoIncrement: true } );

  
    objectStore.createIndex('MovieTitle', 'MovieTitle', { unique: false } );
    objectStore.createIndex('MovieYear', 'MovieYear', { unique: false } );
    objectStore.createIndex('MovieType', 'MovieType', { unique: false } );
    objectStore.createIndex('MoviePoster', 'MoviePoster', { unique: false } );
    objectStore.createIndex('MovieID', 'MovieID', { unique: true } );

    //console.log('Database ready and fields created!');
}