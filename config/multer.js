const mime = require('mime-types')
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const storageImageAdmin = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/admin')
    },
    filename: function (req, file, cb) {
        console.log(file.mimetype)
        console.log(mime.extension(file.mimetype))

        const ext = mime.extension(file.mimetype);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const uniqueName = uuidv4();
        cb(null, `${uniqueName}.${ext}`)
    }
})
const storageImageUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        console.log(file.mimetype)
        console.log(mime.extension(file.mimetype))

        const ext = mime.extension(file.mimetype);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const uniqueName = uuidv4();
        cb(null, `${uniqueName}.${ext}`)
    }
})
const uploadImageAdmin = multer({ storage: storageImageAdmin })
const uploadImageUser = multer({ storage: storageImageUser })
module.exports = {
    uploadImageAdmin,
    uploadImageUser
}