
const mongoose= require("mongoose");
require("dotenv").config();



const DestinationModel=mongoose.model(process.env.MODEL_NAME);


let status = 200;
let response = {
    message: null,
     data: null
}

const _returnDestinations = function(res, destinations) {
    return new Promise((resolve, reject) => {
        resolv 
    });
}

//getAll
const getAll=function(req,res) {

    const offset = req.query.offset;
    const pageSize = req.query.pageSize;

    DestinationModel.find().exec().then((desitatios) =>{

        //response.data = desitatios;
        status = 200;
        response = desitatios.skip(offset).limit(pageSize);

    }).catch(function(error){
        status=500;
        response.message="An error occurred while featching all the destination";
    }).finally(res.status(status).json(response));
    
}
const save=function (req,res) {
    console.log("save method call"+req.body)
    
    DestinationModel.create(req.body)
    .then(function (result) {
        response.message = "Destination saved successfully!";
        response.data = result;
        res.status(status).json(response);
    }).catch(function(error){
        status=500;
        response.message="An error occurred while saving the destination";
        data=null
        res.status(status).json(response);
    })
    
    
}
const getOne=function(req ,res){
    
    const destinationId=req.params.destinationId;
    console.log(destinationId);
    DestinationModel.findById(destinationId).exec().then(function(destination) {
        if(!destination) {
            status=404;
            response= destination;
            res.status(status).json(response)
        } else {
            status= 200;
            response.data= destination;          
        }
        res.status(status).json(response);
    }).catch(function(error){
        status = 500;
        response.message="An error occurred while featching the destination";
        res.status(status).json(response);
    })
    
}

const fullUpdateDestination = function(req, res) {
    const destinationId = req.params.destinationId;
    console.log("Update call: " + destinationId, req.body);
  
    DestinationModel.findOneAndReplace({ _id: destinationId }, req.body, { new: true } )
      .then(function(updatedDestination) {
        if (updatedDestination) {
            status = 200;
          const response = {
            message: "Destination update successful!",
            data: updatedDestination
          };
          res.status(status).json(response);
        } else {
            status = 404;
          const response = {
            message: "Destination not found.",
            data: null
          };
          res.status(status).json(response);
        }
      })
      .catch(function(error) {
        status = 500;
        const response = {
          message: "An error occurred while updating data!",
          data: error
        };
        res.status(status).json(response);
      });
  };
  
const partialUpdateDestination = function(req ,res) {
    const destinationId = req.params.destinationId;
    DestinationModel.findByIdAndUpdate(destinationId,req.body,{new:true}).exec().then( function(updateDesitanation){
        if (updatedDestination) {
            response.message = " Destination Partially update successful!";
            response.data = updatedDestination;
            status = 200;
        } else if(!updatedDestination){
            status = 404;
            response.message = "Destination not found.";
            response.data =null;
            
        }
        res.status(status).json(response);
    }).catch(function(error) {
        status= 500;
        response.message= "An error occured while updating data !"
        res.status(status).json(response);
    })
    
}
const deleteDestination = function(req, res) {
    const destinationId = req.params.destinationId;
    DestinationModel.findByIdAndDelete(destinationId).exec().then(function(deleteDestination) {
        status = 200;
        response.message = "Delete successfully !"
        response.data = result; 
        res.status(status).json(response);
    }).catch(function(error){
        status=500;
        response.message="An error occurred while deleting the destination";
        res.status(status).json(response);
    })
}
module.exports={
    getAll,
    save,
    getOne,
    deleteDestination,
    fullUpdateDestination,
    partialUpdateDestination
}

