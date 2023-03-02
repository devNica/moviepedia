import './movieposter.css'
import { MdOutlineFavoriteBorder } from 'react-icons/md'

const MoviePoster = ({ movie }) => {
    return (
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='poster' />
            <button className='btn-favorite'>
                <MdOutlineFavoriteBorder className='btn-icon'/>
            </button>
        </div>
    )
}

export default MoviePoster