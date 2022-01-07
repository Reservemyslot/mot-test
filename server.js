const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const { ORIGIN,PORT } = require("./serverConfig");
const dbConnect = require("./db/dbConnect");
const {
  notFound,
  headerFunction,
  errHandler,
} = require('./middleware/errorMiddleware');
const router = require("./router");


const app = express();
    
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.all('*', headerFunction);
app.use(cors({ ORIGIN }))


// routes

app.get('/', (req, res) => {
  try{
     res.status(200).send('API works.')
  } catch (err){
    res.status(404).send(err)
  }
    
})


app.use(
  '/v1',router
)

// error handlers

app.use(errHandler)
app.use(notFound)

// database connection

dbConnect()

// server status   

app.listen(process.env.PORT || 8080, () => {
  try {
    console.log(`Server is running on the ${PORT}`)
  } catch (err) {
    console.log(err)
  }
})




