import PopularMovies from "../movies/PopularMovies"
import Navbar from "../navbar/Navbar"
import './container.css'

const Container = () => {
    return (
        <div className="container">
            <Navbar/>
            <PopularMovies/>
        </div>
    )
}

export default Container