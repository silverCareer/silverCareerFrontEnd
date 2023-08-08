// import styled from 'styled-components';
import '../../../style/style.css';

// const ComponentStyle = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 30px;
//     border: 1px solid black;
//     width: 25%;
// `
export default function Card({goods}) {
    console.log(goods)
    return (
        <li class="product-item">
            <div class="product-img">
                <img src={goods.image} alt="img" />
            </div>
            <strong class="product-name sl-ellipsis">{goods.productName}</strong>
            <button class="like-btn"></button>
            <div class="product-price">
                <strong class="price m-price">{goods.price}<span>원</span></strong>
            </div>
        </li>
    );
 }