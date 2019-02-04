var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DikAir');
mongoose.Promise = global.Promise;
var db = mongoose.connection;

var userSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    cityId: Number,
    email:String,
    password:String,
    isAdmin: Boolean
})

var citySchema = new mongoose.Schema({
    id: Number, 
    name: String
})
var flightSchema = new mongoose.Schema({
    id: Number,
    flightNumber: String,
    originId: Number,
    destinationId: Number,
    price: Number
})
var bookingSchema = new mongoose.Schema({
    id:Number, 
    userId: Number, 
    flightId:String, 
    seats: Number, 
    totalPrice: Number
})
var userModel = mongoose.model('user', userSchema);
var cityModel = mongoose.model('city', citySchema);
var flightModel = mongoose.model('flight', flightSchema);
var bookingModel = mongoose.model('booking', bookingSchema);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected");
});

module.exports = {
    userModel,
    flightModel,
    bookingModel,
    cityModel
}







































































































































    // User table
    // var userModel = mongoose.model('user', userSchema);
    // var someUser = new userModel({
    //     id: 1,
    //     firstName: 'Kim',
    //     lastName: 'Boren',
    //     cityId: 2,
    //     email: 'Kim@Boren.com',
    //     password: '1q2w3e4r',
    //     isAdmin: true
    // })

    //City table
    // var cityModel = mongoose.model('city', citySchema);
    // var someCity = new cityModel({
    //     id: 1,
    //     name: 'jerusalem,Israel'
    // })

    //flight table
    //var flightModel = mongoose.model('flight', flightSchema);
    // var someFlight = new flightModel({
    //     id: 1,
    //     flightNumber: 'ly8',
    //     originId: 1,
    //     destinationId: 2,
    //     price: 350
    // })

    //Booking table
    //var bookingModel = mongoose.model('booking', bookingSchema);
    // var someBooking = new bookingModel({
    //     id:1, 
    //     userId: 1, 
    //     flightId:'ly8', 
    //     seats: 1, 
    //     totalPrice: 350
    // })
    
    // userModel.find(function (err, allusers) {
    //     console.log(
    //         '+++++++++++++++++'
    //     );
    //     if (err) console.log(err);
    //     console.log(allusers);
    // })
    //Save tables - example https://mongoosejs.com/docs/api.html#model_Model-save
    // someUser.save(function (err, someUser) {
    //     if (err) return console.log(err);
    //   });
    // someBooking.save(function (err, someBooking) {
    //     if (err) return console.log(err);
    //   });
    // someCity.save(function (err, someCity) {
    //     if (err) return console.log(err);
    //   });
    // someFlight.save(function (err, someFlight) {
    //     if (err) return console.log(err);
    //   });
  


