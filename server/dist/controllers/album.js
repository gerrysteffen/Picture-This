"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const album_1 = __importDefault(require("../models/album"));
const user_1 = __importDefault(require("../models/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinaryV2 = cloudinary_1.default.v2;
cloudinaryV2.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret,
    secure: true,
});
exports.default = {
    getAlbum: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.params || !req.params.id) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
            }
            else {
                const album = yield album_1.default.findOne({ _id: req.params.id }).populate({
                    path: 'photos',
                    model: 'image',
                });
                if (!album) {
                    res.status(400).send(JSON.stringify({
                        error: '400',
                        message: 'No album with this id.',
                    }));
                }
                else {
                    if (!album.sharedWith.includes(new mongoose_1.default.Types.ObjectId(req.session.uid))) {
                        res.status(401).send(JSON.stringify({
                            error: '401',
                            message: 'Not authorised for this action.',
                        }));
                    }
                    else {
                        album.photos.sort((a, b) => b.liked.length - a.liked.length);
                        res.status(200).send(JSON.stringify(album));
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }),
    createAlbum: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.body || !req.body.album || !req.body.album.albumName) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
            }
            else {
                const newAlbum = yield album_1.default.create({
                    albumName: req.body.album.albumName,
                    description: req.body.album.description,
                    owner: req.session.uid,
                    sharedWith: [req.session.uid],
                });
                yield user_1.default.updateOne({ _id: req.session.uid }, {
                    $push: { uploadedAlbums: newAlbum._id },
                });
                res.status(201).send(JSON.stringify(newAlbum));
            }
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }),
    modifyAlbum: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.body ||
                !req.body.album ||
                (!req.body.album.albumName && !req.body.album.description)) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
            }
            else {
                const _a = req.body.album, { _id } = _a, albumInfo = __rest(_a, ["_id"]);
                const album = yield album_1.default.findOne({ _id: _id });
                if (!album) {
                    res.status(400).send(JSON.stringify({
                        error: '400',
                        message: 'No album with this id.',
                    }));
                }
                else if (new mongoose_1.default.Types.ObjectId(req.session.uid) !== album.owner) {
                    res.status(401).send(JSON.stringify({
                        error: '401',
                        message: 'Not authorised for this action.',
                    }));
                }
                else {
                    const newAlbum = yield album_1.default.findOneAndUpdate({ _id: _id }, Object.assign({}, albumInfo), {
                        new: true,
                    });
                    res.status(201).send(JSON.stringify(newAlbum));
                }
            }
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }),
    shareAlbum: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.body ||
                !req.body.album ||
                !req.body.album._id ||
                !req.body.user ||
                !req.body.user.email) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
            }
            else {
                const album = yield album_1.default.findOne({ _id: req.body.album._id });
                const user = yield user_1.default.findOne({ email: req.body.user.email });
                if (!user || !album) {
                    res
                        .status(400)
                        .send(JSON.stringify({ error: '400', message: 'Wrong Data.' }));
                }
                else {
                    if (String(album.owner) !== req.session.uid) {
                        res.status(401).send(JSON.stringify({
                            error: '401',
                            message: 'Not authorised for this action.',
                        }));
                    }
                    else {
                        if (!user.pendingInvite.includes(new mongoose_1.default.Types.ObjectId(album._id)) &&
                            !user.sharedAlbums.includes(new mongoose_1.default.Types.ObjectId(album._id))) {
                            yield user_1.default.findOneAndUpdate({ email: req.body.user.email }, {
                                $push: { pendingInvite: album._id }, // TODO Plural that shit
                            });
                        }
                        res.status(201).send(JSON.stringify(user._id));
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }),
    rejectAlbum: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.body || !req.body.album || !req.body.album._id) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
            }
            else {
                const album = yield album_1.default.findOne({ _id: req.body.album._id });
                if (!album) {
                    res
                        .status(400)
                        .send(JSON.stringify({ error: '400', message: 'Wrong Data.' }));
                }
                else {
                    yield user_1.default.updateOne({ _id: req.session.uid }, {
                        $pull: { pendingInvite: req.body.album._id }, // TODO Plural that shit
                    });
                    res.sendStatus(204);
                }
            }
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }),
    acceptAlbum: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.body || !req.body.album || !req.body.album._id) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
            }
            else {
                yield user_1.default.updateOne({ _id: req.session.uid }, {
                    $push: { sharedAlbums: req.body.album._id },
                    $pull: { pendingInvite: req.body.album._id }, // TODO Plural that shit
                });
                const newAlbum = yield album_1.default.findOneAndUpdate({
                    _id: req.body.album._id,
                }, {
                    $push: { sharedWith: req.session.uid },
                }).populate('photos');
                res.status(201).send(JSON.stringify(newAlbum));
            }
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }),
    removeAlbum: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.params || !req.params.id) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
            }
            else {
                const album = yield album_1.default.findOne({ _id: req.params.id }).populate('photos');
                if (!album) {
                    res
                        .status(400)
                        .send(JSON.stringify({ error: '400', message: 'Wrong Data.' }));
                }
                else {
                    if (String(album.owner) !== req.session.uid) {
                        yield user_1.default.updateOne({ _id: req.session.uid }, {
                            $pull: { sharedAlbums: req.params.id },
                        });
                        yield album_1.default.updateOne({
                            _id: req.params.id,
                        }, {
                            $pull: { sharedWith: req.session.uid },
                        });
                        res.sendStatus(204);
                    }
                    else {
                        album.photos.forEach((photo) => {
                            cloudinaryV2.uploader.destroy(photo.cloudinaryId);
                        });
                        yield album_1.default.findOneAndDelete({
                            _id: req.params.id,
                        });
                        res.sendStatus(204);
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }),
};
