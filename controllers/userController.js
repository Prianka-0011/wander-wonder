const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
require("dotenv").config();
const promisify = require("util").promisify
const jwt = require("jsonwebtoken");
const User = mongoose.model(process.env.USER_MODEL);

let status = process.env.RESPONSE_STATUS_OK;
let response = {
    data: null,
    message: null
}

const login = function(req, res) {
  console.log("login call");
    const _comparePassword = function(user, reqUser) {
        return new Promise((resolve, reject)=> {
            if(bcrypt.compare(user.password, reqUser.password)) {
                resolve(user);
                reject({
                    status: process.env.RESPONSE_STATUS_NOT_FOUND,
                    message: "Invalid crediential!",
                    data: null
                });
            }
        })
    }
    
    const _isValidUser = function(user) {
        return new Promise((resolve, reject) => {
            if(user) {
                resolve(user);
                reject({
                    status: process.env.RESPONSE_STATUS_NOT_FOUND,
                    message: "Invalid User!",
                    data: false
                });
            }
        });
    }

    const _generateToken = function(user) {
        const signAsync = promisify(jwt.sign);
        return new Promise((resolve, reject) => {
            const tokenPayload = { userId: user._id };
            const signOptions = {expiresIn: "1h",};
            signAsync(tokenPayload, "CS572", signOptions)
              .then((token) => {
                resolve({
                  status: process.env.RESPONSE_STATUS_OK,
                  message: "Login successfully!",
                  data: { 
                    userId: user._id,
                    token: token,
                  },
                });
              })
              .catch((error) => {
                reject({
                  status: process.env.RESPONSE_STATUS_NOT_FOUND,
                  message: "Invalid Token!",
                  data: null,
                });
              });
          });
        }

    const _setResponse = function(responseData) {
        status = responseData.status;
        response.message = responseData.message;
        response.data = responseData.data
    }
    
    const _setError = function(error) {
        status = process.env.RESPONSE_STATUS_INTERNAL_SERVER;
        response.message = error;
        response.data = null
    }
    
    const reqUser = req.body;
    
    User.findOne({username: reqUser.username})
    .exec()
    .then((user) => _isValidUser(user))
    .then((user) => _comparePassword(user, reqUser))
    .then((user) => _generateToken(user))
    .then((token) => _setResponse(token))
    .catch((error) => _setError(error))
    .finally(() => {
        res.status(status).json(response);
    })
}

const register = function(req, res) {
    console.log(req.body.password)
    const _generateSalt = function() {
        return new Promise((resolve, reject) => {
          const saltRounds = parseInt(process.env.SALT_ROUND);
          bcrypt.genSalt(saltRounds, (error, salt) => {
            if (error) {
              reject({
                status: process.env.RESPONSE_STATUS_NOT_FOUND,
                message: "Invalid Salt!",
                data: null,
              });
            } else {
              resolve(salt);
              //console.log("salt", salt);
            }
          });
        });
      };
    


      const _geneateHash = function(password, salt) {
        console.log("error", password ,"slat", salt);
        return new Promise((resolve, reject) => {
          bcrypt.hash(password, salt, (error, hashPassword) => {
            if (error) {
              reject({
                status: process.env.RESPONSE_STATUS_NOT_FOUND,
                message: "Invalid Token!",
                data: null,
              });
            } else {
              resolve(hashPassword);
              console.log("salt", hashPassword);
            }
          });
        });
      };
      
    const _createUser = function(hashPassword, user) {
        console .log("gsalt" , hashPassword , user)
        user.password = hashPassword;
        return new Promise((resolve, reject) => {
            User.create(user).then((user) => {
                resolve({
                 status: process.env.RESPONSE_STATUS_OK,
                  message: "User Create Successfully!",
                  data: user
                })
            })
            .catch((error) => {
                reject({
                  status: process.env.RESPONSE_STATUS_NOT_FOUND,
                  message: "Invalid User!",
                  data: null,
                });
              });
        })
    }
    const _setResponse = function(responseData) {
        status = responseData.status;
        response.message = responseData.message;
        response.data = responseData.data
    }
    
    const _setError = function(error) {
        status = process.env.RESPONSE_STATUS_INTERNAL_SERVER;
        response.message = error;
        response.data = null
    }

   _generateSalt()
   .then((salt) => _geneateHash(req.body.password, salt))
   .then((hashPassword) => _createUser(hashPassword, req.body))
   .then((userResponse) => _setResponse (userResponse))
   .catch((error) => _setError(error))
    .finally(() => {
        res.status(status).json(response);
    })
   
}

const addToFavorite = function(req, res) {
  const userId = req.body.userId;
  const destinationId = req.body.destinationId;
  const response = {
    status: 200,
    message: "",
    data: null
  }
  User.findByIdAndUpdate(
    userId,
    { $push: { favoriteDestinations: destinationId } },
    { new: true }
  )
  .then(updatedUser => {
    response.status = process.env.RESPONSE_STATUS_OK;
    response.message = "Destination added to favorites!";
    response.data = updatedUser.favoriteDestinations;
  })
  .catch(error => {
    response.status = process.env.RESPONSE_STATUS_INTERNAL_SERVER;
    response.message = error;
    response.data = null;
  })
  .finally(() => {
    res.status(response.status).json(response);
  });
}

const getFavorites = function(req, res) {
  const userId = req.params.userId;
  const response = {
    status: 200,
    message: "",
    data: null
  }
  User.findById(userId)
    .populate("favoriteDestinations")
    .exec()
    .then(user => {
      response.status = process.env.RESPONSE_STATUS_OK;
      response.message = "Favorites found!";
      response.data = user;
    })
    .catch(error => {
      response.status = process.env.RESPONSE_STATUS_INTERNAL_SERVER;
      response.message = error;
      response.data = null;
    })
    .finally(() => {
      res.status(response.status).json(response);
    });
}

module.exports =  {
    login,
    register,
    addToFavorite,
    getFavorites
}