const { Router } = require('express');

const AuthMidleware = require('./app/Midlewars/AuthMidleware');
const LoginController = require('./app/Controllers/LoginController');
const UserController = require('./app/Controllers/UserController');

const routes = new Router();

routes.post("/user", UserController.store);
routes.get("/user", AuthMidleware, UserController.show);

routes.post("/login", LoginController.index);

module.exports = routes;