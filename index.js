const express = require('express')
const Dal = require('./Dal');
const app = express()
const port = 3000


let http = require('http');
let server = http.Server(app);
let socketPort = 3001;

let socketIO = require('socket.io');
let io = socketIO(server);

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => res.send('Hello World!'))

const userRouter = express.Router();
const flightRouter = express.Router();
const cityRouter = express.Router();
const bookingRouter = express.Router();



// =======USER=======

app.use('/api/users', userRouter);

userRouter.route('/')
.get((req, res) => {
    Dal.userModel.find({}, (err, usres) => {
        res.json(usres);
    })
})

userRouter.route('/:userId')
.get((req, res) => {
    Dal.userModel.findOne({id: req.params.userId}, (err, user) => {
        if(err)
            res.statusCode(500).send(err)
        else {
            res.json(user);
        }
    })
})

userRouter.route('/login/:email&:password')
.get((req, res) => {
    Dal.userModel.findOne({email: req.params.email, password: req.params.password}, (err, user) => {
        if(err)
            res.json(user);
        else {
            res.json(user);
        }
    })
})

userRouter.route('/new/:firstName&:lastName&:cityId&:email&:password&:isAdmin')
.get((req, res) => {
    Dal.userModel.find({}, (err, users) => {
        var max = 0;
        var maxElement = res[0];
        users.forEach(element => {
            if (element.id > max) {
                max = element.id;
                maxElement = element;
            }
        });    
    var someUser = new Dal.userModel({
    id: (max+1),
    firstName: req.params.firstName,
    lastName: req.params.lastName,
    cityId: req.params.cityId,
    email: req.params.email,
    password: req.params.password,
    isAdmin: req.params.isAdmin
    })
    someUser.save(function (err, user) {
        if (err) {
            res.status(500);
            res.json(err);
        }
        res.json(user);
    })
})
})

// userRouter.use('/:userId', (req, res) => {
//     Dal.userModel.findOne({id: req.params.userId}, (err, user) => {
//         if(err)
//             res.statusCode(500).send(err)
//         else {
//             res.json(user);
//         }
//     })
// })

// userRouter.use('/new/:')

// =======END_USER=======

// =======FLIGHT=======

app.use('/api/flights', flightRouter);
flightRouter.route('/')
.get((req, res) => {
    Dal.flightModel.find({}, (err, flights) => {
        res.json(flights)
    })
})

flightRouter.route('/stats')
.get((req, res) => {
    Dal.flightModel.aggregate([
        // {
        //     $unwind: "$items"
        // },
        {
            $group: {
                _id: "$destinationId",
                count: { $sum: 1 }
            }
        }
    ], (err, flights) => {
        res.json(flights)
    })
})

flightRouter.route('/new/:flightNumber&:originId&:destinationId&:price')
.get((req, res) => {
    Dal.flightModel.find({}, (err, flights) => {
        var max = 0;
        var maxElement = res[0];
        flights.forEach(element => {
            if (element.id > max) {
                max = element.id;
                maxElement = element;
            }
        });
    var someFlight = new Dal.flightModel({
        id: (max+1),
        flightNumber: req.params.flightNumber,
        originId: req.params.originId,
        destinationId: req.params.destinationId,
        price: req.params.price,
        })
        someFlight.save(function (err, flight) {
            if (err) {
                res.status(500);
                res.json(err);
            }
            res.json(flight);
        })
    })
})

flightRouter.route('/delete/:id')
.get((req, res) => {
    Dal.flightModel.deleteOne({id:req.params.id}, (err, deletedCount) => {
        res.json(deletedCount['n']);
    });
})

// =======END_FLIGHT=======

// =======CITY=======
app.use('/api/cities', cityRouter);
cityRouter.route('/')
.get((req, res) => {
    Dal.cityModel.find({}, (err, cities) => {
        res.json(cities)
    })
})


cityRouter.route('/new/:name')
.get((req, res) => {
    Dal.cityModel.find({}, (err, cities) => {
        var max = 0;
        var maxElement = res[0];
        cities.forEach(element => {
            if (element.id > max) {
                max = element.id;
                maxElement = element;
            }
        });        
        var someCity = new Dal.cityModel({
        id: ++max,
        name: req.params.name
        })
        someCity.save(function (err, city) {
            if (err) {
                res.status(500);
                res.json(err);
            }
            res.json(city);
        })
    })        
})

cityRouter.route('/:CityId')
.get((req, res) => {
    Dal.cityModel.findOne({id: req.params.CityId}, (err, user) => {
        if(err){
            res.status = 500;
            res.send(err);
        }
        else {
            res.json(user);
        }
    })
})

// =======END_CITY=======

// =======BOOKING=======

app.use('/api/bookings', bookingRouter);
bookingRouter.route('/')
.get((req, res) => {
    Dal.bookingModel.find({}, (err, bookings) => {
        res.json(bookings)
    })
})


bookingRouter.route('/new/:userId&:flightId&:seats&:totalPrice')
.get((req, res) => {
    Dal.bookingModel.find({}, (err, bookings) => {
        var max = 0;
        var maxElement = res[0];
        bookings.forEach(element => {
            if (element.id > max) {
                max = element.id;
                maxElement = element;
            }
        });        
        var someBooking = new Dal.bookingModel({
        id: (max+1),
        userId: req.params.userId,
        flightId: req.params.flightId,
        seats: req.params.seats,
        totalPrice: req.params.totalPrice
        })
        someBooking.save(function (err, booking) {
            if (err) {
                res.status(500);
                res.json(err);
            }
            res.json(booking);
        })
    })        
})

bookingRouter.route('/:bookingId')
.get((req, res) => {
    Dal.bookingModel.findOne({id: req.params.bookingId}, (err, booking) => {
        if(err){
            res.statusCode(500);
            res.json(err);
        }
        else {
            res.json(booking);
        }
    })
})


// =======END_BOOKING=======

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



// =======CHAT=======

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('new-message', (message) => {
        console.log(message);
        io.emit('new-message', message);
      });
});

server.listen(socketPort, () => {
    console.log(`started on port: ${socketPort}`);
});

// =======END_CHAT=======