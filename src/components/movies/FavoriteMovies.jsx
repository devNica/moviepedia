import { useGetFavoriteMovies } from "../../hooks/useMovies.hook"
import MoviePoster from "./MoviePoster"
import './favoritemovies.css'

const FavotiteMovies = () => {

    const movies = useGetFavoriteMovies()
    const listMovies = movies.map((movie, index) => <MoviePoster movie={movie} key={index} />)

    return (
        <div className="favorite-movies-container">
            <div className="movies">
                {listMovies}
            </div>
        </div>
    )
}


export default FavotiteMovies