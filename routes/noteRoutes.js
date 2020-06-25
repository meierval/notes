import express from 'express';
import { notesController } from '../controller/notesController';

const router = express.Router();

router.get('/', notesController.getNotes.bind(notesController));
router.post('/', notesController.createNote.bind(notesController));
router.get('/:id/', notesController.showNote.bind(notesController));
router.put('/:id/', notesController.updateNote.bind(notesController));
router.delete('/:id/', notesController.deleteNote.bind(notesController));

export const noteRoutes = router;
