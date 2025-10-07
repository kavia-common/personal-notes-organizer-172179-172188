import React from 'react';
import './styles/theme.css';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import Editor from './components/Editor';
import { NotesProvider, useNotesContext } from './hooks/useNotes';

// PUBLIC_INTERFACE
function AppShell() {
  /** Top-level shell combining toolbar, sidebar, and editor area. */
  const { selectedNote, notes } = useNotesContext();

  return (
    <div className="app-shell" role="application" aria-label="Personal Notes">
      <Toolbar />
      <div className="layout">
        <aside className="sidebar" aria-label="Notes list">
          <Sidebar />
        </aside>
        <main className="main" aria-live="polite">
          {selectedNote ? (
            <Editor />
          ) : notes.length === 0 ? (
            <div className="empty-state" role="note">
              <h2>Welcome to Notes</h2>
              <p>Create your first note using the New button above.</p>
              <div className="footer-hint">Tip: Use Ctrl/Cmd + S to save quickly.</div>
            </div>
          ) : (
            <div className="empty-state" role="note">
              <h2>Select a note from the sidebar</h2>
              <p>Or create a new one using the New button.</p>
              <div className="footer-hint">Changes are autosaved.</div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** App entrypoint wrapping the shell with NotesProvider context. */
  return (
    <NotesProvider>
      <AppShell />
    </NotesProvider>
  );
}

export default App;
