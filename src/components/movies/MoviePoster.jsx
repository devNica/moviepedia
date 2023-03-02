import './movieposter.css'
import { MdOutlineFavoriteBorder } from 'react-icons/md'

const MoviePoster = ({ movie, handleFunction }) => {

    const btnStatusClass = movie.isFavorite ? 'btn-fav-active' : 'btn-fav-inactive'

    return (
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='poster' />
            <button className={`btn-favorite ${btnStatusClass}`} onClick={()=>handleFunction(movie.id)}>
                <MdOutlineFavoriteBorder className='btn-icon'/>
            </button>
        </div>
    )
}

export default MoviePoster