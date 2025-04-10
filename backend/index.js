require('dotenv').config();
const express= require('express');
const cors=require('cors');
const Stripe=require('stripe');
const stripe=Stripe(process.env.STRIPE_SECRET_KEY);
const app= express();
const PORT = 8080;

app.use(express.json());
app.use(cors());


app.post('/pay',async (req,res)=>{
    try {
        console.log(req.body);
        const {id} = req?.body?.selectedValue;
        console.log(id);
        if(!id) return res.status(400).json({message: 'PLease Enter a name'});
        const paymentIntent= await stripe.paymentIntents.create({
            amount:Math.round(25 * 100),
            currency: "eur",
            payment_method_types: id.includes('stripe_')?[id.replace('stripe_','')]:['card'],
            metadata:id.includes('stripe_')?[id.replace('stripe_','')]:{id}
        });
        
        const clientSecret=paymentIntent.client_secret;

        res.json({message:'Payment Initiated',clientSecret});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal Server Error'});
    }
});
app.post('/stripe',async(req,res)=>{
    const sig=req.header['stripe-signature'];
    let event;
    try {
        event= await stripe.webooks.constructEvent(req.body,sig,process.env.STRIPE_SECRET_KEY)
    } catch (error) {
        res.status(400).json({message:error.message});

    }
})
app.listen(PORT,()=>{console.log('Server running on port ',PORT )})