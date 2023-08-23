import styled from 'styled-components';

const FooterContainer = styled.footer`
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding: 30px 20px;
    box-sizing: border-box;
    font-size: 0.9em;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 30px;
`;

const InfoSection = styled.section`
    margin-bottom: 20px;
`;

const LinkList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0 0 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 10px;
`;

const LinkItem = styled.li``;

const Link = styled.a`
    color: inherit;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Footer = () => (
    <FooterContainer>
        <InfoSection>
            1599-5319
            <br />
            평일 10:00 - 18:00
            <br />
            (점심시간 13:00 - 14:00 제외 · 주말/공휴일 제외)
        </InfoSection>
        <LinkList>
            <LinkItem><Link href="#">이용약관</Link></LinkItem>
            <LinkItem><Link href="#">개인정보처리방침</Link></LinkItem>
            <LinkItem><Link href="#">위치기반 서비스 이용약관</Link></LinkItem>
            <LinkItem><Link href="#">사업자 정보확인</Link></LinkItem>
        </LinkList>
        <p>
            (주)브레이브모바일은 통신판매중개자로서 통신판매의 당사자가 아니며 개별 판매자가 제공하는 서비스에 대한 이행, 계약사항 등과 관련한 의무와 책임은 거래당사자에게 있습니다.
            <br />
            상호명:(주)SilverCareer · 대표이사:HAN SEONG HOON · 개인정보책임관리자:한성훈 · 주소:서울특별시 성동구 성수이로 113, 2층
            <br />
            사업자등록번호:000-00-00000 · 통신판매업신고증:제 0000-서울성수-00000 호 · 직업정보제공사업 신고번호:서울청 제 2019-21호
            <br />
            고객센터:0000-0000 · 이메일:support@silvercareer.com
            <br />
            Copyright ©Silver Career Inc. All Rights Reserved.
        </p>
    </FooterContainer>
);

export default Footer;