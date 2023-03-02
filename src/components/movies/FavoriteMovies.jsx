import { useGetFavoriteMovies } from "../../hooks/useMovies.hook"
import MoviePoster from "./MoviePoster"
import { useDispatch } from 'react-redux'
import { setMovieFavorite } from '../../redux/movies.slice'
import './favoritemovies.css'

const FavotiteMovies = () => {

    const movies = useGetFavoriteMovies()
    const dispatch = useDispatch()

    const handleSetFavoriteMovie = movieId => {
        dispatch(setMovieFavorite(movieId))
    }

    const listMovies = movies.map((movie, index) => <MoviePoster movie={movie} key={index} handleFunction={handleSetFavoriteMovie} />)

    return (
        <div className="favorite-movies-container">
            <div className="movies">
                {listMovies}
            </div>
        </div>
    )
}


export default FavotiteMovies