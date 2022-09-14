import { movieDB } from './indexdb.js'

export default {
    comments: []
};

export class MovieStore{
    constructor(init = {}){
    const self= this;
    this.subscribers = [];
    this.addFav = addFavorites();
    this.removeFav = removeFavories();
    this.state = new Proxy(init, {
        async set(state, key, value) {
            state[key] = value;
            if(key !=='searchTerm'){
                state.searchTerm = value;
            }
            if (self.db) {
                await self.db.put('loadMovies', state, 'searchTerm');
            }
            self.subscribers.forEach((subscriber) => subscriber(state));
            return true;
        }
    });
}

subscribe(cb) {
    if(typeof cb !== "function"){
        throw new Error("You must subscribe with a function");
    }
    this.subscribers.push(cb);
    cb(this.state);
}
get(key){
    return this.state[key];
}

set(key){
    return this.state[key];
}



addFavorites(){
    
    favButton.setaddEventListener('click', ({ target }) => {
        if(target.textContent === 'Add to Favorites'){
        setMovieFav(data.imdbID, data);
    
    } else {
        return(this.removeFavorites);
    }
});
};

removeFavorites(){
    const favButton = document.getElementById('removefavorties');
    favButton.setaddEventListener('click', async() => {
        (await movieDB).delete('favoriteMovie', key);
        window.location.reload();
    });
};

createComment(){
const comContainer = document.getElementById('testdiv');  
const form = document.getElementById('com-fav')
const name = document.getElementById('name');
const textarea = document.getElementById('comment');
const submitComment = document.getElementById('subcom');
const editComment = document.createElement('button');
    editComment.textContent = 'Edit Comment';
    editComment.classList.add('yellow-button');
    editComment.classList.add('comment');
const remarks = document.createElement('p');
    remarks.classList.add('comment');

    comContainer.append(form, name, textarea, remarks, submitComment, editComment);
  div.append(testdiv);

getRemarks('remarks').then((data) => {
    if(data) {
        remarks.innerHTML = `${data}`;
        textarea.value = data;
        submitComment.textContent = 'View Comment';
    } else {
        submitComment.textContent = 'Add Comment';
        textarea.classList.remove('comment')
    }
});

submitComment.addEventListener('click', (e) => {
    const element = e.target;
    const InputElem = element.previousElementSibling.previousElementSibling;
    const InputValue = InputElem.value;
    if (element.textContent === 'Add Comment') {
        if (InputValue) {
          setSearchMovie('remarks', InputValue);
          InputElem.classList.add('comment');
          element.textContent = 'View Comment';
          window.location.reload();
        } else {
          InputElem.placeholder = 'Input is missing?';
          InputElem.classList.add('red-input');
        }
      } else if (element.textContent === 'View Comment') {
        remarks.classList.remove('comment');
        element.textContent = 'Hide Comment';
        editComment.classList.remove('comment');
        editComment.addEventListener('click', () => {
          InputElem.classList.remove('comment');
          remarks.classList.add('comment');
          element.textContent = 'Add Comment';
          editComment.classList.add('comment');
        });
      } else {
        editComment.classList.add('comment');
        remarks.classList.add('comment');
        element.textContent = 'View Comment';
      }
    });

//listen for clicks
document.addEventListener("DOMContentLoaded", () => {
    const add = document.querySelector("#addFavorties");
    const remove = document.querySelector("#removeFavorites");
    //setup buttons to change state of store
    add.addEventListener("click", () => {
        store.addFavorites();
    });
    remove.addEventListener("click", () => {
        store.removeFavorites();
    });
});
};
};

export const store = new MovieStore({searchTearm: ''});















/*;(function (window) {
    'use strict'
  
    class State {
      constructor() {
        this.id = 1
        this.form = {
          focus: false,
          valid: false
        }
        this.items = []
      }
  
      addItem(item) {
        this.items.unshift({
          id: this.itemId++,
          status: 0,
          value: item
        })
        this.saveItems()
      }
    }
  
    window.State = State
  })(window)

  /*;(function (State) {
    'use strict'
  
    export default class App {
      constructor(search) {
        this.name = search
        this.state = new State(search)
        this.dom = {
          movieSearchBox: document.querySelector('movie-search-box'),
          resultGrid: document.querySelector('result-grid'),
          searchlist: document.querySelector('search-list'),
          searchform: document.querySelector('form'),
          form: document.querySelector('com-fav'),
          button: document.querySelector('favorites'),
          name: document.querySelector('name'),
          comment: document.querySelector('comments')
        };
        this.bindEvents();
			this.render();
		}

		bindEvents() {
			this.dom.movieSearchBox.addEventListener('click', this.handleClick.bind(this));
			this.dom.movieSearchBox.addEventListener('keyup', this.keyUp.bind(this));
			this.dom.movieSearchBox.addEventListener('focus', this.focus.bind(this));
			this.dom.movieSearchBox.addEventListener('blur', this.blur.bind(this));
            this.dom.form.addEventListener('submit', this.submitForm.bind(this));
			this.dom.button.addEventListener('focus', this.focus.bind(this));
			this.dom.button.addEventListener('blur', this.blur.bind(this));
		}
      }
    }


    const app = new App('moviesearch-state-example')
  })(window.State)

  render() {
    let listHTML = '';
    for (const item of this.state.items) {
        const className = item.status ? 'done' : '';
        listHTML += '';
        listHTML += '';
        listHTML += item.value + 'x';
    }

    this.dom.date.innerHTML = this.state.date;
    this.dom.form.classList.toggle('focus', this.state.form.focus);
    this.dom.form.classList.toggle('valid', this.state.form.valid);
    this.dom.list.innerHTML = listHTML;
}*/

