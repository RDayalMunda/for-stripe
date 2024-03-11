

async function makePayment(e){
    e.preventDefault()
    let formSet = document.querySelector('#form-set')
    formSet.setAttribute('disabled', true)
    console.log('to make payments')
    let stripe = await Stripe("pk_test_51Ot34gAF3B2lvMLHGkWPE4S4AcNFnPlYVeJdwLSp0VEaRGpUZmbKLhrMraXsOEcpITeIWrpd82rQ6nAE0Y3bxawW00KCAVo0G0")
    console.log('stripe loaded')
    let body = { // generate this in your application dynamically
        items: [{
            _id: "6526680059f019c481c2be93",
            name: document.querySelector('#product-name').value,
            amount: Number(document.querySelector('#product-amount').value),
            quantity: Number(document.querySelector('#product-quantity').value),
        }]
    }
    let headers = {
        "Content-Type": "application/json"
    }

    console.log('hitting server')
    try{
        let response = await fetch( `${origin}/api/payment/charge`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        } )
    
        console.log('got respone')
        let session = await response.json()
        console.log('got session')
    
        console.log(session?.id)
        const result = stripe.redirectToCheckout({
            sessionId: session.id
        })
    }catch(err){
        alert('INTERNAL SERVER ERROR')
        formSet.removeAttribute('disabled')
    }
    console.log('to redirect to checkout page')
}