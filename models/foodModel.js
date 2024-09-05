import mongoose from "mongoose";

// by using food modal we can store food products in the dataase 
//food modal proprty

const foodSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},
    image: {type:String, required:true},
    category: {type:String, required:true},
    quantity: {type:Number, required:true},
})
//using above schema will create modal

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema)

export default foodModel;
