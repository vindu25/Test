const host = 'https://api.edamam.com/search';
const appId = '4629df7d';
const apiKey = 'a04da6cfd96bad9e15d82c5ce59d012a';

function getRecipes(query) {
  $.ajax({
    url: `${host}?app_id=${appId}&app_key=${apiKey}&q=${query}`,
    success: function (result) {
      console.log(result);
      loadRecipes(result);
    }
  });
}

function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

function loadRecipes(result) {
  let recipes = result.hits;
  recipes.forEach(recipe => {
    $('#recipes').html = "";
    $('#recipes').append(
      `<div class="recipe-card card" style="width: 18rem;">
      <img src="${recipe.recipe.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${recipe.recipe.label}</h5>
        <p class="card-text">Time: ${recipe.recipe.totalTime} | Calories: ${kFormatter(recipe.recipe.calories)}cal.</p>
        <a href="${recipe.recipe.url}" class="btn btn-primary stretched-link">More</a>
      </div>
    </div>`
    );
    $('#recipes').show();
  });
}

$(document).ready(function(){
  $('#search-button').click(function () {
    let userQuery = $('#search-input').val();
    if (userQuery) {
      getRecipes(userQuery);
    }
  });

  $('#search-input').keypress(function(event){
    let key = (event.key ? event.key : event.which);
    if(key === 'Enter'){
      let userQuery = $('#search-input').val();
      if (userQuery) {
        getRecipes(userQuery);
      }
    }
  });
});
