const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/user");
const product = require("./routes/product");
const shippingAddress = require("./routes/shippingAddress");
const order = require("./routes/order");
const banner = require("./routes/banner");
const nodeenv = process.env.NODE_ENV;
const http = require("http");
const socketIo = require("socket.io");
const Orderdata = require("./models/orderSchema");
const category = require("./routes/category");




dotenv.config();
const cors = require("cors");
const { throws } = require("assert");



const app = express();
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// const __dirname = path.resolve();
app.use('/uploads', express.static(path.join( 'uploads/')))



// DB config
const db = process.env.MONGO_URI;
// console.log(db ,'ouri');



//  app.get("/" ,(req,res) => {
//      res.send("Api is running");
//  })
app.use("/api/users" , users);
app.use("/api/product" , product);
app.use("/api/shippingAddress" , shippingAddress);
app.use("/api/order" , order);
app.use("/api/banner" , banner);
app.use("/api/category" , category);

// app.use(( req, res, next) => {
//   throw new Error('error handling mid')
// })



 const PORT = process.env.PORT || 5000;
//  if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join( '../frontend/build')))

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve( '../frontend', 'build', 'index.html'))
//   )
// }
if (process.env.NODE_ENV === 'production') {
  // console.log('h');
  app.use(express.static(path.join( 'frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(  __dirname,'../frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('APIt is running....')
  })
}
const server = http.createServer(app);

const io = socketIo(server , {
  cors: {
    // origin: "http://18.222.127.41",
    origin: "*",
    // origin: "http://gaukotarkari.com",
    methods: ["GET", "POST"]
  }
  });

  app.use((err, req, res, next) => {
    console.log('congrats you hit the error middleware');
    console.log(err,'i');
    if(err == "Not authorized, token failed") {
    res.status(401).send('token expire');

    }
    res.status(500).send('something went wrong');
})
// connect to mongodb

mongoose
  .connect(process.env.MONGO_URI , {useCreateIndex:true,useUnifiedTopology: true,useNewUrlParser:true})
  .then(result => {
    // const server = app.listen(PORT, () => console.log(`server running in ${process.env.NODE_ENV} mode on port ${5000}`));
    io.on("connection", (socket) => {
      console.log("New client connected");
      socket.on("OrderSent" , (message) => {
        socket.broadcast.emit("OrderSent",message)
      } )
     
    });
    
  } )
  .catch((err) => console.log(err,'okkk'));

server.listen(PORT, () => console.log(`server running in ${process.env.NODE_ENV} mode on port ${5000}`));
