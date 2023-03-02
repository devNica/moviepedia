import axios from 'axios'

const API_KEY = '7f350e47163a6d3721f03bb058fc5580'

const api = {}

api.fetchGenresFromAPI = async () => {
    return await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`, {
        headers: {
            'Content-Type': 'applications/json'
        }
    })
}

api.fetchMoviesByGenreId = async genreId => {
    return await axios.get(`https://api.themoviedb.org/3/movie/${genreId}/lists?api_key=${API_KEY}`, {
        headers: {
            'Content-Type': 'applications/json'
        }
    })
}

api.fetchPopulaMovies = async (page) => {
    return await axios.get(`https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${API_KEY}`, {
        headers: {
            'Content-Type': 'applications/json'
        }
    })
}

export default api