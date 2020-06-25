import { orderStore } from '../services/orderStore';
import { SecurityUtil } from '../utils/security';

export class NotesController {
  async getNotes(req, res) {
    res.json((await orderStore.all(SecurityUtil.currentUser(req))) || []);
  }

  async createNote(req, res) {
    res.json(await orderStore.add(req.body.name, SecurityUtil.currentUser(req)));
  }

  async updateNote(req, res) {
    res.json(await orderStore.update(req.body.name, SecurityUtil.currentUser(req)));
  }

  async showNote(req, res) {
    res.json(await orderStore.get(req.params.id, SecurityUtil.currentUser(req)));
  }

  async deleteNote(req, res) {
    res.json(await orderStore.delete(req.params.id, SecurityUtil.currentUser(req)));
  }
}

export const notesController = new NotesController();
