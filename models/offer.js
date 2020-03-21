const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Offer {
  constructor(name, discount, id) {
    this.name = name;
    this.discount = discount;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

   save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the offer
      dbOp = db
        .collection('offers')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('offers').insertOne(this);
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
      .collection('offers')
      .find()
      .toArray()
      .then(offers => {
        console.log(offers);
        return offers;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(offerId) {
    const db = getDb();
    return db
      .collection('offers')
      .find({ _id: new mongodb.ObjectId(offerId) })
      .next()
      .then(offer => {
        console.log(offer);
        return offer;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteById(offerId) {
    const db = getDb();
    return db
      .collection('offers')
      .deleteOne({ _id: new mongodb.ObjectId(offerId) })
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }

}

module.exports = Offer;
