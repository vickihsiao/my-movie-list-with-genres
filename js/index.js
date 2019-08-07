(function () {

  // =================== Declare Variables ===================
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies'
  const POSTER_URL = BASE_URL + '/posters/'

  const genrePanel = document.querySelector('.genre-panel')
  const moviePanel = document.querySelector('.movie-panel')
  const data = []

  const genre = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }

  // =================== Declare Functions ===================

  function displayGenre() {
    let htmlContent = ''
    htmlContent += `<div class="list-group" id="list-tab" role="tablist">`
    Object.keys(genre).forEach(index => {
      htmlContent += `
        <a class="list-group-item list-group-item-action" id="list-genre-list" data-toggle="list"
          href="#list-genre" role="tab" aria-controls="genre" data-index="${index}">${genre[index]}</a>
      `
    })
    htmlContent += `</div>`
    genrePanel.innerHTML = htmlContent
  }

  function loadAndDisplayAllData() {
    axios
      .get(INDEX_URL)
      .then(response => {
        data.push(...response.data.results)
        displayDataList(data, 'all')
      })
      .catch((err) => console.log(err))
  }

  function displayDataList(data, category) {
    let htmlContent = ''
    htmlContent += `<div class="row">`

    data.forEach(function (item, index) {
      let genres = item.genres

      if (category == 'all' || genres.includes(parseInt(category))) {
        htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top" src="${POSTER_URL}${item.image}" alt="Movie image">
            <div class="card-body movie-item-body">
              <h5 class="card-title">${item.title}</h5>
        `
        genres.forEach(index => {
          htmlContent += `<span class="badge badge-pill badge-light"><small>${genre[index]}</small></span>`
        })
        htmlContent += `              
            </div>
          </div>
        </div>
      `
      }
    })
    htmlContent += `</div>`
    moviePanel.innerHTML = htmlContent
  }
  // =================== Execute Codes ===================

  displayGenre()
  loadAndDisplayAllData()

  // event listener (genre panel)
  genrePanel.addEventListener('click', function (event) {
    displayDataList(data, event.target.dataset.index)
  })

})()


