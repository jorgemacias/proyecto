var mongoose = require('mongoose');
var md5 = require('md5');
//schema
var userSchema = mongoose.Schema({
    username: {
        type: String,
        index: true, unique: true
    },
    password: { type: String },
    email: { type: String, index: true, unique: true },
    name: { type: String },
    age: { type: Number }
});

userSchema.methods.comparePassword = function (candidatePassword) {

    if (this.password === md5(candidatePassword)) {
        return true;
    } else {
        return false;
    }

};

// export model
module.exports = mongoose.model('usermodel', userSchema);
