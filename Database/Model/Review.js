const mongoose = require('mongoose')

const Review = new mongoose.model('Review', {

    apartmentId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    // image:{
    //     type:String
    // },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    rate: {
        type: Number
    }

})

module.exports = {
    Review
}