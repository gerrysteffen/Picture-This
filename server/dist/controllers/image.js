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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var image_1 = __importDefault(require("../models/image"));
var album_1 = __importDefault(require("../models/album"));
var mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
var cloudinary_1 = __importDefault(require("../cloudinary"));
var ImageControllers = {
    uploadPhoto: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var result, newImage, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (!(!req.body ||
                        !req.body.album ||
                        !req.body.album._id ||
                        !req.body.image ||
                        !req.body.image.data) // TODO need more information about what is behind this info
                    ) return [3 /*break*/, 1]; // TODO need more information about what is behind this info
                    res
                        .status(400)
                        .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, cloudinary_1.default.uploader.upload(req.body.image.data)];
                case 2:
                    result = _a.sent();
                    return [4 /*yield*/, image_1.default.create({
                            album: req.body.album._id,
                            imgAddress: result.secure_url,
                            cloudinaryId: result.public_id,
                            owner: req.session.uid,
                        })];
                case 3:
                    newImage = _a.sent();
                    return [4 /*yield*/, album_1.default.findOneAndUpdate({ _id: req.body.album._id }, {
                            $push: { photos: newImage._id },
                        })];
                case 4:
                    _a.sent();
                    res.status(201).send(JSON.stringify(newImage));
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.log(error_1);
                    res.status(500);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); },
    toggleLike: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var currentPhoto, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    if (!(!req.body || !req.body.image || !req.body.image._id)) return [3 /*break*/, 1];
                    res
                        .status(400)
                        .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
                    return [3 /*break*/, 8];
                case 1:
                    console.log(req.body.image._id);
                    return [4 /*yield*/, image_1.default.findOne({ _id: req.body.image._id })];
                case 2:
                    currentPhoto = _a.sent();
                    if (!!currentPhoto) return [3 /*break*/, 3];
                    res.status(400).send(JSON.stringify({
                        error: '400',
                        message: 'Image could not be found.',
                    }));
                    return [3 /*break*/, 8];
                case 3:
                    if (!!currentPhoto.liked.includes(new mongoose_1.default.Types.ObjectId(req.session.uid))) return [3 /*break*/, 5];
                    return [4 /*yield*/, image_1.default.findOneAndUpdate({ _id: req.body.image._id }, {
                            $push: { liked: req.session.uid },
                        })];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, image_1.default.findOneAndUpdate({ _id: req.body.image._id }, {
                        $pull: { liked: req.session.uid },
                    })];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    res.sendStatus(204);
                    _a.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_2 = _a.sent();
                    console.log(error_2);
                    res.status(500);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); },
    deletePhoto: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var image, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (!(!req.params || !req.params.id)) return [3 /*break*/, 1];
                    res
                        .status(400)
                        .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, image_1.default.findOneAndDelete({ _id: req.params.id })];
                case 2:
                    image = _a.sent();
                    if (!(image && image.cloudinaryId)) return [3 /*break*/, 4];
                    return [4 /*yield*/, cloudinary_1.default.uploader.destroy(image.cloudinaryId)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    console.log('success');
                    res.sendStatus(204); // TODO delete on cloudinary
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_3 = _a.sent();
                    console.log(error_3);
                    res.status(500);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); },
};
exports.default = ImageControllers;
