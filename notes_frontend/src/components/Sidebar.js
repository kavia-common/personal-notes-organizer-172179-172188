import React, { useMemo, useState } from 'react';
import NoteListItem from './NoteListItem';
import { useNotesContext } from '../hooks/useNotes';

/** PUBLIC_INTERFACE
 * Sidebar renders search input and the list of notes with filtering.
 */
export default function Sidebar() {
  const { notes, selectedId, selectNote } = useNotesContext();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(n =>
      (n.title || '').toLowerCase().includes(q) ||
      (n.content || '').toLowerCase().includes(q)
    );
  }, [query, notes]);

  return (
    <div>
      <div className="search" role="search">
        <input
          className="input"
          aria-label="Search notes"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="notes-list" role="list" aria-label="Filtered notes list">
        {filtered.map((n) => (
          <NoteListItem
            key={n.id}
            note={n}
            active={n.id === selectedId}
            onClick={() => selectNote(n.id)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="note-item" aria-live="polite">No notes match your search.</div>
        )}
      </div>
    </div>
  );
}
