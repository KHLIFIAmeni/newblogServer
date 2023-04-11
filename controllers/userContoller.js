const db = require('./../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
require('dotenv').config({ path: './../config/.env' })

const allUser = function (req, res) {
    db.User.getAll()
        .then((response) => res.status(200).send(response))
        .then((err) => res.status(400).send(err))

}
const deleteUser = function (req, res) {
    db.User.destroy({ where: { id: req.params.id } })
        .then((response) => res.status(200).send({ msg: 'deleted' }))
        .then((err) => res.status(200).send(err))
}
const profileUser = function (req, res) {
    db.User.findOne({ where: { id: req.params.id } })
        .then((response) => res.status(200).send(response))
        .then((err) => res.status(400).send(err))
}
const registerUser = function (req, res) {
    db.User.count({ where: { email: req.body.email } }).then((user) => {
        if (user != 0) {
            res.status(400).send({ msg: 'email used' })
        }
        else {
            bcrypt.hash(req.body.password, 10).then((passwordHashed) => {

                db.user.create(
                    {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        dateBirth: req.body.dateBirth,
                        tel: req.body.tel,
                        password: passwordHashed,
                        image: req.file.filename,
                    }
                ).then((response) => res.status(200).send(response))
                    .then((err) => res.status(400).send(err))
            })
        }
    })
}
const loginUser = function (req, res) {
    db.User.findOne({ where: { email: req.body.email } }).then((user) => {
        if (!user) {
            res.status(400).send({ msg: "email or password invalid" })
        }
        else {
            bcrypt.compare(req.body.password, user.password).then((same) => {
                if (same) {
                    let token = jwt.sign({ login: user.login, firstName: user.firstName, lastName: user.lastName }, process.env.privateKey, { expiresIn: '1h' })
                    res.status(200).send({ token: token })
                }
                else {
                    res.status(400).send({ msg: 'email or password invalid' })
                }
            })
        }
    })
}
const updatePhotoUser = function (req, res) {
    db.User.update({
        image: req.file.filename
    }, { where: { id: req.params.id } })
        .then((response) => res.status(200).send(response))
        .then((err) => res.status(200).send(err))
}
const updateProfileUser = function (req, res) {
    bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
        db.User.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dateBirth: req.body.dateBirth,
            tel: req.body.tel,
            password: hashedPassword,
        }, { where: { id: req.params.id } })
            .then((response) => res.status(200).send(response))
            .then((err) => res.status(200).send(err))

    })

}

module.exports = {
    allUser,
    deleteUser,
    profileUser,
    registerUser,
    loginUser,
    updatePhotoUser,
    updateProfileUser

}