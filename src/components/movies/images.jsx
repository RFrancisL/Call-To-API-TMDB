import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { AUTH } from "../../App"
import '../movies/styles/images.css'
import useFetch from "../useFetchs";

function CarrouselImages({ item, renderItem }) {
    const [currentPosition, setCurrentPosition] = useState(0);

    const prevPosition = () => (
        setCurrentPosition((prev) => (prev > 0 ? prev - 1 : 0))
    );

    const nextPosition = () => (
        setCurrentPosition((next) => (next < item.length ? next + 1 : next))
    );

    return (
        <div className="div-images-images">
            <button onClick={prevPosition} className="prevButton" disabled={currentPosition === 0}></button>
            {renderItem([item[currentPosition]])}
            <button onClick={nextPosition} className="nextButton" disabled={currentPosition === item.length - 1}></button>
        </div>
    );
}

export default function Images(){
    const { id } = useParams()

    const {success} = useFetch(`https://api.themoviedb.org/3/movie/${id}/images`)

    const allSuccess = success || []
    const images = allSuccess.backdrops || []
    
    return(
        <div>
            {images ? (
                <CarrouselImages
                    item={images}
                    renderItem={(image) =>
                        image ? (
                            image.map((img, index) => (
                                img && img.file_path ? (
                                    <img key={index} src={`https://image.tmdb.org/t/p/w500${img.file_path}`} className="images-image" />
                                ) : null
                            ))
                        ) : (
                            image && image.file_path ? (
                                <img src={`https://image.tmdb.org/t/p/w500${image.file_path}`} className="images-image" />
                            ) : null
                        )
                    }
                />
            ) : null
        }

        </div>
    )
}