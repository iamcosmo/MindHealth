// server.js
import express from 'express';
import * as dotenv from 'dotenv'
import morgan from 'morgan';
import cors from'cors';
import connectDB from './mongodb/connect.js'
import authRoutes from './routes/authRoutes.js';
import colors from 'colors';
import chalk from 'chalk';
//configure env
dotenv.config();


const app = express();

// Middleware and configurations here
app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use(morgan('dev'));

// Use routes
app.use('/api/users', authRoutes);

//rest api
app.get('/',(req,res)=>{
  res.send("<h1>Welcome to MindHealth</h1>")
});

const PORT = process.env.PORT || 8080;
const startServer = async ()=>{
  try{
    //connect to database
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT,()=>{
      console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
    })
  }catch(error)
  {
    console.log(error);
  }
}
startServer();
// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/myapp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });



//run listen
