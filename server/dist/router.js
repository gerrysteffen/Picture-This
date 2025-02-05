"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./middleware/auth"));
const image_1 = __importDefault(require("./controllers/image"));
const user_1 = __importDefault(require("./controllers/user"));
const album_1 = __importDefault(require("./controllers/album"));
const router = express_1.default.Router();
//Image routes
router.post("/image", auth_1.default, image_1.default.uploadPhoto);
router.delete("/image/:id", auth_1.default, image_1.default.deletePhoto);
router.put("/image/like", auth_1.default, image_1.default.toggleLike);
//User routes
router.post("/user/register", user_1.default.registerUser);
router.post("/user/login", user_1.default.login);
router.post("/user/logout", auth_1.default, user_1.default.logout);
router.get("/user", auth_1.default, user_1.default.getUser);
//Album routes
router.post("/album", auth_1.default, album_1.default.createAlbum);
router.get("/album/:id", auth_1.default, album_1.default.getAlbum);
router.put("/album/:id", auth_1.default, album_1.default.modifyAlbum);
router.delete("/album/:id", auth_1.default, album_1.default.removeAlbum);
router.post("/album/share", auth_1.default, album_1.default.shareAlbum);
router.post("/album/accept", auth_1.default, album_1.default.acceptAlbum);
router.post("/album/reject", auth_1.default, album_1.default.rejectAlbum);
exports.default = router;
