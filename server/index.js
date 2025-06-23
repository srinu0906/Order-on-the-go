import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";

const app = new express();
app.use(express.json())
app.use(cors());

mongoose.connect("mongodb://localhost:27017/SBfoods").
then().
catch((err)=> console.log("error connecting mongoDb"));

app.use("/api/auth",authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/restaurants',restaurantRoutes);

app.get('/',(req,res)=>{
    res.send("Hello");
});
app.listen(5000,()=>{
    console.log("Server is runnning")
});