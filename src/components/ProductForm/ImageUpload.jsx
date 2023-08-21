import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import uploadIconImage from '../../assets/svg/icon-upload.svg';

const ImageUploadDiv = styled.div `
    display: flex;
    gap: 20px;
    padding: 10px 50px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const UploadIcon = styled.div `
    width: 18px;
    height: 18px;
    background-image: url(${uploadIconImage});
    background-repeat: no-repeat;

    cursor: pointer;
`

function ImageUploadBox({ onImageUrlChange }) {
    const [ seletedFile, setSelectedFile ] = useState(null);
    const [ uploadedImageUrl, setUploadedImageUrl ] = useState(null); // 업로드한 이미지 URL
    
    // 파일 입력(input) 요소를 가리키는 ref
    const fileInputRef = useRef(null);

    // 이미지 선택 이벤트 핸들러
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            setUploadedImageUrl(imageUrl);
            onImageUrlChange(file); // 이미지 URL 변경 시 부모 컴포넌트에 전달
        };
        reader.readAsDataURL(file);
    };

    // 파일 선택(input) 요소 클릭 핸들러
    const handleIconClick = () => {
        fileInputRef.current.click(); // 파일 입력 요소 클릭
    }

    return (
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
    );
}

export default ImageUploadBox;
                