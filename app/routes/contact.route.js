const express = require("express");
const contacts = require("../controller/contact.controller");

const router = express.Router();


  // CRUD
router.route("/")
  .get(contacts.findAll)   // GET /api/contacts
  .post(contacts.create);  // POST /api/contacts

router.get("/:id", contacts.findOne); 
router.put("/:id", contacts.update);

  
  

module.exports = router;