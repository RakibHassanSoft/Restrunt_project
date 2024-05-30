import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useCart from '../../../hooks/useCart'
import useAuth from '../../../hooks/useAuth'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const CheckOutForm = () => {
    const [clientSecret, setClientSecret] = useState('')
    const [err, setErrer] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const [cart,refetch] = useCart()
    const { user } = useAuth()


    const navigate = useNavigate()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    // console.log(cart)


    useEffect(() => {
        if(totalPrice > 0){
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })
            
        }
      
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();
        //invalid
        if (!stripe || !elements) {
            return;
        }
        //finding card 
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setErrer(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setErrer('')
        }

        //confirm payment

        const { paymentIntent, error: conformError } = await stripe.confirmCardPayment(
            clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous"
                }
            }
        }
        )
        if (conformError) {
            console.log('confirm error')
        } else {
            console.log('paymentIntent ', paymentIntent)
            if (paymentIntent.status == "succeeded") {
                console.log('transaction id', paymentIntent.id)
                setTransactionId(paymentIntent.id)

                // now save the payment in the databse
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId:paymentIntent.id,
                    date: new Date() ,// utc date convert . user moment js
                    cartIds : cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'Pending',
                    
                }
               const res =  await axiosSecure.post('/payments',payment)
               console.log("payment saved",res.data)
               refetch();
               if(res.data?.paymentResult?.insertedId){
                await Swal.fire({
                    title: "Congratulation!",
                    text: "Payment successfully done",
                    icon: "success"
                  });
                navigate('/dashboard/paymentHistory')
               }
            }
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-sm bg-primary text-white my-5' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className='text-red-400 text-center'>
                {err}

            </p>
            {
                transactionId && <p className='text-green-400 text-center'>
                   Your transaction id :{transactionId}

                </p>
            }
        </form>
    );
};

export default CheckOutForm;