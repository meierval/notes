export default class Note {
  constructor(id, title, content, importance, isDone, creationDate, toBeFinishedByDate) {
    this.id = id;
    this.title = title || '';
    this.content = content || '';
    this.importance = importance || 0;
    this.isDone = Boolean(isDone);
    this.creationDate = new Date(creationDate);
    this.toBeFinishedByDate = new Date(toBeFinishedByDate);
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      importance: this.importance,
      isDone: this.isDone,
      creationDate: this.creationDate.toJSON(),
      toBeFinishedByDate: this.toBeFinishedByDate.toJSON(),
    };
  }
}
