import React from 'react';
import GradeIcon from "@material-ui/icons/Grade";
import "./CheckoutProduct.css"
import {useStateValue} from "../../context-api/StateProvider";

function CheckoutProduct({id,image,title,price,rating}) {
    const [{shoppingCart}, dispatch] =useStateValue();

    const removeFromCart =()=>{
        dispatch({
            type: "REMOVE_FROM_CART",
            id
        })
    }

    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct_image" src={image} />
            <div className="checkoutProduct_info">
                <p className="checkoutProduct_title">{title}</p>
                <p className="checkoutProduct_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProcut_rating">
                    {Array(rating).fill().map((_,i)=>(
                        <GradeIcon className="rating_icon"/>
                    ))}
                </div>
                <button onClick={removeFromCart}>Remove from Cart</button>


            </div>

        </div>
    );
}

export default CheckoutProduct;