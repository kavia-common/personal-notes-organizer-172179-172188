import React from 'react';
import { useNotesContext } from '../hooks/useNotes';

/** PUBLIC_INTERFACE
 * Toolbar provides New, Save, Delete actions and shows app title.
 */
export default function Toolbar() {
  const { createNew, saveCurrent, deleteCurrent, selectedNote } = useNotesContext();

  return (
    <div className="toolbar" role="toolbar" aria-label="Notes actions">
      <div className="toolbar-title">📝 Notes</div>
      <button className="btn" onClick={createNew} aria-label="Create new note">
        New
      </button>
      <button
        className="btn btn-primary"
        onClick={saveCurrent}
        aria-label="Save current note"
        disabled={!selectedNote}
      >
        Save
      </button>
      <button
        className="btn btn-danger"
        onClick={deleteCurrent}
        aria-label="Delete current note"
        disabled={!selectedNote}
      >
        Delete
      </button>
      <span className="footer-hint" aria-hidden="true">Ctrl/Cmd + S to save</span>
    </div>
  );
}
