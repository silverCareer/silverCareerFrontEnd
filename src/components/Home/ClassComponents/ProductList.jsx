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
    //1.
    console.log(item)
    const result = []
    item.forEach(item => {
        result.push(<Card goods={item} key={item.id} />)
    });
    //2. 컴포넌트화 한 결과
    console.log(result)
    return (
        <main className="product">
            <ul className="product-list">
                {result}
            </ul>
        </main>
    );
}

export default ProductList;