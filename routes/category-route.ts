import * as express from 'express';
const router = express.Router();
import categoryController from '../controller/category-controller'


router.get('/', categoryController);


module.exports = router;