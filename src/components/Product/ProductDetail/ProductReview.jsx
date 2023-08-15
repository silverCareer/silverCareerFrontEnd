import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 10px 20px;
    gap: 10px;
`;

const Title = styled.h1`
    font-size: 23px;
`;

const PhotoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
`;

const Photo = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const ReviewContainer = styled.h2`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 5px;
`;

const RatingContainer = styled.div`
    display: flex;
    width: 486px;
    align-items: center;
    gap: 10px;
`;

const RatingValue = styled.div`
    font-size: 30px;
    font-weight: 500;
`;
const RatingValue2 = styled.div`
    display: flex;
    height: 49px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`

const StarsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StarIcon = styled.span`
  margin-right: 5px;
  color: gold;
`;

const ReviewList = styled.div`

`;

const ReviewItem = styled.div`

`;

const ReviewerName = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

const ReviewRating = styled.div`
  margin-right: 10px;
  color: gold;
`;

const ReviewContent = styled.div`
  flex: 1;
`;

const ReviewDate = styled.div`
  font-style: italic;
`;

export default function ProductReview() {
    return (
        <PageContainer>            
            <PhotoContainer>
                <Title>사진</Title>
                <Photo src="your-photo-url.jpg" alt="사진" />
            </PhotoContainer>
            <ReviewContainer>
                <Title>리뷰</Title>
                <RatingContainer>
                    <RatingValue>5.0</RatingValue>
                    <RatingValue2>
                        <StarsContainer>
                            <StarIcon>⭐</StarIcon>
                            <StarIcon>⭐</StarIcon>
                            <StarIcon>⭐</StarIcon>
                            <StarIcon>⭐</StarIcon>
                            <StarIcon>⭐</StarIcon>
                        </StarsContainer>
                        <div>14개의 리뷰</div>
                    </RatingValue2>
            </RatingContainer>
            <ReviewList>
                <ReviewItem>
                    <ReviewerName>John Doe</ReviewerName>
                    <ReviewRating>⭐ 5.0</ReviewRating>
                    <ReviewContent>정말 좋은 사진이에요!</ReviewContent>
                    <ReviewDate>2023년 8월 15일</ReviewDate>
                </ReviewItem>
                {/* 다른 리뷰들도 유사한 형식으로 추가 */}
            </ReviewList>
            </ReviewContainer>
        </PageContainer>
    );
}