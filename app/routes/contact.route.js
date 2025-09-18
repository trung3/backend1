const express = require("express");
const contacts = require("../controller/contact.controller");

const router = express.Router();


  // CRUD
router.route("/")
  .get(contacts.findAll)   // GET /api/contacts
  .post(contacts.create);  // POST /api/contacts

router.get("/:id", contacts.findOne); 
router.put("/:id", contacts.update);
router.delete("/:id", contacts.delete);   // DELETE /api/contacts/:id
router.get("/favorites/all", contacts.findAllFavorite);
router.delete("/", contacts.deleteAll);   // DELETE /api/contacts

  
  

module.exports = router;