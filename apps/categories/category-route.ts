import * as express from 'express';
const router = express.Router();
import categoryController from './layered-architecture/category-controller'


router.get('/', categoryController);


export default router;