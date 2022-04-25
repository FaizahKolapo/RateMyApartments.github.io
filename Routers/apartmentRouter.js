const express = require('express')
const {Apartment, Review} = require("../Database/Model");
const router = express.Router()
const mongoose = require('mongoose')

router.get('/', (req, res) => {
    res.render('ejs/home')
})
router.get('/about', (req, res) => {
    res.render('ejs/about')
})

router.get('/apartments', async (req, res) => {

    res.send(await Apartment.find({}))

})
router.get('/apartmentlist', async (req, res) => {
    const query = []
    const config = {}
    query.push({$sort: {_id: 1}})

    if (req.query.search) {
        if (req.query.search !== '' || req.query.search !== '#') {
            config.search = req.query.search
            query.push(
                {
                    $match: {name: {$regex: (req.query.search).trim(), $options: 'i'}}
                }
            )
        }
    }
    if (req.query.bedrooms === 'on') {
        config.bedrooms = true
        query.push(
            {
                $match: {beds: {$gte: 1}}
            }
        )
    }
    if (req.query.pet === 'on') {
        config.pet = true
        query.push(
            {
                $match: {isPetFriendly: true}
            }
        )
    }
    if (req.query.utilities === 'on') {
        config.utilities = true
        query.push(
            {
                $match: {isUtilityIncluded: true}
            }
        )
    }
    if (req.query.oneYear === 'on') {
        config.oneYear = true
        query.push(
            {
                $match: {leaseMonths: 12}
            }
        )
    }
    if (req.query.sixMonths === 'on') {
        config.sixMonths = true
        query.push(
            {
                $match: {leaseMonths: 6}
            }
        )
    }


    const apartments = await Apartment.aggregate(query)

    res.render('ejs/apartmentList', {apartments, config})
})
router.get('/apartment/:id', async (req, res) => {

    res.send(await Apartment.find({_id: req.params.id}))

})
router.get('/addapartments', async (req, res) => {

    res.render('ejs/addApartments')

})

router.post('/addapartment', async (req,res)=>{

    let {name, address, city, postalCode, phone, state, zipCode, beds,bathrooms, description, leaseMonths, isPetFriendly, isUtilityIncluded} = req.body
    let image
    const validFormats = ['png','jpg','jpeg','gif','bmp']
    if (req.files && validFormats.includes(req.files.image.name.split('.').reverse()[0])){
            image = req.files.image.name;
            await req.files.image.mv('./views/images/' + image);
    }
    else {
        image = 'default.png'
    }

    await (new Apartment({
        name, address, city, postalCode, phone, state, zipCode, beds,bathrooms, description, image, leaseMonths
        , isPetFriendly, isUtilityIncluded
    }).save())

    res.redirect('/apartmentlist')
    console.log(req.body)

})


module.exports = router