import { useCallback, useEffect, useState } from 'react'

import './carousel.css'

const Carousel = ({
    movies = [],
    imageWidth = 400,
    containerWidth = 1200,
    containerBorderWidth = 1
}) => {


    //espaciado entre imagenes
    const [widthSpaceBtwImages, setWidthSpaceBtwImages] = useState(0) // pixels
    //desplazamiento actual
    const [currentOffset, setCurrentOffset] = useState(0) // percentage
    // ancho del contenedor relativo
    const [relativeWidth, setRelativeWidth] = useState(0) // pixels
    // ratio de desplazamiento por interaccion
    const [offsetRatio, setOffsetRatio] = useState(0) // percentage
    // indice actual de imagen
    const [currentImageIndex, setCurrentImageIndex] = useState(0)


    const isOven = movies.length % 2 === 0 ? true : false

    const renderMovies = movies.map((movie, index) => (
        <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt=""
            className='img'
            key={index}
            style={{ width: `${imageWidth}px`, "marginRight": `${widthSpaceBtwImages}px` }}
        />
    ))

    const calcRelativeWidthAndSpaceBtwImages = useCallback(() => {

        if (isOven) {
            // establece el indice de la imagen de referencia
            setCurrentImageIndex(0)

            //calcular el espacio entre imagenes
            const spaceBtwImages = (containerWidth - (2 * imageWidth)) / 3
            setWidthSpaceBtwImages(spaceBtwImages)

            //calcular el ancho relativo del componente que envuelve a todas las imagenes
            const relativeWidth = ((imageWidth * (movies.length + 2)) / 3) + ((containerWidth * (movies.length - 1)) / 3)
            setRelativeWidth(relativeWidth)
        } else {
            setCurrentImageIndex(0)

            //calcular el espacio entre imagenes
            const spaceBtwImages = ((1 / 2) * containerWidth) - ((7 / 6) * imageWidth)
            setWidthSpaceBtwImages(spaceBtwImages)

            // calcular el ancho relativo del componente que envuelve a todas las imagenes
            const relativeWidth = ((imageWidth * (movies.length + 2)) / 3) + (containerWidth * (movies.length - 1) / 3)
            setRelativeWidth(relativeWidth)
        }

    }, [containerWidth, imageWidth, isOven, movies.length])


    const calcInitialPositions = useCallback(() => {
        if (isOven && relativeWidth > 0) {
            // calcular la proporcion entre el contenedor padre y el contenedor relativo
            const ratio = (containerWidth / relativeWidth) * 100
            // calcular el desplazamiento porcental de la imagen a su posicion incial respecto al contenedor relativo
            const posAdj = (widthSpaceBtwImages / (containerWidth + (2 * containerBorderWidth))) * ratio
            setCurrentOffset(posAdj)

            //calcular radio de desplazamiento por movimiento
            const offsetR = (1 - (widthSpaceBtwImages / containerWidth)) * ratio
            setOffsetRatio(offsetR)
        } else if (!isOven && relativeWidth > 0) {
            // calcular la proporcion entre el contenedor padre y el contenedor relativo
            const ratio = (containerWidth / relativeWidth) * 100
            // calcular el desplazamiento porcentual de la imagen a su posicion inicial respecto al contenedor relativo
            const posAdj = - (widthSpaceBtwImages / (containerWidth - (2 * containerBorderWidth))) * ratio
            setCurrentOffset(posAdj)

            //calcular rario de desplazamiento por movimiento
            const d = ((2 / 3) * (containerWidth - imageWidth))
            const offset = (d / containerWidth) * ratio
            setOffsetRatio(offset)
        }

    }, [containerBorderWidth, containerWidth, imageWidth, isOven, relativeWidth, widthSpaceBtwImages])

    useEffect(() => {
        calcRelativeWidthAndSpaceBtwImages()
        calcInitialPositions()
    }, [calcRelativeWidthAndSpaceBtwImages, calcInitialPositions])


    const handleMovieImage = e => {
        const pressed = e.target.name
        console.log('pressed', pressed)
        if (isOven) {
            //actualizar posicion cuando el grupo de elemento son pares
            if (pressed === 'left' && currentImageIndex <= (movies.length / 2)) {
                const offset = currentOffset - offsetRatio
                setCurrentOffset(offset)
                setCurrentImageIndex(currentImageIndex + 2)
            } else if (pressed === 'right' && currentImageIndex > 0) {
                const offset = currentOffset + offsetRatio
                setCurrentOffset(offset)
                setCurrentImageIndex(currentImageIndex - 2)
            }
        } else {
            if (pressed === 'left' && currentImageIndex <= (movies.length / 2) + 1) {
                const offset = currentOffset - offsetRatio
                setCurrentOffset(offset)
                setCurrentImageIndex(currentImageIndex + 1)
            } else if (pressed === 'right' && currentImageIndex >= 0) {
                const offset = currentOffset + offsetRatio
                setCurrentOffset(offset)
                setCurrentImageIndex(currentImageIndex - 1)
            }
        }
    }


    return (
        <div className="carousel">
            <div
                className="relative-container"
                style={{ width: `${relativeWidth}px`, transform: `translateX(${currentOffset}%)` }}
            >
                {renderMovies}
            </div>
            <div className="controls">
                <button
                    className="btn-move"
                    name='right'
                    onClick={handleMovieImage}
                >
                    {'>>'}
                </button>

                <button
                    className="btn-move"
                    name='left'
                    onClick={handleMovieImage}
                >
                    {'<<'}
                </button>
            </div>
        </div>
    )
}


export default Carousel
