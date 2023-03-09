import { createSlice } from '@reduxjs/toolkit'
import api from '../services/api'
import { _randomSlice } from '../utils/object-helper'

const { fetchPopulaMovies } = api

const initialState = {
    randomMovies: [],
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
        fetchMoviesStart(state) {
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
                randomMovies: action.payload.randomMovies,
                isLoading: false,
                error: null
            }
        },
        setMovieFavorite(state, action) {
            const movieId = action.payload

            //buscar en lista de favoritos para removerla en caso de que ya exista
            if (state.favoriteMovies.filter(m => m.id === movieId).length > 0) {
                const movies = state.favoriteMovies.filter(m => m.id !== movieId)
                state.popularMovies.map(m => {
                    if (m.id === movieId) m.isFavorite = false
                    return m
                })
                state.favoriteMovies = movies
            } else {
                //si no esta en la lista de favoritos, agregarla
                const movie = state.popularMovies.find(m => m.id === movieId)
                movie.isFavorite = true
                state.favoriteMovies = [...state.favoriteMovies, movie]
            }
        },

        setError(state, action) {
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        }
    }
})

export const fetchPopularMovies = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(fetchMoviesStart())
        try {
            const favoriteMovies = getState().movies.favoriteMovies

            const response = await fetchPopulaMovies(pageNumber)

            const { results, page, total_pages, total_results } = response.data

            let movies = []

            if (Array.isArray(results)) {
                movies = results.sort((a, b) => b.vote_average - a.vote_average)
                movies = movies.map(m => {

                    const isFavorite = favoriteMovies.some(f => f.id === m.id)

                    return {
                        ...m,
                        isFavorite
                    }
                })
            }

            const randomMovies = _randomSlice(movies, 8)

            const payload = {
                movies,
                randomMovies,
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