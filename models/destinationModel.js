const mongoose= require("mongoose");

const airPortSchema=mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    city: {
        type:String,
        required:true
    }
})
const countrySchema=mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    population: {
        type:Number,
        required:true
    },
    
})

const destinationSchema=mongoose.Schema({
    name: {
        type:String,
        required:true  
    },
    description: {
        type:String,
       
    },
    expense: {
        type:Number,
    },
    photo: {
        type:String
    },
    country:countrySchema,
    airports:[airPortSchema]
})

mongoose.model("Destination",destinationSchema,"destinations")