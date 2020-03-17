const Expense = require('../models/expense.model');

module.exports = {
   async find(req, res) {
      try {
         const result = await Expense.find();
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async findById(req, res) {
      try {
         const id = req.params.id;
         const result = await Expense.findById(id);
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async create(req, res) {
      try {
         const data = req.body;
         const result = await Expense.create(data);
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async findByIdAndUpdate(req, res) {
      try {
         const id = req.params.id;
         const data = req.body;
         const result = await Expense.findByIdAndUpdate(id, data, {
            useFindAndModify: false,
            new: true
         });
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async delete(req, res) {
      try {
         const id = req.params.id;
         const result = await Expense.findByIdAndDelete(id);
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   }
};
