import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ProductDetailContext } from '../../../hooks/productDetailContext';
import fullstarIcon from '../../../assets/svg/icon-full-star.svg';
import halfstarIcon from '../../../assets/svg/icon-half-star.svg';

const Title = styled.h1`
    font-size: 25px;
    font-weight: bold;
`;
const ReviewContainer = styled.h2`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 10px 20px;
    gap: 10px;
    width: 800px;
    flex: 1;
    justify-content: center;
    align-items: flex-start;
    gap: 5px;
`;
const ReviewTotal = styled.div `
    div {

    }
`;
const RatingContainer = styled.div`
    display: flex;
    height: 70px;
    align-items: center;
    gap: 10px;
`;

const RatingAverage = styled.div`
    font-size: 40px;
    font-weight: bold;
`;
const RatingValue = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;
const ReviewInfo = styled.div `
    display: flex;
    align-items: center;

`
const StarsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 5px;
    gap: 1px;
    margin-bottom: 3px;

`;
const StarIcon = styled.span`
`;
const ReviewList = styled.div`
    width: 800px;
`;
const ReviewItem = styled.div`
    margin-bottom: 5px;
    border-radius: 5px;
    padding: 5px;

    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const NoReview = styled.div `
    div {
        margin: 10px 0px;
    }
`
const ReviewerName = styled.div`
    font-weight: bold;
    font-size: 20px;
    margin-right: 5px;
`;

const ReviewRating = styled.div`

`;
const ReviewContent = styled.div`
    margin: 10px 0px;
    flex: 1;
`;
const ReviewDate = styled.div `
    font-size: 12px;
    color: #9d9d9d;
`;
const FullStar = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    width: 23px;
    height: 23px;
    background-image: url(${fullstarIcon});
    background-repeat: no-repeat;
`;
const HalfStar = styled.div `
    display: flex;
    align-items: center;
    align-content: center;
    width: 23px;
    height: 23px;
    background-image: url(${halfstarIcon});
    background-repeat: no-repeat;
`;
const Line = styled.div`
    height: 1px;
    background-color: #ccc;
    margin: 10px 0;
`;
const Button = styled.div `
    border-radius: 5px;
    margin-left: 20px;
    padding: 5px;
    width: 100%;
    height: 28px;
    color: white;
    background-color: #a9c0a5;
    border: 1px solid #a9c0a5;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;

    cursor: pointer;
`;

export default function ProductReview({setAvgRating}) {
    const { productDetailInfo } = useContext(ProductDetailContext);
    const [visibleReviews, setVisibleReviews] = useState(3);

    const showMoreReviews = () => {
        setVisibleReviews((prevVisibleReviews) => numberOfReviews);
        console.log(visibleReviews);
    };

    
    // 모든 리뷰의 rating 값을 합산
    const totalRating = productDetailInfo.reviews.reduce((accumulator, review) => {
        return accumulator + review.rating;
    }, 0);

    const numberOfReviews = productDetailInfo.reviews.length;
    const averageRating = isNaN(totalRating) || isNaN(numberOfReviews) ? 0 : totalRating / numberOfReviews;
    setAvgRating(averageRating);

    // 리뷰 별 표시
    const starIcons = [];
    const fullStars = Math.floor(averageRating);
    for (let i = 0; i < fullStars; i++) {
        starIcons.push(<StarIcon key={i}><FullStar/></StarIcon>);
    }

    if (averageRating % 1 !== 0) {
        starIcons.push(
            <StarIcon key={starIcons.length}><HalfStar/></StarIcon>
        );
    }

    return (
        <ReviewContainer>
            <ReviewTotal>
                <Title>리뷰</Title>
                {numberOfReviews === 0 ? (
                    <NoReview>
                        <div>아직 작성된 리뷰가 없습니다.</div>
                        <div style={{ 'color': 'gray', 'font-size': '12px' }}>먼저 리뷰를 작성해보세요!</div>
                    </NoReview>
                ) : (
                    <RatingContainer>
                        <RatingAverage>{averageRating.toFixed(1)}</RatingAverage>
                        <RatingValue>
                            <StarsContainer>
                                {starIcons}
                            </StarsContainer>
                            <div>&nbsp;{numberOfReviews} 개의 리뷰</div>
                        </RatingValue>
                    </RatingContainer>
                )}
            </ReviewTotal>
            <ReviewList>
                {productDetailInfo.reviews.slice(0, visibleReviews).map((review, index) => (
                <ReviewItem key={index}>
                    <ReviewInfo>
                        <ReviewerName>{review.authorName}</ReviewerName>
                        <ReviewRating>⭐ {review.rating.toFixed(1)}</ReviewRating>
                    </ReviewInfo>
                    <ReviewContent>{review.reviewContext}</ReviewContent>
                    <ReviewDate>{review.postDate}</ReviewDate>
                    {index < visibleReviews - 1 && <Line />}
                </ReviewItem>
                ))}
            </ReviewList>
            {visibleReviews < numberOfReviews && (
                <Button onClick={showMoreReviews}>리뷰 더보기</Button>
            )}
        </ReviewContainer>
    );
}