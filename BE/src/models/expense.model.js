const mongoose = require('mongoose');

//const regex = new RegExp('RegExp expression');

const expenseSchema = new mongoose.Schema(
   {
      description: {
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
      amount: {
         type: Number,
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

module.exports = mongoose.model('Expense', expenseSchema);
