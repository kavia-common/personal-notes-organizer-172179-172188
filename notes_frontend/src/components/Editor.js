import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNotesContext } from '../hooks/useNotes';

/** PUBLIC_INTERFACE
 * Editor displays the currently selected note and allows editing the title and content.
 * It debounces auto-saving and handles Cmd/Ctrl+S for manual save.
 */
export default function Editor() {
  const { selectedNote, updateDraft, saveCurrent } = useNotesContext();
  const [title, setTitle] = useState(selectedNote?.title || '');
  const [content, setContent] = useState(selectedNote?.content || '');
  const debounceTimer = useRef(null);

  // Keep local state in sync when selection changes
  useEffect(() => {
    setTitle(selectedNote?.title || '');
    setContent(selectedNote?.content || '');
  }, [selectedNote?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Autosave debounce
  useEffect(() => {
    if (!selectedNote) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      updateDraft({ title, content });
      // silent autosave to local storage via saveCurrent
      saveCurrent(true);
    }, 800);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [title, content, selectedNote?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const onKeyDown = useCallback((e) => {
    const isSave = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's';
    if (isSave) {
      e.preventDefault();
      updateDraft({ title, content });
      saveCurrent(false);
    }
  }, [title, content, updateDraft, saveCurrent]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  const created = useMemo(() => selectedNote ? new Date(selectedNote.createdAt) : null, [selectedNote]);
  const updated = useMemo(() => selectedNote ? new Date(selectedNote.updatedAt) : null, [selectedNote]);

  if (!selectedNote) return null;

  return (
    <section className="editor" aria-label="Note editor">
      <input
        className="title-input"
        placeholder="Note title"
        aria-label="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="content-input"
        placeholder="Write your note here..."
        aria-label="Note content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="footer-hint" aria-live="polite">
        {created && `Created: ${created.toLocaleString()} `}
        {updated && ` · Updated: ${updated.toLocaleString()}`}
      </div>
    </section>
  );
}
