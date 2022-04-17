const mongooose = require('mongoose');

module.exports = () => {
    return mongooose.connect("mongodb+srv://sachin:sachin123@cluster0.kcbbj.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true })
}