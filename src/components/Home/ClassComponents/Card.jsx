import styled from 'styled-components';
import '../../../style/style.css';

const ComponentStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    border: 1px solid black;
    width: 25%;
`
export default function Card({goods}) {
    console.log(goods)
    return (
        <li className="product-item">
            <div className="product-img">
                <img src={goods.image} />
            </div>
            <div className="product-category">현장직</div>
            <div className="product-detail">
                <span>{goods.contents}</span>
            </div>            
            <button className="like-btn"></button>
            <div className="product-price">
                <span>{goods.price} 원</span>
            </div>
            <div className="product-rate">
                <span>{goods.rate}</span>
            </div>
        </li>
    );
 }