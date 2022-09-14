//create custom favorite element

import { MovieStore } from "./state";

class Favorite extends HTMLElement{
    constructor(){
        super();

        const shadow = this.attachShadow({mode: "open" });
        const template = document.getElementById("favlist").content.cloneNode(true);
        shadow.append(template);
        this.favlist = this.shadowRoot.querySelector("favlist");
       }

       static get observedAttributes() {
        return[this.addFav, this.removeFav];
    }

    //change favorite state when attribute changes
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        if (property === this.addFav || this.removeFav) {
            this.favlist.value = newValue;
        }
    }
    connectedCallback() {
        MovieStore.subscribe((state) => {
            this.setAttribute(state.addFav, state.removeFav)
        });
    }
    }

    

    customeElements.define("favorite-movie", Favorite)






/*const addFavorites = (div, data) => {
    const addFav = document.getElementById('favorites');
      addFav.classList.add('green-button');
      addFav.addEventListener('click', ({ target }) => {
      if (target.textContent === 'favorites') {
        setSaveFav(data.imdbID, data);
        addFav.textContent = 'Remove from fav';
        addFav.classList.add('red-button');
      } else {
        addFav.textContent = 'add to fav';
        addFav.classList.remove('red-button');
      }
    });
  
    div.append(addFav);
  };

  const deleteFav = (div, key) => {
    const addFav = document.getElementById('favorites');
    addFav.textContent = 'Remove';
    addFav.classList.add('red-button');
    div.append(addFav);
  
    addFav.addEventListener('click', async () => {
      (await database).delete('favoriteMovie', key);
      window.location.reload();
    });
  };*/