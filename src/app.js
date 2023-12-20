const express = require('express')
const app = express()
const connectDB = require('./db/config');
const routes = require('./routes/routes');
const hbs = require('hbs')
const bodyParser = require('body-parser');
const port = process.env.PORT || 80;
const path = require('path');


app.use('/static',express.static('static'))


app.use('',routes.routes)
app.use('/users',routes.users)

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.set('view engine','hbs')
hbs.registerPartials("views/partials")

connectDB().then(()=>{
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    console.log("MongoDb Connected")
})
connectDB().catch(()=>{
    console.log("Not Connected")
})