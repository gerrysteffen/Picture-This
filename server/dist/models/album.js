"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
var Schema = index_1.default.Schema;
var albumSchema = new Schema({
    albumName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    photos: [{ type: Schema.Types.ObjectId, ref: "image" }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    sharedWith: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    ]
});
var Album = index_1.default.model("album", albumSchema);
exports.default = Album;
