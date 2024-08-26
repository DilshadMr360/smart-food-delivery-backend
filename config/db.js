import mangoose from "mongoose";

export const connectDB =async ()=>{
     await mangoose.connect('mongodb+srv://root:1234@cluster0.xz8du.mongodb.net/food-delivery-system').then(()=>console.log("DB Conncted"));
}