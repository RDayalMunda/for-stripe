const { SECRET_KEY, CURRENCY, PORT } = require('../config')

const stripe = require('stripe')(SECRET_KEY)

module.exports.chargeCustomer = async function (req, res){
    try{
        console.log('charging a customer')

        let lineItems = req.body.items.map( item => ({
            price_data: {
                currency: CURRENCY,
                product_data: {
                    name: item.name,
                    images: []
                },
                unit_amount: Math.round((item.amount)*100), // *100, is in case for INR and USD
            },
            quantity: item.quantity
        }) )

        console.dir(lineItems, { depth: null })
        console.log('generating session')
        const session = await stripe.checkout.sessions.create({
            payment_method_types: [ "card" ],
            line_items: lineItems,
            mode: "payment",
            success_url: `http://localhost:${PORT}/payment_success`,
            cancel_url: `http://localhost:${PORT}/payment_cancel`,
        })
        console.log('got session', session?.id)
        res.status(200).json({ id: session.id })

    }catch(err){
        console.log(err)
        res.status(500).json()
    }
}