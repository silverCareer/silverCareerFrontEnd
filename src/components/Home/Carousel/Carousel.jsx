import React, { useEffect, useRef, useState } from 'react';
import styles from './carousel.module.css';
import { ReactComponent as LeftIcon } from '../../../assets/svg/icon-left.svg';
import { ReactComponent as RightIcon } from '../../../assets/svg/icon-right.svg';

const HomeCarousel = ({ carouselList }) => {
    const [currIndex, setCurrIndex] = useState(0);
    const [currList, setCurrList] = useState([]);
    const [totalImages, setTotalImages] = useState(0);

    const carouselRef = useRef(null);

    useEffect(() => {
        if (carouselList.length !== 0) {
            const startData = carouselList[0];
            const endData = carouselList[carouselList.length - 1];
            const newList = [endData, ...carouselList, startData];

            setCurrList(newList);
            setCurrIndex(1); // Change to 1 to display the first image initially
        }
    }, [carouselList]);

    useEffect(() => {
        if (carouselRef.current !== null) {
            carouselRef.current.style.transform = `translateX(-${currIndex * 100}%)`;
            carouselRef.current.style.transition = 'all 0.5s ease-in-out';
        }
    }, [currIndex]);

    useEffect(() => {
        if (carouselList.length !== 0) {
            const startData = carouselList[0];
            const endData = carouselList[carouselList.length - 1];
            const newList = [endData, ...carouselList, startData];
    
            setCurrList(newList);
            setCurrIndex(1); // Change to 1 to display the first image initially
            setTotalImages(newList.length - 2);
        }
    }, [carouselList]);

    const moveToNthSlide = (index) => {
        setCurrIndex(index);
    };

    const handleSwipe = (direction) => {
        const newIndex = currIndex + direction;

        if (newIndex === carouselList.length + 1) {
            moveToNthSlide(1);
        } else if (newIndex === 0) {
            moveToNthSlide(carouselList.length);
        } else {
            setCurrIndex(newIndex);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.carouselWrapper}>
                <ul className={styles.carousel} ref={carouselRef}>
                    {currList.map((image, idx) => {
                        const key = `${image}-${idx}`;

                        return (
                            <li key={key} className={styles.carouselItem}>
                                <img src={image} alt={`carousel-img-${idx}`} />
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className={styles.carouselIndex}> 
                <button type="button" className={styles.swipeLeft} onClick={() => handleSwipe(-1)}>
                    <LeftIcon />
                </button>
                <span className={styles.nowIndex} >
                    &nbsp;
                    {`${currIndex}`}<span> / {`${totalImages}`}</span></span>
                    &nbsp;
                <button type="button" className={styles.swipeRight} onClick={() => handleSwipe(1)}>
                    <RightIcon />
                </button>
            </div>
        </div>
    );
};

export default HomeCarousel;
