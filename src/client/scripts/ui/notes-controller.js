export default class NotesController {
  constructor(notesService) {
    this.notesService = notesService;

    this.notesTemplateCompiled = Handlebars.compile(document.getElementById('notes-list-template').innerHTML);

    this.notesContainer = document.getElementById('notes-container');
  }

  showNotes() {
    this.notesContainer.innerHTML = this.notesTemplateCompiled({ notes: this.notesService.notes });
  }

  notesAction() {
    this.notesService.loadData();
    this.renderNotesView();
  }

  renderNotesView() {
    this.showNotes();
  }
}
