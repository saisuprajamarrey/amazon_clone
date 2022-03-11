const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe");
("sk_test_51JKBkNLnaXD1tQZ74WhpU6Or0AfAewgTFVXJgtLvADoVGmm9YAlMG86vmTxZa8vQc9gaXPZsLUBnpGCnMhiBNfey00BZAex5l8"

)

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Hello World!"));

app.post("/payments/create",async(request,response) => {
    const total = request.query.total;
    console.log("Payment received",total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency:"usd"
    })

    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })

})


exports.api= functions.https.onRequest(app);



