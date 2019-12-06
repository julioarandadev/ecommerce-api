import { Router } from 'express';
import listProducts from "../../../ecommerce-core/src/controllers/producslist/listProducts.controller";

const router = Router();
console.log('Product.Routes !');
router.route('/list')
    .get(listProducts);
/*
router.route('/create')
    .post(createProduct);

router.route('/updateProduct')
   .post(updateProduct);

router.route('/deleteProduct')
   .delete(deleteProduct);
*/

export default router;