const { getDb } = require("../utils/mongodb.util");

class ContactService {
  constructor() {
    this.Contact = getDb().collection("contacts");
  }

  extractContactData(payload) {
    const contact = {
      name: payload.name,
      email: payload.email,
      address: payload.address,
      phone: payload.phone,
      favorite: payload.favorite,
    };
    Object.keys(contact).forEach(k => contact[k] === undefined && delete contact[k]);
    return contact;
  }

  async create(payload) {
    const contact = this.extractContactData(payload);
    const r = await this.Contact.findOneAndUpdate(
      contact,
      { $set: { favorite: contact.favorite === true } },
      { upsert: true, returnDocument: "after" }
    );
    return r.value;
  }

  async find(filter = {}) {
    return this.Contact.find(filter).toArray();
  }
}

module.exports = ContactService;
