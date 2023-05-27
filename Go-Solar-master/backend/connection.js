const mongoose = require('mongoose');

const url = 'mongodb+srv://ashish5990:ashish@cluster0.bolj4cy.mongodb.net/GoSolar?retryWrites=true&w=majority';

mongoose.connect(url)
.then((result) => {
    console.log('database connected');
    // console.log(result);
})
.catch((err) => {
    console.error(err);
});

module.exports = mongoose;

// synchronous
// asynchronous