import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import {loadStripe} from '@stripe/stripe-js';
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
  
const Payment = () => {
    //TODO: Add publishable key
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gatway_PK)
    return (
        <div>
            <SectionTitle heading={"Payment"} subHeading={"Please pay to eat"}></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;