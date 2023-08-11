import Card from './Card'

const item = [
    {
        "image" : "http://test.api.weniv.co.kr/asset/img/7/thumbnailImg.jpg",
        "contents" : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "price" : 1500,
        "rate" : "⭐ 5.0"
    },
    {
        "image" : "http://test.api.weniv.co.kr/asset/img/7/thumbnailImg.jpg",
        "contents" : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "price" : 1500,
        "rate" : "⭐ 5.0"
    },
    {
        "image" : "http://test.api.weniv.co.kr/asset/img/7/thumbnailImg.jpg",
        "contents" : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "price" : 1500,
        "rate" : "⭐ 5.0"
    },
    {
        "image" : "http://test.api.weniv.co.kr/asset/img/6/thumbnailImg.jpg",
        "contents" : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "price" : 1500,
        "rate" : "⭐ 5.0"
    }
]

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

function ProductList({ productList }) {
    return (
        <main className="product">
            <ul className="product-list">
                {/* {Object.keys(productList).map((key, index) => (
                    <Card product={productList[key]} key={index} />
                ))} */}
                
                {console.log("여기까지도 잘 나옴?" + productList)}

                {productList.map((product) => <Card product={product} key={product.productIdx} />)}
            </ul>
        </main>
    );
}
export default ProductList;