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

function ProductList() {
    return (
        <main className="product">
            <ul className="product-list">
                {item.map((item, index) => <Card goods={item} key={index} />)}
            </ul>
        </main>
    )
}

export default ProductList;