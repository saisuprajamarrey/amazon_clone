import React, {useEffect} from "react";
import './App.css';
import Header from "../header/Header";
import Home from "../../pages/home/Home"
import {BrowserRouter as Router, Switch,Route} from "react-router-dom"
import Checkout from "../../pages/checkout/Checkout";
import Login from "../../pages/login/Login";
import {auth} from "../../firebase";
import {useStateValue} from "../../context-api/StateProvider";
import Payment from "../../pages/Payment/Payment";
import {loadStripe} from "@stripe/stripe-js/pure";
import {Elements} from "@stripe/react-stripe-js";

const promise = loadStripe(
    "pk_test_51JKBkNLnaXD1tQZ7mZXYt5vEFl5Ye9Wu4pDTjJRoJFgXPwgPe4HJ1iF4vLNksQKGneoNuKb363LYMxYoCyLvnzJx00WEWRTAwb"
)

function App() {
    const[{},dispatch] = useStateValue();
    useEffect(()=>{
       auth.onAuthStateChanged(authUser=>{
           if(authUser){
               dispatch({
                   type: 'SET_USER',
                   user:authUser

               })
           }
           else {
               dispatch({
                   type:'SET_USER',
                   user:null
               })
           }
       })
    },[])
  return (
      <Router>
          <div className="app">

              <Switch>
                  <Route path="/login">
                      <Login />
                  </Route>
                  <Route path ="/checkout">
                      <Header />
                      <Checkout />
                  </Route>
                  <Route path="/payment">
                      <Header />
                      <Elements stripe={promise}>
                          <Payment />
                      </Elements>

                  </Route>
                  <Route path ="/">
                      <Header />
                      <Home />
                  </Route>
              </Switch>
          </div>

      </Router>

  );
}

export default App;
