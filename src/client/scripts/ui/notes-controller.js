export default class NotesController {
  constructor(notesService) {
    this.notesService = notesService;

    this.notesTemplateCompiled = Handlebars.compile(document.querySelector('#notes-list-template').innerHTML);
    this.editNoteTemplateCompiled = Handlebars.compile(document.querySelector('#edit-note-template').innerHTML);
    this.registerHandlebarsHelper();

    this.notesContainer = document.querySelector('#notes-container');
    this.newNoteForm = document.querySelector('#new-note-form');
    this.newNoteImportance = document.querySelector('#new-note-importance');
    this.newNoteTitle = document.querySelector('#new-note-title');
    this.newNoteStatus = document.querySelector('#new-note-status');
    this.newNoteContent = document.querySelector('#new-note-content');
    this.newNoteFinishByDate = document.querySelector('#new-note-finish-by-date');

    this.newNoteButton = document.querySelector('#new-note-button');
    this.newNoteCancelButton = document.querySelector('#new-note-cancel-button');
    this.orderByFinishDateButton = document.querySelector('#order-by-finish-date-button');
    this.orderByCreationDateButton = document.querySelector('#order-by-creation-date-button');
    this.orderByImportanceButton = document.querySelector('#order-by-importance-button');
    this.showFinishedButton = document.querySelector('#show-finished-button');
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
    this.newNoteForm.addEventListener('click', (event) => this.addNewNote(event));
    document.addEventListener('click', (event) => this.changeImportance(event));
    document.addEventListener('keyup', (event) => this.adjustTextAreaSize(event));
    this.notesContainer.addEventListener('click', (event) => this.toggleEditMode(event));
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

  toggleEditMode(event) {
    const noteId = parseInt(event.target.dataset.noteId);

    if (!isNaN(noteId) && event.target.nodeName === 'BUTTON') {
      const noteElement = event.target.parentElement;
      let singleNote = this.notesService.notes.find((n) => n.id === noteId);
      const node = document.createRange().createContextualFragment(this.editNoteTemplateCompiled({ note: singleNote }));
      noteElement.replaceWith(node);
      document.querySelector('#update-button-' + noteId).addEventListener('click', (event) => this.updateNote(event));
      document
        .querySelector('#cancel-button-' + noteId)
        .addEventListener('click', () => this.showNotes(this.notesService.notes));
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

  updateNote(event) {
    event.preventDefault();
    const formNode = event.target.parentNode;
    this.notesService.updateNote(
      parseInt(formNode.dataset.noteId),
      formNode.querySelector('.title').value,
      new Date(formNode.querySelector('.creation-date').innerText),
      Boolean(formNode.querySelector('.status.editable').checked),
      formNode.querySelector('.content').value,
      new Date(formNode.querySelector('.finish-by-date > .editable').value)
    );
    this.showNotes(this.notesService.notes);
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
    if (event.target.classList.contains('content') && event.target.classList.contains('editable')) {
      event.target.style.height = '1px';
      event.target.style.height = 25 + event.target.scrollHeight + 'px';
    }
  }
}
