"use strict";
const Router = require("express");
const images = require("./Controllers/images");
const secure = require("./Controllers/security");
const authMiddleware = require("./middleware/auth");
const router = Router();
const albums = require("./Controllers/albums");

//Photo routes
router.get("/", authMiddleware, images.getPhotos);
router.post("/upload", authMiddleware, images.uploadPhoto);
router.delete("/delete", authMiddleware, images.deletePhoto);
router.put("/like", authMiddleware, images.addLike);

//login routes

router.post("/register", secure.registerUser);
router.post("/login", secure.login);
router.post("/logout", authMiddleware, secure.logout);
router.get("/users", secure.getUsers);
router.get("/refresh", authMiddleware, secure.refreshUser);
// Album routes

router.post("/newAlbum", authMiddleware, albums.createAlbum);
router.post("/album", authMiddleware, albums.getAlbum);
router.post("/share-album", authMiddleware, albums.shareAlbum);
router.post("/accept-invite", albums.acceptAlbum);
router.delete("/album",authMiddleware, albums.deleteAlbum);
router.put("/album", authMiddleware, albums.removeSharedAlbum);
router.put("/reject-invite",authMiddleware, albums.rejectAlbum);
module.exports = router;
