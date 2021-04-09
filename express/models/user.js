'use strict';
var bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const cryptoService = require('../services/cryptoService');
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,

            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mobileNumber: DataTypes.BIGINT,
        resetToken: DataTypes.STRING,
        changeExpiry: DataTypes.DATE,
        created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        modified: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nationality: {
            type: DataTypes.STRING,
            allowNull: true
        },
        religion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true
        },
        zipCode: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
      
        // },
        // certifications: {
        //     type: DataTypes.STRING,
        //     allowNull: true
        // }
    },
        {
            tableName: 'user'
        });

    Model.beforeSave(async (user, options) => {
console.log(user,User);
        // Asynchronously generates a salt.
        // Randomly select rounds(b/w 4-10) for generating hash

        if (user.changed('password')) {
            let err;
            let salt, hash;
            let rounds = Math.floor(Math.random() * 6 + 4);
            [err, salt] = await to(bcrypt.genSalt(rounds));
            if (err) {
                console.log('error in encryption in user account' + err.message);
                TE(err.message);
            };
            //Asynchronously generates a hash with salt
            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if (err) {
                console.log('error in hash method in encryption' + err.message);
                TE(err.message);
            }
            console.log('password for user', hash);
            user.password = hash;
        }
    });

    Model.associate = function (models) {
       
        this.id = this.hasMany(models.documents);
    };

    Model.prototype.validatePassword = function (pass) {
        console.log('Inside validatePassword: ', pass, this.password); //to check whether the user given password and hashed password are same
        return bcrypt.compareSync(pass, this.password);
    }

    Model.prototype.getJWT = async function () {
        let err, encryptedToken;
        console.log('getJWT');
        //  expires after half and hour (1800 seconds = 30 minutes)
        const token = 'Bearer ' + jwt.sign({
            id: this.id, email: this.email, roleId: this.roleId
        }, CONFIG.jwt_secret_key, { expiresIn: CONFIG.jwt_token_expiration }); // combines id+email+secretkey+roleId and generates a token

        [err, encryptedToken] = await to(cryptoService.encrypt(token));
        console.log('Before encryption access token: ', token);
        console.log('After encryption access token: ', encryptedToken);//access token

        return encryptedToken;
    }
    return Model;
};