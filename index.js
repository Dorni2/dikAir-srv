const express = require('express')
const Dal = require('./Dal');
const app = express()
const port = 3000


let http = require('http');
let server = http.Server(app);
let socketPort = 3001;

let socketIO = require('socket.io');
let io = socketIO(server);

app.get('/', (req, res) => res.send('Hello World!'))

const userRouter = express.Router();




userRouter.route('/')
.get((req, res) => {
    Dal.userModel.find({}, (err, usres) => {
        res.json(usres);
    })
})


app.use('/api/users', userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))




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