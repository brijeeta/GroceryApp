const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/groceryapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}, err => {
    if (err) throw err;
    console.log(err);
    console.log(process.env.MONGODB_URI);
});

module.exports = mongoose.connection;