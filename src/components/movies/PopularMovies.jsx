import { useAsyncFetchMovies, useGetMovies, useGetResultPerPage } from "../../hooks/useMovies.hook"
import { useDispatch } from 'react-redux'
import { fetchPopularMovies, setMovieFavorite } from '../../redux/movies.slice'
import MoviePoster from "./MoviePoster"
import Pagination from "../pagination/Pagination"
import Spinner from '../spinner/Spinner'
import TopMovies from "../topmovies/TopMovies"
import './popularmovies.css'

const PopularMovies = () => {

    const { isLoading } = useAsyncFetchMovies()
    const movies = useGetMovies()
    const resultPerPage = useGetResultPerPage()
    const dispatch = useDispatch()


    const handleFetchMoviePerpage = pageNumber => {
        dispatch(fetchPopularMovies(pageNumber))
    }

    const handleSetFavoriteMovie = movieId => {

        dispatch(setMovieFavorite(movieId))
    }


    const listMovies = movies.map((movie, index) => <MoviePoster movie={movie} key={index} handleFunction={handleSetFavoriteMovie} />)
    
    return (
        <div className="popular-movies-container">
            {!isLoading ?
                <>
                    <TopMovies/>
                    <h3 className="popular-movies-title">Popular Movies</h3>
                    <hr className="separator" />
                    <div className="movies">
                        {listMovies}
                    </div>
                    <Pagination totalItems={resultPerPage} handleFunction={handleFetchMoviePerpage} />
                </>
                :
                <Spinner />
            }
        </div>
    )
}

export default PopularMovies