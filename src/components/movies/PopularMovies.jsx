import { useAsyncFetchMovies, useGetMovies } from "../../hooks/useMovies.hook"
import MoviePoster from "./MoviePoster"
import Pagination from "../pagination/Pagination"
import Spinner from '../spinner/Spinner'
import './popularmovies.css'

const PopularMovies = () => {

    const { isLoading } = useAsyncFetchMovies()
    const movies = useGetMovies()


    const listMovies = movies.map((movie, index) => <MoviePoster movie={movie} key={index} />)

    return (
        <div className="popular-movies-container">
            {!isLoading ?
                <>
                    <div className="movies">
                        {listMovies}
                    </div>
                    <Pagination totalItems={10}/>
                </>
                :
                <Spinner />
            }
        </div>
    )
}

export default PopularMovies