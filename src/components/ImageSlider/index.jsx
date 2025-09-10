import { useEffect, useState } from "react"
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

import './styles.css';

export default function ImageSlider({ url, limit = 5, page = 1 }) {

    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    const [error, setError] = useState(null);
    // if we are using the api calls always use loading state
    const [loading, setLoading] = useState(false);


    async function fetchImages(getUrl) {

        try {
            setLoading(true);

            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();

            // if data is not null then set the data to images array
            if (data) {
                setImages(data);
                // if we set the data to images array then we passed the loading state so set to load to false
                setLoading(false);
            }

        } catch (e) {
            setError(e.message);
            // if there is an error then set load to false
            setLoading(false);
        }
    }

    // for currentslide

    // for left arrow i.e for previous
    function handlePrevious() {
        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
    }

    // for right arrow i.e. for next
    function handleNext() {
        setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
    }

    useEffect(() => {
        // if the url consists of any data then we can fetch it and passed into the fetchImages function
        if (url !== '') {
            fetchImages(url);
        }
    }, [url]);

    // console.log(images);

    // if the loading is true
    if (loading) {
        return <div>Loading data ! Please Wait</div>
    }

    // if there is a error
    if (error !== null) {
        return <div>Error Occurred {error}</div>
    }



    return (
        <div className="container">

            <BsArrowLeftCircleFill onClick={handlePrevious} className="arrow arrow-left" />
            {
                images && images.length ?
                    images.map((imageItem, index) => (
                        <img
                            key={imageItem.id}
                            src={imageItem.download_url}
                            alt={imageItem.download_url}

                            className={currentSlide === index
                                   ? "current-image" 
                                   : "current-image hide-current-image"}
                        />
                    ))
                    : null
            }

            <BsArrowRightCircleFill onClick={handleNext} className="arrow arrow-right" />
            <span className="circle-indicators">
                {
                    images && images.length ?
                        images.map((_, index) => (
                            // button is for dots represents the index of each image
                            <button 
                              key={index} 

                              className={
                                      currentSlide === index 
                                      ? "current-indicator" 
                                      : "current-indicator inactive-indicator"
                                    }
                                    onClick= {() => setCurrentSlide(index)}
                                    ></button>
                        ))
                        : null
                }
            </span>

        </div>
    )
}