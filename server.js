import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./config/db";

import userRoute from './route/user.route'
import postRoute from './route/post.route'
import adminRoute from './route/admin.route'

dotenv.config()

const app = express()


// Database connect
connectDB();

app.use(cors());
app.use(express.json());


const port = process.env.PORT || 5000;

app.use(process.env.API_PREFIX, userRoute)
app.use(process.env.API_PREFIX, postRoute)
app.use(process.env.API_PREFIX, adminRoute)


app.get("/", (req, res) => res.send("Server is running"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


