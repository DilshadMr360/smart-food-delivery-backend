import express from 'express';
import { addFood, getFoodDetails, listFood, removeFood, updateFoodList} from '../controllers/foodController.js';
import multer from 'multer';


const foodRouter  = express.Router();

//image storage engine 

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
        //by usign this file name become unique 
    }
})

const upload = multer({storage:storage})
//image storage engine end


//we send post send the data on the server
foodRouter.post("/add",upload.single("image"), addFood)
foodRouter.get( "/list",listFood)
foodRouter.get("/edit/:id", getFoodDetails); 
foodRouter.patch("/update/:id", upload.single("image"), updateFoodList);
foodRouter.post("/remove", removeFood);
    
export default foodRouter;
