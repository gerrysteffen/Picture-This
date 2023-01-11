"use strict";
const Router = require("express");
const ctrl = require("./controller");
const router = Router();

router.get("/", ctrl.getPhotos);

router.post("/upload", ctrl.uploadPhoto);

router.delete('/delete' , ctrl.deletePhoto)

router.put('/like' , ctrl.addLike)
module.exports = router;
