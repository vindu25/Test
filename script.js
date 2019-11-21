const host = 'https://api.edamam.com';
const appId = '4629df7d';
const apiKey = 'a04da6cfd96bad9e15d82c5ce59d012a';


// Recipes
function getRecipes(query) {
  $.ajax({
    url: `${host}/search?app_id=${appId}&app_key=${apiKey}&q=${query}`,
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
    $('#recipes').empty();
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

// Nutrition Analysis

function getNutrientsAnalysis(data) {
  $.ajax({
    url: `${host}/api/nutrition-details?app_id=${appId}&app_key=${apiKey}`,
    data: data,
    success: function (result) {
      console.log(result);
      loadAnalysis(result);
    }
  });
}

function loadAnalysis(result) {

  $('#nutri-analysis').empty();
  $('#nutri-analysis').append(`
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  `);

}

// Pics
function getPics(query) {
  $.ajax({
    url: `https://pixabay.com/api/?key=14364869-414b6dacd3d280678663edb95&q=${query}`,
    success: function (result) {
      loadPics(result);
    }
  });
}

function loadPics(result) {
  let pics = result.hits;
  pics.forEach(pic => {
    $('#pics').empty();
    $('#pics').append(
      `<div class="pic-card card" style="width: 18rem;">
      <img src="${pic.previewURL}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${pic.user}</h5>
        <p class="card-text">Likes: ${pic.likes} | Views: ${pic.views}</p>
      </div>
    </div>`
    );
    $('#pics').show();
  });
}

$(document).ready(function(){
  // Get Recipes
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

  // Get Nutrient Analysis
  $('#analyse').click(function () {
    let data = $('#ingredients-input').val();
    console.log(data);
    if (data) {
      console.log(data.split(","));
      data = { ingr: data.split(",") };
      getNutrientsAnalysis(data);
    }
  });

  // Get Nutrient Analysis
  $('#pic-search-button').click(function () {
    let userQuery = $('#pic-search-input').val();
    if (userQuery) {
      getPics(userQuery);
    }
  });
  $('#pic-search-input').keypress(function(event){
    let key = (event.key ? event.key : event.which);
    if(key === 'Enter'){
      let userQuery = $('#pic-search-input').val();
      if (userQuery) {
        getPics(userQuery);
      }
    }
  });
});
