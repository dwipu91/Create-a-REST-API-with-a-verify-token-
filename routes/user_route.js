import express from "express";
import { create_user, delete_user, get_all_user, get_single_user, update_user } from "../controller/user_controller.js";
import router from "./auth.js";
import { verify_token } from "../middlewares/verifayToken.js";


// int express 
const route = express.Router();


// usr verify tokenrn
route.use(verify_token);


// routes
route.post("/", create_user)
route.get("/", get_all_user)
route.get("/:id", get_single_user)
route.delete("/:id", delete_user)
route.patch("/:id", update_user)

// export route 
export default route