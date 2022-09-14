class Comment extends HTMLElement{
    constructor(){
        super()

        this.attachShadow ({mode: "open"});
        this.shadowRoot.appendChilddocument(template.content.cloneNode(true));
    }
}

export const createComment = () => {
    var userName = document.getElementById("name").value;
    var userComment = document.getElementById("comment").value;

    var results = document.querySelector("#comsection");

    results.append(`Name: ${userName}`);
    results.append(userComment);
};
  
  
customElements.define('comment-component', Comment)

















/*export const formSubmit = () => {
    
document.getElementById("#com-fav").addEventListener("submit", function (e){
    e.preventDefault();
    if (data) {
        data = textarea.value, userName.value;

        const form = document.getElementById('com-form');
        const log = document.getElementById('log');
        const userName = this.getElementsById('name').value;
        const userComment = this.getElementById('comment').value;
        results = document.querySelector("#comsection");    

    result.append(`Name: ${userName}`);
    result.append(`${userComment}`);
}
});
};

    export const createComment = () => {
        const name = this.getAttribute('name');
        const comment = this.getAttribute('comment');
    
        this.innerHTML = `
        <div class='comsection'>
          <p>${name}</p>
          <hr>
          ${comment}`
}
*/


    