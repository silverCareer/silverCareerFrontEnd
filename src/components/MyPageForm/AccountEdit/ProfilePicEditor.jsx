import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { MypageContext } from '../../../hooks/mypageContext';
import { postProfilePic } from '../../../api/mypage/postProfilePic';
import uploadIconImage from '../../../assets/svg/icon-upload.svg';
import editIconImage from '../../../assets/svg/icon-edit.svg';
import { useNavigate } from 'react-router-dom';

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 100px;
`;
const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;
const ProfileImage = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer; /* 이미지 클릭시 파일 업로드 창이 열리도록 함 */
    position: relative;
`;
const Button = styled.button`
    margin: 10px;
    padding: 10px;
    border: 1px solid #84A080;
    color: white;
    background-color: #84A080;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #6f8a6a;
    }
`;
const Input = styled.input`
    display: none; /* input을 화면에서 숨김 */
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

function ProfilePicEditor() {
    const { myPageForm, setMyPageForm } = useContext(MypageContext);
    const { userImage } = myPageForm;
    const [selectedImage, setSelectedImage] = useState(null);
    const [showAlarm, setShowAlarm] = useState(false);
    const navigate = useNavigate()

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setMyPageForm({
                ...myPageForm,
                userImage: reader.result
            });
        };
        if (file) reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('img', selectedImage);
        
        try {
            const response = await postProfilePic(formData);

            if (response.data && response.data.imageUrl) {
                setMyPageForm({
                    ...myPageForm,
                    userImage: response.data.imageUrl,
                });

            }

            if (response.success){
                setShowAlarm(true);
                setTimeout(() => {
                    setShowAlarm(false); 
                    navigate('/') 
                }, 2000); 
            }

            console.log('Image uploaded:', response);
        } catch (error) {
            console.error('An error occurred while uploading the image:', error);
        }
    };

    const handleProfileImageClick = () => {
        // 파일 업로드 input을 클릭하는 함수
        document.getElementById('file-input').click();
    };

    return (
        <>
            <Alarm visible={showAlarm}>
                프로필 이미지가 변경되었습니다.
            </Alarm>
            <MainContainer>
                <ProfileInfo>
                    <ProfileImage src={userImage || myPageForm.userImage || 'data:image/jpeg;base64,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' } alt="profile" 
                    onClick={handleProfileImageClick} />
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            id="file-input"
                        />
                        <Button type="submit">이미지 변경 완료</Button>
                    </form>
                </ProfileInfo>
            </MainContainer>
        </>
    );
}

export default ProfilePicEditor;