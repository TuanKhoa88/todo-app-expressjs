import express from 'express';
const router = express.Router();

import todoModule from './modules/todo.module'
router.use('/todos', todoModule)

module.exports = router;