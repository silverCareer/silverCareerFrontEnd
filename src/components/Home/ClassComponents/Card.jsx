import '../../../style/style.css';
/*
{
    productList : [
			{
					produtIdx : Long, //상품번호 (상세조회 시 사용)
					productName : String, //상품명
					productDescription : String, //상품설명
					productImage : String, //상품 이미지 (여러장?)
					productLikes : Long, //해당 상품의 좋아요 갯수
					productPrice : Long //상품 가격
			},
		]
}
*/

export default function Card({product}) {
    console.log(product + "22")
    return (
        <li className="product-item">
            <div className="product-img">
                <img src={product.productImage} alt="img"/>
            </div>
            <div className="product-category">현장직</div>
            <div className="product-detail">
                <span>{product.productDescription}</span>
            </div>            
            <button className="like-btn"></button>
            <div className="product-price">
                <span>{product.productPrice} 원</span>
            </div>
            <div className="product-rate">
                <span>{product.productLikes}</span>
            </div>
        </li>
    );
 }