import categoryModel from "../models/categoryModel.js";
// Add Category
const addCategory = async (req, res) => {
    try {
        const newCategory = new categoryModel({
            categoryName: req.body.categoryName,
        });
        await newCategory.save();
        res.json({ success: true, message: "Category Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Adding Category" });
    }
};

// Fetch Categories
const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        // console.log("Fetched Categories:", categories); 
        res.json({ success: true, data: categories });
        // console.log("geee",categories)
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Fetching Categories" });
    }
};

//edit categoeiries 

const editCategory = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id);   
        if(category){
            res.json({success:true , data: category});
          }  else{
                res.json({success:false, message: "Category Item not Found"})
            }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching Category item" });
    }
};



// Update Category
const updateCategory = async (req, res) => {
    try {
        // Log the received data
        console.log('Received data on server:', req.body);

        // Find the category by ID and update it
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            req.params.id, // Category ID from URL params
            { categoryName: req.body.name }, // Updated data
            { new: true } // Return the updated document
        );
        
        // Check if the category was found and updated
        if (updatedCategory) {
            res.json({ success: true, message: "Category updated successfully", data: updatedCategory });
        } else {
            res.json({ success: false, message: "Category not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating category" });
    }
};

const removeCategory = async (req, res) =>{
        try {
        const category = await categoryModel.findById(req.body.id);
        if (!category) {
            return res.json({ success: false, message: "Category not found" });
          }
        await categoryModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Category Removed"})
        } catch (error) {
            res.json({success:false,message:"Category Deleted Fail"})

            
        }
}




export {addCategory, getCategories,editCategory,updateCategory,removeCategory};