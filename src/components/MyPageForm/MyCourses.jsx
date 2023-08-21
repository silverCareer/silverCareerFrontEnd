import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { MypageContext } from '../../hooks/mypageContext';
import { getMyCourses } from '../../api/mypage/mycourses';
import { postReview } from '../../api/mypage/postReview';
import { ProductDetailContext } from '../../hooks/productDetailContext';
import { getProductDetail } from '../../api/product/productDetail';


const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 100px;
`;

const CourseCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    margin-top: 10px;
    width: 100%;
`;

const Info = styled.span`
    flex: 1;
    margin: 0 10px;
    text-align: center;
`;

const ReviewButton = styled.button`
    padding: 5px 10px;
    background-color: ${({ isHidden }) => isHidden ? 'transparent' : '#84A080'};
    color: ${({ isHidden }) => isHidden ? 'transparent' : 'white'};
    border-radius: 5px;
    border: none;
    cursor: pointer;
`;

const PageNavigation = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const NavButton = styled.button`
    padding: 5px 15px;
    margin: 0 5px;
    background-color: #84A080;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #6f8a6a;
    }

    &:disabled {
        background-color: #c2cfc7;
        cursor: not-allowed;
    }
`;

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    width: 400px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
`;

const ReviewTextarea = styled.textarea`
    width: 100%;
    height: 150px;
    resize: none;
    margin-bottom: 15px;
`;

function MyCourses() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewMessage, setReviewMessage] = useState('');
    const [selectedProductIdx, setSelectedProductIdx] = useState(null);
    const [courses, setCourses] = useState([]);
    // const navigate  = useNavigate();
    const location = useLocation();
    const [rating, setRating] = useState(0);
    

    const ITEMS_PER_PAGE = 5;

    const [currentPage, setCurrentPage] = useState(1);

    const navigate  = useNavigate();
    const { setProductDetailInfo } = useContext(ProductDetailContext);

    useEffect(() => {
        async function fetchMyCourses() {
            try {
                const response = await getMyCourses();
                if (response.response) {
                    console.log("마이페이지 response:", JSON.stringify(response.response, null, 2));
                    setCourses(response.response);
                    // console.log(courses[0].productIdx)
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        }

        fetchMyCourses();
    }, [location.pathname]); //location.pathname 해당 url 즉 /mypage 값을 가짐 (여기 올때마다 useEffect 작동하게 하려고!)

    const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);

    const displayedCourses = courses.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const openModal = (productIdx) => {
        console.log(productIdx)
        setSelectedProductIdx(productIdx);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setReviewMessage('');
        setSelectedProductIdx(null);
        setIsModalOpen(false);
    };

    const sendReview = async () => {
        if (!reviewMessage.trim()) {
            alert('리뷰 메시지를 입력해주세요.');
            return;
        }

        const formdata = {
            context: reviewMessage,
            rating: rating
        };

        try {
            const response = await postReview(selectedProductIdx, formdata);
            console.log(response)
            const updatedCourses = await getMyCourses();
            if (updatedCourses && updatedCourses.response) {
                setCourses(updatedCourses.response);
            }
        } catch (error) {
            console.error("Error sending review:", error);
        }
        


        closeModal();
    };

    const handleNavigateToProductDetail = async (productIdx) => {
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
        <MainContainer>
            {displayedCourses.map(course => (
                <CourseCard key={course.localDate + course.mentorName}>
                <Info>멘토: {course.mentorName}</Info>
                <Info>날짜: {course.localDate}</Info>
                <Info>가격: {course.amount}</Info>
                <Info> {course.paymentName}</Info>
                {course.paymentType === '상품' ? 
                    (course.reviewed ? 
                        <ReviewButton onClick={() =>handleNavigateToProductDetail(course.productIdx)}>리뷰보러가기</ReviewButton> 
                        : 
                        <ReviewButton onClick={() => openModal(course.productIdx)}>리뷰쓰기</ReviewButton>
                    )
                    : 
                    <ReviewButton isHidden>리뷰쓰기</ReviewButton>}
            </CourseCard>
            ))}
            <PageNavigation>
                <NavButton 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage <= 1}
                >
                    &lt; 이전
                </NavButton>
                <span> {currentPage} / {totalPages}</span>
                <NavButton 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage >= totalPages}
                >
                    다음 &gt;
                </NavButton>
            </PageNavigation>

            {isModalOpen && (
                <ModalBackground>
                    <ModalContainer>
                        <ReviewTextarea 
                            value={reviewMessage} 
                            onChange={(e) => setReviewMessage(e.target.value)} 
                            placeholder="리뷰를 입력해주세요" 
                        />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <NavButton onClick={sendReview}>보내기</NavButton>
                            <NavButton onClick={closeModal} style={{ marginLeft: '20px' }}>닫기</NavButton>
                            <div>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        style={{ color: star <= rating ? '#FFD700' : 'gray' }}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>
                    </ModalContainer>
                </ModalBackground>
            )}
        </MainContainer>
    );
}

export default MyCourses;



