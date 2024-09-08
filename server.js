import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import addressRouter from "./routes/addressRoute.js";
//app config

const app = express();

const port = 4000;

//middlewere

// whenever we req to front to backend it will pass to backend
app.use(express.json());

//we can access bkend from frontend
app.use(cors());

//db connection
connectDB();


//api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/category", categoryRouter)
app.use("/api/address", addressRouter)
app.use("/profiles", express.static('profileImages'));

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

// mongodb+srv://root:<db_password>@cluster0.xz8du.mongodb.net/?
