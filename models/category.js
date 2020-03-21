const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Category {
  constructor(name, id) {
    this.name = name;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

   save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the category
      dbOp = db
        .collection('categories')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('categories').insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('categories')
      .find()
      .toArray()
      .then(categories => {
        console.log(categories);
        return categories;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(catId) {
    const db = getDb();
    return db
      .collection('categories')
      .find({ _id: new mongodb.ObjectId(catId) })
      .next()
      .then(category => {
        console.log(category);
        return category;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteById(catId) {
    const db = getDb();
    return db
      .collection('categories')
      .deleteOne({ _id: new mongodb.ObjectId(catId) })
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }

}

module.exports = Category;
