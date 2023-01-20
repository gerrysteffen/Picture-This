"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
var Schema = index_1.default.Schema;
var imageSchema = new Schema({
    album: {
        type: Schema.Types.ObjectId,
        ref: 'album',
    },
    cloudinaryId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now(),
    },
    imgAddress: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    liked: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
});
var Image = index_1.default.model('image', imageSchema);
exports.default = Image;
