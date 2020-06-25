import Datastore from 'nedb-promise';

export class Note {
  constructor(pizzaName, orderedBy) {
    this.orderedBy = orderedBy;
    this.pizzaName = pizzaName;
    this.orderDate = new Date();
    this.state = 'OK';
  }
}

export class NotesStore {
  constructor(db) {
    this.db = db || new Datastore({ filename: './data/notes.db', autoload: true });
  }

  async add(pizzaName, orderedBy) {
    let order = new Note(pizzaName, orderedBy);
    return await this.db.insert(order);
  }

  async update() {}

  async delete(id, currentUser) {
    await this.db.update({ _id: id, orderedBy: currentUser }, { $set: { state: 'DELETED' } });
    return await this.get(id);
  }

  async get(id, currentUser) {
    return await this.db.findOne({ _id: id, orderedBy: currentUser });
  }

  async all(currentUser) {
    return await this.db.cfind({ orderedBy: currentUser }).sort({ orderDate: -1 }).exec();
  }
}

export const orderStore = new NotesStore();
