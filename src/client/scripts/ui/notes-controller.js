export default class NotesController {
  constructor(notesService) {
    this.notesService = notesService;

    this.notesTemplateCompiled = Handlebars.compile(document.getElementById('notes-list-template').innerHTML);
    this.registerHandlebarsHelper();

    this.notesContainer = document.getElementById('notes-container');
    this.newNoteButton = document.getElementById('new-note-button');
    this.newNoteForm = document.getElementById('new-note-form');
    this.newNoteCancelButton = document.getElementById('new-note-cancel-button');

    this.newNoteImportance = document.getElementById('new-note-importance');
    this.newNoteTitle = document.getElementById('new-note-title');
    this.newNoteStatus = document.getElementById('new-note-status');
    this.newNoteContent = document.getElementById('new-note-content');
    this.newNoteFinishByDate = document.getElementById('new-note-finish-by-date');
  }

  registerHandlebarsHelper() {
    Handlebars.registerHelper('times', function (n, block) {
      let accum = '';
      for (let i = 0; i < n; ++i) accum += block.fn(i);
      return accum;
    });

    Handlebars.registerHelper('formatDate', function (datetime) {
      return datetime.toLocaleString('de-CH');
    });
  }

  showNotes() {
    this.notesContainer.innerHTML = this.notesTemplateCompiled({ notes: this.notesService.notes });
  }

  initEventHandlers() {
    this.newNoteButton.addEventListener('click', () => this.showNewNoteForm());
    this.newNoteCancelButton.addEventListener('click', () => this.showNewNoteForm());
    this.newNoteForm.addEventListener('submit', (event) => this.addNewNote(event));
  }

  showNewNoteForm() {
    if (this.newNoteForm.style.display === 'grid') {
      this.newNoteForm.style.display = 'none';
      this.newNoteButton.style.display = 'block';
    } else {
      this.newNoteForm.style.display = 'grid';
      this.newNoteButton.style.display = 'none';
    }
  }

  addNewNote(event) {
    event.preventDefault();
    this.notesService.addNewNote(
      ((this.newNoteImportance.value || '').match('!') || []).length,
      this.newNoteTitle.value,
      new Date(Date.now()),
      Boolean(this.newNoteStatus.value),
      this.newNoteContent.value,
      new Date(this.newNoteFinishByDate.value)
    );
    this.showNotes();
  }

  notesAction() {
    this.notesService.loadData();
    this.showNotes();
    this.initEventHandlers();
  }
}
