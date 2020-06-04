export default class NotesController {
  constructor(notesService) {
    this.notesService = notesService;

    this.notesTemplateCompiled = Handlebars.compile(document.getElementById('notes-list-template').innerHTML);

    this.notesContainer = document.getElementById('notes-container');
  }

  renderNotesView() {
    this.notesContainer.innerHTML = this.notesTemplateCompiled({ notes: this.notesService.notes });
  }

  loadAndRenderData() {
    this.notesService.loadData();
    this.renderNotesView();
  }
}
