import { useState, useCallback, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useSlideParser } from './hooks/useSlideParser';
import { useKeyboardNav } from './hooks/useKeyboardNav';
import { SlideViewer } from './components/SlideViewer';
import { SlideNavigation } from './components/SlideNavigation';
import { PresenterMode } from './components/PresenterMode';
import { ThemeToggle } from './components/ThemeToggle';
import { ShortcutPalette } from './components/ShortcutPalette';
import { ProjectHub } from './components/ProjectHub';
import { Project } from './types';
import { Home } from 'lucide-react';
import './styles/index.css';
import './styles/slides.css';

// Helper functions for time formatting
function formatElapsedTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function formatCurrentTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
}

interface SlideAppProps {
  path: string;
  onBack: () => void;
}

function SlideApp({ path, onBack }: SlideAppProps) {
  const { slides, loading, error, reload } = useSlideParser(path);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [presenterMode, setPresenterMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [showNotesPopup, setShowNotesPopup] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const navigate = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
      setShowMenu(false);
    }
  }, [slides.length]);

  const goNext = useCallback(() => {
    navigate(currentSlide + 1);
  }, [currentSlide, navigate]);

  const goPrev = useCallback(() => {
    navigate(currentSlide - 1);
  }, [currentSlide, navigate]);

  const togglePresenter = useCallback(() => {
    setPresenterMode(p => !p);
  }, []);

  const toggleMenu = useCallback(() => {
    setShowMenu(m => !m);
  }, []);

  const toggleBottomBar = useCallback(() => {
    setShowBottomBar(b => !b);
  }, []);

  const toggleControls = useCallback(() => {
    setShowControls(c => !c);
  }, []);

  const toggleZenMode = useCallback(() => {
    // If anything is visible, hide everything
    // If everything is hidden, show everything
    setShowBottomBar(prev => {
      const isVisible = prev;
      if (isVisible) {
        setShowControls(false);
        return false;
      } else {
        setShowControls(true);
        return true;
      }
    });
  }, []);

  const toggleNotes = useCallback(() => {
    setShowNotesPopup(n => !n);
  }, []);

  const toggleTime = useCallback(() => {
    setShowTime(t => !t);
  }, []);

  const toggleHelp = useCallback(() => {
    setShowHelp(h => !h);
  }, []);

  const goFirst = useCallback(() => {
    navigate(0);
  }, [navigate]);

  const goLast = useCallback(() => {
    navigate(slides.length - 1);
  }, [navigate, slides.length]);

  useKeyboardNav({
    onNext: goNext,
    onPrev: goPrev,
    onFirst: goFirst,
    onLast: goLast,
    onTogglePresenter: togglePresenter,
    onToggleMenu: toggleMenu,
    onToggleBottomBar: toggleBottomBar,
    onToggleZenMode: toggleZenMode,
    onToggleControls: toggleControls,
    onToggleNotes: toggleNotes,
    onToggleTime: toggleTime,
    onToggleHelp: toggleHelp,
    onBack: onBack,
  });

  // Track elapsed time
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track current time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="slide-loading">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div>Loading workspace...</div>
          <button onClick={onBack} className="error-back-btn">Return to Project Hub</button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="slide-error">
        <h2>Failed to load project</h2>
        <p>{error}</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={reload}>Try Again</button>
          <button onClick={onBack} style={{ background: 'var(--bg-secondary)' }}>Back to Hub</button>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="slide-error">
        <h2>No content found</h2>
        <p>This project seems to be empty.</p>
        <button onClick={onBack}>Back to Hub</button>
      </div>
    );
  }

  if (presenterMode) {
    return (
      <PresenterMode
        slides={slides}
        currentSlide={currentSlide}
        onNavigate={navigate}
        onClose={togglePresenter}
      />
    );
  }

  return (
    <>
      <ThemeToggle visible={showControls} />
      
      {/* Home Button */}
      <button 
        className={`home-button ${!showControls ? 'hidden' : ''}`}
        onClick={onBack}
        title="Back to Projects"
      >
        <Home size={20} />
      </button>

      <SlideViewer 
        slide={slides[currentSlide]} 
        slideIndex={currentSlide}
      />
      {showBottomBar && (
        <SlideNavigation
          currentSlide={currentSlide}
          totalSlides={slides.length}
          onNavigate={navigate}
          onTogglePresenter={togglePresenter}
          onToggleMenu={toggleMenu}
          showMenu={showMenu}
          slides={slides}
          showNotesPopup={showNotesPopup}
          onToggleNotes={toggleNotes}
        />
      )}
      
      {/* Minimal progress indicator when bottom bar is hidden */}
      {!showBottomBar && (
        <div className="minimal-progress">
          <div 
            className="minimal-progress-fill" 
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      )}

      {/* Time display */}
      {showTime && (
        <div className="time-display">
          <div className="time-item">
            <span className="time-label">Elapsed</span>
            <span className="time-value">{formatElapsedTime(elapsedSeconds)}</span>
          </div>
          <div className="time-divider" />
          <div className="time-item">
            <span className="time-label">Current</span>
            <span className="time-value">{formatCurrentTime(currentTime)}</span>
          </div>
        </div>
      )}

      {/* Shortcut palette */}
      {showHelp && <ShortcutPalette onClose={toggleHelp} />}

      <style>{`
        .home-button {
          position: fixed;
          top: 1rem;
          left: 1rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 100;
          transition: all 0.2s ease;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .home-button:hover {
          background: var(--accent);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .home-button.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .minimal-progress {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: transparent;
          z-index: 99;
        }

        .minimal-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), #a855f7);
          transition: width 0.3s ease;
        }

        .time-display {
          position: fixed;
          top: 20px;
          right: 20px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.75rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: 'JetBrains Mono', monospace;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          z-index: 98;
          animation: slideInRight 0.3s ease-out;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .time-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .time-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .time-value {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--accent);
        }

        .time-divider {
          width: 1px;
          height: 30px;
          background: var(--border);
        }

        .error-back-btn {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

function App() {
  const [view, setView] = useState<'hub' | 'viewer'>('hub');
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  const handleOpenProject = (project: Project) => {
    setCurrentPath(project.path);
    setView('viewer');
  };

  const handleBackToHub = () => {
    setView('hub');
    setCurrentPath(null);
  };

  return (
    <ThemeProvider>
      {view === 'hub' ? (
        <ProjectHub onSelectProject={handleOpenProject} />
      ) : (
        <SlideApp 
          path={currentPath!} 
          onBack={handleBackToHub} 
        />
      )}
    </ThemeProvider>
  );
}

export default App;
