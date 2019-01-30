const express = require('express')
const Dal = require('./Dal');
const app = express()
const port = 3000

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

