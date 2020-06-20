export default class NotesController {
  constructor(notesService) {
    this.notesService = notesService;

    this.notesTemplateCompiled = Handlebars.compile(document.getElementById('notes-list-template').innerHTML);
    this.editNoteTemplateCompiled = Handlebars.compile(document.getElementById('edit-note-template').innerHTML);
    this.registerHandlebarsHelper();

    this.notesContainer = document.getElementById('notes-container');
    this.newNoteForm = document.getElementById('new-note-form');
    this.newNoteImportance = document.getElementById('new-note-importance');
    this.newNoteTitle = document.getElementById('new-note-title');
    this.newNoteStatus = document.getElementById('new-note-status');
    this.newNoteContent = document.getElementById('new-note-content');
    this.newNoteFinishByDate = document.getElementById('new-note-finish-by-date');

    this.newNoteButton = document.getElementById('new-note-button');
    this.newNoteCancelButton = document.getElementById('new-note-cancel-button');
    this.orderByFinishDateButton = document.getElementById('order-by-finish-date-button');
    this.orderByCreationDateButton = document.getElementById('order-by-creation-date-button');
    this.orderByImportanceButton = document.getElementById('order-by-importance-button');
    this.showFinishedButton = document.getElementById('show-finished-button');
  }

  registerHandlebarsHelper() {
    Handlebars.registerHelper('times', function (n, block) {
      let accum = '';
      for (let i = 0; i < n; ++i) accum += block.fn(i);
      return accum;
    });

    Handlebars.registerHelper('formatDate', function (date) {
      if (date instanceof Date) {
        return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
      }
      return date;
    });

    Handlebars.registerHelper('formatDateForInput', function (date) {
      if (date instanceof Date) {
        return date.toISOString().split('T')[0];
      }
      return date;
    });
  }

  showNotes(notes) {
    this.notesContainer.innerHTML = this.notesTemplateCompiled({ notes: notes });
  }

  initEventHandlers() {
    this.orderByFinishDateButton.addEventListener('click', (event) => this.orderByFinishDate(event));
    this.orderByCreationDateButton.addEventListener('click', (event) => this.orderByCreationDate(event));
    this.orderByImportanceButton.addEventListener('click', (event) => this.orderByImportance(event));
    this.showFinishedButton.addEventListener('click', (event) => this.showFinished(event));

    this.newNoteButton.addEventListener('click', () => this.toggleNewNoteForm());
    this.newNoteCancelButton.addEventListener('click', () => this.toggleNewNoteForm());
    this.newNoteForm.addEventListener('submit', (event) => this.addNewNote(event));
    document.addEventListener('click', (event) => this.changeImportance(event));
    document.addEventListener('keyup', (event) => this.adjustTextAreaSize(event));
    this.notesContainer.addEventListener('click', (event) => this.switchBetweenEditAndNonEditMode(event));
  }

  showFinished(event) {
    if (event.target.dataset.isActive === 'true') {
      this.showNotes(this.notesService.notes);
      this.showFinishedButton.dataset.isActive = 'false';
    } else {
      this.showNotes(this.notesService.notes.filter((n) => n.isDone));
      this.showFinishedButton.dataset.isActive = 'true';
    }
  }

  orderByImportance(event) {
    this.showOrderedNotes(event, (a, b) => b.importance - a.importance);
  }

  orderByCreationDate(event) {
    this.showOrderedNotes(event, (a, b) => b.creationDate - a.creationDate);
  }

  orderByFinishDate(event) {
    this.showOrderedNotes(event, (a, b) => b.toBeFinishedByDate - a.toBeFinishedByDate);
  }

  showOrderedNotes(event, compareFunction) {
    const status = event.target.dataset.status;
    if (status === 'inactive') {
      event.target.dataset.status = 'active-desc';
      this.showNotes(this.notesService.notes.sort((a, b) => a.id - b.id));
    } else if (status === 'active-desc') {
      event.target.dataset.status = 'active-asc';
      this.showNotes(this.notesService.notes.sort(compareFunction).reverse());
    } else if (status === 'active-asc') {
      event.target.dataset.status = 'inactive';
      this.showNotes(this.notesService.notes.sort(compareFunction));
    }
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

  switchBetweenEditAndNonEditMode(event) {
    const noteId = event.target.dataset.noteId;

    if (noteId !== undefined) {
      const noteElement = event.target.parentElement;
      let singleNote = this.notesService.notes.filter((n) => n.id === parseInt(noteId))[0];
      const node = document.createRange().createContextualFragment(this.editNoteTemplateCompiled({ note: singleNote }));
      noteElement.replaceWith(node);
      node.getElementById('');
    }
  }

  changeImportance(event) {
    if (event.target.classList.contains('importance') && event.target.classList.contains('editable')) {
      let currentImportance = this.countExclamationMarks(event.target.innerText);
      let newImportance = (currentImportance + 1) % 4;
      newImportance = newImportance === 0 ? newImportance + 1 : newImportance;
      let newExclamationMarks = '';
      for (let i = 0; i < newImportance; i++) {
        newExclamationMarks = '!' + newExclamationMarks;
      }
      event.target.innerText = newExclamationMarks;
    }
  }

  addNewNote(event) {
    event.preventDefault();
    this.notesService.addNewNote(
      this.countExclamationMarks(this.newNoteImportance.innerText),
      this.newNoteTitle.value,
      new Date(Date.now().toDateString()),
      Boolean(this.newNoteStatus.checked),
      this.newNoteContent.value,
      new Date(this.newNoteFinishByDate.value)
    );
    this.showNotes(this.notesService.notes);
    this.newNoteForm.reset();
    this.toggleNewNoteForm();
  }

  countExclamationMarks(text) {
    return (text || '').split('!').length - 1;
  }

  notesAction() {
    this.notesService.loadData();
    this.showNotes(this.notesService.notes);
    this.initEventHandlers();
  }

  adjustTextAreaSize(event) {
    if (event.target.classList.contains('content') && event.target.classList.contains('editable'))
      event.target.style.height = '1px';
    event.target.style.height = 25 + event.target.scrollHeight + 'px';
  }
}
