import { configureStore } from "@reduxjs/toolkit"
import genresReducer from './genres.slice'
import moviesReducer from './movies.slice'

const store = configureStore({
    reducer: {
        genres: genresReducer,
        movies: moviesReducer,
    }
})


export default store