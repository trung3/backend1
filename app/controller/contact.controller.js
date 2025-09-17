const ContactService = require("../services/contact.service");
const { getClient } = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.name) return next(new ApiError(400, "Name can not be empty"));
  try {
    await getClient();                // đảm bảo đã connect (một lần duy nhất)
    const service = new ContactService();
    const doc = await service.create(req.body);
    res.status(201).send(doc);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    next(new ApiError(500, "An error occurred while creating the contact"));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    await getClient();
    const service = new ContactService();
    const docs = await service.find({});
    res.send(docs);
  } catch (err) {
    console.error("FIND_ALL ERROR:", err);
    next(new ApiError(500, "An error occurred while retrieving contacts"));
  }
};
