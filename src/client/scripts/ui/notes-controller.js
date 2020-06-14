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
    this.newNoteButton.addEventListener('click', () => this.toggleNewNoteForm());
    this.newNoteCancelButton.addEventListener('click', () => this.toggleNewNoteForm());
    this.newNoteForm.addEventListener('submit', (event) => this.addNewNote(event));
    this.newNoteImportance.addEventListener('click', () => this.changeImportance());
    this.newNoteContent.addEventListener('keyup', (event) => this.adjustTextAreaSize(event));
  }

  toggleNewNoteForm() {
    if (this.newNoteForm.style.display === 'grid') {
      this.newNoteForm.style.display = 'none';
      this.newNoteButton.style.display = 'block';
    } else {
      this.newNoteForm.style.display = 'grid';
      this.newNoteButton.style.display = 'none';
    }
  }

  changeImportance() {
    let currentImportance = this.countExclamationMarks(this.newNoteImportance.innerText);
    let newImportance = (currentImportance + 1) % 4;
    newImportance = newImportance === 0 ? newImportance + 1 : newImportance;
    let newExclamationMarks = '';
    for (let i = 0; i < newImportance; i++) {
      newExclamationMarks = '!' + newExclamationMarks;
    }
    this.newNoteImportance.innerText = newExclamationMarks;
  }

  addNewNote(event) {
    event.preventDefault();
    this.notesService.addNewNote(
      this.countExclamationMarks(this.newNoteImportance.innerText),
      this.newNoteTitle.value,
      new Date(Date.now()),
      Boolean(this.newNoteStatus.checked),
      this.newNoteContent.value,
      new Date(this.newNoteFinishByDate.value)
    );
    this.showNotes();
    this.newNoteForm.reset();
    this.toggleNewNoteForm();
  }

  countExclamationMarks(text) {
    return (text || '').split('!').length - 1;
  }

  notesAction() {
    this.notesService.loadData();
    this.showNotes();
    this.initEventHandlers();
  }

  adjustTextAreaSize(event) {
    event.target.style.height = '1px';
    event.target.style.height = 25 + event.target.scrollHeight + 'px';
  }
}
