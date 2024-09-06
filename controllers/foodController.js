import foodModel from "../models/foodModel.js";
import fs from 'fs';


//add food item


const addFood = async (req,res)=>{

    let image_filename = `${req.file.filename}`;


    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        quantity: req.body.quantity,
        category:req.body.category,
        image:image_filename
    })
        try {
        await food.save();
        res.json({success: true, message:"Food Added"})
        } catch (error) {
            console.log(error)
            res.json({success:false, message:"Error"})
        }
        
}
// edit food details by ID
const getFoodDetails = async (req, res) => {
    try { 
      const food = await foodModel.findById(req.params.id);
      if (food) {
        res.json({ success: true, data: food });
      } else {
        res.json({ success: false, message: "Food item not found" });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error fetching food item" });
    }
  };

//update food list
const updateFoodList = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, category, quantity } = req.body;
  
      const food = await foodModel.findById(id);
  
      if (!food) {
        return res.json({ success: false, message: "Food item not found" });
      }
  
      const updateData = { name, description, price, category,quantity };
  
      if (req.file) {
        fs.unlink(`uploads/${food.image}`, (err) => {
          if (err) console.log("Error deleting old image:", err);
        });
        updateData.image = req.file.filename;
      }
  
      const updatedFood = await foodModel.findByIdAndUpdate(id, updateData, { new: true });
  
      if (updatedFood) {
        res.json({ success: true, data: updatedFood, message: "Food item updated successfully" });
      } else {
        res.json({ success: false, message: "Error updating food item" });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error updating food item" });
    }
  };
  


//all food list 

const listFood = async (req, res)=> {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}


//deelte food Item

const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food Removed"})
    } catch (error) {
            console.log(object);
            res.json({success:false,message:"Food Deleted Fail"})
    }
}

// In your food controller

// Update food quantity
const updateFoodQuantity = async (req, res) => {
  try {
    const { id, quantity } = req.body;
    const food = await foodModel.findById(id);

    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }

    if (food.quantity < quantity) {
      return res.json({ success: false, message: "Not enough stock" });
    }

    food.quantity -= quantity;

    if (food.quantity <= 0) {
      food.quantity = 0;
      // Optional: Mark item as out of stock or handle accordingly
    }

    await food.save();

    res.json({ success: true, message: "Quantity updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating quantity" });
  }
};

// Get count of all food items
const getFoodCount = async (req, res) => {
  try {
    const count = await foodModel.countDocuments({});
    res.json({ success: true, count });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching food count" });
  }
};



export {addFood, listFood, removeFood, updateFoodList, getFoodDetails, updateFoodQuantity, getFoodCount}
