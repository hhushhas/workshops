import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
    const { theme, toggleTheme, fontSize, setFontSize } = useTheme();

    return (
        <div className="theme-toggle">
            <button
                className="theme-btn"
                onClick={ toggleTheme }
                title={ `Switch to ${ theme === 'dark' ? 'light' : 'dark' } mode` }
                aria-label="Toggle theme"
            >
                { theme === 'dark' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                ) }
            </button>

            <div className="font-size-controls">
                <button
                    className={ `font-btn ${ fontSize === 'small' ? 'active' : '' }` }
                    onClick={ () => setFontSize( 'small' ) }
                    title="Small font"
                >
                    A
                </button>
                <button
                    className={ `font-btn medium ${ fontSize === 'medium' ? 'active' : '' }` }
                    onClick={ () => setFontSize( 'medium' ) }
                    title="Medium font"
                >
                    A
                </button>
                <button
                    className={ `font-btn large ${ fontSize === 'large' ? 'active' : '' }` }
                    onClick={ () => setFontSize( 'large' ) }
                    title="Large font"
                >
                    A
                </button>
            </div>

            <style>{ `
        .theme-toggle {
          position: fixed;
          top: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          z-index: 200;
        }
        
        .theme-btn {
          width: 44px;
          height: 44px;
          border-radius: 12px;
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
          transform: scale(1.05);
        }
        
        .font-size-controls {
          display: flex;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }
        
        .font-btn {
          width: 36px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: var(--text-muted);
          font-size: 0.75rem;
          transition: all 0.2s;
          border-right: 1px solid var(--border);
        }
        
        .font-btn:last-child {
          border-right: none;
        }
        
        .font-btn.medium {
          font-size: 0.9rem;
        }
        
        .font-btn.large {
          font-size: 1.1rem;
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
