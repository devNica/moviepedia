import FavotiteMovies from "../movies/FavoriteMovies"
import PopularMovies from "../movies/PopularMovies"
import Navbar from "../navbar/Navbar"
import './container.css'
import { Route, Routes } from 'react-router-dom'


const Container = () => {
    return (
        <div className="container">
            <Navbar />
            <Routes>
                <Route path="/" element={<PopularMovies />} />
                <Route path="/favorit" element={<FavotiteMovies />} />
            </Routes>
        </div>
    )
}

export default Container