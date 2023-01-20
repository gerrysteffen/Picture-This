"use strict";

import express from "express";

import authMiddleware from "./middleware/auth";
import ImageControllers from "./controllers/image";
import UserControllers from "./controllers/user"; 
import AlbumControllers from "./controllers/album";

const router = express.Router();

//Image routes
router.post("/image", authMiddleware, ImageControllers.uploadPhoto);
router.delete("/image/:id", authMiddleware, ImageControllers.deletePhoto);
router.put("/image", authMiddleware, ImageControllers.toggleLike);

//User routes
router.post("/user/register", UserControllers.registerUser);
router.post("/user/login", UserControllers.login);
router.post("/user/logout", authMiddleware, UserControllers.logout);
router.get("/user", authMiddleware, UserControllers.getUser);

//Album routes
router.post("/album", authMiddleware, AlbumControllers.createAlbum);
router.get("/album/:id", authMiddleware, AlbumControllers.getAlbum);
router.delete("/album/:id", authMiddleware, AlbumControllers.removeAlbum);
router.post("/album/share", authMiddleware, AlbumControllers.shareAlbum);
router.post("/album/accept", authMiddleware,AlbumControllers.acceptAlbum);
router.post("/album/reject", authMiddleware, AlbumControllers.rejectAlbum);

export default router;
