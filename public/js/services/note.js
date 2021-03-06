export default class Note {
  constructor(id, title, content, importance, isDone, creationDate, toBeFinishedByDate) {
    this.id = id;
    this.title = title || '';
    this.content = content || '';
    this.importance = importance || 1;
    this.isDone = Boolean(isDone);
    this.creationDate = new Date(creationDate);
    this.toBeFinishedByDate = new Date(toBeFinishedByDate);
  }
}
