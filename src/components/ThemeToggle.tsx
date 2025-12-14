import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  visible: boolean;
}

export function ThemeToggle({ visible }: ThemeToggleProps) {
  const { theme, toggleTheme, fontSize, setFontSize } = useTheme();

  const fontSizes = [
    { value: 'xs' as const, label: 'XS' },
    { value: 'small' as const, label: 'S' },
    { value: 'medium' as const, label: 'M' },
    { value: 'large' as const, label: 'L' },
    { value: 'xl' as const, label: 'XL' },
    { value: 'xxl' as const, label: 'XXL' },
  ];

  return (
    <div className={`theme-toggle ${visible ? 'visible' : ''}`}>
      <button 
        className="theme-btn"
        onClick={toggleTheme}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>

      <div className="font-size-controls">
        {fontSizes.map(({ value, label }) => (
          <button
            key={value}
            className={`font-btn ${fontSize === value ? 'active' : ''}`}
            onClick={() => setFontSize(value)}
            title={`${label} font size`}
          >
            {label}
          </button>
        ))}
      </div>

      <style>{`
        .theme-toggle {
          position: fixed;
          top: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 200;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-10px);
          transition: all 0.2s ease-out;
        }

        .theme-toggle.visible {
          opacity: 0.6; /* Semi-transparent by default to be less distracting */
          pointer-events: auto;
          transform: translateY(0);
        }

        .theme-toggle.visible:hover {
          opacity: 1;
        }
        
        .theme-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.2s;
        }
        
        .theme-btn:hover {
          background: var(--bg-tertiary);
          color: var(--accent);
        }
        
        .font-size-controls {
          display: flex;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          height: 32px;
        }
        
        .font-btn {
          min-width: 32px;
          padding: 0 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          color: var(--text-muted);
          font-size: 0.7rem;
          transition: all 0.2s;
          border-right: 1px solid var(--border);
          background: transparent;
        }
        
        .font-btn:last-child {
          border-right: none;
        }
        
        .font-btn:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }
        
        .font-btn.active {
          background: var(--accent);
          color: white;
        }
      `}</style>
    </div>
  );
}
