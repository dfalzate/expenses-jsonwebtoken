const mongoose = require('mongoose');

//const regex = new RegExp('RegExp expression');

const userSchema = new mongoose.Schema(
   {
      email: {
         type: String,
         required: true
         //unique: true,
         //index: true,
         //minlength: ,
         //maxlength: ,
         //match: regex,
         //enum: ['opt1','opt2',...],
         //min: ,
         //max: ,
         //validate: [
         //{
         //validator: value => {
         //return regex.test(value);
         //},
         //message: 'Error message'
         //},
         //{}
         //]
      },
      password: {
         type: String,
         required: true
         //unique: true,
         //index: true,
         //minlength: ,
         //maxlength: ,
         //match: regex,
         //enum: ['opt1','opt2',...],
         //min: ,
         //max: ,
         //validate: [
         //{
         //validator: value => {
         //return regex.test(value);
         //},
         //message: 'Error message'
         //},
         //{}
         //]
      }
   },
   { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
