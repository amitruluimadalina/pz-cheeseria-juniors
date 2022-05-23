import * as express from 'express';
import { createPurchase } from './services/PurchaseService';
const cheeses = require('./data/cheeses.json');
const purchases = require('./data/purchases.json');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();
const cheesesRoute = '/api/cheeses';
const purchasesRoute = '/api/purchases';

router.get(cheesesRoute, (req, res, next) => {
    res.json(cheeses);
});

router.post(purchasesRoute, jsonParser, (req, res) => {
    createPurchase(req.body);
    res.json(purchases)
});

router.get(purchasesRoute, (req, res, next) => {
    res.json(purchases);
});

export default router;