import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getBidList } from '../../../api/request/getBidList';
import { postBidConfirm } from '../../../api/request/postBidConfirm'

const MainContainer = styled.div`
    border: 1px solid #E0E0E0;
    display: flex;
    flex-direction: column;
    padding: 20px 50px;
    width: 900px;
    color: #84A080;
    margin: 20px auto;
    border-radius: 5px;
`;

const BidItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #E0E0E0;
    &:last-child {
        border-bottom: none;
    }
`;

const BidDetail = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const BidTitle = styled.h3`
    margin: 0;
    font-weight: 600;
`;

const BidButton = styled.button`
    margin-left: 10px;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    background-color: #84A080;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #6f8a6c;
    }
`;

const Alarm = styled.div`
    background: #84A080;
    color: white;
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    z-index: 1000;
    display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const BidListForm = () => {
    const [showAlarm, setShowAlarm] = useState(false);
    const navigate = useNavigate();

    const [bids, setBids] = useState([]);


    useEffect(() => {
        async function fetchBidData() {
            try {
                const response = await getBidList();
                setBids(response.response);

            } catch (error) {
                console.log("입찰내역 API 에러닷 ! : " + error);
            }
        }
        fetchBidData();
    }, []);

    const handleAccepted = async (bidIdx) => { 
        try {
            const response = await postBidConfirm(bidIdx);
    
            if (response.response) {
                setShowAlarm(true);
                setTimeout(() => {
                    setShowAlarm(false); 
                    navigate('/') 
                }, 2000); 
            }
        } catch (error) {
            console.log("입찰수락 API 에러닷! : "+ error)
        }
    };


    return (
    <>   
        <Alarm visible={showAlarm}>
        유익한 시간 보내슈
        </Alarm>
        <MainContainer>
            {bids.length > 0 ? bids.map((bid) => (
                <BidItem key={bid.bidIdx}>
                    <BidDetail>
                        <BidTitle>{bid.title}</BidTitle>
                        <div>카테고리: {bid.category}</div>
                        <div>입찰 가격: {bid.price}원</div>
                        <div>멘토: {bid.mentorName}</div>
                    </BidDetail>
                    <div>
                        <BidButton onClick={() => handleAccepted(bid.bidIdx)}>수락하기</BidButton>
                        <BidButton>채팅하기</BidButton>
                    </div>
                </BidItem>
            )) : (
                <div>입찰 내역이 없습니다.</div>
            )}
        </MainContainer>
    </>
    );
}

export default BidListForm;


    // // 임시 더미 데이터
    // const dummyData = {
    //     id: "12345",
    //     dateTime: "2023-08-20T20:00:00",
    //     success: true,
    //     response: [
    //         {
    //             bidIdx: 1,
    //             title: "Web Development",
    //             category: "IT",
    //             price: 2000,
    //             mentorName: "John Doe"
    //         },
    //         {
    //             bidIdx: 2,
    //             title: "Graphic Design",
    //             category: "Design",
    //             price: 1500,
    //             mentorName: "Jane Smith"
    //         }
    //     ],
    //     error: {
    //         status: 404,
    //         code: "Not_Found",
    //         message: "No data found"
    //     }
    // };
