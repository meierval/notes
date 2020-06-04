import NotesStorage from './dl/notes-storage.js';
import NotesService from './bl/notes-service.js';
import NotesController from './ui/notes-controller.js';

class Bootstrapper {
  static start() {
    const notesStorage = new NotesStorage();
    const notesService = new NotesService(notesStorage);
    new NotesController(notesService).loadAndRenderData();
  }
}

document.addEventListener('DOMContentLoaded', Bootstrapper.start);
