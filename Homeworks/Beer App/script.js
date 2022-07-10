//Reusable items
let baseUrl = `https://api.punkapi.com/v2/beers`;

let beerSortedBy = '';
let beersPerPage = 5;

let page = 1;

let sortByPage = $('#select-page');
let sortByProperties = $('#sort-by');

let nextPage = $('#next-btn')
let previousPage = $('#previous-btn');

//Beer Description Reusable 
function showOneBeer(response) {
  let foodLength = response.food_pairing.length;
  console.log(foodLength);
  let randomBeerMainDiv = $('#random-beer-main');

  randomBeerMainDiv.html('');
  let randomBeer = $('<div></div>');
  randomBeer.attr("id", "radom-beer");
  randomBeer.html(`
<img src="${response.image_url}" id="beer-image" alt="beer image" width="200" height="500">
        <div id="show-random-beers">
            <div>
                <h4 id="beer-title">${response.name}&nbsp; "${response.tagline}"</h5>
                <p >${response.description}.</p>
                <p >Alcohol %: ${response.abv}</p>
                <p >Bitterness: ${response.ibu}</p>
                <p >First brewed: ${response.firstBrewed}</p>
                <p>Food Pairing</p>
            </div>
            
            <ul id ="addFoodPairing"> 
            </ul>
        </div>
    `);
  for (let index = 0; index < foodLength; index++) {
    $("#addFoodPairing").append(`
        <li>${response.food_pairing[index]}</li>`);
  }

  randomBeerMainDiv.append(randomBeer);
}


console.log(page);


//Beer-Bar

async function sortBeersBy(url, value) {
    let data = await fetch(url);
    let data2 = await data.json();

    let sortedBeers = [];
    switch (value) {
      case "abv-low-to-high":
        sortedBeers = data2.sort((a, b) => a.abv - b.abv);
        break;
      case "abv-high-to-low":
        sortedBeers = data2.sort((a, b) => b.abv - a.abv);
        break;
      case 'ibu-low-to-high':
        sortedBeers = data2.sort((a, b) => a.ibu - b.ibu);
        break;

      case 'ibu-high-to-low':
        sortedBeers = data2.sort((a, b) => b.ibu - a.ibu);
        break;

      case 'A-Z':
        sortedBeers = data2.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'Z-A':
        sortedBeers = data2.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'first-brewed':
        sortedBeers =data2.sort((a, b) =>
        a.first_brewed.split('/').reverse().join('') - b.first_brewed.split('/').reverse().join(''));
        // console.log(sortedBeers)
        break;
      default:
        break;
    }
    console.log(sortedBeers);
    return sortedBeers;
}

//Get Beer Data
async function getBeerBarData(url) {
    return await fetch(url).then(response => response.json());
}

//Show multiple Beers on Screen
function showBeersOnBeerBar(response) {
  let div = $('#show-beers');
  div.html('');
  for (let i = 0; i < response.length; i++) {
    let divForImage = $('<div></div>');
    divForImage.attr('id', 'div-for-image');
    let image = $('<img>');
    image.attr('id', 'main-image-beer');
    image.attr('src', `${response[i].image_url}`);
    let nameOfBeer = $('<p></p>');
    nameOfBeer.html(`<b>Name:</b> ${response[i].name}`);
    let beerDescription = $('<p></p>');
    beerDescription.html(`<b>Description:</b> ${response[i].tagline}`);
    let ShowMoreInfoBtn = $('<button></button>');
    ShowMoreInfoBtn.html('More Details');
    ShowMoreInfoBtn.attr('id', 'more-details-btn');
    divForImage.append(image, nameOfBeer, beerDescription, ShowMoreInfoBtn);
    div.append(divForImage);
    ShowMoreInfoBtn.on('click', function () {
      $('#show-beers').hide();
      backButton.show();
      backButton.attr('id', 'back-btn');
      $('#beer-bar-main').hide();
        showOneBeer(response[i]);
      $('#random-beer-main').show();
      $('#random-beer-main').append(backButton);
      backButton.on('click', function () {
        $('#show-beers').show();
        document.getElementById('beer-bar-main').style.display = 'block';
        $('#random-beer-main').hide();

      })

    })

  }
  numberOfPage();
}
//Page Number
function numberOfPage(){
  // console.log(beersPerPage);
  let lastPage = Math.ceil(325 / beersPerPage);
  $('#show-page-number').html(`page: ${page} of ${lastPage}`);
}

//Reusable
let backButton = $('<button>Back</button>');
let homePage = $('#main-div');
let beersPage = $('#beer-bar-main');
let randomBeerPage =  $('#random-beer-main');
let selectingMenu = $('#selecting-menu');
let changePages = $('#change-pages');

//Events
$('#beer-bar').on('click', function () {
  console.log("Click");
    homePage.show();
  beersPage.hide();
  randomBeerPage.hide();
});

$('#beers').on('click', async function () {
  console.log("Click");
  beersPage.show();
  homePage.hide();
  randomBeerPage.hide();
  $('#show-beers').show();
  selectingMenu.show();
  changePages.show();
  // console.log(page);
  let url = `${baseUrl}?page=${page}&per_page=${beersPerPage}`;
  let response = await getBeerBarData(url);
  // console.log(response);
  numberOfPage();
  showBeersOnBeerBar(response);

});

$('#random-beer').on('click', async function () {
  console.log("Click");
  homePage.hide();
  beersPage.hide();
  randomBeerPage.show();
  backButton.hide();
  let response = await getBeerBarData(baseUrl + '/random');
  showOneBeer(response[0]);

});

//Sort Beers by properties and page Events
sortByPage.on('change', async (e) => {
  e.preventDefault();
  page = 1;
  beersPerPage = e.target.value;
  let url = `${baseUrl}?page=${page}&per_page=${beersPerPage}`;
  let response = await getBeerBarData(url);
  // console.log(response);
  showBeersOnBeerBar(response);
})

sortByProperties.on('change', async (e) => {
  e.preventDefault();
  value = e.target.value;
  let url = `${baseUrl}?page=${page}&per_page=${beersPerPage}`
  let response = await sortBeersBy(url, value);
  // console.log(response);
  showBeersOnBeerBar(response);

})


//Next and Previos Page

nextPage
  .on('click', async function () {
    console.log('Next');
    page++;
    let ItemsPerPAge = Math.ceil(325 / beersPerPage);
    if(page > ItemsPerPAge){
      page = ItemsPerPAge;
    }
    console.log(page);
    let url = `${baseUrl}?page=${page}&per_page=${beersPerPage}`;
    let response = await getBeerBarData(url);
    console.log(response);
    showBeersOnBeerBar(response);

  })

previousPage
  .on('click', async function () {
    console.log('Previous');
    page--;
    console.log(page)
    if(page < 1){
      page = 1;
    }
    let url = `${baseUrl}?page=${page}&per_page=${beersPerPage}`;
    let response = await getBeerBarData(url);
    console.log(response);
    showBeersOnBeerBar(response);

  })

// Events from Search Button

$('#search-btn')
  .on('click', async function () {
    let searchInput = $('#search');
    let searchUrl = `${baseUrl}?beer_name=${searchInput.val()}`;
    let data = await getBeerBarData(searchUrl);
    console.log(data);

    if (searchInput.val() === '') {
      alert('Please enter some beer name');
    }
    else {

      showBeersOnBeerBar(data);
      $('#selecting-menu').hide();
      $('#change-pages').hide();
       homePage.hide();
      beersPage.show();
      randomBeerPage.hide();
      backButton.hide();

    }
  })

