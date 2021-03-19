const express = require("express");
const router = express.Router();
const Users = require("../model/Users");

//To get all user
router.get("/", (req, res) => {
  if(req.query.id){
    const id = req.query.id;
    Users.findById(id)
          .then(data =>{
              if(!data){
                  res.status(404).send({ message : "Not found user with id "+ id})
              }else{
                  res.send(data)
              }
          })
          .catch(err =>{
              res.status(500).send({ message: "Error retrieving user with id " + id})
          })
  }else{
    Users.find()
          .then(user => {
              res.send(user)
              })
              .catch(err => {
                  res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
              })
      } 
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
      .catch((err) => res.status(500).json("Some error occurred while creating a create operation"));
});

//To delete a specific user
router.delete("/:id", (req, res)=>{
  const id = req.params.id;
  Users.findByIdAndDelete(id)
      .then(data => {
          if(!data){
              res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
          }else{
              res.send({
                  message : "User was deleted successfully!"
              })
          }
      })
      .catch(err =>{
          res.status(500).send({
              message: "Could not delete User with id=" + id
          });
      });
});

//To Get a specific user
router.get("/:id", (req, res) => {
    Users.findById(req.params.id)
      .then((resp) => res.status(200).json(resp))
      .catch((err) => res.status(400).json("Request Failed"));
});

//To update specific post
router.patch("/:id", (req, res) => {
  if(!req.body){
    return res
      .status(400)
      .send({ message : "Data to update can not be empty"})
    }
    const id = req.params.id;
    Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
      .then(data => {
          if(!data){
              res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
          }else{
              res.send(data)
          }
      })
      .catch(err =>{
          res.status(500).send({ message : "Error Update user information"})
      })
});

    


module.exports = router;