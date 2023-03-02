import { createSlice } from '@reduxjs/toolkit'
import api from '../services/api'

const { fetchPopulaMovies } = api

const initialState = {
    popularMovies: [],
    favoriteMovies: [],
    page: 1,
    totalResults: 0,
    totalPages: 0,
    resultPerpage: 0,
    isLoading: true,
    error: null
}

const movieSlice = createSlice({
    name: "movies",
    
    initialState,
    
    reducers: {
        fetchMoviesStart(state){
            return {
                ...state,
                isLoading: true, 
                error: null
            }
        },

        fetchMoviesSuccess(state, action) {
            return {
                ...state,
                popularMovies: action.payload.movies,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                totalResults: action.payload.totalResults,
                resultPerpage: action.payload.resultPerpage,
                isLoading: false,
                error: null
            }
        },
        setMovieFavorite(state,action){
            const movieId = action.payload
            state.popularMovies.map(m=>{
                if(m.id === movieId) m.isFavorite = !m.isFavorite
                return m
            })

            state.favoriteMovies = [...state.popularMovies.filter(m=>m.isFavorite===true)]
        },

        setError(state,action) {
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        }
    }
})

export const fetchPopularMovies = (pageNumber=1) => {
    return async (dispatch) => {
        dispatch(fetchMoviesStart())
        try {
            const response = await fetchPopulaMovies(pageNumber)

            const { results, page, total_pages, total_results } = response.data

            let movies = []

            if(Array.isArray(results)) {
               movies = results.sort((a, b)=> b.vote_average - a.vote_average)
               movies = movies.map(m=>{
                return {
                    ...m,
                    isFavorite: false
                }
               })
            }

            const payload = {
                movies,
                page,
                totalPages: total_pages,
                totalResults: total_results,
                resultPerpage: Math.ceil(total_results / total_pages),
            }
            
            dispatch(fetchMoviesSuccess(payload))
            
        } catch (error) {
            dispatch(setError(error))
        }
    }
}

export const { fetchMoviesSuccess, fetchMoviesStart, setError, setMovieFavorite } = movieSlice.actions

export default movieSlice.reducer