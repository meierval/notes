import Note from './note.js';

export default class NotesService {
  constructor(notesStorage) {
    this.storage = notesStorage;
    this.notes = [];
    this.lastId = 2;
  }

  loadData() {
    this.notes = this.storage
      .getAll()
      .map((n) => new Note(n.id, n.title, n.content, n.importance, n.isDone, n.creationDate, n.toBeFinishedByDate))
      .sort((a, b) => a.id - b.id);

    if (this.notes.length === 0) {
      this.notes.push(new Note(1, 'My first Note', 'Content of my first Note', 2, true, Date.now(), Date.now()));
      this.notes.push(new Note(2, 'My second Note', 'Content of my second Note', 3, false, Date.now(), Date.now()));
    }
  }

  addNewNote(newNoteImportance, newNoteTitle, newNoteCreationDate, newNoteStatus, newNoteContent, newNoteFinishByDate) {
    const newNote = new Note(
      ++this.lastId,
      newNoteTitle,
      newNoteContent,
      newNoteImportance,
      newNoteStatus,
      newNoteCreationDate,
      newNoteFinishByDate
    );
    this.notes.push(newNote);
  }

  updateNote(
    id,
    updatedNoteTitle,
    updatedNoteCreationDate,
    updatedNoteStatus,
    updatedNoteContent,
    updatedNoteFinishByDate
  ) {
    const existingNote = this.notes.find((n) => n.id === id);
    existingNote.title = updatedNoteTitle;
    existingNote.creationDate = updatedNoteCreationDate;
    existingNote.status = updatedNoteStatus;
    existingNote.content = updatedNoteContent;
    existingNote.toBeFinishedByDate = updatedNoteFinishByDate;
  }
}
