import multer from "multer";


const storage = multer.diskStorage({
    destination: (req, file , cb)=>{
        
    },
    filename: (req, file, cb)=>{}
});

export const create_user_multer = multer({storage}).single("user_photo")