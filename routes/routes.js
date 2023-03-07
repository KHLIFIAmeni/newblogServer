const express = require('express')
const route = express.Router()
const db = require('./../models')
const adminController = require('./../controllers/adminController')
const upload = require('./../config/multer')



route.post('/registeradmin', upload.uploadImageAdmin.single('image'), adminController.registerAdmin)
route.get('/profileadmin/:id', adminController.profileAdmin)
route.post('/loginadmin', adminController.loginAdmin)
route.put('/updatephotoadmin/:id', upload.uploadImageAdmin.single('image'), adminController.updatePhoto)

module.exports = route