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
var album_1 = __importDefault(require("../models/album"));
var user_1 = __importDefault(require("../models/user"));
exports.default = {
    getAlbum: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var album, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!(!req.params || !req.params.id)) return [3 /*break*/, 1];
                    res
                        .status(400)
                        .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, album_1.default.findOne({ _id: req.params.id }).populate('photos')];
                case 2:
                    album = _a.sent();
                    if (!album) {
                        res.status(400).send(JSON.stringify({
                            error: '400',
                            message: 'No album with this id.',
                        }));
                    }
                    else {
                        res.status(200).send(JSON.stringify(album));
                    }
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    res.sendStatus(500);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    createAlbum: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var newAlbum, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!(!req.body || !req.body.album || !req.body.album.albumName)) return [3 /*break*/, 1];
                    res
                        .status(400)
                        .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
                    return [3 /*break*/, 4];
                case 1: return [4 /*yield*/, album_1.default.create({
                        albumName: req.body.album.albumName,
                        owner: req.session.uid,
                    })];
                case 2:
                    newAlbum = _a.sent();
                    return [4 /*yield*/, user_1.default.updateOne({ _id: req.session.uid }, {
                            $push: { uploadedAlbums: newAlbum._id },
                        })];
                case 3:
                    _a.sent();
                    res.status(201).send(newAlbum);
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.log(error_2);
                    res.sendStatus(500);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    shareAlbum: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var album, user, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    if (!(!req.body ||
                        !req.body.album ||
                        !req.body.album._id ||
                        !req.body.user ||
                        !req.body.user.email)) return [3 /*break*/, 1];
                    res
                        .status(400)
                        .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
                    return [3 /*break*/, 6];
                case 1: return [4 /*yield*/, album_1.default.findOne({ _id: req.body.album._id })];
                case 2:
                    album = _a.sent();
                    return [4 /*yield*/, user_1.default.findOne({ email: req.body.user.email })];
                case 3:
                    user = _a.sent();
                    if (!(!user || !album)) return [3 /*break*/, 4];
                    res
                        .status(400)
                        .send(JSON.stringify({ error: '400', message: 'Wrong Data.' }));
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, user_1.default.findOneAndUpdate({ email: req.body.user.email }, {
                        $push: { pendingInvite: album._id }, // TODO Plural that shit
                    })];
                case 5:
                    _a.sent();
                    res.status(201).send(JSON.stringify(user._id));
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_3 = _a.sent();
                    console.log(error_3);
                    res.sendStatus(500);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); },
    rejectAlbum: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var album, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (!(!req.body || !req.body.album || !req.body.album._id)) return [3 /*break*/, 1];
                    res
                        .status(400)
                        .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, album_1.default.findOne({ _id: req.body.album._id })];
                case 2:
                    album = _a.sent();
                    if (!!album) return [3 /*break*/, 3];
                    res
                        .status(400)
                        .send(JSON.stringify({ error: '400', message: 'Wrong Data.' }));
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, user_1.default.updateOne({ _id: req.session.uid }, {
                        $pull: { pendingInvite: req.body.album._id }, // TODO Plural that shit
                    })];
                case 4:
                    _a.sent();
                    res.sendStatus(204);
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_4 = _a.sent();
                    console.log(error_4);
                    res.sendStatus(500);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); },
    acceptAlbum: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var newAlbum, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!(!req.body || !req.body.album || !req.body.album._id)) return [3 /*break*/, 1];
                    res
                        .status(400)
                        .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
                    return [3 /*break*/, 4];
                case 1: return [4 /*yield*/, user_1.default.updateOne({ _id: req.session.uid }, {
                        $push: { sharedAlbums: req.body.album._id },
                        $pull: { pendingInvite: req.body.album._id }, // TODO Plural that shit
                    })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, album_1.default.findOne({
                            _id: req.body.album._id,
                        }).populate('photos')];
                case 3:
                    newAlbum = _a.sent();
                    res.status(201).send(JSON.stringify(newAlbum));
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_5 = _a.sent();
                    console.log(error_5);
                    res.sendStatus(500);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    removeAlbum: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var album, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    if (!(!req.params || !req.params.id)) return [3 /*break*/, 1];
                    res
                        .status(400)
                        .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
                    return [3 /*break*/, 8];
                case 1: return [4 /*yield*/, album_1.default.findOne({ _id: req.params.id })];
                case 2:
                    album = _a.sent();
                    if (!!album) return [3 /*break*/, 3];
                    res
                        .status(400)
                        .send(JSON.stringify({ error: '400', message: 'Wrong Data.' }));
                    return [3 /*break*/, 8];
                case 3:
                    if (!(String(album.owner) !== req.session.id)) return [3 /*break*/, 5];
                    return [4 /*yield*/, user_1.default.updateOne({ _id: req.session.uid }, {
                            $pull: { sharedAlbums: req.params.id },
                        })];
                case 4:
                    _a.sent();
                    res.sendStatus(204);
                    return [3 /*break*/, 8];
                case 5: return [4 /*yield*/, album_1.default.deleteOne({
                        _id: req.params.id,
                    })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, user_1.default.updateOne({ _id: req.session.uid }, {
                            $pull: { uploadedAlbums: req.params.id },
                        })];
                case 7:
                    _a.sent();
                    res.sendStatus(204);
                    _a.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_6 = _a.sent();
                    console.log(error_6);
                    res.sendStatus(500);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); },
};
