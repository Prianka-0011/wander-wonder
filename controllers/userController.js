const mongoose = require("mongoose");
require("dotenv").config();
const promisify = require("util").promisify
const jwt = require("jsonwebtoken");
const User = mongoose.model(process.env.USER_MODEL);

let status = 200;
let response = {
    data: null,
    message: null
}

const login = function(req, res) {
    const _comparePassword = function(user, reqUser) {
        return new Promise((resolve, reject)=> {
            if(user.password === reqUser.password) {
                resolve({
                    status: 200,
                    message: "Login successfully!",
                    data: reqUser
                });
                reject({
                    status: 404,
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
                    status: 404,
                    message: "Invalid User!",
                    data: false
                });
            }
        });
    }
    const signAsync = promisify(jwt.sign);
    const _generateToken = function(user) {
        return new Promise((resolve, reject) => {
            const tokenPayload = { userId: user._id };
            const signOptions = {expiresIn: "1h",};
            signAsync(tokenPayload, "CS572", signOptions)
              .then((token) => {
                resolve({
                  status: 200,
                  message: "Login successfully!",
                  data: token,
                });
              })
              .catch((error) => {
                reject({
                  status: 404,
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
        status = 500;
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
    console.log("calling register", req.body)
    const _setResponse = function(responseData) {
        status = 200;
        response.message = "User Register Successfully!";
        response.data = responseData.data
    }
    
    const _setError = function(error) {
        status = 500;
        response.message = error;
        response.data = null
    }
    
    User.create(req.body)
    .then((user) => _setResponse(user))
    .catch((error) => _setError(error))
    .finally(() => {
        res.status(status).json(response);
    })
}

module.exports =  {
    login,
    register
}