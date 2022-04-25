const mongoose = require('mongoose')

const Apartment = new mongoose.model('Apartment', {
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String
    },
    phone: {
        type: String
    },
    state: {
        type: String
    },
    beds: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    isPetFriendly: {
        type: Boolean
    },
    isUtilityIncluded: {
        type: Boolean
    },
    leaseMonths: {
        type: Number
    }


})
module.exports = {
    Apartment
}