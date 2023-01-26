"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const { Schema } = index_1.default;
const imageSchema = new Schema({
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
const Image = index_1.default.model('image', imageSchema);
exports.default = Image;
