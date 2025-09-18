const express = require("express");
const contacts = require("../controller/contact.controller");

const router = express.Router();


  // CRUD
router.route("/")
  .get(contacts.findAll)   // GET /api/contacts
  .post(contacts.create);  // POST /api/contacts

router.get("/find", contacts.findOne); 
router.put("/update", contacts.update);

  
  

module.exports = router;
