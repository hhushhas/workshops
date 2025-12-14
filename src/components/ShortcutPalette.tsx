interface ShortcutPaletteProps {
  onClose: () => void;
}

export function ShortcutPalette({ onClose }: ShortcutPaletteProps) {
  const shortcuts = [
    { keys: ['→', '↓', 'Space', 'PgDn'], desc: 'Next' },
    { keys: ['←', '↑', 'PgUp'], desc: 'Prev' },
    { keys: ['B'], desc: 'Toggle Bottom Bar' },
    { keys: ['C'], desc: 'Toggle Controls' },
    { keys: ['Z'], desc: 'Zen Mode (Hide All)' },
    { keys: ['N'], desc: 'Toggle Notes' },
    { keys: ['T'], desc: 'Toggle Time' },
    { keys: ['P'], desc: 'Presenter Mode' },
    { keys: ['M'], desc: 'Slide Menu' },
    { keys: ['Esc'], desc: 'Close/Exit' },
  ];

  return (
    <div className="shortcut-overlay" onClick={onClose}>
      <div className="shortcut-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="shortcut-title">Keyboard Shortcuts</h3>
        <div className="shortcut-grid">
          {shortcuts.map((s, i) => (
            <div key={i} className="shortcut-row">
              <div className="shortcut-keys">
                {s.keys.map((k, j) => (
                  <kbd key={j}>{k}</kbd>
                ))}
              </div>
              <span className="shortcut-desc">{s.desc}</span>
            </div>
          ))}
        </div>
        <div className="shortcut-hint">Press <kbd>?</kbd> to toggle</div>
      </div>

      <style>{`
        .shortcut-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        .shortcut-modal {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.5rem;
          min-width: 320px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          animation: popIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .shortcut-title {
          margin: 0 0 1rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          text-align: center;
        }

        .shortcut-grid {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .shortcut-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          padding: 0.25rem 0;
        }

        .shortcut-keys {
          display: flex;
          gap: 0.25rem;
        }

        kbd {
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 0.1rem 0.4rem;
          font-family: inherit;
          font-size: 0.75rem;
          color: var(--text-secondary);
          min-width: 20px;
          text-align: center;
        }

        .shortcut-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .shortcut-hint {
          margin-top: 1rem;
          text-align: center;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
