import { createSlice } from '@reduxjs/toolkit'
import api from '../services/api'

const { fetchPopulaMovies } = api

const initialState = {
    popularMovies: [],
    page: 1,
    totalResults: 0,
    totalPages: 0,
    resultPerpages: 0,
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
                popularMovies: action.payload.results,
                page: action.payload.page,
                totalPages: action.payload.total_pages,
                totalResults: action.payload.total_results,
                resultPerpages: Math.ceil(action.payload.total_results / action.payload.total_pages),
                isLoading: false,
                error: null
            }
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

export const fetchPopularMovies = () => {
    return async (dispatch) => {
        dispatch(fetchMoviesStart())
        try {
            const response = await fetchPopulaMovies()

            dispatch(fetchMoviesSuccess(response.data))
            
        } catch (error) {
            dispatch(setError(error))
        }
    }
}

const { fetchMoviesSuccess, fetchMoviesStart, setError } = movieSlice.actions

export default movieSlice.reducer