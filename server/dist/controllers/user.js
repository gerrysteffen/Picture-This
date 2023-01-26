"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 15;
const UserControllers = {
    registerUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.body ||
                !req.body.user ||
                !req.body.user.email ||
                !req.body.user.password ||
                !req.body.user.firstName ||
                !req.body.user.lastName) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
            }
            else {
                const previousUser = yield user_1.default.findOne({ email: req.body.user.email });
                if (previousUser) {
                    return res
                        .status(409)
                        .send({ error: '409', message: 'User already exists' });
                }
                else {
                    const hashedPassword = yield bcrypt_1.default.hash(req.body.user.password, saltRounds);
                    const newUser = yield user_1.default.create({
                        email: req.body.user.email,
                        password: hashedPassword,
                        firstName: req.body.user.firstName,
                        lastName: req.body.user.lastName,
                    });
                    req.session.uid = String(newUser._id); // TODO This could be a problem, lets see
                    res.status(201).send(JSON.stringify(newUser));
                }
            }
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }),
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.findOne({ _id: req.session.uid })
                .select('-password')
                .populate([
                {
                    path: 'uploadedAlbums',
                    populate: [
                        { path: 'photos', model: 'image' },
                        { path: 'owner', model: 'user' },
                    ],
                },
                {
                    path: 'sharedAlbums',
                    populate: [
                        { path: 'photos', model: 'image' },
                        { path: 'owner', model: 'user' },
                    ],
                },
                {
                    path: 'pendingInvite',
                    populate: { path: 'owner', model: 'user' },
                },
            ]);
            user.uploadedAlbums = user.uploadedAlbums.map((album) => (album.photos = album.photos.sort((a, b) => b.liked.length - a.liked.length)));
            user.sharedAlbums = user.sharedAlbums.map((album) => (album.photos = album.photos.sort((a, b) => b.liked.length - a.liked.length)));
            res.status(200).send(JSON.stringify(user));
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.body ||
                !req.body.user ||
                !req.body.user.email ||
                !req.body.user.password) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
            }
            else {
                const user = yield user_1.default.findOne({
                    email: req.body.user.email,
                }).populate([
                    {
                        path: 'uploadedAlbums',
                        populate: [{ path: 'photos' }, { path: 'owner' }],
                    },
                    {
                        path: 'sharedAlbums',
                        populate: [{ path: 'photos' }, { path: 'owner' }],
                    },
                    {
                        path: 'pendingInvite',
                        populate: { path: 'owner' },
                    },
                ]);
                if (!user) {
                    res
                        .status(401)
                        .send({ error: '401', message: 'Email and/or password incorrect' });
                }
                else {
                    const valid = yield bcrypt_1.default.compare(req.body.user.password, user.password);
                    if (valid) {
                        req.session.uid = String(user._id);
                        user.password = 'N/A';
                        user.uploadedAlbums = user.uploadedAlbums.map((album) => (album.photos = album.photos.sort((a, b) => b.liked.length - a.liked.length)));
                        user.sharedAlbums = user.sharedAlbums.map((album) => (album.photos = album.photos.sort((a, b) => b.liked.length - a.liked.length)));
                        res.status(200).send(JSON.stringify(user));
                    }
                    else {
                        res.status(401).send({
                            error: '401',
                            message: 'Email and/or password incorrect',
                        });
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            req.session.uid = '';
            res.sendStatus(204);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }),
};
exports.default = UserControllers;
