import Note from './note.js';

export default class NotesService {
  constructor(notesStorage) {
    this.storage = notesStorage;
    this.notes = [];
  }

  loadData() {
    this.notes = this.storage
      .getAll()
      .map((n) => new Note(n.id, n.title, n.content, n.importance, n.isDone, n.creationDateTime, n.toBeFinishedByDate));

    if (this.notes.length === 0) {
      this.notes.push(new Note(1, 'My first Note', 'Content of my first Note', 2, true, Date.now(), Date.now()));
    }
  }

  add(note) {
    this.storage.add(note.toJSON());
  }
}
