import React, {useEffect, useState} from 'react';
import {useStateValue} from "../../context-api/StateProvider";
import CheckoutProduct from "../../components/checkoutproduct/CheckoutProduct";
import {Link,useHistory} from "react-router-dom"
import "./Payment.css";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js"
import CurrencyFormat from "react-currency-format"
import {getCartTotal} from "../../context-api/reducer";
import axios from "../../axios"

function Payment() {
    const [{shoppingCart, user}, dispatch] = useStateValue()
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory()

    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret,setClientSecret] = useState(true)

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getCartTotal(shoppingCart) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();

    }, [shoppingCart])
    console.log("The secret is ",clientSecret);

    const handleSubmit = async (event) => {
        event.preventDefault()
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then((paymentIntent) => {
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            history.replace('/orders')
        })


    }

    const handleChange = (event) => {
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "")

    }

    return (
        <div className="payment">
            <div className="payment_container">
                <h1>
                    Checkout(
                    <Link to="/checkout">{shoppingCart?.length} items</Link>
                    )
                </h1>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>

                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment_items">
                        {shoppingCart.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                rating={item.rating}
                                price={item.price}
                            />
                        ))}

                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment_priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getCartTotal(shoppingCart)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}


                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {error && <div>{error}</div>}

                        </form>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Payment;