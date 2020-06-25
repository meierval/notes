import { noteStore } from '../services/noteStore';

export class NotesController {
  async getNotes(req, res) {
    res.json((await noteStore.all()) || []);
  }

  async createNote(req, res) {
    const body = req.body;
    const response = await noteStore.add(
      body.title,
      body.content,
      body.importance,
      body.isDone,
      body.toBeFinishedByDate
    );
    res.json(response);
  }

  async updateNote(req, res) {
    const body = req.body;
    res.json(
      await noteStore.update(
        req.params.id,
        body.title,
        body.content,
        body.importance,
        body.isDone,
        body.toBeFinishedByDate
      )
    );
  }

  async showNote(req, res) {
    res.json(await noteStore.get(req.params.id));
  }

  async deleteNote(req, res) {
    res.json(await noteStore.delete(req.params.id));
  }
}

export const notesController = new NotesController();
