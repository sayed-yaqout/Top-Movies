const MOVIES_API_KEY =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=4ad8cb5b2b8f3f393d5fbb1e73651f69&language=en-US";

//============================================================MOVIES API================================================\\
var moviesComponent = (function () {
  var movies;
  var gallery = document.querySelector(".gallery");
  var template = document.getElementById("moviestemp").innerHTML;

  function init() {
    fetchData()
      .then((res) => res.json())
      .then((data) => {
        render(data);
        initialize_flickity();
      });
  }
  function fetchData() {
    return fetch(MOVIES_API_KEY);
  }
  function render(moviesData) {
    movies = moviesData.results;
    for (var i = 0; i < movies.length; i++) {
      var rendered = Mustache.render(template, {
        poster: `https://image.tmdb.org/t/p/w200/${movies[i].poster_path}`,
      });
      gallery.innerHTML += rendered;
    }
  }
  function initialize_flickity() {
    var elem = document.querySelector(".gallery");
    var flkty = new Flickity(elem, {
      // options
      wrapAround: true,
      autoPlay: true,
      prevNextButtons: false,
      freeScroll: true,
      contain: true,
      pageDots: false,
    });
  }
  
  return {
    init: init,
  };
})();

moviesComponent.init();

// //====================================old script========================================\\
// //get fetched data from news API
// let movies;

// fetch(MOVIES_API_KEY)
//   .then((res) => res.json())
//   .then((data) => initialize(data))
//   .catch((err) => console.log("Error", err));

// function initialize(moviesData) {
//   console.log(moviesData)
//   movies = moviesData.results;
//   let gallery = document.querySelector(".gallery");
//   let template = document.getElementById("moviestemp").innerHTML;

//   for (let i = 0; i < movies.length; i++) {
//     var rendered = Mustache.render(template, {
//       poster:`https://image.tmdb.org/t/p/w200/${movies[i].poster_path}`
//     });

//     gallery.innerHTML += rendered;
//   }
// }

// // Delay in loading flickity plugin
// setTimeout(load_js, 0);

// function load_js() {
//   // Get the head tag
//   var head_ID = document.getElementsByTagName("head")[0];
//   // Create script element
//   var script_element = document.createElement("script");
//   // Set the script type to JavaScript
//   script_element.type = "text/javascript";
//   // External JS file
//   script_element.src = "https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js";
//   head_ID.appendChild(script_element);
// }
