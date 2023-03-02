import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGenres } from '../redux/genres.slice'

const useGetMoviesGenres = () => useSelector(state=>state.genres.moviesGenres)
 

const useAsyncFetchMoviesGenres = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchGenres())
    },[dispatch])

    const isLoading = useSelector(state=> state.genres.isLoading)

    return { isLoading }
    
}

export {
    useGetMoviesGenres,
    useAsyncFetchMoviesGenres
    
}