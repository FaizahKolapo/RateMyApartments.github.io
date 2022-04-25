const express = require('express')
const {Apartment, Review} = require("../Database/Model");
const router = express.Router()
const mongoose = require('mongoose')


router.get('/reviews/:apId', async (req, res) => {

    const query = [{
        $lookup: {
            from: 'apartments',
            localField: 'apartmentId',
            foreignField: '_id',
            as: 'apartment'
        }
    },
        {$match: {apartmentId: mongoose.Types.ObjectId(req.params.apId)}}]

    const reviews = await Review.aggregate(query)
    reviews.reverse()

    res.render('ejs/reviews', {reviews})
})
router.post('/reviews/:apId', async (req, res) => {

    const {rate, text, firstName, lastName} = req.body
    const apartmentId = req.params.apId

    const review = new Review({
        apartmentId: mongoose.Types.ObjectId(apartmentId),
        text,
        firstName,
        lastName,
        rate: parseInt(rate)
    })
    await review.save()

    res.redirect('/reviews/' + apartmentId)

})


module.exports = router