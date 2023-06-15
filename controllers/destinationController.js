const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const DestinationModel = mongoose.model(process.env.DESTINATION_MODEL);

let status = 200;
let response = {
    message: null,
    data: null
}

const getAll = function(req,res) {
    let query = {};
    console.log(req.query);
    let offset = 0;
    let count = 5;
   
    if(req.query.offset) {
        offset = parseInt(req.query.offset)
    }
    if(req.query.count) {
        count = parseInt(req.query.count);
    }
    if (req.query.search) {
        query = {"name": { $regex: new RegExp(req.query.search, "i") } };
    }
    const _tokenValidation = function(token) {
        
    }
    const _foundDestination = function(destinations) {
        return new Promise((resolve, reject) => {
            if(destinations) {
                resolve({
                    status: 200,
                    message: `Total ${destinations.length} found`,
                    data: destinations 
                });
            } else {
                reject({
                    status: 404,
                    message: "Destination not found",
                    data: null 
                });
            }
        });
    }
    
    const _setResponse = function(isValidDestination) {
        status = isValidDestination.status;
        response.message = isValidDestination.message;
        response.data = isValidDestination.data
    }
    
    const _setError = function(error) {
        status = 500;
        response.message = error;
        response.data = null
    }
    
    DestinationModel.find(query)
    .skip(offset)
    .limit(count)
    .exec()
    .then((isFounDestination) => _foundDestination(isFounDestination))
    .then((destination) => _setResponse(destination))
    .catch((error) =>_setError(error))
    .finally(() => {
        res.status(status).json(response);
    });
}

const countryWiseGetAll = function(req,res) {
    console.log("Country wisedesitana")
    let query = {};
    console.log(req.query);
    let offset = 0;
    let count = 5;
   
    if(req.query.offset) {
        offset = parseInt(req.query.offset)
    }
    if(req.query.count) {
        count = parseInt(req.query.count);
    }
    if (req.query.search) {
        query = { "country.name": { $regex: new RegExp(req.query.search, "i") } };
    }
    
    offset = parseInt(req.query.offset);
    count = parseInt(req.query.count);
    
    const _foundDestination = function(destinations) {
        return new Promise((resolve, reject) => {
            if(destinations) {
                resolve({
                    status: 200,
                    message: `Total ${destinations.length} found`,
                    data: destinations 
                });
            } else {
                reject({
                    status: 404,
                    message: "Destination not found",
                    data: null 
                });
            }
        });
    }
    
    const _setResponse = function(isValidDestination) {
        console.log("destination from response :",isValidDestination)
        status = isValidDestination.status;
        response.message = isValidDestination.message;
        response.data = isValidDestination.data
    }
    
    const _setError = function(error) {
        status = 500;
        response.message = error;
        response.data = null
    }
    
    DestinationModel.find(query)
    .skip(offset)
    .limit(count)
    .exec()
    .then((isFounDestination) => _foundDestination(isFounDestination))
    .then((destination) => _setResponse(destination))
    .catch((error) =>_setError(error))
    .finally(() => {
        res.status(status).json(response);
    });
}
const save=function (req,res) {
    
    const _setResponse = function(destinations) {
        status = 200;
        response.message = `Destination save successfully!`;
        response.data = destinations
    }
    
    const _setError = function(error) {
        status = 500;
        response.message = error;
        response.data = null
    }

    DestinationModel.create(req.body)
    .then((destination) => _setResponse(destination))
    .catch((error) => _setError(error))
    .finally(() => {
        res.status(status).json(response);
    })
    
    
}

const getOne=function(req ,res){
    const _foundDestination = function(destination) {
        return new Promise((resolve, reject) => {
            if(destination) {
                resolve({
                    status: 200,
                     message: "Destination found",
                    data: destination 
                });
            } else {
                reject({
                    status: 404,
                    message: "Destination not found",
                    data: null 
                });
            }
        });
    }
    const _setResponse = function(isValidDestination) {
        status = isValidDestination.status;
        response.message = isValidDestination.message;
        response.data = isValidDestination.data
    }
    
    const _setError = function(error) {
        status = 500;
        response.message = error;
        response.data = null
    }
    const destinationId=req.params.destinationId;
    console.log(destinationId);
    DestinationModel.findById(destinationId)
    .exec()
    .then((destination) => _foundDestination(destination))
    .then((isValidDestination) => _setResponse(isValidDestination))
    .catch((error) => _setError(error))
    .finally(() => {
        res.status(status).json(response)
    })
    
}

const fullUpdateDestination = function(req, res) {
    const _foundDestination = function(destination) {
        return new Promise((resolve, reject) => {
            if(destination) {
                resolve({
                    status: 200,
                    messag: "full Update successfully",
                    data: destination 
                });
            } else {
                reject({
                    status: 404,
                    message: "Destination not found",
                    data: null 
                });
            }
        });
    }
    const _setResponse = function(isValidDestination) {
        status = isValidDestination.status;
        response.message = isValidDestination.message;
        response.data = isValidDestination.data
    }
    
    const _setError = function(error) {
        status = 500;
        response.message = error;
        response.data = null
    }
    const destinationId = req.params.destinationId;
    DestinationModel.findOneAndReplace({ _id: destinationId }, req.body, { new: true } )
    .then((destination) => _foundDestination(destination))
    .then((isValidDestination) => _setResponse(isValidDestination))
    .catch((error) => _setError(error))
    .finally(() => {
        res.status(status).json(response);
    })
};

const partialUpdateDestination = function(req ,res) {
    const destinationId = req.params.destinationId;

    const _foundDestination = function(destination) {
        return new Promise((resolve, reject) => {
            if(destination) {
                resolve({
                    status: 200,
                    
                message: "full Update successfully",
                    data: destination 
                });
            } else {
                reject({
                    status: 404,
                        message: "Destination not found",
                    data: null 
                });
            }
        });
    }
    const _setResponse = function(isValidDestination) {
        status = isValidDestination.status;
        response.message = isValidDestination.message;
        response.data = isValidDestination.data
    }
    
    const _setError = function(error) {
        status = 500;
        response.message = error;
        response.data = null
    }
    DestinationModel.findByIdAndUpdate(destinationId,req.body,{new:true})
    .exec() 
    .then((destination) => _foundDestination(destination))
    .then((isValidDestination) => _setResponse(isValidDestination))
    .catch((error) => _setError(error))
    .finally(() => {
        res.status(status).json(response);
    })
    
}
const deleteDestination = function(req, res) {
    const destinationId = req.params.destinationId;
    const _foundDestination = function(destination) {
        return new Promise((resolve, reject) => {
            if(destination) {
                resolve({
                    status: 200,
                    message: "delete successfully",
                    data: destination 
                });
            } else {
                reject({
                    status: 404,
                    message: "Destination not found",
                    data: null 
                });
            }
        });
    }
    const _setResponse = function(isValidDestination) {
        status = isValidDestination.status;
        response.message = isValidDestination.message;
        response.data = isValidDestination.data
    }
    
    const _setError = function(error) {
        status = 500;
        response.message = error;
        response.data = null
    }
    DestinationModel.findByIdAndDelete(destinationId)
    .exec()
    .then((foundDestination) => _foundDestination(foundDestination))
    .then((user) => _setResponse(user))
    .catch((error) => _setError(error))
    .finally(() => {
        res.status(status).json(response)
    })
}
module.exports={
    getAll,
    save,
    getOne,
    deleteDestination,
    fullUpdateDestination,
    partialUpdateDestination,
    countryWiseGetAll
}

