import '../../style/style.css'
import React from 'react';
import ProductDetail from "../../components/Product/ProductDetail/ProductDetail"
import MainHeader from '../../components/Common/MainHeader'
import Footer from '../../components/Common/Footer';

function ProductPage() {
    return (
        <>
            <MainHeader />
            <ProductDetail />
            <Footer />
        </>
    );
}

export default ProductPage;