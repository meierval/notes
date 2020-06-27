export class Note {
  constructor(title, content, importance, isDone, toBeFinishedBy) {
    this.title = title || '';
    this.content = content || '';
    this.importance = importance || 1;
    this.isDone = Boolean(isDone);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.creationDate = today;
    const toBeFinishedByDate = new Date(toBeFinishedBy);
    toBeFinishedByDate.setHours(0, 0, 0, 0);
    this.toBeFinishedByDate = toBeFinishedByDate;
  }
}
