const express = require('express');
const routes = express.Router();
const workListController = require('../controllers/works');
const middleware = require('../middleware/middleware');
const cache = require('../middleware/redisCache');

routes.get('/', cache.redisCache, workListController.listQueryPage);
routes.get('/search', cache.redisCache, workListController.listFilterSearch);
routes.get('/sort', cache.redisCache, workListController.listFilterSort);
routes.post('/', middleware.validate, workListController.create);
routes.put('/',middleware.validate, workListController.update);
routes.delete('/', workListController.delete);

module.exports = routes;