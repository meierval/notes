import Datastore from 'nedb-promise';
import { Note } from './note';

export class NotesStore {
  constructor(db) {
    this.db = db || new Datastore({ filename: './data/notes.db', autoload: true });
  }

  async add(title, content, importance, isDone, toBeFinishedByDate) {
    let note = new Note(title, content, importance, isDone, toBeFinishedByDate);
    return await this.db.insert(note);
  }

  async update(id, title, content, importance, isDone, toBeFinishedBy) {
    const toBeFinishedByDate = new Date(toBeFinishedBy);
    toBeFinishedByDate.setHours(0, 0, 0, 0);
    return await this.db.update(
      {
        _id: id,
      },
      {
        $set: {
          title: title,
          content: content,
          importance: importance,
          isDone: isDone,
          toBeFinishedByDate: toBeFinishedByDate,
        },
      },
      {}
    );
  }

  async delete(id) {
    await this.db.update({ _id: id }, { $set: { state: 'DELETED' } });
    return await this.get(id);
  }

  async get(id) {
    return this.db.findOne({ _id: id });
  }

  async all() {
    return await this.db.find({}, () => []);
  }
}

export const noteStore = new NotesStore();
