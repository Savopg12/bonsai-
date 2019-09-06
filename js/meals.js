/**
 * Return one meal from themealdb.com in json.
 */
 function fetchMeal(idMeal) {
     return fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+ idMeal)
         .then(function(response) {
             return response.json();
         });
 }

function fetchRandomMeal() {
    return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(function(response) {
            return response.json();
        });
}

function createMealCard(mealDate) {
    return '<div class="card mb-3 col-sm-4">'
        + '<div class="row no-gutters">'
            + '<div class="col-md-4">'
                + '<img src="' + mealDate.meals[0].strMealThumb + '" class="card-img" alt="...">'
            + '</div>'
        + '<div class="col-md-8">'
            + '<div class="card-body">'
                + '<h5 class="card-title">Title:' + mealDate.meals[0].strMeal + '</h5>'
                + '<h5>Category:' + mealDate.meals[0].strCategory + '</h5>'
                + '<h5>Tags:' + mealDate.meals[0].strTags + '</h5>'
            + '</div>'
          +'</div>'
        + '</div>'
      + '</div>'

}

function createMiniCard(mealDate) {
  return '<a href="">'
    + '<div class="card" style="width: 18rem;">'
      +  '<img src="' + mealDate.meals[0].strMealThumb + '" class="card-img-top" alt="">'
      +  '<div class="card-body">'
      +    '<h3 class="card-text">' + mealDate.meals[0].strMeal + '</h3>'
      +  '</div>'
      + '</div>'
     + '</a>';
}

function bgCardSlider(mealDate) {
  return '<a href="">'
        + '<div class="card">'
          +  '<img src="' + mealDate.meals[0].strMealThumb + '" class="card-img-top" alt="">'
          +  '<div class="card-button">'
          +    '<a data-id-meal="'  + mealDate.meals[0].idMeal + '" href="#" type="button" class="btn open-modal btn-warning">Read more</a>'
          +  '</div>'
        + '</div>'
      + '</a>';
}

function createSlider(slider, active) {
  var cards = [];

  var resolveSlider = function () {
    var result = '<div class="carousel-item' + (active ? ' active' : '') + '"><div class="carousel-item-inner">';
    for (var i = 0; i < cards.length; ++i) {
      result = result + bgCardSlider(cards[i]);
    }
    result += '</div></div>';
    slider.innerHTML = slider.innerHTML + result;
    initModalLinks();
  }

  var promise = new Promise(function (resolve, reject) {
      fetchRandomMeal().then(function (data) {
          cards.push(data);
          fetchRandomMeal().then(function (data) {
            cards.push(data);
            fetchRandomMeal().then(function (data) {
              cards.push(data);
              resolveSlider();
            });
          });
      });
  });
}

function loadMore() {
  var topRated = document.querySelector('.top-rated');
  for (var i = 0; i < 3; ++i) {
    fetchRandomMeal().then(function (data) {
      topRated.innerHTML = topRated.innerHTML + createMealCard(data);
      initModalLinks();
    });
  }
}

function modalWindow() {
  fetchMeal(this.dataset.idMeal).then(function (data) {
    $('#modal').modal({})
    var modalBody = document.querySelector('.modal-body')
    modalBody.innerHTML = createMealCard(data);
  });
}

function initModalLinks() {
  var openModal = document.getElementsByClassName('open-modal')
  for(var i = 0; i < openModal.length ; ++i) {
    openModal[i].addEventListener("click", modalWindow)
  }
}

window.onload = function() {
  //
  var topRated = document.querySelector('.top-rated');
  for (var i = 0; i < 6; ++i) {
    fetchRandomMeal().then(function (data) {
      topRated.innerHTML = topRated.innerHTML + createMealCard(data);
      initModalLinks();
    });
  }

  //
  var bestTeaser = document.querySelector('.teaser_best');
  for (var i = 0; i < 2; ++i) {
    fetchRandomMeal().then(function (data) {
      bestTeaser.innerHTML = bestTeaser.innerHTML + createMiniCard(data);
      initModalLinks();
    });
  }

  var slider = document.querySelector('.carousel-inner');
  for (var i = 0; i < 3; ++i) {
     createSlider(slider, i == 0 ? true : false);
   }


   var moreBtn = document.querySelector('.load-more-top-rated');
   moreBtn.addEventListener("click", loadMore);


}