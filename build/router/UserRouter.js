"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    GetUsers(req, res) {
        User_1.default.find({})
            .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
            .catch((error) => {
            const status = res.statusCode;
            res.json({
                status,
                error
            });
        });
    }
    GetUser(req, res) {
        const username = req.params.username;
        User_1.default.findOne({ username }).populate('posts', 'title content')
            .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
            .catch((error) => {
            const status = res.statusCode;
            res.json({
                status,
                error
            });
        });
    }
    CreateUser(req, res) {
        const name = req.body.name;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const posts = req.body.posts;
        const user = new User_1.default({
            name,
            username,
            email,
            password,
            posts
        });
        user.save()
            .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
            .catch((error) => {
            const status = res.statusCode;
            res.json({
                status,
                error
            });
        });
    }
    UpdateUser(req, res) {
        const username = req.params.username;
        User_1.default.findOneAndUpdate({ username }, req.body)
            .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
            .catch((error) => {
            const status = res.statusCode;
            res.json({
                status,
                error
            });
        });
    }
    DeleteUser(req, res) {
        const username = req.params.username;
        User_1.default.findOneAndRemove({ username })
            .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
            .catch((error) => {
            const status = res.statusCode;
            res.json({
                status,
                error
            });
        });
    }
    routes() {
        this.router.get('/', this.GetUsers);
        this.router.post('/', this.CreateUser);
        this.router.get('/:username', this.GetUser);
        this.router.put('/:username', this.UpdateUser);
        this.router.delete('/:username', this.DeleteUser);
    }
}
// export
const userRoutes = new UserRouter();
userRoutes.routes();
const router = userRoutes.router;
exports.default = router;
