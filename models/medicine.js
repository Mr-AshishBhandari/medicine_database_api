import mongoose from "mongoose";


const MedicineSchema = mongoose.Schema({
    generic_name:{
        type: String, 
        required: true
    },
    usage:{
        type:String, 
        required:true
    },
    side_effect:{
        type:String,
        required:true
    }
})

const Medicine = mongoose.model('Medicine',MedicineSchema)

export default Medicine;