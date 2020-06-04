export default class Note {
  constructor(id, title, content, importance, isDone, creationDateTime, toBeFinishedByDate) {
    this.id = id;
    this.title = title || '';
    this.content = content || '';
    this.importance = importance || 0;
    this.isDone = Boolean(isDone);
    this.creationDateTime = new Date(creationDateTime);
    this.toBeFinishedByDate = new Date(toBeFinishedByDate);
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      importance: this.importance,
      isDone: this.isDone,
      creationDateTime: this.creationDateTime.toJSON(),
      toBeFinishedByDate: this.toBeFinishedByDate.toJSON(),
    };
  }
}
