const ContactService = require("../services/contact.service");
const { getClient, getDb } = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Tạo mới
exports.create = async (req, res, next) => {
  if (!req.body?.name) return next(new ApiError(400, "Name can not be empty"));
  try {
    await getClient(); // đảm bảo connect
    const service = new ContactService(getDb()); // truyền db
    const doc = await service.create(req.body);
    res.status(201).send(doc);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    next(new ApiError(500, "An error occurred while creating the contact"));
  }
};

// Lấy tất cả
exports.findAll = async (req, res, next) => {
  try {
    await getClient(); // đảm bảo connect
    const contactService = new ContactService(getDb()); // truyền db
    const { name } = req.query;
    const documents = name
      ? await contactService.findByName(name)
      : await contactService.find({});
    return res.send(documents);
  } catch (err) {
    console.error("FINDALL ERROR:", err);
    return next(new ApiError(500, "An error occurred while retrieving contacts"));
  }
};
//tìm 1kq
exports.findOne = async (req, res, next) => {
  try {
    await getClient();
    const contactService = new ContactService(getDb());

    const id = req.query.id;   // 👈 lấy từ query string ?id=
    if (!id) {
      return next(new ApiError(400, "id query param is required"));
    }

    const document = await contactService.findById(id);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }

    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving contact with id=${req.query.id}`)
    );
  }
};
//update
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    await getClient();
    const contactService = new ContactService(getDb()); // 👈 dùng đúng tên class
    const id = req.query.id;   // 👈 lấy từ query string ?id=

    if (!id) {
      return next(new ApiError(400, "id query param is required"));
    }

    const document = await contactService.update(id, req.body);

    if (!document) {
      return res.send({
        message: "Contact exists but no changes applied (fields may be identical)",
      });
    }

    return res.send({
      message: "Contact was updated successfully",
      contact: document,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return next(new ApiError(500, `Error updating contact with id=${req.query.id}`));
  }
};