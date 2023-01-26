"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const { Schema } = index_1.default;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    sharedAlbums: {
        type: [{ type: Schema.Types.ObjectId, ref: 'album' }],
    },
    pendingInvite: [{ type: Schema.Types.ObjectId, ref: 'album' }],
    uploadedAlbums: [{ type: Schema.Types.ObjectId, ref: 'album' }],
});
const User = index_1.default.model('user', userSchema);
exports.default = User;
