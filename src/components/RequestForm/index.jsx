import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { postRequest } from './../../api/request/postRequest';


const ProductContainer = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;

    padding: 0px 300px;
`;
const ProductDetailBox = styled.div `
    display: flex;
    height: 517px;
    padding: 20px 50px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
    border-radius: 10px;
    border: 1px solid #CDCDCD;
`
const SubHead = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    margin-top: 10px;
    font-weight: bold;
    font-size: 20px;
`;
const ProductBox = styled.div `
    display: flex;
    height: 65px;
    padding: 10px 50px;
    align-items: center;
    align-self: stretch;

    border-radius: 10px;
    border: 1px solid #CDCDCD;
`;
const BoxTitle = styled.div `
    width: 150px;
    font-weight: bold;
`
const TitleInput = styled.input `
    display: flex;
    align-items: center;
    margin: 10px;
    width: 550px;
    
    border: none; /* 테두리 없애기 */
    outline: none; /* 포커스 시 나타나는 테두리 제거 */
    ::placeholder {
        font-weight: 500;
        color: #e5e5e5;
    }
`;
const ContentInput = styled.textarea `
    display: flex;
    height: 400px;
    padding: 20px;
    align-items: flex-start;
    flex-shrink: 0;
    align-self: stretch;
    resize: none;

    border: none; /* 테두리 없애기 */
    outline: none; /* 포커스 시 나타나는 테두리 제거 */
    border-radius: 10px;
    background: #FAFAFC;
    
    ::placeholder {
        font-weight: 500;
        color: #e5e5e5;
    }
`
const CategorySelect = styled.div `
    display: flex;
    height: 40px;
    padding: 15px 10px;
    justify-content: space-between;
    align-items: center;
    flex: 1 0 0;

    border-radius: 10px;
    background: rgba(250, 250, 252, 0.67);
`;
const CategoryItem = styled.div`
    cursor: pointer;
    font-weight: ${({ isselected }) => (isselected ? 'bold' : 'normal')};
`;

const SubmitButton = styled.div `
    display: flex;
    width: 140px;
    height: 40px;
    padding: 3px 10px;
    justify-content: center;
    align-items: center;

    flex-shrink: 0;
    border-radius: 10px;
    background: #84A080;

    font-weight: 500;
    font-size: 18px;
    color: white;

    cursor: pointer;
    &:hover {
        color: white;
        background-color: #6f896d;
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

function RequestForm() {
    const [showAlarm, setShowAlarm] = useState(false);
    const navigate = useNavigate();
    const categories = ['현장직', '사무직', '문화', '기술직', '요리'];
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: ''
    });

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleCategorySelect = (category) => {
        setFormData(prev => ({
            ...prev,
            category: category
        }));
    };

    const handleSubmit = async () => {
        try {
            console.log(formData)
            const response = await postRequest(formData);
            console.log(response)

            if (response.success){
                setShowAlarm(true); 
                setTimeout(() => {
                    setShowAlarm(false); 
                    navigate('/') 
                }, 2000); 
            }
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };

    return (
        <>

            <Alarm visible={showAlarm}>
                멘토들에게 의뢰가 전달되었습니다. 잠시만 기다려 주세요.
            </Alarm>
            <ProductContainer>
                <SubHead>
                    <span>의뢰하기</span>
                    <SubmitButton onClick={handleSubmit}>등록하기</SubmitButton>
                </SubHead>
                <ProductBox>
                <BoxTitle>배우고싶은내용</BoxTitle>
                    <TitleInput 
                        placeholder='한문장으로 간략하게 나타내주세요' 
                        value={formData.title} 
                        name="title"
                        onChange={handleInputChange} />
                    <div>{formData.title.length} / 30</div>
                </ProductBox>
                <ProductBox>
                    <BoxTitle>카테고리</BoxTitle>
                    <CategorySelect>
                        {categories.map((category) => (
                        <CategoryItem
                            key={category}
                            isselected={category === formData.category}
                            onClick={() => handleCategorySelect(category)}>
                            {category}
                        </CategoryItem>
                        ))}
                    </CategorySelect>
                </ProductBox>
                
                <ProductBox>
                    <BoxTitle>금액(VAT 포함)</BoxTitle>
                    <TitleInput placeholder='최소 5천원 이상의 금액을 입력해 주세요.'
                    value={formData.price} name="price"  onChange={handleInputChange}/>
                    <div>원</div>
                </ProductBox>

                <ProductDetailBox>
                    <BoxTitle>자세한 설명</BoxTitle>
                    <ContentInput placeholder='필요한 서비스에 대한 설명을 해주세요.' 
                    value={formData.description} name="description" onChange={handleInputChange}/>
                    <div>{formData.description.length} / 1000자</div>
                </ProductDetailBox>
            
            </ProductContainer>
        </>
    );
}

export default RequestForm;