const paymentController = require('../controller/payment')

const router = require('express').Router()

router.post( '/charge', paymentController.chargeCustomer )

module.exports = router