const axios = require("axios");

exports.initializePayment = async (req,res)=>{

    try{

        const {email, amount} = req.body;

        const response = await axios.post(
            "https://api.paystack.co/transaction/initialize",

            {
                email,
                amount: amount * 100
            },

            {
                headers:{
                    Authorization:
                    `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,

                    "Content-Type":
                    "application/json"
                }
            }
        );

        res.json(response.data);

    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};


exports.verifyPayment = async(req,res)=>{

    try{

        const {reference}=req.params;

        const response = await axios.get(

            `https://api.paystack.co/transaction/verify/${reference}`,

            {
                headers:{
                    Authorization:
                    `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                }
            }

        );

        res.json(response.data);

    }catch(error){

        res.status(500).json(error);

    }

};