const router = require('express').Router();
const expenseController = require('../controllers/expense.controller');

router.route('/').get(expenseController.find);
router.route('/:id').get(expenseController.findById);
router.route('/').post(expenseController.create);
router.route('/:id').put(expenseController.findByIdAndUpdate);
router.route('/:id').delete(expenseController.delete);

module.exports = router;
