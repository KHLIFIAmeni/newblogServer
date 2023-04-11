const express = require('express')
const route = express.Router()
const db = require('./../models')
const adminController = require('./../controllers/adminController')
const messageController = require('./../controllers/messageController')
const userController = require('./../controllers/userContoller')
const upload = require('./../config/multer')

//Admin Routes

route.post('/registeradmin', upload.uploadImageAdmin.single('image'), adminController.registerAdmin)
route.get('/profileadmin/:id', adminController.profileAdmin)
route.post('/loginadmin', adminController.loginAdmin)
route.put('/updatephotoadmin/:id', upload.uploadImageAdmin.single('image'), adminController.updatePhoto)
route.put('/updateprofile/:id', adminController.updateProfile)
route.delete('/deleteadmin/:id', adminController.deleteAdmin)
route.get('/alladmin', adminController.allAdmin)
//Message Routes
route.get('/messages', messageController.getAllMessage)
route.delete('/deletemsg/:id', messageController.deleteMessage)

//User Routes
route.post('/registeruser', upload.uploadImageUser.single('image'), userController.registerUser)
route.post('/loginuser', userController.loginUser)
route.get('alluser', userController.allUser)
route.get('/profileuser/:id', userController.profileUser)
route.put('updatephotouser/:id', upload.uploadImageUser.single('image'), userController.updatePhotoUser)
route.put('/updateuser/:id', userController.updateProfileUser)
route.delete('/deleteuser/:id', userController.deleteUser)

module.exports = route