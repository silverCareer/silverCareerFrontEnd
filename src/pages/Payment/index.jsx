import React from 'react';
import PaymentHeader from '../../components/Common/PaymentHeader'
import Footer from '../../components/Common/Footer';
import Payment
 from '../../components/Payment';
function PaymentPage() {
    return (
        <>
            <PaymentHeader />
            <Payment />
            <Footer />
        </>
    );
}

export default PaymentPage;