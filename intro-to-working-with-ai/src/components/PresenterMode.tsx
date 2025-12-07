import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Slide } from '../utils/markdownParser';
import '../styles/presenter.css';

interface PresenterModeProps {
  slides: Slide[];
  currentSlide: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}

export function PresenterMode({ 
  slides, 
  currentSlide, 
  onNavigate, 
  onClose 
}: PresenterModeProps) {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsed(e => e + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setElapsed(0);
  };

  const current = slides[currentSlide];
  const next = slides[currentSlide + 1];

  const markdownComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="presenter-container">
      <div className="presenter-current">
        <div className="presenter-current-header">
          <span>Current Slide</span>
          <span>{current?.title}</span>
        </div>
        <div className="presenter-current-content slide-inner">
          {current && (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeRaw]}
              components={markdownComponents}
            >
              {current.content}
            </ReactMarkdown>
          )}
        </div>
      </div>

      <div className="presenter-sidebar">
        <div className="presenter-next">
          <div className="presenter-next-header">Next Slide</div>
          <div className="presenter-next-content slide-inner">
            {next ? (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {next.content}
              </ReactMarkdown>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                End of presentation
              </p>
            )}
          </div>
        </div>

        <div className="presenter-notes">
          <div className="presenter-notes-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
              <path d="M10 9H8" />
            </svg>
            Speaker Notes
          </div>
          <div className={`presenter-notes-content ${!current?.notes ? 'empty' : ''}`}>
            {current?.notes || 'No notes for this slide'}
          </div>
        </div>
      </div>

      <div className="presenter-controls">
        <div className="presenter-timer">
          <div className="presenter-timer-display">{formatTime(elapsed)}</div>
          <div className="presenter-timer-buttons">
            <button 
              className={`presenter-timer-btn ${isRunning ? 'active' : ''}`}
              onClick={toggleTimer}
              title={isRunning ? 'Pause' : 'Start'}
            >
              {isRunning ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button 
              className="presenter-timer-btn"
              onClick={resetTimer}
              title="Reset"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
          </div>
        </div>

        <div className="presenter-nav">
          <button 
            className="presenter-timer-btn"
            onClick={() => onNavigate(currentSlide - 1)}
            disabled={currentSlide <= 0}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span className="presenter-slide-counter">
            {currentSlide + 1} / {slides.length}
          </span>
          <button 
            className="presenter-timer-btn"
            onClick={() => onNavigate(currentSlide + 1)}
            disabled={currentSlide >= slides.length - 1}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="presenter-shortcuts">
          <div className="presenter-shortcut">
            <kbd>←</kbd> <kbd>→</kbd> Navigate
          </div>
          <div className="presenter-shortcut">
            <kbd>P</kbd> Exit presenter
          </div>
          <div className="presenter-shortcut">
            <kbd>F</kbd> Fullscreen
          </div>
          <button 
            className="presenter-timer-btn"
            onClick={onClose}
            title="Exit Presenter Mode"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
