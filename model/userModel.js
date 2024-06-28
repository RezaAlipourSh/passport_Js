const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true
})

const userModel = mongoose.model("user", userSchema);

module.exports = {
    userModel
}