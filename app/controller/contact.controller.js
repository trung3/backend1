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
// findOne
exports.findOne = async (req, res, next) => {
  try {
    await getClient();
    const contactService = new ContactService(getDb());

    const id = req.params.id;   // 👈 lấy từ param
    if (!id) {
      return next(new ApiError(400, "id param is required"));
    }

    const document = await contactService.findById(id);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }

    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Error retrieving contact with id=${req.params.id}`));
  }
};

// update
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    await getClient();
    const contactService = new ContactService(getDb());
    const id = req.params.id;   // 👈 lấy từ param

    if (!id) {
      return next(new ApiError(400, "id param is required"));
    }

    const document = await contactService.update(id, req.body);

    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
if (!document.value) {
      // Document tồn tại nhưng không thay đổi gì
      return res.send({
        message: "Contact exists but no changes applied (fields may be identical)"
      });
    }
    return res.send({
      message: "Contact was updated successfully",
      contact: document,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return next(new ApiError(500, `Error updating contact with id=${req.params.id}`));
  }
};
//delete
exports.delete = async (req, res, next) => {
  try {
    await getClient();
    const contactService = new ContactService(getDb());

    const id = req.params.id;   // 👈 lấy từ URL param /api/contacts/:id
    if (!id) {
      return next(new ApiError(400, "id param is required"));
    }

    const document = await contactService.delete(id);

    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }

    return res.send({ message: "Contact was deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return next(
      new ApiError(500, `Could not delete contact with id=${req.params.id}`)
    );
  }
};
//findAllFavorite
// Find all favorite contacts
exports.findAllFavorite = async (_req, res, next) => {
  try {
    await getClient();
    const contactService = new ContactService(getDb());

    const documents = await contactService.findFavorite();
    return res.send(documents);
  } catch (error) {
    console.error("FAVORITE ERROR:", error);
    return next(
      new ApiError(500, "An error occurred while retrieving favorite contacts")
    );
  }
};

//delete all
// Delete all contacts
exports.deleteAll = async (_req, res, next) => {
  try {
    await getClient();
    const contactService = new ContactService(getDb());

    const deletedCount = await contactService.deleteAll();

    return res.send({
      message: `${deletedCount} contacts were deleted successfully`,
    });
  } catch (error) {
    console.error("DELETE ALL ERROR:", error);
    return next(
      new ApiError(500, "An error occurred while removing all contacts")
    );
  }
};





































































