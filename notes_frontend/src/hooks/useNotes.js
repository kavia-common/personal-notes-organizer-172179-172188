import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '../services/api';

/** PUBLIC_INTERFACE
 * useNotesContext provides access to notes state, selection, and CRUD actions.
 */
const NotesCtx = createContext(null);

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const selectedNote = useMemo(() => notes.find(n => n.id === selectedId) || null, [notes, selectedId]);

  // Initialize from API (localStorage) with seed if empty
  useEffect(() => {
    (async () => {
      const list = await api.listNotes();
      setNotes(list);
      if (list.length > 0) {
        // Use hash id if present
        const hashId = window.location.hash.replace('#/', '').replace('#', '');
        const candidate = list.find(n => n.id === hashId);
        setSelectedId(candidate ? candidate.id : list[0].id);
      }
    })();
  }, []);

  // Keep URL hash in sync
  useEffect(() => {
    if (selectedId) {
      window.location.hash = `#/${selectedId}`;
    } else {
      window.location.hash = '#/';
    }
  }, [selectedId]);

  const selectNote = (id) => setSelectedId(id);

  const createNew = async () => {
    const created = await api.createNote({
      title: 'Untitled',
      content: '',
    });
    const list = await api.listNotes();
    setNotes(list);
    setSelectedId(created.id);
  };

  // updateDraft updates local state for current selected note before saving
  const updateDraft = ({ title, content }) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === selectedId ? { ...n, title, content, updatedAt: new Date().toISOString() } : n))
    );
  };

  const saveCurrent = async (silent = false) => {
    const n = notes.find((x) => x.id === selectedId);
    if (!n) return;
    await api.updateNote(n.id, { title: n.title, content: n.content });
    if (!silent) {
      // refresh list to ensure consistency of timestamps
      const list = await api.listNotes();
      setNotes(list);
    }
  };

  const deleteCurrent = async () => {
    const n = notes.find((x) => x.id === selectedId);
    if (!n) return;
    const confirmMsg = `Delete note "${n.title || 'Untitled'}"? This cannot be undone.`;
    if (!window.confirm(confirmMsg)) return;
    await api.deleteNote(n.id);
    const list = await api.listNotes();
    setNotes(list);
    setSelectedId(list[0]?.id || null);
  };

  const value = {
    notes,
    selectedId,
    selectedNote,
    selectNote,
    createNew,
    updateDraft,
    saveCurrent,
    deleteCurrent,
  };

  return <NotesCtx.Provider value={value}>{children}</NotesCtx.Provider>;
}

// PUBLIC_INTERFACE
export function useNotesContext() {
  /** Hook to read the Notes context */
  const ctx = useContext(NotesCtx);
  if (!ctx) throw new Error('useNotesContext must be used within NotesProvider');
  return ctx;
}
