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
      this.notes.push(
        new Note(
          1,
          'My first Note',
          'Content of my first Note',
          3,
          true,
          'Mai 20, 2020 23:15:30 UTC',
          'Mai 20, 2020 23:15:30 UTC'
        )
      );
    }
  }

  add(note) {
    this.storage.add(note.toJSON());
  }
}
