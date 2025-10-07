import { readNotes, writeNotes, seedIfEmpty } from '../utils/storage';
import { v4 as uuid } from '../utils/uuid';

/** PUBLIC_INTERFACE
 * listNotes simulates an async REST call returning all notes.
 */
export async function listNotes() {
  await sleep(80);
  seedIfEmpty();
  const notes = readNotes().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  return notes;
}

/** PUBLIC_INTERFACE
 * getNote simulates fetch of a single note by id.
 */
export async function getNote(id) {
  await sleep(40);
  const notes = readNotes();
  return notes.find(n => n.id === id) || null;
}

/** PUBLIC_INTERFACE
 * createNote simulates POST to create a note.
 */
export async function createNote({ title, content }) {
  await sleep(90);
  const now = new Date().toISOString();
  const note = { id: uuid(), title, content, createdAt: now, updatedAt: now };
  const notes = readNotes();
  notes.unshift(note);
  writeNotes(notes);
  return note;
}

/** PUBLIC_INTERFACE
 * updateNote simulates PATCH/PUT to update a note.
 */
export async function updateNote(id, { title, content }) {
  await sleep(70);
  const notes = readNotes();
  const now = new Date().toISOString();
  const idx = notes.findIndex(n => n.id === id);
  if (idx >= 0) {
    notes[idx] = { ...notes[idx], title, content, updatedAt: now };
    writeNotes(notes);
    return notes[idx];
  }
  return null;
}

/** PUBLIC_INTERFACE
 * deleteNote simulates DELETE.
 */
export async function deleteNote(id) {
  await sleep(70);
  const notes = readNotes().filter(n => n.id !== id);
  writeNotes(notes);
  return true;
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}
