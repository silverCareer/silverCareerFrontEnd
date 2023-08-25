import React, { useEffect, useRef, useState, useContext } from 'react';
import styles from './carousel.module.css';
import { ReactComponent as LeftIcon } from '../../../assets/svg/icon-left.svg';
import { ReactComponent as RightIcon } from '../../../assets/svg/icon-right.svg';
import { useNavigate } from 'react-router-dom'; // for navigating
import { ProductDetailContext } from '../../../hooks/productDetailContext';
import { getProductDetail } from '../../../api/product/productDetail';

const HomeCarousel = ({ carouselList }) => {
    const [currIndex, setCurrIndex] = useState(1);
    const [currList, setCurrList] = useState([]);
    const [totalImages, setTotalImages] = useState(0);
    const carouselRef = useRef(null);

    const navigate = useNavigate(); 

    const { setProductDetailInfo } = useContext(ProductDetailContext);

    useEffect(() => {
        if (carouselList.length !== 0) {
            const startData = carouselList[0];
            const endData = carouselList[carouselList.length - 1];
            const newList = [endData, ...carouselList, startData];
    
            setCurrList(newList);
            setTotalImages(newList.length - 2);
        }
    }, [carouselList]);

    useEffect(() => {
        if (carouselRef.current !== null) {
            carouselRef.current.style.transform = `translateX(-${currIndex * 100}%)`;
            carouselRef.current.style.transition = 'all 0.5s ease-in-out';
        }
    }, [currIndex]);

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

    const moveToNthSlide = (index) => {
        setCurrIndex(index);
    };



    const navigateToProductDetail = async (productIdx) => {
        try {
            const productDetailResponse = await getProductDetail(productIdx);

            if (productDetailResponse.success) {
                setProductDetailInfo(productDetailResponse.response);
                navigate(`/product/${productIdx}`);
            } else {
                console.error("Failed to fetch product Detail:", productDetailResponse.error);
            }
        } catch (error) {
            console.error("Error fetching product Detail:", error);
        }
    };

    return (
        <div className={styles.container}>
            <span className={`${styles.titleText}`}>가장 인기있는 Best 10</span>
        <div className={styles.carouselWrapper}>
            <ul className={styles.carousel} ref={carouselRef}>
                {currList.map((item, idx) => {
                    const key = `${item.productIdx}-${idx}`;
                    return (
                        <li key={key} className={styles.carouselItem}>
                            <img src={item.productImage} alt={`carousel-img-${idx}`} />
                            <div className={styles.productInfo}>
                                <span className={styles.category}>{item.category}</span>
                                <span className={styles.productName}>{item.productName}</span>
                                <button 
                                    className={styles.enrollButton} 
                                    onClick={() => navigateToProductDetail(item.productIdx)}>
                                    수강신청 하러 가기
                                </button>
                            </div>
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