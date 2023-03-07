const express = require('express')
const db = require('./../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './../config/.env' })
const registerAdmin = function (req, res, next) {
    db.Adminstrator.count({ where: { email: req.body.email } }).then((admin) => {
        if (admin != 0) {
            res.status(400).then({ msg: 'this email is used' })
        } else {
            bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
                db.Adminstrator.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    login: req.body.login,
                    password: hashedPassword,
                    role: req.body.role,
                    image: req.file.filename
                }).then((response) => res.status(200).send({ msg: 'Admin created' }))
                    .then((err) => res.status(400).send(err))
            })

        }
    })

}
const profileAdmin = function (req, res) {
    db.Adminstrator.findOne({ where: { id: req.params.id } })
        .then((response) => res.status(200).send(response))
        .then((err) => res.status(400).send(err))
}
const loginAdmin = function (req, res) {
    db.Adminstrator.findOne({ where: { email: req.body.email } }).then((admin) => {
        if (!admin) {
            res.status(400).send({ msg: 'invalid email or password' })
        } else {
            bcrypt.compare(req.body.password, admin.password).then((same) => {
                if (same) {
                    let token = jwt.sign({ login: admin.login, firstName: admin.firstName, lastName: admin.lastName, role: 'admin' }, process.env.privateKey, { expiresIn: '1h' })
                    res.status(200).json({ token: token })
                } else
                    res.status(400).send({ msg: 'invalid email or password' })
            })
        }
    })
}
const updatePhoto = function (req, res) {
    db.Adminstrator.update({
        image: req.file.filename
    }, { where: { id: req.params.id } })
        .then((response) => res.status(200).send(response))
        .then((err) => res.status(200).send(err))
}
module.exports = {
    registerAdmin,
    profileAdmin,
    loginAdmin,
    updatePhoto
}
