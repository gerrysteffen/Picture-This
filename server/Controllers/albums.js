const Album = require('../Models/albumSchema')
const User = require('../Models/userSchema')

exports.getAlbums = async (req ,res) => {

    try {
        const allAlbums = await Album.find()
        res.status(200)
        res.send(allAlbums)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

exports.createAlbum = async(req, res) =>{
    try {
        const newAlbum = await Album.create({
            albumName: req.body.albumName,
            owner : req.session.uid,
        })
        const user = await User.findOne({_id: req.session.uid})
        let userAlbums = user.uploadedAlbums
        console.log(userAlbums)
        console.log(newAlbum)
        userAlbums.push(newAlbum)
        user.uploadedAlbums = userAlbums

        user.save()
        console.log(newAlbum)
        res.status(201)
        res.send(newAlbum)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}