import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPopularMovies } from '../redux/movies.slice'

const useGetMovies = () => useSelector(state=>state.movies.popularMovies)
 

const useAsyncFetchMovies = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchPopularMovies())
    },[dispatch])

    const isLoading = useSelector(state=> state.movies.isLoading)

    return { isLoading }
}

export {
    useGetMovies,
    useAsyncFetchMovies
}