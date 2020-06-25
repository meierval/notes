import express from 'express';
import { indexController } from '../controller/indexController';

const router = express.Router();

router.post('/login', indexController.login.bind(indexController));

export const indexRoutes = router;
