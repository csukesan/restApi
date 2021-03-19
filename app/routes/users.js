const express = require("express");
const router = express.Router();
const Users = require("../model/Users");

//To get all user
router.get("/", (req, res) => {
    Users.find()
      .then((resp) => res.status(200).json(resp))
      .catch((err) => res.status(400).json("Request Failed"));
});

//To Create a new user
router.post("/", (req, res) => {
    const { Userid, Name, Surname, Email } = req.body;
    const user = new Users({
      Userid,
      Name,
      Surname,
      Email
    });
    user
      .save()
      .then((resp) => res.status(201).json(resp))
      .catch((err) => res.status(400).json("Request Failed"));
});

//To delete a specific user
router.delete("/:id", (req, res) => {
    Users.deleteOne({ _id: req.params.id })
      .then((resp) => res.status(200).json(resp))
      .catch((err) => res.status(400).json("Request Failed"));
});

//To Get a specific user
router.get("/:id", (req, res) => {
    Users.findById(req.params.id)
      .then((resp) => res.status(200).json(resp))
      .catch((err) => res.status(400).json("Request Failed"));
});

//To update specific post
router.patch("/:id", (req, res) => {
    Users.updateOne({ _id: req.params.id }, { $set: req.body })
      .then((resp) => res.status(200).json(resp))
      .catch((err) => res.status(400).json("Request Failed"));
});


module.exports = router;