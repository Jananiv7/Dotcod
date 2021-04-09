var bcrypt = require('bcrypt');
var hat = require('hat');
const Template = require('../constant/template');
const userError = require('../constant/errors');
const randToken = require('rand-token');
var fs = require('fs');
refreshTokens = {};
const createNewEmployee = async function (req, res) { //to create an account by adding details like firstname,lastname,email and mobilenumber
let err,newUser;

    let userDetails = {
        id: 1,
        firstName:'dotcod',
        lastName: 'test',
    
        email: 'dotcodtest@gmail.com',
        password: 'admin1234',
        mobileNumber: 7686877979,
        resetToken:hat(),
        changeExpiry:null,
        created: '2021-03-19 16:16:19',
        modified: '2021-03-19 16:16:19',
        image: null,
        nationality: 'Indian',
        religion:'Hindu',
        dob: null,
        gender: 'male',
        address: '123 street',
        city: 'newyork',
        state:'NY',
        country: 'US',
        zipCode: 45657,
       
    }
    if(userDetails){
        [err, newUser] = await to(User.create(userDetails));
        if(newUser){
             return ReS(res, { user:newUser });
         }
         else {
             console.log(err);
             return ReE(res, err, 422);
         }
    }
   
    //to send mail to add password,this email consists of a link with the location for changing password and the generated token

};
module.exports.createNewEmployee = createNewEmployee;

const login = async function (req, res) {//to check a particular employee is in the table and password is valid and generate token function is called here
console.log('login is called,req.body', req.body);
    let body = req.body;
    let err, user;
    console.log('body:', body);
    [err, user] = await to(User.findOne({
        where: {
            email: body.email
        }
    }));
    if (err) return ReE(res, err, 422);
    if (user) {
        if (user.validatePassword(body.password)) {
            [err, token] = await to(user.getJWT());// we will get the encrypted access token which is used for first 30 mins
            var refreshToken = randToken.uid(256);
            refreshTokens[refreshToken] = {
                expiryTime: Date.now() + CONFIG.refresh_token_expiration,
                user: user
            };
            if (err) return ReE(res, err, 422);
            return ReS(res, { message: userMessages.Success, user:user,accessToken:token, refreshToken:refreshToken });
        } else {
            return ReE(res, 'Email or Password is invalid', 422);
        }
    }
    else {
        return ReE(res, { response: userMessages.Incorrect }, 422);
    }

};
module.exports.login = login;

const getDocList = async function(req,res){
    console.log('getDoc list function is called');
let err,result;
[err,result] = await to(Documents.findAll());
if(result){
    return ReS(res, { doclist: result });
} else{
    return ReE(res, pe({message:'ERROR IN DOCLIST'}),422);
}
}
module.exports.getDocList = getDocList;

const refreshToken = async function (req, res) {
    const refreshToken = req.body.refreshToken;
    if (refreshToken in refreshTokens && refreshTokens[refreshToken].expiryTime > Date.now()) {
        [err, token] = await to(refreshTokens[refreshToken].User.getJWT());
        return ReS(res, { accessToken: token });
    } else {
        delete refreshTokens[refreshToken];
        return ReE(res, pe({ message: userMessages.invalid_token }), 422)
    }
}

module.exports.refreshToken = refreshToken;





















