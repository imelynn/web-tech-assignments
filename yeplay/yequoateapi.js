const getQuote = async function () {
    const res = await fetch ("https://api.kanye.rest");
    const yequote = await res.json();
    console.log(yequote);
    document.getElementById("quote").innerHTML = yequote.quote;
  
}

getData();

async function getData(){
       const response= await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
       .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("NETWORK RESPONSE ERROR");
        }
      })
      .then(data => displayCocktail(data))
      .catch((error) => console.error("FETCH ERROR:", error));
   
  }
function displayCocktail(data) {
        const cocktail = data.drinks[0];
        const cocktailDiv = document.getElementById("tablegrid");
        const nameDiv = document.getElementById("namegrid");
        const cocktailName = cocktail.strDrink;
        nameDiv.append(cocktailName);
        const cocktailImg = document.createElement("img");
        cocktailImg.src = cocktail.strDrinkThumb;
        cocktailDiv.appendChild(cocktailImg);
        
const getIngredients = Object.keys(cocktail)
        .filter(function (ingredient) {
        return ingredient.indexOf("strIngredient") == 0;
    })
        .reduce(function (ingredients, ingredient) {
         if (cocktail[ingredient] != null) {
        ingredients[ingredient] = cocktail[ingredient];
      }
      return ingredients;
    }, {});

  for (let key in getIngredients) {
    let value = getIngredients[key];
    let listItem = document.createElement("li");
    listItem.innerHTML = value;
    cocktailDiv.appendChild(listItem);
  }
}

/*var btn = document.querySelector('#getquote2');

btn.addEventListener('click', function (event) {
	getData()
});*/


