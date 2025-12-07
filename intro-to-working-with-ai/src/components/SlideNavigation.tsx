import { useState, useRef, useEffect } from 'react';
import { Slide } from '../utils/markdownParser';

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNavigate: (index: number) => void;
  onTogglePresenter: () => void;
  onToggleMenu: () => void;
  showMenu: boolean;
  slides: Slide[];
  showNotesPopup: boolean;
  onToggleNotes: () => void;
}

export function SlideNavigation({ 
  currentSlide, 
  totalSlides, 
  onNavigate,
  onTogglePresenter,
  onToggleMenu,
  showMenu,
  slides,
  showNotesPopup,
  onToggleNotes
}: SlideNavigationProps) {
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleSeek = (e: React.MouseEvent | MouseEvent) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = x / rect.width;
    const index = Math.round(percent * (totalSlides - 1));
    if (index !== currentSlide) onNavigate(index);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSeek(e);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault(); // Prevent text selection
        handleSeek(e);
      }
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, currentSlide, totalSlides]); // Add dependencies

  return (
    <nav className="slide-nav">
      <div className="slide-nav-left">
        <button 
          className="nav-btn"
          onClick={() => onNavigate(currentSlide - 1)}
          disabled={currentSlide <= 0}
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        
        <div className="slide-counter">
          <button 
            className="slide-counter-btn"
            onClick={onToggleMenu}
            aria-label="Jump to slide"
          >
            {currentSlide + 1} / {totalSlides}
          </button>
          
          {showMenu && (
            <div className="slide-menu">
              {slides.map((slide, index) => (
                <button
                  key={index}
                  className={`slide-menu-item ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => {
                    onNavigate(index);
                    onToggleMenu();
                  }}
                >
                  <span className="slide-menu-number">{index + 1}</span>
                  <span className="slide-menu-title">{slide.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button 
          className="nav-btn"
          onClick={() => onNavigate(currentSlide + 1)}
          disabled={currentSlide >= totalSlides - 1}
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      
      <div className="slide-nav-center">
        <div 
          className="progress-bar"
          ref={progressBarRef}
          onMouseDown={handleMouseDown}
          role="slider"
          aria-valuenow={currentSlide}
          aria-valuemin={0}
          aria-valuemax={totalSlides - 1}
          tabIndex={0}
        >
          <div 
            className="progress-fill" 
            style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          />
          <div className="progress-hover-area" />
        </div>
      </div>
      
      <div className="slide-nav-right">
        <div className="notes-container">
          <button 
            className={`nav-btn icon-btn ${showNotesPopup ? 'active' : ''}`}
            onClick={onToggleNotes}
            title="Speaker Notes (N)"
            aria-label="Toggle speaker notes"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
              <path d="M10 9H8" />
            </svg>
          </button>
          
          {showNotesPopup && (
            <div className="notes-popup">
              <div className="notes-header">Speaker Notes</div>
              <div className="notes-content">
                {slides[currentSlide]?.notes || 'No notes for this slide.'}
              </div>
            </div>
          )}
        </div>

        <button 
          className="nav-btn icon-btn"
          onClick={onTogglePresenter}
          title="Presenter Mode (P)"
          aria-label="Toggle presenter mode"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
          </svg>
        </button>
      </div>

      <style>{`
        .slide-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          z-index: 100;
        }
        
        .slide-nav-left,
        .slide-nav-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .slide-nav-center {
          flex: 1;
          max-width: 400px;
          margin: 0 2rem;
        }
        
        .nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.2s;
        }
        
        .nav-btn:hover:not(:disabled) {
          background: var(--accent);
          color: white;
          transform: translateY(-2px);
        }
        
        .nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        
        .slide-counter {
          position: relative;
        }
        
        .slide-counter-btn {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          background: var(--bg-tertiary);
          color: var(--text-primary);
          font-weight: 500;
          font-size: 0.95rem;
          min-width: 80px;
          transition: all 0.2s;
        }
        
        .slide-counter-btn:hover {
          background: var(--accent);
          color: white;
        }
        
        .slide-menu {
          position: absolute;
          bottom: calc(100% + 12px);
          left: 0;
          /* transform: translateX(-50%); Removed to fix overflow */
          margin-bottom: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.5rem;
          max-height: min(300px, 60vh);
          overflow-y: auto;
          min-width: 250px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          z-index: 1000;
        }
        
        /* ... existing menu styles ... */

        .progress-bar {
          height: 6px; /* Slightly thicker */
          background: var(--bg-tertiary);
          border-radius: 3px;
          overflow: visible; /* Allow hover effect to spill? */
          position: relative;
          cursor: pointer;
          transition: height 0.2s;
        }
        
        .progress-bar:hover {
          height: 8px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), #a855f7);
          border-radius: 3px;
          transition: width 0.1s linear; /* Faster transition for scrubbing */
          position: relative;
        }
        
        /* Hover handle */
        .progress-bar:hover .progress-fill::after {
          content: '';
          position: absolute;
          right: -6px;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .notes-container {
          position: relative;
        }
        
        .notes-popup {
          position: absolute;
          bottom: calc(100% + 15px);
          right: 0; /* Align to right */
          width: 300px;
          max-height: 400px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.2s ease-out;
        }
        
        .notes-header {
          padding: 0.75rem 1rem;
          background: var(--bg-tertiary);
          font-weight: 600;
          font-size: 0.9rem;
          border-bottom: 1px solid var(--border);
        }
        
        .notes-content {
          padding: 1rem;
          overflow-y: auto;
          white-space: pre-wrap;
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nav-btn.active {
           background: var(--accent);
           color: white;
        }

        .icon-btn {
          background: transparent;
        }
        
        .icon-btn:hover {
          background: var(--bg-tertiary);
          color: var(--accent);
        }
        
        .icon-btn.active:hover {
           background: var(--accent);
           color: white;
        }
        .slide-menu-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0.75rem;
          border-radius: 8px;
          text-align: left;
          transition: all 0.15s;
        }
        
        .slide-menu-item:hover {
          background: var(--bg-tertiary);
        }
        
        .slide-menu-item.active {
          background: var(--accent);
          color: white;
        }
        
        .slide-menu-number {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: var(--bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .slide-menu-item.active .slide-menu-number {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .slide-menu-title {
          font-size: 0.9rem;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .slide-menu-item.active .slide-menu-title {
          color: white;
        }
      `}</style>
    </nav>
  );
}
