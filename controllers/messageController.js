const express = require('express')
const db = require('./../models')

const getAllMessage = function (req, res) {
    db.Message.getAll()
        .then((response) => res.status(200).send(response))
        .then((err) => res.status(400).sent(err))
}
const deleteMessage = function (req, res) {
    db.Message.destroy({ where: { id: req.params.id } })
        .then((response) => res.status(200).send(response))
        .then((err) => res.status(400).sent(err))
}
module.exports = {
    getAllMessage,
    deleteMessage

}