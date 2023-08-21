import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { productRegistContents } from '../../api/product/productRegistContents';
import uploadIconImage from '../../assets/svg/icon-upload.svg';

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
const AddressButton = styled.div `
    display: flex;
    width: 100px;
    height: 30px;
    padding: auto;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
    border: 1px solid #84A080;
    font-size: 15px;
    color: #84A080;

    cursor: pointer;
    &:hover {
        background-color: #84A080;
        color: white;
    }
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
const ImageUploadDiv = styled.div `
    display: flex;
    gap: 20px;
    padding: 10px 50px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const ImageUpload = styled.div `
    display: flex;
    height: 100px;
    align-items: center;
    align-self: stretch;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid #CDCDCD;
`
const UploadIcon = styled.div `
width: 18px;
height: 18px;
background-image: url(${uploadIconImage});
background-repeat: no-repeat;

cursor: pointer;
`

function ProductForm() {
    const navigate = useNavigate();
    
    const categories = ['현장직', '사무직', '문화', '기술직', '요리'];
    const [selectedCategory, setSelectedCategory] = useState('');  
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [ uploadedImageUrl, setUploadedImageUrl ] = useState(null); // 업로드한 이미지 URL

    // 이미지 URL을 업데이트하는 함수
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImageUrl(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            setUploadedImageUrl(imageUrl);
        };
        reader.readAsDataURL(file);
    };

    /* image 클릭으로 파일업로드 */        
    // 파일 입력(input) 요소를 가리키는 ref
    const fileInputRef = useRef(null);

    // 파일 선택(input) 요소 클릭 핸들러
    const handleIconClick = () => {
        fileInputRef.current.click(); // 파일 입력 요소 클릭
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };
    
    const handleInputChange = (e) => {
        const value = e.target.value;

        if (value.length <= 30) {
            setProductName(value);
        }
    };
    const handleTextChange = (e) => {
        const value = e.target.value;

        if(value.length <= 1000) {
            setProductDescription(value);
        }
    }
    const handleAmountChange = (e) => {
        const value = e.target.value;
    
        setPrice(value);
    };
    
    const handleAddressChange = (e) => {
        const value = e.target.value;
    
        setAddress(value);
    };


    const handleSubmit = async () => {
        if (!selectedImageUrl) {
            alert('대표 이미지를 선택해주세요.');
            return;
        }

        const formData = new FormData();
        const createProductReq= {
            productName, //상품명
            productDescription, //상품설명
            category : selectedCategory,
            address,
            price,
        };

        formData.append('productImage', selectedImageUrl);
    
        try {
            const response = await productRegistContents(createProductReq, formData);

            if (response.success) {
                navigate(`/category/${encodeURIComponent(selectedCategory)}`);
            }
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }

    };

    return (
        <>
            <ProductContainer>
                <SubHead>
                    <span>기본정보</span>
                    <SubmitButton onClick={handleSubmit}>등록하기</SubmitButton>
                </SubHead>
                <ProductBox>
                    <BoxTitle>상품명</BoxTitle>
                    <TitleInput placeholder='서비스를 잘 드러낼 수 있는 제목을 입력해주세요.' 
                    value={productName} onChange={handleInputChange} />
                    <div>{productName.length} / 30</div>
                </ProductBox>
                <ProductBox>
                    <BoxTitle>카테고리</BoxTitle>
                    <CategorySelect>
                        {categories.map((category) => (
                        <CategoryItem
                            key={category}
                            isselected={category === selectedCategory}
                            onClick={() => handleCategorySelect(category)}>
                            {category}
                        </CategoryItem>
                        ))}
                    </CategorySelect>
                </ProductBox>
                
                <SubHead>상세 정보</SubHead>
                <ProductBox>
                    <BoxTitle>금액(VAT 포함)</BoxTitle>
                    <TitleInput placeholder='최소 5천원 이상의 금액을 입력해 주세요.'
                    value={price} onChange={handleAmountChange} />
                    <div>원</div>
                </ProductBox>
                <ProductBox>
                    <BoxTitle>주소</BoxTitle>
                    <TitleInput placeholder='주소를 검색해주세요' 
                    value={address} onChange={handleAddressChange} />
                    <AddressButton>주소 찾기</AddressButton>
                </ProductBox>
                <ProductDetailBox>
                    <BoxTitle>서비스 설명</BoxTitle>
                    <ContentInput placeholder='서비스에 대한 설명을 해주세요.' 
                    value={productDescription} onChange={handleTextChange} />
                    <div>{productDescription.length} / 1000자</div>
                </ProductDetailBox>
                <ImageUpload>
                    <ImageUploadDiv>
                        <div>이미지 업로드</div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleImageChange}
                            style={{ display: 'none' }} // 파일 입력(input) 요소를 숨김
                        />
                        <UploadIcon onClick={handleIconClick} />
                    </ImageUploadDiv>
                    {uploadedImageUrl && <img style={{ width: '50px' }} src={uploadedImageUrl} alt="Selected" />}
                </ImageUpload>
            </ProductContainer>
        </>
    );
}

export default ProductForm;