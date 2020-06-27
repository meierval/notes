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
      .sort((a, b) => a.id - b.id);
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
    await this.httpService.ajax('POST', '/notes', newNote);
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
    await this.httpService.ajax('PUT', `/notes/${id}`, note);
  }
}
