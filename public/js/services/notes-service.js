import Note from './note.js';

export default class NotesService {
  constructor(httpService) {
    this.httpService = httpService;
    this.notes = [];
  }

  async getNotes() {
    const notes = await this.httpService.ajax('GET', '/notes', undefined);
    this.notes = notes
      .map((n) => new Note(n._id, n.title, n.content, n.importance, n.isDone, n.creationDate, n.toBeFinishedByDate))
      .sort((a, b) => a.creationDate - b.creationDate);
  }

  async addNewNote(
    newNoteImportance,
    newNoteTitle,
    newNoteCreationDate,
    newNoteStatus,
    newNoteContent,
    newNoteFinishByDate
  ) {
    const newNote = new Note(
      undefined,
      newNoteTitle,
      newNoteContent,
      newNoteImportance,
      newNoteStatus,
      newNoteCreationDate,
      newNoteFinishByDate
    );
    const response = await this.httpService.ajax('POST', '/notes', newNote);
    this.notes.push(
      new Note(
        response._id,
        response.title,
        response.content,
        response.importance,
        response.isDone,
        response.creationDate,
        response.toBeFinishedByDate
      )
    );
  }

  async updateNote(
    id,
    updatedNoteImportance,
    updatedNoteTitle,
    updatedNoteCreationDate,
    updatedNoteStatus,
    updatedNoteContent,
    updatedNoteFinishByDate
  ) {
    const note = new Note(
      id,
      updatedNoteTitle,
      updatedNoteContent,
      updatedNoteImportance,
      updatedNoteStatus,
      updatedNoteCreationDate,
      updatedNoteFinishByDate
    );
    const response = await this.httpService.ajax('PUT', `/notes/${id}`, note);
    const updatedNote = new Note(
      response._id,
      response.title,
      response.content,
      response.importance,
      response.isDone,
      response.creationDate,
      response.toBeFinishedByDate
    );
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].id === updatedNote.id) {
        this.notes[i] = updatedNote;
        break;
      }
    }
  }
}
