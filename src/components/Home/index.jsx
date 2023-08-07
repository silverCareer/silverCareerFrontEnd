import React from 'react';
import HomeCarousel from './Carousel/Carousel'
import MainCategory from './MainCategory/MainCategory'
import ClassComponents from './ClassComponents/Components'

const CAROUSEL_IMAGES = [
    'https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2545.jpg',
    'https://img.freepik.com/premium-vector/abstract-pastel-color-background-with-pink-purple-gradient-effect-graphic-design-decoration_120819-463.jpg',
    'https://media.architecturaldigest.com/photos/6080a73d795a7b010f3dd2e0/2:1/w_2700,h_1350,c_limit/GettyImages-1213929929.jpg'
]

function Home() {
    return (
        <div>
            <HomeCarousel carouselList={CAROUSEL_IMAGES}/>

            <MainCategory />
            <ClassComponents />
        </div>
    );
}

export default Home;