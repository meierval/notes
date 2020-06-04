export default class NotesStorage {
  constructor() {
    const storageName = 'notesStorage_v1';
    this.storageName = storageName;
    const notes = JSON.parse(localStorage.getItem(storageName) || '[ ]');
    this.notes = notes;
    localStorage.setItem(storageName, JSON.stringify(notes));
  }

  getAll() {
    return this.notes;
  }

  add(note) {
    this.notes.push(note);
    localStorage.setItem(this.storageName, JSON.stringify(note));
  }

  getNoteById(id) {
    return JSON.parse(localStorage.getItem(this.storageName)).filter((note) => note.id === id)[0];
  }
}
