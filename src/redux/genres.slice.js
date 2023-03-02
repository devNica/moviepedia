import { createSlice } from '@reduxjs/toolkit'
import api from '../services/api'

const { fetchGenresFromAPI } = api

const initialState = {
    moviesGenres: [],
    isLoading: true,
    error: null
}

const genreSlice = createSlice({
    name: "movies",
    
    initialState,
    
    reducers: {
        fetchGenresStart(state){
            return {
                ...state,
                isLoading: true, 
                error: null
            }
        },
        fetchGenresSuccess(state, action) {
            return {
                ...state,
                moviesGenres: action.payload,
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

export const fetchGenres = () => {
    return async (dispatch) => {
        dispatch(fetchGenresStart())
        try {
            const response = await fetchGenresFromAPI()

            setTimeout(() => {
                dispatch(fetchGenresSuccess(response.data.genres))
            }, 2500);

            
        } catch (error) {
            dispatch(setError(error))
        }
    }
}

const { fetchGenresSuccess, fetchGenresStart, setError } = genreSlice.actions

export default genreSlice.reducer