const { ObjectId } = require("mongodb");

class ContactService {
  constructor(db) {
    this.collection = db.collection("contacts"); // tạo collection "contacts"
  }

  async create(payload) {
    const result = await this.collection.insertOne(payload);
    return result.ops ? result.ops[0] : { _id: result.insertedId, ...payload };
  }

  async find(filter) {
    return await this.collection.find(filter).toArray();
  }

  async findByName(name) {
    return await this.collection
      .find({ name: { $regex: name, $options: "i" } })
      .toArray();
  }
   async findById(id) {
    return await this.collection.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
   

// 👇 Thêm hàm này vào
  extractContactData(payload) {
    const contact = {
      name: payload.name,
      email: payload.email,
      address: payload.address,
      phone: payload.phone,
      favorite: payload.favorite === true,
    };

    // loại bỏ field nào undefined
    Object.keys(contact).forEach(
      (key) => contact[key] === undefined && delete contact[key]
    );

    return contact;
  }


   async update(id, payload) {
  const filter = {
    _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
  };

  const update = this.extractContactData(payload);
  if (Object.keys(update).length === 0) {
    return null;
  }

  const result = await this.collection.findOneAndUpdate(
    filter,
    { $set: update },
    { returnDocument: "after" }   // đúng với v6
  );

  console.log("Update result:", result);

  return result?.value;  // có thể là null nếu không có thay đổi
}

 
 
 

 
 

 
 
 

  
  
  
  
  

  





  
  

  
  
  
  
  

 
 
 
 
 

 



 
 
 
 
 
 
 
 
 


   
 
}


module.exports = ContactService;
