import Note from '../services/note.js';
// TODO: remove import!

export default class NotesController {
  constructor(notesService) {
    this.notesService = notesService;

    this.notesTemplateCompiled = Handlebars.compile(document.querySelector('#notes-list-template').innerHTML);
    this.editNoteTemplateCompiled = Handlebars.compile(document.querySelector('#edit-note-template').innerHTML);
    this.registerHandlebarsHelper();

    this.notesContainer = document.querySelector('#notes-container');

    this.newNoteButton = document.querySelector('#new-note-button');
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
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
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

  notesAction() {
    this.notesService.getNotes().then(() => {
      this.showNotes(this.notesService.notes);
      this.initEventHandlers();
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
    document.addEventListener('click', (event) => this.changeImportance(event));
    document.addEventListener('keyup', (event) => this.adjustTextAreaSize(event));
    this.notesContainer.addEventListener('click', (event) => this.toggleEditMode(event));
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
    const arrowLine = event.target.querySelector('.arrow-line');
    const arrowUp = event.target.querySelector('.arrow-up');
    const arrowDown = event.target.querySelector('.arrow-down');
    if (status === 'inactive') {
      event.target.dataset.status = 'active-desc';
      this.showNotes(this.notesService.notes.sort((a, b) => a.id - b.id));
      arrowDown.style.display = 'inline';
      arrowLine.style.display = 'inline';
      arrowUp.style.display = 'none';
    } else if (status === 'active-desc') {
      event.target.dataset.status = 'active-asc';
      this.showNotes(this.notesService.notes.sort(compareFunction).reverse());
      arrowDown.style.display = 'none';
      arrowLine.style.display = 'inline';
      arrowUp.style.display = 'inline';
    } else if (status === 'active-asc') {
      event.target.dataset.status = 'inactive';
      this.showNotes(this.notesService.notes.sort(compareFunction));
      arrowDown.style.display = 'none';
      arrowLine.style.display = 'none';
      arrowUp.style.display = 'none';
    }
  }

  showFinished(event) {
    const toggleOn = event.target.querySelector('.toggle-on');
    const toggleOff = event.target.querySelector('.toggle-off');
    if (event.target.dataset.isActive === 'true') {
      this.showNotes(this.notesService.notes);
      this.showFinishedButton.dataset.isActive = 'false';
      toggleOff.style.display = 'inline';
      toggleOn.style.display = 'none';
    } else {
      this.showNotes(this.notesService.notes.filter((n) => n.isDone));
      this.showFinishedButton.dataset.isActive = 'true';
      toggleOff.style.display = 'none';
      toggleOn.style.display = 'inline';
    }
  }

  toggleNewNoteForm() {
    const mainElement = document.querySelector('main');
    const formElement = mainElement.querySelector('form');
    const noteId = 'new';
    if (formElement) {
      formElement.remove();
      this.newNoteButton.style.display = 'inline';
    } else {
      this.newNoteButton.style.display = 'none';
      const newNote = new Note(noteId, null, null, 1, false, new Date(), new Date());
      const node = document.createRange().createContextualFragment(this.editNoteTemplateCompiled({ note: newNote }));
      mainElement.insertBefore(node, mainElement.firstChild);

      document.querySelector('#cancel-button-' + noteId).addEventListener('click', () => this.toggleNewNoteForm());
      document.querySelector('#save-button-' + noteId).addEventListener('click', (event) => this.addNewNote(event));
    }
  }

  toggleEditMode(event) {
    const noteId = parseInt(event.target.dataset.noteId);

    if (!isNaN(noteId) && event.target.nodeName === 'BUTTON') {
      const noteElement = event.target.parentElement;
      let singleNote = this.notesService.notes.find((n) => n.id === noteId);
      const node = document.createRange().createContextualFragment(this.editNoteTemplateCompiled({ note: singleNote }));
      noteElement.replaceWith(node);
      document.querySelector('#save-button-' + noteId).addEventListener('click', (event) => this.updateNote(event));
      document
        .querySelector('#cancel-button-' + noteId)
        .addEventListener('click', () => this.showNotes(this.notesService.notes));
    }
  }
  updateNote(event) {
    event.preventDefault();
    const formNode = event.target.parentNode;
    this.notesService
      .updateNote(
        parseInt(formNode.dataset.noteId),
        this.countExclamationMarks(formNode.querySelector('.importance').innerText),
        formNode.querySelector('.title').value,
        new Date(formNode.querySelector('.creation-date').innerText),
        Boolean(formNode.querySelector('.status.editable').checked),
        formNode.querySelector('.content').value,
        new Date(formNode.querySelector('.finish-by-date > .editable').value)
      )
      .then(() => {
        this.showNotes(this.notesService.notes);
      });
  }

  addNewNote(event) {
    event.preventDefault();
    const formNode = event.currentTarget.parentNode;
    this.notesService
      .addNewNote(
        this.countExclamationMarks(formNode.querySelector('.importance').innerText),
        formNode.querySelector('.title').value,
        new Date(),
        Boolean(formNode.querySelector('.status.editable').checked),
        formNode.querySelector('.content').value,
        new Date(formNode.querySelector('.finish-by-date > .editable').value)
      )
      .then(() => {
        this.showNotes(this.notesService.notes);
        this.toggleNewNoteForm();
      });
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

  countExclamationMarks(text) {
    return (text || '').split('!').length - 1;
  }

  adjustTextAreaSize(event) {
    if (event.target.classList.contains('content') && event.target.classList.contains('editable')) {
      event.target.style.height = '1px';
      event.target.style.height = 25 + event.target.scrollHeight + 'px';
    }
  }
}
