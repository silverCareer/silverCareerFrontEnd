import Card from './Card'

// const item = [
//     {
//         "image" : "http://test.api.weniv.co.kr/asset/img/7/thumbnailImg.jpg",
//         "contents" : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         "price" : 1500,
//         "rate" : "⭐ 5.0"
//     },
//     {
//         "image" : "http://test.api.weniv.co.kr/asset/img/7/thumbnailImg.jpg",
//         "contents" : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         "price" : 1500,
//         "rate" : "⭐ 5.0"
//     },
//     {
//         "image" : "http://test.api.weniv.co.kr/asset/img/7/thumbnailImg.jpg",
//         "contents" : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         "price" : 1500,
//         "rate" : "⭐ 5.0"
//     },
//     {
//         "image" : "http://test.api.weniv.co.kr/asset/img/6/thumbnailImg.jpg",
//         "contents" : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         "price" : 1500,
//         "rate" : "⭐ 5.0"
//     }
// ]



function ProductList({ productList }) {
    return (
        <main className="product">
            <ul className="product-list">
                
                {console.log("여기까지도 잘 나옴?" + productList)}

                {productList.map((product) => <Card product={product} key={product.productIdx} />)}
            </ul>
        </main>
    );
}
export default ProductList;