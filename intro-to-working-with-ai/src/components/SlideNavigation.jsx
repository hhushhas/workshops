import { useState } from 'react';

export function SlideNavigation( {
    currentSlide,
    totalSlides,
    onNavigate,
    onTogglePresenter,
    onToggleMenu,
    showMenu,
    slides
} ) {
    return (
        <nav className="slide-nav">
            <div className="slide-nav-left">
                <button
                    className="nav-btn"
                    onClick={ () => onNavigate( currentSlide - 1 ) }
                    disabled={ currentSlide <= 0 }
                    aria-label="Previous slide"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <div className="slide-counter">
                    <button
                        className="slide-counter-btn"
                        onClick={ onToggleMenu }
                        aria-label="Jump to slide"
                    >
                        { currentSlide + 1 } / { totalSlides }
                    </button>

                    { showMenu && (
                        <div className="slide-menu">
                            { slides.map( ( slide, index ) => (
                                <button
                                    key={ index }
                                    className={ `slide-menu-item ${ index === currentSlide ? 'active' : '' }` }
                                    onClick={ () => {
                                        onNavigate( index );
                                        onToggleMenu();
                                    } }
                                >
                                    <span className="slide-menu-number">{ index + 1 }</span>
                                    <span className="slide-menu-title">{ slide.title }</span>
                                </button>
                            ) ) }
                        </div>
                    ) }
                </div>

                <button
                    className="nav-btn"
                    onClick={ () => onNavigate( currentSlide + 1 ) }
                    disabled={ currentSlide >= totalSlides - 1 }
                    aria-label="Next slide"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            <div className="slide-nav-center">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={ { width: `${ ( ( currentSlide + 1 ) / totalSlides ) * 100 }%` } }
                    />
                </div>
            </div>

            <div className="slide-nav-right">
                <button
                    className="nav-btn icon-btn"
                    onClick={ onTogglePresenter }
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

            <style>{ `
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
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 0.5rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.5rem;
          max-height: 300px;
          overflow-y: auto;
          min-width: 250px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
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
        
        .progress-bar {
          height: 4px;
          background: var(--bg-tertiary);
          border-radius: 2px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), #a855f7);
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        
        .icon-btn {
          background: transparent;
        }
        
        .icon-btn:hover {
          background: var(--bg-tertiary);
          color: var(--accent);
        }
      `}</style>
        </nav>
    );
}
