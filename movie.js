
const API_URL = "https://api.themoviedb.org/3/movie/top_rated?language=en-US";
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYWNkMDVkZTZjOWM3MTBiYzU0MzhmYTg5ZjUyYWE4NSIsInN1YiI6IjY2MjZmZGM2MTc2YTk0MDE0YzgxMWNjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0naOsrPh8Sb0tfLpHipj5GrfY-DcLA5PlKhUEFdLjTQ'
    }
};

function fetchMovies(searchWord) {
    fetch(API_URL, API_OPTIONS)
        .then(response => response.json())
        .then(data => renderMovies(data.results, searchWord))
        .catch(err => console.error('영화 정보를 가져오는 중 에러가 발생:', err));
}

function renderMovies(movieData, searchWord) {
    const cardListElement = document.querySelector('.card-list');
    if (movieData) {
        movieData.forEach(movie => {
            if (searchWord && !movie.original_title.toLowerCase().includes(searchWord)) return;
            const movieHTML = `
                <div class="movie-card" id="${movie.id}">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.original_title}">
                    <h3 class="movie-title">${movie.original_title}</h3>
                    <p>${movie.overview}</p>
                    <p>Rating: ${movie.vote_average}</p>
                </div>
            `;
            cardListElement.insertAdjacentHTML("beforeend", movieHTML);
        });
    }
}

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

function setupEventListeners() {
    document.querySelector('.card-list').addEventListener('click', event => {
        const movieCard = event.target.closest('.movie-card');
        if (movieCard) {
            alert(`영화 ID는 ${movieCard.id} 입니다`);
        }
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        document.querySelector('.card-list').innerHTML = '';
        fetchMovies(searchInput.value.toLowerCase());
    });
}


fetchMovies(); 
setupEventListeners();