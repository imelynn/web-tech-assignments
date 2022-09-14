(function () {
  // check for IndexedDB support
  if (!window.indexedDB) {
      console.log(`Your browser doesn't support IndexedDB`);
      return;
  }

  // open the database with the version 1
  const request = indexedDB.open('movieDB', 1);

  // create the Favorites object store and indexes
  request.onupgradeneeded = (event) => {
      let db = event.target.result;

      // create the Favorites object store 
      // with auto-increment id
      let store = db.createObjectStore('Favorites', {
          autoIncrement: true
      });

      // create an index on the id property
      let index = store.createIndex('imdbID', 'imdbID', {
          unique: true
      });
  };

  // handle the error event
  request.onerror = (event) => {
      console.error(`Database error: ${event.target.errorCode}`);
  };

  // handle the success event
  request.onsuccess = (event) => {
      const db = event.target.result;

      deleteMovie(db, 1);

  };

  function storeFavorite(db, movie) {
      // create a new transaction
      const txn = db.transaction('Movies', 'readwrite');

      // get the Favorites object store
      const store = txn.objectStore('Favorites');
      //
      let query = store.put(movie);

      // handle success case
      query.onsuccess = function (event) {
          console.log(event);
      };

      // handle the error case
      query.onerror = function (event) {
          console.log(event.target.errorCode);
      }

      // close the database once the 
      // transaction completes
      txn.oncomplete = function () {
          db.close();
      };
  }


  function getFavoriteById(db, id) {
      const txn = db.transaction('Movies', 'readonly');
      const store = txn.objectStore('Favorites');

      let query = store.get(id);

      query.onsuccess = (event) => {
          if (!event.target.result) {
              console.log(`The movie with ${id} not found`);
          } else {
              console.table(event.target.result);
          }
      };

      query.onerror = (event) => {
          console.log(event.target.errorCode);
      }

      txn.oncomplete = function () {
          db.close();
      };
  };

  function getFavoriteByTitle(db, title) {
      const txn = db.transaction('Movies', 'readonly');
      const store = txn.objectStore('Favorites');

      // get the index from the Object Store
      const index = store.index('title');
      // query by indexes
      let query = index.get(title);

      // return the result object on success
      query.onsuccess = (event) => {
          console.table(query.result); // result objects
      };

      query.onerror = (event) => {
          console.log(event.target.errorCode);
      }

      // close the database connection
      txn.oncomplete = function () {
          db.close();
      };
  }

  function getAllFavorites(db) {
      const txn = db.transaction('Movies', "readonly");
      const objectStore = txn.objectStore('Favorites');

      objectStore.openCursor().onsuccess = (event) => {
          let cursor = event.target.result;
          if (cursor) {
              let movie = cursor.value;
              console.log(movie);
              // continue next record
              cursor.continue();
          }
      };
      // close the database connection
      txn.oncomplete = function () {
          db.close();
      };
  }


  function deleteFavorite(db, id) {
      // create a new transaction
      const txn = db.transaction('Movies', 'readwrite');

      
      const store = txn.objectStore('Favorites');
      //
      let query = store.delete(id);

      // handle the success case
      query.onsuccess = function (event) {
          console.log(event);
      };

      // handle the error case
      query.onerror = function (event) {
          console.log(event.target.errorCode);
      }

      // close the database once the 
      // transaction completes
      txn.oncomplete = function () {
          db.close();
      };

  }
})();

/*import { openDB } from 'idb';

export const movieDB = openDB('movieDB', 1, {
  upgrade(db) {
    db.createObjectStore('MovieSearch');
    db.createObjectStore('FavSave');
  }
});

export const setSearchMovie = async (key, data) =>
  (await database).put('searchMovie', data, key);

export const setFavMovie = async (key, data) =>
  (await database).put('favoriteMovie', { data }, key);

export const getComments = async (key) =>
  (await database).get('searchMovie', key);
  */
    
    