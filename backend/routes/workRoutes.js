const express = require('express');
const routes = express.Router();
const workListController = require('../controllers/works');
const middleware = require('../middleware/middleware');
const cache = require('../middleware/redisCache');

routes.get('/', cache.redisCache, workListController.listWork);
routes.post('/', cache.redisCache, middleware.validate, workListController.create);
routes.put('/', cache.redisCache, middleware.validate, workListController.update);
routes.delete('/', cache.redisCache, workListController.delete);

module.exports = routes;