const STORAGE_KEY = 'notes_app_items_v1';

/** PUBLIC_INTERFACE
 * readNotes reads notes array from localStorage.
 */
export function readNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

/** PUBLIC_INTERFACE
 * writeNotes writes notes array to localStorage.
 */
export function writeNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

/** PUBLIC_INTERFACE
 * seedIfEmpty seeds storage with sample notes if empty.
 */
export function seedIfEmpty() {
  const existing = readNotes();
  if (existing.length > 0) return;
  const now = new Date().toISOString();
  const samples = [
    {
      id: 'welcome',
      title: 'Welcome to Notes',
      content: 'Start writing your ideas here. Use the New button to create more notes.',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'shortcuts',
      title: 'Tips & Shortcuts',
      content: '- Ctrl/Cmd + S to save\n- Search your notes from the sidebar\n- Autosave runs while you type',
      createdAt: now,
      updatedAt: now,
    },
  ];
  writeNotes(samples);
}
