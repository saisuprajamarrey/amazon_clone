import React from 'react';
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from "react-router-dom";
import {useStateValue} from "../../context-api/StateProvider";
import {auth} from "../../firebase";

function Header() {
    const [{shoppingCart,user}, dispatch] = useStateValue()

    const handleAuthentication= async ()=>{
        if(user){
           try{
               const response = await auth.signOut();
               console.log(response)

           }
           catch (e){
               console.warn(e.message)
           }
        }
    }

    return (
        <div className="header">
            <Link to="/">
                <img
                    className="header_logo"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt=""
                />
            </Link>

            <div className="header_search">
                <input
                    className="header_searchInput"
                    type="text"
                />
                <SearchIcon className="header_searchIcon" />

            </div>

            <div className="header_nav" >
                <Link to ={!user && "/login"}>
                    <div className="header_option" onClick={handleAuthentication}>
                        <span  className="header_optionLineOne">Hello {!user ?"Guest": user.email}</span>
                        <span className="header_optionLineTwo">{user ? 'Sign Out':'Sign In'}</span>
                    </div>
                </Link>
                <div className="header_option">
                    <span  className="header_optionLineOne">Returns</span>
                    <span className="header_optionLineTwo">& Orders</span>

                </div>
                <div className="header_option">
                    <span  className="header_optionLineOne">Your</span>
                    <span className="header_optionLineTwo">Prime</span>

                </div>
                <Link to="/checkout">
                    <div className="header_optionCart">
                        <ShoppingCartIcon />
                        <span className="header_optionLineTwo header_cartCount">{shoppingCart?.length}</span>
                    </div>
                </Link>

            </div>


        </div>
    );
}

export default Header;

