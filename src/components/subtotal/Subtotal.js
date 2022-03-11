import React from 'react';
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format"
import {useStateValue} from "../../context-api/StateProvider";
import {getCartTotal} from "../../context-api/reducer"
import {useHistory} from "react-router-dom";

function Subtotal() {
    const [{shoppingCart}, dispatch] = useStateValue()
    const history = useHistory();
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            {/* Part of the homework */}
                            Subtotal ({shoppingCart.length} items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getCartTotal(shoppingCart)} // Part of the homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button onClick={e => history.push("/payment")}>Proceed to Checkout</button>
        </div>

    );
}

export default Subtotal;