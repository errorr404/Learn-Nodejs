const  mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    minlength:1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{value} is not a valid email`
    }
  },
  password : {
    type: String,
    require: true,
    minlength: 6
  },
  tokens : [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function(){
  console.log('toJson is called...')
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject,['_id','email']);
};

UserSchema.methods.generateAuthToken = function () {
  console.log('function is called--',this);
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(),access},'abc123').toString();
  // console.log('user object ---', user);

  user.tokens.push({access,token});
console.log('token in user.js--',token);
  return user.save().then(()=>{
    console.log('user data is saved...')
    // console.log('user model---',user)
    return token;
  })
};
var User = mongoose.model('User',UserSchema);
module.exports = {User};
