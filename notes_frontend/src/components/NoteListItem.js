import React from 'react';

/** PUBLIC_INTERFACE
 * NoteListItem shows a single note as an item in the list.
 */
export default function NoteListItem({ note, active, onClick }) {
  const snippet = (note.content || '').replace(/\n+/g, ' ').slice(0, 80);
  return (
    <div
      role="listitem"
      tabIndex={0}
      className={`note-item ${active ? 'active' : ''}`}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      aria-current={active ? 'true' : 'false'}
      aria-label={`Open note ${note.title || 'Untitled'}`}
    >
      <h4 className="note-title">{note.title || 'Untitled'}</h4>
      <p className="note-snippet">{snippet || '—'}</p>
    </div>
  );
}
