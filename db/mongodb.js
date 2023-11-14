import mongoose from "mongoose";

export const mongoose_connection = async () =>{
    try {
        const connection = await mongoose.connect(`mongodb+srv://dwipu91:aaaaaaaa@mern-app-cluster.dml33va.mongodb.net/instagram?retryWrites=true&w=majority`);
        console.log("RANNING MONGODB".bgYellow);
    } catch (error) {
        console.log(`MONGOBD is not ranning ${error.message}`.bgRed);
    }
}