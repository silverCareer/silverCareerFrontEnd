import '../../style/style.css'
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductList from "../../components/Product"
import ProductDetail from "../../components/Product/ProductDetail/ProductDetail"
import MainHeader from '../../components/Common/MainHeader'
import Footer from '../../components/Common/Footer';

function ProductPage() {
    /*const { productIdx } = useParams();

    if (productIdx) {
        return (
            <>
                <MainHeader />
                <ProductDetail />
                <Footer />
            </>
        );
    }

    return (
        <>
            <ProductList />
        </>
    );*/
    return (
        <>
            <MainHeader />
            <ProductDetail />
            <Footer />
        </>
    );
}

export default ProductPage;