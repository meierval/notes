export default class NotesController {
  constructor(notesService) {
    this.notesService = notesService;

    this.notesTemplateCompiled = Handlebars.compile(document.getElementById('notes-list-template').innerHTML);
    this.registerTimesHandlebarsHelper();

    this.notesContainer = document.getElementById('notes-container');
  }

  registerTimesHandlebarsHelper() {
    Handlebars.registerHelper('times', function (n, block) {
      let accum = '';
      for (let i = 0; i < n; ++i) accum += block.fn(i);
      return accum;
    });
  }

  renderNotesView() {
    this.notesContainer.innerHTML = this.notesTemplateCompiled({ notes: this.notesService.notes });
  }

  loadAndRenderData() {
    this.notesService.loadData();
    this.renderNotesView();
  }
}
