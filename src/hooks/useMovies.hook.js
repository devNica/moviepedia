import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPopularMovies } from '../redux/movies.slice'

const useGetMovies = () => useSelector(state=>state.movies.popularMovies)

const useGetFavoriteMovies = () => useSelector(state=>state.movies.favoriteMovies)

const useGetResultPerPage = () => useSelector(state => state.movies.resultPerpage)

const useGetRandomMovies = () => useSelector(state => state.movies.randomMovies)

const useAsyncFetchMovies = () => {

    const dispatch = useDispatch()

    const movies = useSelector(state=>state.movies.popularMovies)

    useEffect(()=>{
        if(movies.length === 0) {
            dispatch(fetchPopularMovies())
        }
        
    },[dispatch, movies])

    const isLoading = useSelector(state=> state.movies.isLoading)

    return { isLoading }
}


export {
    useGetMovies,
    useGetRandomMovies,
    useGetFavoriteMovies,
    useGetResultPerPage,
    useAsyncFetchMovies
}