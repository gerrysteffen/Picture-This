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
var user_1 = __importDefault(require("../models/user"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var saltRounds = 15;
var UserControllers = {
    registerUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var previousUser, hashedPassword, newUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    if (!(!req.body ||
                        !req.body.user ||
                        !req.body.user.email ||
                        !req.body.user.password ||
                        !req.body.user.firstName ||
                        !req.body.user.lastName)) return [3 /*break*/, 1];
                    res
                        .status(400)
                        .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
                    return [3 /*break*/, 6];
                case 1: return [4 /*yield*/, user_1.default.findOne({ email: req.body.user.email })];
                case 2:
                    previousUser = _a.sent();
                    if (!previousUser) return [3 /*break*/, 3];
                    return [2 /*return*/, res
                            .status(409)
                            .send({ message: 'User already exists', status: 409 })];
                case 3: return [4 /*yield*/, bcrypt_1.default.hash(req.body.user.password, saltRounds)];
                case 4:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, user_1.default.create({
                            email: req.body.user.email,
                            password: hashedPassword,
                            firstName: req.body.user.firstName,
                            lastName: req.body.user.lastName,
                        })];
                case 5:
                    newUser = _a.sent();
                    req.session.uid = String(newUser._id); // TODO This could be a problem, lets see
                    res.status(201).send(JSON.stringify(newUser));
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    console.log(error_1);
                    res.sendStatus(500);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); },
    getUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_1.default.findOne({ _id: req.session.uid }).populate({
                            path: 'uploadedAlbums sharedAlbums pendingInvite',
                            populate: { path: 'photos' },
                        })];
                case 1:
                    user = _a.sent();
                    res.status(200).send(JSON.stringify(user));
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    res.sendStatus(500);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    login: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, valid, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('trying login');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    if (!(!req.body ||
                        !req.body.user ||
                        !req.body.user.email ||
                        !req.body.user.password)) return [3 /*break*/, 2];
                    res
                        .status(400)
                        .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
                    return [3 /*break*/, 6];
                case 2: return [4 /*yield*/, user_1.default.findOne({
                        email: req.body.user.email,
                    }).populate({
                        path: 'uploadedAlbums sharedAlbums pendingInvite',
                        populate: { path: 'photos' },
                    })];
                case 3:
                    user = _a.sent();
                    if (!!user) return [3 /*break*/, 4];
                    res
                        .status(401)
                        .send({ error: '401', message: 'Email and/or password incorrect' });
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, bcrypt_1.default.compare(req.body.user.password, user.password)];
                case 5:
                    valid = _a.sent();
                    if (valid) {
                        req.session.uid = String(user._id);
                        res.status(200).send(JSON.stringify(user));
                    }
                    else {
                        res.status(401).send({
                            error: '401',
                            message: 'Email and/or password incorrect',
                        });
                    }
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
    logout: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                res.clearCookie('sid');
                res.sendStatus(204);
            }
            catch (error) {
                console.log(error);
                res.sendStatus(500);
            }
            return [2 /*return*/];
        });
    }); },
};
exports.default = UserControllers;
