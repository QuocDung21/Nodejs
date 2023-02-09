const mongoose = require('mongoose')

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    foundededYear: {
        type: String,
    },
    specialized: {
        type: [String]
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

const userSchema = new mongoose.Schema({


    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },

    password: {
        type: String,
        required: true,
    },

    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
    },

    isAdmin: {
        type: Boolean,
        default: false
    }

})

const User = mongoose.model('User', userSchema)
const School = mongoose.model('School', schoolSchema)

module.exports = { User, School }