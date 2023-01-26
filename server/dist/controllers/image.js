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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("../models/image"));
const album_1 = __importDefault(require("../models/album"));
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
const ImageControllers = {
    uploadPhoto: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.body ||
                !req.body.album ||
                !req.body.album._id ||
                !req.body.image ||
                !req.body.image.data) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
            }
            else {
                const result = yield cloudinaryV2.uploader.upload(req.body.image.data);
                const newImage = yield image_1.default.create({
                    album: req.body.album._id,
                    imgAddress: result.secure_url,
                    cloudinaryId: result.public_id,
                    owner: req.session.uid,
                });
                yield album_1.default.findOneAndUpdate({ _id: req.body.album._id }, {
                    $push: { photos: newImage._id },
                });
                res.status(201).send(JSON.stringify(newImage));
            }
        }
        catch (error) {
            console.log(error);
            res.status(500);
        }
    }),
    toggleLike: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.body || !req.body.image || !req.body.image._id) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
            }
            else {
                console.log(req.body.image._id);
                let currentPhoto = yield image_1.default.findOne({ _id: req.body.image._id });
                if (!currentPhoto) {
                    res.status(400).send(JSON.stringify({
                        error: '400',
                        message: 'Image could not be found.',
                    }));
                }
                else {
                    if (!currentPhoto.liked.includes(new mongoose_1.default.Types.ObjectId(req.session.uid))) {
                        yield image_1.default.findOneAndUpdate({ _id: req.body.image._id }, {
                            $push: { liked: req.session.uid },
                        });
                    }
                    else {
                        yield image_1.default.findOneAndUpdate({ _id: req.body.image._id }, {
                            $pull: { liked: req.session.uid },
                        });
                    }
                    res.sendStatus(204);
                }
            }
        }
        catch (error) {
            console.log(error);
            res.status(500);
        }
    }),
    deletePhoto: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.params || !req.params.id) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
            }
            else {
                const image = yield image_1.default.findOneAndDelete({ _id: req.params.id });
                if (image && image.cloudinaryId)
                    yield cloudinaryV2.uploader.destroy(image.cloudinaryId);
                res.sendStatus(204);
            }
        }
        catch (error) {
            console.log(error);
            res.status(500);
        }
    }),
};
exports.default = ImageControllers;
