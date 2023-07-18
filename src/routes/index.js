import express from 'express';
const router = express.Router();

import v1 from './v1';
router.use('/v1', v1);

import admin from './admin';
import {adminCheck} from '../middlewares/admin.middleware'
router.use('/admin', adminCheck, admin);

module.exports = router;