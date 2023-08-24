import styled from 'styled-components';

const GrayText = styled.p`
    color: #898989;
`;

export default function CancelInfo() {
    return (
        <>
            <GrayText>취소 및 환불 규정</GrayText>
            <GrayText>01. 전문가와 의뢰인 간의 상호 협의 후 청약철회가 가능합니다.</GrayText>
            <GrayText>02. 전문가의 귀책사유로 디자인작업을 시작하지 않았거나 혹은 이에 준하는 보편적인 관점에서 심각하게 잘못 이행한 경우 결제 금액 전체 환불이 가능합니다.</GrayText>
            <GrayText>03. 전문가가 작업 기간 동안 지정된 서비스를 제공하지 못할 것이 확실한 경우 지급받은 서비스 비용을 일할 계산하여 작업물 개수와 작업 기간 일수만큼 공제하고 잔여 금액을 환불합니다.</GrayText>
            <GrayText>04. 서비스 받은 항목을 공제하여 환불하며, 공제 비용은 정가 처리됩니다.</GrayText>
            <GrayText>가. 소비자 피해 보상 규정에 의거하여 작업물 원본의 멸실 및 작업 기간 미이행 및 이에 상응하는 전문가 책임으로 인한 피해 발생 시, 전액 환불</GrayText>
            <GrayText>나. 시안 작업 진행된 상품 차감 환불</GrayText>
            <GrayText>ⓐ. '디자인'에 대한 금액이 서비스 내 별도 기재가 되지 않았거나, 디자인 상품 패키지 내 수정 횟수가 1회(1회 포함) 이상인 서비스 상품의 시안 or 샘플이 제공된 경우</GrayText>
            <GrayText>→ 구매금액의 10% 환불(디자인 비용이 별도 기재되어 있는 경우, 해당금액 차감 후 환불)</GrayText>
            <GrayText>※ 시안 제공 및 수정이 추가로 이뤄진 경우 환불 금액내 수정 횟수에 따라 분할하여 환불.</GrayText>
            <GrayText>05. 주문 제작 상품 등 서비스 받은 항목이 없으며, 결제 후 1일 이내 작업이 진행되기 전 시점은 전액 환불 가능.</GrayText>
            <GrayText>06. 다만, 환불이 불가능한 서비스에 대한 사실을 표시사항에 포함한 경우에는 의뢰인의 환불요청이 제한될 수 있습니다.</GrayText>
            <GrayText>가. 고객의 요청에 따라 개별적으로 주문 제작되는 재판매가 불가능한 경우(인쇄, 이니셜 각인, 사이즈 맞춤 등)</GrayText>
            <GrayText>ⓐ. 주문 제작 상품 특성상 제작(인쇄 등) 진행된 경우.</GrayText>
            <GrayText>ⓑ. 인쇄 색상의 차이 : 모니터의 종류에 따라 색상의 차이가 발생하며,인쇄 시마다 합판 인쇄 방법의 특성상 색상 표현의 오차가 발생함.</GrayText>
            <GrayText>ⓒ. 디자인 서비스이며 수정 횟수가 존재하지 않았던 상품일 경우 시안 수령 후 환불 불가</GrayText>
        </>
    );
}
