import { useGetRandomMovies } from '../../hooks/useMovies.hook'

import './topmovies.css'
import Carousel from '../carousel/Carousel'

const TopMovies = () => {

    const randonMovies = useGetRandomMovies()

    return (
        <div className="top-movies-container">
            <Carousel
                movies={randonMovies}
            />
        </div>
    )
}

export default TopMovies