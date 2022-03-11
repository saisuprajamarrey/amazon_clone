import React, {useState} from 'react';
import "./Product.css";
import GradeIcon from '@material-ui/icons/Grade';
import {useStateValue} from "../../context-api/StateProvider";

function Product({id,title,image,price,rating}) {
    const [{ shoppingCart },dispatch] = useStateValue();
    console.log(shoppingCart)

    const addToCart=()=>{
        dispatch({
            type:"ADD_TO_CART",
            item:{
                id,
                title,
                image,
                price,
                rating
            }

        })
    }
    return (
        <div className="product">
            <div className="product_info">
                <p>{title}</p>
                <p className="product_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>

                <div className="product_rating">
                    {Array(rating).fill().map((_,i)=>(
                        <GradeIcon className="rating_icon"/>
                    ))}


                </div>
            </div>
            <img
                src={image}
                alt=""
            />
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
}

export default Product;