const express = require('express');
const routes = express.Router();
const workListController = require('../controllers/works');
const middleware = require('../middleware/middleware');

routes.get('/', workListController.listAll);
routes.post('/', middleware.validate, workListController.create);
routes.put('/', workListController.update);
routes.delete('/', workListController.delete);

module.exports = routes;