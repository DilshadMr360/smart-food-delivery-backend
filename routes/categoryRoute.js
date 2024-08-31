import express from 'express';
import {addCategory, editCategory, getCategories, removeCategory, updateCategory} from '../controllers/categoryController.js'



const categoryRouter = express.Router();


categoryRouter.post("/addcategory", addCategory)
categoryRouter.get("/categories", getCategories)
categoryRouter.get("/edit-category/:id", editCategory)
categoryRouter.patch("/update-category/:id", updateCategory)
categoryRouter.post("/remove-category", removeCategory);


export default categoryRouter;