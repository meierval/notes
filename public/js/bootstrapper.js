import NotesService from './services/notes-service.js';
import NotesController from './controllers/notes-controller.js';
import HttpService from './services/http-service.js';

class Bootstrapper {
  static start() {
    const httpService = new HttpService();
    const notesService = new NotesService(httpService);
    new NotesController(notesService).notesAction();
  }
}

document.addEventListener('DOMContentLoaded', Bootstrapper.start);
