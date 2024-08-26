import mangoose from "mongoose";

export const connectDB =async ()=>{
     await mangoose.connect('').then(()=>console.log("DB Conncted"));
}